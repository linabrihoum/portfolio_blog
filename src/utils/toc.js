import GithubSlugger from "github-slugger";

// "[text](url)" → "text", and drop * _ ` used for emphasis/code.
const plainText = (markdown) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();

// Table of contents for a post: its ## and ### headings ({ level, text, slug }).
// The title is already the page's H1, so # headings aren't listed. Lines inside
// ``` code blocks are skipped: Python and bash comments start with # too.
// Every heading is slugged in order, so repeated headings get the same -1, -2
// suffixes rehype-slug gives the matching ids on the page.
export function extractHeadings(markdown) {
  const slugger = new GithubSlugger();
  const headings = [];
  let inCode = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const level = match[1].length;
    const text = plainText(match[2]);
    const slug = slugger.slug(text);
    if (level === 2 || level === 3) headings.push({ level, text, slug });
  }
  return headings;
}
