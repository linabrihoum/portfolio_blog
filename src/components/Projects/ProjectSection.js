// ProjectSection.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import projects from "./projectsData";

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const featuredVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ProjectSection = () => {
  const featuredProjects = projects.filter((project) => project.featured);
  const gridProjects = projects.filter((project) => !project.featured);

  return (
    <section className="text-dark dark:text-light px-5 sm:px-10 md:px-24 sxl:px-32 pb-24">
      {/* Page header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="mt-16 mb-12 text-center"
      >
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
          Projects
        </h1>
        <p className="mt-4 text-base md:text-lg text-dark/70 dark:text-light/70 max-w-2xl mx-auto">
          Things I&apos;ve built across cloud, machine learning, and the web.
          Every project links to its source code.
        </p>
        <span className="inline-block mt-6 w-24 h-1 rounded-full bg-accent dark:bg-accentDark" />
      </motion.div>

      {/* Featured projects — large alternating spotlight cards */}
      <div className="flex flex-col gap-10">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={featuredVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <ProjectCard
              {...project}
              imagePosition={index % 2 === 0 ? "left" : "right"}
            />
          </motion.div>
        ))}
      </div>

      {/* Remaining projects — staggered reveal grid */}
      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {gridProjects.map((project) => (
          <motion.div key={project.id} variants={gridItemVariants} className="h-full">
            <ProjectCard {...project} imagePosition="top" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectSection;
