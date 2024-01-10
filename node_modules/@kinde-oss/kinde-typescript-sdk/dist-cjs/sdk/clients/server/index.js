"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKindeServerClient = void 0;
var authorization_code_js_1 = __importDefault(require("./authorization-code.js"));
var environment_js_1 = require("../../environment.js");
var client_credentials_js_1 = __importDefault(require("./client-credentials.js"));
var index_js_1 = require("../../oauth2-flows/index.js");
var createKindeServerClient = function (grantType, options) {
    if (!(0, environment_js_1.isNodeEnvironment)()) {
        throw new Error('this method must be invoked in a node.js environment');
    }
    switch (grantType) {
        case index_js_1.GrantType.AUTHORIZATION_CODE: {
            var clientOptions = options;
            return (0, authorization_code_js_1.default)(clientOptions, false);
        }
        case index_js_1.GrantType.PKCE: {
            var clientOptions = options;
            return (0, authorization_code_js_1.default)(clientOptions, true);
        }
        case index_js_1.GrantType.CLIENT_CREDENTIALS: {
            var clientOptions = options;
            return (0, client_credentials_js_1.default)(clientOptions);
        }
        default: {
            throw new Error('Unrecognized grant type provided');
        }
    }
};
exports.createKindeServerClient = createKindeServerClient;
