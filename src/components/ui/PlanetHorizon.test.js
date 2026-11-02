// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { PlanetHorizon } from "./PlanetHorizon";

describe("PlanetHorizon", () => {
  afterEach(cleanup);

  it("draws the glow and the planet by default (home page)", () => {
    const { container } = render(<PlanetHorizon height={200} />);
    expect(container.firstChild.children).toHaveLength(2);
  });

  it("draws only the glow, anchored to the bottom edge, without the planet (About)", () => {
    const { container } = render(<PlanetHorizon planet={false} height={220} />);
    const layers = container.firstChild.children;
    expect(layers).toHaveLength(1);
    expect(layers[0].style.bottom).toBe("0px");
    expect(layers[0].style.height).toBe("220px");
  });
});
