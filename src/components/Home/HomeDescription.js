"use client";
import React  from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { motion } from "framer-motion";

const HomeDescription = () => {

  return (
    <section className="w-full h-full md:h-[60vh] flex flex-col md:flex-row items-center justify-center text-dark dark:text-light mt-16 md:mt-24">

      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ delay: 1 }}
          className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left"
        >
          {`Hey there!`} <span className="text-bold"> </span>
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ delay: 1.5 }}
          className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left"
        >
          {`I'm Lina Brihoum :)`} <span className="text-bold"> </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -30 }}
          transition={{ delay: 2 }}
          className="font-medium mt-4 text-base"
        >
          I'm a Cloud Architect that specializes in Site Reliability, DevSecOps,
          and Artificial Intelligence. <br />
        </motion.p>
      </div>
      
      <div className="w-full md:w-1/2 items-start justify-center px-5 xs:p-10 lg:px-16">
        <DotLottiePlayer
          src="https://lottie.host/c09d0c47-6720-44f8-b5b1-716ee091da61/tAX7GLIRcm.lottie"
          className="w-full h-full"
          style={{ paddingBottom: "2.5rem" }}
          autoplay
          loop
        ></DotLottiePlayer>
      </div>

    </section>
  );
};

export default HomeDescription;
