import Cookies from "universal-cookie";

const KINDE_COOKIES = [
  "refresh_token",
  "access_token",
  "id_token",
  "user",
  "ac-state-key",
  "post_login_redirect_url",
];

interface CookieOptions {
  maxAge?: number;
  domain?: string;
  path?: string;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None" | "Secure";
}

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
  options: CookieOptions = {},
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
  // @ts-expect-error The universal-cookie types are incorrect.
  const oldCookies = cookieHeader
    ? new Cookies(cookieHeader, { path: "/" })
    : new Cookies(null, { path: "/" });
  const oldCookiesKeys = Object.keys(oldCookies.getAll());
  const newCookiesKeys = Object.keys(cookies.getAll()).filter((cookie) =>
    KINDE_COOKIES.includes(cookie),
  );

  const cookiesToBeDeleted = oldCookiesKeys
    .filter((cookie) => KINDE_COOKIES.includes(cookie))
    .filter((x) => !newCookiesKeys.includes(x));

  const headers = new Headers();

  newCookiesKeys.forEach((key) => {
    headers.append(
      "Set-Cookie",
      serializeCookie(key, cookies.get(key), {
        path: "/",
        sameSite: "Lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }),
    );
  });

  cookiesToBeDeleted.forEach((key) => {
    headers.append(
      "Set-Cookie",
      serializeCookie(key, "", {
        path: "/",
        maxAge: -1,
        sameSite: "Lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }),
    );
  });

  return headers;
};
