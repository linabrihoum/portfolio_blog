import { describe, expect, it } from "vitest";
import { pickRecentPosts } from "./RecentPosts";

const post = (title, publishedAt, isPublished = true) => ({ title, publishedAt, isPublished });

describe("pickRecentPosts", () => {
  const blogs = [
    post("Mar 2024", "2024-03-17T00:00:00.000Z"),
    post("Jul 2026", "2026-07-19T00:00:00.000Z"),
    post("Nov 2025", "2025-11-03T00:00:00.000Z"),
    post("Jan 2024", "2024-01-13T00:00:00.000Z"),
    post("Draft", "2026-10-01T00:00:00.000Z", false),
    post("Mar 2026", "2026-03-20T00:00:00.000Z"),
    post("Jul 2025", "2025-07-28T00:00:00.000Z"),
    post("Apr 2025", "2025-04-10T00:00:00.000Z"),
    post("Oct 2023", "2023-10-04T00:00:00.000Z"),
  ];

  it("features the newest published post", () => {
    expect(pickRecentPosts(blogs).featured.title).toBe("Jul 2026");
  });

  it("shows the next 6 newest in the grid and skips drafts", () => {
    expect(pickRecentPosts(blogs).grid.map((blog) => blog.title)).toEqual([
      "Mar 2026",
      "Nov 2025",
      "Jul 2025",
      "Apr 2025",
      "Mar 2024",
      "Jan 2024",
    ]);
  });
});
