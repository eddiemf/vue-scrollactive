!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 7));
})([
  function (e, t, n) {
    'use strict';
    var o,
      r = function () {
        return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), o;
      },
      i = (function () {
        var e = {};
        return function (t) {
          if (void 0 === e[t]) {
            var n = document.querySelector(t);
            if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
              try {
                n = n.contentDocument.head;
              } catch (e) {
                n = null;
              }
            e[t] = n;
          }
          return e[t];
        };
      })(),
      a = [];
    function s(e) {
      for (var t = -1, n = 0; n < a.length; n++)
        if (a[n].identifier === e) {
          t = n;
          break;
        }
      return t;
    }
    function l(e, t) {
      for (var n = {}, o = [], r = 0; r < e.length; r++) {
        var i = e[r],
          l = t.base ? i[0] + t.base : i[0],
          c = n[l] || 0,
          u = ''.concat(l, ' ').concat(c);
        n[l] = c + 1;
        var f = s(u),
          d = { css: i[1], media: i[2], sourceMap: i[3] };
        -1 !== f
          ? (a[f].references++, a[f].updater(d))
          : a.push({ identifier: u, updater: v(d, t), references: 1 }),
          o.push(u);
      }
      return o;
    }
    function c(e) {
      var t = document.createElement('style'),
        o = e.attributes || {};
      if (void 0 === o.nonce) {
        var r = n.nc;
        r && (o.nonce = r);
      }
      if (
        (Object.keys(o).forEach(function (e) {
          t.setAttribute(e, o[e]);
        }),
        'function' == typeof e.insert)
      )
        e.insert(t);
      else {
        var a = i(e.insert || 'head');
        if (!a)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        a.appendChild(t);
      }
      return t;
    }
    var u,
      f =
        ((u = []),
        function (e, t) {
          return (u[e] = t), u.filter(Boolean).join('\n');
        });
    function d(e, t, n, o) {
      var r = n ? '' : o.media ? '@media '.concat(o.media, ' {').concat(o.css, '}') : o.css;
      if (e.styleSheet) e.styleSheet.cssText = f(t, r);
      else {
        var i = document.createTextNode(r),
          a = e.childNodes;
        a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(i, a[t]) : e.appendChild(i);
      }
    }
    function m(e, t, n) {
      var o = n.css,
        r = n.media,
        i = n.sourceMap;
      if (
        (r ? e.setAttribute('media', r) : e.removeAttribute('media'),
        i &&
          btoa &&
          (o += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
            ' */'
          )),
        e.styleSheet)
      )
        e.styleSheet.cssText = o;
      else {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(o));
      }
    }
    var p = null,
      h = 0;
    function v(e, t) {
      var n, o, r;
      if (t.singleton) {
        var i = h++;
        (n = p || (p = c(t))), (o = d.bind(null, n, i, !1)), (r = d.bind(null, n, i, !0));
      } else
        (n = c(t)),
          (o = m.bind(null, n, t)),
          (r = function () {
            !(function (e) {
              if (null === e.parentNode) return !1;
              e.parentNode.removeChild(e);
            })(n);
          });
      return (
        o(e),
        function (t) {
          if (t) {
            if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
            o((e = t));
          } else r();
        }
      );
    }
    e.exports = function (e, t) {
      (t = t || {}).singleton || 'boolean' == typeof t.singleton || (t.singleton = r());
      var n = l((e = e || []), t);
      return function (e) {
        if (((e = e || []), '[object Array]' === Object.prototype.toString.call(e))) {
          for (var o = 0; o < n.length; o++) {
            var r = s(n[o]);
            a[r].references--;
          }
          for (var i = l(e, t), c = 0; c < n.length; c++) {
            var u = s(n[c]);
            0 === a[u].references && (a[u].updater(), a.splice(u, 1));
          }
          n = i;
        }
      };
    };
  },
  function (e, t, n) {
    'use strict';
    e.exports = function (e) {
      var t = [];
      return (
        (t.toString = function () {
          return this.map(function (t) {
            var n = (function (e, t) {
              var n = e[1] || '',
                o = e[3];
              if (!o) return n;
              if (t && 'function' == typeof btoa) {
                var r =
                    ((a = o),
                    (s = btoa(unescape(encodeURIComponent(JSON.stringify(a))))),
                    (l = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(s)),
                    '/*# '.concat(l, ' */')),
                  i = o.sources.map(function (e) {
                    return '/*# sourceURL='.concat(o.sourceRoot || '').concat(e, ' */');
                  });
                return [n].concat(i).concat([r]).join('\n');
              }
              var a, s, l;
              return [n].join('\n');
            })(t, e);
            return t[2] ? '@media '.concat(t[2], ' {').concat(n, '}') : n;
          }).join('');
        }),
        (t.i = function (e, n, o) {
          'string' == typeof e && (e = [[null, e, '']]);
          var r = {};
          if (o)
            for (var i = 0; i < this.length; i++) {
              var a = this[i][0];
              null != a && (r[a] = !0);
            }
          for (var s = 0; s < e.length; s++) {
            var l = [].concat(e[s]);
            (o && r[l[0]]) ||
              (n && (l[2] ? (l[2] = ''.concat(n, ' and ').concat(l[2])) : (l[2] = n)), t.push(l));
          }
        }),
        t
      );
    };
  },
  function (e, t) {
    var n = 'function' == typeof Float32Array;
    function o(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function r(e, t) {
      return 3 * t - 6 * e;
    }
    function i(e) {
      return 3 * e;
    }
    function a(e, t, n) {
      return ((o(t, n) * e + r(t, n)) * e + i(t)) * e;
    }
    function s(e, t, n) {
      return 3 * o(t, n) * e * e + 2 * r(t, n) * e + i(t);
    }
    function l(e) {
      return e;
    }
    e.exports = function (e, t, o, r) {
      if (!(0 <= e && e <= 1 && 0 <= o && o <= 1))
        throw new Error('bezier x values must be in [0, 1] range');
      if (e === t && o === r) return l;
      for (var i = n ? new Float32Array(11) : new Array(11), c = 0; c < 11; ++c)
        i[c] = a(0.1 * c, e, o);
      function u(t) {
        for (var n = 0, r = 1; 10 !== r && i[r] <= t; ++r) n += 0.1;
        --r;
        var l = n + 0.1 * ((t - i[r]) / (i[r + 1] - i[r])),
          c = s(l, e, o);
        return c >= 0.001
          ? (function (e, t, n, o) {
              for (var r = 0; r < 4; ++r) {
                var i = s(t, n, o);
                if (0 === i) return t;
                t -= (a(t, n, o) - e) / i;
              }
              return t;
            })(t, l, e, o)
          : 0 === c
          ? l
          : (function (e, t, n, o, r) {
              var i,
                s,
                l = 0;
              do {
                (i = a((s = t + (n - t) / 2), o, r) - e) > 0 ? (n = s) : (t = s);
              } while (Math.abs(i) > 1e-7 && ++l < 10);
              return s;
            })(t, n, n + 0.1, e, o);
      }
      return function (e) {
        return 0 === e ? 0 : 1 === e ? 1 : a(u(e), t, r);
      };
    };
  },
  function (e, t, n) {
    var o = n(0),
      r = n(4);
    'string' == typeof (r = r.__esModule ? r.default : r) && (r = [[e.i, r, '']]);
    var i = { insert: 'head', singleton: !1 };
    o(r, i);
    e.exports = r.locals || {};
  },
  function (e, t, n) {
    (t = n(1)(!1)).push([
      e.i,
      '/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:0.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace, monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-cancel-button,[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}\n',
      '',
    ]),
      (e.exports = t);
  },
  function (e, t, n) {
    var o = n(0),
      r = n(6);
    'string' == typeof (r = r.__esModule ? r.default : r) && (r = [[e.i, r, '']]);
    var i = { insert: 'head', singleton: !1 };
    o(r, i);
    e.exports = r.locals || {};
  },
  function (e, t, n) {
    (t = n(1)(!1)).push([
      e.i,
      '.nav.is-fixed{position:fixed;left:0;right:0}.nav.is-fixed .is-active{color:#00d1b2}.section{padding-top:100px}.buttons{position:fixed;z-index:10;top:100px;right:100px;padding:15px 30px;border-radius:10px;background-color:#7a7a7a;background-color:#fff}.buttons label{display:block}.buttons input,.buttons button{display:block;width:100%;height:42px;padding:10px 20px;margin-top:15px;margin-bottom:15px;border:0;border:2px solid #00d1b2;border-radius:10px;font-weight:600;outline:0;transition:all 0.1s}.buttons button{background-color:#00d1b2;cursor:pointer;color:#fff}.buttons button:hover{background-color:#fff;color:#00d1b2}\n',
      '',
    ]),
      (e.exports = t);
  },
  function (e, t, n) {
    'use strict';
    n.r(t);
    var o = function () {
      var e = this.$createElement;
      return (this._self._c || e)(
        this.tag,
        { ref: 'scrollactive-nav-wrapper', tag: 'component', staticClass: 'scrollactive-nav' },
        [this._t('default')],
        2
      );
    };
    o._withStripped = !0;
    var r = n(2),
      i = n.n(r);
    function a(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return s(e);
        })(e) ||
        (function (e) {
          if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
        })(e) ||
        (function (e, t) {
          if (!e) return;
          if ('string' == typeof e) return s(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          'Object' === n && e.constructor && (n = e.constructor.name);
          if ('Map' === n || 'Set' === n) return Array.from(e);
          if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return s(e, t);
        })(e) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          );
        })()
      );
    }
    function s(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
      return o;
    }
    var l = (function (e, t, n, o, r, i, a, s) {
      var l,
        c = 'function' == typeof e ? e.options : e;
      if (
        (t && ((c.render = t), (c.staticRenderFns = n), (c._compiled = !0)),
        o && (c.functional = !0),
        i && (c._scopeId = 'data-v-' + i),
        a
          ? ((l = function (e) {
              (e =
                e ||
                (this.$vnode && this.$vnode.ssrContext) ||
                (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext)) ||
                'undefined' == typeof __VUE_SSR_CONTEXT__ ||
                (e = __VUE_SSR_CONTEXT__),
                r && r.call(this, e),
                e && e._registeredComponents && e._registeredComponents.add(a);
            }),
            (c._ssrRegister = l))
          : r &&
            (l = s
              ? function () {
                  r.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot);
                }
              : r),
        l)
      )
        if (c.functional) {
          c._injectStyles = l;
          var u = c.render;
          c.render = function (e, t) {
            return l.call(t), u(e, t);
          };
        } else {
          var f = c.beforeCreate;
          c.beforeCreate = f ? [].concat(f, l) : [l];
        }
      return { exports: e, options: c };
    })(
      {
        props: {
          activeClass: { type: String, default: 'is-active' },
          offset: { type: Number, default: 20 },
          scrollOffset: { type: Number, default: null },
          scrollContainerSelector: { type: String, default: '' },
          clickToScroll: { type: Boolean, default: !0 },
          duration: { type: Number, default: 600 },
          alwaysTrack: { type: Boolean, default: !1 },
          bezierEasingValue: { type: String, default: '.5,0,.35,1' },
          modifyUrl: { type: Boolean, default: !0 },
          exact: { type: Boolean, default: !1 },
          highlightFirstItem: { type: Boolean, default: !1 },
          tag: { type: String, default: 'nav' },
          scrollOnStart: { type: Boolean, default: !0 },
        },
        data: function () {
          return {
            observer: null,
            items: [],
            currentItem: null,
            lastActiveItem: null,
            scrollAnimationFrame: null,
            bezierEasing: i.a,
          };
        },
        computed: {
          cubicBezierArray: function () {
            return this.bezierEasingValue.split(',');
          },
          scrollContainer: function () {
            var e = window;
            return (
              this.scrollContainerSelector &&
                (e = document.querySelector(this.scrollContainerSelector) || window),
              e
            );
          },
        },
        mounted: function () {
          var e = window.MutationObserver || window.WebKitMutationObserver;
          this.observer ||
            ((this.observer = new e(this.initScrollactiveItems)),
            this.observer.observe(this.$refs['scrollactive-nav-wrapper'], {
              childList: !0,
              subtree: !0,
            })),
            this.initScrollactiveItems(),
            this.removeActiveClass(),
            (this.currentItem = this.getItemInsideWindow()),
            this.currentItem && this.currentItem.classList.add(this.activeClass),
            this.scrollOnStart && this.scrollToHashElement(),
            this.scrollContainer.addEventListener('scroll', this.onScroll);
        },
        updated: function () {
          this.initScrollactiveItems();
        },
        beforeDestroy: function () {
          this.scrollContainer.removeEventListener('scroll', this.onScroll),
            window.cancelAnimationFrame(this.scrollAnimationFrame);
        },
        methods: {
          onScroll: function (e) {
            (this.currentItem = this.getItemInsideWindow()),
              this.currentItem !== this.lastActiveItem &&
                (this.removeActiveClass(),
                this.$emit('itemchanged', e, this.currentItem, this.lastActiveItem),
                (this.lastActiveItem = this.currentItem)),
              this.currentItem && this.currentItem.classList.add(this.activeClass);
          },
          getItemInsideWindow: function () {
            var e,
              t = this;
            return (
              [].forEach.call(this.items, function (n) {
                var o = n === t.items[0],
                  r = document.getElementById(decodeURI(n.hash.substr(1)));
                if (r) {
                  var i = t.scrollContainer.scrollTop || window.pageYOffset,
                    a = i >= t.getOffsetTop(r) - t.offset,
                    s = i < t.getOffsetTop(r) - t.offset + r.offsetHeight;
                  o && t.highlightFirstItem && s && (e = n),
                    t.exact && a && s && (e = n),
                    !t.exact && a && (e = n);
                }
              }),
              e
            );
          },
          initScrollactiveItems: function () {
            var e = this;
            (this.items = this.$el.querySelectorAll('.scrollactive-item')),
              this.clickToScroll
                ? [].forEach.call(this.items, function (t) {
                    t.addEventListener('click', e.handleClick);
                  })
                : [].forEach.call(this.items, function (t) {
                    t.removeEventListener('click', e.handleClick);
                  });
          },
          setScrollactiveItems: function () {
            this.initScrollactiveItems();
          },
          handleClick: function (e) {
            var t = this;
            e.preventDefault();
            var n = e.currentTarget.hash,
              o = document.getElementById(decodeURI(n.substr(1)));
            o
              ? (this.alwaysTrack ||
                  (this.scrollContainer.removeEventListener('scroll', this.onScroll),
                  window.cancelAnimationFrame(this.scrollAnimationFrame),
                  this.removeActiveClass(),
                  e.currentTarget.classList.add(this.activeClass)),
                this.scrollTo(o).then(function () {
                  if (!t.alwaysTrack) {
                    t.scrollContainer.addEventListener('scroll', t.onScroll);
                    (t.currentItem = [].find.call(t.items, function (e) {
                      return decodeURI(e.hash.substr(1)) === o.id;
                    })),
                      t.currentItem !== t.lastActiveItem &&
                        (t.$emit('itemchanged', null, t.currentItem, t.lastActiveItem),
                        (t.lastActiveItem = t.currentItem));
                  }
                  t.modifyUrl && t.pushHashToUrl(n);
                }))
              : console.warn(
                  "[vue-scrollactive] Element '".concat(
                    n,
                    "' was not found. Make sure it is set in the DOM."
                  )
                );
          },
          scrollTo: function (e) {
            var t = this;
            return new Promise(function (n) {
              var o = t.getOffsetTop(e),
                r = t.scrollContainer.scrollTop || window.pageYOffset,
                i = o - r,
                s = t.bezierEasing.apply(t, a(t.cubicBezierArray)),
                l = null;
              window.requestAnimationFrame(function e(o) {
                l || (l = o);
                var a = o - l,
                  c = a / t.duration;
                a >= t.duration && (a = t.duration), c >= 1 && (c = 1);
                var u = t.scrollOffset || t.offset,
                  f = r + s(c) * (i - u);
                t.scrollContainer.scrollTo(0, f),
                  a < t.duration ? (t.scrollAnimationFrame = window.requestAnimationFrame(e)) : n();
              });
            });
          },
          getOffsetTop: function (e) {
            for (var t = 0, n = e; n; ) (t += n.offsetTop), (n = n.offsetParent);
            return this.scrollContainer.offsetTop && (t -= this.scrollContainer.offsetTop), t;
          },
          removeActiveClass: function () {
            var e = this;
            [].forEach.call(this.items, function (t) {
              t.classList.remove(e.activeClass);
            });
          },
          scrollToHashElement: function () {
            var e = this,
              t = window.location.hash;
            if (t) {
              var n = document.querySelector(decodeURI(t));
              n &&
                ((window.location.hash = ''),
                setTimeout(function () {
                  var o = n.offsetTop - e.offset;
                  e.scrollContainer.scrollTo(0, o), e.pushHashToUrl(t);
                }, 0));
            }
          },
          pushHashToUrl: function (e) {
            window.history.pushState
              ? window.history.pushState(null, null, e)
              : (window.location.hash = e);
          },
        },
      },
      o,
      [],
      !1,
      null,
      null,
      null
    );
    l.options.__file = 'src/scrollactive.vue';
    var c = l.exports,
      u = {
        install: function (e) {
          u.install.installed || e.component('scrollactive', c);
        },
      };
    'undefined' != typeof window && window.Vue && u.install(window.Vue);
    var f = u;
    n(3), n(5);
    Vue.use(f);
    var d = new Vue({
      el: '#app',
      data: {
        elements: [],
        alwaysTrack: !1,
        duration: 600,
        clickToScroll: !0,
        offset: 52,
        easing: '.5,0,.35,1',
      },
      computed: {
        numberOfElements: function () {
          return this.elements.length;
        },
      },
      mounted: function () {
        this.elements = this.$el.querySelectorAll('.scrollactive-item');
      },
      methods: {
        addNewElement: function () {
          var e = this.numberOfElements + 1,
            t = this.numberOfElements % 2 == 0 ? 'is-primary' : 'is-danger',
            n = document.createElement('div');
          (n.innerHTML = '<a href="#section-'
            .concat(e, '" class="scrollactive-item nav-item">Section ')
            .concat(e, '</a>')),
            document.querySelector('.nav-center').appendChild(n.firstChild);
          var o = document.createElement('div');
          (o.innerHTML = '<section id="section-'
            .concat(e, '" class="section hero ')
            .concat(
              t,
              ' is-fullheight">\n      <div class="container">\n      <h1 class="heading title is-1">Section '
            )
            .concat(e, '</h1>\n      </div>\n      </section>\n      ')),
            document.querySelector('main').appendChild(o.firstChild),
            (this.elements = this.$el.querySelectorAll('.scrollactive-item'));
        },
        removeElement: function () {
          if (this.numberOfElements >= 1) {
            var e = [].map
              .call(this.elements, function (e) {
                return e.hash;
              })
              .slice(-1);
            document.querySelector('.nav-center a[href="'.concat(e, '"]')).remove(),
              document.querySelector('main').removeChild(document.querySelector(e)),
              (this.elements = this.$el.querySelectorAll('.scrollactive-item'));
          }
        },
      },
    });
    t.default = d;
  },
]);
