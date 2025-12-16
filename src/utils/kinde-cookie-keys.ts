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

export const isKindeCookieName = (cookieName: string): boolean => {
  return (
    getKindeCookieBaseName(cookieName) !== null
  );
};

export const getKindeCookieBaseName = (
  cookieName: string,
): (typeof KINDE_COOKIES)[number] | null => {
  for (const base of KINDE_COOKIES) {
    if (cookieName === base) return base;
    if (cookieName.startsWith(base)) {
      const suffix = cookieName.slice(base.length);
      if (suffix.length && CHUNK_SUFFIX_PATTERN.test(suffix)) {
        return base;
      }
    }
  }
  return null;
};
