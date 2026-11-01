// "Key takeaways" box at the top of a post (from the post's `takeaways` front matter).
export function KeyTakeaways({ items }) {
  if (!items?.length) return null;

  return (
    <aside
      aria-label="Key takeaways"
      className="not-prose relative mb-10 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[linear-gradient(135deg,rgba(99,68,245,.16),rgba(24,204,252,.06))] px-7 py-6"
    >
      <span aria-hidden="true" className="absolute left-7 right-1/2 top-0 h-0.5 bg-[image:var(--gradient-comet)]" />
      <h2 className="text-sm font-bold uppercase tracking-[.14em] text-[var(--cyan-300)]">Key takeaways</h2>
      <ul className="mt-3.5 grid gap-2.5">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[20px_1fr] gap-2.5 font-in text-[17px] leading-relaxed text-fg-1">
            <span
              aria-hidden="true"
              className="mt-[9px] h-2 w-2 rounded-full bg-[var(--cyan-500)] shadow-[0_0_8px_var(--cyan-500)]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
