"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

import { AuroraGlow } from "../AuroraGlow";
import ButtonOutlined from "../ButtonOutlined";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const AboutMeHero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([eyebrowRef.current], { clearProps: "all" });
        return;
      }

      gsap.fromTo(
        eyebrowRef.current,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Fragment>
      <section
        id="about"
        ref={rootRef}
        className="relative min-h-[90vh] py-20 md:py-28 flex flex-col items-center justify-between overflow-hidden gap-10"
      >
        <div className="absolute inset-0 flex items-center z-0">
          <AuroraGlow
            blobSize={600}
            speed={4}
            colors={["#007bff1f", "#ff00bb1f", "#00ff951f"]}
          />
        </div>

        <div className="flex flex-col z-10 items-center justify-center gap-6 w-full max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p
              ref={eyebrowRef}
              className="select-none text-lg md:text-xl tracking-wide leading-none font-normal block text-center text-[var(--orange)]"
            >
              Jesus Hernandez
            </p>
          </div>
          <ButtonOutlined>Lets start a project together</ButtonOutlined>
        </div>

      </section>
    </Fragment>
  );
};

export default AboutMeHero;
