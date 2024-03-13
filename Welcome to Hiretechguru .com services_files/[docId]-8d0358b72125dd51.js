(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7964],
  {
    7977: function (n, e, o) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        ["/published/[docId]", function () {
          return o(59351);
        }],
      ]);
    },
    59351: function (n, e, o) {
      "use strict";

      const { default: Page } = o(52322);
      const { MP.setUA } = o(57643);
      const { v: DEBUG_ENABLED } = o(14274);
      const { k: PublishedPage } = o(20147);
      const { setMP } = o(90221);

      setMP("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36");

      let PublishedPageDesktop = ({ docId, doc, flags }) => {
        if (DEBUG_ENABLED) {
          console.log("%c @@@@@@@@@@@@@@@@@@@@@@@ [PublishedPage DESKTOP] docId", "background-color: aqua; font-weight: bold", docId, doc);
        }
        return <PublishedPage docId={docId} doc={doc} flags={flags} />;
      };

      const WrappedPage = (0, Page)(PublishedPageDesktop);
      e.default = (0, WrappedPage);
    },
  },
]);
