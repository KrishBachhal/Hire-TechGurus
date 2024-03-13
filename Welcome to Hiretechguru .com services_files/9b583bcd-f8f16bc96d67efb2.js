"use strict";

// Helper functions
function isFunction(fn) {
  return typeof fn === "function";
}

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function isPromise(promise) {
  return promise instanceof Promise;
}

function isNodeStream(stream) {
  return (
    isObject(stream) &&
    isFunction(stream.pipe) &&
    isFunction(stream.on)
  );
}

function isReadableStream(stream) {
  return (
    isObject(stream) &&
    isFunction(stream.getReader) &&
    isFunction(stream.tee)
  );
}

function isWritableStream(stream) {
  return (
    isObject(stream) &&
    isFunction(stream.getWriter) &&
    isFunction(stream.cancel)
  );
}

function isTransformStream(stream) {
  return (
    isObject(stream) &&
    isFunction(stream.readable) &&
    isFunction(stream.writable)
  );
}

// Error handling
function createError(message) {
  return new Error(message);
}

function createAbortError(message) {
  return new DOMException(message, "AbortError");
}

// Util functions
function noop() {}

function createPromise(fn) {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  fn(resolve, reject);
  return promise;
}

function createReadableStream(
  source = noop,
  strategy = { highWaterMark: 1 }
) {
  const { highWaterMark } = strategy;
  let reader, state = "closed";

  function close() {
    state = "closed";
    reader = null;
  }

  function getReader() {
    if (state === "closed") {
      throw createError("Stream is closed");
    }
    if (!reader) {
      reader = {
        read() {
          return source(highWaterMark).then((chunk) => {
            if (chunk) {
              return { value: chunk, done: false };
            } else {
              close();
              return { value: undefined, done: true };
            }
          });
        },
        releaseLock() {
          reader = null;
        },
      };
    }
    return reader;
  }

  function tee() {
    if (state === "closed") {
      throw createError("Stream is closed");
    }
    const streams = [];
    const readers = [];

    function addStream(stream) {
      if (state === "closed") {
        throw createError("Stream is closed");
      }
      const reader = getReader();
      streams.push(stream);
      readers.push(reader);
      return reader;
    }

    function start(controller) {
      if (state === "closed") {
        throw createError("Stream is closed");
      }
      controller.enqueue(getReader());
    }

    return {
      readable: {
        getReader() {
          return addStream({
            getReader() {
              return addStream({
                read() {
                  return Promise.race([
                    getReader().read(),
                    new Promise((resolve) => {
                      const interval = setInterval(() => {
                        if (reader.done) {
                          clearInterval(interval);
                          resolve();
                        }
                      });
                    }),
                  ]);
                },
                releaseLock() {
                  reader.releaseLock();
                },
              });
            },
          });
        },
      },
      writable: {
        getWriter() {
          return {
            write(chunk) {
              if (state === "closed") {
                throw createError("Stream is closed");
              }
              return source(chunk.length).then(() => {
                controller.enqueue(chunk);
              });
            },
            close() {
              if (state === "closed") {
                throw createError("Stream is closed");
              }
              close();
              controller.close();
            },
            abort(reason) {
              if (state === "closed") {
                throw createError("Stream is closed");
              }
              close();
              controller.abort(reason);
            },
          };
        },
      },
    };
  }

  return {
    getReader,
    tee,
  };
}

// Export the createReadableStream function
module.exports = createReadableStream;
