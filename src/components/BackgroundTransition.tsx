"use client";

import { useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const TRANSITIONS = [
  { trigger: "#projects", color: "#ebebeb" },
  { trigger: '[data-section="quote"]', color: "#111111" },
  { trigger: "#about", color: "#e4e4e4" },
  { trigger: "#contact", color: "#000000" },
];

export default function BackgroundTransition() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      TRANSITIONS.forEach(({ trigger, color }) => {
        const el = document.querySelector(trigger);
        if (!el) return;

        gsap.to(document.body, {
          backgroundColor: color,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "top 10%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
