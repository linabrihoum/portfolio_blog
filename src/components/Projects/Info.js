"use client";
import React from "react";

const Info = () => {
  return (
    <section className=" flex flex-col md:flex-row items-center justify-left text-dark dark:text-light p-4 md:p-8">
      <div className="w-full md:w-1/2 flex flex-col text-center md:text-left items-center md:items-start justify-center px-5 xs:px-10 pb-10 lg:px-16">
        <h2 className="font-bold text-2xl xs:text-3xl lg:text-4xl">
          {`Welcome to my projects!`}
        </h2>
        <p className="font-medium mt-4 text-base">
          <br />
          My tech stack <br />
        </p>
      </div>


    </section>
  );
};

export default Info;
