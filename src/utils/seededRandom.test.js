import { describe, expect, it } from "vitest";
import { seededRandom } from "./seededRandom";

describe("seededRandom", () => {
  it("gives the same numbers for the same seed", () => {
    const a = seededRandom(5);
    const b = seededRandom(5);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("gives different numbers for different seeds, all between 0 and 1", () => {
    const values = [seededRandom(1)(), seededRandom(2)()];
    expect(values[0]).not.toBe(values[1]);
    for (const value of values) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
