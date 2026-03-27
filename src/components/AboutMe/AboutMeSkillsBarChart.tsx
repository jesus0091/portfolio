"use client";

import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const CATEGORIES = [
  {
    key: "dev",
    label: "Development",
    skills: [
      "React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS",
      "GSAP", "Framer Motion", "Zustand", "Redux", "Jotai",
      "Storybook", "Git", "Claude API", "OpenAI API", "AI Prompting",
    ],
  },
  {
    key: "design",
    label: "Design",
    skills: [
      "Figma", "Design System", "Prototyping", "UX Research",
      "Accessibility", "AI Design", "Midjourney",
    ],
  },
  {
    key: "soft",
    label: "Soft Skills",
    skills: [
      "Communication", "Teamwork", "Problem Solving", "Empathy",
      "Ownership", "Mentoring", "Adaptability", "Critical Thinking",
      "Self-management",
    ],
  },
];

const AboutMeSkills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current!;
    const header = headerRef.current!;
    const rows = rowsRef.current!.querySelectorAll<HTMLElement>("[data-row]");
    const chips = rowsRef.current!.querySelectorAll<HTMLElement>("[data-chip]");

    gsap.set(header, { autoAlpha: 0, y: 24 });
    gsap.set(rows, { autoAlpha: 0, y: 16 });
    gsap.set(chips, { autoAlpha: 0, y: 10 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .to(rows, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      }, "-=0.2")
      .to(chips, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.02,
      }, "-=0.3");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 md:px-8 max-w-[1280px] mx-auto w-full"
    >
      <div ref={headerRef} className="mb-10">
        <p className="text-xl font-semibold text-[var(--orange)] tracking-wide mb-2">
          Skills
        </p>
        <h2 className="text-3xl md:text-6xl font-semibold text-[var(--black)] leading-tighter tracking-tight">
          What I bring to the table.
        </h2>
      </div>

      <div ref={rowsRef} className="border-t border-[var(--black)]/10">
        {CATEGORIES.map(({ key, label, skills }) => (
          <div
            key={key}
            data-row
            className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-6 border-b border-[var(--black)]/10 last:border-b-0"
          >
            <div className="md:min-w-[140px] pt-0.5">
              <span className="text-base font-semibold tracking-widest uppercase text-[var(--black)]">
                {label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((name) => (
                <span
                  key={`${key}-${name}`}
                  data-chip
                  className="select-none rounded-full bg-[var(--black)]/5 text-[var(--black)] px-4 py-1.5 text-base font-medium"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutMeSkills;
