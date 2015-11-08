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
	
	var _manager = __webpack_require__(1);
	
	var _manager2 = _interopRequireDefault(_manager);

	exports['default'] = _manager2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _templateHtml = __webpack_require__(6);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	var _toast = __webpack_require__(7);
	
	var _toast2 = _interopRequireDefault(_toast);
	
	var _utilsJs = __webpack_require__(11);
	
	var defaultConst = {
	  DELAY_JUMP: 30,
	  MAX_COUNT: 6
	};
	
	exports['default'] = {
	  template: _templateHtml2['default'],
	  data: function data() {
	    return {
	      toasts: [],
	      'const': defaultConst
	    };
	  },
	  components: {
	    'vue-toast': _toast2['default']
	  },
	  methods: {
	    // Public
	    showToast: function showToast(message) {
	      this._pushToast(this._createToast(message));
	      return this;
	    },
	    setOptions: function setOptions(options) {
	      this['const'] = Object.assign(this['const'], options);
	      return this;
	    },
	    // Privet
	    _createToast: function _createToast(message) {
	      return new this.$options.components['vue-toast']({ data: {
	          message: message
	        } });
	    },
	    _pushToast: function _pushToast(toast) {
	      var _this = this;
	
	      var DELAY_JUMP = (0, _utilsJs._isNumber)(this['const'].DELAY_JUMP) ? this['const'].DELAY_JUMP : defaultConst.DELAY_JUMP;
	      var MAX_COUNT = (0, _utilsJs._isNumber)(this['const'].MAX_COUNT) && this['const'].MAX_COUNT >= 1 ? this['const'].MAX_COUNT : defaultConst.MAX_COUNT;
	
	      this.toasts = this.toasts.reduceRight(function (prev, toast, i) {
	        if (toast._isDestroyed) {
	          return prev;
	        }
	        if (i + 1 >= MAX_COUNT) {
	          toast.remove();
	          return prev;
	        }
	
	        setTimeout(function () {
	          toast.translateY = '-' + (i + 1) * 100 + '%';
	        }, i * DELAY_JUMP);
	        prev.unshift(toast);
	
	        return prev;
	      }, []);
	      setTimeout(function () {
	        toast.$mount().$appendTo(_this.$els.toasts);
	      }, DELAY_JUMP);
	
	      this.toasts.unshift(toast);
	      return toast;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div class=\"vue-toast-manager_container\">\n  <div v-el:toasts class=\"vue-toast-manager_toasts\"></div>\n</div>\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(8);
	
	var _templateHtml = __webpack_require__(10);
	
	var _templateHtml2 = _interopRequireDefault(_templateHtml);
	
	exports['default'] = {
	  template: _templateHtml2['default'],
	  data: function data() {
	    return {
	      message: '',
	      translateY: '-0%',
	      isShow: false,
	      'const': {
	        TIME_LIFE: 5000
	      }
	    };
	  },
	  computed: {
	    style: function style() {
	      return 'transform: translateY(' + this.translateY + ')';
	    }
	  },
	  ready: function ready() {
	    var _this = this;
	
	    setTimeout(function () {
	      _this.isShow = true;
	    }, 150);
	    this._startLazyAutoDestroy();
	  },
	  methods: {
	    // Public
	    remove: function remove() {
	      this._clearTimer();
	      this.$remove().$destroy();
	
	      return this;
	    },
	    // Privet
	    _startLazyAutoDestroy: function _startLazyAutoDestroy() {
	      var _this2 = this;
	
	      this._clearTimer();
	      this.timerDestroy = setTimeout(function () {
	        _this2.$remove().$destroy();
	      }, this['const'].TIME_LIFE);
	    },
	    _clearTimer: function _clearTimer() {
	      if (this.timerDestroy) {
	        clearTimeout(this.timerDestroy);
	      }
	    },
	    _startTimer: function _startTimer() {
	      this._startLazyAutoDestroy();
	    },
	    _stopTimer: function _stopTimer() {
	      this._clearTimer();
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"vue-toast_container\"\n     @mouseover=\"_stopTimer\"\n     @mouseleave=\"_startTimer\"\n     :style=\"style\"\n     v-show=\"isShow\"\n     transition>\n  <div class=\"vue-toast_message\">\n    {{ message }}\n  </div>\n</div>\n";

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports._isNumber = _isNumber;
	
	function _isNumber(value) {
	    return typeof value === "number" && isFinite(value);
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-toast.js.map