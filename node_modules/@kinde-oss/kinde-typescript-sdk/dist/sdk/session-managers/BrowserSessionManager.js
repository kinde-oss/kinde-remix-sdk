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
import { isBrowserEnvironment } from '../environment.js';
/**
 * Provides a session manager implementation for the browser.
 * @class BrowserSessionManager
 */
export var BrowserSessionManager = /** @class */ (function () {
    function BrowserSessionManager() {
        this.memCache = {};
        if (!isBrowserEnvironment()) {
            throw new Error('BrowserSessionStore must be instantiated on the browser');
        }
    }
    /**
     * Prefixes provided item key with class static prefix.
     * @param {string} itemKey
     * @returns {string}
     */
    BrowserSessionManager.prototype.generateItemKey = function (itemKey) {
        return "".concat(BrowserSessionManager.ITEM_NAME_PREFIX).concat(itemKey);
    };
    /**
     * Clears all items from session store.
     * @returns {void}
     */
    BrowserSessionManager.prototype.destroySession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                sessionStorage.clear();
                this.memCache = {};
                return [2 /*return*/];
            });
        });
    };
    /**
     * Sets the provided key-value store to the memory cache.
     * @param {string} itemKey
     * @param {unknown} itemValue
     * @returns {void}
     */
    BrowserSessionManager.prototype.setSessionItem = function (itemKey, itemValue) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = this.generateItemKey(itemKey);
                this.memCache[key] = itemValue;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Sets the provided key-value store to the browser session storage.
     * @param {string} itemKey
     * @param {unknown} itemValue
     */
    BrowserSessionManager.prototype.setSessionItemBrowser = function (itemKey, itemValue) {
        return __awaiter(this, void 0, void 0, function () {
            var key, isString, value;
            return __generator(this, function (_a) {
                key = this.generateItemKey(itemKey);
                isString = typeof itemValue === 'string';
                value = !isString ? JSON.stringify(itemValue) : itemValue;
                sessionStorage.setItem(key, value);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Gets the item for the provided key from the memory cache.
     * @param {string} itemKey
     * @returns {unknown | null}
     */
    BrowserSessionManager.prototype.getSessionItem = function (itemKey) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_b) {
                key = this.generateItemKey(itemKey);
                return [2 /*return*/, (_a = this.memCache[key]) !== null && _a !== void 0 ? _a : null];
            });
        });
    };
    /**
     * Gets the item for the provided key from the browser session storage.
     * @param {string} itemKey
     * @returns {unknown | null}
     */
    BrowserSessionManager.prototype.getSessionItemBrowser = function (itemKey) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = this.generateItemKey(itemKey);
                return [2 /*return*/, sessionStorage.getItem(key)];
            });
        });
    };
    /**
     * Removes the item for the provided key from the memory cache.
     * @param {string} itemKey
     * @returns {void}
     */
    BrowserSessionManager.prototype.removeSessionItem = function (itemKey) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = this.generateItemKey(itemKey);
                delete this.memCache[key];
                return [2 /*return*/];
            });
        });
    };
    /**
     * Removes the item for the provided key from the browser session storage.
     * @param {string} itemKey
     * @returns {void}
     */
    BrowserSessionManager.prototype.removeSessionItemBrowser = function (itemKey) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = this.generateItemKey(itemKey);
                sessionStorage.removeItem(key);
                return [2 /*return*/];
            });
        });
    };
    BrowserSessionManager.ITEM_NAME_PREFIX = 'browser-session-store@';
    return BrowserSessionManager;
}());
