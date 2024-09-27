"use client";
import React from "react";
import profileCharacter from "../../../public/profile_pic.jpg";
import Image from "next/image";

const Description = () => {
  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center text-dark dark:text-light p-4 md:p-8">
      <div className="w-full md:w-1/2 flex flex-col text-center md:text-left items-center md:items-start justify-center px-5 xs:px-10 pb-10 lg:px-16">
        <h2 className="font-bold text-4xl xs:text-5xl lg:text-6xl">
          {`Hey there! I'm Lina Brihoum :)`}
        </h2>
        <p className="font-medium mt-4 text-base">
          <br />
          I'm a DevSecOps Architect that specializes in Site Reliability, Cyber Security
          and Artificial Intelligence. <br />
          <br /> I have a total of 10 years of experience in technology ranging
          from game development, networking, full stack development, cyber
          security and cloud architecture. <br /> <br />
          My hobbies include weight lifting, reading, cooking, crocheting, and
          playing video games. <br /> <br />
          I created this to share my knowledge and experience regarding
          different sectors of technology, I hope you enjoy! <br />
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center pt-10 md:pt-0">
        <div className="w-3/4 md:w-3/5 lg:w-1/2">
          <Image
            src={profileCharacter}
            alt="Lina Brihoum"
            className="w-full h-auto object-contain object-center"
            style={{ borderRadius: "60px" }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Description;
