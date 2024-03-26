"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.AuthCodeAbstract = void 0;
var exceptions_js_1 = require("../exceptions.js");
var environment_js_1 = require("../environment.js");
var utilities = __importStar(require("../utilities/index.js"));
var version_js_1 = require("../version.js");
/**
 * Abstract class provides contract (methods) for classes implementing OAuth2.0 flows
 * for authorization_code grant type, this includes the basic Authorization Code flow
 * and the PKCE extention code flow.
 * @class AuthCodeAbstract
 * @param {AuthorizationCodeOptions} config
 */
var AuthCodeAbstract = exports.AuthCodeAbstract = /** @class */ (function () {
    function AuthCodeAbstract(config) {
        this.config = config;
        var authDomain = config.authDomain, logoutRedirectURL = config.logoutRedirectURL;
        this.logoutEndpoint = "".concat(authDomain, "/logout?redirect=").concat(logoutRedirectURL);
        this.userProfileEndpoint = "".concat(authDomain, "/oauth2/v2/user_profile");
        this.authorizationEndpoint = "".concat(authDomain, "/oauth2/auth");
        this.tokenEndpoint = "".concat(authDomain, "/oauth2/token");
    }
    /**
     * Method handles redirection logic to after authorization server redirects back
     * to application, this method makes use of the @see {exchangeAuthCodeForTokens}
     * method above and saves the received tokens to the current session.
     * @param {SessionManager} sessionManager
     * @param {URL} callbackURL
     * @returns {Promise<void>}
     */
    AuthCodeAbstract.prototype.handleRedirectFromAuthDomain = function (sessionManager, callbackURL) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exchangeAuthCodeForTokens(sessionManager, callbackURL)];
                    case 1:
                        tokens = _a.sent();
                        return [4 /*yield*/, utilities.commitTokensToMemory(sessionManager, tokens)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Method retrieves the access token, if the token present in the current session
     * is unexpired it will be returned otherwise, a new one will be obtained using
     * the refresh token if the refresh token is not available either an error will
     * be thrown.
     * @param {SessionManager} sessionManager
     * @returns {Promise<string>}
     */
    AuthCodeAbstract.prototype.getToken = function (sessionManager) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, isAccessTokenExpired, refreshToken, tokens, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utilities.getAccessToken(sessionManager)];
                    case 1:
                        accessToken = _a.sent();
                        if (!accessToken) {
                            throw new Error('No authentication credential found');
                        }
                        isAccessTokenExpired = utilities.isTokenExpired(accessToken);
                        if (!isAccessTokenExpired) {
                            return [2 /*return*/, accessToken];
                        }
                        return [4 /*yield*/, utilities.getRefreshToken(sessionManager)];
                    case 2:
                        refreshToken = _a.sent();
                        if (!refreshToken && (0, environment_js_1.isNodeEnvironment)()) {
                            throw Error('Cannot persist session no valid refresh token found');
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.refreshTokens(sessionManager)];
                    case 4:
                        tokens = _a.sent();
                        return [2 /*return*/, tokens.access_token];
                    case 5:
                        error_1 = _a.sent();
                        throw new exceptions_js_1.KindeSDKError(exceptions_js_1.KindeSDKErrorCode.FAILED_TOKENS_REFRESH_ATTEMPT, "Failed to refresh tokens owing to: ".concat(error_1.message));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Method returns a boolean indicating if the access token in session is expired
     * or not, in the event the token is expired it makes use of the `getToken` method
     * above to first refresh it, in the event refresh fails false is returned.
     * @param sessionManager
     * @returns {Promise<boolean>}
     */
    AuthCodeAbstract.prototype.isAuthenticated = function (sessionManager) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getToken(sessionManager)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Method makes use of the user profile V2 endpoint to fetch the authenticated
     * user's profile information.
     * @param {SessionManager} sessionManager
     * @returns {Promise<UserType>}
     */
    AuthCodeAbstract.prototype.getUserProfile = function (sessionManager) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, headers, targetURL, config, response, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken(sessionManager)];
                    case 1:
                        accessToken = _a.sent();
                        headers = new Headers();
                        headers.append('Authorization', "Bearer ".concat(accessToken));
                        headers.append('Accept', 'application/json');
                        targetURL = this.userProfileEndpoint;
                        config = { method: 'GET', headers: headers };
                        return [4 /*yield*/, fetch(targetURL, config)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        payload = (_a.sent());
                        return [4 /*yield*/, utilities.commitUserToMemory(sessionManager, payload)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    /**
     * A helper method employed by @see {exchangeAuthCodeForTokens} method in child
     * classes to extract code and state parameters from the received callback URL
     * an exception is raised in the event the callback URL contains an error query
     * parameter.
     * @param {URL} callbackURL
     * @returns {[string, string]} c
     */
    AuthCodeAbstract.prototype.getCallbackURLParams = function (callbackURL) {
        var searchParams = new URLSearchParams(callbackURL.search);
        var state = searchParams.get('state');
        var error = searchParams.get('error');
        var code = searchParams.get('code');
        if (error) {
            throw new Error("Authorization server reported an error: ".concat(error));
        }
        return [code, state];
    };
    /**
     * Method implements logic for fetching tokens from the authorization server using
     * the provided body, the `useCookies` is used exclusively on the browser.
     * @param {SessionManager} sessionManager
     * @param {URLSearchParams} body
     * @param {boolean} useCookies
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    AuthCodeAbstract.prototype.fetchTokensFor = function (sessionManager, body, useCookies) {
        if (useCookies === void 0) { useCookies = false; }
        return __awaiter(this, void 0, void 0, function () {
            var headers, config, response, payload, errorPayload, errorDescription, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new Headers();
                        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        headers.append.apply(headers, __spreadArray([], __read((0, version_js_1.getSDKHeader)({
                            frameworkVersion: this.config.frameworkVersion,
                            framework: this.config.framework,
                        })), false));
                        config = {
                            method: 'POST',
                            headers: headers,
                            body: body,
                            credentials: useCookies ? 'include' : undefined,
                        };
                        return [4 /*yield*/, fetch(this.tokenEndpoint, config)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        payload = (_a.sent());
                        errorPayload = payload;
                        if (!errorPayload.error) return [3 /*break*/, 4];
                        return [4 /*yield*/, sessionManager.destroySession()];
                    case 3:
                        _a.sent();
                        errorDescription = errorPayload.error_description;
                        message = errorDescription !== null && errorDescription !== void 0 ? errorDescription : errorPayload.error;
                        throw new Error(message);
                    case 4: return [2 /*return*/, payload];
                }
            });
        });
    };
    /**
     * Helper method employed by @see {createAuthorizationURL} method above for
     * generating the aforementioned authorization URL.
     * @param {AuthURLOptions}
     * @returns {URLSearchParams}
     */
    AuthCodeAbstract.prototype.generateAuthURLParams = function (options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        var searchParams = this.getBaseAuthURLParams();
        var scope = (_a = this.config.scope) !== null && _a !== void 0 ? _a : AuthCodeAbstract.DEFAULT_TOKEN_SCOPES;
        scope = scope.split(' ').includes('openid') ? scope : "".concat(scope, " openid");
        var searchParamsObject = {
            scope: scope,
        };
        if (options.start_page) {
            searchParamsObject.start_page = options.start_page;
        }
        if (options.org_code) {
            searchParamsObject.org_code = options.org_code;
        }
        if (options.is_create_org) {
            searchParamsObject.org_name = (_b = options.org_name) !== null && _b !== void 0 ? _b : '';
            searchParamsObject.is_create_org = 'true';
        }
        if (options.authUrlParams) {
            var _c = options.authUrlParams, lang = _c.lang, loginHint = _c.login_hint, connectionId = _c.connection_id, rest = __rest(_c, ["lang", "login_hint", "connection_id"]);
            searchParamsObject = __assign(__assign({}, rest), searchParamsObject);
            if (lang) {
                searchParamsObject.lang = lang;
            }
            if (loginHint) {
                searchParamsObject.login_hint = loginHint;
            }
            if (connectionId) {
                searchParamsObject.connection_id = connectionId;
            }
        }
        for (var key in searchParamsObject) {
            var value = searchParamsObject[key];
            if (typeof value === 'object' && value !== null) {
                searchParams.append(key, JSON.stringify(value));
            }
            else {
                searchParams.append(key, String(value));
            }
        }
        if (this.config.audience) {
            var audienceArray = Array.isArray(this.config.audience)
                ? this.config.audience
                : [this.config.audience];
            audienceArray.forEach(function (aud) {
                searchParams.append('audience', aud);
            });
        }
        return searchParams;
    };
    AuthCodeAbstract.DEFAULT_TOKEN_SCOPES = 'openid profile email offline';
    return AuthCodeAbstract;
}());
