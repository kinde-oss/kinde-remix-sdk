import createAuthCodeClient from './authorization-code.js';
import { isNodeEnvironment } from '../../environment.js';
import createCCClient from './client-credentials.js';
import { GrantType } from '../../oauth2-flows/index.js';
export var createKindeServerClient = function (grantType, options) {
    if (!isNodeEnvironment()) {
        throw new Error('this method must be invoked in a node.js environment');
    }
    switch (grantType) {
        case GrantType.AUTHORIZATION_CODE: {
            var clientOptions = options;
            return createAuthCodeClient(clientOptions, false);
        }
        case GrantType.PKCE: {
            var clientOptions = options;
            return createAuthCodeClient(clientOptions, true);
        }
        case GrantType.CLIENT_CREDENTIALS: {
            var clientOptions = options;
            return createCCClient(clientOptions);
        }
        default: {
            throw new Error('Unrecognized grant type provided');
        }
    }
};
