import React from "react";
import Description from "./Description";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import Skills from "./Skills";

const AboutCoverSection = () => {
  return (
    <section className="justify-center">
      <div className="dark:text-white text-dark ">
        <Description />
        <Skills />
        <Experience />
      </div>
    </section>
  );
};

export default AboutCoverSection;
