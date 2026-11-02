"use client";
import { useEffect, useRef, useState } from "react";
import { COMET_GRADIENTS } from "./CometField";

// A full-width divider drawn by a comet: the first time the band is fully on
// screen, the comet flies in from the left and stops with its head at the right
// edge, leaving its tail across the whole screen. It stays as a section break.
// Uses the ds-sweep keyframe (transform only). With reduced motion the global
// rule skips straight to the end, so the line just appears.
export function CometPass({ duration = 1.6, className }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setDrawn(true);
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
        className="absolute inset-x-0 top-[calc(50%-1.5px)] h-[3px] rounded-full shadow-[0_0_14px_rgba(24,204,252,.6)]"
        style={{
          background: COMET_GRADIENTS.beam,
          transform: "translate3d(-100%,0,0)",
          animation: drawn ? `ds-sweep ${duration}s cubic-bezier(.2,.7,.2,1) both` : undefined,
        }}
      />
    </div>
  );
}
