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
    return redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
      },
    });
  };

  const register = async () => {
    const authUrl = await kindeClient.register(sessionManager);
    return redirect(authUrl.toString(), {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
      },
    });
  };

  const callback = async () => {
    await kindeClient.handleRedirectToApp(sessionManager, new URL(request.url));
    return redirect("/", {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
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
