"use client";

import React, { useLayoutEffect, useRef } from "react";

import AuroraGlow from "../AuroraGlow";
import MiniLayout from "./MiniLayout";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useIsMobile } from "@/app/utils/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const STRIKE_DELAY = 1.0;
const STRIKE_DRAW_DURATION = 0.8;

const isDiv = (el: HTMLDivElement | null): el is HTMLDivElement => el !== null;

const Quote: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Escena 1
  const o1Ref = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const textWrapRef = useRef<HTMLSpanElement>(null);
  const strikeRef = useRef<HTMLDivElement>(null);
  const miniLayoutRef = useRef<HTMLDivElement>(null);

  // Escena 2
  const o2Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const greatRef = useRef<HTMLSpanElement>(null);
  const o2AuroraRef = useRef<HTMLDivElement>(null);
  const o2LayoutRef = useRef<HTMLDivElement>(null);

  // Escena 3
  const o3Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const cleanPanelRef = useRef<HTMLDivElement>(null);
  const o3LineLeftRef = useRef<HTMLDivElement>(null);
  const o3LineRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([o1Ref.current], { opacity: 1 });
      gsap.set([o2Ref.current, o3Ref.current], { opacity: 0 });

      gsap.set(p1Ref.current, { opacity: 1, y: 0 });
      gsap.set(miniLayoutRef.current, { opacity: 1, y: 0, scale: 1 });
      const items1 = miniLayoutRef.current?.querySelectorAll(".ml-item");
      items1 && gsap.set(items1, { opacity: 1, y: 0 });

      // Escena 2 reduced
      gsap.set(o2AuroraRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      gsap.set(o2LayoutRef.current, { opacity: 1, y: 0, scale: 1 });
      const items2 = o2LayoutRef.current?.querySelectorAll(".ml-item");
      items2 && gsap.set(items2, { opacity: 1, y: 0 });

      gsap.set(strikeRef.current, { autoAlpha: 1, scaleX: 1 });
      gsap.set(cleanPanelRef.current, { xPercent: 110 });

      // Escena 3 estático
      gsap.set(p3Ref.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(o3LineLeftRef.current, {
        scaleX: 1,
        transformOrigin: "left center",
      });
      gsap.set(o3LineRightRef.current, {
        scaleX: 1,
        transformOrigin: "right center",
      });

      if (greatRef.current) greatRef.current.style.color = "#000000";
      return;
    }

    const ctx = gsap.context(() => {
      // Estados base escenas
      gsap.set(o1Ref.current, { opacity: 1, zIndex: 10 });
      gsap.set(o2Ref.current, { opacity: 0, zIndex: 20 });
      gsap.set(o3Ref.current, { opacity: 0, zIndex: 30 });

      gsap.set(p1Ref.current, { opacity: 0, y: 30 });
      gsap.set(p2Ref.current, { opacity: 0, y: 100 });
      gsap.set(p3Ref.current, { opacity: 0, y: 30, scale: 0.98 });

      // Mini layout base (E1)
      gsap.set(miniLayoutRef.current, { opacity: 0, y: 16, scale: 0.985 });
      const mlItems1 = miniLayoutRef.current?.querySelectorAll(".ml-item");
      mlItems1 && gsap.set(mlItems1, { opacity: 0, y: 8 });

      // Strike (E1)
      gsap.set(strikeRef.current, {
        scaleX: 0,
        autoAlpha: 0,
        transformOrigin: "left center",
      });

      // E2 bases
      gsap.set(o2AuroraRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "blur(12px)",
      });
      gsap.set(o2LayoutRef.current, { opacity: 0, y: 20, scale: 0.985 });
      const mlItems2 = o2LayoutRef.current?.querySelectorAll(".ml-item");
      mlItems2 && gsap.set(mlItems2, { opacity: 0, y: 8 });

      // E3 líneas laterales
      gsap.set(o3LineLeftRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(o3LineRightRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
      });

      gsap.set(cleanPanelRef.current, { xPercent: -110 });
      if (greatRef.current) greatRef.current.style.color = "#000000";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2200", // un poco más de tiempo tras la escena 3
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onEnter: () => {
            const spacer = section.parentElement as HTMLElement | null;
            if (spacer) spacer.style.overflow = "visible";
          },
          onRefresh: () => {
            const spacer = section.parentElement as HTMLElement | null;
            if (spacer) spacer.style.overflow = "visible";
          },
        },
        defaults: { ease: "power2.out" },
      });

      /* ========= ESCENA 1 ========= */
      tl.addLabel("o1Enter")
        .to(p1Ref.current, { opacity: 1, y: 0, duration: 0.45 }, "o1Enter")
        .to(
          miniLayoutRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
          "o1Enter+=0.12"
        )
        .to(
          mlItems1 || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<+0.05"
        )
        .addLabel("strikeStart", `o1Enter+=${STRIKE_DELAY}`)
        .to(strikeRef.current, { autoAlpha: 1, duration: 0.12 }, "strikeStart")
        .to(
          strikeRef.current,
          { scaleX: 1, duration: STRIKE_DRAW_DURATION },
          "strikeStart"
        )
        .to(
          strikeRef.current,
          {
            keyframes: [
              { scaleX: 1.02, duration: 0.12, ease: "power2.out" },
              { scaleX: 1.0, duration: 0.12, ease: "power2.in" },
            ],
          },
          "strikeStart+=0.8"
        );

      /* ========= ESCENA 2 ========= */
      tl.addLabel("o2Enter")
        .to(o1Ref.current, { opacity: 0, duration: 0.4 }, "o2Enter")
        .to(o2Ref.current, { opacity: 1, duration: 0.45 }, "<+0.05")
        .to(
          p2Ref.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "<"
        )
        .to(
          o2AuroraRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          o2LayoutRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
          "<+0.05"
        )
        .to(
          mlItems2 || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<+0.05"
        )
        .to(greatRef.current, { color: "#000000", duration: 0.2 }, "<");

      /* ========= ESCENA 3 ========= */
      tl.addLabel("wipe", "o2Enter+=1.7")
        .to(o3Ref.current, { opacity: 1, duration: 0.25 }, "wipe")
        .to(
          cleanPanelRef.current,
          {
            xPercent: 110,
            duration: 0.8,
            ease: "power3.inOut",
            onStart: () =>
              cleanPanelRef.current?.classList.remove("pointer-events-none"),
            onComplete: () =>
              cleanPanelRef.current?.classList.add("pointer-events-none"),
          },
          "wipe"
        )
        // ⬇️ Evitamos pasar null a GSAP filtrando con el type guard
        .to(
          [o1Ref.current, o2Ref.current].filter(isDiv),
          { opacity: 0, duration: 0.3 },
          "wipe+=0.05"
        )
        .to(
          p3Ref.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
          "wipe+=0.25"
        )
        .to(
          o3LineLeftRef.current,
          { scaleX: 1, duration: 0.6, ease: "power3.out" },
          "wipe+=0.35"
        )
        .to(
          o3LineRightRef.current,
          { scaleX: 1, duration: 0.6, ease: "power3.out" },
          "wipe+=0.40"
        )
        // margen extra al final para “respirar” un poco más
        .addPause("+=0.6");
    }, section);

    return () => ctx.revert();
  }, []);

  const isMobile = useIsMobile(768);

  return (
    <section
      ref={sectionRef}
      data-section="quote"
      className="relative h-[100dvh] w-full overflow-clip"
    >
      <div
        ref={o1Ref}
        className="absolute flex-col inset-0 flex items-center justify-end px-4 gap-6 md:gap-8 text-center py-[8vh]"
      >
        <p
          ref={p1Ref}
          className="text-3xl md:text-6xl font-medium tracking-tight z-10"
        >
          <span ref={textWrapRef} className="relative inline-block">
            You need a website
            <span
              ref={strikeRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] md:h-[10px] w-full rounded-full bg-[var(--orange)] block"
            />
          </span>
        </p>
        <MiniLayout ref={miniLayoutRef} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>
      <div
        ref={o2Ref}
        className="absolute flex-col inset-0 flex items-center justify-end px-4 gap-6 md:gap-8 text-center py-[8vh]"
      >
        <div
          ref={o2AuroraRef}
          className="absolute -z-10 inset-0 flex flex-col items-center justify-center"
        >
          <AuroraGlow
            opacity={1}
            blobSize={isMobile ? 300 : 500}
            speed={8}
            colors={["#0ea5e440", "#ffa91440", "#fb249340"]}
            extraBlur={false}
          />
        </div>
        <p
          ref={p2Ref}
          className="text-3xl font-medium md:text-6xl !bg-transparent z-10"
        >
          You need a{" "}
          <span ref={greatRef} className="font-black !text-[var(--orange)]">
            great
          </span>{" "}
          website.
        </p>
        <MiniLayout ref={o2LayoutRef} />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </div>
      <div
        ref={o3Ref}
        className="absolute inset-0 flex items-center justify-center px-4 text-center"
      >
        <div
          ref={cleanPanelRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40 bg-[var(--background)] flex items-center justify-center"
        />
        <div className="relative z-50 flex items-center w-full gap-3 md:gap-6">
          <div
            ref={o3LineLeftRef}
            className="h-[3px] md:h-[5px] rounded-full bg-[var(--orange)] flex-1"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
          <p
            ref={p3Ref}
            className="text-4xl md:text-6xl max-w-3xl font-black tracking-tight text-[var(--orange)] leading-none"
          >
            Great products happen when design meets code
          </p>
          <div
            ref={o3LineRightRef}
            className="h-[3px] md:h-[5px] rounded-full bg-orange-600 flex-1"
            style={{ transform: "scaleX(0)", transformOrigin: "right center" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Quote;
