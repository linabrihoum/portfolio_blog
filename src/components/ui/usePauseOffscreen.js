"use client";
import { useEffect, useRef } from "react";

// Pauses the CSS animations of an element's children while it's off screen,
// so stars and comets cost nothing when nobody can see them.
export function usePauseOffscreen() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      for (const child of el.children) {
        child.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
