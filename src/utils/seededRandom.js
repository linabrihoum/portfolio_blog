// A tiny random number generator that always produces the same numbers for
// the same seed. The starfield and comets use it so the server and the browser
// draw identical layouts (otherwise React reports a hydration mismatch).
export function seededRandom(seed) {
  let state = seed >>> 0 || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
