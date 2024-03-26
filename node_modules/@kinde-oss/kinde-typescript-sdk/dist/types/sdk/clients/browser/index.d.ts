import type { BrowserPKCEClientOptions } from '../types.js';
export declare const createKindeBrowserClient: (options: BrowserPKCEClientOptions) => {
    getUserOrganizations: () => Promise<{
        orgCodes: string[];
    }>;
    handleRedirectToApp: (callbackURL: URL) => Promise<void>;
    isAuthenticated: () => Promise<boolean>;
    getOrganization: () => Promise<{
        orgCode: string | null;
    }>;
    getBooleanFlag: (code: string, defaultValue?: boolean | undefined) => Promise<boolean>;
    getIntegerFlag: (code: string, defaultValue?: number | undefined) => Promise<number>;
    getUserProfile: () => Promise<import("../../index.js").UserType>;
    getPermissions: () => Promise<{
        permissions: string[];
        orgCode: string | null;
    }>;
    getPermission: (name: string) => Promise<{
        orgCode: string | null;
        isGranted: boolean;
    }>;
    getClaimValue: (claim: string, type?: import("../../index.js").ClaimTokenType) => Promise<unknown>;
    getStringFlag: (code: string, defaultValue?: string | undefined) => Promise<string>;
    createOrg: (options?: import("../types.js").RegisterURLOptions | undefined) => Promise<URL>;
    getClaim: (claim: string, type?: import("../../index.js").ClaimTokenType) => Promise<{
        name: string;
        value: unknown;
    }>;
    getToken: () => Promise<string>;
    refreshTokens: () => Promise<import("../../index.js").OAuth2CodeExchangeResponse>;
    register: (options?: import("../types.js").RegisterURLOptions | undefined) => Promise<URL>;
    getUser: () => Promise<import("../../index.js").UserType>;
    getFlag: (code: string, defaultValue?: string | number | boolean | undefined, type?: keyof import("../../index.js").FlagType | undefined) => Promise<import("../../index.js").GetFlagType>;
    logout: () => Promise<URL>;
    login: (options?: import("../types.js").RegisterURLOptions | undefined) => Promise<URL>;
};
