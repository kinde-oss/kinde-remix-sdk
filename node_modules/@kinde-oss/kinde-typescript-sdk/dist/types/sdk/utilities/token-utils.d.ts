import type { TokenCollection, UserType, TokenType } from './types.js';
import { type SessionManager } from '../session-managers/index.js';
/**
 * Saves the provided token and its extracted payload to the current session.
 * @param {SessionManager} sessionManager
 * @param {string} token
 * @param {TokenType} type
 */
export declare const commitTokenToMemory: (sessionManager: SessionManager, token: string, type: TokenType) => Promise<void>;
/**
 * Saves the access, refresh and id tokens provided in the `TokenCollection`
 * object to the current session.
 * @param {SessionManager} sessionManager
 * @param tokens
 */
export declare const commitTokensToMemory: (sessionManager: SessionManager, tokens: TokenCollection) => Promise<void>;
/**
 * Extracts the refresh token from current session returns null if the
 * token is not found.
 * @param {SessionManager} sessionManager
 * @returns {string | null}
 */
export declare const getRefreshToken: (sessionManager: SessionManager) => Promise<string | null>;
/**
 * Extracts the access token from current session returns null if the
 * token is not found.
 * @param {SessionManager} sessionManager
 * @returns {string | null}
 */
export declare const getAccessToken: (sessionManager: SessionManager) => Promise<string | null>;
/**
 * Extracts the user information from the current session returns null if
 * the token is not found.
 * @param {SessionManager} sessionManager
 * @returns {string | null}
 */
export declare const getUserFromMemory: (sessionManager: SessionManager) => Promise<UserType | null>;
/**
 * Saves the provided user details as `UserType` to the current session.
 * @param {SessionManager} sessionManager
 * @param {UserType} user
 */
export declare const commitUserToMemory: (sessionManager: SessionManager, user: UserType) => Promise<void>;
/**
 * Checks if the provided JWT token is valid (expired or not).
 * @param {string | null} token
 * @returns {boolean} is expired or not
 */
export declare const isTokenExpired: (token: string | null) => boolean;
