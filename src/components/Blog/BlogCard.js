import Image from "next/image";
import Link from "next/link";
import { formatPostDate, postImageSrc } from "@/src/utils";

// Grid card: image frame + text below, no box around it (Home and blog lists).
export function BlogCard({ blog }) {
  return (
    <Link href={blog.url} className="group flex flex-col text-fg-1">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-space-800 transition-shadow duration-300 group-hover:shadow-lift">
        <Image
          src={postImageSrc(blog)}
          placeholder="blur"
          blurDataURL={blog.image.blurhashDataUrl}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-[.04em] text-[var(--accent)]">
          {blog.tags[0]}
        </span>
        <h2 className="my-1 text-lg font-semibold capitalize leading-snug">
          <span className="bg-[linear-gradient(90deg,rgba(99,68,245,.55),rgba(174,72,255,.55))] bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_6px]">
            {blog.title}
          </span>
        </h2>
        <span className="font-semibold text-[var(--text-muted)]">{formatPostDate(blog.publishedAt)}</span>
      </div>
    </Link>
  );
}
