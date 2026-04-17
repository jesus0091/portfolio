"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKS } from "@/data/works";

export default function WorksList() {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current.querySelectorAll<HTMLElement>(".work-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(cards),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full pb-24 md:pb-32 bg-[var(--background)]">
      <div
        ref={gridRef}
        className="mx-auto max-w-[1280px] px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {WORKS.map((work, i) => (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="work-card group relative flex flex-col overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/50 transition-all duration-300 hover:bg-white/90 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] w-full bg-zinc-100 overflow-hidden">
              <Image
                src={work.cover}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-full bg-white/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-[var(--black)]">
                  {work.category}
                </span>
                <span className="rounded-full bg-white/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-[var(--muted)]">
                  {work.year}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <IconArrowUpRight size={18} className="text-[var(--black)]" />
              </div>
            </div>

            <div className="flex flex-col gap-2 px-5 py-4 flex-1">
              <div>
                <p className="text-sm font-semibold text-[var(--orange)]">{work.productName}</p>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--black)] tracking-tight leading-tight">
                  {work.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">{work.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-[var(--foreground)] line-clamp-2">
                {work.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                {work.technologies.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-2.5 py-0.5 text-xs font-medium text-[var(--black)]"
                  >
                    {t}
                  </span>
                ))}
                {work.technologies.length > 4 && (
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
                    +{work.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
