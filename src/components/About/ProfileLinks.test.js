// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import siteMetadata from "@/src/utils/siteMetaData";
import { ProfileLinks } from "./ProfileLinks";

describe("ProfileLinks", () => {
  afterEach(cleanup);

  it("links each card to the profile in siteMetadata", () => {
    render(<ProfileLinks />);
    const cards = screen.getAllByRole("link").map((link) => [link.querySelector(".text-xl").textContent, link.getAttribute("href")]);
    expect(cards).toEqual([
      ["Credly", siteMetadata.credly],
      ["GitHub", siteMetadata.github],
      ["LinkedIn", siteMetadata.linkedin],
      ["Instagram", siteMetadata.instagram],
    ]);
  });

  it("points Credly at the real profile, not the design placeholder", () => {
    expect(siteMetadata.credly).toBe("https://www.credly.com/users/lina-brihoum");
  });

  it("opens profiles in a new tab without giving them access to this page", () => {
    render(<ProfileLinks />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });
});
