"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor({ active }: { active: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isDesktop || !cursorRef.current) return;

    const el = cursorRef.current;

    const xTo = gsap.quickTo(el, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.15, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 30);
      yTo(e.clientY - 30);
    };

    const onEnter = () => {
      gsap.to(el, { scale: 2.5, duration: 0.3, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const interactives = document.querySelectorAll<Element>(
      "a, button, [data-cursor-hover]"
    );
    interactives.forEach((node) => {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((node) => {
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "white",
        mixBlendMode: "difference",
        opacity: active ? 1 : 0,
        willChange: "transform, opacity",
        zIndex: 2147483647,
        transition: "opacity 180ms ease-out",
      }}
    />
  );
}
