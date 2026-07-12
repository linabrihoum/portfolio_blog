// ProjectCard.js
"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import Link from "next/link";
import { GithubIcon } from "../Header/Icons";

const TechChips = ({ tech }) => {
  if (!tech || tech.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((item) => (
        <span
          key={item}
          className="px-2.5 py-1 text-xs font-semibold rounded-full border border-accent/30 text-accent bg-accent/5 dark:border-accentDark/40 dark:text-accentDark dark:bg-accentDark/10"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const sourceLinkClasses =
  "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-light dark:bg-accentDark dark:text-dark text-sm font-bold hover:opacity-80 transition-opacity";

const SourceIcon = () => (
  <span className="w-4 h-4 fill-light dark:fill-dark">
    <GithubIcon />
  </span>
);

// Featured (spotlight) card — smooth hover lift, no 3D tilt
function FeaturedCard({ title, description, image, link, tech, imagePosition }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group bg-light dark:bg-dark border-dark/10 dark:border-light/20 w-full rounded-2xl p-6 border hover:shadow-2xl hover:shadow-accent/[0.2] dark:hover:shadow-accentDark/[0.15] transition-shadow duration-300"
    >
      <div
        className={`flex flex-col gap-6 md:items-center ${
          imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 md:px-6">
          <h2 className="text-xl md:text-2xl font-bold text-dark dark:text-light mb-2">
            {title}
          </h2>
          <p className="text-dark/70 dark:text-light/70 text-base mb-4">
            {description}
          </p>
          <TechChips tech={tech} />
          <div>
            <Link href={link} target="_blank" className={sourceLinkClasses}>
              <SourceIcon />
              View Source
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Grid card — keeps the 3D mouse-tilt effect
function GridCard({ title, description, image, link, tech }) {
  return (
    <CardContainer className="inter-var w-full h-full" containerClassName="py-0 w-full h-full">
      <CardBody className="bg-light dark:bg-dark relative group/card hover:shadow-2xl hover:shadow-accent/[0.15] dark:hover:shadow-accentDark/[0.15] border-dark/10 dark:border-light/20 w-full h-full rounded-2xl p-6 border">
        <div className="flex flex-col h-full">
          <CardItem translateZ="100" className="w-full">
            <div className="relative w-full h-52 overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </CardItem>
          <div className="flex flex-col flex-1 pt-5">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-dark dark:text-light mb-2"
            >
              {title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-dark/70 dark:text-light/70 text-base mb-4"
            >
              {description}
            </CardItem>
            <CardItem translateZ="40" className="w-full">
              <TechChips tech={tech} />
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href={link}
              target="_blank"
              className={sourceLinkClasses}
            >
              <SourceIcon />
              View Source
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export function ProjectCard({ imagePosition = "top", ...project }) {
  if (imagePosition === "left" || imagePosition === "right") {
    return <FeaturedCard {...project} imagePosition={imagePosition} />;
  }
  return <GridCard {...project} />;
}
