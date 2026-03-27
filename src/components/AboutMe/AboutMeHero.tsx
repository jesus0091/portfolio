"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

import { AuroraGlow } from "../AuroraGlow";
import ButtonOutlined from "../ButtonOutlined";
import SkillsCarousel from "./Skills";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "+", label: "Projects delivered" },
  { value: 1, suffix: "", label: "Design & Code profile" },
];

const AboutMeHero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [eyebrowRef.current, titleRef.current, statsRef.current, skillsRef.current],
          { clearProps: "all" }
        );
        return;
      }

      // Scale-in on section title (Apple-style)
      gsap.fromTo(
        titleRef.current,
        { scale: 1.12, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        }
      );

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

      // Stat counters count-up
      const statEls = statsRef.current?.querySelectorAll<HTMLElement>("[data-count]");
      statEls?.forEach((el, i) => {
        const target = STATS[i].value;
        const suffix = STATS[i].suffix;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      });

      // Stats fade-in stagger
      const statCards = statsRef.current?.querySelectorAll<HTMLElement>("[data-stat-card]");
      if (statCards?.length) {
        gsap.fromTo(
          statCards,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Skills carousel
      gsap.fromTo(
        skillsRef.current,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 90%",
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

        <div className="flex flex-col z-10 items-center px-4 justify-center gap-6 w-full">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p
              ref={eyebrowRef}
              className="select-none text-lg md:text-xl tracking-wide leading-none font-normal block text-center text-[var(--orange)]"
            >
              Jesus Hernandez
            </p>
            <p
              ref={titleRef}
              className="text-4xl md:text-[90px] font-black tracking-tight leading-none text-center text-[var(--black)] max-w-4xl will-change-transform"
            >
              The Creative Mind Behind the Code
            </p>
          </div>
          <ButtonOutlined>Lets start a project together</ButtonOutlined>
        </div>

        {/* Stat counters */}
        <div
          ref={statsRef}
          className="z-10 flex flex-row gap-6 md:gap-16 px-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-stat-card
              className="flex flex-col items-center gap-1"
            >
              <span
                data-count
                className="text-4xl md:text-6xl font-black tracking-tight text-[var(--black)]"
              >
                0{stat.suffix}
              </span>
              <span className="text-sm md:text-base text-[var(--muted)] text-center max-w-[100px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div ref={skillsRef} className="w-full z-10">
          <SkillsCarousel />
        </div>
      </section>
    </Fragment>
  );
};

export default AboutMeHero;
