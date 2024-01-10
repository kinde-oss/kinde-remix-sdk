import createAuthCodeWithPKCEClient from './authcode-with-pkce.js';
import { isBrowserEnvironment } from '../../environment.js';
export var createKindeBrowserClient = function (options) {
    if (!isBrowserEnvironment()) {
        throw new Error('this method must be invoked in a browser environment');
    }
    return createAuthCodeWithPKCEClient(options);
};
