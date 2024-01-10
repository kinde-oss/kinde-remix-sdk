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
import { base64UrlEncode, sha256 } from '../../../sdk/utilities';
import { AuthCodeWithPKCE } from '../../../sdk/oauth2-flows';
import { getSDKHeader } from '../../../sdk/version';
import * as mocks from '../../mocks';
describe('AuthCodeWitPKCE', function () {
    var sessionManager = mocks.sessionManager;
    var clientConfig = {
        authDomain: 'https://local-testing@kinde.com',
        redirectURL: 'https://app-domain.com',
        logoutRedirectURL: 'http://app-domain.com',
        clientId: 'client-id',
    };
    describe('new AuthCodeWithPKCE', function () {
        it('can construct AuthCodeWithPKCE instance', function () {
            expect(function () { return new AuthCodeWithPKCE(clientConfig); }).not.toThrowError();
        });
    });
    describe('createAuthorizationURL()', function () {
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sessionManager.destroySession()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('saves generated code verifier to session storage again state', function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, authURL, searchParams, state, expectedChallenge, codeVerifierKey, codeVerifierState, _a, _b, codeVerifier, foundChallenge, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = new AuthCodeWithPKCE(clientConfig);
                        return [4 /*yield*/, client.createAuthorizationURL(sessionManager)];
                    case 1:
                        authURL = _d.sent();
                        searchParams = new URLSearchParams(authURL.search);
                        state = searchParams.get('state');
                        expectedChallenge = searchParams.get('code_challenge');
                        expect(state).toBeDefined();
                        expect(expectedChallenge).toBeDefined();
                        codeVerifierKey = "".concat(AuthCodeWithPKCE.STATE_KEY, "-").concat(state);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, sessionManager.getSessionItem(codeVerifierKey)];
                    case 2:
                        codeVerifierState = _b.apply(_a, [(_d.sent())]);
                        expect(codeVerifierState).toBeDefined();
                        codeVerifier = codeVerifierState.codeVerifier;
                        expect(codeVerifier).toBeDefined();
                        _c = base64UrlEncode;
                        return [4 /*yield*/, sha256(codeVerifier)];
                    case 3:
                        foundChallenge = _c.apply(void 0, [_d.sent()]);
                        expect(foundChallenge).toBe(expectedChallenge);
                        return [2 /*return*/];
                }
            });
        }); });
        it('uses provided state to generate authorization URL if given', function () { return __awaiter(void 0, void 0, void 0, function () {
            var expectedState, client, authURL, searchParams, state, expectedChallenge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedState = 'test-app-state';
                        client = new AuthCodeWithPKCE(clientConfig);
                        return [4 /*yield*/, client.createAuthorizationURL(sessionManager, {
                                state: expectedState,
                            })];
                    case 1:
                        authURL = _a.sent();
                        searchParams = new URLSearchParams(authURL.search);
                        state = searchParams.get('state');
                        expectedChallenge = searchParams.get('code_challenge');
                        expect(state).toBe(expectedState);
                        expect(expectedChallenge).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('handleRedirectFromAuthDomain()', function () {
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sessionManager.destroySession()];
                    case 1:
                        _a.sent();
                        mocks.fetchClient.mockClear();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws an error if callbackURL has an error query param', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callbackURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callbackURL = new URL("".concat(clientConfig.redirectURL, "?state=state&code=code&error=error"));
                        return [4 /*yield*/, expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var client;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            client = new AuthCodeWithPKCE(clientConfig);
                                            return [4 /*yield*/, client.handleRedirectFromAuthDomain(sessionManager, callbackURL)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).rejects.toThrow('Authorization server reported an error: error')];
                    case 1:
                        _a.sent();
                        expect(mocks.fetchClient).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws an error if auth flow state is not present in session store', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callbackURL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callbackURL = new URL("".concat(clientConfig.redirectURL, "?state=state&code=code"));
                        return [4 /*yield*/, expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var client;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            client = new AuthCodeWithPKCE(clientConfig);
                                            return [4 /*yield*/, client.handleRedirectFromAuthDomain(sessionManager, callbackURL)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).rejects.toThrow('Stored state not found')];
                    case 1:
                        _a.sent();
                        expect(mocks.fetchClient).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws an exception when fetching tokens returns an error response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var callbackURL, errorDescription, codeVerifierKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callbackURL = new URL("".concat(clientConfig.redirectURL, "?state=state&code=code"));
                        errorDescription = 'error_description';
                        codeVerifierKey = "".concat(AuthCodeWithPKCE.STATE_KEY, "-state");
                        return [4 /*yield*/, sessionManager.setSessionItem(codeVerifierKey, JSON.stringify({ codeVerifier: 'code-verifier' }))];
                    case 1:
                        _a.sent();
                        mocks.fetchClient.mockResolvedValue({
                            json: function () {
                                var _a;
                                return (_a = {
                                        error: 'error'
                                    },
                                    _a[errorDescription] = errorDescription,
                                    _a);
                            },
                        });
                        return [4 /*yield*/, expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var client;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            client = new AuthCodeWithPKCE(clientConfig);
                                            return [4 /*yield*/, client.handleRedirectFromAuthDomain(sessionManager, callbackURL)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).rejects.toThrow(errorDescription)];
                    case 2:
                        _a.sent();
                        expect(mocks.fetchClient).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('saves tokens to memory store after exchanging auth code for tokens', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAccessToken, mockIdToken, callbackURL, codeVerifierKey, client, foundRefreshToken, foundAccessToken, foundIdToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockAccessToken = mocks.getMockAccessToken(clientConfig.authDomain);
                        mockIdToken = mocks.getMockIdToken(clientConfig.authDomain);
                        mocks.fetchClient.mockResolvedValue({
                            json: function () { return ({
                                access_token: mockAccessToken.token,
                                refresh_token: 'refresh_token',
                                id_token: mockIdToken.token,
                            }); },
                        });
                        callbackURL = new URL("".concat(clientConfig.redirectURL, "?state=state&code=code"));
                        codeVerifierKey = "".concat(AuthCodeWithPKCE.STATE_KEY, "-state");
                        return [4 /*yield*/, sessionManager.setSessionItem(codeVerifierKey, JSON.stringify({ codeVerifier: 'code-verifier' }))];
                    case 1:
                        _a.sent();
                        client = new AuthCodeWithPKCE(clientConfig);
                        return [4 /*yield*/, client.handleRedirectFromAuthDomain(sessionManager, callbackURL)];
                    case 2:
                        _a.sent();
                        expect(mocks.fetchClient).toHaveBeenCalledTimes(1);
                        return [4 /*yield*/, sessionManager.getSessionItem('refresh_token')];
                    case 3:
                        foundRefreshToken = _a.sent();
                        return [4 /*yield*/, sessionManager.getSessionItem('access_token')];
                    case 4:
                        foundAccessToken = _a.sent();
                        return [4 /*yield*/, sessionManager.getSessionItem('id_token')];
                    case 5:
                        foundIdToken = _a.sent();
                        expect(foundAccessToken).toBe(mockAccessToken.token);
                        expect(foundRefreshToken).toBe('refresh_token');
                        expect(foundIdToken).toBe(mockIdToken.token);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getToken()', function () {
        afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sessionManager.destroySession()];
                    case 1:
                        _a.sent();
                        mocks.fetchClient.mockClear();
                        return [2 /*return*/];
                }
            });
        }); });
        it('return an existing token if an unexpired token is available', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAccessToken, client, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockAccessToken = mocks.getMockAccessToken(clientConfig.authDomain);
                        return [4 /*yield*/, sessionManager.setSessionItem('access_token', mockAccessToken.token)];
                    case 1:
                        _a.sent();
                        client = new AuthCodeWithPKCE(clientConfig);
                        return [4 /*yield*/, client.getToken(sessionManager)];
                    case 2:
                        token = _a.sent();
                        expect(token).toBe(mockAccessToken.token);
                        expect(mocks.fetchClient).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws an error if no refresh token is found in memory', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockAccessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockAccessToken = mocks.getMockAccessToken(clientConfig.authDomain, true);
                        return [4 /*yield*/, sessionManager.setSessionItem('access_token', mockAccessToken.token)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var client;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            client = new AuthCodeWithPKCE(clientConfig);
                                            return [4 /*yield*/, client.getToken(sessionManager)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).rejects.toThrow('Cannot persist session no valid refresh token found')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fetches new tokens if access token is expired and refresh token is available', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newAccessToken, newIdToken, expiredAccessToken, body, headers, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newAccessToken = mocks.getMockAccessToken(clientConfig.authDomain);
                        newIdToken = mocks.getMockIdToken(clientConfig.authDomain);
                        mocks.fetchClient.mockResolvedValue({
                            json: function () { return ({
                                access_token: newAccessToken.token,
                                refresh_token: 'new_refresh_token',
                                id_token: newIdToken.token,
                            }); },
                        });
                        expiredAccessToken = mocks.getMockAccessToken(clientConfig.authDomain, true);
                        return [4 /*yield*/, sessionManager.setSessionItem('access_token', expiredAccessToken.token)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sessionManager.setSessionItem('refresh_token', 'refresh_token')];
                    case 2:
                        _a.sent();
                        body = new URLSearchParams({
                            grant_type: 'refresh_token',
                            refresh_token: 'refresh_token',
                            client_id: clientConfig.clientId,
                        });
                        headers = new Headers();
                        headers.append.apply(headers, __spreadArray([], __read(getSDKHeader()), false));
                        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        client = new AuthCodeWithPKCE(clientConfig);
                        return [4 /*yield*/, client.getToken(sessionManager)];
                    case 3:
                        _a.sent();
                        expect(mocks.fetchClient).toHaveBeenCalledWith("".concat(clientConfig.authDomain, "/oauth2/token"), { method: 'POST', headers: headers, body: body, credentials: 'include' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('overrides SDK version header if options are provided to client constructor', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newAccessToken, newIdToken, expiredAccessToken, headerOverrides, headers, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newAccessToken = mocks.getMockAccessToken(clientConfig.authDomain);
                        newIdToken = mocks.getMockIdToken(clientConfig.authDomain);
                        mocks.fetchClient.mockResolvedValue({
                            json: function () { return ({
                                access_token: newAccessToken.token,
                                refresh_token: 'new_refresh_token',
                                id_token: newIdToken.token,
                            }); },
                        });
                        expiredAccessToken = mocks.getMockAccessToken(clientConfig.authDomain, true);
                        return [4 /*yield*/, sessionManager.setSessionItem('access_token', expiredAccessToken.token)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sessionManager.setSessionItem('refresh_token', 'refresh_token')];
                    case 2:
                        _a.sent();
                        headerOverrides = {
                            framework: 'TypeScript-Framework',
                            frameworkVersion: '1.1.1',
                        };
                        headers = new Headers();
                        headers.append.apply(headers, __spreadArray([], __read(getSDKHeader(headerOverrides)), false));
                        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        client = new AuthCodeWithPKCE(__assign(__assign({}, clientConfig), headerOverrides));
                        return [4 /*yield*/, client.getToken(sessionManager)];
                    case 3:
                        _a.sent();
                        expect(mocks.fetchClient).toHaveBeenCalledWith("".concat(clientConfig.authDomain, "/oauth2/token"), expect.objectContaining({ headers: headers }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('commits new tokens to memory if new tokens are fetched', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newAccessToken, newIdToken, newRefreshToken, expiredAccessToken, client, foundRefreshToken, foundAccessToken, foundIdToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newAccessToken = mocks.getMockAccessToken(clientConfig.authDomain);
                        newIdToken = mocks.getMockIdToken(clientConfig.authDomain);
                        newRefreshToken = 'new_refresh_token';
                        mocks.fetchClient.mockResolvedValue({
                            json: function () { return ({
                                access_token: newAccessToken.token,
                                refresh_token: newRefreshToken,
                                id_token: newIdToken.token,
                            }); },
                        });
                        expiredAccessToken = mocks.getMockAccessToken(clientConfig.authDomain, true);
                        return [4 /*yield*/, sessionManager.setSessionItem('access_token', expiredAccessToken.token)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sessionManager.setSessionItem('refresh_token', 'refresh_token')];
                    case 2:
                        _a.sent();
                        client = new AuthCodeWithPKCE(clientConfig);
                        return [4 /*yield*/, client.getToken(sessionManager)];
                    case 3:
                        _a.sent();
                        expect(mocks.fetchClient).toHaveBeenCalledTimes(1);
                        return [4 /*yield*/, sessionManager.getSessionItem('refresh_token')];
                    case 4:
                        foundRefreshToken = _a.sent();
                        return [4 /*yield*/, sessionManager.getSessionItem('access_token')];
                    case 5:
                        foundAccessToken = _a.sent();
                        return [4 /*yield*/, sessionManager.getSessionItem('id_token')];
                    case 6:
                        foundIdToken = _a.sent();
                        expect(foundAccessToken).toBe(newAccessToken.token);
                        expect(foundRefreshToken).toBe(newRefreshToken);
                        expect(foundIdToken).toBe(newIdToken.token);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
