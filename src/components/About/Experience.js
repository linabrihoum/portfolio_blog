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
            As a Cloud Architect, I actively lead a team of engineers in adopting Agile methodologies, fostering an environment of collaboration and ensuring the timely delivery of high-quality software products through daily stand-ups, sprint planning, and retrospectives. I maintain and enhance cloud infrastructure using AWS and Azure, achieving a 15% reduction in costs through strategic optimization of services like EC2, S3, RDS, and Lambda. My role involves orchestrating and managing CI/CD pipelines using Azure DevOps and Jenkins, focusing on continuous integration and delivery, which has accelerated project timelines and improved code quality, decreasing runtime by 20%.

            I utilize Terraform and Bicep for robust infrastructure as code (IaC) management, streamlining provisioning and configuration across various environments. My collaborative efforts extend across development, QA, and operations teams to assess client needs, set project goals, develop AI strategies, and implement data-driven solutions, resulting in significant performance enhancements. I regularly present on cloud computing and AI innovations at tech conferences and contribute to bootcamps, furthering knowledge sharing and expertise in these fields.

            Additionally, I implement and oversee containerization solutions using Docker, Kubernetes, and Openshift, ensuring scalable and efficient deployment processes. I am responsible for creating and maintaining comprehensive technical documentation for infrastructure and applications. My commitment to security is demonstrated through regular audits and the implementation of measures with tools like Black Duck, Checkmarx, and Veracode to safeguard our infrastructure. I also stay vigilant on new developments that could impact our technological environment, ensuring we remain at the forefront of industry advancements."
          />
          <Details
            position="DevSecOps Lead Engineer"
            company="FIS"
            time="March 2020 - November 2021"
            work="As a DevSecOps Lead, I managed four teams tasked with delivering high-quality software products and automating manual efforts, which resulted in significant cost savings—over $800,000 in 2020 and more than $1 million in 2021. I orchestrated and managed CI/CD pipelines using Azure DevOps and Jenkins, focusing on continuous integration and delivery to accelerate project timelines and enhance efficiency.

                In this role, I actively managed, monitored, and improved our cloud infrastructure across AWS and Azure environments, overseeing backups, patches, and scaling activities. I developed automation scripts using Python, PowerShell, and Bash to streamline processes and boost system efficiency. My efforts in building and deploying Docker and Kubernetes/OpenShift containers modularized microservices, significantly enhancing workflow efficiency and system scalability.

                I maintained our infrastructure as code using Terraform, which streamlined the provisioning and configuration of cloud infrastructure across various environments. I also created and maintained detailed technical documentation for our infrastructure and applications, including network diagrams, system architectures, deployment processes, and troubleshooting procedures.

                Regular security audits were a critical part of my responsibilities, where I implemented necessary measures using Black Duck and Veracode to ensure the security of our infrastructure. These efforts were fundamental in maintaining robust and secure operations within our technological environment."
          />
          <Details
            position="Full Stack Engineer"
            company="Voidstar Solutions"
            time="June 2016 - March 2020"
            work="
                In my role as a Full Stack Software Developer, I collaborated with cross-functional teams to develop mobile applications, utilizing Flutter (Dart), Xcode (Swift), and Android Studio (Java/Kotlin). I adhered to best practices and coding standards to ensure robust app functionality and performance. I designed and maintained responsive, interactive user interfaces using Angular, HTML5, CSS3, and JavaScript libraries, guaranteeing a seamless user experience across various devices.

                Throughout the software development life cycle, I participated in requirement analysis, design, coding, testing, and deployment, contributing to all facets of project development. I developed back-end functionalities including RESTful APIs, database operations, and the integration of third-party APIs, which significantly enhanced application capabilities and improved user experiences.

                I stayed abreast of the latest trends and technologies in mobile application development, actively contributing to our team’s technical knowledge base. I explored further contract option extensions by training for leadership roles, progressively acting in an increasingly independent manner in all the above responsibilities, demonstrating both technical proficiency and potential for managerial duties.
            "
          />
          <Details
            position="Computer Science Teaching Assistant"
            company="Florida Polytechnic University"
            time="August 2018 - May 2019"
            work="
            I assisted in teaching a range of computer science-focused classes, including Algorithm Analysis & Design, Programming Languages, Data Structures, and Mobile Device Application Development. 
            In collaboration with designated professors, I was involved in planning course material and grading academic papers. 
            Additionally, I offered personalized support to students through one-on-one meetings, helping them understand and master the course material.
            "
          />
          <Details
            position="Game Design and Development Intern"
            company="Cubic Corporation"
            time="July 2014 - June 2015"
            work="
            As a Game Tester & Developer intern for the Navy Department of Defense, I had the unique opportunity to work at the intersection of cutting-edge technology and national security. 
            My role primarily involved leveraging Unreal Engine to create realistic simulation environments, which were pivotal for strategic training and planning purposes. Alongside this, I honed my programming skills in Java, focusing on backend development to ensure the seamless operation and integration of these simulations. This position allowed me to contribute significantly to the advancement of military training tools, while also expanding my technical expertise in both game development and software engineering within a high-stakes environment.
            "
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
