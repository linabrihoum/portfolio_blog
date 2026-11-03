"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Diagram or screenshot in a post; click to see it full screen, click or Esc to close.
// <Figure src="/blogs/cap-diagram.png" alt="..." caption="..." width={1200} height={800} />
export function Figure({ src, alt, caption, width, height }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <figure className="not-prose my-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${alt}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-space-800"
      >
        <Image src={src} alt={alt} width={width} height={height} className="block h-auto w-full" />
      </button>
      {caption && <figcaption className="mt-2.5 text-center text-sm text-[var(--text-muted)]">{caption}</figcaption>}
      {open && (
        <div
          role="dialog"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center bg-[rgba(5,4,15,.88)] p-10 backdrop-blur-[6px] [animation:ds-reveal_.3s_var(--ease-out)_both]"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="max-h-full max-w-full rounded-xl object-contain shadow-[var(--shadow-glow-indigo)]"
          />
        </div>
      )}
    </figure>
  );
}
