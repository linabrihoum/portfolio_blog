import ProjectSection from "@/src/components/Projects/ProjectSection";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: "Projects",
  description:
    "Projects by Lina Brihoum — cloud engineering, machine learning, and web development work with links to source code.",
};

export default function Projects() {
  return (
    <section>
      <ProjectSection />
    </section>
  );
}
