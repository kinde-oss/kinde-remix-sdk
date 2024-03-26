import { type SessionManager } from '../session-managers/index.js';
import { AuthCodeAbstract } from './AuthCodeAbstract.js';
import type { OAuth2CodeExchangeResponse, AuthorizationCodeOptions, AuthURLOptions } from './types.js';
/**
 * Class provides implementation for the authorization code OAuth2.0 flow.
 * @class AuthorizationCode
 * @param {AuthorizationCodeOptions} config
 * @param {string} clientSecret
 */
export declare class AuthorizationCode extends AuthCodeAbstract {
    protected readonly config: AuthorizationCodeOptions;
    private readonly clientSecret;
    static STATE_KEY: string;
    constructor(config: AuthorizationCodeOptions, clientSecret: string);
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
     * Method provides implementation for `getBaseAuthURLParams` method mandated by
     * `AuthCodeAbstract` parent class, see corresponding comment in parent class
     * for further explanation.
     * @returns {URLSearchParams} Required query parameters
     */
    protected getBaseAuthURLParams(): URLSearchParams;
}
