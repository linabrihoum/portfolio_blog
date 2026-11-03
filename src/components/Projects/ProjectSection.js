import { SectionHeading } from "../Elements/SectionHeading";
import { CometField } from "../ui/CometField";
import { Reveal } from "../ui/Reveal";
import { Starfield } from "../ui/Starfield";
import { ProjectCard } from "./ProjectCard";

const PADDING = "px-5 sm:px-10 md:px-24 sxl:px-32";

// Featured projects as large cards alternating image left/right, then the rest in a grid.
export function ProjectSection({ projects }) {
  const sorted = [...projects].sort((a, b) => a.id - b.id);
  const featured = sorted.filter((project) => project.featured);
  const rest = sorted.filter((project) => !project.featured);

  return (
    <>
      {/* Pulled up under the see-through header so the stars start at the very top */}
      <section className={`relative -mt-16 overflow-hidden pb-12 pt-32 ${PADDING}`}>
        <Starfield density={90} seed={17} />
        <CometField count={7} seed={31} />
        <Reveal className="relative">
          <SectionHeading
            title="Projects"
            subtitle="Things I've built across cloud, machine learning, and the web. Every project links to its source code."
          />
        </Reveal>
      </section>

      <div className={`mx-auto grid max-w-[1280px] gap-10 pb-24 ${PADDING}`}>
        <section aria-label="Featured projects" className="grid gap-10">
          {featured.map((project, i) => (
            <Reveal key={project.id} y={60} duration={0.7}>
              <ProjectCard {...project} imagePosition={i % 2 ? "right" : "left"} />
            </Reveal>
          ))}
        </section>
        {/* Wrapping flex rather than a grid, so a short last row sits in the middle */}
        <section aria-label="More projects" className="mt-6 flex flex-wrap justify-center gap-8">
          {rest.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 0.12}
              y={40}
              className="w-full md:w-[calc((100%-2rem)/2)] xl:w-[calc((100%-4rem)/3)]"
            >
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </section>
      </div>
    </>
  );
}
