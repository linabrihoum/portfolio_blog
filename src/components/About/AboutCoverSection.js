import React from "react";
import Description from "./Description";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";


const AboutCoverSection = () => {
  return (
    <section className="justify-center">
      <div className="dark:text-white text-dark ">
        <Description />
        <Experience />
        <Education />
        <Certifications />
      </div>
    </section>
  );
};

export default AboutCoverSection;
