"use client";

import { IconBrandBehance, IconBrandGithub, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useIsMobile } from "@/app/utils/useIsMobile";

type Mode = "solo" | "collab";
type Category = "frontend" | "design";

export type LinkOut = {
  type: "behance" | "github" | "website";
  href: string;
  icon?: React.ReactElement;
};

export type Project = {
  id: string;
  title: string;
  productName: string;
  role: string;
  summary: string;
  stack: string[];
  cover: string;
  category: Category;
  mode: Mode;
  links?: LinkOut[];
};

const PROJECTS: Project[] = [
  {
    id: "mtc-fe",
    title: "SaaS Platform",
    productName: "Move The Chain",
    role: "FrontEnd Developer",
    summary:
      "Development of a SaaS platform focused on employee engagement. Contributed to building workflows, new features, integrations and reusable components.",
    stack: ["ReactJS", "NextJS", "TypeScript", "TailwindCSS", "StyledComponents"],
    cover: "/images/mtc-dev.png",
    category: "frontend",
    mode: "collab",
    links: [{ type: "github", href: "#", icon: <IconBrandGithub /> }],
  },
  {
    id: "mtc-ux",
    title: "SaaS Platform",
    productName: "Move The Chain",
    role: "UX/UI Designer",
    summary:
      "UX/UI design for a SaaS platform that enhances employee engagement. Involved in workflows, wireframes, prototypes and design system.",
    stack: ["Figma", "Figma Design", "UX Research", "Design System", "Prototyping", "UI Design"],
    cover: "/images/mtc-design.png",
    category: "design",
    mode: "collab",
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> }],
  },
  {
    id: "ristario",
    title: "Website Design & Development",
    productName: "Ristario",
    role: "Designer & Developer",
    summary:
      "Complete design and development of Ristario website. From concept to production, including UX/UI design, branding, and full-stack implementation.",
    stack: ["Figma", "ReactJS", "NextJS", "TypeScript", "TailwindCSS", "Design System", "Branding"],
    cover: "/images/linkedin.png",
    category: "frontend",
    mode: "solo",
    links: [
      { type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> },
      { type: "github", href: "#", icon: <IconBrandGithub /> },
    ],
  },
  {
    id: "fundacion-pataro",
    title: "Foundation Website Design",
    productName: "Fundación Pataro",
    role: "UX/UI Designer",
    summary:
      "Complete UX/UI design for Fundación Pataro website. Focused on accessibility, user experience and visual identity to communicate the foundation's mission effectively.",
    stack: ["Figma", "Figma Design", "UX Research", "Accessibility", "Prototyping", "Branding"],
    cover: "/images/Banner-10.png",
    category: "design",
    mode: "solo",
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> }],
  },
  {
    id: "iacon",
    title: "Landing Page Redesigning",
    productName: "IACON",
    role: "UX/UI Designer",
    summary:
      "Redesign of IACON's corporate landing page in Figma, along with new visual assets and branding elements to strengthen the company's digital identity.",
    stack: ["Figma", "Figma Design", "FigJam", "Design System", "Branding"],
    cover: "/images/iacon.png",
    category: "design",
    mode: "solo",
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> }],
  },
  {
    id: "psy-app",
    title: "Mobile App",
    productName: "Academic Project",
    role: "UX/UI Designer",
    summary:
      "Integrative UX/UI project for an iOS app designed for psychologists. Developed from scratch with the full Design Thinking process, research and testing.",
    stack: ["Figma", "Figma Design", "Design System", "iOS", "Prototyping", "UX Research", "Design Thinking"],
    cover: "/images/therapia.png",
    category: "design",
    mode: "solo",
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> }],
  },
  {
    id: "smart-factory",
    title: "Web Dashboard",
    productName: "Smart Factory",
    role: "UX/UI Designer",
    summary:
      "Design of an industrial dashboard used by factory operators to monitor and control production machinery. Project created from scratch with data-first UI.",
    stack: ["Figma", "UX Design", "Prototyping", "Design System", "Branding"],
    cover: "/images/smart-f.png",
    category: "design",
    mode: "solo",
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> }],
  },
  {
    id: "cc-webapp",
    title: "Web Application",
    productName: "Omnipad",
    role: "UX/UI Designer",
    summary:
      "Task management web application for call centers. Users can schedule, manage and track client calls. Flows, wireframes and visual prototype.",
    stack: ["Figma", "Figma Design", "Design System", "Prototyping", "UX Research", "UI Design"],
    cover: "/images/omnipad.png",
    category: "design",
    mode: "solo",
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> }],
  },
];

