"use client";
import { motion } from "framer-motion";
import siteMetadata from "@/src/utils/siteMetaData";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./Icons";

const LINKS = [
  { href: siteMetadata.github, label: "Checkout my github profile", Icon: GithubIcon, mono: true },
  { href: siteMetadata.linkedin, label: "Checkout my linkedin profile", Icon: LinkedinIcon },
  { href: siteMetadata.instagram, label: "Checkout my instagram profile", Icon: InstagramIcon },
];

// "lift" (header): icons rise 2px on hover. "scale" (footer): icons grow 1.25x.
export function SocialLinks({ motionStyle = "lift", className }) {
  const hover = motionStyle === "scale" ? { scale: 1.25 } : { y: -2 };

  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {LINKS.map(({ href, label, Icon, mono }) => (
        <motion.a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="inline-flex w-6 h-6"
          whileHover={hover}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className={mono ? "fill-[var(--fg-1)]" : undefined} />
        </motion.a>
      ))}
    </div>
  );
}
