import { test, expect } from "vitest";
import * as index from "../src/index";
import { getKindeSession } from "../src/get-kinde-session";
import { handleAuth } from "../src/handle-auth";

test("exports the correct functions", () => {
  expect(index.getKindeSession).toBe(getKindeSession);
  expect(index.handleAuth).toBe(handleAuth);
});
