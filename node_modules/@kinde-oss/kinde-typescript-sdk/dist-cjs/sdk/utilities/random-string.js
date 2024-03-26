"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
var uncrypto_1 = require("uncrypto");
/**
 * Creates a random string of provided length.
 * @param {number} length
 * @returns {string} required secret
 */
var generateRandomString = function (length) {
    if (length === void 0) { length = 28; }
    var bytesNeeded = Math.ceil(length / 2);
    var array = new Uint32Array(bytesNeeded);
    (0, uncrypto_1.getRandomValues)(array);
    var result = Array.from(array, function (dec) { return ('0' + dec.toString(16)).slice(-2); }).join('');
    if (length % 2 !== 0) {
        // If the requested length is odd, remove the last character to adjust the length
        result = result.slice(0, -1);
    }
    return result;
};
exports.generateRandomString = generateRandomString;
