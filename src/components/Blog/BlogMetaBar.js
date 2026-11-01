import Link from "next/link";
import { slug } from "github-slugger";
import { formatPostDate } from "@/src/utils";
import { wasUpdated } from "@/src/utils/posts";

function Item({ label, children }) {
  return (
    <div className="mx-3.5 my-2.5 flex flex-col items-center gap-0.5">
      <span className="text-xs font-semibold uppercase tracking-[.08em] opacity-75">{label}</span>
      {children}
    </div>
  );
}

// Published / Updated (only if it changed) / Read time / Topic, on an indigo-violet bar.
export function BlogMetaBar({ blog }) {
  return (
    <div className="flex flex-wrap items-center justify-around rounded-lg bg-[linear-gradient(90deg,var(--indigo-600),var(--violet-500))] px-4 md:px-8 py-1.5 text-base md:text-lg font-semibold text-white shadow-[0_0_32px_rgba(99,68,245,.35)]">
      <Item label="Published">
        <time dateTime={blog.publishedAt}>{formatPostDate(blog.publishedAt)}</time>
      </Item>
      {wasUpdated(blog) && (
        <Item label="Updated">
          <time dateTime={blog.updatedAt}>{formatPostDate(blog.updatedAt)}</time>
        </Item>
      )}
      <Item label="Read">
        <span>{blog.readingTime.text}</span>
      </Item>
      <Item label="Topic">
        <Link href={`/categories/${slug(blog.tags[0])}`} className="capitalize hover:underline">
          {blog.tags[0]}
        </Link>
      </Item>
    </div>
  );
}
