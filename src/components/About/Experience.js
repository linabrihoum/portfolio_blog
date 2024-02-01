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
            position="Cloud Architect | Site Relability, DevSecOps, Artifical Intelligence"
            company="IBM"
            time="November 2021 - present"
            work="  
            As a DevOps team leader, I am dedicated to delivering efficient and scalable software products by integrating Agile and DevOps methodologies. My role extends beyond management to being a strategic consultant in generative AI, where I leverage advanced artificial intelligence to enhance client business processes and operational efficiency. Collaborating with diverse teams, I focus on understanding client needs, developing customized AI strategies, and deploying impactful, data-driven solutions.
            
            In my technical capacity, I oversee continuous integration and delivery pipelines using tools like Azure DevOps, Jenkins, and CircleCI, and manage containerization with Docker, Kubernetes, and Openshift. My expertise also covers designing AWS cloud infrastructure and maintaining system performance with tools like the ELK Stack and Prometheus. I ensure seamless software deployment in collaboration with development and QA teams, emphasizing data integrity and availability in database management. This approach reflects my commitment to delivering intelligent and user-centric solutions in a friendly and confident manner.
            "
          />
          <Details
            position="DevSecOps Lead Engineer"
            company="FIS"
            time="March 2020 - November 2021"
            work="As an lead DevSecOps engineer, I play a pivotal role in designing applications and projects, working closely with teams across the company. My responsibilities include guiding teams through solution delivery, focusing on automating manual processes, and maintaining seamless collaboration. Creating and maintaining CI/CD pipelines using Azure DevOps and Jenkins is a key part of my role, alongside writing automation scripts in Python, PowerShell, and Bash.

                  In managing cloud infrastructure, I actively monitor, manage, and enhance AWS environments, including EC2, RDS, and S3, ensuring effective backups, patches, and scaling. I specialize in building and deploying Docker & Kubernetes containers, breaking up microservices to streamline workflows. My weekly duties encompass providing status reports and accounting for time, as well as mentoring and supporting team members, both onshore and offshore, to help them complete tasks and achieve objectives. Additionally, I keep an eye on new development activities to anticipate and mitigate any potential impacts on the overall environment.
                  "
          />
          <Details
            position="Full Stack Engineer"
            company="Voidstar Solutions"
            time="June 2016 - March 2020"
            work="
            I specialize in developing, designing, and deploying mobile applications, utilizing a diverse set of technologies including Flutter (Dart), Xcode/SwiftUI (Swift), and Android Studio (Java/Kotlin). My expertise extends to working on various computer programs using multiple programming languages, with a particular focus on object-oriented programming. Additionally, I design and develop website applications using HTML/CSS, JavaScript, and Angular.

            My role also involves working with and maintaining server code, as well as conducting unit testing, primarily using C# and .NET Core. Beyond technical development, I contribute to project management and business operations, offering support and insights to ensure the smooth progression and successful completion of projects.
            "
          />
          <Details
            position="Computer Science Teaching Assistant"
            company="Florida Polytechnic University"
            time="August 2015 - May 2016"
            work="
            I assist in teaching a range of computer science-focused classes, including Algorithm Analysis & Design, Programming Languages, Data Structures, and Mobile Device Application Development. In collaboration with designated professors, I am involved in planning course material and grading academic papers. Additionally, I offer personalized support to students through one-on-one meetings, helping them understand and master the course material.
            "
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
