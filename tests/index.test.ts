import { test, expect } from "vitest";
import * as index from "../src/index.ts";
import { getKindeSession } from "../src/get-kinde-session.ts";
import { handleAuth } from "../src/handle-auth.ts";

test("exports the correct functions", () => {
  expect(index.getKindeSession).toBe(getKindeSession);
  expect(index.handleAuth).toBe(handleAuth);
});
