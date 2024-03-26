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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionManager = exports.getMockIdToken = exports.getMockAccessToken = exports.fetchClient = void 0;
exports.fetchClient = jest.fn().mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve({
                    json: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.resolve()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
var getMockAccessToken = function (domain, isExpired, isExpClaimMissing) {
    if (domain === void 0) { domain = 'local-testing@kinde.com'; }
    if (isExpired === void 0) { isExpired = false; }
    if (isExpClaimMissing === void 0) { isExpClaimMissing = false; }
    var iat = Math.floor(Date.now() / 1000);
    var exp = isExpClaimMissing ? undefined : isExpired ? iat : iat + 1000000;
    var tokenPayload = {
        aud: [domain],
        azp: '',
        exp: exp,
        gty: ['client_credentials'],
        iat: iat,
        iss: domain,
        org_code: 'org_123456789',
        scp: ['openid', 'profile', 'email', 'offline'],
        permissions: ['perm1', 'perm2', 'perm3'],
        jti: '8a567995-ace9-4e82-8724-94651a5ca50c',
        sub: 'kp_0c3ff3d085flo6396as29d4ffee750be7',
        feature_flags: {
            is_dark_mode: { t: 'b', v: false },
            competitions_limit: { t: 'i', v: 5 },
            theme: { t: 's', v: 'pink' },
        },
    };
    return {
        token: ".".concat(btoa(JSON.stringify(tokenPayload)), "."),
        payload: tokenPayload,
    };
};
exports.getMockAccessToken = getMockAccessToken;
var getMockIdToken = function (domain, isExpired) {
    if (domain === void 0) { domain = 'local-testing@kinde.com'; }
    if (isExpired === void 0) { isExpired = false; }
    var iat = Math.floor(Date.now() / 1000);
    var exp = isExpired ? iat : iat + 1000000;
    var tokenPayload = {
        at_hash: 'oQ2Pa8kOCGrCoOQocpFzTA',
        aud: [domain, '35d47ccb0b5040ki3f57a2d0631af559'],
        auth_time: 1684766671,
        azp: '35d47ccb0blo40faaf57a2d0631af559',
        email: 'test-first.test-last@test.com',
        exp: exp,
        family_name: 'test-last',
        given_name: 'test-first',
        iat: iat,
        iss: domain,
        jti: '687ddac5-bac4-48cf-b5ba-2db3ca5107c1',
        name: 'test-first',
        org_codes: ['org_12345678'],
        sub: 'kp_0c3ff3d085flo6396as29d4ffee750be7',
        updated_at: iat,
    };
    return {
        token: ".".concat(btoa(JSON.stringify(tokenPayload)), "."),
        payload: tokenPayload,
    };
};
exports.getMockIdToken = getMockIdToken;
var ServerSessionManager = /** @class */ (function () {
    function ServerSessionManager() {
        this.memCache = {};
    }
    ServerSessionManager.prototype.destroySession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.memCache = {};
                return [2 /*return*/];
            });
        });
    };
    ServerSessionManager.prototype.getSessionItem = function (itemKey) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.memCache[itemKey]) !== null && _a !== void 0 ? _a : null];
            });
        });
    };
    ServerSessionManager.prototype.setSessionItem = function (itemKey, itemValue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.memCache[itemKey] = itemValue;
                return [2 /*return*/];
            });
        });
    };
    ServerSessionManager.prototype.removeSessionItem = function (itemKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                delete this.memCache[itemKey];
                return [2 /*return*/];
            });
        });
    };
    return ServerSessionManager;
}());
exports.sessionManager = new ServerSessionManager();
global.fetch = exports.fetchClient;
