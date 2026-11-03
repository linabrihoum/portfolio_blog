"use client";
import { useMemo } from "react";
import { seededRandom } from "@/src/utils/seededRandom";
import { usePauseOffscreen } from "./usePauseOffscreen";

export const COMET_GRADIENTS = {
  beam: "linear-gradient(90deg,rgba(174,72,255,0) 0%,#6344F5 55%,#18CCFC 92%,#E6FAFF 100%)",
  pink: "linear-gradient(90deg,rgba(174,72,255,0),#FF5FC8 75%,#FFE6F7)",
  aurora: "linear-gradient(90deg,rgba(92,242,176,0),#5CF2B0 70%,#F5F3FF)",
};

// Diagonal comet streaks in the old BackgroundBeams colors (cyan → indigo → violet),
// about 1 in 5 pink. Uses the ds-comet keyframe from src/styles/motion.css.
export function CometField({
  count = 18,
  angle = 32,
  minDuration = 6,
  maxDuration = 14,
  seed = 7,
  palette = "beam",
  glow = true,
  className,
  style,
}) {
  const ref = usePauseOffscreen();

  const comets = useMemo(() => {
    const random = seededRandom(seed);
    return Array.from({ length: count }, () => ({
      top: random() * 110 - 30,
      left: random() * 60 - 50,
      length: 120 + random() * 260,
      width: random() < 0.25 ? 3 : 2,
      duration: minDuration + random() * (maxDuration - minDuration),
      delay: -random() * maxDuration,
      pink: random() < 0.22,
    }));
  }, [count, seed, minDuration, maxDuration]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", ...style }}
    >
      {comets.map((comet, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: `${comet.top}%`,
            left: `${comet.left}%`,
            width: comet.length,
            height: comet.width,
            borderRadius: 9999,
            background: palette === "aurora" ? COMET_GRADIENTS.aurora : comet.pink ? COMET_GRADIENTS.pink : COMET_GRADIENTS.beam,
            transformOrigin: "100% 50%",
            boxShadow: glow
              ? comet.pink
                ? "0 0 10px rgba(255,95,200,.6)"
                : "0 0 10px rgba(24,204,252,.5)"
              : "none",
            "--comet-angle": `${angle}deg`,
            "--comet-travel": "160vw",
            animation: `ds-comet ${comet.duration}s linear ${comet.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
