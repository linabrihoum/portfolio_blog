// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HideOnContact } from "./HideOnContact";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

describe("HideOnContact", () => {
  afterEach(cleanup);

  it("hides the footer on the Contact page", () => {
    pathname = "/contact";
    render(<HideOnContact><footer>footer</footer></HideOnContact>);
    expect(screen.queryByText("footer")).toBeNull();
  });

  it("shows the footer everywhere else", () => {
    pathname = "/about";
    render(<HideOnContact><footer>footer</footer></HideOnContact>);
    expect(screen.getByText("footer")).toBeTruthy();
  });
});
