"use client";
import React, { useEffect, useState } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";

const HomeDescription = () => {

  return (
    <section className="w-full h-screen md:h-[60vh] flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      <div className="w-full md:w-1/2 items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <DotLottiePlayer
          src="https://lottie.host/c09d0c47-6720-44f8-b5b1-716ee091da61/tAX7GLIRcm.lottie"
          className="w-full h-full"
          style={{ paddingBottom: "2.5rem" }}
          autoplay
          loop
        ></DotLottiePlayer>
      </div>

      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left">
          {`Hey there!`}{" "}
          <span className="text-bold"> </span>
        </h2>
        <h2 className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left">
          {`I'm Lina Brihoum :)`}{" "}
          <span className="text-bold"> </span>
        </h2>
        <p className="font-medium mt-4 text-base">
          I'm a Cloud Architect that specializes in Site Reliability, DevSecOps,
          and Artificial Intelligence. <br />
        </p>
      </div>
    </section>
  );
};

export default HomeDescription;
