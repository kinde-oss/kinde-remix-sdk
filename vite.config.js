import { defineConfig } from "vitest/config";

export default defineConfig({
  // ...
  test: {
    // ...
    env: {
      KINDE_CLIENT_ID: "test-client-id",
      KINDE_CLIENT_SECRET: "test-client-secret",
      KINDE_ISSUER_URL: "https://test-issuer.kinde.com",
      KINDE_SITE_URL: "http://localhost:3000",
      KINDE_POST_LOGOUT_REDIRECT_URL: "http://localhost:3000/test-logout",
      KINDE_POST_LOGIN_REDIRECT_URL: "http://localhost:3000/test-login",
      SESSION_SECRET: "secret",
      KINDE_COOKIE_MAX_AGE: "3600",
      KINDE_AUDIENCE: "test-audience",
    },
    coverage: {
      include: ["src/**/*.{js,ts}"],
      exclude: [
        // ...
        "**/build/**",
      ],
    },
  },
});
