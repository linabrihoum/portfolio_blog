// ProjectSection.js

import React from "react";
import { ProjectCard } from "./ProjectCard";
import projects from "./projectsData";
import SkillsMarquee from "./SkillsMarquee";

const ProjectSection = () => {
  const row1Projects = projects.filter((project) => project.row === 1);
  const row2Projects = projects.filter((project) => project.row === 2);
  const row3Projects = projects.filter((project) => project.row === 3);
  const row4Projects = projects.filter((project) => project.row === 4);

  return (
    <section className="dark:text-white text-dark px-4 md:px-8 lg:px-16">
      

      {/* First Row */}
      <div className="mt-8">
        {row1Projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            layout="full"
            heightClass="h-28"
            imagePosition="left" // Image on the left, text on the right
          />
        ))}
      </div>

      {/* Second Row */}
      <div className="mt-4">
        {row2Projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            layout="full"
            heightClass="h-20"
            imagePosition="right" // Image on the right, text on the left
          />
        ))}
      </div>

      {/* Third Row */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {row3Projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            layout="third"
            heightClass="h-18"
            imagePosition="top"
          />
        ))}
      </div>

      {/* Fourth Row */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {row4Projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            layout="quarter"
            heightClass="h-18"
            imagePosition="top"
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
