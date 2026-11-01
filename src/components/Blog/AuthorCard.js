import Image from "next/image";
import Link from "next/link";
import profilePic from "@/public/profile_pic.jpg";

// "Written by" card after the article. No social icons (per the design).
export function AuthorCard() {
  return (
    <section
      aria-label="About the author"
      className="grid grid-cols-[64px_1fr] sm:grid-cols-[88px_1fr] items-center gap-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-7"
    >
      <div className="h-16 w-16 sm:h-[88px] sm:w-[88px] overflow-hidden rounded-[22px] sm:rounded-[28px] bg-space-800 shadow-[var(--shadow-glow-indigo)]">
        <Image src={profilePic} alt="Lina Brihoum" sizes="88px" className="h-full w-full object-cover" />
      </div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-[.1em] text-fg-3">Written by</span>
        <Link href="/about" rel="author" className="block text-[22px] font-bold text-fg-1 hover:text-[var(--cyan-300)]">
          Lina Brihoum
        </Link>
        <div className="mt-0.5 text-sm font-semibold text-[var(--accent)]">DevSecOps Architect · Cloud &amp; AI</div>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-body)]">
          I write cool blogs about devops, AI, networking, software, and security. I hope you enjoy!
        </p>
      </div>
    </section>
  );
}
