import { createCookieSessionStorage } from "@remix-run/node";

/**
 *
 * @param {Request} request
 * @returns {Promise<{session: import("@remix-run/node").Session, sessionManager: import("@kinde-oss/kinde-typescript-sdk").SessionManager, cookie: string | null, sessionStorage: import("@remix-run/node").SessionStorage<import("@remix-run/node").SessionData, import("@remix-run/node").SessionData>}>}
 */
export const createSessionManager = async (request) => {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not set in your env");
  }

  const sessionStorage = createCookieSessionStorage({
    cookie: {
      name: "kinde_session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  /** @type {import("@kinde-oss/kinde-typescript-sdk").SessionManager} */
  const sessionManager = {
    /**
     * Get a session item.
     * @param {string} key - The key of the session item.
     * @returns {Promise<any>} The session item.
     */
    async getSessionItem(key) {
      return session.get(key);
    },

    /**
     * Set a session item.
     * @param {string} key - The key of the session item.
     * @param {any} value - The value to set.
     * @returns {Promise<void>}
     */
    async setSessionItem(key, value) {
      return session.set(key, value);
    },

    /**
     * Remove a session item.
     * @param {string} key - The key of the session item.
     * @returns {Promise<void>}
     */
    async removeSessionItem(key) {
      return session.unset(key);
    },

    /**
     * Destroy the session.
     * @returns {Promise<void>}
     */
    async destroySession() {
      [
        "id_token_payload",
        "id_token",
        "access_token_payload",
        "access_token",
        "user",
        "refresh_token",
        "post_login_redirect_url",
      ].forEach((key) => session.unset(key));

      await sessionStorage.destroySession(session);
      return Promise.resolve();
    },
  };

  return {
    session,
    sessionManager,
    cookie,
    sessionStorage,
  };
};
