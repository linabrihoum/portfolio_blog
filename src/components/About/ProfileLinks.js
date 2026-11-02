import siteMetadata from "@/src/utils/siteMetaData";
import { AwardIcon, GithubIcon, InstagramIcon, LinkArrow, LinkedinIcon } from "../Header/Icons";

const LINKS = [
  {
    label: "Credly",
    handle: "Verified certifications",
    desc: "All my cloud, AI, and project management certifications and badges here.",
    href: siteMetadata.credly,
    accent: "#FF7A3D",
    icon: <AwardIcon className="text-[#FF7A3D]" />,
  },
  {
    label: "GitHub",
    handle: "@linabrihoum",
    desc: "Source for my projects, templates and this site.",
    href: siteMetadata.github,
    accent: "#B9ACFF",
    icon: <GithubIcon className="fill-[var(--fg-1)]" />,
  },
  {
    label: "LinkedIn",
    handle: "in/lina-brihoum",
    desc: "Experience, education, and updates on what I'm up to.",
    href: siteMetadata.linkedin,
    accent: "#18CCFC",
    icon: <LinkedinIcon />,
  },
  {
    label: "Instagram",
    handle: "@codinglina",
    desc: "Behind the scenes of my set up and work.",
    href: siteMetadata.instagram,
    accent: "#FF5FC8",
    icon: <InstagramIcon />,
  },
];

// One card per profile. On hover it lifts, glows in its own accent colour and a
// comet streaks across the top. Everything moves with transform/opacity only.
function LinkCard({ label, handle, desc, href, accent, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ "--card-accent": accent, "--card-border": `${accent}88`, "--card-glow": `${accent}99`, "--card-halo": `${accent}55` }}
      className="group relative flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 transition-[transform,box-shadow,border-color] duration-[450ms,300ms,300ms] [transition-timing-function:var(--ease-spring),ease,ease] hover:-translate-y-1.5 hover:border-[var(--card-border)] hover:shadow-[0_20px_50px_-18px_var(--card-glow)] focus-visible:-translate-y-1.5 focus-visible:border-[var(--card-border)]"
    >
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,var(--card-halo),transparent)] opacity-[.45] transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* The track spans the card; sliding it from -60% to 110% carries the streak across */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-[18px] h-0.5 w-full -translate-x-[60%] transition-transform duration-[900ms] ease-out group-hover:translate-x-[110%]"
      >
        <span className="absolute left-0 h-0.5 w-[120px] -rotate-[24deg] rounded-[9px] bg-[linear-gradient(90deg,transparent,var(--card-accent)_70%,#fff)] shadow-[0_0_10px_var(--card-accent)]" />
      </span>

      <div className="relative flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--border-subtle)] bg-[rgba(245,243,255,.06)]">
          <span className="inline-flex w-[26px]">{icon}</span>
        </span>
        <span className="inline-flex w-5 text-fg-3 transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--card-accent)]">
          <LinkArrow aria-hidden="true" />
        </span>
      </div>
      <div className="relative">
        <div className="text-xl font-bold text-fg-1">{label}</div>
        <div className="mt-0.5 text-sm font-semibold text-[var(--card-accent)]">{handle}</div>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[var(--text-body)]">{desc}</p>
      </div>
    </a>
  );
}

// Replaces the old Certifications timeline: certifications live on Credly now.
export function ProfileLinks() {
  return (
    <section className="mx-auto my-24 max-w-[1180px] px-5 sm:px-10">
      <h2 className="text-center text-4xl font-bold text-[var(--text-heading)] sm:text-5xl lg:text-6xl">
        Find my accomplishments here!
      </h2>
      <p className="mt-4 text-center text-lg text-[var(--text-body)]">Certifications, code and everything in between :)</p>
      <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
        {LINKS.map((link) => (
          <LinkCard key={link.label} {...link} />
        ))}
      </div>
    </section>
  );
}
