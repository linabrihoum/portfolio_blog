import Link from "next/link";
import { cx } from "@/src/utils";

// The row of category pills between two rules; the current one is filled in.
export function CategoryBar({ categories, current }) {
  return (
    <nav aria-label="Blog categories" className="flex flex-wrap items-start border-y-2 border-fg-1 py-4">
      {categories.map((category) => {
        const active = category.slug === current;
        return (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            aria-current={active ? "page" : undefined}
            className={cx(
              "m-2 inline-block rounded-full border-2 border-fg-1 px-6 md:px-10 py-1.5 md:py-2 font-medium capitalize leading-normal transition-transform duration-200 hover:scale-105",
              active ? "bg-fg-1 text-[var(--fg-inverse)]" : "bg-transparent text-fg-1"
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
