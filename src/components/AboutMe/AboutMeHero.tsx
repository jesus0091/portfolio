"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

import { AuroraGlow } from "../AuroraGlow";
import ButtonOutlined from "../ButtonOutlined";
import SkillsCarousel from "./Skills";
import gsap from "gsap";

const AboutMeHero = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const name = root.querySelector(".hero-name") as HTMLElement;
      const title = root.querySelector(".hero-title") as HTMLElement;
      const cta = root.querySelector(".hero-cta") as HTMLElement;
      const skills = root.querySelector(".hero-skills") as HTMLElement;

      // estado inicial
      gsap.set(name, { opacity: 0, y: 100, scale: 4, color: "black" });
      gsap.set(title, { opacity: 0, y: 200 });
      gsap.set(cta, { opacity: 0, y: 50, scale: 0.8 });
      gsap.set(skills, { opacity: 0, y: 40 }); // skills oculto

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1) animación del nombre
      tl.to(name, { opacity: 1, y: 0, duration: 0.3 })
        .to(name, { scale: 1, duration: 0.3, ease: "power2.inOut" }, "-=0.4")
        .to(
          name,
          { color: "oklch(70.5% 0.213 47.604)", duration: 0.3 },
          "-=0.3"
        )

        // 2) aparece el título
        .to(title, { opacity: 1, y: 0, duration: 0.3 }, "+=0.3")

        // 3) aparece el CTA
        .to(cta, { opacity: 1, y: 0, scale: 1, duration: 0.3 }, "+=0.3")

        // 4) aparece SkillsCarousel al final
        .to(skills, { opacity: 1, y: 0, duration: 0.5 }, "+=0.5");
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Fragment>
      <section className="h-[100dvh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <AuroraGlow blobSize={600} speed={4} />
        </div>

        <div
          ref={rootRef}
          className="flex flex-col items-center justify-center gap-6"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="hero-name select-none text-[24px] leading-none block text-center">
              Jesús Hernández
            </p>
            <p className="hero-title text-[80px] font-black leading-none text-center text-black max-w-4xl">
              The Creative Mind Behind the Code
            </p>
          </div>
          <div className="hero-cta">
            <ButtonOutlined>Lets start a project together</ButtonOutlined>
          </div>
          <div className="hero-skills absolute bottom-0 w-full">
            <SkillsCarousel />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutMeHero;
