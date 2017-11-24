(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Device.js
// (c) 2014 Matthew Hudson
// Device.js is freely distributable under the MIT license.
// For all details and documentation:
// http://matthewhudson.me/projects/device.js/

(function () {

  var device, previousDevice, addClass, documentElement, find, handleOrientation, hasClass, orientationEvent, removeClass, userAgent;

  // Save the previous value of the device variable.
  previousDevice = window.device;

  device = {};

  // Add device as a global object.
  window.device = device;

  // The <html> element.
  documentElement = window.document.documentElement;

  // The client user agent string.
  // Lowercase, so we can use the more efficient indexOf(), instead of Regex
  userAgent = window.navigator.userAgent.toLowerCase();

  // Main functions
  // --------------

  device.ios = function () {
    return device.iphone() || device.ipod() || device.ipad();
  };

  device.iphone = function () {
    return !device.windows() && find('iphone');
  };

  device.ipod = function () {
    return find('ipod');
  };

  device.ipad = function () {
    return find('ipad');
  };

  device.android = function () {
    return !device.windows() && find('android');
  };

  device.androidPhone = function () {
    return device.android() && find('mobile');
  };

  device.androidTablet = function () {
    return device.android() && !find('mobile');
  };

  device.blackberry = function () {
    return find('blackberry') || find('bb10') || find('rim');
  };

  device.blackberryPhone = function () {
    return device.blackberry() && !find('tablet');
  };

  device.blackberryTablet = function () {
    return device.blackberry() && find('tablet');
  };

  device.windows = function () {
    return find('windows');
  };

  device.windowsPhone = function () {
    return device.windows() && find('phone');
  };

  device.windowsTablet = function () {
    return device.windows() && find('touch') && !device.windowsPhone();
  };

  device.fxos = function () {
    return (find('(mobile;') || find('(tablet;')) && find('; rv:');
  };

  device.fxosPhone = function () {
    return device.fxos() && find('mobile');
  };

  device.fxosTablet = function () {
    return device.fxos() && find('tablet');
  };

  device.meego = function () {
    return find('meego');
  };

  device.cordova = function () {
    return window.cordova && location.protocol === 'file:';
  };

  device.nodeWebkit = function () {
    return typeof window.process === 'object';
  };

  device.mobile = function () {
    return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
  };

  device.tablet = function () {
    return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
  };

  device.desktop = function () {
    return !device.tablet() && !device.mobile();
  };

  device.television = function () {
    var i, tvString;

    television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"];

    i = 0;
    while (i < television.length) {
      if (find(television[i])) {
        return true;
      }
      i++;
    }
    return false;
  };

  device.portrait = function () {
    return window.innerHeight / window.innerWidth > 1;
  };

  device.landscape = function () {
    return window.innerHeight / window.innerWidth < 1;
  };

  // Public Utility Functions
  // ------------------------

  // Run device.js in noConflict mode,
  // returning the device variable to its previous owner.
  device.noConflict = function () {
    window.device = previousDevice;
    return this;
  };

  // Private Utility Functions
  // -------------------------

  // Simple UA string search
  find = function (needle) {
    return userAgent.indexOf(needle) !== -1;
  };

  // Check if documentElement already has a given class.
  hasClass = function (className) {
    var regex;
    regex = new RegExp(className, 'i');
    return documentElement.className.match(regex);
  };

  // Add one or more CSS classes to the <html> element.
  addClass = function (className) {
    var currentClassNames = null;
    if (!hasClass(className)) {
      currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
      documentElement.className = currentClassNames + " " + className;
    }
  };

  // Remove single CSS class from the <html> element.
  removeClass = function (className) {
    if (hasClass(className)) {
      documentElement.className = documentElement.className.replace(" " + className, "");
    }
  };

  // HTML Element Handling
  // ---------------------

  // Insert the appropriate CSS class based on the _user_agent.

  if (device.ios()) {
    if (device.ipad()) {
      addClass("ios ipad tablet");
    } else if (device.iphone()) {
      addClass("ios iphone mobile");
    } else if (device.ipod()) {
      addClass("ios ipod mobile");
    }
  } else if (device.android()) {
    if (device.androidTablet()) {
      addClass("android tablet");
    } else {
      addClass("android mobile");
    }
  } else if (device.blackberry()) {
    if (device.blackberryTablet()) {
      addClass("blackberry tablet");
    } else {
      addClass("blackberry mobile");
    }
  } else if (device.windows()) {
    if (device.windowsTablet()) {
      addClass("windows tablet");
    } else if (device.windowsPhone()) {
      addClass("windows mobile");
    } else {
      addClass("desktop");
    }
  } else if (device.fxos()) {
    if (device.fxosTablet()) {
      addClass("fxos tablet");
    } else {
      addClass("fxos mobile");
    }
  } else if (device.meego()) {
    addClass("meego mobile");
  } else if (device.nodeWebkit()) {
    addClass("node-webkit");
  } else if (device.television()) {
    addClass("television");
  } else if (device.desktop()) {
    addClass("desktop");
  }

  if (device.cordova()) {
    addClass("cordova");
  }

  // Orientation Handling
  // --------------------

  // Handle device orientation changes.
  handleOrientation = function () {
    if (device.landscape()) {
      removeClass("portrait");
      addClass("landscape");
    } else {
      removeClass("landscape");
      addClass("portrait");
    }
    return;
  };

  // Detect whether device supports orientationchange event,
  // otherwise fall back to the resize event.
  if (Object.prototype.hasOwnProperty.call(window, "onorientationchange")) {
    orientationEvent = "orientationchange";
  } else {
    orientationEvent = "resize";
  }

  // Listen for changes in orientation.
  if (window.addEventListener) {
    window.addEventListener(orientationEvent, handleOrientation, false);
  } else if (window.attachEvent) {
    window.attachEvent(orientationEvent, handleOrientation);
  } else {
    window[orientationEvent] = handleOrientation;
  }

  handleOrientation();

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function () {
      return device;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = device;
  } else {
    window.device = device;
  }
}).call(this);

},{}],2:[function(require,module,exports){
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

},{}],3:[function(require,module,exports){
/* ==================================================================================
 * topbarCtrl.js
 * 顶部菜单栏控制
 * ================================================================================== */

var SidebarCtrl = function () {

    var el_sidebar = $('.sidebar');
    var el_btn_totop = $('#btn_totop');

    function SidebarCtrl() {
        this.initLayout();
    }

    SidebarCtrl.prototype.initLayout = function () {
        var base = this;

        var onToTopBtnShow = function () {
            el_sidebar.addClass('totop-show');
        };

        var onToTopBtnHide = function () {
            el_sidebar.removeClass('totop-show');
        };

        el_btn_totop.toTop({
            toggleClass: 'totop-show',
            checkNecessary: false,
            onToTopShow: onToTopBtnShow,
            onToTopHide: onToTopBtnHide
        });
    };

    return SidebarCtrl;
}();

module.exports = SidebarCtrl;

},{}],4:[function(require,module,exports){
/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms
var DolphinSlider = require('./lib/dolphinSlider');
var ScrollTo = require('./lib/jquery.scrollTo.js');
var ToTop = require('./lib/jquery.toTop.js');

var ViewCtrl = require('./view/viewCtrl');

//var TopbarCtrl = require('../../components/topbar/topbarCtrl');
var SidebarCtrl = require('../../components/sidebar/sidebarCtrl');

var Webapp = function () {

    attachFastClick(document.body);
    var viewCtrl = new ViewCtrl();
    //var topbarCtrl = new TopbarCtrl();
    var sidebarCtrl = new SidebarCtrl();

    function Webapp() {}

    Webapp.prototype.getViewCtrl = function () {
        return viewCtrl;
    };

    return Webapp;
}();

$(document).ready(function () {
    window.app = new Webapp();
});

},{"../../components/sidebar/sidebarCtrl":3,"./lib/dolphinSlider":5,"./lib/jquery.scrollTo.js":6,"./lib/jquery.toTop.js":7,"./view/viewCtrl":8,"fastclick":2}],5:[function(require,module,exports){
/*!
 * jquery.dolphinSlider
 * @Author Du Peng
 * @Version 0.01
 * Licensed under MIT
 */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jQuery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(jQuery);
    } else {
        // Global
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var DSliderProto = {

        Initialize: function (options, el) {
            var base = this;
            base.timerStep = 20;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.dolphinSlider.options, base.$elem.data(), options);
            base.userOptions = options;

            base.$elem.data("dp-originalStyles", base.$elem.attr("style"));
            base.$elem.data("dp-originalClasses", base.$elem.attr("class"));

            base.checkBrowser();
            //base.createSlider();
            base.loadContent();
        },

        loadContent: function () {
            var base = this;

            if (typeof base.options.beforeInit === "function") base.options.beforeInit.apply(this, [base.$elem]);

            if (base.options.jsonData) {
                if (typeof base.options.jsonData === "string") {
                    var url = base.options.jsonData;
                    var getData = function (data) {
                        if (typeof base.options.jsonSuccess === "function") base.options.jsonSuccess.apply(this, [data]);
                        base.buildItems(data);
                        base.createSlider();
                    };
                    $.getJSON(url, getData);
                } else {
                    base.buildItems(base.options.jsonData);
                    base.createSlider();
                }
            } else {
                console.error('dolphinSlider插件:无json数据');
            }
        },

        buildItems: function (data) {
            var base = this;

            base.sliderData = data;

            //根据jsonData组装dom
            var htmlString = "";
            for (var i in base.sliderData) {
                htmlString += "<div class='" + base.options.itemClass + "'>" + "<div class='" + base.options.itemImageClass + "'>" + "<img src='" + data[i].imageurl + "'>" + "</div>" + "</div>";
            }
            base.$elem.append(htmlString);
        },

        createSlider: function () {
            var base = this;

            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.currentPage = 0;

            if (base.itemsAmount >= 2) {

                if (base.options.navigation) {
                    base.createNavigation();
                }
                if (base.options.pagination) {
                    base.createPagination();
                }

                if (base.options.slideType === 'basic') {
                    base.$userItems.css(base.cssOpacity(0));
                    if (base.browser.support3d === true) {
                        base.$userItems.css(base.cssTransition(base.options.animDuration));
                    }
                } else if (base.options.slideType === 'carousel') {
                    base.$userItems.css(base.cssTransform3d('100%', 0, 0));
                }
                base.changePage(base.currentPage, 'next');
            }

            if (typeof base.options.afterInit === "function") base.options.afterInit.apply(this, [base.$elem]);
        },

        createNavigation: function () {
            var base = this;
            base.$navPrev = $('<div class="' + base.options.navigationPrevClass + '"></div>');
            base.$navNext = $('<div class="' + base.options.navigationNextClass + '"></div>');
            base.$elem.append(base.$navPrev);
            base.$elem.append(base.$navNext);
            base.$navPrev.click(function () {
                base.prevPage();
            });
            base.$navNext.click(function () {
                base.nextPage();
            });
        },

        createPagination: function () {
            var base = this;
            base.$pagination = $('<div class="' + base.options.paginationClass + '"></div>');
            function appendItems($parent) {
                for (var i = 0; i < base.itemsAmount; i++) {
                    var pageNumber = i + 1;
                    var paginationItemHtml = '<div class="' + base.options.paginationItemClass + '">';
                    if (base.options.paginationType == 'fancy') {
                        if (base.options.paginationHasTimer) paginationItemHtml += '<div class="' + base.options.paginationTimerClass + '"></div>';
                        if (base.options.paginationHasDivider && i < base.itemsAmount - 1) paginationItemHtml += '<div class="' + base.options.paginationDividerClass + '"></div>';
                        if (base.options.paginationHasContent) {
                            var infoHtml = '<div class="' + base.options.paginationContentClass + '">' + '<div class="' + base.options.paginationTitleClass + '">' + base.sliderData[i].title + '</div>';
                            if (base.options.paginationHasInfo) {
                                infoHtml += '<div class="' + base.options.paginationInfoClass + '">' + base.sliderData[i].info + '</div>';
                            }
                            infoHtml += '</div>';
                            paginationItemHtml += infoHtml;
                        }
                        if (base.options.paginationHasNumbers) {
                            paginationItemHtml += '<div class="' + base.options.paginationNumberClass + '">' + pageNumber + '</div>';
                        }
                    } else {
                        if (base.options.paginationHasNumbers) {
                            paginationItemHtml += pageNumber;
                        }
                    }
                    paginationItemHtml += '</div>';
                    $parent.append(paginationItemHtml);
                }
            }
            if (base.options.paginationType == 'fancy') {
                base.$paginationContainer = $('<div class="' + base.options.paginationContainerClass + '"></div>');
                appendItems(base.$paginationContainer);
                base.$pagination.append(base.$paginationContainer);
            } else {
                appendItems(base.$pagination);
            }
            base.$elem.append(base.$pagination);

            base.$paginationDots = base.$pagination.find('.' + base.options.paginationItemClass);
            base.$paginationDots.eq(base.currentPage).addClass(base.options.paginationCurrentClass);
            if (base.options.paginationHCenter) {
                var paginationWidth = base.$pagination.width();
                base.$pagination.css({
                    'position': 'absolute',
                    'left': '50%',
                    'margin-left': -0.5 * paginationWidth + 'px'
                });
            }
            base.$paginationDots.click(function () {
                var direction = 'next';
                var targetPage = $(this).index();
                if (targetPage == base.currentPage) return;
                if (targetPage < base.currentPage) direction = 'prev';
                base.changePage(targetPage, direction);
            });
        },

        setTimer: function () {
            var base = this;
            if (base.remainTime > 0) {
                base.remainTime -= base.timerStep;
            } else {
                base.remainTime = 0;
            }
            if (base.remainTime == 0) {
                base.nextPage();
            }
            if (base.options.paginationHasTimer) {
                var $currentPaginationItem = base.$paginationDots.eq(base.currentPage).find('.' + base.options.paginationTimerClass).eq(0);
                var pct = (base.options.duration - base.remainTime) / base.options.duration * 100;
                if (pct > 98) {
                    pct = 100;
                }
                $currentPaginationItem.css('width', pct + '%');
            }
        },

        autoRun: function () {
            var base = this;
            var base = this;
            base.remainTime = base.options.duration;
            window.clearInterval(base.timerInterval);
            base.timerInterval = window.setInterval(function () {
                base.setTimer();
            }, base.timerStep);
        },

        nextPage: function () {
            var base = this;
            var targetPage = base.currentPage + 1;
            if (base.currentPage === base.itemsAmount - 1) {
                targetPage = 0;
            }
            base.changePage(targetPage, 'next');
        },

        prevPage: function () {
            var base = this;
            var targetPage = base.currentPage - 1;
            if (base.currentPage === 0) {
                targetPage = base.itemsAmount - 1;
            }
            base.changePage(targetPage, 'prev');
        },

        changePage: function (targetPage, direction) {
            var base = this;
            if (targetPage != base.currentPage) {
                base.$userItems.eq(targetPage).addClass(base.options.currentClass);
                base.$userItems.eq(base.currentPage).removeClass(base.options.currentClass);
                if (base.options.pagination) {
                    base.$paginationDots.eq(targetPage).addClass(base.options.paginationCurrentClass);
                    base.$paginationDots.eq(base.currentPage).removeClass(base.options.paginationCurrentClass);
                }
                if (base.options.slideType === 'basic') {
                    if (base.browser.support3d === true) {
                        base.$userItems.eq(targetPage).css(base.cssOpacity(1));
                        base.$userItems.eq(base.currentPage).css(base.cssOpacity(0));
                    } else {
                        base.$userItems.eq(targetPage).stop().animate(base.cssOpacity(1), {
                            duration: base.options.animDuration
                        });
                        base.$userItems.eq(base.currentPage).stop().animate(base.cssOpacity(0), {
                            duration: base.options.animDuration
                        });
                    }
                    base.currentPage = targetPage;
                } else if (base.options.slideType === 'carousel') {
                    if (base.browser.support3d === true) {
                        if (direction === 'prev') {
                            base.$userItems.eq(targetPage).css(base.cssTransition(0));
                            base.$userItems.eq(targetPage).css(base.cssTransform3d('-100%', 0, 0));
                            window.setTimeout(function () {
                                base.$userItems.eq(targetPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(base.currentPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(targetPage).css(base.cssTransform3d('0%', 0, 0));
                                base.$userItems.eq(base.currentPage).css(base.cssTransform3d('100%', 0, 0));
                                base.currentPage = targetPage;
                            }, 1);
                        } else {
                            base.$userItems.eq(targetPage).css(base.cssTransition(0));
                            base.$userItems.eq(targetPage).css(base.cssTransform3d('100%', 0, 0));
                            window.setTimeout(function () {
                                base.$userItems.eq(targetPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(base.currentPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(targetPage).css(base.cssTransform3d('0%', 0, 0));
                                base.$userItems.eq(base.currentPage).css(base.cssTransform3d('-100%', 0, 0));
                                base.currentPage = targetPage;
                            }, 1);
                        }
                    } else {}
                } else if (base.options.slideType === 'customcss') {
                    base.$userItems.removeClass(base.options.nextInClass);
                    base.$userItems.removeClass(base.options.nextOutClass);
                    base.$userItems.removeClass(base.options.prevInClass);
                    base.$userItems.removeClass(base.options.prevOutClass);
                    base.$userItems.addClass(base.options.waitInClass);
                    base.$userItems.eq(targetPage).removeClass(base.options.waitInClass);
                    base.$userItems.eq(base.currentPage).removeClass(base.options.waitInClass);
                    if (direction === 'prev') {
                        base.$userItems.eq(targetPage).addClass(base.options.prevInClass);
                        base.$userItems.eq(base.currentPage).addClass(base.options.prevOutClass);
                    } else {
                        base.$userItems.eq(targetPage).addClass(base.options.nextInClass);
                        base.$userItems.eq(base.currentPage).addClass(base.options.nextOutClass);
                    }
                    base.currentPage = targetPage;
                }
            } else {
                base.$userItems.eq(base.currentPage).addClass(base.options.currentClass);
                if (base.options.slideType === 'basic') {
                    base.$userItems.eq(base.currentPage).css(base.cssOpacity(1));
                } else if (base.options.slideType === 'carousel') {
                    base.$userItems.eq(base.currentPage).css(base.cssTransform3d('0%', 0, 0));
                }
                if (base.options.pagination) {
                    base.$paginationDots.eq(base.currentPage).addClass(base.options.paginationCurrentClass);
                }
            }
            if (base.options.autoRun) {
                base.autoRun();
            }
            if (base.options.paginationType == 'fancy' && base.options.paginationHasDivider && base.options.paginationHidePrevDivider) {
                base.$elem.find('.' + base.options.paginationDividerClass).removeClass('hidden');
                if (base.currentPage != 0) {
                    base.$paginationDots.eq(base.currentPage - 1).find('.' + base.options.paginationDividerClass).addClass('hidden');
                }
            }
        },

        //tool functions
        //------------------------------------------------------------------------------------------------------

        checkBrowser: function () {
            var base = this;

            //Check css 3d support
            var translate3D = "translate3d(0px, 0px, 0px)";
            var tempElem = document.createElement("div");

            tempElem.style.cssText = "  -moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D;
            var regex = /translate3d\(0px, 0px, 0px\)/g;
            var asSupport = tempElem.style.cssText.match(regex);
            var support3d = asSupport !== null && asSupport.length === 1;

            //Check touch support
            var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

            base.browser = {
                "support3d": support3d,
                "isTouch": isTouch
            };
        },

        cssOpacity: function (opacity) {
            return {
                'opacity': opacity,
                'filter': 'Alpha(Opacity=' + opacity * 100 + ')'
            };
        },

        cssTransition: function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        cssTransform3d: function (x, y, z) {
            return {
                "-webkit-transform": "translate3d(" + x + ", " + y + ", " + z + ")",
                "-moz-transform": "translate3d(" + x + ", " + y + ", " + z + ")",
                "-o-transform": "translate3d(" + x + ", " + y + ", " + z + ")",
                "-ms-transform": "translate3d(" + x + ", " + y + ", " + z + ")",
                "transform": "translate3d(" + x + ", " + y + ", " + z + ")"
            };
        }
    };

    $.fn.dolphinSlider = function (options) {
        return this.each(function () {
            if ($(this).data("ds-init") != true) {
                $(this).data("ds-init", true);
                var ds = Object.create(DSliderProto);
                ds.Initialize(options, this);
                $.data(this, "dolphinSlider", ds);
            }
        });
    };

    $.fn.dolphinSlider.options = {
        itemClass: 'item', //单个幻灯的class
        itemImageClass: 'item-bg', //幻灯图片容器的class
        currentClass: 'current', //指定当前页面的class
        duration: 4000, //切换页面时间间隔
        animDuration: 300, //'basic'模式切换动画的持续时间
        autoRun: true, //是否自动播放

        pagination: true, //是否显示页码
        paginationType: 'basic', //页码类型'basic','fancy'
        paginationClass: 'slider-pagination', //页码class
        paginationContainerClass: 'slider-pagination-container', //'fancy'类型的多嵌套一层div
        paginationItemClass: 'slider-pagination-item', //页码单个class
        paginationCurrentClass: 'current', //指定当前页码的class
        paginationHasContent: false,
        paginationContentClass: 'slider-pagination-content',
        paginationTitleClass: 'slider-pagination-title',
        paginationHasInfo: false,
        paginationInfoClass: 'slider-pagination-info',
        paginationHasTimer: false, //'fancy'类型可选择带timer进度条
        paginationTimerClass: 'slider-pagination-timer', //'fancy'类型的带timer进度条的class
        paginationHasDivider: false, //'fancy'类型的是否带分割线
        paginationHidePrevDivider: false, //隐藏当前页码的前一个页码的分割线
        paginationDividerClass: 'slider-pagination-divider', //'fancy'类型分割线的class
        paginationHasNumbers: false, //是否显示页码数字
        paginationNumberClass: 'slider-pagination-number',
        paginationHCenter: false, //是否强制页码水平居中

        navigation: true, //是否显示翻页按钮
        navigationPrevClass: 'navi-prev', //上一页按钮class
        navigationNextClass: 'navi-next', //下一页按钮class

        slideType: 'basic', //'basic','carousel','customcss'
        nextInClass: 'next-in', //customcss 向后翻页时下一页进入的class
        nextOutClass: 'next-out', //customcss  向后翻页时当前页离开的class
        prevInClass: 'prev-in', //customcss 向前翻页时前一页进入的class
        prevOutClass: 'prev-out', //customcss 向前翻页时当前页离开的class
        waitInClass: 'wait-in', //customcss 当前没有动作，等待进入的class

        jsonData: false,
        jsonSuccess: false,

        beforeInit: false,
        afterInit: false
    };
});

},{}],6:[function(require,module,exports){
/*!
 * jQuery.scrollTo
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @projectDescription Lightweight, cross-browser and highly customizable animated scrolling with jQuery
 * @author Ariel Flesler
 * @version 2.1.2
 */
;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(jQuery);
    } else {
        // Global
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var $scrollTo = $.scrollTo = function (target, duration, settings) {
        return $(window).scrollTo(target, duration, settings);
    };

    $scrollTo.defaults = {
        axis: 'xy',
        duration: 0,
        limit: true
    };

    function isWin(elem) {
        return !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) !== -1;
    }

    $.fn.scrollTo = function (target, duration, settings) {
        if (typeof duration === 'object') {
            settings = duration;
            duration = 0;
        }
        if (typeof settings === 'function') {
            settings = { onAfter: settings };
        }
        if (target === 'max') {
            target = 9e9;
        }

        settings = $.extend({}, $scrollTo.defaults, settings);
        // Speed is still recognized for backwards compatibility
        duration = duration || settings.duration;
        // Make sure the settings are given right
        var queue = settings.queue && settings.axis.length > 1;
        if (queue) {
            // Let's keep the overall duration
            duration /= 2;
        }
        settings.offset = both(settings.offset);
        settings.over = both(settings.over);

        return this.each(function () {
            // Null target yields nothing, just like jQuery does
            if (target === null) return;

            var win = isWin(this),
                elem = win ? this.contentWindow || window : this,
                $elem = $(elem),
                targ = target,
                attr = {},
                toff;

            switch (typeof targ) {
                // A number will pass the regex
                case 'number':
                case 'string':
                    if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        // We are done
                        break;
                    }
                    // Relative/Absolute selector
                    targ = win ? $(targ) : $(targ, elem);
                /* falls through */
                case 'object':
                    if (targ.length === 0) return;
                    // DOMElement / jQuery
                    if (targ.is || targ.style) {
                        // Get the real position of the target
                        toff = (targ = $(targ)).offset();
                    }
            }

            var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;

            $.each(settings.axis.split(''), function (i, axis) {
                var Pos = axis === 'x' ? 'Left' : 'Top',
                    pos = Pos.toLowerCase(),
                    key = 'scroll' + Pos,
                    prev = $elem[key](),
                    max = $scrollTo.max(elem, axis);

                if (toff) {
                    // jQuery / DOMElement
                    attr[key] = toff[pos] + (win ? 0 : prev - $elem.offset()[pos]);

                    // If it's a dom element, reduce the margin
                    if (settings.margin) {
                        attr[key] -= parseInt(targ.css('margin' + Pos), 10) || 0;
                        attr[key] -= parseInt(targ.css('border' + Pos + 'Width'), 10) || 0;
                    }

                    attr[key] += offset[pos] || 0;

                    if (settings.over[pos]) {
                        // Scroll to a fraction of its width/height
                        attr[key] += targ[axis === 'x' ? 'width' : 'height']() * settings.over[pos];
                    }
                } else {
                    var val = targ[pos];
                    // Handle percentage values
                    attr[key] = val.slice && val.slice(-1) === '%' ? parseFloat(val) / 100 * max : val;
                }

                // Number or 'number'
                if (settings.limit && /^\d+$/.test(attr[key])) {
                    // Check the limits
                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                }

                // Don't waste time animating, if there's no need.
                if (!i && settings.axis.length > 1) {
                    if (prev === attr[key]) {
                        // No animation needed
                        attr = {};
                    } else if (queue) {
                        // Intermediate animation
                        animate(settings.onAfterFirst);
                        // Don't animate this axis again in the next iteration.
                        attr = {};
                    }
                }
            });

            animate(settings.onAfter);

            function animate(callback) {
                var opts = $.extend({}, settings, {
                    // The queue setting conflicts with animate()
                    // Force it to always be true
                    queue: true,
                    duration: duration,
                    complete: callback && function () {
                        callback.call(elem, targ, settings);
                    }
                });
                $elem.animate(attr, opts);
            }
        });
    };

    // Max scrolling position, works on quirks mode
    // It only fails (not too badly) on IE, quirks mode.
    $scrollTo.max = function (elem, axis) {
        var Dim = axis === 'x' ? 'Width' : 'Height',
            scroll = 'scroll' + Dim;

        if (!isWin(elem)) return elem[scroll] - $(elem)[Dim.toLowerCase()]();

        var size = 'client' + Dim,
            doc = elem.ownerDocument || elem.document,
            html = doc.documentElement,
            body = doc.body;

        return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
    };

    function both(val) {
        return $.isFunction(val) || $.isPlainObject(val) ? val : { top: val, left: val };
    }

    // Add special hooks so that window scroll properties can be animated
    $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
        get: function (t) {
            return $(t.elem)[t.prop]();
        },
        set: function (t) {
            var curr = this.get(t);
            // If interrupt is true and user scrolled, stop animating
            if (t.options.interrupt && t._last && t._last !== curr) {
                return $(t.elem).stop();
            }
            var next = Math.round(t.now);
            // Don't waste CPU
            // Browsers don't render floating point scroll
            if (curr !== next) {
                $(t.elem)[t.prop](next);
                t._last = this.get(t);
            }
        }
    };

    // AMD requirement
    return $scrollTo;
});

},{}],7:[function(require,module,exports){
/*!
 * jquery.toTop
 * @Description Controller of a scroll to top button
 * @Depend on jquery.scrollTo.js
 * @Author Du Peng
 * @Version 0.01
 * Licensed under MIT
 */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(jQuery);
    } else {
        // Global
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var ToTopProto = {
        init: function (options, el) {
            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.toTop.options, base.$elem.data(), options);
            base.userOptions = options;

            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));

            if (base.options.checkNecessary) {
                if (base.checkIfNecessary()) {
                    base.handleVisibility();
                    base.handleClick();
                } else {
                    base.$elem.hide();
                }
            } else {
                base.handleVisibility();
                base.handleClick();
            }
        },
        setVisibility: function () {
            var base = this;
            //alert($(window).scrollTop() + ' ' + $(document).height() + ' ' + $(window).height());
            if ($(window).scrollTop() > base.options.visibleOffset) {
                if (base.options.toggleClass === '') {
                    base.$elem.show();
                } else {
                    base.$elem.addClass(base.options.toggleClass);
                }
                if (typeof base.options.onToTopShow === "function") base.options.onToTopShow.apply(this, [base.$elem]);
                base.active = true;
            } else {
                if (base.options.toggleClass === '') {
                    base.$elem.hide();
                } else {
                    base.$elem.removeClass(base.options.toggleClass);
                }
                if (typeof base.options.onToTopHide === "function") base.options.onToTopHide.apply(this, [base.$elem]);
                base.active = false;
            }
        },
        handleVisibility: function () {
            var base = this;

            base.setVisibility();

            base.whenScroll = function () {
                base.setVisibility();
            };
            $(window).scroll(base.whenScroll);

            base.whenLoaded = function () {
                base.setVisibility();
            };
            $(window).load(base.whenLoaded);
        },
        handleClick: function () {
            var base = this;

            base.$elem.click(function () {
                $.scrollTo('body', base.options.duration);
            });
        },
        checkIfNecessary: function () {
            var base = this;

            if ($(document).height() / $(window).height() >= base.options.necessaryParam) {
                return true;
            } else {
                return false;
            }
        }
    };
    $.fn.toTop = function (options) {
        return this.each(function () {
            if ($(this).data("toTop-init") === true) {
                return false;
            }
            $(this).data("toTop-init", true);
            var toTop = Object.create(ToTopProto);
            toTop.init(options, this);
            $.data(this, "toTop", toTop);
        });
    };
    $.fn.toTop.options = {
        checkNecessary: true, //是否检测需不需要启用返回顶部按钮
        necessaryParam: 2.5, //当页面长度除以显示窗口高度>=此值时，启用返回顶部按钮
        toggleClass: 'totop-show', //返回顶部按钮显示时的class
        duration: 500, //滚动到顶部动画的时间
        visibleOffset: 200, //当滚动到距离页面顶部>=此值时显示返回顶部按钮

        onToTopShow: false,
        onToTopHide: false
    };
});

},{}],8:[function(require,module,exports){
/* ==================================================================================
 * viewCtrl.js
 * 界面视图相关控制
 * ================================================================================== */
var device = require('../../../../../../bower_components/device.js/lib/device.js');
var ScrollAnim = require('../../../../../libs/scroll-anim/scrollAnim');

var ViewCtrl = function () {

    var winSize = {
        width: 0,
        height: 0
    };

    var maxMobileWidth = 640;
    var minMobileWidth = 320;
    var baseFontsize = 100;
    var currentFontSize = baseFontsize;
    var browserType = "";

    var el_menu = $('#menu');

    function ViewCtrl() {
        this.initLayout();
    }

    ViewCtrl.prototype.initLayout = function () {
        var base = this;

        base.setTouchActive();
        base.setResponsive();
        //base.checkTouchable();

        //console.log(device.tablet());
        browserType = base.getBrowserType();
        if (browserType == 'IE9') {
            $('html').addClass('isIE9');
        } else if (browserType == 'IE8' || browserType == 'IE7') {
            alert('提示 ：浏览器版本过低，实际上线版本，此处将跳转到升级浏览器引导页。');
        }

        $('.scroll-anim').scrollAnim({ onlyOnce: true });

        $(window).resize(function () {
            base.setResponsive();
        });
    };

    ViewCtrl.prototype.setTouchActive = function () {
        $('.touch-active, .btn').on('touchstart mousedown', function () {
            $(this).addClass('active');
        });
        $('.touch-active, .btn').on('touchmove touchend mouseup', function () {
            $(this).removeClass('active');
        });
    };

    ViewCtrl.prototype.getWinSize = function () {
        if (window.innerHeight) {
            winSize.height = window.innerHeight;
            winSize.width = window.innerWidth;
        } else if (document.body && document.body.clientHeight) {
            winSize.height = document.body.clientHeight;
            winSize.width = document.body.clientWidth;
        } else {
            winSize.height = document.documentElement.clientHeight;
            winSize.width = document.documentElement.clientWidth;
        }
        return winSize;
    };

    ViewCtrl.prototype.getBrowserType = function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  

        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return "IE7";
            } else if (fIEVersion == 8) {
                return "IE8";
            } else if (fIEVersion == 9) {
                return "IE9";
            } else if (fIEVersion == 10) {
                return "IE10";
            } else if (fIEVersion == 11) {
                return "IE11";
            } else {
                return "0";
            } //IE版本过低  
        } //isIE end  

        if (isFF) {
            return "FF";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
        if (isEdge) {
            return "Edge";
        }
    };

    ViewCtrl.prototype.checkTouchable = function () {
        var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
        if (isTouch) {
            $('html').addClass('is-touch');
        } else {
            $('html').addClass('is-not-touch');
        }
        return isTouch;
    };

    ViewCtrl.prototype.checkMobile = function () {
        if (this.checkTouchable() && this.getWinSize().width < maxMobileWidth) {
            return true;
        }
        return false;
    };

    ViewCtrl.prototype.setResponsive = function () {
        this.getWinSize();
        if (device.mobile() || device.tablet()) {
            var winWidth = winSize.width <= minMobileWidth ? minMobileWidth : winSize.width > maxMobileWidth ? maxMobileWidth : winSize.width;
            currentFontSize = winWidth / minMobileWidth * baseFontsize;
            $('html').css('fontSize', currentFontSize + 'px');
            //触摸模式下设置菜单高度
            el_menu.css('height', winSize.height + 'px');
        }
    };

    return ViewCtrl;
}();

