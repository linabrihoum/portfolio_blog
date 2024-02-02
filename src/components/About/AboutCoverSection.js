import React from "react";
import Description from "./Description";
import Experience from "./Experience";
import Education from "./Education";
import Certifications from "./Certifications";
import Skills from "../Home/Skills";
import TransitionEffect from "../Home/TransitionEffect";


const AboutCoverSection = () => {
  return (
    <>
      <TransitionEffect />
      <section className="justify-center">
        <div className="dark:text-white text-dark ">
          <Description />
          <Skills />
          <Experience />
          <Education />
          <Certifications />
        </div>
      </section>
    </>
  );
};

export default AboutCoverSection;
