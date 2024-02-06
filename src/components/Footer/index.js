"use client";
import React from "react";
import {
  GithubIcon,
  LinkedinIcon,
  SunIcon,
  MoonIcon,
  InstagramIcon,
} from "../Header/Icons";
import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";
import { cx } from "@/src/utils";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { useState } from "react";

const Footer = () => {

    const [mode, setMode] = useThemeSwitch();
    const [click, setClick] = useState(false);
    const toggle = () => {
      setClick(!click);
    };
    
  return (
    <footer className="mt-16 md:px-6 rounded-2xl bg-dark dark:bg-accentDark/90 m-2 sm:m-10 flex flex-col items-center text-light dark:text-dark">
      <h3 className="mt-16 font-medium dark:font-bold text-center capitalize text-2xl sm:text-3xl lg:text-4xl px-4">
        Cloud Technology, Cyber Security, Artifical Intelligence
      </h3>

      <div className="flex items-center mt-8">
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={cx(
            "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          )}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <MoonIcon className={"fill-dark"} />
          ) : (
            <SunIcon className={"fill-dark"} />
          )}
        </button>

        <a href={siteMetadata.linkedin} className="inline-block w-6 h-6 mx-4">
          <LinkedinIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
        <a
          href={siteMetadata.github}
          className="inline-block w-6 h-6 mr-4 fill-light"
        >
          <GithubIcon className="fill-light dark:fill-dark  hover:scale-125 transition-all ease duration-200" />
        </a>
        <a href={siteMetadata.instagram} className="inline-block w-6 h-6 mr-4">
          <InstagramIcon className="hover:scale-125 transition-all ease duration-200" />
        </a>
      </div>
      <div className="flex items-center mt-8">
        <Link
          href="mailto:brihoumlina@gmail.com"
          className="ml-4 text-lg font-medium capitalize  underline 
                  md:text-base"
        >
          Click here to email me for any inquires!
        </Link>
      </div>

      <div className="w-full  mt-16 md:mt-24 relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        <span className="text-center">
          &copy; {new Date().getFullYear()} Lina Brihoum. All rights reserved.
        </span>
        <Link
          href={"/sitemap.xml"}
          className="text-center underline my-4 md:my-0"
        >
          sitemap.xml
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
