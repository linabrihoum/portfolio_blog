"use client";

// Rounded search field with a magnifier and a live "5 posts" count.
export function BlogSearch({ value, onChange, count }) {
  return (
    <div
      role="search"
      className="group flex h-14 items-center gap-3 rounded-full border border-[var(--border-strong)] bg-[var(--surface-card)] px-[18px] transition-[border-color,box-shadow] duration-300 focus-within:border-[var(--cyan-500)] focus-within:shadow-[0_0_0_4px_rgba(24,204,252,.12),0_0_30px_rgba(99,68,245,.3)]"
    >
      {/* Lucide "search" icon */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 flex-none fill-none stroke-fg-3 stroke-2 transition-colors group-focus-within:stroke-[var(--cyan-300)]"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        aria-label="Search posts"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search posts — try “terraform” or “kubernetes”"
        className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 font-medium text-fg-1 placeholder:text-fg-3 focus:outline-none focus:ring-0"
      />
      <span className="flex-none text-[13px] font-semibold text-fg-3">
        {count} {count === 1 ? "post" : "posts"}
      </span>
    </div>
  );
}
