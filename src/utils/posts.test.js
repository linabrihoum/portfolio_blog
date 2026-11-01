import { describe, expect, it } from "vitest";
import { getAdjacentPosts, getRelatedPosts, wasUpdated } from "./posts";

const post = (name, tags, publishedAt, extra = {}) => ({
  url: `/blogs/${name}`,
  title: name,
  tags,
  publishedAt,
  isPublished: true,
  ...extra,
});

const blogs = [
  post("oldest", ["Cloud"], "2023-01-01T00:00:00.000Z"),
  post("middle", ["DevSecOps"], "2024-01-01T00:00:00.000Z"),
  post("newest", ["Cloud"], "2025-01-01T00:00:00.000Z"),
  post("draft", ["Cloud"], "2026-01-01T00:00:00.000Z", { isPublished: false }),
  post("other", ["Career"], "2024-06-01T00:00:00.000Z"),
];
const [oldest, middle, newest] = blogs;

describe("getAdjacentPosts", () => {
  it("returns the older post as previous and the newer one as next", () => {
    const { previous, next } = getAdjacentPosts(blogs, middle);
    expect(previous.title).toBe("oldest");
    expect(next.title).toBe("other");
  });

  it("has no next for the newest post and no previous for the oldest", () => {
    expect(getAdjacentPosts(blogs, newest).next).toBeNull();
    expect(getAdjacentPosts(blogs, oldest).previous).toBeNull();
  });
});

describe("getRelatedPosts", () => {
  it("puts posts on the same topic first, never the post itself or drafts", () => {
    expect(getRelatedPosts(blogs, oldest).map((b) => b.title)).toEqual(["newest", "other", "middle"]);
  });

  it("returns at most the requested number", () => {
    expect(getRelatedPosts(blogs, oldest, 2)).toHaveLength(2);
  });
});

describe("wasUpdated", () => {
  it("is false when updatedAt is missing or the same as publishedAt", () => {
    expect(wasUpdated({ publishedAt: "2025-01-01T00:00:00.000Z" })).toBe(false);
    expect(wasUpdated({ publishedAt: "2025-01-01T00:00:00.000Z", updatedAt: "2025-01-01T00:00:00.000Z" })).toBe(false);
  });

  it("is true when the post changed later", () => {
    expect(wasUpdated({ publishedAt: "2025-01-01T00:00:00.000Z", updatedAt: "2025-03-01T00:00:00.000Z" })).toBe(true);
  });
});
