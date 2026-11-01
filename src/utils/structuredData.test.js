import { describe, expect, it } from "vitest";
import siteMetadata from "./siteMetaData";
import { homeJsonLd } from "./structuredData";

describe("homeJsonLd", () => {
  const data = homeJsonLd(siteMetadata);

  it("describes the website", () => {
    expect(data["@type"]).toBe("WebSite");
    expect(data.url).toBe(siteMetadata.siteUrl);
  });

  it("links the author to her About page and profiles", () => {
    expect(data.author).toMatchObject({
      "@type": "Person",
      name: "Lina Brihoum",
      url: `${siteMetadata.siteUrl}/about`,
      sameAs: [siteMetadata.github, siteMetadata.linkedin, siteMetadata.instagram],
    });
  });
});
