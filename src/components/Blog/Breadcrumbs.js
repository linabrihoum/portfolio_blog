import Link from "next/link";

// "Home / Blogs / Cloud": every step but the last is a link.
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="capitalize text-fg-1">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="capitalize text-fg-2 hover:text-fg-1">
                  {item.label}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-fg-3">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
