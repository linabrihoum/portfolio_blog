"use client";
import Link from "next/link";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  MoonIcon,
  SunIcon
} from "./Icons.js";
import siteMetadata from "@/src/utils/siteMetaData";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cx } from "@/src/utils";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";

const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={`${className}  rounded relative group `}
    >
      {title}
      <span
        className={`
              inline-block h-[1px]  bg-dark absolute left-0 -bottom-0.5 
              group-hover:w-full transition-[width] ease duration-300 dark:bg-light
              ${
                router.asPath === href ? "w-full" : " w-0"
              } bg-dark dark:bg-light
              `}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      className={`${className}  rounded relative group lg:text-light lg:dark:text-dark`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`
              inline-block h-[1px]  bg-dark absolute left-0 -bottom-0.5 
              group-hover:w-full transition-[width] ease duration-300 dark:bg-light
              ${
                router.asPath === href ? "w-full" : " w-0"
              } lg:bg-light lg:dark:bg-dark
              `}
      >
        &nbsp;
      </span>
    </button>
  );
};

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

      <motion.div>
        {click ? (
          <motion.div
            className="min-w-[70vw] sm:min-w-[90vw] flex justify-between items-center flex-col fixed top-1/2 left-1/2 -translate-x-1/2
              -translate-y-1/2 py-32 bg-dark/90 dark:bg-light/75 rounded-lg z-50 backdrop-blur-md text-light dark:text-dark"
            initial={{ scale: 0, x: "-50%", y: "-50%", opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <nav className="flex items-center justify-center flex-col">
              <CustomMobileLink
                toggle={toggle}
                className="pb-6"
                href="/"
                title="Home"
              />
              <CustomMobileLink
                toggle={toggle}
                className="pb-6"
                href="/about"
                title="About"
              />
              <CustomMobileLink
                toggle={toggle}
                className="pb-6"
                href="/categories/all"
                title="Blogs"
              />
              <CustomMobileLink
                toggle={toggle}
                className="pb-6"
                href="/contact"
                title="Contact"
              />
            </nav>
            <nav className="flex items-center justify-center  mt-2 ">
              <motion.a
                target={"_blank"}
                className="w-6 m-1 mx-3 bg-light rounded-full dark:bg-dark sm:mx-1"
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

              <button
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                className={`w-6 h-6 ease m-1 ml-3 sm:mx-1 flex items-center justify-center rounded-full p-1  
            ${mode === "light" ? "bg-dark  text-light" : "bg-light  text-dark"}
            `}
                aria-label="theme-switcher"
              >
                {mode === "light" ? (
                  <SunIcon className={"fill-dark"} />
                ) : (
                  <MoonIcon className={"fill-dark"} />
                )}
              </button>
            </nav>
          </motion.div>
        ) : null}
      </motion.div>

      <div className="w-full justify-between items-center hidden sm:flex text-dark dark:text-light">
        <nav className=" sm:flex ">
          <CustomLink toggle={toggle} className="mr-4 " href="/" title="Home" />
          <CustomLink
            toggle={toggle}
            className="mx-4"
            href="/categories/all"
            title="Blogs"
          />
          <CustomLink
            toggle={toggle}
            className="mx-4 "
            href="/about"
            title="About"
          />
          <CustomLink
            toggle={toggle}
            className="mx-4 "
            href="/contact"
            title="Contact"
          />
        </nav>

        <a className="semi-bold dark:text-light">
          <CustomLink
            toggle={toggle}
            className="mr-4 "
            href="/"
            title="Lina Brihoum"
          />
        </a>

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
