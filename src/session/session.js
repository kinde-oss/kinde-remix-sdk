import Cookies from "universal-cookie";

/**
 *
 * @param {Request} request
 * @returns {Promise<{cookies: Cookies, sessionManager: import("@kinde-oss/kinde-typescript-sdk").SessionManager}>}
 */
export const createSessionManager = async (request) => {
  const cookies = new Cookies(request.headers.get("Cookie"), { path: "/" });

  /** @type {import("@kinde-oss/kinde-typescript-sdk").SessionManager} */
  const sessionManager = {
    /**
     * Get a session item.
     * @param {string} key - The key of the session item.
     * @returns {Promise<any>} The session item.
     */
    async getSessionItem(key) {
      return cookies.get(key);
    },

    /**
     * Set a session item.
     * @param {string} key - The key of the session item.
     * @param {any} value - The value to set.
     * @returns {Promise<void>}
     */
    async setSessionItem(key, value) {
      cookies.set(key, value, { path: "/" });
    },

    /**
     * Remove a session item.
     * @param {string} key - The key of the session item.
     * @returns {Promise<void>}
     */
    async removeSessionItem(key) {
      cookies.remove(key, { path: "/" });
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
      ].forEach((key) => cookies.remove(key, { path: "/" }));

      return Promise.resolve();
    },
  };

  return {
    cookies,
    sessionManager,
  };
};
