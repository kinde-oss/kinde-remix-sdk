import Cookies from "universal-cookie";
import {
  KindeCookieOptions,
  getStandardCookieOptions,
  isKindeCookieName,
} from "./kinde-cookie-keys";

/**
 *
 * @param {string} name
 * @param {object | string} value
 * @param {CookieOptions} options
 * @returns
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
 *
 * @param {Request} request
 * @param {Cookies} cookies
 * @returns {Headers}
 */
export const generateCookieHeader = (request, cookies) => {
  const cookieHeader = request.headers.get("Cookie");
  const oldCookies = cookieHeader
    ? new Cookies(cookieHeader, { path: "/" })
    : new Cookies(null, { path: "/" });
  const oldCookiesKeys = Object.keys(oldCookies.getAll()).filter(
    isKindeCookieName
  );
  const newCookiesKeys = Object.keys(cookies.getAll()).filter(
    isKindeCookieName
  );

  const cookiesToBeDeleted = oldCookiesKeys.filter(
    (x) => !newCookiesKeys.includes(x)
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
