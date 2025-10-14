// components/AboutMeSkills.tsx
"use client";

import {
  IconCode,
  IconPalette,
  IconProps,
  IconUsersGroup,
} from "@tabler/icons-react";
import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

type Category = {
  key: "dev" | "design" | "soft";
  label: string;
  icon: React.ComponentType<IconProps>;
  skills: string[];
};

const CATEGORIES: Category[] = [
  {
    key: "dev",
    label: "Development",
    icon: IconCode,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "Jotai",
      "Redux",
      "Storybook",
      "Git",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    key: "design",
    label: "Design",
    icon: IconPalette,
    skills: [
      "Figma",
      "Design System",
      "Prototyping",
      "UX Research",
      "Accessibility",
    ],
  },
  {
    key: "soft",
    label: "Soft Skills",
    icon: IconUsersGroup,
    skills: [
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Empathy",
      "Ownership",
      "Mentoring",
    ],
  },
];

const AboutMeSkills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const groupsWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current!;
    const title = titleRef.current!;
    const subtitle = subtitleRef.current!;
    const groupsWrap = groupsWrapRef.current!;
    const groupCards = groupsWrap.querySelectorAll<HTMLElement>("[data-group]");
    const chips = groupsWrap.querySelectorAll<HTMLElement>("[data-chip]");

    // Estado inicial
    gsap.set([title, subtitle], {
      autoAlpha: 0,
      y: 30,
      willChange: "transform,opacity",
    });
    gsap.set(groupCards, {
      autoAlpha: 0,
      y: 40,
      scale: 0.985,
      willChange: "transform,opacity",
    });
    gsap.set(chips, {
      autoAlpha: 0,
      y: 18,
      willChange: "transform,opacity",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      },
    });

    tl.to(title, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(
        subtitle,
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .to(groupCards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
      });

    ScrollTrigger.batch(chips, {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: { each: 0.03, from: "center" },
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 min-h-[90dvh] flex flex-col justify-center"
      aria-labelledby="skills-title"
    >
      {/* Grid de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-rgba) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-rgba) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          backgroundPosition: "center",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
        }}
      />

      <div className="mx-auto max-w-6xl flex flex-col gap-4 px-4">
        <h2
          ref={titleRef}
          id="skills-title"
          className="select-none text-center text-3xl md:text-6xl leading-none font-black text-[var(--orange)]"
        >
          Skills
        </h2>
        <p
          ref={subtitleRef}
          className="text-center text-lg md:text-2xl font-medium text-[var(--black)]/70 max-w-2xl mx-auto"
        >
          A balanced mix of development expertise, design sensibility, and soft
          skills that bring projects to life.
        </p>

        <div
          ref={groupsWrapRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6"
        >
          {CATEGORIES.map(({ key, label, icon: Icon, skills }) => (
            <article
              key={key}
              data-group
              aria-label={`${label} skills`}
              className="rounded-2xl bg-[var(--white)] backdrop-blur p-6 flex flex-col gap-4"
            >
              <header className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--black)]/10">
                  <Icon className="w-6 h-6 text-[var(--black)]/80" />
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-[var(--black)] tracking-tight">
                  {label}
                </h3>
              </header>
              <ul className="flex flex-wrap gap-2">
                {skills.map((name) => (
                  <li
                    key={`${key}-${name}`}
                    data-chip
                    className="select-none rounded-xl bg-[var(--black)]/5 text-[var(--black)] border border-[var(--black)]/10 px-3 py-2 text-center text-base font-medium"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMeSkills;
