import { type SessionManager } from '../../session-managers/index.js';
import type { UserType } from '../../utilities/index.js';
import * as utilities from '../../utilities/index.js';
import type { CreateOrgURLOptions, RegisterURLOptions, LoginURLOptions, ACClientOptions } from '../types.js';
import type { OAuth2CodeExchangeResponse } from '../../oauth2-flows/types.js';
declare const createAuthorizationCodeClient: (options: ACClientOptions, isPKCE: boolean) => {
    handleRedirectToApp: (sessionManager: SessionManager, callbackURL: URL) => Promise<void>;
    isAuthenticated: (sessionManager: SessionManager) => Promise<boolean>;
    getUserProfile: (sessionManager: SessionManager) => Promise<UserType>;
    createOrg: (sessionManager: SessionManager, options?: CreateOrgURLOptions) => Promise<URL>;
    getToken: (sessionManager: SessionManager) => Promise<string>;
    refreshTokens: (sessionManager: SessionManager) => Promise<OAuth2CodeExchangeResponse>;
    register: (sessionManager: SessionManager, options?: RegisterURLOptions) => Promise<URL>;
    getUser: (sessionManager: SessionManager) => Promise<UserType>;
    logout: (sessionManager: SessionManager) => Promise<URL>;
    login: (sessionManager: SessionManager, options?: LoginURLOptions) => Promise<URL>;
    getUserOrganizations: (sessionManager: SessionManager) => Promise<{
        orgCodes: string[];
    }>;
    getOrganization: (sessionManager: SessionManager) => Promise<{
        orgCode: string | null;
    }>;
    getBooleanFlag: (sessionManager: SessionManager, code: string, defaultValue?: boolean | undefined) => Promise<boolean>;
    getIntegerFlag: (sessionManager: SessionManager, code: string, defaultValue?: number | undefined) => Promise<number>;
    getPermissions: (sessionManager: SessionManager) => Promise<{
        permissions: string[];
        orgCode: string | null;
    }>;
    getPermission: (sessionManager: SessionManager, name: string) => Promise<{
        orgCode: string | null;
        isGranted: boolean;
    }>;
    getClaimValue: (sessionManager: SessionManager, claim: string, type?: utilities.ClaimTokenType) => Promise<unknown>;
    getStringFlag: (sessionManager: SessionManager, code: string, defaultValue?: string | undefined) => Promise<string>;
    getClaim: (sessionManager: SessionManager, claim: string, type?: utilities.ClaimTokenType) => Promise<{
        name: string;
        value: unknown;
    }>;
    getFlag: (sessionManager: SessionManager, code: string, defaultValue?: string | number | boolean | undefined, type?: keyof utilities.FlagType | undefined) => Promise<utilities.GetFlagType>;
};
export default createAuthorizationCodeClient;
