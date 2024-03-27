import { expect, test, vi, Mock } from "vitest";
import { createSessionManager } from "../src/session";
import { installGlobals } from "@remix-run/node"; // You might need to install this dependency
import { describe } from "node:test";

installGlobals();

describe("Session tests", () => {
  test("getSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { session, sessionManager } = await createSessionManager(mockRequest);

    session.set("someKey", "someValue");

    expect(await sessionManager.getSessionItem("someKey")).toEqual("someValue");
  });

  test("setSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { session, sessionManager } = await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", "someNewValue");

    expect(session.get("someKey")).toEqual("someNewValue");
  });

  test("removeSessionItem", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { session, sessionManager } = await createSessionManager(mockRequest);

    session.set("someKey", "someValue");

    expect(session.get("someKey")).toEqual("someValue");
    await sessionManager.removeSessionItem("someKey");
    expect(session.get("someKey")).not.toBeDefined();
  });

  test("destroySession", async () => {
    const mockRequest = new Request("http://kinde.com");
    const { session, sessionManager, sessionStorage } =
      await createSessionManager(mockRequest);

    await sessionManager.setSessionItem("someKey", "someValue");
    await sessionManager.setSessionItem("someKey2", "someValue2");
    await sessionManager.setSessionItem("access_token", "asds");

    expect(session.get("someKey")).toEqual("someValue");
    expect(session.get("someKey2")).toEqual("someValue2");
    expect(session.get("access_token")).toEqual("asds");

    await sessionManager.destroySession();

    expect(session.get("someKey")).toEqual("someValue");
    expect(session.get("someKey2")).toEqual("someValue2");
    expect(session.get("access_token")).not.toBeDefined();
  });
});
