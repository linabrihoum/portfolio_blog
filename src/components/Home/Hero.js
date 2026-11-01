import { Button } from "../Elements/Button";
import { CometField } from "../ui/CometField";
import { Nebula } from "../ui/Nebula";
import { ParallaxLayer } from "../ui/ParallaxLayer";
import { PlanetHorizon } from "../ui/PlanetHorizon";
import { Starfield } from "../ui/Starfield";
import { ScrollCue } from "./ScrollCue";

// The text fades up in three beats (headline, subline, buttons) with the
// ds-reveal keyframe from src/styles/motion.css: pure CSS, no JavaScript.
const reveal = (delay) => ({ animation: `ds-reveal .9s var(--ease-out) ${delay}s both` });

export function Hero() {
  return (
    // Pulled up under the see-through header so the sky starts at the very top
    <section className="relative -mt-16 flex min-h-screen items-center justify-center overflow-hidden pt-16 bg-[image:var(--gradient-sky)]">
      <ParallaxLayer speed={0.08}>
        <Starfield density={200} twinkle={26} seed={4} />
      </ParallaxLayer>
      <ParallaxLayer speed={0.22}>
        <Nebula preset="dusk" intensity={0.5} />
      </ParallaxLayer>
      <CometField count={12} seed={5} style={{ opacity: 0.85 }} />
      <PlanetHorizon height={200} />

      <div className="relative z-[2] max-w-[1080px] px-5 sm:px-10 pb-20 text-center">
        <h1
          className="font-extrabold text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.1] tracking-[-0.02em] text-fg-1 [text-shadow:0_4px_40px_rgba(8,7,23,.8)] [text-wrap:balance]"
          style={reveal(0.4)}
        >
          Hey there! My name is Lina Brihoum :)
        </h1>
        <p
          className="mx-auto mt-6 max-w-[680px] font-medium text-lg md:text-[22px] leading-[1.55] text-fg-2 [text-wrap:pretty]"
          style={reveal(1.8)}
        >
          I&apos;m a Cloud Architect specializing in DevSecOps, Software and Artificial Intelligence.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" style={reveal(2.4)}>
          <Button href="/categories/all" variant="comet" size="lg">
            Read the blog
          </Button>
          <Button href="/about" variant="ghost" size="lg">
            About me
          </Button>
        </div>
      </div>

      <ScrollCue targetId="recent" />
    </section>
  );
}
