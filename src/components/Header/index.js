"use client";
import Link from "next/link";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
} from "./Icons.js";
import siteMetadata from "@/src/utils/siteMetaData";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { useState } from "react";

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);

  const toggle = () => {
    setClick(!click);
  };
  return (
    <header className="w-full p-4  px-5 sm:px-10 flex items-center justify-between">
      <button
        className="inline-block sm:hidden z-50"
        onClick={toggle}
        aria-label="Hamburger Menu"
      >
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(-45deg) translateY(0)"
                  : "rotate(0deg) translateY(6px)",
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                opacity: click ? 0 : 1,
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(45deg) translateY(0)"
                  : "rotate(0deg) translateY(-6px)",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>

      <nav
        className=" w-max py-3 px-6 sm:px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center flex  sm:hidden
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50 
        transition-all ease duration-300
        "
        style={{
          top: click ? "1rem" : "-5rem",
        }}
      >
        <Link href="/" className="mr-2">
          Home
        </Link>
        <Link href="/categories/all" className="mr-2">
          Blogs
        </Link>
        <Link href="/contact" className="mx-2">
          Contact
        </Link>
      </nav>

      <div className="w-full justify-between items-center hidden sm:flex dark:text-light">
        <nav className=" sm:flex ">
          <Link href="/" className="mr-2">
            Home
          </Link>
          <Link href="/categories/all" className="mr-2">
            Blogs
          </Link>
          <Link href="/contact" className="mx-2">
            Contact
          </Link>
        </nav>

        <h2 className="semi-bold dark:text-light">Lina Brihoum</h2>

        <nav className=" sm:flex ">
          <a
            href={siteMetadata.linkedin}
            className="inline-block w-6 h-6 mr-4"
            aria-label="Reach out to me via LinkedIn"
            target="_blank"
          >
            <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
          </a>
          <a
            href={siteMetadata.github}
            className="inline-block w-6 h-6 mr-4"
            aria-label="Check my profile on Github"
            target="_blank"
          >
            <GithubIcon className="  hover:scale-125 transition-all ease duration-200 dark:fill-light" />
          </a>
          <a
            href={siteMetadata.instagram}
            className="inline-block w-6 h-6 mr-4"
            aria-label="Check my profile on Dribbble"
            target="_blank"
          >
            <InstagramIcon className="hover:scale-125 transition-all ease duration-200" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
