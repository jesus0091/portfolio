"use client";

import { IconUser, IconUsers } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { LinkOut } from "./LatestsProjects";
import React from "react";

export type Mode = "solo" | "collab";
export type Category = "frontend" | "design";

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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full items-center bg-[var(--background)] px-3 py-0.5 text-sm md:text-base font-medium text-[var(--muted)]">
      {children}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const p = project;

  return (
    <article
      className="p-card will-change-transform rounded-2xl flex flex-col overflow-hidden md:h-[550px] bg-[var(--card)] transition shadow-[0px_0px_50px_rgba(0,0,0,0.1)] hover:shadow-[0px_10px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1 cursor-pointer"
      data-id={p.id}
    >
      <div className="relative aspect-[16/9] max-h-[250px] min-w-full w-full bg-zinc-100 overflow-hidden">
        <Image
          src={p.cover}
          alt={`${p.title} cover`}
          fill
          className="p-img object-cover will-change-transform"
          priority={p.id === "mtc-fe" || p.id === "mtc-ux"}
        />
        <span
          className={`absolute rounded-full supports-[backdrop-filter]:backdrop-blur-md flex flex-row gap-1 items-center left-6 top-4 px-2.5 py-1.5 text-sm md:text-base font-medium ${
            p.mode === "solo"
              ? "bg-orange-100/60 text-orange-600"
              : "bg-rose-100/60 text-rose-600"
          }`}
        >
          {p.mode === "solo" ? (
            <IconUser className="h-4 w-4" />
          ) : (
            <IconUsers className="h-4 w-4" />
          )}
          {p.mode === "solo" ? "Solo Project" : "Collaborative"}
        </span>
      </div>
      <div className="px-4 md:px-6 py-3 md:py-4 flex-1 flex flex-col">
        <div>
          <h3 className="text-base text-[var(--black)] md:text-xl font-bold leading-tight">
            {p.title}
          </h3>
          <div className="text-sm md:text-base font-semibold text-[var(--orange)]">
            {p.role}
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-sm md:text-base leading">
          {p.summary}
        </p>
        <div className="flex flex-col gap-1 mt-1 md:mt-2">
          <p className="text-sm text-gray-500">Tools:</p>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {p.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-2 border-t-[var(--background)] px-4 md:px-6 py-2 md:py-4 text-sm text-zinc-600">
        <span className="text-gray-500 text-base">{p.productName}</span>
        <div className="flex items-center gap-3">
          {(p.links ?? []).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border-zinc-200 hover:bg-zinc-50"
              aria-label={l.type}
              title={l.type}
            >
              {l.icon}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
