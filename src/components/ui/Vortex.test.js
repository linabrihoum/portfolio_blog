// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Vortex } from "./Vortex";

// jsdom can't draw, so give the component a canvas context that does nothing.
const fakeContext = new Proxy({}, { get: (target, key) => target[key] ?? vi.fn(), set: () => true });

describe("Vortex", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // It used to keep animating forever after you left the Contact page.
  it("stops its animation loop and resize listener when it unmounts", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(fakeContext);
    const requestFrame = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(42);
    const cancelFrame = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
    const removeListener = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<Vortex particleCount={10} />);
    expect(requestFrame).toHaveBeenCalled();

    unmount();

    expect(cancelFrame).toHaveBeenCalledWith(42);
    expect(removeListener).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  // Blurring and re-drawing the whole canvas every frame made Contact stutter
  // 97% of the time at phone speed. Each frame should only draw the particles.
  it("draws particles without full-screen blur or copy passes", () => {
    const filters = [];
    const drawImage = vi.fn();
    const stroke = vi.fn();
    const context = new Proxy(
      { drawImage, stroke },
      {
        get: (target, key) => target[key] ?? vi.fn(),
        set: (target, key, value) => {
          if (key === "filter") filters.push(value);
          return true;
        },
      }
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context);
    vi.spyOn(window, "requestAnimationFrame").mockReturnValue(1);

    render(<Vortex particleCount={10} />);

    expect(stroke).toHaveBeenCalled();
    expect(drawImage).not.toHaveBeenCalled();
    expect(filters).toEqual([]);
  });
});
