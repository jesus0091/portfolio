"use client";

import React, { useLayoutEffect, useRef } from "react";

import AuroraGlowYellow from "../AuroraGlowYellow";
import { IconPhoto } from "@tabler/icons-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const STRIKE_DELAY = 1.0; // cuando empieza el tachado
const STRIKE_DRAW_DURATION = 0.8; // duración del “dibujado” del tachado

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
  const o2AuroraRef = useRef<HTMLDivElement>(null); // ⬅️ contenedor de la aurora
  const o2LayoutRef = useRef<HTMLDivElement>(null); // ⬅️ contenedor del card/layout

  // Escena 3
  const o3Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const cleanPanelRef = useRef<HTMLDivElement>(null);

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

      if (greatRef.current) (greatRef.current.style as any).color = "#000000";
      return;
    }

    const ctx = gsap.context(() => {
      // Estados base
      gsap.set(o1Ref.current, { opacity: 1, zIndex: 10 });
      gsap.set(o2Ref.current, { opacity: 0, zIndex: 20 });
      gsap.set(o3Ref.current, { opacity: 0, zIndex: 30 });

      gsap.set(p1Ref.current, { opacity: 0, y: 30 });
      gsap.set(p2Ref.current, { opacity: 0, y: 100 });
      gsap.set(p3Ref.current, { opacity: 0, y: 30, scale: 0.98 });

      // Mini layout base (Escena 1)
      gsap.set(miniLayoutRef.current, { opacity: 0, y: 16, scale: 0.985 });
      const mlItems1 = miniLayoutRef.current?.querySelectorAll(".ml-item");
      mlItems1 && gsap.set(mlItems1, { opacity: 0, y: 8 });

      // Strike relativo al ancho del texto (Escena 1)
      gsap.set(strikeRef.current, {
        scaleX: 0,
        autoAlpha: 0,
        transformOrigin: "left center",
      });

      // Escena 2: estados base para AURORA + LAYOUT
      gsap.set(o2AuroraRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "blur(12px)",
      });
      gsap.set(o2LayoutRef.current, { opacity: 0, y: 20, scale: 0.985 });
      const mlItems2 = o2LayoutRef.current?.querySelectorAll(".ml-item");
      mlItems2 && gsap.set(mlItems2, { opacity: 0, y: 8 });

      gsap.set(cleanPanelRef.current, { xPercent: -110 });
      if (greatRef.current) (greatRef.current.style as any).color = "#000000";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onEnter: () => {
            // Evita recortes del pin-spacer
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

      /* =========================
         ESCENA 1
      ========================= */
      tl.addLabel("o1Enter")
        // 1) Texto
        .to(p1Ref.current, { opacity: 1, y: 0, duration: 0.45 }, "o1Enter")
        // 2) Mini layout contenedor
        .to(
          miniLayoutRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
          "o1Enter+=0.12"
        )
        // 3) Stagger de elementos internos del mini layout
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
        // 4) Tachado relativo al texto
        .addLabel("strikeStart", `o1Enter+=${STRIKE_DELAY}`)
        .to(strikeRef.current, { autoAlpha: 1, duration: 0.12 }, "strikeStart")
        .to(
          strikeRef.current,
          { scaleX: 1, duration: STRIKE_DRAW_DURATION },
          "strikeStart"
        )
        // micro “snap” del strike (opcional)
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

      /* =========================
         ESCENA 2 (animar aurora + layout)
      ========================= */
      tl.addLabel("o2Enter")
        .to(o1Ref.current, { opacity: 0, duration: 0.4 }, "o2Enter")
        .to(o2Ref.current, { opacity: 1, duration: 0.45 }, "<+0.05")
        .to(
          p2Ref.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "<"
        )
        // AURORA: fade / blur-out / scale-in
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
          "<" // justo con el texto
        )
        // LAYOUT contenedor
        .to(
          o2LayoutRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
          "<+0.05"
        )
        // LAYOUT items internos (stagger)
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
        // Asegura color estático en "great" (no animado)
        .to(greatRef.current, { color: "#000000", duration: 0.2 }, "<");

      /* =========================
         ESCENA 3
      ========================= */
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
          [o1Ref.current, o2Ref.current],
          { opacity: 0, duration: 0.3 },
          "wipe+=0.05"
        )
        .to(
          p3Ref.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
          "wipe+=0.25"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-x-hidden overflow-y-visible"
    >
      {/* ========== ESCENA 1 ========== */}
      <div
        ref={o1Ref}
        className="absolute inset-0 flex items-center justify-end flex-col px-4 py-[15vh] text-center"
      >
        <div className="relative flex flex-col items-center w-full">
          <p
            ref={p1Ref}
            className="text-3xl md:text-7xl font-medium tracking-tight"
          >
            <span ref={textWrapRef} className="relative inline-block">
              You need a website
              <span
                ref={strikeRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] md:h-[10px] w-full rounded-full bg-orange-500 block"
              />
            </span>
          </p>

          <div className="flex flex-col w-full items-center relative px-8 py-15 md:py-15 md:px-15">
            <div
              ref={miniLayoutRef}
              className="
                w-full max-w-[min(92vw,420px)]
                rounded-2xl border border-neutral-100 bg-white/20 backdrop-blur
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                overflow-hidden text-left
              "
            >
              {/* Header */}
              <div className="h-9 md:h-10 w-full border-b border-neutral-100 flex items-center gap-2 px-3">
                <span className="ml-item h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="ml-item h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="ml-item h-2.5 w-2.5 rounded-full bg-green-400" />
                <div className="ml-item ml-2 h-2 w-24 md:w-32 rounded bg-white" />
              </div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-3 p-3 md:p-4">
                {/* Sidebar */}
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
                {/* Body Content */}
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

            {/* overlays existentes */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 h-[70%] bottom-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, #e4e4e400 0%, #e4e4e4 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 h-[30%] bottom-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(to bottom, #e4e4e400 0%, #e4e4e4 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ========== ESCENA 2 (Aurora + Layout animados) ========== */}
      <div
        ref={o2Ref}
        className="absolute flex-col inset-0 flex items-center justify-end px-4 text-center py-[15vh] overflow-visible"
      >
        <p ref={p2Ref} className="text-3xl md:text-7xl">
          You need a{" "}
          <span ref={greatRef} className="font-black text-black">
            great
          </span>{" "}
          website.
        </p>

        <div className="flex flex-col w-full items-center relative px-8 py-15 md:py-15 md:px-15">
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
                <div className="ml-item h-2.5 rounded bg-white w-2/3" />
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
            className="pointer-events-none absolute left-0 right-0 h-[70%] bottom-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(to bottom, #e4e4e400 0%, #e4e4e4 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 h-[30%] bottom-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(to bottom, #e4e4e400 0%, #e4e4e4 100%)",
            }}
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
          className="pointer-events-none absolute inset-0 z-40 bg-[#e4e4e4] flex items-center justify-center"
        />
        <p
          ref={p3Ref}
          className="relative z-50 text-4xl md:text-8xl max-w-6xl font-black tracking-tight text-orange-600 leading-none"
        >
          Great products happen when design meets code.
        </p>
      </div>
    </section>
  );
};

export default Quote;
