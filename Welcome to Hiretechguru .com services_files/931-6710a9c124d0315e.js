(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    8473: function (e, t) {
      "use strict";
      var n, r;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        function (e, t) {
          for (var n in t)
            Object.defineProperty(e, n, {
              enumerable: !0,
              get: t[n],
            });
        }(
          t,
          {
            PrefetchKind: function () {
              return n;
            },
            ACTION_REFRESH: function () {
              return o;
            },
            ACTION_NAVIGATE: function () {
              return u;
            },
            ACTION_RESTORE: function () {
              return l;
            },
            ACTION_SERVER_PATCH: function () {
              return f;
            },
            ACTION_PREFETCH: function () {
              return i;
            },
            ACTION_FAST_REFRESH: function () {
              return a;
            },
            ACTION_SERVER_ACTION: function () {
              return c;
            },
          }
        );
      (r = n || (n = {})).AUTO = "auto";
      r.FULL = "full";
      r.TEMPORARY = "temporary";
      ("function" == typeof t.default ||
        "object" == typeof t.default &&
          null !== t.default) &&
        void 0 === t.default.__esModule &&
        ((t.default.__esModule = !0),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    27487: function (e, t, n) {
      "use strict";
      function r(e, t, n, r) {
        return !1;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "getDomainLocale", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
      n(67835),
        ("function" == typeof t.default ||
          "object" == typeof t.default &&
          null !== t.default) &&
          void 0 === t.default.__esModule &&
          ((t.default.__esModule = !0),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    58828: function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return g;
          },
        });
      var r = n(43219),
        o = r._(n(2784)),
        u = n(26847),
        l = n(88474),
        f = n(23813),
        i = n(32024),
        a = n(88482),
        c = n(14583),
        s = n(33145),
        d = n(89082),
        p = n(27487),
        h = n(83497),
        y = n(8473),
        v = new Set();
      function _(e, t, n, r, o, u) {
        if (!u && !l.isLocalURL(t)) return;
        if (!r.bypassPrefetchedCheck) {
          let o = void 0 !== r.locale ? r.locale : "locale" in e ? e.locale : void 0;
          let u = t + "%" + n + "%" + o;
          if (v.has(u)) return;
          v.add(u);
        }
        let f =
          u
            ? e.prefetch(t, o)
            : e.prefetch(t, n, r);
        Promise.resolve(f).catch(e => {});
      }
      function b(e) {
        return "string" == typeof e ? e : f.formatUrl(e);
      }
      let m = o.default.forwardRef(function (e, t) {
        let n, r;
        let {
          href: f,
          as: v,
          children: m,
          prefetch: g = null,
          passHref: O,
          replace: C,
          shallow: j,
          scroll: E,
          locale: M,
          onClick: P,
          onMouseEnter: T,
          onTouchStart: k,
          legacyBehavior: x = !1,
          ...R
        } = e;
        n = m;
        x &&
          ("string" == typeof n || "number" == typeof n) &&
          (n = o.default.createElement("a", null, n));
        let A = o.default.useContext(c.RouterContext),
          I = o.default.useContext(s.AppRouterContext),
          N = null != A ? A : I,
          L = !A,
          S = !1 !== g,
          w = null === g ? y.PrefetchKind.AUTO : y.PrefetchKind.FULL,
          { href: U, as: K } = o.default.useMemo(
            () => {
              if (!A) {
                let e = b(f);
                return { href: e, as: v ? b(v) : e };
              }
              let [e, t] = u.resolveHref(A, f, !0);
              return { href: e, as: v ? u.resolveHref(A, v) : t || e };
            },
            [A, f, v]
          ),
          F
