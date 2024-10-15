import React from "react";
import Info from "./Info";
import { AnimatedPinDemo } from "./ProjectCard";


const ProjectSection = () => {
  return (
    <div className="dark:text-white text-dark ">
      <Info />
      <AnimatedPinDemo />
    </div>
  );
};

export default ProjectSection;
