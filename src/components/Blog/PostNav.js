import Link from "next/link";
import { cx } from "@/src/utils";

function Side({ post, direction }) {
  if (!post) return <span />;
  const previous = direction === "previous";
  return (
    <Link
      href={post.url}
      rel={previous ? "prev" : "next"}
      className={cx(
        "group flex flex-col gap-1.5 rounded-xl border border-[var(--border-subtle)] px-[22px] py-[18px] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface-card)]",
        previous ? "text-left" : "text-right"
      )}
    >
      <span className="text-[13px] font-semibold text-fg-3">{previous ? "← Previous" : "Next →"}</span>
      <span className="text-[17px] font-bold capitalize text-fg-1 transition-colors duration-200 group-hover:text-[var(--cyan-300)]">
        {post.title}
      </span>
    </Link>
  );
}

// Older post on the left, newer on the right.
export function PostNav({ previous, next }) {
  return (
    <nav aria-label="More posts" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Side post={previous} direction="previous" />
      <Side post={next} direction="next" />
    </nav>
  );
}
