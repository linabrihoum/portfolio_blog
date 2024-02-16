"use client";

import Link from "next/link";
import { useState } from "react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./Icons.js";
import { useRouter } from "next/navigation";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/categories/all", title: "Blogs" },
  //{ url: "/contact", title: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
      backgroundColor: "rgb(255,255,255)",
    },
  };
  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
      backgroundColor: "rgb(255,255,255)",
    },
  };

  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between sticky top-0 z-50 bg-light dark:bg-dark">
      {/* Rest of the component remains the same */}
      
      {/* LINKS */}
      <div className="hidden md:flex gap-4">
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </div>

      {/* LOGO */}
      <Link href="/" className="mr-4 semi-bold dark:text-light">
        <span className="">Lina Brihoum</span>
      </Link>

      {/* SOCIAL */}
      <div className="hidden md:flex gap-4">
        <motion.a
          target={"_blank"}
          className="w-6 m-1 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1 dark:fill-light"
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Checkout my github profile"
        >
          <GithubIcon />
        </motion.a>
        <motion.a
          target={"_blank"}
          className="w-6 m-1 mx-3 sm:mx-1"
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Checkout my linkedin profile"
        >
          <LinkedinIcon />
        </motion.a>
        <motion.a
          target={"_blank"}
          className="w-6 m-1 mx-3 sm:mx-1"
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Checkout my dribbble profile"
        >
          <InstagramIcon />
        </motion.a>
      </div>

      {/* RESPONSIVE MENU */}
      <div className="md:hidden">
        {/* MENU BUTTON */}
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black dark:bg-white rounded origin-left"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black dark:bg-white rounded"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black dark:bg-white rounded origin-left"
          ></motion.div>
        </button>
        {/* MENU LIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="absolute top-0 left-0 w-screen h-screen bg-black text-white  flex flex-col items-center justify-center gap-8 text-4xl z-40"
          >
            {links.map((link) => (
              <motion.div
                variants={listItemVariants}
                className=""
                key={link.title}
              >
                <button
                  className=""
                  onClick={() => {
                    
                    setOpen((prev) => !prev);
                    router.push(link.url);
                  }}
                >
                  {link.title}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
