import { describe, expect, it } from "vitest";
import siteMetadata from "./siteMetaData";
import { blogPostingJsonLd, categoryJsonLd, homeJsonLd } from "./structuredData";

describe("blogPostingJsonLd", () => {
  const blog = {
    url: "/blogs/gitops",
    title: "GitOps",
    description: "About GitOps",
    tags: ["DevSecOps"],
    author: "Lina Brihoum",
    publishedAt: "2025-01-20T00:00:00.000Z",
    updatedAt: "2025-03-01T00:00:00.000Z",
  };
  const [article, crumbs] = blogPostingJsonLd(siteMetadata, blog, {
    categoryName: "DevSecOps",
    categorySlug: "devsecops",
    imageUrl: "https://linabrihoum.com/blogs/gitops.jpg",
  })["@graph"];

  it("marks the page as a BlogPosting (not NewsArticle) with its dates", () => {
    expect(article).toMatchObject({
      "@type": "BlogPosting",
      headline: "GitOps",
      mainEntityOfPage: `${siteMetadata.siteUrl}/blogs/gitops`,
      datePublished: "2025-01-20T00:00:00.000Z",
      dateModified: "2025-03-01T00:00:00.000Z",
    });
  });

  it("links the author to the About page", () => {
    expect(article.author).toEqual({ "@type": "Person", name: "Lina Brihoum", url: `${siteMetadata.siteUrl}/about` });
  });

  it("builds the breadcrumb trail Home > category > post", () => {
    expect(crumbs.itemListElement.map((c) => c.name)).toEqual(["Home", "DevSecOps", "GitOps"]);
  });
});

describe("categoryJsonLd", () => {
  const posts = [{ title: "GitOps", url: "/blogs/gitops" }];

  it("describes the category as a collection of its posts", () => {
    const [collection] = categoryJsonLd(siteMetadata, { slug: "cloud", name: "Cloud", intro: "Intro", posts })["@graph"];
    expect(collection).toMatchObject({
      "@type": "CollectionPage",
      name: "Cloud Blogs",
      description: "Intro",
      url: `${siteMetadata.siteUrl}/categories/cloud`,
    });
    expect(collection.hasPart[0].url).toBe(`${siteMetadata.siteUrl}/blogs/gitops`);
  });

  it("builds the breadcrumb trail Home > Blogs > category", () => {
    const crumbs = categoryJsonLd(siteMetadata, { slug: "cloud", name: "Cloud", intro: "", posts })["@graph"][1];
    expect(crumbs.itemListElement.map((c) => c.name)).toEqual(["Home", "Blogs", "Cloud"]);
    const all = categoryJsonLd(siteMetadata, { slug: "all", name: "all", intro: "", posts })["@graph"][1];
    expect(all.itemListElement.map((c) => c.name)).toEqual(["Home", "Blogs"]);
  });
});

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
