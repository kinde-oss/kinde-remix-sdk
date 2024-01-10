'use strict';

var kindeTypescriptSdk = require('@kinde-oss/kinde-typescript-sdk');
var node = require('@remix-run/node');
var jwtDecode = require('jwt-decode');

const config = {
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  issuerUrl: process.env.KINDE_ISSUER_URL,
  siteUrl: process.env.KINDE_SITE_URL,
  postLogoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
  postLoginRedirectUrl: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
  audience: process.env.KINDE_AUDIENCE,
};

const kindeClient = kindeTypescriptSdk.createKindeServerClient(kindeTypescriptSdk.GrantType.AUTHORIZATION_CODE, {
  authDomain: config.issuerUrl,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectURL: config.siteUrl + "/kinde-auth/callback",
  logoutRedirectURL: config.postLogoutRedirectUrl,
});

const sessionStorage = node.createCookieSessionStorage({
  cookie: {
    name: "kinde_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

/**
 *
 * @param {Request} request
 * @param {*} route
 * @returns
 */
const handleAuth = async (request, route) => {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  const sessionManager = {
    async getSessionItem(key) {
      return session.get(key);
    },
    async setSessionItem(key, value) {
      return session.set(key, value);
    },
    async removeSessionItem(key) {
      return session.unset(key);
    },
    async destroySession() {
      return sessionStorage.destroySession(session);
    },
  };

  const login = async () => {
    const authUrl = await kindeClient.login(sessionManager);
    return node.redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
      },
    });
  };

  const register = async () => {
    const authUrl = await kindeClient.register(sessionManager);
    return node.redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
      },
    });
  };

  const callback = async () => {
    await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url));
    return node.redirect("/", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
      },
    });
  };

  const logout = async () => {
    const authUrl = await kindeClient.logout(sessionManager);

    return node.redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  };

  switch (route) {
    case "login":
      return login();
    case "register":
      return register();
    case "callback":
      return callback();
    case "logout":
      return logout();
  }
};

const flagDataTypeMap = {
  s: "string",
  i: "integer",
  b: "boolean",
};

const getKindeSession = async (request) => {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  const user = session.get("user") || null;

  const idTokenRaw = session.get("id_token") || null;
  const idToken = jwtDecode.jwtDecode(idTokenRaw);

  const accessTokenRaw = session.get("access_token") || null;
  const accessToken = jwtDecode.jwtDecode(accessTokenRaw);

  const getClaim = (claim, token = "accessToken") => {
    if (token === "accessToken") {
      return accessToken[claim];
    } else if (token === "idToken") {
      return idToken[claim];
    } else {
      return null;
    }
  };

  const permissions = getClaim("permissions");
  const userOrganizations = getClaim("org_codes", "idToken");
  const organization = getClaim("org_code");

  const getPermission = (permission) => {
    if (permissions.includes(permission)) {
      return {
        isGranted: true,
        orgCode: organization,
      };
    }
    return null;
  };

  const getFlag = (code, defaultValue, type) => {
    const flags = getClaim("feature_flags");
    const flag = flags && flags[code] ? flags[code] : {};

    if (flag == {} && defaultValue == undefined) {
      throw Error(
        `Flag ${code} was not found, and no default value has been provided`
      );
    }

    if (type && flag.t && type !== flag.t) {
      throw Error(
        `Flag ${code} is of type ${flagDataTypeMap[flag.t]} - requested type ${
          flagDataTypeMap[type]
        }`
      );
    }

    return {
      code,
      type: flagDataTypeMap[flag.t || type],
      value: flag.v == null ? defaultValue : flag.v,
      is_default: flag.v == null,
      defaultValue,
    };
  };

  const getBooleanFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "b");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  const getStringFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "b");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  const getIntegerFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "i");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    idToken,
    accessToken,
    idTokenRaw,
    accessTokenRaw,
    permissions,
    userOrganizations,
    organization,
    getPermission,
    getFlag,
    getStringFlag,
    getBooleanFlag,
    getIntegerFlag,
  };
};

