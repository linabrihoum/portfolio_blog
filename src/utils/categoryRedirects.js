// Old category addresses that no longer exist, sent to the closest current
// category so old links and search results still work. Used by next.config.js.
const categoryRedirects = [
  // Categories retired in the 2026-11 re-tagging
  { source: "/categories/website-development", destination: "/categories/software", permanent: true },
  { source: "/categories/software-development", destination: "/categories/software", permanent: true },
  { source: "/categories/starting-out", destination: "/categories/career", permanent: true },
  // Junk duplicates the old page generated (devsecops-1 ... devsecops-9 and so on)
  {
    source: "/categories/:base(devsecops|artificial-intelligence)-:n(\\d+)",
    destination: "/categories/:base",
    permanent: true,
  },
  { source: "/categories/website-development-:n(\\d+)", destination: "/categories/software", permanent: true },
];

module.exports = categoryRedirects;
