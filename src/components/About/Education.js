"use client";
import siteMetadata from "@/src/utils/siteMetaData";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcons";

const Details = ({ type, subtype, time, place, info }) => {
  const ref = useRef(null);
  return (
    <li className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between">
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl">{type}</h3>
        <h4 className="font-bold text-xl">{subtype}</h4>
        <span className="capitalize font-medium text-dark/75 dark:text-accentDark ">
          {place} | {time}
        </span>
        <p className="font-medium w-full">{info}</p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-24">
      <h2 className="font-bold text-6xl mb-32 w-full text-center">Education</h2>
      <div ref={ref} className="w-[75%] mx-auto relative">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full dark:bg-light bg-dark origin-top"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <Details
            type="Masters of Science in Computer Science"
            subtype="Specalization in Machine Learning"
            place="Georgia Institute of Technology"
            time="August 2020 - present"
            info=" Doing fancy things in grad school."
          />
          <Details
            type="Bachelors of Science in Computer Science"
            subtype="Specalization in Cyber Security"
            place="Florida Polytechnic University"
            time="August 2016 - May 2019"
            info=" Doing fancy things in school."
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
