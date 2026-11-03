"use client";
import { useState } from "react";
import { matchesSearch } from "@/src/utils/categories";
import { BlogCard } from "./BlogCard";
import { BlogSearch } from "./BlogSearch";
import { Reveal } from "../ui/Reveal";

// Search box + category bar + card grid. Search filters the posts already
// shown for this category, in the browser.
export function BlogList({ posts, categoryBar }) {
  const [query, setQuery] = useState("");
  const results = posts.filter((post) => matchesSearch(post, query));

  return (
    <>
      <div className="mt-8 px-5 sm:px-10 md:px-24 sxl:px-32">
        <div className="max-w-[640px]">
          <BlogSearch value={query} onChange={setQuery} count={results.length} />
        </div>
      </div>

      <div className="mx-5 sm:mx-10 mt-10">{categoryBar}</div>

      {results.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-16 px-5 sm:px-10 md:px-24 sxl:px-32 pt-12 md:pt-20">
          {results.map((post, index) => (
            <Reveal key={`${query}-${post.url}`} delay={(index % 3) * 0.12}>
              <article>
                <BlogCard blog={post} />
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="px-5 sm:px-10 pt-24 text-center">
          <p className="text-2xl font-bold text-fg-1">No posts found in this corner of space :(</p>
          <p className="mt-2 text-fg-2">
            Try a different search, or{" "}
            <button type="button" onClick={() => setQuery("")} className="text-[var(--text-link)] underline">
              clear the search
            </button>
            .
          </p>
        </div>
      )}
    </>
  );
}
