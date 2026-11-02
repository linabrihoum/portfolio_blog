import { describe, expect, it } from "vitest";
import siteMetadata from "./siteMetaData";
import { buildRss } from "./rss";

const post = (overrides) => ({
  title: "GitOps",
  url: "/blogs/gitops",
  description: "About GitOps",
  publishedAt: "2025-01-20T00:00:00.000Z",
  tags: ["DevSecOps"],
  isPublished: true,
  ...overrides,
});

describe("buildRss", () => {
  const blogs = [
    post({ title: "Older", url: "/blogs/older", publishedAt: "2024-01-01T00:00:00.000Z" }),
    post({ title: "Newer", url: "/blogs/newer", publishedAt: "2025-06-01T00:00:00.000Z" }),
    post({ title: "Draft", url: "/blogs/draft", isPublished: false }),
  ];
  const xml = buildRss(siteMetadata, blogs);

  it("lists published posts only, newest first, with full links", () => {
    const titles = [...xml.matchAll(/<item>\s*<title>(.*?)<\/title>/g)].map((m) => m[1]);
    expect(titles).toEqual(["Newer", "Older"]);
    expect(xml).toContain(`<link>${siteMetadata.siteUrl}/blogs/newer</link>`);
  });

  it("points to itself and dates the feed by its newest post", () => {
    expect(xml).toContain(`href="${siteMetadata.siteUrl}/feed.xml" rel="self"`);
    expect(xml).toContain(`<lastBuildDate>${new Date("2025-06-01T00:00:00.000Z").toUTCString()}</lastBuildDate>`);
  });

  it("escapes characters that would break the XML", () => {
    const tricky = buildRss(siteMetadata, [post({ title: "Threads & <Processes>", description: 'Say "hi"' })]);
    expect(tricky).toContain("<title>Threads &amp; &lt;Processes&gt;</title>");
    expect(tricky).toContain("<description>Say &quot;hi&quot;</description>");
  });
});
