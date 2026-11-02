// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import projects from "./projectsData";
import { ProjectSection } from "./ProjectSection";

// jsdom has no IntersectionObserver, which Reveal and the stars use.
class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("ProjectSection", () => {
  beforeEach(() => vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver));
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  const titles = (region) => within(region).getAllByRole("heading").map((h) => h.textContent);
  const byId = (list) => [...list].sort((a, b) => a.id - b.id).map((p) => p.title);

  it("has one page title", () => {
    render(<ProjectSection projects={projects} />);
    expect(screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent)).toEqual(["Projects"]);
  });

  it("puts featured projects in the spotlight and the rest in the grid, in id order", () => {
    render(<ProjectSection projects={projects} />);
    expect(titles(screen.getByRole("region", { name: "Featured projects" }))).toEqual(byId(projects.filter((p) => p.featured)));
    expect(titles(screen.getByRole("region", { name: "More projects" }))).toEqual(byId(projects.filter((p) => !p.featured)));
  });

  it("links every project to its source in a new tab, without giving it access to this page", () => {
    render(<ProjectSection projects={projects} />);
    const links = screen.getAllByRole("link", { name: "View Source" });
    expect(links.map((link) => link.getAttribute("href")).sort()).toEqual(projects.map((p) => p.link).sort());
    for (const link of links) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });
});
