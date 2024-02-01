import Link from "next/link";
import React from "react";
import { CircularText } from "../Header/Icons";


export const HireMe = () => {
  return (
    <div
      className="fixed left-4 bottom-4 flex flex-col items-center justify-center z-20
    overflow-hidden"
    >
      <div className="w-48 h-auto flex items-center justify-center relative">
        <CircularText
          className={"fill-dark dark:fill-light animate-spin-slow duration-200"}
        />
        <Link
          href="mailto:brihoumlina@gmail.com"
          className="flex items-center justify-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md border border-solid
            bg-dark rounded-full text-white w-20 h-20 font-semibold hover:bg-light hover:border-dark hover:text-dark dark:text-dark dark:bg-light dark:hover:bg-dark
            dark:hover:text-light dark:hover:border-light dark:shadow-light/25"
        >
          Hire Me
        </Link>
      </div>
    </div>
  );
};

