import ContactPage from "@/src/components/Contact/ContactPage";
import { Starfield } from "@/src/components/ui/Starfield";
import { Vortex } from "@/src/components/ui/Vortex";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  title: "Contact Me!",
  description: `Contact me or email me at ${siteMetadata.email}`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    // Pulled up under the see-through header so the background fills the whole screen
    <main className="relative -mt-16 h-screen min-h-[620px] overflow-hidden bg-[var(--surface-deep)] pt-16">
      <Starfield density={80} seed={22} />
      <Vortex particleCount={600} rangeY={140} className="flex h-full items-center justify-center px-5">
        <ContactPage />
      </Vortex>
    </main>
  );
}
