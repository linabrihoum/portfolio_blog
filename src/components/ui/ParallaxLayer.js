"use client";
import { useEffect, useRef } from "react";

// Moves its children slower (or faster) than the page as you scroll, for depth.
// speed 0 = stays with the section, 0.1 = distant stars, 0.3 = nebula.
// The parent section must be position: relative with overflow: hidden.
export function ParallaxLayer({ speed = 0.3, children, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const host = el.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "absolute", inset: "-15% 0", willChange: "transform", pointerEvents: "none", ...style }}
    >
      {children}
    </div>
  );
}
