"use client";

import { IconArrowUpRight, IconUser, IconUsers } from "@tabler/icons-react";

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

const MAX_CHIPS = 5;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--background)] px-3 py-0.5 text-xs md:text-sm font-medium text-[var(--muted)]">
      {children}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const p = project;
  const visibleChips = p.stack.slice(0, MAX_CHIPS);
  const hiddenCount = Math.max(0, p.stack.length - MAX_CHIPS);

  return (
    <Link
      href={`/works/${p.id}`}
      aria-label={`Open ${p.productName} — ${p.title}`}
      className="group relative block h-[520px] md:h-[560px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white/70 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/[0.12] hover:shadow-[0_20px_60px_-20px_rgba(10,10,10,0.18)] hover:bg-white"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[16/9] max-h-[250px] w-full overflow-hidden bg-zinc-100">
          <Image
            src={p.cover}
            alt={`${p.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority={p.id === "mtc-fe" || p.id === "mtc-ux"}
          />

          <span
            className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-md ${
              p.mode === "solo"
                ? "bg-white/85 text-[var(--orange)]"
                : "bg-black/70 text-white"
            }`}
          >
            {p.mode === "solo" ? (
              <IconUser className="h-3.5 w-3.5" />
            ) : (
              <IconUsers className="h-3.5 w-3.5" />
            )}
            {p.mode === "solo" ? "Solo" : "Collaborative"}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 md:px-6 pt-4 md:pt-5 pb-5 md:pb-6">
          <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {p.productName}
          </p>

          <h3 className="mt-1 text-lg md:text-xl font-semibold leading-tight text-[var(--black)]">
            {p.role}
          </h3>

          <p className="mt-0.5 text-sm md:text-base font-medium text-[var(--orange)]">
            {p.title}
          </p>

          <p className="mt-3 line-clamp-2 text-sm md:text-base text-[var(--muted)] leading-relaxed">
            {p.summary}
          </p>

          <div className="mt-auto pt-5 flex flex-wrap items-center gap-1.5">
            {visibleChips.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
            {hiddenCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs md:text-sm font-medium text-[var(--muted)]/70">
                +{hiddenCount}
              </span>
            )}
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--black)] text-white opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
        >
          <IconArrowUpRight size={16} />
        </span>
      </article>
    </Link>
  );
}
