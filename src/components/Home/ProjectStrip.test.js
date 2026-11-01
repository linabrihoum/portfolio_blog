// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import projects from "../Projects/projectsData";
import { ProjectStrip } from "./ProjectStrip";

// jsdom has no IntersectionObserver, which the scroll fade-in (Reveal) uses.
class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("ProjectStrip", () => {
  beforeEach(() => vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver));
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows only the featured projects, linking to their source", () => {
    render(<ProjectStrip projects={projects} />);
    const featured = projects.filter((project) => project.featured);

    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(
      featured.map((project) => project.title)
    );
    expect(screen.getByRole("link", { name: new RegExp(featured[0].title) }).getAttribute("href")).toBe(
      featured[0].link
    );
  });

  it("links to the full projects page", () => {
    render(<ProjectStrip projects={projects} />);
    expect(screen.getByRole("link", { name: "see all" }).getAttribute("href")).toBe("/projects");
  });
});
