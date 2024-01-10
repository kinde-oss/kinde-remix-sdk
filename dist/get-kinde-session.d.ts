export function getKindeSession(request: any): Promise<{
    user: any;
    idToken: import("jwt-decode").JwtPayload;
    accessToken: import("jwt-decode").JwtPayload;
    idTokenRaw: any;
    accessTokenRaw: any;
    permissions: any;
    userOrganizations: any;
    organization: any;
    getPermission: (permission: any) => {
        isGranted: boolean;
        orgCode: any;
    };
    getFlag: (code: any, defaultValue: any, type: any) => {
        code: any;
        type: any;
        value: any;
        is_default: boolean;
        defaultValue: any;
    };
    getStringFlag: (code: any, defaultValue: any) => any;
    getBooleanFlag: (code: any, defaultValue: any) => any;
    getIntegerFlag: (code: any, defaultValue: any) => any;
}>;
//# sourceMappingURL=get-kinde-session.d.ts.map