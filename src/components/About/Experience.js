"use client"
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcons";


const Details = ({ position, company, companyLink, time, work }) => {
  const ref = useRef(null);
  return (
    <li className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between">
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl">
          {position}&nbsp;
          <a
            href={companyLink}
            className="dark:text-accentDark text-accent capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-accentDark ">
          {time}
        </span>
        <p className="font-medium w-full">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="my-24">
      <h2 className="font-bold capitalize text-6xl mb-32 w-full text-center lg:px-16">
        Experience
      </h2>
      <div className="w-[75%] mx-auto relative">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full dark:bg-light bg-dark origin-top"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <Details
            position="Senior Developer Relations Engineer | Site Relability, DevSecOps, Artifical Intelligence"
            company="IBM"
            time="November 2021 - present"
            work="Delivered high-quality technical content on cloud architecture, AI, and cybersecurity through various channels, increasing engagement year-over-year, 
            while facilitating community feedback, mentoring engineers, and collaborating on developer relations to enhance product development and knowledge sharing"
          />
          <Details
            position="DevSecOps Lead Engineer"
            company="FIS"
            time="March 2020 - November 2021"
            work="Led four engineering teams to develop software products that streamlined operations and saved over $1 million in 2021, managed CI/CD pipelines and cloud infrastructure, 
            developed automation scripts to reduce manual efforts by 60%, and implemented security measures to ensure infrastructure integrity."
          />
          <Details
            position="Full Stack Engineer"
            company="Voidstar Solutions"
            time="June 2016 - March 2020"
            work="Independently developed and managed DoD software programs and mobile applications, handled full-stack development, created responsive user interfaces, developed back-end functionalities, 
            and maintained CI/CD pipelines and cloud infrastructure, achieving 99.99% uptime for customer-facing applications."
          />
          <Details
            position="Game Design and Development Intern"
            company="Cubic Corporation"
            time="July 2014 - June 2015"
            work="Developed game mechanics and features using Unreal Engine and Java, created and optimized 3D models, collaborated with designers and developers, conducted thorough testing and debugging, and maintained detailed documentation to ensure high-quality and seamless gaming experiences."
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
