"use client";

import { useLayoutEffect, useRef } from "react";

import ButtonOutlined from "../ButtonOutlined";
import { OrbitFusion } from "../OrbitFusion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function HeroProject() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        // Scale-in on section title (Apple-style)
        gsap.fromTo(
          ".projects-title",
          { scale: 1.12, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".projects-eyebrow",
          { y: 16, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          }
        );

        // OrbitFusion parallax
        gsap.to(".hero-orbit", {
          yPercent: -12,
          rotate: 2,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={rootRef}
      className="relative min-h-[80vh] py-20 md:py-28 flex flex-col justify-center items-center overflow-clip"
    >
      <div className="hero-orbit absolute inset-0 will-change-transform opacity-60">
        <OrbitFusion />
      </div>
      <div className="flex flex-col gap-6 px-4 items-center justify-center z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="projects-eyebrow text-lg md:text-xl tracking-wide text-orange-600">
            From Concept to Code
          </p>
          <p className="projects-title text-3xl md:text-[90px] tracking-tight font-black leading-none text-[var(--black)] text-center will-change-transform">
            Building Digital <br /> Products & Experience
          </p>
        </div>
        <ButtonOutlined>Lets start a project together</ButtonOutlined>
      </div>
    </section>
  );
}
