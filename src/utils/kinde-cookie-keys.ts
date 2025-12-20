const CHUNK_SUFFIX_PATTERN = /^\d+$/;

// Kinde-managed cookies that we should keep in sync between requests.
export const KINDE_COOKIES = [
  "refresh_token",
  "access_token",
  "id_token",
  "user",
  "ac-state-key",
  "post_login_redirect_url",
  "access_token_payload",
  "id_token_payload",
] as const;

export type KindeCookieOptions = {
  maxAge?: number;
  domain?: string;
  path?: string;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

const BASE_COOKIE_OPTIONS: Omit<KindeCookieOptions, "maxAge" | "expires"> = {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const DEFAULT_MAX_AGE_FALLBACK = 60 * 60 * 24 * 29;
const parsedMaxAge = Number(process.env.KINDE_COOKIE_MAX_AGE);

export const DEFAULT_COOKIE_MAX_AGE = Number.isFinite(parsedMaxAge)
  ? parsedMaxAge
  : DEFAULT_MAX_AGE_FALLBACK;

export const MAX_COOKIE_LENGTH = 3000;

export const getStandardCookieOptions = (
  overrides: KindeCookieOptions = {},
): KindeCookieOptions => ({
  ...BASE_COOKIE_OPTIONS,
  maxAge: DEFAULT_COOKIE_MAX_AGE,
  ...overrides,
});

export const getCookieRemovalOptions = (
  overrides: KindeCookieOptions = {},
): KindeCookieOptions => ({
  ...BASE_COOKIE_OPTIONS,
  ...overrides,
});

export const getKindeCookieBaseName = (
  cookieName: string,
  fallbackBase?: string,
): string | null => {
  for (const base of KINDE_COOKIES) {
    if (cookieName === base) return base;
    if (cookieName.startsWith(base)) {
      const suffix = cookieName.slice(base.length);
      if (suffix.length === 0) return base;
      if (CHUNK_SUFFIX_PATTERN.test(suffix)) {
        return base;
      }
    }
  }

  if (fallbackBase && cookieName.startsWith(fallbackBase)) {
    const suffix = cookieName.slice(fallbackBase.length);
    if (suffix.length === 0) return fallbackBase;
    if (CHUNK_SUFFIX_PATTERN.test(suffix)) {
      return fallbackBase;
    }
  }

  return null;
};

export const isKindeCookieName = (cookieName: string): boolean => {
  const baseName = getKindeCookieBaseName(cookieName);
  return Boolean(
    baseName &&
      KINDE_COOKIES.includes(baseName as (typeof KINDE_COOKIES)[number])
  );
};
