"use client";
import React, { useEffect, useState } from "react";
import profileCharacter from "../../../public/profile_pic.jpg";
import Image from "next/image";

const Description = () => {

  return (
    <section className="w-full md:h-[60vh] flex flex-col md:flex-row items-center justify-center text-dark dark:text-light">
      <div className="w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16">
        <h2 className="font-bold text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left">
          {`Hey there! I'm Lina Brihoum :)`}{" "}
          <span className="text-bold"> </span>
        </h2>
        <p className="font-medium mt-4 text-base">
          I'm a Cloud Architect that specializes in Site Reliability, DevSecOps,
          and Artificial Intelligence. <br />I have a total of 10 years of
          experience in technology ranging from game development, full stack
          development, and cloud architecture. <br />
          My hobbies include weight lifting, reading, cooking, crocheting, and
          playing video games. <br />
          I created this blog to share my knowledge and experience regarding
          different sectors of technology, I hope you enjoy! <br />
        </p>
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

export default Description;
