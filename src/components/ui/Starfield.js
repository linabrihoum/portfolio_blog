"use client";
import { useMemo } from "react";
import { seededRandom } from "@/src/utils/seededRandom";
import { usePauseOffscreen } from "./usePauseOffscreen";

const TINTS = ["#F5F3FF", "#B9ACFF", "#8FE6FE", "#F5F3FF", "#D7A6FF"];

// Static dots plus a few twinkling ones. Place inside a relative, overflow-hidden section.
export function Starfield({ density = 140, twinkle = 18, seed = 3, tint = true, className, style }) {
  const ref = usePauseOffscreen();

  const { stars, twinklers } = useMemo(() => {
    const random = seededRandom(seed);
    const colors = tint ? TINTS : ["#F5F3FF"];
    const stars = Array.from({ length: density }, () => ({
      x: (random() * 100).toFixed(2),
      y: (random() * 100).toFixed(2),
      color: colors[Math.floor(random() * colors.length)],
      opacity: (0.35 + random() * 0.65).toFixed(2),
      big: random() < 0.12,
    }));
    const twinklers = Array.from({ length: twinkle }, () => ({
      x: random() * 100,
      y: random() * 100,
      size: 2 + random() * 2.5,
      duration: 2 + random() * 4,
      delay: -random() * 5,
    }));
    return { stars, twinklers };
  }, [density, twinkle, seed, tint]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", ...style }}
    >
      {stars.map((star, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.big ? 2 : 1,
            height: star.big ? 2 : 1,
            borderRadius: 9999,
            background: star.color,
            opacity: star.opacity,
          }}
        />
      ))}
      {twinklers.map((star, i) => (
        <span
          key={`t${i}`}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: 9999,
            background: "#F5F3FF",
            boxShadow: "0 0 6px 1px rgba(185,172,255,.8)",
            animation: `ds-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
