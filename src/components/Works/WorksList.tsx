"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBrandBehance, IconBrandGithub, IconArrowUpRight } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LinkOut = { type: "behance" | "github" | "website"; href: string; label: string };

type Work = {
  id: string;
  index: string;
  category: string;
  title: string;
  productName: string;
  role: string;
  description: string;
  cover: string;
  technologies: string[];
  integrations?: string[];
  tools: string[];
  links?: LinkOut[];
  year: string;
};

const WORKS: Work[] = [
  {
    id: "mtc-fe",
    index: "01",
    category: "Frontend Dev",
    title: "SaaS Platform",
    productName: "Move The Chain",
    role: "FrontEnd Developer",
    year: "2023",
    description:
      "Development of a SaaS platform focused on employee engagement. Built and maintained complex feature workflows, reusable component library, and contributed to the platform's design system implementation in code. Worked in a collaborative Agile team shipping production features weekly.",
    cover: "/images/mtc-dev.png",
    technologies: ["ReactJS", "NextJS", "TypeScript", "TailwindCSS", "StyledComponents"],
    integrations: ["REST API", "Auth0", "Intercom", "Mixpanel"],
    tools: ["Figma", "Git", "Jira", "Vercel"],
    links: [{ type: "github", href: "#", label: "GitHub" }],
  },
  {
    id: "mtc-ux",
    index: "02",
    category: "UX/UI Design",
    title: "SaaS Platform",
    productName: "Move The Chain",
    role: "UX/UI Designer",
    year: "2023",
    description:
      "End-to-end UX/UI design for a SaaS platform that enhances employee engagement. Led design for onboarding flows, dashboard redesign, and the full component design system. Delivered wireframes, interactive prototypes, and production-ready specs.",
    cover: "/images/mtc-design.png",
    technologies: ["Figma", "Design System", "Prototyping", "UX Research"],
    integrations: [],
    tools: ["Figma", "FigJam", "Notion", "Loom"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "ristario",
    index: "03",
    category: "Design & Development",
    title: "Website Design & Development",
    productName: "Ristario",
    role: "Designer & Developer",
    year: "2024",
    description:
      "Full ownership of Ristario's digital presence from concept to production. Designed the brand identity, UI system, and all visual assets, then implemented the full website in Next.js. Shipped as a single handoff-free project.",
    cover: "/images/linkedin.png",
    technologies: ["NextJS", "TypeScript", "TailwindCSS", "ReactJS"],
    integrations: ["Vercel", "Google Analytics"],
    tools: ["Figma", "Git", "Vercel", "Photoshop"],
    links: [
      { type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" },
      { type: "github", href: "#", label: "GitHub" },
    ],
  },
  {
    id: "fundacion-pataro",
    index: "04",
    category: "UX/UI Design",
    title: "Foundation Website",
    productName: "Fundación Pataro",
    role: "UX/UI Designer",
    year: "2023",
    description:
      "Complete UX/UI design for Fundación Pataro's website. Conducted user research, accessibility audits, and built a visual identity that balances emotion with trustworthiness.",
    cover: "/images/Banner-10.png",
    technologies: ["Figma", "UI Design", "Accessibility", "Branding"],
    integrations: [],
    tools: ["Figma", "FigJam", "Notion"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "iacon",
    index: "05",
    category: "UX/UI Design",
    title: "Landing Page Redesign",
    productName: "IACON",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Redesign of IACON's corporate landing page with modern aesthetics and stronger brand positioning. Created new visual assets, a refreshed type system, and a component-based layout system in Figma.",
    cover: "/images/iacon.png",
    technologies: ["Figma", "Design System", "Branding"],
    integrations: [],
    tools: ["Figma", "FigJam", "Illustrator"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "psy-app",
    index: "06",
    category: "UX/UI Design",
    title: "Mobile App — iOS",
    productName: "Academic Project",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Full Design Thinking process applied to an iOS application for psychologists. From discovery interviews and empathy maps to wireframes, high-fidelity prototypes, and usability testing.",
    cover: "/images/therapia.png",
    technologies: ["Figma", "iOS Design", "Design System", "Prototyping"],
    integrations: [],
    tools: ["Figma", "FigJam", "Maze"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "smart-factory",
    index: "07",
    category: "UX/UI Design",
    title: "Industrial Dashboard",
    productName: "Smart Factory",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Data-first dashboard design for factory floor operators to monitor production machinery in real time. Designed for high-density information display with a focus on clarity under stress conditions.",
    cover: "/images/smart-f.png",
    technologies: ["Figma", "Dashboard Design", "Data Viz", "Design System"],
    integrations: [],
    tools: ["Figma", "FigJam"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
  {
    id: "cc-webapp",
    index: "08",
    category: "UX/UI Design",
    title: "Web Application",
    productName: "Omnipad",
    role: "UX/UI Designer",
    year: "2022",
    description:
      "Task management web app for call center teams. Designed end-to-end flows for scheduling, tracking, and managing client calls, validated with real call center agents before handoff.",
    cover: "/images/omnipad.png",
    technologies: ["Figma", "UI Design", "Prototyping", "UX Research"],
    integrations: [],
    tools: ["Figma", "FigJam", "Maze", "Notion"],
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", label: "Behance" }],
  },
];

const NAV_H = 72;

const LINK_ICONS = {
  behance: IconBrandBehance,
  github: IconBrandGithub,
  website: IconArrowUpRight,
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1 text-sm font-medium text-[var(--black)]">
      {children}
    </span>
  );
}

export default function WorksList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".work-card");
    const overlays = gsap.utils.toArray<HTMLElement>(".work-overlay");
    if (!cards.length) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: cards[i + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: ({ progress }) => {
            gsap.set(overlays[i], { opacity: progress * 0.55 });
            const content = card.querySelector<HTMLElement>(".work-content");
            const blurProgress = Math.max(0, (progress - 0.5) * 2);
            if (content) gsap.set(content, {
              scale: 1 - progress * 0.04,
              filter: `blur(${blurProgress * 8}px)`,
              transformOrigin: "center top",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: `${WORKS.length * 100}vh` }}>
      {WORKS.map((work, i) => (
        <div
          key={work.id}
          className="work-card sticky overflow-hidden bg-[var(--background)]"
          style={{
            top: NAV_H,
            height: `calc(100vh - ${NAV_H}px)`,
            zIndex: i + 1,
            borderRadius: 0,
            borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {/* Darkening overlay for depth effect */}
          <div
            className="work-overlay pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: 0, zIndex: 10 }}
          />
          <div className="work-content h-full mx-auto max-w-[1280px] px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-14 overflow-y-auto">

            {/* Left — image + index */}
            <div className="shrink-0 flex flex-col gap-3 md:w-[420px] lg:w-[480px]">
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-zinc-200">
                <Image
                  src={work.cover}
                  alt={work.title}
                  fill
                  className="object-cover"
                  priority={i < 2}
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-[var(--muted)] font-medium">{work.productName}</span>
                <span className="text-sm font-bold text-black/20">{work.index}</span>
              </div>
            </div>

            {/* Right — content */}
            <div className="flex flex-col gap-5 flex-1">

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--orange)]">{work.category}</span>
                  <span className="text-sm text-[var(--muted)]">· {work.year}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--black)] tracking-tight">
                  {work.title}
                </h2>
                <p className="text-sm font-medium text-[var(--muted)]">{work.role}</p>
              </div>

              <p className="text-base leading-relaxed text-[var(--foreground)] max-w-lg">
                {work.description}
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {work.technologies.map((t) => <Chip key={t}>{t}</Chip>)}
                  </div>
                </div>

                {work.integrations && work.integrations.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest">Integrations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {work.integrations.map((t) => <Chip key={t}>{t}</Chip>)}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-widest">Tools</p>
                  <div className="flex flex-wrap gap-1.5">
                    {work.tools.map((t) => <Chip key={t}>{t}</Chip>)}
                  </div>
                </div>
              </div>

              {work.links && work.links.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  {work.links.map((l) => {
                    const Icon = LINK_ICONS[l.type];
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-[var(--black)] hover:bg-black hover:text-white hover:border-black transition"
                      >
                        <Icon size={15} />
                        {l.label}
                      </Link>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
