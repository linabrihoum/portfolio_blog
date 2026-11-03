import { describe, expect, it } from "vitest";
import { OG_SIZE, SpaceCard, loadOgFonts } from "./SpaceCard";

describe("SpaceCard", () => {
  it("draws the same sky for the same seed, so images don't change between builds", () => {
    expect(JSON.stringify(SpaceCard({ seed: 7 }))).toBe(JSON.stringify(SpaceCard({ seed: 7 })));
    expect(JSON.stringify(SpaceCard({ seed: 7 }))).not.toBe(JSON.stringify(SpaceCard({ seed: 8 })));
  });

  it("is the 1200×630 size link previews expect, and loads both Manrope weights", async () => {
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
    const fonts = await loadOgFonts();
    expect(fonts.map((font) => font.weight)).toEqual([500, 800]);
    fonts.forEach((font) => expect(font.data.length).toBeGreaterThan(0));
  });
});
