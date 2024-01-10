"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowserEnvironment = exports.isNodeEnvironment = void 0;
var JSEnvironment;
(function (JSEnvironment) {
    JSEnvironment["BROWSER"] = "BROWSER";
    JSEnvironment["NODEJS"] = "NODEJS";
})(JSEnvironment || (JSEnvironment = {}));
var currentEnvironment = typeof window === 'undefined' ? JSEnvironment.NODEJS : JSEnvironment.BROWSER;
/**
 * Method returns if current environment is node.js
 * @returns {boolean}
 */
var isNodeEnvironment = function () {
    return currentEnvironment === JSEnvironment.NODEJS;
};
exports.isNodeEnvironment = isNodeEnvironment;
/**
 * Method returns if current environment is browser.
 * @returns {boolean}
 */
var isBrowserEnvironment = function () {
    return currentEnvironment === JSEnvironment.BROWSER;
};
exports.isBrowserEnvironment = isBrowserEnvironment;
