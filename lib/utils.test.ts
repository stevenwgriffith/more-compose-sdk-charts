import { describe, expect, it } from "vitest";
import { welcomeMessage } from "./utils";

describe("utils", () => {
  it("should return a welcome message", () => {
    expect(welcomeMessage("John")).toBe("Hello John, Welcome to PBandJ!");
  });
});
