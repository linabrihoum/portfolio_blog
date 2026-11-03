export const NEBULA_PRESETS = {
  dusk: [["#6344F5", 20, 30, 55], ["#AE48FF", 80, 20, 45], ["#18CCFC", 60, 90, 40]],
  horizon: [["#FF7A3D", 50, 105, 40], ["#AE48FF", 50, 90, 60], ["#6344F5", 15, 20, 40]],
  aurora: [["#5CF2B0", 75, 30, 35], ["#18CCFC", 30, 60, 45], ["#6344F5", 80, 90, 40]],
};

// Soft colored glow behind a section. Keep intensity at 0.5 or below so text stays readable.
export function Nebula({ preset = "dusk", intensity = 0.35, className, style }) {
  const blobs = NEBULA_PRESETS[preset] || NEBULA_PRESETS.dusk;
  const backgroundImage = blobs
    .map(([color, x, y, r]) => `radial-gradient(${r}% ${r * 0.8}% at ${x}% ${y}%, ${color} 0%, transparent 70%)`)
    .join(",");

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage, opacity: intensity, filter: "blur(20px)", ...style }}
    />
  );
}
