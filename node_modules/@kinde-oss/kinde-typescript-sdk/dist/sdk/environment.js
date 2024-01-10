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
export var isNodeEnvironment = function () {
    return currentEnvironment === JSEnvironment.NODEJS;
};
/**
 * Method returns if current environment is browser.
 * @returns {boolean}
 */
export var isBrowserEnvironment = function () {
    return currentEnvironment === JSEnvironment.BROWSER;
};
