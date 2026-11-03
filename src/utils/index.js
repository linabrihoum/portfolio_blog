import { compareDesc, parseISO } from "date-fns";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cx = (...classNames) => classNames.filter(Boolean).join(" ");

export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// "March 20, 2026". Post dates are stored as UTC midnight, so format them in UTC;
// otherwise a build in New York shows them a day early.
export const formatPostDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

// Public URL of a post's cover image (Contentlayer stores it relative to the post).
export const postImageSrc = (blog) => blog.image.filePath.replace("../public", "");
