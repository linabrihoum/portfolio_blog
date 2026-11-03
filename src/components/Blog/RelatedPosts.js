import { BlogCard } from "./BlogCard";

export function RelatedPosts({ posts }) {
  if (posts.length === 0) return null;

  return (
    <section aria-label="Related posts">
      <h2 className="mb-8 text-2xl md:text-4xl font-bold leading-snug text-fg-1">Related posts</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10">
        {posts.map((post) => (
          <BlogCard key={post.url} blog={post} />
        ))}
      </div>
    </section>
  );
}
