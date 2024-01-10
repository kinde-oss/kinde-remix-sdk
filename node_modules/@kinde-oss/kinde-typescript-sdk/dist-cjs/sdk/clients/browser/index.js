"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKindeBrowserClient = void 0;
var authcode_with_pkce_js_1 = __importDefault(require("./authcode-with-pkce.js"));
var environment_js_1 = require("../../environment.js");
var createKindeBrowserClient = function (options) {
    if (!(0, environment_js_1.isBrowserEnvironment)()) {
        throw new Error('this method must be invoked in a browser environment');
    }
    return (0, authcode_with_pkce_js_1.default)(options);
};
exports.createKindeBrowserClient = createKindeBrowserClient;
