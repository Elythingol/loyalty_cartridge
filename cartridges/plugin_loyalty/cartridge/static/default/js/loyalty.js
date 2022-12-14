/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/app_storefront_base/cartridge/client/default/js/util.js":
/*!****************************************************************************!*\
  !*** ./cartridges/app_storefront_base/cartridge/client/default/js/util.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function (include) {\n    if (typeof include === 'function') {\n        include();\n    } else if (typeof include === 'object') {\n        Object.keys(include).forEach(function (key) {\n            if (typeof include[key] === 'function') {\n                include[key]();\n            }\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./cartridges/app_storefront_base/cartridge/client/default/js/util.js?");

/***/ }),

/***/ "./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty.js":
/*!**************************************************************************!*\
  !*** ./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar processInclude = __webpack_require__(/*! base/util */ \"./cartridges/app_storefront_base/cartridge/client/default/js/util.js\");\n\n$(document).ready(function () {\n    processInclude(__webpack_require__(/*! ./loyalty/loyalty */ \"./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty/loyalty.js\"));\n});\n\n//# sourceURL=webpack:///./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty.js?");

/***/ }),

/***/ "./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty/loyalty.js":
/*!**********************************************************************************!*\
  !*** ./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty/loyalty.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n$('.loyalty-submit').click(function (e) {\n  e.preventDefault();\n  var $form = $('#dwfrm_billing');\n  $('.credit-card-content fieldset').prop('disabled', true);\n  $.ajax({\n    type: 'POST',\n    url: $form.attr('action'),\n    data: $form.serialize(),\n    success: function () {\n      window.location.reload();\n    },\n    error: function () {\n      $('.credit-card-content fieldset').prop('disabled', false);\n      console.log(data);\n    },\n    dataType: 'json'\n  });\n});\n\n$('.loyalty-remove').click(function () {\n  const url = $(this).data('url');\n  $.ajax({\n    type: 'DELETE',\n    url: url,\n    success: function (data) {\n      window.location.reload();\n    },\n    error: function (data) {\n      console.log(data);\n    }\n  });\n});\n\n$('.payment-options .nav-item').on('click', function (e) {\n  e.preventDefault();\n  var methodID = $(this).data('method-id');\n  if (methodID.toLowerCase() === 'loyalty') {\n    $('.submit-payment').hide();\n  } else {\n    $('.submit-payment').show();\n  }\n});\n\n\n//# sourceURL=webpack:///./cartridges/plugin_loyalty/cartridge/client/default/js/loyalty/loyalty.js?");

/***/ })

/******/ });