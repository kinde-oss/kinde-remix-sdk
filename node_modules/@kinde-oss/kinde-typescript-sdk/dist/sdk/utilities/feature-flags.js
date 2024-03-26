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
import { getClaimValue } from './token-claims.js';
import { FlagDataType, } from './types.js';
/**
 * Method extracts the provided feature flag from the access token in the
 * current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {FlagType[keyof FlagType]} defaultValue
 * @param {keyof FlagType} type
 * @returns {GetFlagType}
 */
export var getFlag = function (sessionManager, code, defaultValue, type) { return __awaiter(void 0, void 0, void 0, function () {
    var featureFlags, flag, response;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, getClaimValue(sessionManager, 'feature_flags')];
            case 1:
                featureFlags = (_a = (_d.sent())) !== null && _a !== void 0 ? _a : {};
                flag = featureFlags[code];
                if (!flag && defaultValue === undefined) {
                    throw new Error("Flag ".concat(code, " was not found, and no default value has been provided"));
                }
                if ((flag === null || flag === void 0 ? void 0 : flag.t) && type && type !== (flag === null || flag === void 0 ? void 0 : flag.t)) {
                    throw new Error("Flag ".concat(code, " is of type ").concat(FlagDataType[flag.t], ", expected type is ").concat(FlagDataType[type]));
                }
                response = {
                    is_default: (flag === null || flag === void 0 ? void 0 : flag.v) === undefined,
                    value: (_b = flag === null || flag === void 0 ? void 0 : flag.v) !== null && _b !== void 0 ? _b : defaultValue,
                    code: code,
                };
                if (!response.is_default) {
                    response.type = FlagDataType[(_c = flag === null || flag === void 0 ? void 0 : flag.t) !== null && _c !== void 0 ? _c : type];
                }
                return [2 /*return*/, response];
        }
    });
}); };
/**
 * Method extracts the provided number feature flag from the access token in
 * the current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {number} defaultValue
 * @returns {number} integer flag value
 */
export var getIntegerFlag = function (sessionManager, code, defaultValue) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFlag(sessionManager, code, defaultValue, 'i')];
            case 1: return [2 /*return*/, (_a.sent()).value];
        }
    });
}); };
/**
 * Method extracts the provided string feature flag from the access token in
 * the current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {string} defaultValue
 * @returns {string} string flag value
 */
export var getStringFlag = function (sessionManager, code, defaultValue) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFlag(sessionManager, code, defaultValue, 's')];
            case 1: return [2 /*return*/, (_a.sent()).value];
        }
    });
}); };
/**
 * Method extracts the provided boolean feature flag from the access token in
 * the current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {boolean} defaultValue
 * @returns {boolean} boolean flag value
 */
export var getBooleanFlag = function (sessionManager, code, defaultValue) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFlag(sessionManager, code, defaultValue, 'b')];
            case 1: return [2 /*return*/, (_a.sent()).value];
        }
    });
}); };
