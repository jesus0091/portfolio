"use client";

import {
  IconBrandBehance,
  IconBrandGithub,
  IconFilter,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import React, { useMemo, useState } from "react";

import ProjectCard from "./ProjectCard";

type Mode = "solo" | "collab";
type Category = "frontend" | "design";

export type LinkOut = {
  type: "behance" | "github" | "website";
  href: string;
  icon?: React.ReactNode;
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
    links: [{ type: "behance", href: "#", icon: <IconBrandBehance /> }],
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
    links: [{ type: "behance", href: "#", icon: <IconBrandBehance /> }],
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
    links: [{ type: "behance", href: "#", icon: <IconBrandBehance /> }],
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
    links: [{ type: "behance", href: "#", icon: <IconBrandBehance /> }],
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
    links: [{ type: "behance", href: "#", icon: <IconBrandBehance /> }],
  },
];

/* --------------------------- UI primitives --------------------------- */

type ChipProps<T extends string> = {
  value: T | "all";
  current: T | "all";
  onChange: (v: T | "all") => void;
  label: string;
  payload: T | "all";
  count?: number;
};
function FilterChip<T extends string>({
  value,
  current,
  onChange,
  label,
  payload,
  count,
}: ChipProps<T>) {
  const active = current === payload;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onChange(payload)}
      className={[
        "inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-base font-medium transition",
        active
          ? "border-black bg-black text-white"
          : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-800",
      ].join(" ")}
    >
      <span>{label}</span>
    </button>
  );
}

/* --------------------------- Page --------------------------- */

export default function LatestProjects() {
  // Filters
  const [category, setCategory] = useState<Category | "all">("all");
  const [mode, setMode] = useState<Mode | "all">("all");
  const [query, setQuery] = useState("");

  const hasActiveFilters =
    category !== "all" || mode !== "all" || query.trim() !== "";

  // Precompute counts to mostrar en chips
  const counts = useMemo(() => {
    const byCategory = PROJECTS.reduce(
      (acc, p) => {
        acc[p.category]++; // 'frontend' | 'design'
        return acc;
      },
      { frontend: 0, design: 0 } as Record<Category, number>
    );
    const byMode = PROJECTS.reduce(
      (acc, p) => {
        acc[p.mode]++; // 'solo' | 'collab'
        return acc;
      },
      { solo: 0, collab: 0 } as Record<Mode, number>
    );
    return { byCategory, byMode, total: PROJECTS.length };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const passCategory = category === "all" ? true : p.category === category;
      const passMode = mode === "all" ? true : p.mode === mode;
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
    <section id="projects" className="relative py-50 scrollbar-hide">
      <div className=" light-top-sentinel h-10 w-full absolute top-0" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(65, 34, 0, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(65, 34, 0, 0.09) 1px, transparent 1px)
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

      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        {/* Header */}
        <header className="projects-header mb-6 flex flex-col gap-2">
          <div className="projects-header-pin flex items-center gap-2">
            <h2 className="text-7xl text-black font-black tracking-tight">
              Latest Projects
            </h2>
          </div>
          <p className="text-2xl max-w-lg text-gray-700">
            Highlights of collaborative and solo projects that shaped my
            expertise.
          </p>
        </header>

        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-2">
              <FilterChip<Category>
                value={category}
                current={category}
                onChange={setCategory}
                label={`All (${counts.total})`}
                payload="all"
              />
              <FilterChip<Category>
                value={category}
                current={category}
                onChange={setCategory}
                label={`Frontend`}
                payload="frontend"
                count={counts.byCategory.frontend}
              />
              <FilterChip<Category>
                value={category}
                current={category}
                onChange={setCategory}
                label={`Design`}
                payload="design"
                count={counts.byCategory.design}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-medium text-neutral-500">Mode</span>
            <div className="flex flex-wrap gap-2">
              <FilterChip<Mode>
                value={mode}
                current={mode}
                onChange={setMode}
                label="All"
                payload="all"
              />
              <FilterChip<Mode>
                value={mode}
                current={mode}
                onChange={setMode}
                label={`Collaborative`}
                payload="collab"
                count={counts.byMode.collab}
              />
              <FilterChip<Mode>
                value={mode}
                current={mode}
                onChange={setMode}
                label={`Solo `}
                payload="solo"
                count={counts.byMode.solo}
              />
            </div>
          </div>
        </div>

        <div className="projects-grid grid gap-6 lg:grid-cols-2">
          {filtered.length > 0 ? (
            filtered.map((p) => <ProjectCard key={p.id} project={p} />)
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed p-10 text-center text-neutral-600">
              No projects match your filters. Try adjusting the search or chips.
            </div>
          )}
        </div>
      </div>

      <div className="light-bottom-sentinel h-10 w-full absolute bottom-0" />
    </section>
  );
}
