import { compareDesc, parseISO } from "date-fns";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const cx = (...classNames) => classNames.filter(Boolean).join(" ");

export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};

const supabase = createClientComponentClient();

export const popularBlogs = async (blogs) => {
  // Views is database namne
  // Count is the amount of views per blog
  let { data: views, error } = await supabase.from("views").select("count");

  return blogs
    .slice()
    .sort((a) =>
      compareDesc(parseISO(a.views))
    );
    
};