module.exports = ViewCtrl;

},{"../../../../../../bower_components/device.js/lib/device.js":1,"../../../../../libs/scroll-anim/scrollAnim":9}],9:[function(require,module,exports){
/*!
 * ScrollAnim
 * @Author Du Peng
 * @Version 0.01
 * Licensed under MIT
 */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(jQuery);
    } else {
        // Global
        factory(jQuery);
    }
})(function ($) {
    'use strict';

    var ScrollAnimProto = {
        init: function (options, el) {
            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.scrollAnim.options, base.$elem.data(), options);
            base.userOptions = options;

            base.animIn = false;
            base.handleScroll();
            //alert(base.$elem.offset().top + '---' + $(window).scrollTop() + '----' + $(window).height());
            $(window).scroll(function () {
                base.handleScroll();
            });
        },

        handleScroll: function () {
            var base = this;
            var scrollDistance = $(window).scrollTop() + $(window).height();
            if (scrollDistance > base.$elem.offset().top && !base.animIn) {
                base.$elem.addClass(base.options.animInClass);
                base.animIn = true;
            } else if (base.animIn && scrollDistance <= base.$elem.offset().top && !base.options.onlyOnce) {
                base.$elem.removeClass(base.options.animInClass);
                base.animIn = false;
            }
        }
    };

    $.fn.scrollAnim = function (options) {
        return this.each(function () {
            if ($(this).data("scrollAnim-init") === true) {
                return false;
            }
            $(this).data("scrollAnim-init", true);
            var scrollAnim = Object.create(ScrollAnimProto);
            scrollAnim.init(options, this);
            $.data(this, "scrollAnim", scrollAnim);
        });
    };
    $.fn.scrollAnim.options = {
        animInClass: 'anim-in',
        onlyOnce: false
    };
});

},{}]},{},[4]);
