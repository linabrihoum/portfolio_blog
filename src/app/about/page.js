
import AboutCoverSection from "@/src/components/About/AboutCoverSection";
import siteMetadata from "@/src/utils/siteMetaData";

// Custom metadata
export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: "About Me!",
  description: `Here are some details about myself.`, 
};


export default function About() {
    return(
        <section>
        <AboutCoverSection />
        </section>
    );
}