import { describe, expect, test } from "vitest";
import { createSessionManager } from "../src/session";
import { generateCookieHeader } from "../src/utils/cookies";
import {
  getKindeCookieBaseName,
  isKindeCookieName,
} from "../src/utils/kinde-cookie-keys";

describe("Utils tests", () => {
  test("serializeCookie returns headers object", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { cookies, sessionManager } = await createSessionManager(mockRequest);
    sessionManager.setSessionItem("access_token", "someValue");
    const res = generateCookieHeader(mockRequest, cookies);
    expect(res).toBeTypeOf("object");
    const setCookie = res.getSetCookie();
    expect(setCookie).toEqual([
      "access_token=someValue; Max-Age=3600; Path=/; HttpOnly; SameSite=lax",
    ]);
  });

  test("serializeCookie only adds to Set-Cookie when needed", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { cookies, sessionManager } = await createSessionManager(mockRequest);
    sessionManager.setSessionItem("access_token", "someValue");
    await sessionManager.removeSessionItem("access_token");
    const res = generateCookieHeader(mockRequest, cookies);
    expect(res).toBeTypeOf("object");
    const setCookie = res.getSetCookie();
    expect(setCookie).toStrictEqual([]);
  });

  test("serializeCookie handles deletion", async () => {
    const mockRequest = new Request("http://kinde.com");
    mockRequest.headers.append("Cookie", "access_token=someValue");
    const { cookies, sessionManager } = await createSessionManager(mockRequest);
    sessionManager.removeSessionItem("access_token");
    const res = generateCookieHeader(mockRequest, cookies);
    expect(res).toBeTypeOf("object");
    const setCookie = res.getSetCookie();
    expect(setCookie).toContain(
      "access_token=; Max-Age=-1; Path=/; HttpOnly; SameSite=lax",
    );
  });

  test("generateCookieHeader includes chunked cookies", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { cookies, sessionManager } = await createSessionManager(mockRequest);
    const largeValue = "y".repeat(4000);
    await sessionManager.setSessionItem("access_token", largeValue);

    const res = generateCookieHeader(mockRequest, cookies);
    const setCookie = res.getSetCookie();

    expect(setCookie.length).toBeGreaterThan(1);
    expect(setCookie).toEqual(
      expect.arrayContaining([
        expect.stringContaining("access_token="),
        expect.stringContaining("access_token1="),
      ]),
    );
  });
});

describe("getKindeCookieBaseName", () => {
  test("returns base name for exact known cookie match", () => {
    expect(getKindeCookieBaseName("access_token")).toBe("access_token");
    expect(getKindeCookieBaseName("refresh_token")).toBe("refresh_token");
    expect(getKindeCookieBaseName("id_token")).toBe("id_token");
  });

  test("returns base name for numbered chunk suffix", () => {
    expect(getKindeCookieBaseName("access_token1")).toBe("access_token");
    expect(getKindeCookieBaseName("access_token20")).toBe("access_token");
    expect(getKindeCookieBaseName("id_token2")).toBe("id_token");
  });

  test("returns null for non-numeric suffix on a known base", () => {
    expect(getKindeCookieBaseName("access_tokenX")).toBeNull();
    expect(getKindeCookieBaseName("access_token_extra")).toBeNull();
    expect(getKindeCookieBaseName("access_token1a")).toBeNull();
  });

  test("returns null for completely unknown cookie name", () => {
    expect(getKindeCookieBaseName("unknown_cookie")).toBeNull();
    expect(getKindeCookieBaseName("")).toBeNull();
  });

  test("handles cookies whose names share a prefix (access_token vs access_token_payload)", () => {
    expect(getKindeCookieBaseName("access_token_payload")).toBe(
      "access_token_payload",
    );
    expect(getKindeCookieBaseName("access_token_payload1")).toBe(
      "access_token_payload",
    );
  });

  test("uses fallbackBase for an exact match when no KINDE_COOKIE matches", () => {
    expect(getKindeCookieBaseName("custom_key", "custom_key")).toBe(
      "custom_key",
    );
  });

  test("uses fallbackBase for a numeric chunk when no KINDE_COOKIE matches", () => {
    expect(getKindeCookieBaseName("custom_key1", "custom_key")).toBe(
      "custom_key",
    );
    expect(getKindeCookieBaseName("custom_key5", "custom_key")).toBe(
      "custom_key",
    );
  });

  test("returns null when fallbackBase non-numeric suffix", () => {
    expect(getKindeCookieBaseName("custom_key_abc", "custom_key")).toBeNull();
  });

  test("ignores fallbackBase when a KINDE_COOKIE already matches", () => {
    expect(getKindeCookieBaseName("access_token1", "access_token")).toBe(
      "access_token",
    );
  });
});

describe("isKindeCookieName", () => {
  test("returns true for exact KINDE_COOKIE names", () => {
    expect(isKindeCookieName("access_token")).toBe(true);
    expect(isKindeCookieName("refresh_token")).toBe(true);
    expect(isKindeCookieName("id_token")).toBe(true);
    expect(isKindeCookieName("user")).toBe(true);
  });

  test("returns true for numbered chunk variants of KINDE_COOKIE names", () => {
    expect(isKindeCookieName("access_token1")).toBe(true);
    expect(isKindeCookieName("refresh_token3")).toBe(true);
    expect(isKindeCookieName("id_token10")).toBe(true);
  });

  test("returns false for completely unknown cookie names", () => {
    expect(isKindeCookieName("unknown_cookie")).toBe(false);
    expect(isKindeCookieName("")).toBe(false);
  });

  test("returns false for names with non-numeric suffixes on known bases", () => {
    expect(isKindeCookieName("access_tokenX")).toBe(false);
    expect(isKindeCookieName("refresh_token_extra")).toBe(false);
  });
});
