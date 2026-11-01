import React from "react";
import Link from "next/link";
import { cn } from "@/src/utils";

const SIZES = {
  sm: "px-6 py-1 text-xs border",
  md: "px-6 py-2 text-sm border-2",
  lg: "px-10 py-3 text-base border-2",
};

// Dark pill that links to a blog category. Grows slightly with a soft glow on hover.
const Tag = ({ link = "#", name, size = "md", className }) => {
  return (
    <Link
      href={link}
      className={cn(
        "inline-block rounded-full bg-space-900 font-semibold capitalize leading-normal text-[var(--star)] border-[var(--star)]",
        "transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_0_18px_rgba(141,120,255,.45)]",
        SIZES[size],
        className
      )}
    >
      {name}
    </Link>
  );
};

export default Tag;
