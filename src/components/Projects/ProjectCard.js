"use client";
import Image from "next/image";
import { Button } from "../Elements/Button";
import { TechChip } from "../Elements/TechChip";
import { GithubIcon } from "../Header/Icons";
import { CardBody, CardContainer, CardItem } from "./3d-card";

const TechChips = ({ tech }) =>
  tech?.length ? (
    <div className="mb-4 flex flex-wrap gap-2">
      {tech.map((item) => (
        <TechChip key={item}>{item}</TechChip>
      ))}
    </div>
  ) : null;

const SourceButton = ({ link }) => (
  <Button href={link} variant="accent" size="sm" target="_blank" rel="noreferrer">
    <span className="inline-flex w-4 fill-white">
      <GithubIcon aria-hidden="true" />
    </span>
    View Source
  </Button>
);

const CARD = "rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6";

// Featured (spotlight) card: image beside the text, springs up on hover.
function FeaturedCard({ title, description, image, link, tech, imagePosition }) {
  return (
    <div
      className={`group ${CARD} transition-[transform,box-shadow] duration-[450ms,300ms] [transition-timing-function:var(--ease-spring),ease] hover:-translate-y-2 hover:shadow-lift`}
    >
      <div className={`flex flex-col gap-6 md:items-center ${imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[var(--surface-raised)] md:h-80 md:w-1/2">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-full md:w-1/2 md:px-6">
          <h2 className="mb-2 text-2xl font-bold text-[var(--text-heading)]">{title}</h2>
          <p className="mb-4 leading-relaxed text-[var(--text-body)]">{description}</p>
          <TechChips tech={tech} />
          <SourceButton link={link} />
        </div>
      </div>
    </div>
  );
}

// Grid card: tilts toward the mouse in 3D, its layers lifting by different
// amounts. 3d-card writes the tilt straight to the element's style, so moving
// the mouse doesn't re-render React.
function GridCard({ title, description, image, link, tech }) {
  return (
    <CardContainer className="h-full w-full" containerClassName="h-full w-full py-0">
      <CardBody className={`group/card flex h-full w-full flex-col ${CARD} transition-shadow duration-300 hover:shadow-lift`}>
        <CardItem translateZ="100" className="w-full">
          <div className="relative h-52 w-full overflow-hidden rounded-xl bg-[var(--surface-raised)]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </CardItem>
        <CardItem as="h3" translateZ="50" className="mb-2 pt-5 text-xl font-bold text-[var(--text-heading)]">
          {title}
        </CardItem>
        <CardItem as="p" translateZ="60" className="mb-4 flex-1 leading-relaxed text-[var(--text-body)]">
          {description}
        </CardItem>
        <CardItem translateZ="40" className="w-full">
          <TechChips tech={tech} />
        </CardItem>
        <CardItem translateZ="20">
          <SourceButton link={link} />
        </CardItem>
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
