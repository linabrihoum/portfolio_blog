import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Starfield } from "./Starfield";
import { CometField } from "./CometField";

// The server and the browser must draw the same layout, or React reports a hydration mismatch.
describe("space layers", () => {
  it("draw the same stars every time for the same seed", () => {
    const first = renderToString(<Starfield density={20} twinkle={4} seed={11} />);
    const second = renderToString(<Starfield density={20} twinkle={4} seed={11} />);
    expect(first).toBe(second);
    expect(first).not.toBe(renderToString(<Starfield density={20} twinkle={4} seed={12} />));
  });

  it("draw the same comets every time for the same seed", () => {
    expect(renderToString(<CometField count={6} seed={21} />)).toBe(
      renderToString(<CometField count={6} seed={21} />)
    );
  });

  it("render the requested number of stars and comets", () => {
    const stars = renderToString(<Starfield density={20} twinkle={4} seed={1} />);
    expect(stars.match(/<span/g)).toHaveLength(24);
    const comets = renderToString(<CometField count={6} seed={1} />);
    expect(comets.match(/<span/g)).toHaveLength(6);
  });
});
