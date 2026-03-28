"use client";

import React, { useLayoutEffect, useRef } from "react";

import AuroraGlow from "./AuroraGlow";
import MiniLayout from "./Projects/MiniLayout";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useIsMobile } from "@/app/utils/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const STRIKE_DELAY = 1.0;
const STRIKE_DRAW_DURATION = 0.8;

const CODE_FONTS = [
  "'Courier New', Courier, monospace",
  "monospace",
  "'Lucida Console', Monaco, monospace",
  "'Courier New', Courier, monospace",
  "'Andale Mono', monospace",
  "monospace",
  "'Courier New', Courier, monospace",
  "monospace",
  "system-ui, -apple-system, sans-serif",
];


const isDiv = (el: HTMLDivElement | null): el is HTMLDivElement => el !== null;

const WSMAQuote: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  const o1Ref = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const strikeRef = useRef<HTMLDivElement>(null);
  const miniLayoutRef = useRef<HTMLDivElement>(null);

  const o2Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const greatRef = useRef<HTMLSpanElement>(null);
  const o2AuroraRef = useRef<HTMLDivElement>(null);
  const o2LayoutRef = useRef<HTMLDivElement>(null);

  const o3Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const cleanPanelRef = useRef<HTMLDivElement>(null);
  const o3LineLeftRef = useRef<HTMLDivElement>(null);
  const o3LineRightRef = useRef<HTMLDivElement>(null);

  const codeLineRef = useRef<HTMLSpanElement>(null);
  const designLineRef = useRef<HTMLSpanElement>(null);
  const bothLineRef = useRef<HTMLSpanElement>(null);

  const isMobile = useIsMobile(768);

  const scrambleFonts = (tl: gsap.core.Timeline, el: HTMLSpanElement, fonts: string[], startTime: number | string, stepSec = 0.07) => {
    const base = typeof startTime === "string" ? parseFloat(startTime) : startTime;
    fonts.forEach((font, i) => {
      tl.call(() => { el.style.fontFamily = font; }, undefined, base + i * stepSec);
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(leftRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(o1Ref.current, { opacity: 1 });
      gsap.set([o2Ref.current, o3Ref.current], { opacity: 0 });
      gsap.set(p1Ref.current, { opacity: 1, y: 0 });
      gsap.set(miniLayoutRef.current, { opacity: 1, y: 0, scale: 1 });
      const items1 = miniLayoutRef.current?.querySelectorAll(".ml-item");
      if (items1) gsap.set(items1, { opacity: 1, y: 0 });
      gsap.set(o2AuroraRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      gsap.set(o2LayoutRef.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(strikeRef.current, { autoAlpha: 1, scaleX: 1 });
      gsap.set(cleanPanelRef.current, { xPercent: 110 });
      gsap.set(p3Ref.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(o3LineLeftRef.current, { scaleX: 1, transformOrigin: "left center" });
      gsap.set(o3LineRightRef.current, { scaleX: 1, transformOrigin: "right center" });
      if (greatRef.current) greatRef.current.style.color = "#000000";
      if (codeLineRef.current) codeLineRef.current.style.fontFamily = "system-ui, -apple-system, sans-serif";
      if (bothLineRef.current) gsap.set(bothLineRef.current, { clipPath: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(leftRef.current, { autoAlpha: 0, y: 30 });
      if (codeLineRef.current) codeLineRef.current.style.fontFamily = CODE_FONTS[0];
      if (bothLineRef.current) gsap.set(bothLineRef.current, { clipPath: "inset(0 100% 0 0)" });

      gsap.set(o1Ref.current, { opacity: 1, zIndex: 10 });
      gsap.set(o2Ref.current, { opacity: 0, zIndex: 20 });
      gsap.set(o3Ref.current, { opacity: 0, zIndex: 30 });

      gsap.set(p1Ref.current, { opacity: 0, y: 30 });
      gsap.set(p2Ref.current, { opacity: 0, y: 100 });
      gsap.set(p3Ref.current, { opacity: 0, y: 30, scale: 0.98 });

      gsap.set(miniLayoutRef.current, { opacity: 0, y: 16, scale: 0.985 });
      const mlItems1 = miniLayoutRef.current?.querySelectorAll(".ml-item");
      if (mlItems1) gsap.set(mlItems1, { opacity: 0, y: 8 });

      gsap.set(strikeRef.current, { scaleX: 0, autoAlpha: 0, transformOrigin: "left center" });

      gsap.set(o2AuroraRef.current, { opacity: 0, y: 30, scale: 0.96, filter: "blur(12px)" });
      gsap.set(o2LayoutRef.current, { opacity: 0, y: 20, scale: 0.985 });
      const mlItems2 = o2LayoutRef.current?.querySelectorAll(".ml-item");
      if (mlItems2) gsap.set(mlItems2, { opacity: 0, y: 8 });

      gsap.set(o3LineLeftRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(o3LineRightRef.current, { scaleX: 0, transformOrigin: "right center" });
      gsap.set(cleanPanelRef.current, { xPercent: -110 });
      if (greatRef.current) greatRef.current.style.color = "#000000";

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        once: true,
        onEnter: () => tl.play(),
      });

      tl.to(leftRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0);

      /* Font scramble: I code. → monospace → Inter */
      if (codeLineRef.current) scrambleFonts(tl, codeLineRef.current, CODE_FONTS, "0.2");

      /* "I design." — color flow: negro → naranja → violeta → azul → negro */
      if (designLineRef.current) {
        tl.to(designLineRef.current, { color: "#f97316", duration: 0.25, ease: "power2.out" }, 0.7)
          .to(designLineRef.current, { color: "#a855f7", duration: 0.3 })
          .to(designLineRef.current, { color: "#3b82f6", duration: 0.3 })
          .to(designLineRef.current, { color: "#000000", duration: 0.5, ease: "power2.in" });
      }

      /* "I do both." — reveal de izquierda a derecha (líneas que se completan) */
      if (bothLineRef.current) {
        tl.to(bothLineRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut" }, 1.7);
      }

      /* ESCENA 1 */
      tl.addLabel("o1Enter", 0.2)
        .to(p1Ref.current, { opacity: 1, y: 0, duration: 0.5 }, "o1Enter")
        .to(miniLayoutRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }, "o1Enter+=0.15")
        .to(mlItems1 || [], { opacity: 1, y: 0, duration: 0.35, stagger: 0.04 }, "<+0.05")
        .addLabel("strikeStart", `o1Enter+=${STRIKE_DELAY}`)
        .to(strikeRef.current, { autoAlpha: 1, duration: 0.12 }, "strikeStart")
        .to(strikeRef.current, { scaleX: 1, duration: STRIKE_DRAW_DURATION }, "strikeStart")
        .to(strikeRef.current, {
          keyframes: [
            { scaleX: 1.02, duration: 0.12, ease: "power2.out" },
            { scaleX: 1.0, duration: 0.12, ease: "power2.in" },
          ],
        }, "strikeStart+=0.8");

      /* ESCENA 2 */
      tl.addLabel("o2Enter", "+=0.6")
        .to(o1Ref.current, { opacity: 0, duration: 0.4 }, "o2Enter")
        .to(o2Ref.current, { opacity: 1, duration: 0.45 }, "<+0.05")
        .to(p2Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "<")
        .to(o2AuroraRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, "<")
        .to(o2LayoutRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }, "<+0.05")
        .to(mlItems2 || [], { opacity: 1, y: 0, duration: 0.35, stagger: 0.04 }, "<+0.05")
        .to(greatRef.current, { color: "#000000", duration: 0.2 }, "<");

      /* ESCENA 3 */
      tl.addLabel("wipe", "+=1.2")
        .to(o3Ref.current, { opacity: 1, duration: 0.25 }, "wipe")
        .to(cleanPanelRef.current, {
          xPercent: 110,
          duration: 0.8,
          ease: "power3.inOut",
          onStart: () => cleanPanelRef.current?.classList.remove("pointer-events-none"),
          onComplete: () => cleanPanelRef.current?.classList.add("pointer-events-none"),
        }, "wipe")
        .to([o1Ref.current, o2Ref.current].filter(isDiv), { opacity: 0, duration: 0.3 }, "wipe+=0.05")
        .to(p3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }, "wipe+=0.25")
        .to(o3LineLeftRef.current, { scaleX: 1, duration: 0.6, ease: "power3.out" }, "wipe+=0.35")
        .to(o3LineRightRef.current, { scaleX: 1, duration: 0.6, ease: "power3.out" }, "wipe+=0.40");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="wsma-quote"
      className="relative h-[100dvh] w-full overflow-clip"
      style={{ background: "#e4e4e4", colorScheme: "light" }}
    >
      {/* Contenedor máximo — igual que el resto de secciones */}
      <div className="h-full max-w-[1280px] mx-auto px-4 md:px-8 flex flex-row">

        {/* LEFT — What Sets Me Apart */}
        <div
          ref={leftRef}
          className="relative hidden md:flex w-1/2 h-full flex-col justify-center py-12 pr-10 lg:pr-14 overflow-hidden shrink-0 gap-6"
          style={{ borderRight: "1px solid #e5e5e5" }}
        >

          {/* Label + título juntos */}
          <div className="flex flex-col gap-3">
            <p className="text-xl font-semibold text-[var(--orange)] tracking-wide">
              What sets me apart
            </p>
            <div className="flex flex-col gap-0">
              <span ref={codeLineRef} style={{ fontSize: "clamp(38px,4.5vw,90px)", fontWeight: 800, color: "#000000", lineHeight: 1, letterSpacing: "-0.03em" }}>I code.</span>
              <span ref={designLineRef} style={{ fontSize: "clamp(38px,4.5vw,90px)", fontWeight: 800, color: "#000000", lineHeight: 1, letterSpacing: "-0.03em" }}>I design.</span>
              <span ref={bothLineRef} style={{ fontSize: "clamp(38px,4.5vw,90px)", fontWeight: 800, color: "transparent", lineHeight: 1, letterSpacing: "-0.03em", WebkitTextStroke: "1.5px #000000" }}>I do both.</span>
            </div>
          </div>

          {/* Feature list justo debajo */}
          <div style={{ borderTop: "1px solid #c5c5c5" }}>
            {[
              { emoji: "⌨️", title: "Code + Design", desc: "One profile. Both worlds." },
              { emoji: "🧭", title: "Pragmatic UX", desc: "Clarity at every step." },
              { emoji: "✏️", title: "Visual Sensibility", desc: "Illustration roots." },
            ].map(({ emoji, title, desc }, i, arr) => (
              <div
                key={title}
                className="flex items-center gap-3 py-3"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #e5e5e5" : "none" }}
              >
                <div style={{ width: 60, height: 60, borderRadius: 10, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {emoji}
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: "#000000" }}>{title}</div>
                  <div style={{ fontSize: 16, color: "#6e6e73", marginTop: 2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Quote animation dentro de un recuadro */}
        <div className="relative flex-1 h-full flex items-center justify-center pl-10 lg:pl-14 py-14">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ border: "1px solid #cbcbcb", height: "75%" }}
          >

            {/* Escena 1 — fondo blanco */}
            <div
              ref={o1Ref}
              className="absolute inset-0 flex flex-col items-center justify-end px-6 gap-6 text-center py-[8vh]"
              style={{ background: "#e4e4e4" }}
            >
              <p ref={p1Ref} className="text-3xl md:text-5xl font-medium tracking-tight z-10" style={{ color: "#000000" }}>
                <span className="relative inline-block">
                  You need a website
                  <span
                    ref={strikeRef}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] md:h-[8px] w-full rounded-full block"
                    style={{ background: "#ff6600" }}
                  />
                </span>
              </p>
              <MiniLayout ref={miniLayoutRef} />
            </div>

            {/* Escena 2 — fondo con aurora */}
            <div
              ref={o2Ref}
              className="absolute inset-0 flex flex-col items-center justify-end px-6 gap-6 text-center py-[8vh]"
              style={{ background: "#e4e4e4" }}
            >
              <div ref={o2AuroraRef} className="absolute inset-0 -z-10 flex items-center justify-center">
                <AuroraGlow
                  opacity={1}
                  blobSize={isMobile ? 300 : 400}
                  speed={8}
                  colors={["#0ea5e440", "#9162e440", "#fb249340"]}
                  extraBlur={false}
                />
              </div>
              <p ref={p2Ref} className="text-3xl font-medium md:text-5xl z-10" style={{ color: "#000000" }}>
                You need a{" "}
                <span ref={greatRef} className="font-black" style={{ color: "#ff6600" }}>
                  great
                </span>{" "}
                website.
              </p>
              <MiniLayout ref={o2LayoutRef} />
            </div>

            {/* Escena 3 — fondo blanco con wipe */}
            <div
              ref={o3Ref}
              className="absolute inset-0 flex items-center justify-center px-6 text-center"
              style={{ background: "#e4e4e4" }}
            >
              <div
                ref={cleanPanelRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 z-40"
                style={{ background: "#e4e4e4" }}
              />
              <div className="relative z-50 flex items-center w-full gap-3 md:gap-5">
                <div
                  ref={o3LineLeftRef}
                  className="h-[3px] md:h-[4px] rounded-full flex-1"
                  style={{ background: "#ff6600", transform: "scaleX(0)", transformOrigin: "left center" }}
                />
                <p
                  ref={p3Ref}
                  className="text-xl md:text-3xl font-black tracking-tight leading-tight"
                  style={{ color: "#ff6600" }}
                >
                  Great products happen when design meets code
                </p>
                <div
                  ref={o3LineRightRef}
                  className="h-[3px] md:h-[4px] rounded-full flex-1"
                  style={{ background: "#ff6600", transform: "scaleX(0)", transformOrigin: "right center" }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WSMAQuote;
