import { splitString } from "@kinde/js-utils";
import Cookies, { Cookie } from "universal-cookie";
import {
  KINDE_COOKIES,
  MAX_COOKIE_LENGTH,
  getCookieRemovalOptions,
  getKindeCookieBaseName,
  getStandardCookieOptions,
} from "../utils/kinde-cookie-keys";

const buildChunkName = (key: string, index: number) =>
  `${key}${index === 0 ? "" : index}`;

const removeCookieChunks = (cookies: Cookie, baseKey: string) => {
  Object.keys(cookies.getAll())
    .filter(
      (cookieName) => getKindeCookieBaseName(cookieName, baseKey) === baseKey,
    )
    .forEach((cookieName) =>
      cookies.remove(cookieName, getCookieRemovalOptions()),
    );
};

const readChunkSegments = (cookies: Cookie, baseKey: string) => {
  const segments: unknown[] = [];
  let index = 0;
  while (true) {
    const chunkName = buildChunkName(baseKey, index);
    const value = cookies.get(chunkName);
    if (value === undefined) {
      break;
    }
    segments.push(value);
    index += 1;
  }
  return segments;
};

/**
 *
 * @param {Request} request
 * @returns {Promise<{cookies: Cookie, sessionManager: import("@kinde-oss/kinde-typescript-sdk").SessionManager}>}
 */
export const createSessionManager = async (
  request: Request
): Promise<{
  cookies: Cookie;
  sessionManager: import("@kinde-oss/kinde-typescript-sdk").SessionManager;
}> => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = cookieHeader
    ? new Cookies(cookieHeader, { path: "/" })
    : new Cookies(null, { path: "/" });

  /** @type {import("@kinde-oss/kinde-typescript-sdk").SessionManager} */
  const sessionManager = {
    /**
     * Get a session item.
     * @param {string} key - The key of the session item.
     * @returns {Promise<any>} The session item.
     */
    async getSessionItem(key) {
      const segments = readChunkSegments(cookies, key);
      if (segments.length === 0) return undefined;
      if (segments.length === 1) return segments[0];

      const serializedValue = (segments as string[]).join("");

      try {
        const parsed = JSON.parse(serializedValue);
        if (typeof parsed === "object") {
          return parsed;
        }
      } catch (error) {
        // no-op: value was a plain string
      }

      return serializedValue;
    },

    /**
     * Set a session item.
     * @param {string} key - The key of the session item.
     * @param {any} value - The value to set.
     * @returns {Promise<void>}
     */
    async setSessionItem(key, value) {
      removeCookieChunks(cookies, key);

      if (value === undefined) {
        return;
      }

      const serializedValue =
        typeof value === "string" ? value : JSON.stringify(value);

      if (
        typeof serializedValue === "string" &&
        serializedValue.length > MAX_COOKIE_LENGTH
      ) {
        const chunks = splitString(serializedValue, MAX_COOKIE_LENGTH);
        chunks.forEach((chunk, index) => {
          cookies.set(
            buildChunkName(key, index),
            chunk,
            getStandardCookieOptions(),
          );
        });
        return;
      }

      cookies.set(key, value, getStandardCookieOptions());
    },

    /**
     * Remove a session item.
     * @param {string} key - The key of the session item.
     * @returns {Promise<void>}
     */
    async removeSessionItem(key) {
      removeCookieChunks(cookies, key);
    },

    /**
     * Destroy the session.
     * @returns {Promise<void>}
     */
    async destroySession() {
      KINDE_COOKIES.forEach((key) => removeCookieChunks(cookies, key));

      return Promise.resolve();
    },
  };

  return {
    cookies,
    sessionManager,
  };
};
