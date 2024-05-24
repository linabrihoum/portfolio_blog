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
