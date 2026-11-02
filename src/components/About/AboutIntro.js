import Image from "next/image";
import profilePic from "@/public/profile_pic.jpg";
import { Nebula } from "../ui/Nebula";
import { ParallaxLayer } from "../ui/ParallaxLayer";
import { Reveal } from "../ui/Reveal";
import { Starfield } from "../ui/Starfield";

const PARAGRAPHS = [
  "I'm a DevSecOps Architect that specializes in Site Reliability, Artificial Intelligence, and Software.",
  "I have over 10 years of experience in technology ranging from game development, networking, full stack development, cyber security and cloud architecture.",
  "My hobbies include weight lifting, reading, cooking, drawing, and playing video games.",
  "I created this to share my knowledge and experience regarding different sectors of technology, I hope you enjoy!",
];

// Intro text beside the portrait, with stars and the horizon glow drifting behind.
export function AboutIntro() {
  return (
    // Pulled up under the see-through header so the stars start at the very top
    <section className="relative -mt-16 flex min-h-screen items-center overflow-hidden pt-16">
      <ParallaxLayer speed={0.1}>
        <Starfield density={120} seed={14} />
      </ParallaxLayer>
      <ParallaxLayer speed={0.3}>
        <Nebula preset="horizon" intensity={0.3} />
      </ParallaxLayer>

      <div className="relative flex w-full flex-wrap items-center gap-12 px-5 py-8 sm:px-10 md:px-16">
        <Reveal className="flex-[1_1_420px]">
          <h1 className="text-4xl font-bold leading-[1.1] text-fg-1 sm:text-5xl lg:text-[60px]">
            Hey there! I&apos;m Lina Brihoum :)
          </h1>
          <div className="mt-6 grid max-w-[560px] gap-4 font-medium leading-relaxed text-fg-2">
            {PARAGRAPHS.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto flex-[0_1_380px]">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[84px] bg-[radial-gradient(closest-side,rgba(99,68,245,.55),transparent)] blur-[16px]"
            />
            <Image
              src={profilePic}
              alt="Lina Brihoum"
              priority
              sizes="(max-width: 480px) 100vw, 380px"
              className="relative block h-auto w-full rounded-[60px] shadow-[var(--shadow-glow-indigo)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
