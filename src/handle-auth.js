import {
  GrantType,
  createKindeServerClient,
} from "@kinde-oss/kinde-typescript-sdk";
import { redirect } from "@remix-run/node";
import { config } from "./config";
import { createSessionManager } from "./session/session";

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain:
      config.issuerUrl || "Set your issuer URL in your environment variables.",
    clientId:
      config.clientId || "Set your client ID in your environment variables.",
    clientSecret: config.clientSecret,
    redirectURL: config.siteUrl + "/kinde-auth/callback",
    logoutRedirectURL:
      config.postLogoutRedirectUrl ||
      "Set your logout redirect URL in your environment variables.",
    frameworkVersion: "1.0",
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
  const { session, sessionManager, sessionStorage } =
    await createSessionManager(request);

  const login = async () => {
    const { searchParams } = new URL(request.url);
    const authUrl = await kindeClient.login(sessionManager, {
      authUrlParams: Object.fromEntries(searchParams),
    });

    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      session.set("post_login_redirect_url", postLoginRedirecturl);
    }

    return redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: config.cookieMaxAge
            ? parseInt(config.cookieMaxAge)
            : undefined,
        }),
      },
    });
  };

  const register = async () => {
    const { searchParams } = new URL(request.url);
    const authUrl = await kindeClient.register(sessionManager, {
      authUrlParams: Object.fromEntries(searchParams),
    });
    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      session.set("post_login_redirect_url", postLoginRedirecturl);
    }

    return redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: config.cookieMaxAge
            ? parseInt(config.cookieMaxAge)
            : undefined,
        }),
      },
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

    return redirect(postLoginRedirectURL.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: config.cookieMaxAge
            ? parseInt(config.cookieMaxAge)
            : undefined,
        }),
      },
    });
  };

  const logout = async () => {
    const authUrl = await kindeClient.logout(sessionManager);

    return redirect(authUrl.toString(), {
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
