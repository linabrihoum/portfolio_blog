export const FLARES = {
  solar:
    "radial-gradient(55% 95% at 50% 100%, rgba(255,226,163,.85), rgba(255,122,61,.7) 20%, rgba(255,95,200,.5) 40%, rgba(174,72,255,.35) 60%, transparent 80%)",
  comet: "radial-gradient(60% 100% at 50% 100%, rgba(24,204,252,.5), rgba(99,68,245,.35) 45%, transparent 75%)",
  aurora: "radial-gradient(60% 100% at 50% 100%, rgba(92,242,176,.45), rgba(24,204,252,.25) 45%, transparent 75%)",
};

// A glowing planet curve rising from the bottom edge of a section. Its surface fades
// into the page color, so the next section continues seamlessly.
// planet={false} keeps only the glow, brightest along the section's bottom edge.
export function PlanetHorizon({ height = 260, flare = "solar", planet = true, className, style }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height, pointerEvents: "none", ...style }}
    >
      <div
        style={{
          position: "absolute",
          left: "-10%",
          right: "-10%",
          ...(planet ? { top: -height * 0.5, height: height * 1.1 } : { bottom: 0, height }),
          background: FLARES[flare] || FLARES.solar,
          filter: "blur(14px)",
        }}
      />
      {planet ? (
        <div
          style={{
            position: "absolute",
            left: "-70%",
            right: "-70%",
            top: height * 0.5,
            height: height * 8,
            borderRadius: "50%",
            background: "linear-gradient(180deg, #2E57C9 0%, #1A2F8A 3%, #141137 9%, var(--surface-page) 16%)",
            boxShadow:
              "0 -2px 0 rgba(143,230,254,.9), 0 -10px 40px rgba(24,204,252,.45), 0 -40px 120px rgba(99,68,245,.35)",
          }}
        />
      ) : null}
    </div>
  );
}
