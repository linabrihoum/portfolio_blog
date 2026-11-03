// Checks the built link preview images (run after `npm run build`).
//
// Each one must be built ahead of time, and its server function must include
// the font files: on Vercel a missing font made every post's preview fail,
// even though the same images worked on a local machine.
//
// Usage: npm run build && npm run check:previews
import { existsSync, readdirSync, readFileSync } from "node:fs";

const FONTS = ["manrope-latin-500-normal.woff", "manrope-latin-800-normal.woff"];
const posts = readdirSync("content");
const problems = [];

const builtImages = [".next/server/app/opengraph-image.body", ...posts.map((slug) => `.next/server/app/blogs/${slug}/opengraph-image.body`)];
for (const file of builtImages) {
  if (!existsSync(file)) problems.push(`not built ahead of time: ${file}`);
}

for (const trace of [".next/server/app/opengraph-image/route.js.nft.json", ".next/server/app/blogs/[slug]/opengraph-image/route.js.nft.json"]) {
  const files = existsSync(trace) ? JSON.parse(readFileSync(trace, "utf8")).files : [];
  for (const font of FONTS) {
    if (!files.some((file) => file.endsWith(font))) problems.push(`${font} missing from ${trace}`);
  }
}

if (problems.length > 0) {
  console.error(problems.map((problem) => `✗ ${problem}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${builtImages.length} link preview images built, fonts included`);
