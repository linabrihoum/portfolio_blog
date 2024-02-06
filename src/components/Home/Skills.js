"use client";
import React from "react";
import { motion } from "framer-motion";

const TechTile = ({ name }) => (
  <div
    className="rounded p-4 text-sm cursor-pointer bg-dark dark:bg-light text-light dark:text-dark
    hover:text-accent dark:hover:text-white hover:bg-accentDark dark:hover:bg-accent"
  >
    <h1 className="text-xl font-bold"> {name} </h1>
  </div>
);

const TechGallery = () => {
  const technologies = [
    "Amazon Web Services",
    "Azure",
    "Terraform",
    "Bicep",
    "Docker",
    "Kubernetes/Openshift",
    "Helm",
    "Azure Devops",
    "Github Actions",
    "Jenkins",
    "Python",
    "Java",
    "Bash",
    "JIRA",
    "Scrum/Sprint",
    "Kanban",
    "Git/Github/Gitlab",
    "MySQL/PostgreSQL",
    "MongoDB",
    "Flutter",
    "Android Studio",
    "Xcode",
    "Swift",
    "React",
    "Next.JS",
    "CSS/TailwindCSS",
    "Javascript/Typescript",
    "Linux",
    "MacOS",
    "Windows"
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {technologies.map((tech, index) => (
        <TechTile key={index} name={tech} />
      ))}
    </div>
  );
};

const Skills = () => {
  return (
    <section className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
      <div className="w-full flex justify-between">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <h1 className="text-2xl w-fit inline-block font-bold capitalize md:text-4xl text-dark dark:text-light">
            Skills
          </h1>
        </motion.div>
      </div>

      <div className="flex flex-col gap-16 mt-16 justify-center items-center">
        <TechGallery />
      </div>
    </section>
  );
};

export default Skills;
