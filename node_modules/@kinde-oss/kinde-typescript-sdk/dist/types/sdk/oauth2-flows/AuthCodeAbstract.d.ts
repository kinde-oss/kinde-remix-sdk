import { type SessionManager } from '../session-managers/index.js';
import type { UserType } from '../utilities/index.js';
import type { OAuth2CodeExchangeResponse, AuthorizationCodeOptions, AuthURLOptions } from './types.js';
/**
 * Abstract class provides contract (methods) for classes implementing OAuth2.0 flows
 * for authorization_code grant type, this includes the basic Authorization Code flow
 * and the PKCE extention code flow.
 * @class AuthCodeAbstract
 * @param {AuthorizationCodeOptions} config
 */
export declare abstract class AuthCodeAbstract {
    protected readonly config: AuthorizationCodeOptions;
    static DEFAULT_TOKEN_SCOPES: string;
    readonly authorizationEndpoint: string;
    readonly userProfileEndpoint: string;
    readonly logoutEndpoint: string;
    readonly tokenEndpoint: string;
    protected state?: string;
    constructor(config: AuthorizationCodeOptions);
    /**
     * Abstract method will return the initial set of query parameters required for
     * creating the authorization URL in child class for the kinde client's register
     * and login methods.
     * @returns {URLSearchParams} Required query parameters
     */
    protected abstract getBaseAuthURLParams(): URLSearchParams;
    /**
     * Abstract method mandates implementation of logic required for creating auth URL
     * in kinde client's login and register methods, as well saving state parameter to
     * the session using the provided sessionManager.
     * @param {SessionManager} sessionManager
     * @param {AuthURLOptions} options
     * @returns {Promise<URL>} required authorization URL
     */
    abstract createAuthorizationURL(sessionManager: SessionManager, options: AuthURLOptions): Promise<URL>;
    /**
     * Abstract method will implement logic required for exchanging received auth code
     * post user-authentication with authorization server to receive access, refresh
     * and id tokens from this exchange.
     * @param {SessionManager} sessionManager
     * @param {URL} callbackURL
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    protected abstract exchangeAuthCodeForTokens(sessionManager: SessionManager, callbackURL: URL): Promise<OAuth2CodeExchangeResponse>;
    /**
     * Abstract method will implement logic in child classes for refreshing access token
     * using refresh token available in current session.
     * @param {SessionManager} sessionManager
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    abstract refreshTokens(sessionManager: SessionManager): Promise<OAuth2CodeExchangeResponse>;
    /**
     * Method handles redirection logic to after authorization server redirects back
     * to application, this method makes use of the @see {exchangeAuthCodeForTokens}
     * method above and saves the received tokens to the current session.
     * @param {SessionManager} sessionManager
     * @param {URL} callbackURL
     * @returns {Promise<void>}
     */
    handleRedirectFromAuthDomain(sessionManager: SessionManager, callbackURL: URL): Promise<void>;
    /**
     * Method retrieves the access token, if the token present in the current session
     * is unexpired it will be returned otherwise, a new one will be obtained using
     * the refresh token if the refresh token is not available either an error will
     * be thrown.
     * @param {SessionManager} sessionManager
     * @returns {Promise<string>}
     */
    getToken(sessionManager: SessionManager): Promise<string>;
    /**
     * Method returns a boolean indicating if the access token in session is expired
     * or not, in the event the token is expired it makes use of the `getToken` method
     * above to first refresh it, in the event refresh fails false is returned.
     * @param sessionManager
     * @returns {Promise<boolean>}
     */
    isAuthenticated(sessionManager: SessionManager): Promise<boolean>;
    /**
     * Method makes use of the user profile V2 endpoint to fetch the authenticated
     * user's profile information.
     * @param {SessionManager} sessionManager
     * @returns {Promise<UserType>}
     */
    getUserProfile(sessionManager: SessionManager): Promise<UserType>;
    /**
     * A helper method employed by @see {exchangeAuthCodeForTokens} method in child
     * classes to extract code and state parameters from the received callback URL
     * an exception is raised in the event the callback URL contains an error query
     * parameter.
     * @param {URL} callbackURL
     * @returns {[string, string]} c
     */
    protected getCallbackURLParams(callbackURL: URL): [string, string];
    /**
     * Method implements logic for fetching tokens from the authorization server using
     * the provided body, the `useCookies` is used exclusively on the browser.
     * @param {SessionManager} sessionManager
     * @param {URLSearchParams} body
     * @param {boolean} useCookies
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    protected fetchTokensFor(sessionManager: SessionManager, body: URLSearchParams, useCookies?: boolean): Promise<OAuth2CodeExchangeResponse>;
    /**
     * Helper method employed by @see {createAuthorizationURL} method above for
     * generating the aforementioned authorization URL.
     * @param {AuthURLOptions}
     * @returns {URLSearchParams}
     */
    protected generateAuthURLParams(options?: AuthURLOptions): URLSearchParams;
}
