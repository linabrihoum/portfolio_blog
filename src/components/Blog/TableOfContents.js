"use client";
import { useEffect, useState } from "react";
import { cx } from "@/src/utils";

// Tracks which section you're reading: the last heading that has scrolled
// past the top of the screen (just under the header).
function useActiveHeading(items) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.slug;
      for (const item of items) {
        const heading = document.getElementById(item.slug);
        if (heading && heading.getBoundingClientRect().top < 140) current = item.slug;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return active;
}

// compact = the phone version: a pill that shows the current section and opens the list.
export function TableOfContents({ items, compact = false }) {
  const active = useActiveHeading(items);
  const [open, setOpen] = useState(!compact);
  const activeIndex = Math.max(0, items.findIndex((item) => item.slug === active));

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cx(
        "max-h-[80vh] overflow-y-auto border border-[var(--border-strong)] bg-[rgba(20,17,55,.6)] text-fg-1 backdrop-blur-[10px]",
        compact ? "rounded-3xl px-[18px] py-2.5" : "rounded-lg p-4"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className={cx(
          "flex w-full items-center justify-between gap-3 text-left font-semibold capitalize",
          compact ? "text-[15px]" : "text-lg"
        )}
      >
        <span className="truncate">
          {compact && !open ? `On this page: ${items[activeIndex].text}` : "Table of contents"}
        </span>
        <span aria-hidden="true" className={cx("text-xs text-fg-3 transition-transform duration-300", open && "rotate-180")}>
          ▼
        </span>
      </button>

      {open && (
        <ul className="relative mt-4 pl-3.5 font-in text-[15px]">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 rounded-sm bg-[var(--border-subtle)]" />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 w-0.5 rounded-sm bg-[linear-gradient(180deg,#AE48FF,#6344F5,#18CCFC)] shadow-[0_0_8px_rgba(24,204,252,.7)] transition-[height] duration-300 ease-out"
            style={{ height: `${((activeIndex + 1) / items.length) * 100}%` }}
          />
          {items.map((item) => {
            const isActive = item.slug === active;
            return (
              <li key={item.slug} className="py-[5px]">
                <a
                  href={`#${item.slug}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => compact && setOpen(false)}
                  className={cx(
                    "flex items-center gap-2 transition-colors duration-200",
                    item.level === 3 && "pl-4",
                    isActive ? "font-semibold text-[var(--cyan-300)]" : item.level === 3 ? "text-fg-3" : "text-[var(--text-body)]"
                  )}
                >
                  {item.level === 3 && (
                    <span
                      className={cx("h-1 w-1 flex-none rounded-full", isActive ? "bg-[var(--cyan-500)]" : "bg-fg-3")}
                    />
                  )}
                  <span>{item.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
