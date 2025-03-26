import { describe, expect, test } from "vitest";
import { createSessionManager } from "../src/session";

describe("Session tests", () => {
  test("getSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { sessionManager } = await createSessionManager(mockRequest);

    sessionManager.setSessionItem("someKey", "someValue");

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
});
