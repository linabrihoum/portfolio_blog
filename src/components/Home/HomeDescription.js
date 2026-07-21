"use client";
import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeamsDemo } from "./BackgroundDemo";
import { Highlight } from "../ui/Highlight";

const HomeDescription = () => {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-center text-dark dark:text-light overflow-hidden">
      {/* Background Beams */}
      <div className="absolute inset-0 w-full h-full z-0">
        <BackgroundBeamsDemo />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-5 sm:px-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ delay: 1 }}
          className="font-bold whitespace-nowrap pt-8 text-[length:4.4vw] md:text-[length:clamp(1.75rem,3.2vw,3.75rem)]"
        >
          Hey there! My name is{" "}
          <Highlight className="text-black dark:text-white">
            Lina Brihoum
          </Highlight>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ delay: 3.5 }}
          className="font-medium mt-3 text-2xl"
        >
          I'm a Cloud Architect specializing in DevSecOps, Software
          and Artificial Intelligence.
        </motion.p>
      </div>
    </div>
  );
};

export default HomeDescription;
