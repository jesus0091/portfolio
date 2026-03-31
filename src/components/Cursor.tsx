"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// States: 0=default 1=hover 2=project 3=hero
type CursorState = 0 | 1 | 2 | 3;

export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>(0);

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const wrap = wrapRef.current!;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const hero = heroRef.current!;

    gsap.set(wrap, { autoAlpha: 1 });

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.1, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 60);
      yTo(e.clientY - 60);
    };

    const toDefault = () => {
      stateRef.current = 0;
      gsap.to(dot,  { width: 8, height: 8, opacity: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(ring, { width: 0, height: 0, opacity: 0, duration: 0.25, ease: "power3.out" });
      gsap.to(label, { autoAlpha: 0, duration: 0.1 });
      gsap.to(hero, { width: 0, height: 0, opacity: 0, duration: 0.3, ease: "power3.out" });
    };

    const toHover = () => {
      if (stateRef.current >= 2) return;
      stateRef.current = 1;
      gsap.to(dot,  { width: 4, height: 4, opacity: 0.5, duration: 0.25, ease: "power3.out" });
      gsap.to(ring, { width: 38, height: 38, opacity: 1, backgroundColor: "transparent", borderColor: "#111", duration: 0.4, ease: "back.out(1.5)" });
      gsap.to(label, { autoAlpha: 0, duration: 0.1 });
      gsap.to(hero, { width: 0, height: 0, opacity: 0, duration: 0.2, ease: "power3.out" });
    };

    const leaveHover = () => {
      if (stateRef.current !== 1) return;
      toDefault();
    };

    const toProject = () => {
      if (stateRef.current === 3) return;
      stateRef.current = 2;
      gsap.to(dot,  { width: 0, height: 0, opacity: 0, duration: 0.2, ease: "power3.out" });
      gsap.to(ring, { width: 80, height: 80, opacity: 1, backgroundColor: "#111", borderColor: "transparent", duration: 0.45, ease: "back.out(1.5)" });
      gsap.to(label, { autoAlpha: 1, duration: 0.2, delay: 0.18 });
      gsap.to(hero, { width: 0, height: 0, opacity: 0, duration: 0.2, ease: "power3.out" });
    };

    const leaveProject = () => {
      if (stateRef.current !== 2) return;
      toDefault();
    };

    const toHero = () => {
      stateRef.current = 3;
      gsap.to(dot,  { width: 0, height: 0, opacity: 0, duration: 0.2, ease: "power3.out" });
      gsap.to(ring, { width: 0, height: 0, opacity: 0, duration: 0.2, ease: "power3.out" });
      gsap.to(label, { autoAlpha: 0, duration: 0.1 });
      gsap.to(hero, { width: 60, height: 60, opacity: 1, duration: 0.35, ease: "back.out(1.5)" });
    };

    const leaveHero = () => {
      if (stateRef.current !== 3) return;
      toDefault();
    };

    const links    = Array.from(document.querySelectorAll<Element>("a, button"));
    const projects = Array.from(document.querySelectorAll<Element>("[data-cursor='project']"));
    const heros    = Array.from(document.querySelectorAll<Element>("[data-cursor='hero']"));

    links.forEach((el) => {
      el.addEventListener("mouseenter", toHover);
      el.addEventListener("mouseleave", leaveHover);
    });

    projects.forEach((el) => {
      el.addEventListener("mouseenter", toProject);
      el.addEventListener("mouseleave", leaveProject);
    });

    heros.forEach((el) => {
      el.addEventListener("mouseenter", toHero);
      el.addEventListener("mouseleave", leaveHero);
    });

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", toHover);
        el.removeEventListener("mouseleave", leaveHover);
      });
      projects.forEach((el) => {
        el.removeEventListener("mouseenter", toProject);
        el.removeEventListener("mouseleave", leaveProject);
      });
      heros.forEach((el) => {
        el.removeEventListener("mouseenter", toHero);
        el.removeEventListener("mouseleave", leaveHero);
      });
    };
  }, []);

  const centered: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
  };

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: 120, height: 120,
        pointerEvents: "none",
        opacity: 0,
        zIndex: 2147483647,
        willChange: "transform",
      }}
    >
      {/* Dot — estado default */}
      <div ref={dotRef} style={{ ...centered, width: 8, height: 8, background: "#111" }} />

      {/* Ring — estado hover / project */}
      <div
        ref={ringRef}
        style={{
          ...centered,
          width: 0, height: 0,
          borderStyle: "solid",
          borderWidth: 1.5,
          borderColor: "transparent",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
        }}
      >
        <span
          ref={labelRef}
          style={{
            opacity: 0,
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          View
        </span>
      </div>

      {/* Hero blend circle — estado hero */}
      <div
        ref={heroRef}
        style={{
          ...centered,
          width: 0, height: 0,
          background: "white",
          opacity: 0,
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}
