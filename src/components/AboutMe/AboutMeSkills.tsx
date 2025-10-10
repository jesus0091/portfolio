"use client";

import React, { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

type Skill = { name: string; level: number }; // 0..100
type SkillGroup = { title: string; caption?: string; items: Skill[] };

const SKILLS: SkillGroup[] = [
  {
    title: "Frontend",
    caption: "Frameworks · Lenguajes · Styling",
    items: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 86 },
      { name: "TypeScript", level: 84 },
      { name: "TailwindCSS", level: 88 },
      { name: "Zustand/Jotai", level: 70 },
      { name: "Framer Motion / GSAP", level: 76 },
    ],
  },
  {
    title: "Design",
    caption: "UI · Prototyping · Systems",
    items: [
      { name: "Figma", level: 90 },
      { name: "Design System", level: 86 },
      { name: "Prototyping", level: 84 },
      { name: "UX Research", level: 70 },
      { name: "Accessibility", level: 72 },
    ],
  },
  {
    title: "Tools",
    caption: "Ecosistema · Build · Colab",
    items: [
      { name: "Git / GitHub", level: 82 },
      { name: "Vite / Webpack", level: 72 },
      { name: "Jest / RTL", level: 60 },
      { name: "Storybook", level: 68 },
      { name: "CI/CD", level: 58 },
    ],
  },
];

const AboutMeSkills2: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const cards = section.querySelectorAll<HTMLElement>("[data-skill-card]");
      const bars = section.querySelectorAll<HTMLElement>("[data-skill-bar]");

      gsap.set(cards, { y: 18, opacity: 0, willChange: "transform,opacity" });
      gsap.set(bars, {
        scaleX: 0,
        transformOrigin: "0% 50%",
        willChange: "transform",
      });

      // Stagger de tarjetas
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });

      // Carga de barras
      bars.forEach((bar) => {
        const value = Number(bar.dataset.value || 0) / 100; // 0..1
        gsap.to(bar, {
          scaleX: value,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28"
      aria-labelledby="skills-title"
    >
      {/* Fondo de cuadrícula centrada */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-10 text-center">
          <p className="text-sm uppercase tracking-widest text-orange-600">
            Stack & Craft
          </p>
          <h2
            id="skills-title"
            className="mt-2 text-5xl md:text-6xl font-black tracking-tight text-zinc-900"
          >
            Skills
          </h2>
          <p className="mt-3 text-zinc-600">
            Tecnología + Diseño para productos consistentes y escalables.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group) => (
            <article
              key={group.title}
              data-skill-card
              className="rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow"
              aria-labelledby={`group-${group.title}`}
            >
              <div className="mb-4">
                <h3
                  id={`group-${group.title}`}
                  className="text-xl font-bold text-zinc-900"
                >
                  {group.title}
                </h3>
                {group.caption && (
                  <p className="text-sm text-zinc-500">{group.caption}</p>
                )}
              </div>

              <ul className="space-y-3">
                {group.items.map((s) => (
                  <li key={s.name}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-800">
                        {s.name}
                      </span>
                      <span className="text-xs tabular-nums text-zinc-500">
                        {s.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-200/80 overflow-hidden">
                      <div
                        data-skill-bar
                        data-value={s.level}
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                        aria-hidden
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Badges “chips” opcionales debajo */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "TailwindCSS",
            "GSAP",
            "Figma",
            "Design System",
            "Accessibility",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-zinc-300/70 bg-white/70 px-3 py-1 text-sm text-zinc-700"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMeSkills2;
