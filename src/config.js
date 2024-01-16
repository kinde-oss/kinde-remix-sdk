export const config = {
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  issuerUrl: process.env.KINDE_ISSUER_URL,
  siteUrl: process.env.KINDE_SITE_URL,
  postLogoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
  postLoginRedirectUrl: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
  audience: process.env.KINDE_AUDIENCE,
  cookieMaxAge: process.env.KINDE_COOKIE_MAX_AGE,
};
