import { describe, expect, it } from "vitest";
import { extractHeadings } from "./toc";

describe("extractHeadings", () => {
  // The old regex read "# Fetch historical stock data" (a Python comment
  // inside a code block) as a heading, adding fake entries to the TOC.
  it("ignores # comments inside code blocks", () => {
    const markdown = [
      "## Setup",
      "```python",
      "# Fetch historical stock data",
      "## not a heading either",
      "```",
      "### Results",
    ].join("\n");

    expect(extractHeadings(markdown).map((h) => h.text)).toEqual(["Setup", "Results"]);
  });

  it("lists ## and ### headings only, with their level", () => {
    const markdown = "# Title\n## Intro\n### Detail\n#### Too deep";
    expect(extractHeadings(markdown)).toEqual([
      { level: 2, text: "Intro", slug: "intro" },
      { level: 3, text: "Detail", slug: "detail" },
    ]);
  });

  it("numbers repeated headings like the page does, counting the title too", () => {
    const markdown = "# Summary\n## Summary\n## Summary";
    expect(extractHeadings(markdown).map((h) => h.slug)).toEqual(["summary-1", "summary-2"]);
  });

  it("shows headings as plain text", () => {
    const markdown = "## Using `kubectl` with **[Argo CD](https://argo-cd.readthedocs.io)**";
    expect(extractHeadings(markdown)[0]).toMatchObject({ text: "Using kubectl with Argo CD", slug: "using-kubectl-with-argo-cd" });
  });

  it("handles Windows line endings", () => {
    expect(extractHeadings("## One\r\n## Two\r\n").map((h) => h.text)).toEqual(["One", "Two"]);
  });
});
