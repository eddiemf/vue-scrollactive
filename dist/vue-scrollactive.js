(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-scrollactive"] = factory();
	else
		root["vue-scrollactive"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scrollactive = __webpack_require__(1);

var _scrollactive2 = _interopRequireDefault(_scrollactive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = {};

Plugin.install = function (Vue) {
  if (Plugin.install.installed) return;

  Vue.component('scrollactive', _scrollactive2.default);
};

if (typeof window !== 'undefined' && window.Vue) {
  Plugin.install(window.Vue);
}

exports.default = Plugin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(3),
  /* template */
  __webpack_require__(5),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bezierEasing = __webpack_require__(4);

var _bezierEasing2 = _interopRequireDefault(_bezierEasing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    /**
    * Class that will be applied in the menu item.
    *
    * @default  'is-active'
    * @type {String}
    */
    activeClass: {
      type: String,
      default: 'is-active'
    },

    /**
    * Amount of space between top of screen and the section to
    * highlight. (Usually your fixed header's height)
    *
    * @default 20
    * @type {Number}
    */
    offset: {
      type: Number,
      default: 20
    },

    /**
    * Enables/disables the scrolling when clicking in a menu item.
    * Disable if you'd like to handle the scrolling by your own.
    *
    * @default true
    * @type {Boolean}
    */
    clickToScroll: {
      type: Boolean,
      default: true
    },

    /**
    * The duration of the scroll animation when clicking to scroll
    * is activated.
    *
    * @default 600
    * @type {Number}
    */
    duration: {
      type: Number,
      default: 600
    },

    /**
    * Defines if the plugin should track the section change when
    * clicking an item to scroll to its section. If set to true,
    * it will always keep track and change the active class to the
    * current section while scrolling, if false, the active class
    * will be immediately applied to the clicked menu item, ignoring
    * the passed sections until the scrolling is over.
    *
    * @default false
    * @type {Boolean}
    */
    alwaysTrack: {
      type: Boolean,
      default: false
    },

    /**
    * Your custom easing value for the click to scroll functionality.
    * It must be a string with 4 values separated by commas in a
    * cubic bezier format.
    *
    * @default '.5,0,.35,1'
    * @type {String}
    */
    bezierEasingValue: {
      type: String,
      default: '.5,0,.35,1'
    }
  },

  data: function data() {
    return {
      observer: null,
      scrollactiveItems: [],
      bezierEasing: _bezierEasing2.default,
      currentItem: null,
      lastActiveItem: null
    };
  },


  computed: {
    /**
    * Computes the bezier easing string value into an array.
    *
    * @return {Array.<string>}
    */
    cubicBezierArray: function cubicBezierArray() {
      return this.bezierEasingValue.split(',');
    }
  },

  mounted: function mounted() {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    if (!this.observer) {
      // Watch for DOM changes in the scrollactive element wrapper
      this.observer = new MutationObserver(this.initScrollactiveItems);
      this.observer.observe(this.$refs['scrollactive-nav-wrapper'], {
        childList: true,
        subtree: true
      });
    }

    this.initScrollactiveItems();
    this.removeActiveClass();
    this.currentItem = this.getItemInsideWindow();

    if (this.currentItem) this.currentItem.classList.add(this.activeClass);

    window.addEventListener('scroll', this.onScroll);
  },
  updated: function updated() {
    this.initScrollactiveItems();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.cancelAnimationFrame(window.AFRequestID);
  },


  methods: {
    /**
    * Will be called when scrolling event is triggered to handle the addition of the active class
    * in the current section item and fire the change event.
    *
    * @param {Object} event Scroll event.
    */
    onScroll: function onScroll(event) {
      this.currentItem = this.getItemInsideWindow();

      if (this.currentItem !== this.lastActiveItem) {
        this.removeActiveClass();
        this.$emit('itemchanged', event, this.currentItem, this.lastActiveItem);
        this.lastActiveItem = this.currentItem;
      }

      // Current item might be null if not inside any section
      if (this.currentItem) this.currentItem.classList.add(this.activeClass);
    },


    /**
     * Gets the scrollactive item that corresponds to the current section inside the window
     *
     * @return {node} Scrollactive item node.
     */
    getItemInsideWindow: function getItemInsideWindow() {
      var _this = this;

      var currentItem = void 0;

      [].forEach.call(this.scrollactiveItems, function (node) {
        var target = document.getElementById(node.hash.substr(1));

        if (window.pageYOffset >= _this.getOffsetTop(target) - _this.offset) {
          currentItem = node;
        }
      });

      return currentItem;
    },


    /**
    * Sets the list of menu items, adding or removing the click listener depending on the
    * clickToScroll prop.
    */
    initScrollactiveItems: function initScrollactiveItems() {
      var _this2 = this;

      this.scrollactiveItems = this.$el.querySelectorAll('.scrollactive-item');

      if (this.clickToScroll) {
        [].forEach.call(this.scrollactiveItems, function (scrollactiveItem) {
          scrollactiveItem.addEventListener('click', _this2.scrollToTargetElement);
        });
        return;
      }

      [].forEach.call(this.scrollactiveItems, function (scrollactiveItem) {
        scrollactiveItem.removeEventListener('click', _this2.scrollToTargetElement);
      });
    },


    /**
     * Keep the old setScrollactiveItems method in order to avoid breaking existing projects that
     * used the previous version and upgraded to this one.
     *
     * @deprecated
     */
    setScrollactiveItems: function setScrollactiveItems() {
      this.initScrollactiveItems();
    },


    /**
    * Handles the scrolling when clicking a menu item.
    *
    * @param {Object} event The click event.
    */
    scrollToTargetElement: function scrollToTargetElement(event) {
      var _this3 = this;

      event.preventDefault();

      var hash = event.currentTarget.hash;

      var target = document.getElementById(hash.substr(1));

      if (!target) {
        console.warn('[vue-scrollactive] Element \'' + hash + '\' was not found. Make sure it is set in the DOM.');
        return;
      }

      /**
       *  Temporarily removes the scroll listener and the request animation frame so the active
       *  class will only be applied to the clicked element, and not all elements while the window
       *  is scrolling.
       */
      if (!this.alwaysTrack) {
        window.removeEventListener('scroll', this.onScroll);
        window.cancelAnimationFrame(window.AFRequestID);

        this.removeActiveClass();
        event.currentTarget.classList.add(this.activeClass);
      }

      var targetDistanceFromTop = this.getOffsetTop(target);
      var startingY = window.pageYOffset;
      var difference = targetDistanceFromTop - startingY;
      var easing = this.bezierEasing(this.cubicBezierArray[0], this.cubicBezierArray[1], this.cubicBezierArray[2], this.cubicBezierArray[3]);
      var start = null;

      var step = function step(timestamp) {
        if (!start) start = timestamp;

        var progress = timestamp - start;
        var progressPercentage = progress / _this3.duration;

        if (progress >= _this3.duration) progress = _this3.duration;
        if (progressPercentage >= 1) progressPercentage = 1;

        var perTick = startingY + easing(progressPercentage) * (difference - _this3.offset);

        window.scrollTo(0, perTick);

        if (progress < _this3.duration) {
          window.AFRequestID = window.requestAnimationFrame(step);
        } else {
          window.addEventListener('scroll', _this3.onScroll);
          // Update the location hash after we've finished animating
          if (window.history.pushState) {
            window.history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        }
      };

      window.requestAnimationFrame(step);
    },


    /**
    * Gets the top offset position of an element in the document.
    *
    * @param  {Element} element
    * @return {number}
    */
    getOffsetTop: function getOffsetTop(element) {
      var yPosition = 0;
      var nextElement = element;

      while (nextElement) {
        yPosition += nextElement.offsetTop;
        nextElement = nextElement.offsetParent;
      }

      return yPosition;
    },


    /**
     * Removes the active class from all scrollactive items.
     */
    removeActiveClass: function removeActiveClass() {
      var _this4 = this;

      [].forEach.call(this.scrollactiveItems, function (node) {
        node.classList.remove(_this4.activeClass);
      });
    }
  }
}; //
//
//
//
//
//

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x; // linear
    }
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    ref: "scrollactive-nav-wrapper",
    staticClass: "scrollactive-nav"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ })
/******/ ]);
});