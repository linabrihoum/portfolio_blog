"use client";
import siteMetadata from "@/src/utils/siteMetaData";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcons";

const Details = ({ type, time, info }) => {
  const ref = useRef(null);
  return (
    <li className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col justify-between">
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl">{type}</h3>
        <span className="capitalize font-medium text-dark/75 dark:text-accentDark ">
          {time}
        </span>
      </motion.div>
    </li>
  );
};

const Certifications = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-24">
      <h2 className="font-bold capitalize text-6xl mb-32 w-full text-center lg:px-16">
        Certifications
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full dark:bg-light bg-dark origin-top"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4">
          <Details
            type="Microsoft Certified: Azure Administrator Associate"
            time="April 2024"
          />
          <Details
            type="Amazon Web Services: Developer Associate"
            time="December 2021"
          />
          <Details
            type="Amazon Web Services: Cloud Practitioner"
            time="October 2021"
          />
          <Details
            type="Disciplined Agile Senior Scrum Master (DASSM)"
            time="December 2023"
          />
          <Details
            type="Cisco Certified Network Associate (CCNA)"
            time="August 2016 | Expired"
          />
          <Details type="CompTIA Network+" time="May 2016 | Expired" />
          <Details type="CompTIA A+" time="December 2015 | Expired" />
        </ul>
      </div>
    </div>
  );
};

export default Certifications;
