import React from "react";
import TransitionEffect from "../Home/TransitionEffect";
import Skills from "./Skills";
import HomeDescription from "./HomeDescription";

const HomeCoverSection = () => {
  return (
    <>
      <TransitionEffect />
        <div className="justify-center dark:text-white text-dark ">
          <HomeDescription />
          <Skills />
        </div>
    </>
  );
};

export default HomeCoverSection;
