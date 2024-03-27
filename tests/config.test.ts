import { describe, expect, it, vi } from "vitest";
import { config } from "../src/config";

describe("config", () => {
  it("correctly exports the config object", () => {
    expect(config).toBeDefined();
  });

  it("contains all expected properties", () => {
    expect(config).toHaveProperty("clientId");
    expect(config).toHaveProperty("clientSecret");
    expect(config).toHaveProperty("issuerUrl");
    expect(config).toHaveProperty("siteUrl");
    expect(config).toHaveProperty("postLogoutRedirectUrl");
    expect(config).toHaveProperty("postLoginRedirectUrl");
    expect(config).toHaveProperty("audience");
    expect(config).toHaveProperty("cookieMaxAge");
  });

  it("retrieves values from environment variables", () => {
    expect(config.clientId).toBe("test-client-id");
    expect(config.clientSecret).toBe("test-client-secret");
    expect(config.issuerUrl).toBe("https://test-issuer.kinde.com");
    expect(config.siteUrl).toBe("http://localhost:3000");
    expect(config.postLogoutRedirectUrl).toBe(
      "http://localhost:3000/test-logout"
    );
    expect(config.postLoginRedirectUrl).toBe(
      "http://localhost:3000/test-login"
    );
    expect(config.audience).toBe("test-audience");
    expect(config.cookieMaxAge).toBe("3600");
  });

  it("enforces string types for configuration properties", () => {
    expect(typeof config.clientId).toBe("string");
    expect(typeof config.clientSecret).toBe("string");
    expect(typeof config.issuerUrl).toBe("string");
    expect(typeof config.siteUrl).toBe("string");
    expect(typeof config.postLogoutRedirectUrl).toBe("string");
    expect(typeof config.postLoginRedirectUrl).toBe("string");
    expect(typeof config.audience).toBe("string");
    expect(typeof config.cookieMaxAge).toBe("string");
  });
});
