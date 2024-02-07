"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
  const pathName = usePathname();

  return (
    <Link
  className={`rounded relative group ${
    pathName === link.url
      ? "inline-block after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:bg-dark after:group-hover:w-full after:transition-[width] after:ease after:duration-300 dark:after:bg-light"
      : ""
  }`}
  href={link.url}
>
  <span className="group-hover:w-full transition-[width] ease duration-300 text-black dark:text-white">
    {link.title}
  </span>
</Link>

  );
};

export default NavLink;
