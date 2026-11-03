import { slug } from "github-slugger";
import { sortBlogs } from "./index";

// Intro text for each category page, in the order the category bar shows them.
// The keys are the URL slugs (/categories/<slug>).
export const CATEGORY_INTROS = {
  all: "Practical guides and cool blogs on site reliability, cloud architecture, DevSecOps and AI — written from 10+ years of building and running production systems.",
  devsecops:
    "GitOps, CI/CD, infrastructure as code and security built into the pipeline: how to ship faster with fewer 2am pages.",
  cloud: "Cloud fundamentals that transfer across AWS and Azure — networking, compute and when to use what.",
  software: "Design principles, systems fundamentals and the stories behind the things I've built.",
  career: "Paths, certifications and lessons from growing into an architect role.",
  "artificial-intelligence": "Machine learning experiments and AI in practice.",
};

const ORDER = Object.keys(CATEGORY_INTROS);

const published = (blogs) => blogs.filter((blog) => blog.isPublished);

// Every category that has at least one published post: [{ slug, name }], "all" first.
// Uses the stateless slug() so the same tag always gives the same URL.
export const getCategories = (blogs) => {
  const names = new Map([["all", "all"]]);
  for (const blog of published(blogs)) {
    for (const tag of blog.tags) {
      if (!names.has(slug(tag))) names.set(slug(tag), tag);
    }
  }
  const rank = (s) => (ORDER.includes(s) ? ORDER.indexOf(s) : ORDER.length);
  return [...names]
    .map(([s, name]) => ({ slug: s, name }))
    .sort((a, b) => rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug));
};

// Published posts in a category (or all of them), newest first.
export const getPostsInCategory = (blogs, categorySlug) =>
  sortBlogs(
    published(blogs).filter(
      (blog) => categorySlug === "all" || blog.tags.some((tag) => slug(tag) === categorySlug)
    )
  );

// Search box: matches the title, description or a topic, ignoring case.
export const matchesSearch = (post, query) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [post.title, post.description, ...post.tags].join(" ").toLowerCase().includes(needle);
};
