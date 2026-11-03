// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import Header from "./index";

vi.mock("next/navigation", () => ({ usePathname: () => "/blogs/gitops" }));

describe("Header", () => {
  afterEach(() => {
    cleanup();
    window.scrollY = 0;
  });

  it("is transparent at the top and turns to glass after scrolling", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    expect(header.dataset.scrolled).toBe("false");

    act(() => {
      window.scrollY = 20;
      fireEvent.scroll(window);
    });

    expect(header.dataset.scrolled).toBe("true");
  });

  it("marks Blogs as active on a blog post", () => {
    render(<Header />);
    const blogs = screen.getAllByRole("link", { name: "Blogs" })[0];
    expect(blogs.querySelector("span").className).toContain("w-full");
    const about = screen.getAllByRole("link", { name: "About" })[0];
    expect(about.querySelector("span").className).toContain("w-0");
  });

  // The header's glass blur traps full-screen children inside the header,
  // so after scrolling the menu only covered the header strip.
  it("draws the mobile menu outside the header so it covers the whole screen", () => {
    const { container } = render(<Header />);
    act(() => {
      window.scrollY = 20;
      fireEvent.scroll(window);
    });
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    const menuLink = screen.getAllByRole("link", { name: "Projects" }).at(-1);
    const overlay = menuLink.closest(".fixed");
    expect(overlay.parentElement).toBe(document.body);
    expect(container.querySelector("header").contains(overlay)).toBe(false);
  });

  it("opens and closes the mobile menu", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toBeTruthy();
  });
});
