"use client";
import { useEffect, useState } from "react";

// Thin bar under the header that fills as you read the element with id={targetId}.
export function ReadingProgress({ targetId }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const target = document.getElementById(targetId);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / scrollable)));
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
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="pointer-events-none fixed inset-x-0 top-16 z-[60] h-[3px]"
    >
      <div
        className="h-full rounded-r-sm bg-[linear-gradient(90deg,#AE48FF,#6344F5_60%,#18CCFC)] shadow-[0_0_10px_rgba(24,204,252,.7)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
