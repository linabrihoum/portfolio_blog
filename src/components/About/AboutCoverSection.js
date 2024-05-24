import React from "react";
import Description from "./Description";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";


const AboutCoverSection = () => {
  return (
      <div className="dark:text-white text-dark ">
        <Description />
        <Experience />
        <Education />
        <Certifications />
      </div>
  );
};

export default AboutCoverSection;
