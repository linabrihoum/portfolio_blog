// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BlogList } from "./BlogList";

class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const card = (title, tags, description = "") => ({
  url: `/blogs/${title.toLowerCase().replaceAll(" ", "-")}`,
  title,
  description,
  tags,
  publishedAt: "2025-01-20T00:00:00.000Z",
  image: { filePath: "../public/blogs/gitops.jpg", width: 1200, height: 800, blurhashDataUrl: "data:image/png;base64,AA==" },
});

const posts = [
  card("GitOps", ["DevSecOps"], "ArgoCD and Flux"),
  card("Networking Essentials", ["Cloud"]),
  card("Terraform vs Bicep", ["DevSecOps"]),
];

const search = (text) => fireEvent.change(screen.getByRole("searchbox"), { target: { value: text } });
const titles = () => screen.queryAllByRole("heading", { level: 2 }).map((h) => h.textContent);

describe("BlogList", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    render(<BlogList posts={posts} categoryBar={<nav>categories</nav>} />);
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows every post and the count before searching", () => {
    expect(titles()).toHaveLength(3);
    expect(screen.getByText("3 posts")).toBeTruthy();
  });

  it("filters as you type, matching the description too", () => {
    search("argocd");
    expect(titles()).toEqual(["GitOps"]);
    expect(screen.getByText("1 post")).toBeTruthy();
  });

  it("shows the empty state and can clear the search", () => {
    search("kubernetes");
    expect(screen.getByText("No posts found in this corner of space :(")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "clear the search" }));
    expect(titles()).toHaveLength(3);
  });
});
