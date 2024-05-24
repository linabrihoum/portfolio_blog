"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/utils";

export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 1.35,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300/60 to-purple-300/50 dark:from-indigo-500/50 dark:to-purple-500/60`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};
