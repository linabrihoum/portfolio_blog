"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cx } from "@/src/utils";
import NavLink from "./NavLink";
import { SocialLinks } from "./SocialLinks";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/categories/all", title: "Blogs" },
  { url: "/projects", title: "Projects" },
  { url: "/contact", title: "Contact" },
];

// Blog posts and category pages all count as "Blogs".
const isActive = (url, pathname) =>
  url === "/categories/all"
    ? pathname.startsWith("/categories") || pathname.startsWith("/blogs")
    : pathname === url;

const barTransition = { duration: 0.3 };

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Transparent over the page at the very top; frosted glass once you scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cx(
        "w-full p-4 px-5 sm:px-10 flex items-center justify-between sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled
          ? "bg-[rgba(8,7,23,.62)] backdrop-saturate-[1.4] backdrop-blur-[14px] border-[var(--border-subtle)]"
          : "bg-transparent border-transparent"
      )}
    >
      {/* LINKS */}
      <nav className="hidden md:flex gap-4">
        {links.map((link) => (
          <NavLink link={link} active={isActive(link.url, pathname)} key={link.title} />
        ))}
      </nav>

      {/* NAME */}
      <Link href="/" className="font-semibold tracking-[.01em] text-fg-1">
        Lina Brihoum
      </Link>

      {/* SOCIAL */}
      <SocialLinks className="hidden md:flex" />

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="w-10 h-8 flex flex-col justify-between z-[60] relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={barTransition}
            className="w-10 h-1 bg-fg-1 rounded origin-left"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={barTransition}
            className="w-10 h-1 bg-fg-1 rounded"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0 }}
            transition={barTransition}
            className="w-10 h-1 bg-fg-1 rounded origin-left"
          />
        </button>
        {/* Rendered on <body>: the header's glass blur would otherwise trap this
            "full screen" overlay inside the header's own box. It sits just under
            the header (z-40 vs z-50), so the name and close button stay on top. */}
        {open && createPortal(
          <div className="fixed inset-0 z-40 bg-space-1000 flex flex-col items-center justify-center gap-8">
            {links.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
              >
                <Link
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className="text-4xl font-semibold text-white"
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </div>,
          document.body
        )}
      </div>
    </header>
  );
};

export default Header;
