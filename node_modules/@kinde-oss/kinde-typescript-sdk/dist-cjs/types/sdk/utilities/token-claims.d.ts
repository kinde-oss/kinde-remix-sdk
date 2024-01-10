import { type SessionManager } from '../session-managers/index.js';
import { type ClaimTokenType } from './types.js';
/**
 * Method extracts the provided claim from the provided token type in the
 * current session.
 * @param {SessionManager} sessionManager
 * @param {string} claim
 * @param {ClaimTokenType} type
 * @returns {unknown | null}
 */
export declare const getClaimValue: (sessionManager: SessionManager, claim: string, type?: ClaimTokenType) => Promise<unknown | null>;
/**
 * Method extracts the provided claim from the provided token type in the
 * current session, the returned object includes the provided claim.
 * @param {SessionManager} sessionManager
 * @param {string} claim
 * @param {ClaimTokenType} type
 * @returns {{ name: string, value: unknown | null }}
 */
export declare const getClaim: (sessionManager: SessionManager, claim: string, type?: ClaimTokenType) => Promise<{
    name: string;
    value: unknown | null;
}>;
/**
 * Method returns the organization code from the current session and returns
 * a boolean in the returned object indicating if the provided permission is
 * present in the session.
 * @param {SessionManager} sessionManager
 * @param {string} name
 * @returns {{ orgCode: string | null, isGranted: boolean }}
 */
export declare const getPermission: (sessionManager: SessionManager, name: string) => Promise<{
    orgCode: string | null;
    isGranted: boolean;
}>;
/**
 * Method extracts the organization code from the current session.
 * @param {SessionManager} sessionManager
 * @returns {{ orgCode: string | null }}
 */
export declare const getOrganization: (sessionManager: SessionManager) => Promise<{
    orgCode: string | null;
}>;
/**
 * Method extracts all the permission and the organization code in the access
 * token in the current session.
 * @param {SessionManager} sessionManager
 * @returns {{ permissions: string[], orgCode: string | null }}
 */
export declare const getPermissions: (sessionManager: SessionManager) => Promise<{
    permissions: string[];
    orgCode: string | null;
}>;
/**
 * Method extracts all organization codes from the id token in the current
 * session.
 * @param {SessionManager} sessionManager
 * @returns {{ orgCodes: string[] }}
 */
export declare const getUserOrganizations: (sessionManager: SessionManager) => Promise<{
    orgCodes: string[];
}>;
