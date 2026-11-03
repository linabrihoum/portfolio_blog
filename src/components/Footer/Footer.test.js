// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import siteMetadata from "@/src/utils/siteMetaData";
import Footer from "./index";

describe("Footer", () => {
  afterEach(cleanup);

  it("has no theme toggle, since the site is dark only", () => {
    render(<Footer />);
    expect(screen.queryByRole("button", { name: /theme/i })).toBeNull();
  });

  it("emails the one site address", () => {
    render(<Footer />);
    const email = screen.getByRole("link", { name: "Click here to email me for any inquiries!" });
    expect(email.getAttribute("href")).toBe(`mailto:${siteMetadata.email}`);
  });

  it("links to the social profiles", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /github/i }).getAttribute("href")).toBe(siteMetadata.github);
    expect(screen.getByRole("link", { name: /linkedin/i }).getAttribute("href")).toBe(siteMetadata.linkedin);
  });
});
