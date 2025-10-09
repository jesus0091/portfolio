"use client";

import { IconBrandBehance, IconBrandGithub } from "@tabler/icons-react";

import ProjectCard from "./ProjectCard";
import React from "react";

/* =========================
   Tipos
   ========================= */
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

/* =========================
   Data
   ========================= */
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
      "Redesign of IACON’s corporate landing page in Figma, along with new visual assets and branding elements to strengthen the company’s digital identity.",
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

export default function LatestProjects() {
  return (
    <section id="projects" className="py-50 scrollbar-hide">
      <div className="mx-auto max-w-6xl">
        <header className="projects-header mb-6 flex items-end justify-between">
          <div className="projects-header-pin flex items-center gap-2">
            <h2 className="text-6xl text-black font-black tracking-tight">
              Latest Projects
            </h2>
          </div>
        </header>

        {/* Grid de proyectos */}
        <div className="projects-grid grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
