"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Scroll progress for an element: 0 when its top enters the bottom of the
// screen, 1 when its bottom reaches the middle. framer-motion tracks this
// without re-rendering React on every scroll event.
function useProgress(ref) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  return scrollYProgress;
}

// Ring that fills with cyan as its entry scrolls into view. Offsets put the
// ring's centre on the line (line at 38px; the ring sits 37.5px into the
// rotated SVG, which starts 16px in, past the list padding).
function Marker({ progress }) {
  return (
    <figure aria-hidden="true" className="absolute -left-[15.5px] -top-[3px] m-0">
      <svg width="75" height="75" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="75" cy="50" r="20" fill="none" stroke="var(--indigo-300)" strokeWidth="1" />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          fill="var(--space-900)"
          stroke="var(--cyan-500)"
          strokeWidth="5"
          style={{ pathLength: progress, filter: "drop-shadow(0 0 4px rgba(24,204,252,.8))" }}
        />
        <circle cx="75" cy="50" r="10" fill="var(--violet-500)" className="animate-[ds-pulse_2s_cubic-bezier(.4,0,.6,1)_infinite]" />
      </svg>
    </figure>
  );
}

export function TimelineItem({ title, subtitle, org, time, body }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const progress = useProgress(ref);
  // The text rises and brightens over the first half of the scroll
  const y = useTransform(progress, [0, 0.5], [50, 0]);
  const opacity = useTransform(progress, [0, 0.5], [0.3, 1]);

  return (
    <li ref={ref} className="relative mb-16 list-none pl-[72px] last:mb-0">
      <Marker progress={reduce ? 1 : progress} />
      <motion.div style={reduce ? undefined : { y, opacity }}>
        <h3 className="text-2xl font-bold capitalize leading-[1.33] text-[var(--text-heading)]">
          {title}
          {org ? <span className="text-[var(--accent)]">&nbsp;@{org}</span> : null}
        </h3>
        {subtitle ? <h4 className="mt-0.5 text-xl font-bold text-fg-1">{subtitle}</h4> : null}
        {time ? <span className="mt-1 block font-medium capitalize text-[var(--cyan-300)]">{time}</span> : null}
        {body ? <p className="mt-2 font-medium leading-relaxed text-[var(--text-body)]">{body}</p> : null}
      </motion.div>
    </li>
  );
}

// A titled list of TimelineItems along a cyan → indigo → violet line that grows as you scroll.
export function Timeline({ title, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const progress = useProgress(ref);

  return (
    <section className="my-24">
      <h2 className="mb-16 text-center text-4xl font-bold capitalize text-[var(--text-heading)] sm:text-5xl md:mb-24 lg:text-6xl">
        {title}
      </h2>
      <div ref={ref} className="relative mx-auto w-[90%] max-w-[900px] md:w-3/4">
        <motion.div
          aria-hidden="true"
          className="absolute left-9 top-0 h-full w-1 origin-top rounded bg-[linear-gradient(180deg,#18CCFC,#6344F5_50%,#AE48FF)] shadow-[0_0_12px_rgba(99,68,245,.6)]"
          style={{ scaleY: reduce ? 1 : progress }}
        />
        <ul className="m-0 pl-4">{children}</ul>
      </div>
    </section>
  );
}
