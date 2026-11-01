import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CATEGORY_INTROS, getCategories, getPostsInCategory, matchesSearch } from "./categories";

// The real posts' tags, read straight from content/*/index.mdx (no build needed).
const realPosts = fs.readdirSync("content").map((dir) => {
  const source = fs.readFileSync(path.join("content", dir, "index.mdx"), "utf8");
  const tagBlock = source.match(/^tags:[ \t]*\r?\n((?:[ \t]*- [^\n]*\n)+)/m)[1];
  const tags = [...tagBlock.matchAll(/- (.+?)\s*$/gm)].map((m) => m[1]);
  return { title: dir, tags, isPublished: true, publishedAt: "2025-01-01T00:00:00.000Z" };
});

const post = (title, tags, publishedAt, extra = {}) => ({
  title,
  tags,
  publishedAt,
  description: "",
  isPublished: true,
  ...extra,
});

const blogs = [
  post("GitOps", ["DevSecOps"], "2025-01-20T00:00:00.000Z"),
  post("AI CI/CD", ["DevSecOps", "Artificial Intelligence"], "2024-09-24T00:00:00.000Z"),
  post("Networking", ["Cloud"], "2025-11-03T00:00:00.000Z", { description: "VPCs and subnets" }),
  post("Shift left", ["DevSecOps"], "2026-03-20T00:00:00.000Z"),
  post("Draft", ["Drafts"], "2026-10-01T00:00:00.000Z", { isPublished: false }),
];

describe("getCategories", () => {
  // The old page used a stateful slugger, which turned repeated tags into
  // extra empty pages like /categories/devsecops-1, -2, ...
  it("lists each category once, with no -1/-2 duplicates", () => {
    expect(getCategories(blogs).map((c) => c.slug)).toEqual(["all", "devsecops", "cloud", "artificial-intelligence"]);
  });

  it("keeps the tag's display name and skips drafts", () => {
    const names = getCategories(blogs).map((c) => c.name);
    expect(names).toContain("Artificial Intelligence");
    expect(names).not.toContain("Drafts");
  });

  it("has intro text for every category the real posts use", () => {
    expect(getCategories(realPosts).map((c) => c.slug)).toEqual([
      "all",
      "devsecops",
      "cloud",
      "software",
      "career",
      "artificial-intelligence",
    ]);
    for (const category of getCategories(realPosts)) {
      expect(CATEGORY_INTROS[category.slug], category.slug).toBeTruthy();
    }
  });
});

describe("getPostsInCategory", () => {
  it("returns a category's posts, newest first", () => {
    expect(getPostsInCategory(blogs, "devsecops").map((b) => b.title)).toEqual(["Shift left", "GitOps", "AI CI/CD"]);
  });

  it("returns every published post for 'all'", () => {
    expect(getPostsInCategory(blogs, "all")).toHaveLength(4);
  });
});

describe("matchesSearch", () => {
  it("matches title, description or topic, ignoring case", () => {
    const [, ai, networking] = blogs;
    expect(matchesSearch(networking, "SUBNETS")).toBe(true);
    expect(matchesSearch(ai, "artificial")).toBe(true);
    expect(matchesSearch(ai, "kubernetes")).toBe(false);
    expect(matchesSearch(ai, "   ")).toBe(true);
  });
});
