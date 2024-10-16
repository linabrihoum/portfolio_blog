// ProjectCard.js

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import Link from "next/link";

export function ProjectCard({
  title,
  description,
  image,
  link,
  imagePosition = "top",
}) {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="bg-gray-50 dark:bg-black relative group/card dark:hover:shadow-2xl dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
        {imagePosition === "left" || imagePosition === "right" ? (
          // Horizontal Layout
          <div className="flex flex-col md:flex-row">
            {imagePosition === "left" && (
              <CardItem translateZ="100" className="w-full md:w-1/2">
                <div className="relative w-full h-64">
                  <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl group-hover/card:shadow-xl"
                  />
                </div>
              </CardItem>
            )}
            <div className="flex flex-col justify-center w-full md:w-1/2 p-6">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white mb-2"
              >
                {title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 dark:text-neutral-300 text-base mb-4"
              >
                {description}
              </CardItem>
              <div className="flex space-x-4">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={link}
                  className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Learn More →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={link}
                  className="px-4 py-2 rounded-md bg-black dark:bg-white text-white dark:text-black text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  View Demo
                </CardItem>
              </div>
            </div>
            {imagePosition === "right" && (
              <CardItem translateZ="100" className="w-full md:w-1/2">
                <div className="relative w-full h-64">
                  <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl group-hover/card:shadow-xl"
                  />
                </div>
              </CardItem>
            )}
          </div>
        ) : (
          // Default Vertical Layout (image on top)
          <>
            <CardItem translateZ="100" className="w-full">
              <div className="relative w-full h-64">
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl group-hover/card:shadow-xl"
                />
              </div>
            </CardItem>
            <div className="p-6">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white mt-4 mb-2"
              >
                {title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 dark:text-neutral-300 text-base mb-4"
              >
                {description}
              </CardItem>
              <div className="flex space-x-4">
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={link}
                  className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Learn More →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as={Link}
                  href={link}
                  className="px-4 py-2 rounded-md bg-black dark:bg-white text-white dark:text-black text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  View Demo
                </CardItem>
              </div>
            </div>
          </>
        )}
      </CardBody>
    </CardContainer>
  );
}
