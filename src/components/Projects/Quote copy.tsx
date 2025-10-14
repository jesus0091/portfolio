"use client";

import React, { useLayoutEffect, useRef } from "react";

import AuroraGlowYellow from "../AuroraGlowYellow";
import { IconPhoto } from "@tabler/icons-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const STRIKE_DELAY = 2; // ⬅ controla cuándo aparece el tachado después de que entra todo en E1
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([o1Ref.current], { opacity: 1 });
      gsap.set([o2Ref.current, o3Ref.current], { opacity: 0 });

      // E1
      gsap.set([p1Ref.current, miniLayoutRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      const items1 = miniLayoutRef.current?.querySelectorAll(".ml-item");
      items1 && gsap.set(items1, { opacity: 1, y: 0 });
      gsap.set(strikeRef.current, { autoAlpha: 1, scaleX: 1 });

      // E2
      gsap.set([p2Ref.current, o2AuroraRef.current, o2LayoutRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      const items2 = o2LayoutRef.current?.querySelectorAll(".ml-item");
      items2 && gsap.set(items2, { opacity: 1, y: 0 });

      // E3
      gsap.set(cleanPanelRef.current, { xPercent: 110 });
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
      // Estados base
      gsap.set(o1Ref.current, { opacity: 1, zIndex: 10 });
      gsap.set(o2Ref.current, { opacity: 0, zIndex: 20 });
      gsap.set(o3Ref.current, { opacity: 0, zIndex: 30 });

      // E1 bases
      gsap.set([p1Ref.current], { opacity: 0, y: 30 });
      gsap.set(miniLayoutRef.current, { opacity: 0, y: 16, scale: 0.985 });
      const mlItems1 = miniLayoutRef.current?.querySelectorAll(".ml-item");
      mlItems1 && gsap.set(mlItems1, { opacity: 0, y: 8 });
      gsap.set(strikeRef.current, {
        scaleX: 0,
        autoAlpha: 0,
        transformOrigin: "left center",
      });

      // E2 bases
      gsap.set([p2Ref.current], { opacity: 0, y: 100 });
      gsap.set(o2AuroraRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "blur(12px)",
      });
      gsap.set(o2LayoutRef.current, { opacity: 0, y: 20, scale: 0.985 });
      const mlItems2 = o2LayoutRef.current?.querySelectorAll(".ml-item");
      mlItems2 && gsap.set(mlItems2, { opacity: 0, y: 8 });

      // E3 bases
      gsap.set([p3Ref.current], { opacity: 0, y: 30, scale: 0.98 });
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
          end: "+=2000",
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
        defaults: { ease: "power3.out" },
      });

      /* ========= ESCENA 1: todo junto; tachado con delay ========= */
      tl.addLabel("o1Enter")
        // Texto + contenedor juntos
        .to(
          [p1Ref.current, miniLayoutRef.current],
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          "o1Enter"
        )
        // Items internos del mini-layout, al mismo tiempo
        .to(mlItems1 || [], { opacity: 1, y: 0, duration: 0.5 }, "o1Enter")
        // Tachado después del delay
        .addLabel("strikeStart", `o1Enter+=${STRIKE_DELAY}`)
        .to(strikeRef.current, { autoAlpha: 1, duration: 0.1 }, "strikeStart")
        .to(
          strikeRef.current,
          { scaleX: 1, duration: STRIKE_DRAW_DURATION },
          "strikeStart"
        );

      /* ========= ESCENA 2: todo junto ========= */
      tl.addLabel("o2Enter")
        // Cambio de escenas
        .to(o1Ref.current, { opacity: 0, duration: 0.35 }, "o2Enter")
        .to(o2Ref.current, { opacity: 1, duration: 0.35 }, "o2Enter")
        // Texto + aurora + layout juntos
        .to(
          [p2Ref.current, o2AuroraRef.current, o2LayoutRef.current],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.6,
          },
          "o2Enter"
        )
        // Items internos del layout al mismo tiempo
        .to(mlItems2 || [], { opacity: 1, y: 0, duration: 0.6 }, "o2Enter")
        .to(
          greatRef.current,
          { color: "currentColor", duration: 0.2 },
          "o2Enter"
        );

      /* ========= ESCENA 3: todo junto ========= */
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
        .to(
          [o1Ref.current, o2Ref.current].filter(isDiv),
          { opacity: 0, duration: 0.25 },
          "wipe"
        )
        // Texto + líneas (izq/der) juntos
        .to(
          [p3Ref.current],
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "wipe+=0.25"
        )
        .to(
          [o3LineLeftRef.current, o3LineRightRef.current],
          { scaleX: 1, duration: 0.6 },
          "wipe+=0.25"
        )
        .addPause("+=0.6");
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-x-hidden overflow-y-visible"
    >
      <div
        ref={o1Ref}
        className="absolute inset-0 flex items-center justify-center flex-col px-4 py-[15vh] text-center"
      >
        <div className="relative flex flex-col items-center w-full">
          <p
            ref={p1Ref}
            className="text-3xl md:text-7xl font-medium tracking-tight -mb-8 md:-mb-3"
          >
            <span ref={textWrapRef} className="relative inline-block">
              You need a website
              <span
                ref={strikeRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] md:h-[10px] w-full rounded-full bg-[var(--orange)] block"
              />
            </span>
          </p>

          <div className="flex flex-col w-full items-center relative px-8 py-15 md:px-15 -mb-15">
            <div
              ref={miniLayoutRef}
              className="
                w-full max-w-[min(92vw,420px)]
                rounded-2xl border border-neutral-100 bg-white/20 backdrop-blur
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                overflow-hidden text-left
              "
            >
              <div className="h-9 md:h-10 w-full border-b border-neutral-100 flex items-center gap-2 px-3">
                <span className="ml-item h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="ml-item h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="ml-item h-2.5 w-2.5 rounded-full bg.green-400" />
                <div className="ml-item ml-2 h-2 w-24 md:w-32 rounded bg-white" />
              </div>
              <div className="grid grid-cols-12 gap-3 p-3 md:p-4">
                <div className="col-span-6 space-y-2 flex flex-col justify-center animate-pulse">
                  <div className="ml-item h-2.5 rounded bg-black/20 w-3/4" />
                  <div className="ml-item h-2.5 rounded bg-black/20 w-2/3" />
                  <div className="ml-item h-2.5 rounded bg-black/20 w-4/5" />
                  <div className="ml-item h-2.5 rounded bg-black/20 w-1/2" />
                </div>
                <div className="col-span-6 space-y-2">
                  <div className="ml-item h-28 md:h-32 flex items-center justify-center rounded-lg bg-white border-neutral-200">
                    <IconPhoto />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex gap-2">
                    <div className="ml-item h-2.5 flex-1 rounded bg-neutral-200" />
                    <div className="ml-item h-2.5 flex-[0.5] rounded bg-neutral-200" />
                  </div>
                  <div className="flex gap-2">
                    <div className="ml-item h-2.5 flex-1 rounded bg-white" />
                    <div className="ml-item h-2.5 flex-[0.3] rounded bg-white" />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex gap-2 space-y-1">
                    <div className="ml-item h-2.5 flex-1 rounded bg-neutral-200" />
                    <div className="ml-item h-2.5 flex-[0.5] rounded bg-neutral-200" />
                  </div>
                  <div className="flex gap-2 space-y-1">
                    <div className="ml-item h-2.5 flex-1 rounded bg-white" />
                    <div className="ml-item h-2.5 flex-[0.3] rounded bg-white" />
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 h-[70%] bottom-0 rounded-2xl bg-gradient-to-t from-[var(--background)] to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 h-[30%] bottom-0 rounded-2xl bg-gradient-to-t from-[var(--background)] to-transparent"
            />
          </div>
        </div>
      </div>
      <div
        ref={o2Ref}
        className="absolute flex-col inset-0 flex items-center justify-center px-4 text-center py-[20vh] overflow-visible"
      >
        <p ref={p2Ref} className="text-3xl md:text-7xl -mb-8 md:-mb-3">
          You need a{" "}
          <span ref={greatRef} className="font-black !text-[var(--black)]">
            great
          </span>{" "}
          website.
        </p>
        <div className="flex flex-col w-full items-center relative px-8 py-15 md:px-15 -mb-15">
          <div
            ref={o2AuroraRef}
            className="absolute -z-10 inset-0 overflow-visible flex flex-col items-center justify-end"
          >
            <AuroraGlowYellow
              opacity={0.9}
              blobSize={180}
              speed={5}
              colors={["#0ea5e9", "#ffa914", "#fb2493"]}
              extraBlur={false}
            />
          </div>

          <div
            ref={o2LayoutRef}
            className="
              w-full max-w-[min(92vw,420px)]
              rounded-2xl border border-neutral-100 bg-white/20 backdrop-blur
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              overflow-hidden text-left
            "
          >
            <div className="h-9 md:h-10 w-full border-b border-neutral-100 flex items-center gap-2 px-3">
              <span className="ml-item h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="ml-item h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="ml-item h-2.5 w-2.5 rounded-full bg-green-400" />
              <div className="ml-item ml-2 h-2 w-24 md:w-32 rounded bg-white" />
            </div>

            <div className="grid grid-cols-12 gap-3 p-3 md:p-4">
              <div className="col-span-6 space-y-2 flex flex-col justify-center animate-pulse">
                <div className="ml-item h-2.5 rounded bg-white w-3/4" />
                <div className="ml-item h-2.5 rounded bg.white w-2/3" />
                <div className="ml-item h-2.5 rounded bg-white w-4/5" />
                <div className="ml-item h-2.5 rounded bg-white w-1/2" />
              </div>
              <div className="col-span-6 space-y-2 animate-pulse">
                <div className="ml-item h-28 md:h-32 rounded-lg bg-white border-neutral-200 flex items-center justify-center">
                  <IconPhoto />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex gap-2">
                  <div className="ml-item h-2.5 flex-1 rounded bg-neutral-200" />
                  <div className="ml-item h-2.5 flex-[0.5] rounded bg-neutral-200" />
                </div>
                <div className="flex gap-2">
                  <div className="ml-item h-2.5 flex-1 rounded bg-white" />
                  <div className="ml-item h-2.5 flex-[0.3] rounded bg-white" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex gap-2 space-y-1">
                  <div className="ml-item h-2.5 flex-1 rounded bg-neutral-200" />
                  <div className="ml-item h-2.5 flex-[0.5] rounded bg-neutral-200" />
                </div>
                <div className="flex gap-2 space-y-1">
                  <div className="ml-item h-2.5 flex-1 rounded bg-white" />
                  <div className="ml-item h-2.5 flex-[0.3] rounded bg-white" />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 h-[70%] bottom-0 rounded-2xl bg-gradient-to-t from-[var(--background)] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 h-[30%] bottom-0 rounded-2xl bg-gradient-to-t from-[var(--background)] to-transparent"
          />
        </div>
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
            className="h-[3px] md:h-[5px] rounded-full bg-orange-600 flex-1"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
          <p
            ref={p3Ref}
            className="text-4xl md:text-6xl max-w-3xl font-black tracking-tight text-[var(--orange)] leading-none"
          >
            Great products happen when design meets code.
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
