// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { CometPass } from "./CometPass";

// Fake IntersectionObserver that lets the test say when the band is on screen.
let observers = [];
class FakeIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.disconnected = false;
    observers.push(this);
  }
  observe() {}
  disconnect() {
    this.disconnected = true;
  }
}

describe("CometPass", () => {
  beforeEach(() => {
    observers = [];
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("is decoration only, hidden from screen readers", () => {
    const { container } = render(<CometPass />);
    expect(container.firstChild.getAttribute("aria-hidden")).toBe("true");
  });

  it("waits off screen until the band is in view, then draws once and stays", () => {
    const { container } = render(<CometPass />);
    const comet = container.querySelector("span");
    expect(comet.style.animation).toBe("");

    act(() => observers[0].callback([{ isIntersecting: false }]));
    expect(comet.style.animation).toBe("");

    act(() => observers[0].callback([{ isIntersecting: true }]));
    // "both" keeps the end frame (the full-width line) after the animation ends
    expect(comet.style.animation).toMatch(/ds-sweep .* both/);
    expect(comet.style.animation).not.toContain("infinite");
    expect(observers[0].disconnected).toBe(true);
  });

  it("still shows the line in browsers without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<CometPass />);
    expect(container.querySelector("span").style.animation).toContain("ds-sweep");
  });
});
