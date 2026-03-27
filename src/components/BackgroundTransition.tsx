"use client";

import { useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const TRANSITIONS = [
  { trigger: "#about", color: "#ebebeb" },
  { trigger: "#projects", color: "#e4e4e4" },
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
