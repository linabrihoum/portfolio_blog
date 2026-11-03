import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { allBlogs } from "contentlayer/generated";
import { ImageResponse } from "next/og";
import { OG_COLORS, OG_SIZE, SpaceCard, loadOgFonts } from "@/src/components/og/SpaceCard";
import { postImageSrc } from "@/src/utils";
import siteMetadata from "@/src/utils/siteMetaData";

export const size = OG_SIZE;
export const contentType = "image/png";

// TEMPORARY: "space" or "cover", so Lina can compare both before one is picked
const STYLE = "space";

// One image per post, with the post title as its alt text
export async function generateImageMetadata({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((post) => post._raw.flattenedPath === slug);
  return [{ id: "card", alt: blog ? blog.title : siteMetadata.title, size, contentType }];
}

// Long titles get a smaller size so they still fit in three lines
const titleSize = (title) => (title.length > 70 ? 54 : title.length > 45 ? 64 : 76);

const MIME = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", svg: "image/svg+xml" };

async function coverDataUrl(blog) {
  const src = postImageSrc(blog);
  const data = await readFile(join(process.cwd(), "public", src), "base64");
  return `data:${MIME[src.split(".").pop().toLowerCase()]};base64,${data}`;
}

// Each post's link preview: the space hero with its category and title.
export default async function Image({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((post) => post._raw.flattenedPath === slug);

  const background =
    STYLE === "cover" ? (
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- drawn into a PNG, not a browser page */}
        <img alt="" src={await coverDataUrl(blog)} width={OG_SIZE.width} height={OG_SIZE.height} style={{ objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(8,7,23,.95) 0%, rgba(8,7,23,.8) 55%, rgba(8,7,23,.45) 100%)",
          }}
        />
      </div>
    ) : null;

  return new ImageResponse(
    (
      <SpaceCard seed={blog.title.length} background={background}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, maxWidth: 980 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: OG_COLORS.cyan, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {blog.tags[0]}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: titleSize(blog.title),
              fontWeight: 800,
              lineHeight: 1.1,
              color: OG_COLORS.heading,
              letterSpacing: "-0.02em",
            }}
          >
            {blog.title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: OG_COLORS.body }}>
          {blog.author || siteMetadata.author}
          <span style={{ margin: "0 14px", color: OG_COLORS.muted }}>·</span>
          <span style={{ color: OG_COLORS.cyan }}>{new URL(siteMetadata.siteUrl).host}</span>
        </div>
      </SpaceCard>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
