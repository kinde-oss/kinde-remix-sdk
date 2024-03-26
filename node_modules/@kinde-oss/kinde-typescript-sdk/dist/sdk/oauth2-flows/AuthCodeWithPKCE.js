var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { isBrowserEnvironment } from '../environment.js';
import { AuthCodeAbstract } from './AuthCodeAbstract.js';
import * as utilities from '../utilities/index.js';
/**
 * Class provides implementation for the authorization code with PKCE extension
 * OAuth2.0 flow, please note the use of the `isBrowserEnvironment()` method
 * in certain methods of this class, this is because this class is intended to
 * be used on both the browser and server.
 * @class AuthCodeWithPKCE
 * @param {AuthorizationCodeOptions} config
 */
export var AuthCodeWithPKCE = /** @class */ (function (_super) {
    __extends(AuthCodeWithPKCE, _super);
    function AuthCodeWithPKCE(config) {
        var _this = _super.call(this, config) || this;
        _this.config = config;
        return _this;
    }
    /**
     * Method provides implementation for `createAuthorizationURL` method mandated by
     * `AuthCodeAbstract` parent class, see corresponding comment in parent class for
     * further explanation.
     * @param {SessionManager} sessionManager
     * @param {AuthURLOptions} options
     * @returns {Promise<URL>} required authorization URL
     */
    AuthCodeWithPKCE.prototype.createAuthorizationURL = function (sessionManager, options) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var challengeSetup, challenge, verifier, setItem, authURL, authParams;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, utilities.setupCodeChallenge()];
                    case 1:
                        challengeSetup = _b.sent();
                        challenge = challengeSetup.challenge, verifier = challengeSetup.verifier;
                        this.codeChallenge = challenge;
                        this.codeVerifier = verifier;
                        this.state = (_a = options.state) !== null && _a !== void 0 ? _a : utilities.generateRandomString();
                        setItem = isBrowserEnvironment()
                            ? sessionManager.setSessionItemBrowser
                            : sessionManager.setSessionItem;
                        return [4 /*yield*/, setItem.call(sessionManager, this.getCodeVerifierKey(this.state), JSON.stringify({ codeVerifier: this.codeVerifier }))];
                    case 2:
                        _b.sent();
                        authURL = new URL(this.authorizationEndpoint);
                        authParams = this.generateAuthURLParams(options);
                        authURL.search = authParams.toString();
                        return [2 /*return*/, authURL];
                }
            });
        });
    };
    /**
     * Method provides implementation for `refreshTokens` method mandated by
     * `AuthCodeAbstract` parent class, see corresponding comment in parent class for
     * further explanation.
     * @param {SessionManager} sessionManager
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    AuthCodeWithPKCE.prototype.refreshTokens = function (sessionManager) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, body, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utilities.getRefreshToken(sessionManager)];
                    case 1:
                        refreshToken = _a.sent();
                        body = new URLSearchParams({
                            grant_type: 'refresh_token',
                            refresh_token: refreshToken,
                            client_id: this.config.clientId,
                        });
                        return [4 /*yield*/, this.fetchTokensFor(sessionManager, body, true)];
                    case 2:
                        tokens = _a.sent();
                        return [4 /*yield*/, utilities.commitTokensToMemory(sessionManager, tokens)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    /**
     * Method provides implementation for `exchangeAuthCodeForTokens` method mandated
     * by `AuthCodeAbstract` parent class, see corresponding comment in parent class
     * for further explanation.
     * @param {SessionManager} sessionManager
     * @param {URL} callbackURL
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    AuthCodeWithPKCE.prototype.exchangeAuthCodeForTokens = function (sessionManager, callbackURL) {
        return __awaiter(this, void 0, void 0, function () {
            var code, state, storedStateKey, getItem, storedState, authFlowState, body, removeItem;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        code = (_a = __read(_super.prototype.getCallbackURLParams.call(this, callbackURL), 2), _a[0]), state = _a[1];
                        storedStateKey = this.getCodeVerifierKey(state);
                        if (!(storedStateKey === null || storedStateKey === void 0 ? void 0 : storedStateKey.endsWith(state))) {
                            throw new Error('Received state does not match stored state');
                        }
                        getItem = isBrowserEnvironment()
                            ? sessionManager.getSessionItemBrowser
                            : sessionManager.getSessionItem;
                        return [4 /*yield*/, getItem.call(sessionManager, storedStateKey)];
                    case 1:
                        storedState = (_b.sent());
                        if (!storedState) {
                            throw new Error('Stored state not found');
                        }
                        authFlowState = JSON.parse(storedState);
                        this.codeVerifier = authFlowState.codeVerifier;
                        body = new URLSearchParams({
                            redirect_uri: this.config.redirectURL,
                            client_id: this.config.clientId,
                            code_verifier: this.codeVerifier,
                            grant_type: 'authorization_code',
                            code: code,
                        });
                        removeItem = isBrowserEnvironment()
                            ? sessionManager.removeSessionItemBrowser
                            : sessionManager.removeSessionItem;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 4, 6]);
                        return [4 /*yield*/, this.fetchTokensFor(sessionManager, body)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [4 /*yield*/, removeItem.call(sessionManager, this.getCodeVerifierKey(state))];
                    case 5:
                        _b.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Method generates the key against which the code verifier is stored in session
     * storage.
     * @param {string} state
     * @returns {string} - required code verifer key
     */
    AuthCodeWithPKCE.prototype.getCodeVerifierKey = function (state) {
        return "".concat(AuthCodeWithPKCE.STATE_KEY, "-").concat(state);
    };
    /**
     * Method provides implementation for `getBaseAuthURLParams` method mandated by
     * `AuthCodeAbstract` parent class, see corresponding comment in parent class
     * for further explanation.
     * @returns {URLSearchParams} Required query parameters
     */
    AuthCodeWithPKCE.prototype.getBaseAuthURLParams = function () {
        return new URLSearchParams({
            state: this.state,
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectURL,
            response_type: 'code',
            code_challenge: this.codeChallenge,
            code_challenge_method: 'S256',
        });
    };
    AuthCodeWithPKCE.STATE_KEY = 'acwpf-state-key';
    return AuthCodeWithPKCE;
}(AuthCodeAbstract));
