import Cookies, { Cookie } from "universal-cookie";
import {
  KindeCookieOptions,
  getStandardCookieOptions,
  isKindeCookieName,
} from "./kinde-cookie-keys";

/**
 * Serializes a cookie into a Set-Cookie header string.
 * @param {string} name - The cookie name.
 * @param {object | string} value - The cookie value.
 * @param {KindeCookieOptions} options - Cookie options.
 * @returns {string} The serialized cookie string.
 */
function serializeCookie(
  name: string,
  value: string | object,
  options: KindeCookieOptions = {},
) {
  const cookieParts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(typeof value === "object" ? JSON.stringify(value) : value)}`,
  ];

  if (options.maxAge) {
    cookieParts.push(`Max-Age=${options.maxAge}`);
  }

  if (options.domain) {
    cookieParts.push(`Domain=${options.domain}`);
  }

  if (options.path) {
    cookieParts.push(`Path=${options.path}`);
  }

  if (options.expires) {
    cookieParts.push(`Expires=${options.expires.toUTCString()}`);
  }

  if (options.httpOnly) {
    cookieParts.push("HttpOnly");
  }

  if (options.secure) {
    cookieParts.push("Secure");
  }

  if (options.sameSite) {
    cookieParts.push(`SameSite=${options.sameSite}`);
  }

  return cookieParts.join("; ");
}

/**
 * Generates Set-Cookie headers for changed Kinde cookies.
 * Compares old cookies from the request with new cookies to determine
 * which cookies need to be set or deleted.
 * @param {Request} request - The incoming request with original cookies.
 * @param {Cookie} cookies - The universal-cookie instance with updated cookies.
 * @returns {Headers} Headers object containing Set-Cookie entries.
 */
export const generateCookieHeader = (
  request: Request,
  cookies: Cookie,
): Headers => {
  const cookieHeader = request.headers.get("Cookie");
  const oldCookies = cookieHeader
    ? new Cookies(cookieHeader, { path: "/" })
    : new Cookies(null, { path: "/" });
  const oldCookiesKeys = Object.keys(oldCookies.getAll()).filter(
    isKindeCookieName,
  );
  const newCookiesKeys = Object.keys(cookies.getAll()).filter(
    isKindeCookieName,
  );

  const cookiesToBeDeleted = oldCookiesKeys.filter(
    (x) => !newCookiesKeys.includes(x),
  );

  const headers = new Headers();
  const standardCookieOptions = getStandardCookieOptions();

  newCookiesKeys.forEach((key) => {
    headers.append(
      "Set-Cookie",
      serializeCookie(key, cookies.get(key), standardCookieOptions),
    );
  });

  cookiesToBeDeleted.forEach((key) => {
    headers.append(
      "Set-Cookie",
      serializeCookie(key, "", {
        ...standardCookieOptions,
        maxAge: -1,
      }),
    );
  });

  return headers;
};
