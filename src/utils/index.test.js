import { describe, expect, it } from "vitest";
import { cn, cx, formatPostDate, postImageSrc, sortBlogs } from "./index";

describe("formatPostDate", () => {
  it("shows the stored date, whatever the build machine's timezone", () => {
    expect(formatPostDate("2026-03-20T00:00:00.000Z")).toBe("March 20, 2026");
    expect(formatPostDate("2025-01-05T00:00:00.000Z")).toBe("January 05, 2025");
  });
});

describe("postImageSrc", () => {
  it("turns Contentlayer's file path into a public URL", () => {
    expect(postImageSrc({ image: { filePath: "../public/blogs/gitops.jpg" } })).toBe("/blogs/gitops.jpg");
  });
});

describe("sortBlogs", () => {
  it("puts the newest post first", () => {
    const blogs = [
      { title: "old", publishedAt: "2023-10-04T00:00:00.000Z" },
      { title: "new", publishedAt: "2026-07-19T00:00:00.000Z" },
      { title: "middle", publishedAt: "2025-01-20T00:00:00.000Z" },
    ];

    expect(sortBlogs(blogs).map((blog) => blog.title)).toEqual([
      "new",
      "middle",
      "old",
    ]);
  });

  it("leaves the original list in its order", () => {
    const blogs = [
      { title: "old", publishedAt: "2023-10-04T00:00:00.000Z" },
      { title: "new", publishedAt: "2026-07-19T00:00:00.000Z" },
    ];

    sortBlogs(blogs);

    expect(blogs.map((blog) => blog.title)).toEqual(["old", "new"]);
  });
});

describe("cx", () => {
  it("joins class names and skips empty ones", () => {
    expect(cx("a", false, undefined, "b", "")).toBe("a b");
  });
});

describe("cn", () => {
  it("lets a later Tailwind class override an earlier one", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});
