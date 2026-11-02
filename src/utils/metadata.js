// Next.js replaces nested metadata (like `alternates`) instead of merging it, so a
// page that sets its canonical URL would drop the layout's RSS link. Every page
// builds its `alternates` here to keep both.
const FEED = { "application/rss+xml": "/feed.xml" };

export const alternatesFor = (path) => (path ? { canonical: path, types: FEED } : { types: FEED });
