import { sortBlogs } from "./index";
import { published } from "./posts";

const escapeXml = (text = "") =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// RSS 2.0 feed of the published posts, newest first, for feed readers.
export function buildRss(siteMetadata, blogs) {
  const site = siteMetadata.siteUrl;
  const posts = sortBlogs(published(blogs));

  const items = posts
    .map((blog) => {
      const link = `${site}${blog.url}`;
      const categories = blog.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n");
      return [
        "    <item>",
        `      <title>${escapeXml(blog.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${new Date(blog.publishedAt).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(blog.description)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(siteMetadata.title)}</title>`,
    `    <link>${site}</link>`,
    `    <description>${escapeXml(siteMetadata.description)}</description>`,
    `    <language>${siteMetadata.language}</language>`,
    `    <atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>`,
    posts[0] ? `    <lastBuildDate>${new Date(posts[0].publishedAt).toUTCString()}</lastBuildDate>` : "",
    items,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}
