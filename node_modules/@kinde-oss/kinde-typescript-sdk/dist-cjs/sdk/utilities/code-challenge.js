"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCodeChallenge = exports.sha256 = exports.base64UrlEncode = void 0;
var random_string_js_1 = require("./random-string.js");
var uncrypto_1 = require("uncrypto");
/**
 * Encodes the provided ArrayBuffer string to base-64 format.
 * @param {ArrayBuffer} str
 * @returns {string}
 */
var base64UrlEncode = function (str) {
    return btoa(String.fromCharCode.apply(String, __spreadArray([], __read(new Uint8Array(str)), false)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};
exports.base64UrlEncode = base64UrlEncode;
/**
 * Creates a one-way hash for the provided string using SHA-256
 * algorithm, the result is provided as an ArrayBuffer instance.
 * @param {string} plain
 * @returns {Promise<ArrayBuffer>}
 */
var sha256 = function (plain) { return __awaiter(void 0, void 0, void 0, function () {
    var encoder, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                encoder = new TextEncoder();
                data = encoder.encode(plain);
                return [4 /*yield*/, uncrypto_1.subtle.digest('SHA-256', data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.sha256 = sha256;
/**
 * Sets up the code challenge required for PKCE OAuth2.0 flow
 * returning the verifier (secret) and its corresponding one-way
 * hash (challenge).
 * @returns {Promise<{ challenge: string, verifier: string }>}
 */
var setupCodeChallenge = function () { return __awaiter(void 0, void 0, void 0, function () {
    var secret, challenge, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                secret = (0, random_string_js_1.generateRandomString)(50);
                _a = exports.base64UrlEncode;
                return [4 /*yield*/, (0, exports.sha256)(secret)];
            case 1:
                challenge = _a.apply(void 0, [_b.sent()]);
                return [2 /*return*/, { challenge: challenge, verifier: secret }];
        }
    });
}); };
exports.setupCodeChallenge = setupCodeChallenge;
