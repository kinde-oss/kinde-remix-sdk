import { type SessionManager } from '../session-managers/index.js';
import type { ClientCredentialsOptions } from './types.js';
/**
 * Class provides implementation for the client credentials OAuth2.0 flow.
 * @class ClientCredentials
 */
export declare class ClientCredentials {
    private readonly config;
    readonly logoutEndpoint: string;
    readonly tokenEndpoint: string;
    constructor(config: ClientCredentialsOptions);
    /**
     * Method retrieves the access token, if the token present in the current session
     * is unexpired it will be returned otherwise, a new one will be be obtained by
     * performing a network call.
     * @param {SessionManager} sessionManager
     * @returns {Promise<string>}
     */
    getToken(sessionManager: SessionManager): Promise<string>;
    /**
     * Method implements logic for requesting access token using token endpoint.
     * @param {SessionManager} sessionManager
     * @returns {Promise<OAuth2CCTokenResponse>}
     */
    private fetchAccessTokenFor;
    /**
     * Method returns a boolean indicating if the access token in session is expired
     * or not, in the event the token is expired it makes use of the `getToken` method
     * above to first refresh it, in the event refresh fails false is returned.
     * @param sessionManager
     * @returns {Promise<boolean>}
     */
    isAuthenticated(sessionManager: SessionManager): Promise<boolean>;
    /**
     * Method provides the query params required for generating the token URL for
     * obtaining the required access token.
     * @returns {URLSearchParams}
     */
    private generateTokenURLParams;
}
