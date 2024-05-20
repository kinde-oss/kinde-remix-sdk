import {
  GrantType,
  createKindeServerClient,
  validateClientSecret,
} from "@kinde-oss/kinde-typescript-sdk";
import { json, redirect } from "@remix-run/node";
import { config } from "./config";
import { createSessionManager } from "./session/session";
import { generateCookieHeader } from "./utils/cookies";
import { version } from "./utils/version";

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain:
      config.issuerUrl || "Set your issuer URL in your environment variables.",
    clientId:
      config.clientId || "Set your client ID in your environment variables.",
    clientSecret: config.clientSecret,
    redirectURL: config.siteUrl + "/kinde-auth/callback",
    audience: config.audience,
    logoutRedirectURL:
      config.postLogoutRedirectUrl ||
      "Set your logout redirect URL in your environment variables.",
    frameworkVersion: version,
    framework: "Remix",
  }
);

/**
 *
 * @param {Request} request
 * @param {*} route
 * @returns
 */
export const handleAuth = async (request, route) => {
  const { sessionManager, cookies } = await createSessionManager(request);

  const login = async () => {
    const { searchParams } = new URL(request.url);
    const authUrl = await kindeClient.login(sessionManager, {
      authUrlParams: Object.fromEntries(searchParams),
    });

    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      cookies.set("post_login_redirect_url", postLoginRedirecturl);
    }

    const headers = generateCookieHeader(request, cookies);

    return redirect(authUrl.toString(), {
      headers,
    });
  };

  const register = async () => {
    const { searchParams } = new URL(request.url);
    const authUrl = await kindeClient.register(sessionManager, {
      authUrlParams: Object.fromEntries(searchParams),
    });
    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      cookies.set("post_login_redirect_url", postLoginRedirecturl);
    }
    const headers = generateCookieHeader(request, cookies);
    return redirect(authUrl.toString(), {
      headers,
    });
  };

  const health = async () => {
    return json({
      siteUrl: config.siteUrl,
      issuerURL: config.issuerURL,
      clientID: config.clientId,
      clientSecret: validateClientSecret(config.clientSecret || "")
        ? "Set correctly"
        : "Not set correctly",
      postLogoutRedirectUrl: config.postLogoutRedirectUrl,
      postLoginRedirectUrl: config.postLoginRedirectUrl,
      audience: config.audience,
      cookieMaxAge: config.cookieMaxAge,
    });
  };

  const callback = async () => {
    await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url));

    const postLoginRedirectURLFromMemory = await sessionManager.getSessionItem(
      "post_login_redirect_url"
    );

    if (postLoginRedirectURLFromMemory) {
      sessionManager.removeSessionItem("post_login_redirect_url");
    }

    const postLoginRedirectURL = postLoginRedirectURLFromMemory
      ? postLoginRedirectURLFromMemory
      : config.postLoginRedirectUrl ||
        "Set your post login redirect URL in your environment variables.";
    const headers = generateCookieHeader(request, cookies);
    return redirect(postLoginRedirectURL.toString(), {
      headers,
    });
  };

  const logout = async () => {
    const authUrl = await kindeClient.logout(sessionManager);
    const headers = generateCookieHeader(request, cookies);
    return redirect(authUrl.toString(), {
      headers,
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
    case "health":
      return health();
  }
};
