import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";
import { SocialLinks } from "../Header/SocialLinks";
import { Starfield } from "../ui/Starfield";
import { CometField } from "../ui/CometField";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden m-2 sm:m-10 mt-16 sm:mt-16 rounded-2xl bg-space-950 border border-[var(--border-subtle)] text-[var(--star)] flex flex-col items-center">
      <Starfield density={70} twinkle={8} seed={11} />
      <CometField count={6} seed={21} minDuration={9} maxDuration={16} />
      <div
        aria-hidden="true"
        className="absolute left-1/2 -bottom-[60%] w-[120%] h-full -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          background: "radial-gradient(closest-side, rgba(99,68,245,.45), rgba(174,72,255,.15) 60%, transparent)",
        }}
      />

      <h3 className="relative mt-16 px-4 font-medium text-center capitalize text-2xl sm:text-3xl lg:text-4xl leading-tight [text-wrap:balance]">
        Cloud Technology, Cyber Security, Artificial Intelligence
      </h3>

      <SocialLinks motionStyle="scale" className="relative mt-8" />

      <a
        href={`mailto:${siteMetadata.email}`}
        className="relative mt-8 px-4 text-center text-lg font-medium underline underline-offset-2"
      >
        Click here to email me for any inquiries!
      </a>

      <div className="relative w-full mt-16 md:mt-24 py-6 px-8 border-t border-[rgba(245,243,255,.5)] font-medium flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between">
        <span className="text-center">
          &copy; {new Date().getFullYear()} Lina Brihoum. All rights reserved.
        </span>
        <Link href="/sitemap.xml" className="text-center underline">
          sitemap.xml
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
