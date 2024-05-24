"use client";
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
            time=""
            info=" My Master's degree in Computer Science with a specialization in Machine Learning is an advanced degree learning about artificial intelligence and in-depth computing skils. 
            This program was structured to build upon the foundation laid during my undergraduate studies, introducing me to the complexities and nuances of machine learning and its integration within the broader scope of computer science. 
            The coursework covers both the theoretical aspects and practical implementations of the field. The most important classes I took were Machine Learning, Advanced Algorithms, Cyber Security, and Software Architecture and Design."
          />
          <Details
            type="Bachelors of Science in Computer Science"
            subtype="Specalization in Cyber Security"
            place="Florida Polytechnic University"
            time=""
            info=" My Bachelor of Science in Computer Science with a concentration in Cybersecurity and Information Assurance helped my understanding of both the theoretical underpinnings and practical applications in the computing world. 
            The curriculum encompassed a wide array of foundational subjects, such as Differential Equations, Computer Architecture and Design, Data Structures and Algorithms, Object Oriented Programming, Operating Systems, Digital Forensics and Computer Networking."
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
