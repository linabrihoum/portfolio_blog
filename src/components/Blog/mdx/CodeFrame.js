"use client";
import { Children, useRef, useState } from "react";

const TITLE = "data-rehype-pretty-code-title";

// Wraps a highlighted code block from rehype-pretty-code with the design's header:
// window dots, the filename (from ```yaml title="app.yaml") or the language, and Copy.
export function CodeFrame({ children }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const parts = Children.toArray(children);
  const title = parts.find((part) => part.props?.[TITLE] !== undefined);
  const code = parts.filter((part) => part !== title);
  const language = code[0]?.props?.["data-language"];

  const copy = async () => {
    try {
      // innerText skips the CSS line numbers, so only the code is copied
      await navigator.clipboard.writeText(codeRef.current.querySelector("code").innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="code-frame not-prose my-7 overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[#0d1117]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] bg-[rgba(185,172,255,.06)] py-2 pl-4 pr-2">
        <span className="flex items-center gap-2.5 font-mono text-[13px] font-semibold text-fg-2">
          <span aria-hidden="true" className="flex gap-1.5">
            {["#FF5F57", "#FEBC2E", "#28C840"].map((color) => (
              <i key={color} className="h-2.5 w-2.5 rounded-full opacity-85" style={{ background: color }} />
            ))}
          </span>
          {title?.props.children ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className={
            copied
              ? "rounded-md border border-[var(--border-strong)] bg-[rgba(92,242,176,.15)] px-2.5 py-1 text-xs font-semibold text-[var(--aurora)]"
              : "rounded-md border border-[var(--border-strong)] px-2.5 py-1 text-xs font-semibold text-fg-2 transition-colors hover:text-fg-1"
          }
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div ref={codeRef}>{code}</div>
    </figure>
  );
}
