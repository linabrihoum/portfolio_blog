// Lighthouse CI: Google's page-speed audit, run on every PR (mobile settings).
// Limits are based on the live site's scores on 2026-11-01, so today's site
// passes but anything clearly slower fails. Tighten them as the redesign improves things.
module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      startServerReadyPattern: "Ready",
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/about",
        "http://localhost:3000/projects",
        "http://localhost:3000/contact",
        "http://localhost:3000/categories/all",
        "http://localhost:3000/blogs/gitops",
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // Overall score out of 1: home is 0.68 today, the other pages 0.78-0.96
        "categories:performance": ["error", { minScore: 0.6 }],
        // Things jumping around while the page loads (blog list is 0.11 today)
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.15 }],
        // Time the page is too busy to respond, in ms (about 0 today)
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
        // When the main content shows up, in ms (home is 7.3 s on a slow phone today)
        "largest-contentful-paint": ["error", { maxNumericValue: 9000 }],
      },
    },
    upload: {
      // Puts each report online for 7 days and prints the link in the CI log
      target: "temporary-public-storage",
    },
  },
};
