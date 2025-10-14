"use client";

import { useLayoutEffect, useRef } from "react";

import ButtonOutlined from "../ButtonOutlined";
import Navbar from "../Navbar";
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

  // funcion para mandar mail a jesushernandez120491@gmail.com
  const sendEmail = () => {
    window.open("mailto:jesushernandez120491@gmail.com");
  };

  return (
    <section
      ref={rootRef}
      className="hero h-[100dvh] flex flex-col justify-center items-center relative overflow-clip"
    >
      <Navbar />
      <div className="light-top-sentinel h-10 absolute top-0 w-full" />
      <div className="hero-orbit absolute will-change-transform">
        <OrbitFusion />
      </div>
      <div className="flex flex-col gap-6 px-4 items-center justify-center h-full z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="hero-eyebrow text-lg md:text-xl tracking-wide text-orange-600">
            From Concept to Code
          </p>
          <p className="hero-title text-3xl md:text-[90px] tracking-tight font-black leading-none text-[var(--black)] text-center">
            Building Digital <br /> Products & Experience
          </p>
        </div>

        <div className="hero-cta">
          <ButtonOutlined>Lets start a project together</ButtonOutlined>
        </div>
      </div>
      <div className="light-bottom-sentinel h-10 absolute bottom-0 w-full" />
    </section>
  );
}
