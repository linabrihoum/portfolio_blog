// Posts whose address changed, sent permanently to the new one so old links and
// search results still work. Used by next.config.js.
const postRedirects = [
  // Renamed to match its title, "Becoming a DevSecOps Architect" (2026-11)
  {
    source: "/blogs/becoming-a-cloud-engineer",
    destination: "/blogs/becoming-a-devsecops-architect",
    permanent: true,
  },
];

module.exports = postRedirects;
