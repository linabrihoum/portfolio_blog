// JSON-LD ("structured data") that tells search engines what a page is about.

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
