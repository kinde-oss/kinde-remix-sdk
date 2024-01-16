import {
  GrantType,
  createKindeServerClient,
} from "@kinde-oss/kinde-typescript-sdk";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { config } from "./config";

const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: config.issuerUrl,
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectURL: config.siteUrl + "/kinde-auth/callback",
  logoutRedirectURL: config.postLogoutRedirectUrl,
});

export const sessionStorage = createCookieSessionStorage({
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
export const handleAuth = async (request, route) => {
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
    const { searchParams } = new URL(request.url);
    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      session.set("post_login_redirect_url", postLoginRedirecturl);
    }

    return redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: config.cookieMaxAge || undefined,
        }),
      },
    });
  };

  const register = async () => {
    const authUrl = await kindeClient.register(sessionManager);
    const { searchParams } = new URL(request.url);
    const postLoginRedirecturl = searchParams.get("returnTo");

    if (postLoginRedirecturl) {
      session.set("post_login_redirect_url", postLoginRedirecturl);
    }

    return redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: config.cookieMaxAge || undefined,
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
      : config.postLoginRedirectUrl;

    return redirect(postLoginRedirectURL, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: config.cookieMaxAge || undefined,
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
