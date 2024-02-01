"use client";
import React from "react";
import TransitionEffect from "./TransitionEffect";
import AnimatedText from "./AnimatedText";
import Link from "next/link";
import { LinkArrow } from "../Header/Icons";

const HomeCoverSection = () => {
  return (
    <>
      <TransitionEffect />
      <div
        className={`z-0 inline-block h-full w-full bg-light p-32 dark:bg-dark xl:p-24 lg:p-16 md:p-12 sm:p-8`}
      >
        <div className="flex w-full items-start justify-between md:flex-col">
          <div
            className="flex-col"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <AnimatedText
              text="Develop. Innovate. Create."
              className="!text-left !text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
            />
            <p className="my-4 !text-3xl font-medium text-dark dark:text-light md:text-sm sm:!text-xs">
              As a skilled full-stack developer, I am dedicated to turning ideas
              into innovative web applications. Explore my latest projects and
              articles, showcasing my expertise in React.js and web development.
            </p>
            <div className="mt-2 flex items-center self-start lg:self-center">
              <Link
                href="/dummy.pdf"
                target={"_blank"}
                className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
             `}
                download
              >
                Resume <LinkArrow className="ml-1 !w-6 md:!w-4" />
              </Link>

              <Link
                href="mailto:codebucks27@gmail.com"
                className="ml-4 text-lg font-medium capitalize text-dark underline 
                  dark:text-light md:text-base"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default HomeCoverSection;
