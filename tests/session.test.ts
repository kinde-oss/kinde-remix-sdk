import { describe, expect, test } from "vitest";
import { createSessionManager } from "../src/session";

describe("Session tests", () => {
  test("getSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", "someValue");

    expect(await sessionManager.getSessionItem("someKey")).toEqual(
      "someValue",
    );
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
    const { sessionManager, cookies } = await createSessionManager(
      mockRequest,
    );

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
    const { sessionManager, cookies } = await createSessionManager(
      mockRequest,
    );

    const largeValue = "x".repeat(4000);
    await sessionManager.setSessionItem("refresh_token", largeValue);
    await sessionManager.removeSessionItem("refresh_token");

    expect(cookies.get("refresh_token")).toBeUndefined();
    expect(cookies.get("refresh_token1")).toBeUndefined();
  });

  test("destroySession clears chunked cookies", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager, cookies } = await createSessionManager(
      mockRequest,
    );

    const largeValue = "x".repeat(4000);
    await sessionManager.setSessionItem("id_token", largeValue);
    await sessionManager.destroySession();

    expect(cookies.get("id_token")).toBeUndefined();
    expect(cookies.get("id_token1")).toBeUndefined();
  });
});
