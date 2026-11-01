import Image from "next/image";
import { LinkArrow } from "../Header/Icons";
import { SectionHeading } from "../Elements/SectionHeading";
import { TechChip } from "../Elements/TechChip";
import { Reveal } from "../ui/Reveal";

function ProjectTile({ project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group grid grid-cols-1 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 transition-[transform,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 hover:border-[var(--border-strong)] hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-space-800">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 240px"
        />
      </div>
      <div className="pr-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-fg-1">{project.title}</h3>
          <span className="inline-flex w-[18px] text-fg-3 transition-colors duration-200 group-hover:text-[var(--cyan-300)]">
            <LinkArrow />
          </span>
        </div>
        <p className="mb-3.5 mt-2 text-[15px] leading-relaxed text-[var(--text-body)]">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <TechChip key={tech}>{tech}</TechChip>
          ))}
        </div>
      </div>
    </a>
  );
}

// The projects marked featured: true in projectsData.js.
export function ProjectStrip({ projects }) {
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="pt-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 md:px-16">
        <Reveal>
          <SectionHeading align="split" title="Featured Projects" linkLabel="see all" linkHref="/projects" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map((project) => (
              <ProjectTile key={project.id} project={project} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
