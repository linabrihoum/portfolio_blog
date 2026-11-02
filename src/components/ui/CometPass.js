"use client";
import { useEffect, useRef, useState } from "react";
import { COMET_GRADIENTS } from "./CometField";

const LENGTH = 320;

// A thin band that one comet streaks across, left to right, the first time the
// band is fully on screen. Uses the ds-comet keyframe (transform/opacity only).
// With reduced motion the global rule shortens the animation to nothing, so the
// comet never shows.
export function CometPass({ duration = 1.8, className }) {
  const ref = useRef(null);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setFlying(true);
        observer.disconnect();
      },
      { threshold: 1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none relative h-16 overflow-hidden ${className ?? ""}`}>
      <span
        className="absolute top-[calc(50%-1.5px)] h-[3px] rounded-full shadow-[0_0_14px_rgba(24,204,252,.7)]"
        style={{
          left: -LENGTH,
          width: LENGTH,
          background: COMET_GRADIENTS.beam,
          "--comet-angle": "0deg",
          "--comet-travel": `calc(100vw + ${LENGTH}px)`,
          animation: flying ? `ds-comet ${duration}s cubic-bezier(.3,0,.7,1) both` : undefined,
        }}
      />
    </div>
  );
}
