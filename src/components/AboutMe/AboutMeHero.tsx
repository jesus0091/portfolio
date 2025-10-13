"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

import { AuroraGlow } from "../AuroraGlow";
import ButtonOutlined from "../ButtonOutlined";
import SkillsCarousel from "./Skills";
import gsap from "gsap";

const AboutMeHero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = [nameRef.current, titleRef.current, ctaRef.current].filter(
        Boolean
      ) as Element[];

      if (prefersReduced) {
        gsap.set([...items, skillsRef.current!], { clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(items, {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
      }).from(
        skillsRef.current!,
        { y: 40, autoAlpha: 0, duration: 0.5 },
        "+=0.2"
      );

      return () => tl.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Fragment>
      <section className="h-[100dvh] relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <AuroraGlow blobSize={600} speed={4} />
        </div>

        <div
          ref={rootRef}
          className="flex flex-col items-center justify-center gap-6 w-full"
        >
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p
              ref={nameRef}
              className="select-none text-lg md:text-xl tracking-wide leading-none font-normal block uppercase text-center text-orange-600"
            >
              Jesus Hernandez
            </p>
            <p
              ref={titleRef}
              className="text-4xl md:text-[90px] font-black tracking-tight leading-none text-center text-black max-w-4xl"
            >
              The Creative Mind Behind the Code
            </p>
          </div>

          <div ref={ctaRef}>
            <ButtonOutlined>Lets start a project together</ButtonOutlined>
          </div>

          <div ref={skillsRef} className="absolute bottom-0 w-full">
            <SkillsCarousel />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AboutMeHero;
