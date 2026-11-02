import { ProjectSection } from "@/src/components/Projects/ProjectSection";
import { alternatesFor } from "@/src/utils/metadata";
import projects from "@/src/components/Projects/projectsData";

export const metadata = {
  title: "Projects",
  description:
    "Projects by Lina Brihoum — cloud engineering, machine learning, and web development work with links to source code.",
  alternates: alternatesFor("/projects"),
};

export default function Projects() {
  return (
    <main>
      <ProjectSection projects={projects} />
    </main>
  );
}
