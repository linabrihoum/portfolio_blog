import { allBlogs } from "contentlayer/generated";
import siteMetadata from "@/src/utils/siteMetaData";
import { buildRss } from "@/src/utils/rss";

// Built once at build time, like the posts themselves.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildRss(siteMetadata, allBlogs), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
