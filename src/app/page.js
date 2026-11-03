import { allBlogs } from "contentlayer/generated";
import { alternatesFor } from "@/src/utils/metadata";
import { Hero } from "../components/Home/Hero";
import RecentPosts from "../components/Home/RecentPosts";
import { ProjectStrip } from "../components/Home/ProjectStrip";
import { CredibilityRow } from "../components/Home/CredibilityRow";
import projects from "../components/Projects/projectsData";
import siteMetadata from "../utils/siteMetaData";
import { homeJsonLd } from "../utils/structuredData";

export const metadata = {
  alternates: alternatesFor("/"),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(siteMetadata)) }}
      />
      <Hero />
      <RecentPosts blogs={allBlogs} />
      <ProjectStrip projects={projects} />
      <CredibilityRow />
    </main>
  );
}
