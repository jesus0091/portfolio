"use client";

import React, { useLayoutEffect, useRef } from "react";

import { IconSparkles } from "@tabler/icons-react";
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
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const label = labelRef.current!;
      const title = titleRef.current!;
      const divider = dividerRef.current!;
      const rows = rowsRef.current!.querySelectorAll<HTMLElement>("[data-row]");
      const rowLabels = rowsRef.current!.querySelectorAll<HTMLElement>("[data-row-label]");
      const chips = rowsRef.current!.querySelectorAll<HTMLElement>("[data-chip]");
      const content = contentRef.current!;

      if (reduce) {
        gsap.set([label, title, divider, rows, rowLabels, chips, content], { autoAlpha: 1, y: 0, scaleX: 1 });
        return;
      }

      // Estados iniciales
      gsap.set(label, { autoAlpha: 0, y: 16 });
      gsap.set(title, { autoAlpha: 0, y: 32 });
      gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(rows, { autoAlpha: 0, y: 20 });
      gsap.set(rowLabels, { autoAlpha: 0, x: -16 });
      gsap.set(chips, { autoAlpha: 0, y: 8, scale: 0.92 });

      // Entrada scrub
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 0%",
          scrub: 1,
        },
      })
        .to(label,     { autoAlpha: 1, y: 0, duration: 0.1 }, 0)
        .to(title,     { autoAlpha: 1, y: 0, duration: 0.15 }, 0.08)
        .to(divider,   { scaleX: 1, duration: 0.15 }, 0.18)
        .to(rows,      { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.07 }, 0.25)
        .to(rowLabels, { autoAlpha: 1, x: 0, duration: 0.1, stagger: 0.07 }, 0.28)
        .to(chips,     { autoAlpha: 1, y: 0, scale: 1, duration: 0.08, stagger: 0.008 }, 0.35);

      // Salida scrub
      gsap.set(content, { willChange: "transform,opacity" });
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top 0%",
          end: "top -15%",
          scrub: 1,
        },
      })
        .to(content, { autoAlpha: 0, scale: 0.92, y: -20, duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 md:px-8 max-w-[1280px] mx-auto w-full"
    >
      <div ref={contentRef}>
        <div className="mb-10">
          <p ref={labelRef} className="text-xl font-semibold text-[var(--orange)] tracking-wide mb-2">
            Skills
          </p>
          <h2 ref={titleRef} className="text-3xl md:text-6xl font-semibold text-[var(--black)] leading-tighter tracking-tight">
            What I bring to the table.
          </h2>
        </div>

        <div ref={rowsRef} className="border-t border-[var(--black)]/10">
          <div ref={dividerRef} className="hidden" />
          {CATEGORIES.map(({ key, label, skills }) => (
            <div
              key={key}
              data-row
              className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-6 border-b border-[var(--black)]/10 last:border-b-0"
            >
              <div className="md:min-w-[200px] pt-0.5">
                <span data-row-label className="text-xl font-semibold text-[var(--black)]">
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

        <style>{`
          @keyframes skills-text-sweep {
            0%, 77%   { background-position: 100% 0; }
            91%       { background-position: 0% 0; }
            94%, 100% { background-position: 100% 0; }
          }
          .skills-learning-text {
            background: linear-gradient(
              90deg,
              rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.55) 38%,
              #ff6600 48%, #ffaa00 52%,
              rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.55) 100%
            );
            background-size: 400% 100%;
            background-repeat: no-repeat;
            background-position: 100% 0;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: skills-text-sweep 10s ease-in-out infinite;
          }
        `}</style>
        <p className="mt-8 flex items-center gap-2 text-xl font-medium text-[var(--black)]/55">
          <IconSparkles size={16} className="shrink-0 text-[var(--black)]/25" />
          <span className="skills-learning-text">always learning, always growing.</span>
        </p>
      </div>
    </section>
  );
};

export default AboutMeSkills;
