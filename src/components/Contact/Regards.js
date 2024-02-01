"use client";
import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";


const Regards = () => {
  return (
    <section className="w-full md:h-[60vh] flex flex-col md:flex-row justify-between text-dark dark:text-light">
      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left">
          {`Let's chat!`}
          <span className="text-bold"> </span>
        </h2>
        <p className="font-medium mt-4 text-base">
          Please contact me regarding any inquires or acknowledgements you may
          have. <br />
          My email is <a className="underline"> brihoumlina@gmail.com </a>
        </p>
      </div>

      <div className="w-full md:w-1/2 items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <DotLottiePlayer
          src="/astronaut.lottie"
          className="w-full h-full"
          style={{ paddingBottom: "2.5rem" }}
          autoplay
          loop
        ></DotLottiePlayer>
      </div>
    </section>
  );
};

export default Regards;