export default function LatestProjects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [trackOffset, setTrackOffset] = useState(0);
  const isMobile = useIsMobile(768);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    slidesToScroll: 1,
  });

  const [, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Measure container left edge for full-bleed carousel alignment
  useEffect(() => {
    const measure = () => {
      if (anchorRef.current) {
        setTrackOffset(anchorRef.current.getBoundingClientRect().left);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Entry animation
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const label = headerRef.current?.querySelector<HTMLElement>("p");
      const title = headerRef.current?.querySelector<HTMLElement>("h2");
      const subtitle = headerRef.current?.querySelector<HTMLElement>("p:last-child");

      if (label) gsap.set(label, { autoAlpha: 0, x: -20, skewX: -3 });
      if (title) gsap.set(title, { autoAlpha: 0, y: 50, scale: 0.94 });
      if (subtitle) gsap.set(subtitle, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      if (label) tl.to(label, { autoAlpha: 1, x: 0, skewX: 0, duration: 0.5 }, 0);
      if (title) tl.to(title, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.2)" }, 0.1);
      if (subtitle) tl.to(subtitle, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.25);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 md:py-32"
    >
      {/* Header inside container */}
      <div className="mx-auto max-w-[1280px] w-full px-6 md:px-8">
        <div ref={headerRef} className="flex items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            {/* Anchor to measure left offset for full-bleed carousel */}
            <div ref={anchorRef} className="absolute" aria-hidden />
            <p className="text-base md:text-xl font-semibold text-[var(--orange)] tracking-wide">
              Latest Projects
            </p>
            <Link href="/works" className="block max-w-xl">
              <h2 className="text-3xl md:text-6xl text-[var(--black)] font-semibold tracking-tight transition hover:text-[var(--orange)]">
                Building Digital Products & Experience
              </h2>
            </Link>
            <p className="text-base md:text-xl font-medium max-w-lg">
              Highlights of collaborative and solo projects that shaped my expertise.
            </p>
          </div>

          <Link
            href="/works"
            className="hidden md:inline-flex items-center gap-2 shrink-0 rounded-full px-6 py-3 bg-[var(--black)] text-white font-medium text-base transition hover:bg-zinc-800"
          >
            View all works
            <IconArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Carousel — full bleed */}
      <div ref={emblaRef} className="overflow-hidden px-6 md:px-0">
        <div className="flex gap-5" style={{ paddingLeft: isMobile ? undefined : trackOffset }}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="shrink-0 w-[calc(100vw-64px)] md:w-[520px] lg:w-[560px]"
              style={!isMobile && i === PROJECTS.length - 1 ? { marginRight: trackOffset } : undefined}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer — texto + CTA */}
      <div className="mx-auto max-w-[1280px] w-full px-6 md:px-8 mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <p className="text-base md:text-xl font-medium text-[var(--muted)] max-w-md">
          Each project is a story, from brief to launch, design to code.{" "}
          <span className="text-[var(--black)]">See the full picture.</span>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/works"
            className="md:hidden inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[var(--black)] text-white font-medium text-sm transition hover:bg-zinc-800"
          >
            View all works
            <IconArrowRight size={16} />
          </Link>
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous project"
            className="h-10 w-10 cursor-pointer rounded-full border border-black/15 bg-white flex items-center justify-center transition-all duration-200 hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          >
            <IconArrowLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next project"
            className="h-10 w-10 cursor-pointer rounded-full border border-black/15 bg-white flex items-center justify-center transition-all duration-200 hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          >
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
