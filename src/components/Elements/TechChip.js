const TONES = {
  indigo: "text-[var(--indigo-300)] border-[rgba(141,120,255,.4)] bg-[rgba(141,120,255,.1)]",
  cyan: "text-[var(--cyan-300)] border-[rgba(24,204,252,.4)] bg-[rgba(24,204,252,.08)]",
  pink: "text-[#FFA3DF] border-[rgba(255,95,200,.4)] bg-[rgba(255,95,200,.08)]",
};

// Small pill naming a technology on project cards.
export function TechChip({ children, tone = "indigo" }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-1 text-xs font-semibold leading-snug ${TONES[tone]}`}>
      {children}
    </span>
  );
}
