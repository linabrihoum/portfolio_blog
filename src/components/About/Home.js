"use client";
import React, { useEffect, useState } from "react";
import profileCharacter from "../../../public/profile_pic.jpg";
import Image from "next/image";
import Link from "next/link";
import { LinkArrow } from "../Header/Icons";

const Home = () => {
  return (
    <section className="w-full h-screen md:h-[60vh] flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left">
          {`Hey there! I'm Lina Brihoum :)`}{" "}
          <span className="text-bold"> </span>
        </h2>
        <p className="font-medium mt-4 text-base">
          I'm a Cloud Architect that specializes in Site Reliability, DevSecOps,
          and Artificial Intelligence. <br />I have over 10 years of
          experience in technology ranging from game development, networking,
          full stack development and cloud architecture. <br />
          My hobbies include weight lifting, reading, cooking, crocheting, and
          playing video games. <br />
          I created this to share my knowledge and experience regarding
          different sectors of technology, I hope you enjoy! <br />
        </p>
        <br />
        <Link
          href="../../../public/brihoum_resume.pdf"
          target={"_blank"}
          className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
            capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
            dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
            md:p-2 md:px-4 md:text-base
             `}
          download
        >
          Resume <LinkArrow className="ml-1 !w-6 md:!w-4" />
        </Link>
      </div>

      <div className="w-full h-full pt-10  dark:border-light flex justify-center ">
        <Image
          src={profileCharacter}
          alt="LinaBrihoum"
          className="w-4/5 xs:w-3/4 md:w-full h-full object-contain object-center"
          style={{ borderRadius: "60px" }}
          priority
          sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
        />
      </div>
    </section>
  );
};

export default Home;
