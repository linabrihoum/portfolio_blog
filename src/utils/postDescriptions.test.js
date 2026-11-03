import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Google cuts search result descriptions off at about 160 characters
const MAX_DESCRIPTION = 160;

// The real posts' descriptions, read straight from content/*/index.mdx (no build needed).
const descriptions = fs.readdirSync("content").map((dir) => {
  const source = fs.readFileSync(path.join("content", dir, "index.mdx"), "utf8");
  const quoted = source.match(/^description:[ \t]*"((?:[^"\\]|\\.)*)"/m);
  return [dir, quoted ? quoted[1].replace(/\\(.)/g, "$1") : null];
});

describe("post descriptions", () => {
  it.each(descriptions)("%s fits in a search result", (dir, description) => {
    expect(description).toBeTruthy();
    expect(description.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
  });
});
