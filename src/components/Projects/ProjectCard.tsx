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
    <span className="inline-flex items-center bg-gray-100 px-2.5 py-0.5 text-base font-medium text-zinc-700">
      {children}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const p = project;

  return (
    <article
      className="p-card will-change-transform flex flex-col overflow-hidden h-[520px] bg-white transition"
      data-id={p.id}
    >
      <div className="relative h-[250px] w-full bg-zinc-100 overflow-hidden">
        <Image
          src={p.cover}
          alt={`${p.title} cover`}
          fill
          className="p-img object-cover will-change-transform"
          priority={p.id === "mtc-fe" || p.id === "mtc-ux"}
        />
        <span
          className={`absolute flex flex-row gap-1 items-center left-6 top-4 px-2.5 py-1.5 text-base font-medium ${
            p.mode === "solo"
              ? "bg-orange-100 text-orange-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {p.mode === "solo" ? <IconUser /> : <IconUsers />}
          {p.mode === "solo" ? "Solo Project" : "Collaborative"}
        </span>
      </div>
      <div className="px-6 py-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold leading-tight">{p.title}</h3>
        <div className="mt-1 text-base font-semibold text-orange-600">
          {p.role}
        </div>
        <p className="mt-2 line-clamp-2 text-base text-zinc-700">{p.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t px-6 py-4 text-sm text-zinc-600">
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
