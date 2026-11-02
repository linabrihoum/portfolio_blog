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
    // Pulled up under the see-through header so the background fills the whole screen.
    // At least one screen tall; grows if the card needs more room (short laptop screens).
    <main className="relative -mt-16 flex min-h-screen flex-col overflow-hidden bg-[var(--surface-deep)] pt-16">
      <Starfield density={80} seed={22} />
      <Vortex
        particleCount={600}
        rangeY={140}
        containerClassName="flex flex-1"
        className="flex w-full items-center justify-center px-5 py-10"
      >
        <ContactPage />
      </Vortex>
    </main>
  );
}
