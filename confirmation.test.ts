import { describe, expect, it } from "vitest";
import { isConfirmedSetup } from "../src/strategy/confirmation";

describe("strategy confirmation", () => {
  it("requires all four setup conditions", () => {
    expect(isConfirmedSetup({
      liquiditySweep: true,
      marketStructureShift: true,
      displacement: true,
      fairValueGap: true
    })).toBe(true);
    expect(isConfirmedSetup({
      liquiditySweep: true,
      marketStructureShift: true,
      displacement: false,
      fairValueGap: true
    })).toBe(false);
  });
});
