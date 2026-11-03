import Link from "next/link";
import { cx } from "@/src/utils";

// Active link: a thin solid underline. On hover, a comet-gradient underline sweeps in.
const NavLink = ({ link, active }) => {
  return (
    <Link href={link.url} className="group relative inline-block py-0.5 font-medium text-fg-1">
      {link.title}
      <span
        className={cx(
          "absolute left-0 bottom-0 h-px transition-[width] duration-300 ease-in-out",
          active
            ? "w-full bg-fg-1"
            : "w-0 group-hover:w-full bg-[image:var(--gradient-comet)]"
        )}
      />
    </Link>
  );
};

export default NavLink;
