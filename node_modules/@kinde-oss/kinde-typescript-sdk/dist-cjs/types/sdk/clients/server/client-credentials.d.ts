import { type SessionManager } from '../../session-managers/index.js';
import type { CCClientOptions } from '../types.js';
declare const createCCClient: (options: CCClientOptions) => {
    isAuthenticated: (sessionManager: SessionManager) => Promise<boolean>;
    getToken: (sessionManager: SessionManager) => Promise<string>;
    logout: (sessionManager: SessionManager) => Promise<URL>;
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
    getClaimValue: (sessionManager: SessionManager, claim: string, type?: import("../../index.js").ClaimTokenType) => Promise<unknown>;
    getStringFlag: (sessionManager: SessionManager, code: string, defaultValue?: string | undefined) => Promise<string>;
    getClaim: (sessionManager: SessionManager, claim: string, type?: import("../../index.js").ClaimTokenType) => Promise<{
        name: string;
        value: unknown;
    }>;
    getFlag: (sessionManager: SessionManager, code: string, defaultValue?: string | number | boolean | undefined, type?: keyof import("../../index.js").FlagType | undefined) => Promise<import("../../index.js").GetFlagType>;
};
export default createCCClient;
