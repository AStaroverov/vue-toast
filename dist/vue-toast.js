(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vueToasts"] = factory();
	else
		root["vueToasts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(1);
	
	var _manager = __webpack_require__(2);
	
	var _manager2 = _interopRequireDefault(_manager);

	exports['default'] = _manager2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	if (!Object.assign) {
	  Object.defineProperty(Object, 'assign', {
	    enumerable: false,
	    configurable: true,
	    writable: true,
	    value: function value(target, firstSource) {
	      'use strict';
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	      }
	
	      var to = Object(target);
	      for (var i = 1; i < arguments.length; i++) {
	        var nextSource = arguments[i];
	        if (nextSource === undefined || nextSource === null) {
	          continue;
	        }
	
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	          var nextKey = keysArray[nextIndex];
	          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	          if (desc !== undefined && desc.enumerable) {
	            to[nextKey] = nextSource[nextKey];
	          }
	        }
	      }
	      return to;
	    }
	  });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(3);
	
	var _templateHtml = __webpack_require__(7);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	var _toast = __webpack_require__(8);
	
	var _toast2 = _interopRequireDefault(_toast);
	
	var _utilsJs = __webpack_require__(12);
	
	var defaultOptions = {
	  maxToasts: 6,
	  position: 'left bottom'
	};
	
	exports['default'] = {
	  template: _templateHtml2['default'],
	  data: function data() {
	    return {
	      toasts: [],
	      options: defaultOptions
	    };
	  },
	  computed: {
	    classesOfPosition: function classesOfPosition() {
	      return this._updateClassesOfPosition(this.options.position);
	    },
	    directionOfJumping: function directionOfJumping() {
	      return this._updateDirectionOfJumping(this.options.position);
	    }
	  },
	  methods: {
	    // Public
	    showToast: function showToast(message, options) {
	      this._addToast(message, options);
	      this._moveToast();
	
	      return this;
	    },
	    setOptions: function setOptions(options) {
	      this.options = Object.assign(this.options, options || {});
	
	      return this;
	    },
	    // Private
	    _addToast: function _addToast(message) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      if (!message) {
	        return;
	      }
	
	      options.directionOfJumping = this.directionOfJumping;
	
	      this.toasts.unshift({
	        message: message,
	        options: options,
	        isDestroyed: false
	      });
	    },
	    _moveToast: function _moveToast(toast) {
	      var maxToasts = this.options.maxToasts > 0 ? this.options.maxToasts : 9999;
	
	      // moving||removing old toasts
	      this.toasts = this.toasts.reduceRight(function (prev, toast, i) {
	        if (toast.isDestroyed) {
	          return prev;
	        }
	
	        if (i + 1 >= maxToasts) {
	          return prev;
	        }
	
	        return [toast].concat(prev);
	      }, []);
	    },
	    _updateClassesOfPosition: function _updateClassesOfPosition(position) {
	      return position.split(' ').reduce(function (prev, val) {
	        prev['--' + val.toLowerCase()] = true;
	
	        return prev;
	      }, {});
	    },
	    _updateDirectionOfJumping: function _updateDirectionOfJumping(position) {
	      return position.match(/top/i) ? '+' : '-';
	    }
	  },
	  components: {
	    'vue-toast': _toast2['default']
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"vue-toast-manager_container\" :class=\"classesOfPosition\">\n  <vue-toast\n      v-for=\"toast in toasts\"\n      :message=\"toast.message\"\n      :options=\"toast.options\"\n      :destroyed.sync=\"toast.isDestroyed\"\n      :position=\"$index\"\n    ></vue-toast>\n</div>\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(9);
	
	var _templateHtml = __webpack_require__(11);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	var defaultOptions = {
	  theme: 'default', // info warning error success
	  timeLife: 5000,
	  closeBtn: false
	};
	
	exports['default'] = {
	  template: _templateHtml2['default'],
	  props: {
	    message: {
	      required: true
	    },
	    position: {
	      type: Number,
	      required: true
	    },
	    destroyed: {
	      twoWay: true,
	      type: Boolean,
	      required: true
	    },
	    options: {
	      type: Object,
	      coerce: function coerce(options) {
	        return Object.assign({}, defaultOptions, options);
	      }
	    }
	  },
	  data: function data() {
	    return {
	      isShow: false
	    };
	  },
	  computed: {
	    theme: function theme() {
	      return '_' + this.options.theme;
	    },
	    style: function style() {
	      return 'transform: translateY(' + this.options.directionOfJumping + this.position * 100 + '%)';
	    }
	  },
	  ready: function ready() {
	    var _this = this;
	
	    setTimeout(function () {
	      _this.isShow = true;
	    }, 50);
	
	    if (!this.options.closeBtn) {
	      this._startLazyAutoDestroy();
	    }
	  },
	  detached: function detached() {
	    clearTimeout(this.timerDestroy);
	  },
	  methods: {
	    // Public
	    remove: function remove() {
	      this._clearTimer();
	      this.destroyed = true;
	      this.$remove().$destroy();
	
	      return this;
	    },
	    // Private
	    _startLazyAutoDestroy: function _startLazyAutoDestroy() {
	      var _this2 = this;
	
	      this._clearTimer();
	      this.timerDestroy = setTimeout(function () {
	        _this2.$remove().$destroy();
	      }, this.options.timeLife);
	    },
	    _clearTimer: function _clearTimer() {
	      if (this.timerDestroy) {
	        clearTimeout(this.timerDestroy);
	      }
	    },
	    _startTimer: function _startTimer() {
	      if (!this.options.closeBtn) {
	        this._startLazyAutoDestroy();
	      }
	    },
	    _stopTimer: function _stopTimer() {
	      if (!this.options.closeBtn) {
	        this._clearTimer();
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div class=\"vue-toast_container\"\n     @mouseover=\"_stopTimer\"\n     @mouseleave=\"_startTimer\"\n     :style=\"style\"\n     :class=\"[theme]\"\n     v-show=\"isShow\"\n     transition>\n  <div class=\"vue-toast_message\">\n    <span v-html=\"message\"></span>\n    <span class=\"vue-toast_close-btn\"\n          v-if=\"options.closeBtn\"\n          @click=\"remove\">\n    </span>\n  </div>\n</div>\n";

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isNumber = isNumber;
	
	function isNumber(value) {
	    return typeof value === "number" && isFinite(value);
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-toast.js.map