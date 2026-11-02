import { sortBlogs } from "./index";

export const published = (blogs) => blogs.filter((blog) => blog.isPublished);

// The posts published just before ("previous", older) and after ("next", newer) this one.
export const getAdjacentPosts = (blogs, current) => {
  const newestFirst = sortBlogs(published(blogs));
  const index = newestFirst.findIndex((blog) => blog.url === current.url);
  return { previous: newestFirst[index + 1] ?? null, next: newestFirst[index - 1] ?? null };
};

// Other posts to read next: same topic first, then the newest.
export const getRelatedPosts = (blogs, current, count = 3) => {
  const sharesTopic = (blog) => blog.tags.some((tag) => current.tags.includes(tag));
  const others = sortBlogs(published(blogs).filter((blog) => blog.url !== current.url));
  return [...others.filter(sharesTopic), ...others.filter((blog) => !sharesTopic(blog))].slice(0, count);
};

// Only show "Updated" when the post really changed after it was published.
export const wasUpdated = (blog) =>
  Boolean(blog.updatedAt) && new Date(blog.updatedAt).getTime() !== new Date(blog.publishedAt).getTime();
