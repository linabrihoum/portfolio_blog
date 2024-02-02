import React from "react";
import TransitionEffect from "../Home/TransitionEffect";
import Skills from "./Skills";
import Experience from "../About/Experience";
import HomeDescription from "./HomeDescription";

const HomeCoverSection = () => {
  return (
    <>
      <TransitionEffect />
      <section className="justify-center">
        <div className="dark:text-white text-dark ">
          <HomeDescription />
          <Skills />
        </div>
      </section>
    </>
  );
};

export default HomeCoverSection;
