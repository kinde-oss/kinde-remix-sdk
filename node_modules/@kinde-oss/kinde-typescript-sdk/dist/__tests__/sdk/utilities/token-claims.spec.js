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
import * as mocks from '../../mocks';
import { getUserOrganizations, getOrganization, getClaimValue, getPermission, getClaim, } from '../../../sdk/utilities';
describe('token-claims', function () {
    var mockAccessToken;
    var mockIdToken;
    var authDomain = 'https://local-testing@kinde.com';
    var sessionManager = mocks.sessionManager;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAccessToken = mocks.getMockAccessToken();
                    mockIdToken = mocks.getMockIdToken();
                    return [4 /*yield*/, sessionManager.setSessionItem('access_token', mockAccessToken.token)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sessionManager.setSessionItem('id_token', mockIdToken.token)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
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
    describe('getClaimValue', function () {
        it('returns value for a token claim if claim exists', function () {
            Object.keys(mockAccessToken.payload).forEach(function (name) { return __awaiter(void 0, void 0, void 0, function () {
                var claimValue, tokenPayload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getClaimValue(sessionManager, name)];
                        case 1:
                            claimValue = _a.sent();
                            tokenPayload = mockAccessToken.payload;
                            expect(claimValue).toStrictEqual(tokenPayload[name]);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        it('return null if claim does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var claimName, claimValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        claimName = 'non-existant-claim';
                        return [4 /*yield*/, getClaimValue(sessionManager, claimName)];
                    case 1:
                        claimValue = _a.sent();
                        expect(claimValue).toBe(null);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getClaim', function () {
        it('returns value for a token claim if claim exists', function () {
            Object.keys(mockAccessToken.payload).forEach(function (name) { return __awaiter(void 0, void 0, void 0, function () {
                var claim, tokenPayload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getClaim(sessionManager, name)];
                        case 1:
                            claim = _a.sent();
                            tokenPayload = mockAccessToken.payload;
                            expect(claim).toStrictEqual({ name: name, value: tokenPayload[name] });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        it('return null if claim does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var claimName, claim;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        claimName = 'non-existant-claim';
                        return [4 /*yield*/, getClaim(sessionManager, claimName)];
                    case 1:
                        claim = _a.sent();
                        expect(claim).toStrictEqual({ name: claimName, value: null });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getPermission', function () {
        it('return orgCode and isGranted = true if permission is given', function () {
            var permissions = mockAccessToken.payload.permissions;
            permissions.forEach(function (permission) { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = expect;
                            return [4 /*yield*/, getPermission(sessionManager, permission)];
                        case 1:
                            _a.apply(void 0, [_b.sent()]).toStrictEqual({
                                orgCode: mockAccessToken.payload.org_code,
                                isGranted: true,
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        it('return isGranted = false is permission is not given', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orgCode, permissionName, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orgCode = mockAccessToken.payload.org_code;
                        permissionName = 'non-existant-permission';
                        _a = expect;
                        return [4 /*yield*/, getPermission(sessionManager, permissionName)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toStrictEqual({
                            orgCode: orgCode,
                            isGranted: false,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getUserOrganizations', function () {
        it('lists all user organizations using id token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orgCodes, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orgCodes = mockIdToken.payload.org_codes;
                        _a = expect;
                        return [4 /*yield*/, getUserOrganizations(sessionManager)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toStrictEqual({
                            orgCodes: orgCodes,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getOrganization', function () {
        it('returns organization code using accesss token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var orgCode, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orgCode = mockAccessToken.payload.org_code;
                        _a = expect;
                        return [4 /*yield*/, getOrganization(sessionManager)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toStrictEqual({ orgCode: orgCode });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
