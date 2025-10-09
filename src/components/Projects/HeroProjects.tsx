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
      const baseEase = "power2.out";
      gsap
        .timeline({ defaults: { ease: baseEase } })
        .from([".hero-eyebrow", ".hero-title", ".hero-cta"], {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
        })
        .from(
          ".hero-orbit",
          { scale: 0.92, opacity: 0, duration: 0.6 },
          "<0.1"
        );

      if (!prefersReduced) {
        gsap.to(".hero-orbit", {
          yPercent: -12,
          rotate: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
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
      ref={rootRef}
      className="hero h-[100dvh] flex justify-center items-center relative"
    >
      <div className="hero-orbit absolute will-change-transform">
        <OrbitFusion />
      </div>

      <div className="flex flex-col gap-6 items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <p className="hero-eyebrow text-2xl text-orange-500">
            From Concept to Code
          </p>
          <p className="hero-title text-[80px] font-black leading-none max-w-4xl text-black text-center">
            Building Digital Products & Experience
          </p>
        </div>

        <div className="hero-cta">
          <ButtonOutlined>Lets start a project together</ButtonOutlined>
        </div>
      </div>
    </section>
  );
}
