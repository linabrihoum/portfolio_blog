import React from "react";
import TransitionEffect from "../Home/TransitionEffect";
import HomeDescription from "./HomeDescription";

const HomeCoverSection = () => {
  return (
    <>
      <TransitionEffect />
        <div className="justify-center dark:text-white text-dark ">
          <HomeDescription />
        </div>
    </>
  );
};

export default HomeCoverSection;
