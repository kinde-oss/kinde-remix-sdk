import type { UserType, ClaimTokenType, GetFlagType, FlagType } from '../../utilities/index.js';
import type { CreateOrgURLOptions, RegisterURLOptions, LoginURLOptions, BrowserPKCEClientOptions } from '../types.js';
import type { OAuth2CodeExchangeResponse } from '../../oauth2-flows/types.js';
declare const createAuthCodeWithPKCEClient: (options: BrowserPKCEClientOptions) => {
    getUserOrganizations: () => Promise<{
        orgCodes: string[];
    }>;
    handleRedirectToApp: (callbackURL: URL) => Promise<void>;
    isAuthenticated: () => Promise<boolean>;
    getOrganization: () => Promise<{
        orgCode: string | null;
    }>;
    getBooleanFlag: (code: string, defaultValue?: boolean) => Promise<boolean>;
    getIntegerFlag: (code: string, defaultValue?: number) => Promise<number>;
    getUserProfile: () => Promise<UserType>;
    getPermissions: () => Promise<{
        permissions: string[];
        orgCode: string | null;
    }>;
    getPermission: (name: string) => Promise<{
        orgCode: string | null;
        isGranted: boolean;
    }>;
    getClaimValue: (claim: string, type?: ClaimTokenType) => Promise<unknown | null>;
    getStringFlag: (code: string, defaultValue?: string) => Promise<string>;
    createOrg: (options?: CreateOrgURLOptions) => Promise<URL>;
    getClaim: (claim: string, type?: ClaimTokenType) => Promise<{
        name: string;
        value: unknown | null;
    }>;
    getToken: () => Promise<string>;
    refreshTokens: () => Promise<OAuth2CodeExchangeResponse>;
    register: (options?: RegisterURLOptions) => Promise<URL>;
    getUser: () => Promise<UserType>;
    getFlag: (code: string, defaultValue?: FlagType[keyof FlagType], type?: keyof FlagType) => Promise<GetFlagType>;
    logout: () => Promise<URL>;
    login: (options?: LoginURLOptions) => Promise<URL>;
};
export default createAuthCodeWithPKCEClient;
