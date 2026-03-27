"use client";

import { IconBrandBehance, IconBrandGithub } from "@tabler/icons-react";
import React, { useMemo, useState } from "react";

import ProjectCard from "./ProjectCard";

type Mode = "solo" | "collab";
type Category = "frontend" | "design";

export type LinkOut = {
  type: "behance" | "github" | "website";
  href: string;
  icon?: React.ReactElement; // <--- mejor ReactElement en vez de ReactNode
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
    stack: [
      "ReactJS",
      "NextJS",
      "TypeScript",
      "TailwindCSS",
      "StyledComponents",
    ],
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
    stack: [
      "Figma",
      "Figma Design",
      "UX Research",
      "Design System",
      "Prototyping",
      "UI Design",
    ],
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
    stack: [
      "Figma",
      "ReactJS",
      "NextJS",
      "TypeScript",
      "TailwindCSS",
      "Design System",
      "Branding",
    ],
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
    stack: [
      "Figma",
      "Figma Design",
      "UX Research",
      "Accessibility",
      "Prototyping",
      "Branding",
    ],
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
      "Redesign of IACON's corporate landing page in Figma, along with new visual assets and branding elements to strengthen the company’s digital identity.",
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
    stack: [
      "Figma",
      "Figma Design",
      "Design System",
      "iOS",
      "Prototyping",
      "UX Research",
      "Design Thinking",
    ],
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
    stack: [
      "Figma",
      "Figma Design",
      "Design System",
      "Prototyping",
      "UX Research",
      "UI Design",
    ],
    cover: "/images/omnipad.png",
    category: "design",
    mode: "solo",
    links: [{ type: "behance", href: "https://www.behance.net/devjesushernandez", icon: <IconBrandBehance /> }],
  },
];

type ChipProps<T extends string> = {
  current: T | "all";
  onChange: (v: T | "all") => void;
  label: string;
  payload: T | "all";
};

function FilterChip<T extends string>({
  current,
  onChange,
  label,
  payload,
}: ChipProps<T>) {
  const active = current === payload;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onChange(payload)}
      className={`inline-flex cursor-pointer rounded-full items-center gap-2 px-4 py-1 md:py-2 text-sm md:text-base font-medium transition ${
        active
          ? "text-[var(--white)] bg-[var(--black)] hover:bg-[var(--gray)]"
          : "text-[var(--white)] bg-[var(--black)]/30 hover:bg-[var(--gray)]/50"
      }`}
    >
      <span>{label}</span>
    </button>
  );
}

export default function LatestProjects() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [mode, setMode] = useState<Mode | "all">("all");
  const [query] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const passCategory = category === "all" || p.category === category;
      const passMode = mode === "all" || p.mode === mode;
      const passQuery =
        q === ""
          ? true
          : [p.title, p.productName, p.role, p.summary, ...p.stack]
              .join(" ")
              .toLowerCase()
              .includes(q);
      return passCategory && passMode && passQuery;
    });
  }, [category, mode, query]);

  return (
    <section
      id="projects"
      className="relative w-full overflow-clip py-24 md:py-32 scrollbar-hide"
    >

      <div className="mx-auto max-w-[1280px] w-full px-4 md:px-8 flex flex-col gap-6 z-10">
        <header className="mb-6 flex flex-col gap-2">
          <p className="text-lg font-semibold text-[var(--orange)] tracking-widest">
          Latest Projects
          </p>
          <h2 className="text-4xl md:text-6xl max-w-xl text-[var(--black)] font-semibold tracking-tight">
            Building Digital Products & Experience
          </h2>
          <p className="text-lg md:text-2xl max-w-lg">
            Highlights of collaborative and solo projects that shaped my
            expertise.
          </p>
        </header>

        {/* Chips */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between z-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <div className="flex flex-wrap gap-1 md:gap-2">
              <FilterChip<Category>
                current={category}
                onChange={setCategory}
                label="All"
                payload="all"
              />
              <FilterChip<Category>
                current={category}
                onChange={setCategory}
                label="Frontend"
                payload="frontend"
              />
              <FilterChip<Category>
                current={category}
                onChange={setCategory}
                label="Design"
                payload="design"
              />
            </div>
            <div className="flex flex-wrap gap-1 md:gap-2">
              <FilterChip<Mode>
                current={mode}
                onChange={setMode}
                label="All modes"
                payload="all"
              />
              <FilterChip<Mode>
                current={mode}
                onChange={setMode}
                label="Collaborative"
                payload="collab"
              />
              <FilterChip<Mode>
                current={mode}
                onChange={setMode}
                label="Solo"
                payload="solo"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 z-10 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] md:grid-cols-2">
          {filtered.length > 0 ? (
            filtered.map((p) => <ProjectCard key={p.id} project={p} />)
          ) : (
            <div className="col-span-full rounded-2xl h-[50vh] backdrop-blur-sm flex items-center justify-center text-xl border border-dashed p-10 text-center text-neutral-600">
              No projects match your filters. Try adjusting the search or chips.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
