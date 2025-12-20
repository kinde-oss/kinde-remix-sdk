import { describe, expect, test } from "vitest";
import { createSessionManager } from "../src/session";
import { generateCookieHeader } from "../src/utils/cookies";

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
