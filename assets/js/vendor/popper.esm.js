var R = "top", T = "bottom", L = "right", B = "left", Pe = "auto", fe = [R, T, L, B], Q = "start", oe = "end", mt = "clippingParents", Qe = "viewport", ae = "popper", gt = "reference", qe = /* @__PURE__ */ fe.reduce(function(e, t) {
  return e.concat([t + "-" + Q, t + "-" + oe]);
}, []), Ze = /* @__PURE__ */ [].concat(fe, [Pe]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Q, t + "-" + oe]);
}, []), yt = "beforeRead", bt = "read", wt = "afterRead", xt = "beforeMain", Ot = "main", At = "afterMain", Et = "beforeWrite", Pt = "write", Dt = "afterWrite", $t = [yt, bt, wt, xt, Ot, At, Et, Pt, Dt];
function V(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function S(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function J(e) {
  var t = S(e).Element;
  return e instanceof t || e instanceof Element;
}
function k(e) {
  var t = S(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function De(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = S(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function jt(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var a = t.styles[r] || {}, n = t.attributes[r] || {}, i = t.elements[r];
    !k(i) || !V(i) || (Object.assign(i.style, a), Object.keys(n).forEach(function(p) {
      var s = n[p];
      s === !1 ? i.removeAttribute(p) : i.setAttribute(p, s === !0 ? "" : s);
    }));
  });
}
function Rt(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(a) {
      var n = t.elements[a], i = t.attributes[a] || {}, p = Object.keys(t.styles.hasOwnProperty(a) ? t.styles[a] : r[a]), s = p.reduce(function(o, c) {
        return o[c] = "", o;
      }, {});
      !k(n) || !V(n) || (Object.assign(n.style, s), Object.keys(i).forEach(function(o) {
        n.removeAttribute(o);
      }));
    });
  };
}
const _e = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: jt,
  effect: Rt,
  requires: ["computeStyles"]
};
function H(e) {
  return e.split("-")[0];
}
var G = Math.max, ge = Math.min, Z = Math.round;
function Ae() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function et() {
  return !/^((?!chrome|android).)*safari/i.test(Ae());
}
function _(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var a = e.getBoundingClientRect(), n = 1, i = 1;
  t && k(e) && (n = e.offsetWidth > 0 && Z(a.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Z(a.height) / e.offsetHeight || 1);
  var p = J(e) ? S(e) : window, s = p.visualViewport, o = !et() && r, c = (a.left + (o && s ? s.offsetLeft : 0)) / n, f = (a.top + (o && s ? s.offsetTop : 0)) / i, h = a.width / n, y = a.height / i;
  return {
    width: h,
    height: y,
    top: f,
    right: c + h,
    bottom: f + y,
    left: c,
    x: c,
    y: f
  };
}
function $e(e) {
  var t = _(e), r = e.offsetWidth, a = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - a) <= 1 && (a = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: a
  };
}
function tt(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && De(r)) {
    var a = t;
    do {
      if (a && e.isSameNode(a))
        return !0;
      a = a.parentNode || a.host;
    } while (a);
  }
  return !1;
}
function N(e) {
  return S(e).getComputedStyle(e);
}
function Bt(e) {
  return ["table", "td", "th"].indexOf(V(e)) >= 0;
}
function q(e) {
  return ((J(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function ye(e) {
  return V(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (De(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    q(e)
  );
}
function Xe(e) {
  return !k(e) || // https://github.com/popperjs/popper-core/issues/837
  N(e).position === "fixed" ? null : e.offsetParent;
}
function Ct(e) {
  var t = /firefox/i.test(Ae()), r = /Trident/i.test(Ae());
  if (r && k(e)) {
    var a = N(e);
    if (a.position === "fixed")
      return null;
  }
  var n = ye(e);
  for (De(n) && (n = n.host); k(n) && ["html", "body"].indexOf(V(n)) < 0; ) {
    var i = N(n);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function pe(e) {
  for (var t = S(e), r = Xe(e); r && Bt(r) && N(r).position === "static"; )
    r = Xe(r);
  return r && (V(r) === "html" || V(r) === "body" && N(r).position === "static") ? t : r || Ct(e) || t;
}
function je(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ne(e, t, r) {
  return G(e, ge(t, r));
}
function St(e, t, r) {
  var a = ne(e, t, r);
  return a > r ? r : a;
}
function rt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function at(e) {
  return Object.assign({}, rt(), e);
}
function nt(e, t) {
  return t.reduce(function(r, a) {
    return r[a] = e, r;
  }, {});
}
var kt = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, at(typeof t != "number" ? t : nt(t, fe));
};
function Tt(e) {
  var t, r = e.state, a = e.name, n = e.options, i = r.elements.arrow, p = r.modifiersData.popperOffsets, s = H(r.placement), o = je(s), c = [B, L].indexOf(s) >= 0, f = c ? "height" : "width";
  if (!(!i || !p)) {
    var h = kt(n.padding, r), y = $e(i), u = o === "y" ? R : B, w = o === "y" ? T : L, d = r.rects.reference[f] + r.rects.reference[o] - p[o] - r.rects.popper[f], v = p[o] - r.rects.reference[o], b = pe(i), O = b ? o === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, A = d / 2 - v / 2, l = h[u], m = O - y[f] - h[w], g = O / 2 - y[f] / 2 + A, x = ne(l, g, m), D = o;
    r.modifiersData[a] = (t = {}, t[D] = x, t.centerOffset = x - g, t);
  }
}
function Lt(e) {
  var t = e.state, r = e.options, a = r.element, n = a === void 0 ? "[data-popper-arrow]" : a;
  n != null && (typeof n == "string" && (n = t.elements.popper.querySelector(n), !n) || tt(t.elements.popper, n) && (t.elements.arrow = n));
}
const Mt = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Tt,
  effect: Lt,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ee(e) {
  return e.split("-")[1];
}
var Wt = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ht(e, t) {
  var r = e.x, a = e.y, n = t.devicePixelRatio || 1;
  return {
    x: Z(r * n) / n || 0,
    y: Z(a * n) / n || 0
  };
}
function Ie(e) {
  var t, r = e.popper, a = e.popperRect, n = e.placement, i = e.variation, p = e.offsets, s = e.position, o = e.gpuAcceleration, c = e.adaptive, f = e.roundOffsets, h = e.isFixed, y = p.x, u = y === void 0 ? 0 : y, w = p.y, d = w === void 0 ? 0 : w, v = typeof f == "function" ? f({
    x: u,
    y: d
  }) : {
    x: u,
    y: d
  };
  u = v.x, d = v.y;
  var b = p.hasOwnProperty("x"), O = p.hasOwnProperty("y"), A = B, l = R, m = window;
  if (c) {
    var g = pe(r), x = "clientHeight", D = "clientWidth";
    if (g === S(r) && (g = q(r), N(g).position !== "static" && s === "absolute" && (x = "scrollHeight", D = "scrollWidth")), g = g, n === R || (n === B || n === L) && i === oe) {
      l = T;
      var P = h && g === m && m.visualViewport ? m.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        g[x]
      );
      d -= P - a.height, d *= o ? 1 : -1;
    }
    if (n === B || (n === R || n === T) && i === oe) {
      A = L;
      var E = h && g === m && m.visualViewport ? m.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        g[D]
      );
      u -= E - a.width, u *= o ? 1 : -1;
    }
  }
  var $ = Object.assign({
    position: s
  }, c && Wt), M = f === !0 ? Ht({
    x: u,
    y: d
  }, S(r)) : {
    x: u,
    y: d
  };
  if (u = M.x, d = M.y, o) {
    var j;
    return Object.assign({}, $, (j = {}, j[l] = O ? "0" : "", j[A] = b ? "0" : "", j.transform = (m.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + d + "px)" : "translate3d(" + u + "px, " + d + "px, 0)", j));
  }
  return Object.assign({}, $, (t = {}, t[l] = O ? d + "px" : "", t[A] = b ? u + "px" : "", t.transform = "", t));
}
function Vt(e) {
  var t = e.state, r = e.options, a = r.gpuAcceleration, n = a === void 0 ? !0 : a, i = r.adaptive, p = i === void 0 ? !0 : i, s = r.roundOffsets, o = s === void 0 ? !0 : s, c = {
    placement: H(t.placement),
    variation: ee(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ie(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: p,
    roundOffsets: o
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ie(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: o
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const it = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Vt,
  data: {}
};
var he = {
  passive: !0
};
function Nt(e) {
  var t = e.state, r = e.instance, a = e.options, n = a.scroll, i = n === void 0 ? !0 : n, p = a.resize, s = p === void 0 ? !0 : p, o = S(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && c.forEach(function(f) {
    f.addEventListener("scroll", r.update, he);
  }), s && o.addEventListener("resize", r.update, he), function() {
    i && c.forEach(function(f) {
      f.removeEventListener("scroll", r.update, he);
    }), s && o.removeEventListener("resize", r.update, he);
  };
}
const ot = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Nt,
  data: {}
};
var Ft = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function me(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Ft[t];
  });
}
var qt = {
  start: "end",
  end: "start"
};
function Ye(e) {
  return e.replace(/start|end/g, function(t) {
    return qt[t];
  });
}
function Re(e) {
  var t = S(e), r = t.pageXOffset, a = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: a
  };
}
function Be(e) {
  return _(q(e)).left + Re(e).scrollLeft;
}
function Xt(e, t) {
  var r = S(e), a = q(e), n = r.visualViewport, i = a.clientWidth, p = a.clientHeight, s = 0, o = 0;
  if (n) {
    i = n.width, p = n.height;
    var c = et();
    (c || !c && t === "fixed") && (s = n.offsetLeft, o = n.offsetTop);
  }
  return {
    width: i,
    height: p,
    x: s + Be(e),
    y: o
  };
}
function It(e) {
  var t, r = q(e), a = Re(e), n = (t = e.ownerDocument) == null ? void 0 : t.body, i = G(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), p = G(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), s = -a.scrollLeft + Be(e), o = -a.scrollTop;
  return N(n || r).direction === "rtl" && (s += G(r.clientWidth, n ? n.clientWidth : 0) - i), {
    width: i,
    height: p,
    x: s,
    y: o
  };
}
function Ce(e) {
  var t = N(e), r = t.overflow, a = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + a);
}
function st(e) {
  return ["html", "body", "#document"].indexOf(V(e)) >= 0 ? e.ownerDocument.body : k(e) && Ce(e) ? e : st(ye(e));
}
function ie(e, t) {
  var r;
  t === void 0 && (t = []);
  var a = st(e), n = a === ((r = e.ownerDocument) == null ? void 0 : r.body), i = S(a), p = n ? [i].concat(i.visualViewport || [], Ce(a) ? a : []) : a, s = t.concat(p);
  return n ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(ie(ye(p)))
  );
}
function Ee(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Yt(e, t) {
  var r = _(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ze(e, t, r) {
  return t === Qe ? Ee(Xt(e, r)) : J(t) ? Yt(t, r) : Ee(It(q(e)));
}
function zt(e) {
  var t = ie(ye(e)), r = ["absolute", "fixed"].indexOf(N(e).position) >= 0, a = r && k(e) ? pe(e) : e;
  return J(a) ? t.filter(function(n) {
    return J(n) && tt(n, a) && V(n) !== "body";
  }) : [];
}
function Ut(e, t, r, a) {
  var n = t === "clippingParents" ? zt(e) : [].concat(t), i = [].concat(n, [r]), p = i[0], s = i.reduce(function(o, c) {
    var f = ze(e, c, a);
    return o.top = G(f.top, o.top), o.right = ge(f.right, o.right), o.bottom = ge(f.bottom, o.bottom), o.left = G(f.left, o.left), o;
  }, ze(e, p, a));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ft(e) {
  var t = e.reference, r = e.element, a = e.placement, n = a ? H(a) : null, i = a ? ee(a) : null, p = t.x + t.width / 2 - r.width / 2, s = t.y + t.height / 2 - r.height / 2, o;
  switch (n) {
    case R:
      o = {
        x: p,
        y: t.y - r.height
      };
      break;
    case T:
      o = {
        x: p,
        y: t.y + t.height
      };
      break;
    case L:
      o = {
        x: t.x + t.width,
        y: s
      };
      break;
    case B:
      o = {
        x: t.x - r.width,
        y: s
      };
      break;
    default:
      o = {
        x: t.x,
        y: t.y
      };
  }
  var c = n ? je(n) : null;
  if (c != null) {
    var f = c === "y" ? "height" : "width";
    switch (i) {
      case Q:
        o[c] = o[c] - (t[f] / 2 - r[f] / 2);
        break;
      case oe:
        o[c] = o[c] + (t[f] / 2 - r[f] / 2);
        break;
    }
  }
  return o;
}
function se(e, t) {
  t === void 0 && (t = {});
  var r = t, a = r.placement, n = a === void 0 ? e.placement : a, i = r.strategy, p = i === void 0 ? e.strategy : i, s = r.boundary, o = s === void 0 ? mt : s, c = r.rootBoundary, f = c === void 0 ? Qe : c, h = r.elementContext, y = h === void 0 ? ae : h, u = r.altBoundary, w = u === void 0 ? !1 : u, d = r.padding, v = d === void 0 ? 0 : d, b = at(typeof v != "number" ? v : nt(v, fe)), O = y === ae ? gt : ae, A = e.rects.popper, l = e.elements[w ? O : y], m = Ut(J(l) ? l : l.contextElement || q(e.elements.popper), o, f, p), g = _(e.elements.reference), x = ft({
    reference: g,
    element: A,
    placement: n
  }), D = Ee(Object.assign({}, A, x)), P = y === ae ? D : g, E = {
    top: m.top - P.top + b.top,
    bottom: P.bottom - m.bottom + b.bottom,
    left: m.left - P.left + b.left,
    right: P.right - m.right + b.right
  }, $ = e.modifiersData.offset;
  if (y === ae && $) {
    var M = $[n];
    Object.keys(E).forEach(function(j) {
      var X = [L, T].indexOf(j) >= 0 ? 1 : -1, I = [R, T].indexOf(j) >= 0 ? "y" : "x";
      E[j] += M[I] * X;
    });
  }
  return E;
}
function Gt(e, t) {
  t === void 0 && (t = {});
  var r = t, a = r.placement, n = r.boundary, i = r.rootBoundary, p = r.padding, s = r.flipVariations, o = r.allowedAutoPlacements, c = o === void 0 ? Ze : o, f = ee(a), h = f ? s ? qe : qe.filter(function(w) {
    return ee(w) === f;
  }) : fe, y = h.filter(function(w) {
    return c.indexOf(w) >= 0;
  });
  y.length === 0 && (y = h);
  var u = y.reduce(function(w, d) {
    return w[d] = se(e, {
      placement: d,
      boundary: n,
      rootBoundary: i,
      padding: p
    })[H(d)], w;
  }, {});
  return Object.keys(u).sort(function(w, d) {
    return u[w] - u[d];
  });
}
function Jt(e) {
  if (H(e) === Pe)
    return [];
  var t = me(e);
  return [Ye(e), t, Ye(t)];
}
function Kt(e) {
  var t = e.state, r = e.options, a = e.name;
  if (!t.modifiersData[a]._skip) {
    for (var n = r.mainAxis, i = n === void 0 ? !0 : n, p = r.altAxis, s = p === void 0 ? !0 : p, o = r.fallbackPlacements, c = r.padding, f = r.boundary, h = r.rootBoundary, y = r.altBoundary, u = r.flipVariations, w = u === void 0 ? !0 : u, d = r.allowedAutoPlacements, v = t.options.placement, b = H(v), O = b === v, A = o || (O || !w ? [me(v)] : Jt(v)), l = [v].concat(A).reduce(function(K, F) {
      return K.concat(H(F) === Pe ? Gt(t, {
        placement: F,
        boundary: f,
        rootBoundary: h,
        padding: c,
        flipVariations: w,
        allowedAutoPlacements: d
      }) : F);
    }, []), m = t.rects.reference, g = t.rects.popper, x = /* @__PURE__ */ new Map(), D = !0, P = l[0], E = 0; E < l.length; E++) {
      var $ = l[E], M = H($), j = ee($) === Q, X = [R, T].indexOf(M) >= 0, I = X ? "width" : "height", C = se(t, {
        placement: $,
        boundary: f,
        rootBoundary: h,
        altBoundary: y,
        padding: c
      }), W = X ? j ? L : B : j ? T : R;
      m[I] > g[I] && (W = me(W));
      var ce = me(W), Y = [];
      if (i && Y.push(C[M] <= 0), s && Y.push(C[W] <= 0, C[ce] <= 0), Y.every(function(K) {
        return K;
      })) {
        P = $, D = !1;
        break;
      }
      x.set($, Y);
    }
    if (D)
      for (var ue = w ? 3 : 1, be = function(F) {
        var re = l.find(function(ve) {
          var z = x.get(ve);
          if (z)
            return z.slice(0, F).every(function(we) {
              return we;
            });
        });
        if (re)
          return P = re, "break";
      }, te = ue; te > 0; te--) {
        var le = be(te);
        if (le === "break") break;
      }
    t.placement !== P && (t.modifiersData[a]._skip = !0, t.placement = P, t.reset = !0);
  }
}
const Qt = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Kt,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ue(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function Ge(e) {
  return [R, L, T, B].some(function(t) {
    return e[t] >= 0;
  });
}
function Zt(e) {
  var t = e.state, r = e.name, a = t.rects.reference, n = t.rects.popper, i = t.modifiersData.preventOverflow, p = se(t, {
    elementContext: "reference"
  }), s = se(t, {
    altBoundary: !0
  }), o = Ue(p, a), c = Ue(s, n, i), f = Ge(o), h = Ge(c);
  t.modifiersData[r] = {
    referenceClippingOffsets: o,
    popperEscapeOffsets: c,
    isReferenceHidden: f,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": h
  });
}
const _t = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Zt
};
function er(e, t, r) {
  var a = H(e), n = [B, R].indexOf(a) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, p = i[0], s = i[1];
  return p = p || 0, s = (s || 0) * n, [B, L].indexOf(a) >= 0 ? {
    x: s,
    y: p
  } : {
    x: p,
    y: s
  };
}
function tr(e) {
  var t = e.state, r = e.options, a = e.name, n = r.offset, i = n === void 0 ? [0, 0] : n, p = Ze.reduce(function(f, h) {
    return f[h] = er(h, t.rects, i), f;
  }, {}), s = p[t.placement], o = s.x, c = s.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += o, t.modifiersData.popperOffsets.y += c), t.modifiersData[a] = p;
}
const rr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: tr
};
function ar(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = ft({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const pt = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ar,
  data: {}
};
function nr(e) {
  return e === "x" ? "y" : "x";
}
function ir(e) {
  var t = e.state, r = e.options, a = e.name, n = r.mainAxis, i = n === void 0 ? !0 : n, p = r.altAxis, s = p === void 0 ? !1 : p, o = r.boundary, c = r.rootBoundary, f = r.altBoundary, h = r.padding, y = r.tether, u = y === void 0 ? !0 : y, w = r.tetherOffset, d = w === void 0 ? 0 : w, v = se(t, {
    boundary: o,
    rootBoundary: c,
    padding: h,
    altBoundary: f
  }), b = H(t.placement), O = ee(t.placement), A = !O, l = je(b), m = nr(l), g = t.modifiersData.popperOffsets, x = t.rects.reference, D = t.rects.popper, P = typeof d == "function" ? d(Object.assign({}, t.rects, {
    placement: t.placement
  })) : d, E = typeof P == "number" ? {
    mainAxis: P,
    altAxis: P
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, P), $ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, M = {
    x: 0,
    y: 0
  };
  if (g) {
    if (i) {
      var j, X = l === "y" ? R : B, I = l === "y" ? T : L, C = l === "y" ? "height" : "width", W = g[l], ce = W + v[X], Y = W - v[I], ue = u ? -D[C] / 2 : 0, be = O === Q ? x[C] : D[C], te = O === Q ? -D[C] : -x[C], le = t.elements.arrow, K = u && le ? $e(le) : {
        width: 0,
        height: 0
      }, F = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : rt(), re = F[X], ve = F[I], z = ne(0, x[C], K[C]), we = A ? x[C] / 2 - ue - z - re - E.mainAxis : be - z - re - E.mainAxis, ct = A ? -x[C] / 2 + ue + z + ve + E.mainAxis : te + z + ve + E.mainAxis, xe = t.elements.arrow && pe(t.elements.arrow), ut = xe ? l === "y" ? xe.clientTop || 0 : xe.clientLeft || 0 : 0, ke = (j = $?.[l]) != null ? j : 0, lt = W + we - ke - ut, vt = W + ct - ke, Te = ne(u ? ge(ce, lt) : ce, W, u ? G(Y, vt) : Y);
      g[l] = Te, M[l] = Te - W;
    }
    if (s) {
      var Le, dt = l === "x" ? R : B, ht = l === "x" ? T : L, U = g[m], de = m === "y" ? "height" : "width", Me = U + v[dt], We = U - v[ht], Oe = [R, B].indexOf(b) !== -1, He = (Le = $?.[m]) != null ? Le : 0, Ve = Oe ? Me : U - x[de] - D[de] - He + E.altAxis, Ne = Oe ? U + x[de] + D[de] - He - E.altAxis : We, Fe = u && Oe ? St(Ve, U, Ne) : ne(u ? Ve : Me, U, u ? Ne : We);
      g[m] = Fe, M[m] = Fe - U;
    }
    t.modifiersData[a] = M;
  }
}
const or = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ir,
  requiresIfExists: ["offset"]
};
function sr(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function fr(e) {
  return e === S(e) || !k(e) ? Re(e) : sr(e);
}
function pr(e) {
  var t = e.getBoundingClientRect(), r = Z(t.width) / e.offsetWidth || 1, a = Z(t.height) / e.offsetHeight || 1;
  return r !== 1 || a !== 1;
}
function cr(e, t, r) {
  r === void 0 && (r = !1);
  var a = k(t), n = k(t) && pr(t), i = q(t), p = _(e, n, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, o = {
    x: 0,
    y: 0
  };
  return (a || !a && !r) && ((V(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ce(i)) && (s = fr(t)), k(t) ? (o = _(t, !0), o.x += t.clientLeft, o.y += t.clientTop) : i && (o.x = Be(i))), {
    x: p.left + s.scrollLeft - o.x,
    y: p.top + s.scrollTop - o.y,
    width: p.width,
    height: p.height
  };
}
function ur(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), a = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function n(i) {
    r.add(i.name);
    var p = [].concat(i.requires || [], i.requiresIfExists || []);
    p.forEach(function(s) {
      if (!r.has(s)) {
        var o = t.get(s);
        o && n(o);
      }
    }), a.push(i);
  }
  return e.forEach(function(i) {
    r.has(i.name) || n(i);
  }), a;
}
function lr(e) {
  var t = ur(e);
  return $t.reduce(function(r, a) {
    return r.concat(t.filter(function(n) {
      return n.phase === a;
    }));
  }, []);
}
function vr(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function dr(e) {
  var t = e.reduce(function(r, a) {
    var n = r[a.name];
    return r[a.name] = n ? Object.assign({}, n, a, {
      options: Object.assign({}, n.options, a.options),
      data: Object.assign({}, n.data, a.data)
    }) : a, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var Je = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ke() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(a) {
    return !(a && typeof a.getBoundingClientRect == "function");
  });
}
function Se(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, a = r === void 0 ? [] : r, n = t.defaultOptions, i = n === void 0 ? Je : n;
  return function(s, o, c) {
    c === void 0 && (c = i);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Je, i),
      modifiersData: {},
      elements: {
        reference: s,
        popper: o
      },
      attributes: {},
      styles: {}
    }, h = [], y = !1, u = {
      state: f,
      setOptions: function(b) {
        var O = typeof b == "function" ? b(f.options) : b;
        d(), f.options = Object.assign({}, i, f.options, O), f.scrollParents = {
          reference: J(s) ? ie(s) : s.contextElement ? ie(s.contextElement) : [],
          popper: ie(o)
        };
        var A = lr(dr([].concat(a, f.options.modifiers)));
        return f.orderedModifiers = A.filter(function(l) {
          return l.enabled;
        }), w(), u.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!y) {
          var b = f.elements, O = b.reference, A = b.popper;
          if (Ke(O, A)) {
            f.rects = {
              reference: cr(O, pe(A), f.options.strategy === "fixed"),
              popper: $e(A)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(E) {
              return f.modifiersData[E.name] = Object.assign({}, E.data);
            });
            for (var l = 0; l < f.orderedModifiers.length; l++) {
              if (f.reset === !0) {
                f.reset = !1, l = -1;
                continue;
              }
              var m = f.orderedModifiers[l], g = m.fn, x = m.options, D = x === void 0 ? {} : x, P = m.name;
              typeof g == "function" && (f = g({
                state: f,
                options: D,
                name: P,
                instance: u
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: vr(function() {
        return new Promise(function(v) {
          u.forceUpdate(), v(f);
        });
      }),
      destroy: function() {
        d(), y = !0;
      }
    };
    if (!Ke(s, o))
      return u;
    u.setOptions(c).then(function(v) {
      !y && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function w() {
      f.orderedModifiers.forEach(function(v) {
        var b = v.name, O = v.options, A = O === void 0 ? {} : O, l = v.effect;
        if (typeof l == "function") {
          var m = l({
            state: f,
            name: b,
            instance: u,
            options: A
          }), g = function() {
          };
          h.push(m || g);
        }
      });
    }
    function d() {
      h.forEach(function(v) {
        return v();
      }), h = [];
    }
    return u;
  };
}
var gr = /* @__PURE__ */ Se(), hr = [ot, pt, it, _e], yr = /* @__PURE__ */ Se({
  defaultModifiers: hr
}), mr = [ot, pt, it, _e, rr, Qt, or, Mt, _t], br = /* @__PURE__ */ Se({
  defaultModifiers: mr
});
export {
  At as afterMain,
  wt as afterRead,
  Dt as afterWrite,
  _e as applyStyles,
  Mt as arrow,
  Pe as auto,
  fe as basePlacements,
  xt as beforeMain,
  yt as beforeRead,
  Et as beforeWrite,
  T as bottom,
  mt as clippingParents,
  it as computeStyles,
  br as createPopper,
  gr as createPopperBase,
  yr as createPopperLite,
  se as detectOverflow,
  oe as end,
  ot as eventListeners,
  Qt as flip,
  _t as hide,
  B as left,
  Ot as main,
  $t as modifierPhases,
  rr as offset,
  Ze as placements,
  ae as popper,
  Se as popperGenerator,
  pt as popperOffsets,
  or as preventOverflow,
  bt as read,
  gt as reference,
  L as right,
  Q as start,
  R as top,
  qe as variationPlacements,
  Qe as viewport,
  Pt as write
};
