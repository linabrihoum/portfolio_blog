"use client";
import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="w-full h-full md:h-[60vh] flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">

      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2
          className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left"
        >
          Oh no! We couldn't find this page :( <span className="text-bold"> </span>
        </h2>
      </div>

    </section>
  );
}
