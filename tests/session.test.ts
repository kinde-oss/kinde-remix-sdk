import { describe, expect, test } from "vitest";
import { createSessionManager } from "../src/session";

describe("Session tests", () => {
  test("getSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", "someValue");

    expect(await sessionManager.getSessionItem("someKey")).toEqual("someValue");
  });

  test("setSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", "someNewValue");

    expect(await sessionManager.getSessionItem("someKey")).toEqual(
      "someNewValue",
    );
  });

  test("removeSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", "someValue");

    expect(await sessionManager.getSessionItem("someKey")).toEqual("someValue");
    await sessionManager.removeSessionItem("someKey");
    expect(await sessionManager.getSessionItem("someKey")).not.toBeDefined();
  });

  test("destroySession", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", "someValue");
    await sessionManager.setSessionItem("someKey2", "someValue2");
    await sessionManager.setSessionItem("access_token", "asds");

    expect(await sessionManager.getSessionItem("someKey")).toEqual("someValue");
    expect(await sessionManager.getSessionItem("someKey2")).toEqual(
      "someValue2",
    );
    expect(await sessionManager.getSessionItem("access_token")).toEqual("asds");

    await sessionManager.destroySession();

    expect(await sessionManager.getSessionItem("someKey")).toEqual("someValue");
    expect(await sessionManager.getSessionItem("someKey2")).toEqual(
      "someValue2",
    );
    expect(
      await sessionManager.getSessionItem("access_token"),
    ).not.toBeDefined();
  });

  test("setSessionItem splits large values", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager, cookies } = await createSessionManager(mockRequest);

    const largeValue = "x".repeat(4000);
    await sessionManager.setSessionItem("access_token", largeValue);

    expect(await sessionManager.getSessionItem("access_token")).toEqual(
      largeValue,
    );
    expect(Object.keys(cookies.getAll())).toEqual(
      expect.arrayContaining(["access_token", "access_token1"]),
    );
  });

  test("removeSessionItem clears chunked cookies", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager, cookies } = await createSessionManager(mockRequest);

    const largeValue = "x".repeat(4000);
    await sessionManager.setSessionItem("refresh_token", largeValue);
    await sessionManager.removeSessionItem("refresh_token");

    expect(cookies.get("refresh_token")).toBeUndefined();
    expect(cookies.get("refresh_token1")).toBeUndefined();
  });

  test("destroySession clears chunked cookies", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager, cookies } = await createSessionManager(mockRequest);

    const largeValue = "x".repeat(4000);
    await sessionManager.setSessionItem("id_token", largeValue);
    await sessionManager.destroySession();

    expect(cookies.get("id_token")).toBeUndefined();
    expect(cookies.get("id_token1")).toBeUndefined();
  });

  test("getSessionItem reads pre-existing chunked cookies from request", async () => {
    const mockRequest = new Request("http://kinde.com");
    const chunk0 = "a".repeat(3000);
    const chunk1 = "b".repeat(1000);
    mockRequest.headers.set(
      "Cookie",
      `access_token=${chunk0}; access_token1=${chunk1}`,
    );
    const { sessionManager } = await createSessionManager(mockRequest);

    const result = await sessionManager.getSessionItem("access_token");
    expect(result).toEqual(chunk0 + chunk1);
  });

  test("setSessionItem handles value at exact MAX_COOKIE_LENGTH boundary", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager, cookies } = await createSessionManager(mockRequest);

    // Value exactly at the boundary should NOT be chunked
    const exactValue = "x".repeat(3000);
    await sessionManager.setSessionItem("access_token", exactValue);

    expect(await sessionManager.getSessionItem("access_token")).toEqual(
      exactValue,
    );
    // Should be stored as single cookie, not chunked
    expect(cookies.get("access_token")).toBeDefined();
    expect(cookies.get("access_token1")).toBeUndefined();
  });

  test("setSessionItem handles value just over MAX_COOKIE_LENGTH boundary", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager, cookies } = await createSessionManager(mockRequest);

    // Value just over the boundary should be chunked
    const overValue = "x".repeat(3001);
    await sessionManager.setSessionItem("access_token", overValue);

    expect(await sessionManager.getSessionItem("access_token")).toEqual(
      overValue,
    );
    // Should be chunked into multiple cookies
    expect(cookies.get("access_token")).toBeDefined();
    expect(cookies.get("access_token1")).toBeDefined();
  });

  test("setSessionItem handles non-string values (objects)", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    const objValue = { userId: "123", permissions: ["read", "write"] };
    await sessionManager.setSessionItem("user", objValue);

    // Objects are JSON serialized and parsed back
    const result = await sessionManager.getSessionItem("user");
    expect(result).toEqual(objValue);
  });

  test("setSessionItem handles non-string values (numbers)", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", 12345);

    // Numbers are preserved through JSON serialization
    expect(await sessionManager.getSessionItem("someKey")).toEqual(12345);
  });

  test("setSessionItem handles non-string values (booleans)", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", true);

    // Booleans are preserved through JSON serialization
    expect(await sessionManager.getSessionItem("someKey")).toEqual(true);
  });

  test("setSessionItem replaces existing chunked value with smaller value", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager, cookies } = await createSessionManager(mockRequest);

    // First set a large chunked value
    const largeValue = "x".repeat(4000);
    await sessionManager.setSessionItem("access_token", largeValue);
    expect(cookies.get("access_token1")).toBeDefined();

    // Then replace with a small value
    const smallValue = "small";
    await sessionManager.setSessionItem("access_token", smallValue);

    expect(await sessionManager.getSessionItem("access_token")).toEqual(
      smallValue,
    );
    // Old chunks should be removed
    expect(cookies.get("access_token1")).toBeUndefined();
  });
});
