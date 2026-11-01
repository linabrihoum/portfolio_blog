import { Reveal } from "../ui/Reveal";

const GROUPS = [
  { label: "Experience", items: ["IBM"] },
  { label: "Education", items: ["Georgia Tech"] },
];

// "A little about me": names set as type (no logos), glowing on hover.
export function CredibilityRow() {
  return (
    <section className="pt-24 pb-8">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 md:px-16">
        <Reveal>
          <div className="relative border-y border-[var(--border-subtle)] py-10">
            <span aria-hidden="true" className="absolute -top-px left-[10%] h-px w-[30%] bg-[image:var(--gradient-comet)]" />
            <p className="text-center text-sm font-semibold uppercase tracking-[.14em] text-[var(--cyan-300)]">
              A little about me
            </p>
            <div className="mt-7 flex flex-wrap items-start justify-center gap-x-24 gap-y-7">
              {GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[.08em] text-fg-3">{group.label}</span>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="whitespace-nowrap text-[30px] font-extrabold tracking-[-0.01em] text-fg-3 transition-[color,text-shadow] duration-300 hover:text-fg-1 hover:[text-shadow:0_0_18px_rgba(141,120,255,.8)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-7 text-center font-medium text-[var(--text-body)]">
              Engineering Manager for Cloud &amp; AI at IBM · M.S. in Computer Science (AI) from Georgia Tech
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
