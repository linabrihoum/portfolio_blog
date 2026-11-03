import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import postRedirects from "./postRedirects";

const postExists = (url) => existsSync(`content/${url.replace("/blogs/", "")}/index.mdx`);

describe("postRedirects", () => {
  it.each(postRedirects)("sends $source to a post that exists, permanently", ({ source, destination, permanent }) => {
    expect(postExists(destination)).toBe(true);
    // The old address must not still be a post, or it would never redirect
    expect(postExists(source)).toBe(false);
    expect(permanent).toBe(true);
  });
});