const isTokenValid = (token) => {
  const accessToken = (token && token.access_token) || token;
  if (!accessToken) return false;

  const accessTokenHeader = jwtDecode.jwtDecode(accessToken, { header: true });
  const accessTokenPayload = jwtDecode.jwtDecode(accessToken);
  let isAudienceValid = true;
  if (config.audience)
    isAudienceValid =
      accessTokenPayload.aud &&
      accessTokenPayload.aud.includes(config.audience);

  if (
    accessTokenPayload.iss == config.issuerURL &&
    accessTokenHeader.alg == "RS256" &&
    accessTokenPayload.exp > Math.floor(Date.now() / 1000) &&
    isAudienceValid
  ) {
    return true;
  } else {
    return false;
  }
};

const createKindeApiClient = async (req) => {
  let apiToken = null;
  const cookie = req.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  const sessionManager = {
    async getSessionItem(key) {
      return session.get(key);
    },
    async setSessionItem(key, value) {
      return session.set(key, value);
    },
    async removeSessionItem(key) {
      return session.unset(key);
    },
    async destroySession() {
      return sessionStorage.destroySession(session);
    },
  };

  const tokenFromCookie = await sessionManager.getSessionItem(
    "kinde_api_access_token"
  );

  console.log("token from cookie", tokenFromCookie);

  if (isTokenValid(tokenFromCookie)) {
    apiToken = tokenFromCookie;
  } else {
    const response = await fetch(`${config.issuerUrl}/oauth2/token`, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: config.clientId || "",
        client_secret: config.clientSecret || "",
        audience: config.audience || "",
      }),
    });
    apiToken = (await response.json()).access_token;
    console.log("apiToken", apiToken);
    try {
      await sessionManager.setSessionItem("kinde_api_access_token", apiToken);
    } catch (error) {
      console.error(error);
    }
  }

  const cfg = new kindeTypescriptSdk.Configuration({
    basePath: config.issuerUrl,
    accessToken: apiToken,
    headers: { Accept: "application/json" },
  });

  const usersApi = new kindeTypescriptSdk.UsersApi(cfg);
  const oauthApi = new kindeTypescriptSdk.OAuthApi(cfg);
  const subscribersApi = new kindeTypescriptSdk.SubscribersApi(cfg);
  const organizationsApi = new kindeTypescriptSdk.OrganizationsApi(cfg);
  const connectedAppsApi = new kindeTypescriptSdk.ConnectedAppsApi(cfg);
  const featureFlagsApi = new kindeTypescriptSdk.FeatureFlagsApi(cfg);
  const environmentsApi = new kindeTypescriptSdk.EnvironmentsApi(cfg);
  const permissionsApi = new kindeTypescriptSdk.PermissionsApi(cfg);
  const rolesApi = new kindeTypescriptSdk.RolesApi(cfg);
  const businessApi = new kindeTypescriptSdk.BusinessApi(cfg);
  const industriesApi = new kindeTypescriptSdk.IndustriesApi(cfg);
  const timezonesApi = new kindeTypescriptSdk.TimezonesApi(cfg);
  const applicationsApi = new kindeTypescriptSdk.ApplicationsApi(cfg);
  const callbacksApi = new kindeTypescriptSdk.CallbacksApi(cfg);
  const apisApi = new kindeTypescriptSdk.APIsApi(cfg);

  return {
    usersApi,
    oauthApi,
    subscribersApi,
    organizationsApi,
    connectedAppsApi,
    featureFlagsApi,
    environmentsApi,
    permissionsApi,
    rolesApi,
    businessApi,
    industriesApi,
    timezonesApi,
    applicationsApi,
    callbacksApi,
    apisApi,
  };
};

exports.createKindeApiClient = createKindeApiClient;
exports.getKindeSession = getKindeSession;
exports.handleAuth = handleAuth;
