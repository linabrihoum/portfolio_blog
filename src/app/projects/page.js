
import ProjectSection from "@/src/components/Projects/ProjectSection";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: "My Projects!",
  description: `Here are some cool projects I've made!`, 
};


export default function About() {
    return(
        <section>
        <ProjectSection />
        </section>
    );
}