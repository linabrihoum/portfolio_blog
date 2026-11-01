// JSON-LD ("structured data") that tells search engines what a page is about.

// Blog post: the article itself (author linked to /about), plus Home > category > post.
export const blogPostingJsonLd = (site, blog, { categoryName, categorySlug, imageUrl }) => {
  const url = `${site.siteUrl}${blog.url}`;
  const author = { "@type": "Person", name: blog.author || site.author, url: `${site.siteUrl}/about` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        image: [imageUrl],
        datePublished: new Date(blog.publishedAt).toISOString(),
        dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
        mainEntityOfPage: url,
        keywords: blog.tags.join(", "),
        author,
        publisher: author,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", item: site.siteUrl },
          { name: categoryName, item: `${site.siteUrl}/categories/${categorySlug}` },
          { name: blog.title, item: url },
        ].map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })),
      },
    ],
  };
};

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
