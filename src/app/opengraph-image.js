import { ImageResponse } from "next/og";
import { OG_COLORS, OG_SIZE, SpaceCard, loadOgFonts } from "@/src/components/og/SpaceCard";
import siteMetadata from "@/src/utils/siteMetaData";

export const alt = `${siteMetadata.author}: cloud, DevSecOps, software and AI`;
export const size = OG_SIZE;
export const contentType = "image/png";

// The link preview for every page that doesn't make its own (blog posts do).
export default async function Image() {
  return new ImageResponse(
    (
      <SpaceCard>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1 }}>
          <div style={{ fontSize: 96, fontWeight: 800, color: OG_COLORS.heading, letterSpacing: "-0.02em" }}>
            {siteMetadata.author}
          </div>
          <div style={{ marginTop: 20, fontSize: 34, fontWeight: 500, color: OG_COLORS.body, textAlign: "center", maxWidth: 860 }}>
            Cloud Architect specializing in DevSecOps, Software and Artificial Intelligence
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", fontSize: 24, fontWeight: 500, color: OG_COLORS.cyan }}>
          {new URL(siteMetadata.siteUrl).host}
        </div>
      </SpaceCard>
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
