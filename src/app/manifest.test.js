import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import siteMetadata from "@/src/utils/siteMetaData";
import manifest from "./manifest";

describe("manifest", () => {
  const app = manifest();

  it("names the app after Lina, not the Next.js starter", () => {
    expect(app.name).toBe(siteMetadata.author);
    expect(JSON.stringify(app)).not.toMatch(/Next\.js/);
  });

  it("uses the planet icon, with PNGs for Android home screens", () => {
    expect(existsSync("src/app/icon.svg")).toBe(true);
    expect(app.icons.map((icon) => icon.src)).toEqual(["/icon.svg", "/app-icon/192", "/app-icon/512"]);
  });
});
