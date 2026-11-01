import Link from "next/link";

// "split": section title on the left, a small link ("view all") on the right.
// Otherwise: a centered page title with an optional subtitle and comet bar.
export function SectionHeading({ title, subtitle, align = "center", linkLabel, linkHref, bar = true }) {
  if (align === "split") {
    return (
      <div className="flex w-full items-baseline justify-between gap-4">
        <h2 className="font-bold capitalize text-2xl md:text-4xl leading-snug text-fg-1">{title}</h2>
        {linkLabel && (
          <Link
            href={linkHref}
            className="whitespace-nowrap font-medium text-base md:text-lg text-[var(--text-link)] underline underline-offset-2 hover:text-[var(--text-link-hover)]"
          >
            {linkLabel}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-[-0.02em] text-fg-1 [text-wrap:balance]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-[var(--text-body)] [text-wrap:pretty]">
          {subtitle}
        </p>
      )}
      {bar && <span className="mt-6 inline-block h-1 w-24 rounded-full bg-[image:var(--gradient-comet)]" />}
    </div>
  );
}
