import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { seededRandom } from "@/src/utils/seededRandom";
import { COMET_GRADIENTS } from "../ui/cometGradients";
import { NEBULA_PRESETS } from "../ui/Nebula";
import { FLARES } from "../ui/PlanetHorizon";

// Link preview images (Open Graph): the size every site that shows previews expects.
export const OG_SIZE = { width: 1200, height: 630 };

// The image renderer can't read CSS variables, so these copy the values from
// src/styles/colors.css.
export const OG_COLORS = {
  sky: "linear-gradient(180deg,#080717 0%,#0E0C26 45%,#1A1647 100%)",
  heading: "#F5F3FF",
  body: "#C3BDEB",
  muted: "#8E88C2",
  cyan: "#8FE6FE",
};

const fontsDir = join(process.cwd(), "src/assets/fonts");

// Manrope, the site's heading font. Read once per build, shared by every image.
export const loadOgFonts = async () => [
  { name: "Manrope", data: await readFile(join(fontsDir, "manrope-latin-500-normal.woff")), weight: 500 },
  { name: "Manrope", data: await readFile(join(fontsDir, "manrope-latin-800-normal.woff")), weight: 800 },
];

const nebula = NEBULA_PRESETS.dusk
  .map(([color, x, y, r]) => `radial-gradient(${r}% ${r * 0.8}% at ${x}% ${y}%, ${color}80 0%, transparent 70%)`)
  .join(",");

// A still frame of the home page hero: stars, comets, the dusk nebula and the
// glowing planet horizon. The same seed always draws the same sky.
export function SpaceCard({ seed = 4, background, children }) {
  const random = seededRandom(seed);
  const stars = Array.from({ length: 90 }, () => ({
    x: random() * OG_SIZE.width,
    y: random() * (OG_SIZE.height - 120),
    size: random() < 0.15 ? 3 : 2,
    opacity: 0.3 + random() * 0.6,
  }));
  // Comets stay in the top strip so they never cross the text
  const comets = Array.from({ length: 5 }, () => ({
    x: random() * OG_SIZE.width,
    y: 30 + random() * 90,
    length: 120 + random() * 120,
  }));

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundImage: OG_COLORS.sky,
        fontFamily: "Manrope",
        overflow: "hidden",
      }}
    >
      {background}
      <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: nebula, opacity: 0.6 }} />
      {stars.map((star, i) => (
        <div
          key={`s${i}`}
          style={{
            position: "absolute",
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "#F5F3FF",
            opacity: star.opacity,
          }}
        />
      ))}
      {comets.map((comet, i) => (
        <div
          key={`c${i}`}
          style={{
            position: "absolute",
            left: comet.x,
            top: comet.y,
            width: comet.length,
            height: 2,
            borderRadius: 2,
            backgroundImage: COMET_GRADIENTS.beam,
            transform: "rotate(32deg)",
            transformOrigin: "100% 50%",
          }}
        />
      ))}
      {/* Sunrise glow, then the planet's curved edge */}
      {/* Exactly card-wide: the renderer cuts off anything past the right edge */}
      <div style={{ position: "absolute", left: 0, top: OG_SIZE.height - 300, width: OG_SIZE.width, height: 300, display: "flex", backgroundImage: FLARES.solar }} />
      <div
        style={{
          position: "absolute",
          left: -900,
          top: OG_SIZE.height - 70,
          width: OG_SIZE.width + 1800,
          height: 1600,
          borderRadius: "50%",
          backgroundImage: "linear-gradient(180deg, #2E57C9 0%, #1A2F8A 3%, #141137 9%, #0E0C26 16%)",
          boxShadow: "0 -2px 0 rgba(143,230,254,.9), 0 -10px 40px rgba(24,204,252,.45), 0 -40px 120px rgba(99,68,245,.35)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "64px 80px 110px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
