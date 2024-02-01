"use client";
import siteMetadata from "@/src/utils/siteMetaData";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcons";

const Details = ({ type, time, info }) => {
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
        <span className="capitalize font-medium text-dark/75 dark:text-accentDark ">
          {time}
        </span>
        <p className="font-medium w-full">{info}</p>
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
            type="Amazon Web Services Cloud Practitioner"
            time="October 2021"
            info=" The AWS Cloud Practitioner certification is an introductory credential from Amazon Web Services that validates one's fundamental understanding of the AWS Cloud, including core services, architecture, security, and pricing. 
            It equips individuals with essential cloud computing knowledge, enabling them to make informed decisions on cloud projects and laying the groundwork for advanced AWS certifications. "
          />
          <Details
            type="Disciplined Agile Senior Scrum Master (DASSM)"
            time="December 2023"
            info=" The DASSM (Disciplined Agile Senior Scrum Master) certification is a distinguished credential offered by the Project Management Institute (PMI) that signifies expertise in agile and lean practices within the Disciplined Agile (DA) toolkit. This certification is designed for experienced agile practitioners seeking to lead agile teams, navigate complex scenarios, and apply a broad range of agile and lean techniques effectively. "
          />
          <Details
            type="Cisco Certified Network Associate (CCNA)"
            time="August 2016 | Expired"
            info=" The CCNA (Cisco Certified Network Associate) certification is a prominent credential in the IT networking industry, offered by Cisco. 
            It validates a professional's ability to install, configure, operate, and troubleshoot medium-size routed and switched networks, including the implementation and verification of connections to remote sites in a WAN. 
            Earning the CCNA certification not only demonstrates your proficiency in networking concepts and Cisco's network solutions but also enhances your understanding of network security and automation. "
          />
          <Details
            type="CompTIA Network+"
            time="May 2016 | Expired"
            info=" The CompTIA Network+ certification is an intermediate-level credential aimed at networking professionals. 
            It covers key networking concepts, infrastructure, operations, security, and troubleshooting, providing a comprehensive understanding of how to design, implement, and manage wired and wireless networks. 
            Earning the Network+ certification demonstrates your ability to handle various networking tasks and challenges, making it essential for careers in network administration, system engineering, and IT support."
          />
          <Details
            type="CompTIA A+"
            time="December 2015 | Expired"
            info=" The CompTIA A+ certification is a widely recognized entry-level certification for IT professionals, focusing on foundational IT skills across a variety of devices and operating systems. 
            It covers essential areas such as hardware, networking, troubleshooting, and security, emphasizing practical and problem-solving abilities. 
            Holding a CompTIA A+ certification validates your technical skills and understanding of the IT infrastructure, making it an essential credential for starting a career in IT support, help desk roles, and beyond. 
            It serves as a benchmark for technical support and IT operational roles, enhancing job prospects and providing a solid foundation for further professional development in the IT field. "
          />
        </ul>
      </div>
    </div>
  );
};

export default Certifications;
