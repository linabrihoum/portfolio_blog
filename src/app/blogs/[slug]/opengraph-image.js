import { allBlogs } from "contentlayer/generated";
import { ImageResponse } from "next/og";
import { OG_COLORS, OG_SIZE, SpaceCard, loadOgFonts } from "@/src/components/og/SpaceCard";
import siteMetadata from "@/src/utils/siteMetaData";

export const size = OG_SIZE;
export const contentType = "image/png";

// One image per post, with the post title as its alt text
export async function generateImageMetadata({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((post) => post._raw.flattenedPath === slug);
  return [{ id: "card", alt: blog ? blog.title : siteMetadata.title, size, contentType }];
}

// Long titles get a smaller size so they still fit in three lines
const titleSize = (title) => (title.length > 70 ? 54 : title.length > 45 ? 64 : 76);

// Each post's link preview: the space hero with its category and title.
export default async function Image({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((post) => post._raw.flattenedPath === slug);

  return new ImageResponse(
    (
      <SpaceCard seed={blog.title.length}>
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
