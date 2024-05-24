"use client";
import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeamsDemo } from "./BackgroundDemo";
import { Highlight } from "../ui/Highlight";

const HomeDescription = () => {
  return (
    <div className="relative w-full lg:h-[60vh] md:h-[50vh] sm:h-[40vh] h-[50vh] flex flex-col md:flex-row items-center justify-center text-dark dark:text-light mt-10 md:mt-24 sm:mt-10 overflow-hidden">
      {/* Background Beams */}
      <div className="absolute inset-0 w-screen h-full z-0">
        <BackgroundBeamsDemo />
      </div>

      <div className="relative w-screen md:w-1/2 flex flex-col text-center md:text-left items-center md:items-start justify-center px-5 xs:p-10 pb-10 lg:px-16 z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ delay: 1 }}
          className="font-bold text-4xl xs:text-5xl sxl:text-6xl pt-8"
        >
          Hey there! My name is <span className="text-bold"> </span>
          <Highlight className="text-black dark:text-white">
            Lina Brihoum
          </Highlight>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ delay: 3.5 }}
          className="font-medium mt-4 text-2xl pt-8"
        >
          I'm a Cloud Architect specializing in Site Reliability, DevSecOps,
          and Artificial Intelligence. <br />
        </motion.p>
      </div>
    </div>
  );
};

export default HomeDescription;
