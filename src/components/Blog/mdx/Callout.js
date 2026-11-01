const KINDS = {
  note: { label: "Note", color: "#8D78FF", background: "rgba(99,68,245,.12)", glyph: "i" },
  tip: { label: "Tip", color: "#5CF2B0", background: "rgba(92,242,176,.08)", glyph: "✦" },
  warning: { label: "Warning", color: "#FFB547", background: "rgba(255,181,71,.09)", glyph: "!" },
  danger: { label: "Careful", color: "#FF5A7A", background: "rgba(255,90,122,.09)", glyph: "!" },
};

// Aside box for posts: <Callout kind="tip" title="Start small">...</Callout>
export function Callout({ kind = "note", title, children }) {
  const style = KINDS[kind] || KINDS.note;

  return (
    <div
      role="note"
      className="not-prose my-7 grid grid-cols-[28px_1fr] gap-3.5 rounded-xl px-5 py-[18px] font-in text-base leading-relaxed text-fg-1"
      style={{ background: style.background, border: `1px solid ${style.color}55` }}
    >
      <span
        aria-hidden="true"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold text-[#0E0C26]"
        style={{ background: style.color, boxShadow: `0 0 14px ${style.color}88` }}
      >
        {style.glyph}
      </span>
      <div>
        <div className="mb-1 font-mr text-[15px] font-bold" style={{ color: style.color }}>
          {title || style.label}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
