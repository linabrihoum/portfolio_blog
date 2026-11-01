// JSON-LD ("structured data") that tells search engines what a page is about.

// Category page: a collection of posts, plus its breadcrumb trail (Home > Blogs > category).
export const categoryJsonLd = (site, { slug, name, intro, posts }) => {
  const url = `${site.siteUrl}/categories/${slug}`;
  const title = slug === "all" ? "All Blogs" : `${name} Blogs`;
  const crumbs = [
    { name: "Home", item: site.siteUrl },
    { name: "Blogs", item: `${site.siteUrl}/categories/all` },
    ...(slug === "all" ? [] : [{ name, item: url }]),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: title,
        description: intro,
        url,
        hasPart: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${site.siteUrl}${post.url}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })),
      },
    ],
  };
};

// Home: the website, and the person behind it with her profiles.
export const homeJsonLd = (site) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.title,
  url: site.siteUrl,
  description: site.description,
  author: {
    "@type": "Person",
    name: site.author,
    url: `${site.siteUrl}/about`,
    sameAs: [site.github, site.linkedin, site.instagram],
  },
});
