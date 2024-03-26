import { AuthCodeAbstract } from './AuthCodeAbstract.js';
import { type SessionManager } from '../session-managers/index.js';
import type { OAuth2CodeExchangeResponse, AuthURLOptions, AuthorizationCodeOptions } from './types.js';
/**
 * Class provides implementation for the authorization code with PKCE extension
 * OAuth2.0 flow, please note the use of the `isBrowserEnvironment()` method
 * in certain methods of this class, this is because this class is intended to
 * be used on both the browser and server.
 * @class AuthCodeWithPKCE
 * @param {AuthorizationCodeOptions} config
 */
export declare class AuthCodeWithPKCE extends AuthCodeAbstract {
    protected readonly config: AuthorizationCodeOptions;
    static STATE_KEY: string;
    private codeChallenge?;
    private codeVerifier?;
    constructor(config: AuthorizationCodeOptions);
    /**
     * Method provides implementation for `createAuthorizationURL` method mandated by
     * `AuthCodeAbstract` parent class, see corresponding comment in parent class for
     * further explanation.
     * @param {SessionManager} sessionManager
     * @param {AuthURLOptions} options
     * @returns {Promise<URL>} required authorization URL
     */
    createAuthorizationURL(sessionManager: SessionManager, options?: AuthURLOptions): Promise<URL>;
    /**
     * Method provides implementation for `refreshTokens` method mandated by
     * `AuthCodeAbstract` parent class, see corresponding comment in parent class for
     * further explanation.
     * @param {SessionManager} sessionManager
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    refreshTokens(sessionManager: SessionManager): Promise<OAuth2CodeExchangeResponse>;
    /**
     * Method provides implementation for `exchangeAuthCodeForTokens` method mandated
     * by `AuthCodeAbstract` parent class, see corresponding comment in parent class
     * for further explanation.
     * @param {SessionManager} sessionManager
     * @param {URL} callbackURL
     * @returns {Promise<OAuth2CodeExchangeResponse>}
     */
    protected exchangeAuthCodeForTokens(sessionManager: SessionManager, callbackURL: URL): Promise<OAuth2CodeExchangeResponse>;
    /**
     * Method generates the key against which the code verifier is stored in session
     * storage.
     * @param {string} state
     * @returns {string} - required code verifer key
     */
    private getCodeVerifierKey;
    /**
     * Method provides implementation for `getBaseAuthURLParams` method mandated by
     * `AuthCodeAbstract` parent class, see corresponding comment in parent class
     * for further explanation.
     * @returns {URLSearchParams} Required query parameters
     */
    protected getBaseAuthURLParams(): URLSearchParams;
}
