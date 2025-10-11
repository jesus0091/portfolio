"use client";

import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const STRIKE_DELAY = 1.0;
const STRIKE_DRAW_DURATION = 0.8;

const Quote: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const o1Ref = useRef<HTMLDivElement>(null);
  const o2Ref = useRef<HTMLDivElement>(null);
  const o3Ref = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const greatRef = useRef<HTMLSpanElement>(null);
  const strikeRef = useRef<HTMLDivElement>(null);
  const cleanPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([o1Ref.current, o2Ref.current], { opacity: 0 });
      gsap.set(o3Ref.current, { opacity: 1 });
      gsap.set([p3Ref.current], { opacity: 1 });
      gsap.set([strikeRef.current, cleanPanelRef.current], { opacity: 0 });
      if (greatRef.current) {
        // ⬇️ SIN 'any'
        greatRef.current.style.color = "#fd6a00";
      }
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(o1Ref.current, { opacity: 1, zIndex: 10 });
      gsap.set(o2Ref.current, { opacity: 0, zIndex: 20 });
      gsap.set(o3Ref.current, { opacity: 0, zIndex: 30 });

      gsap.set(p1Ref.current, { opacity: 0, y: 30 });
      gsap.set(p2Ref.current, { opacity: 0, y: 100 });
      gsap.set(p3Ref.current, { opacity: 0, y: 30, scale: 0.98 });

      gsap.set(strikeRef.current, {
        scaleX: 0,
        autoAlpha: 0,
        transformOrigin: "left center",
      });
      gsap.set(cleanPanelRef.current, { xPercent: -110 });

      if (greatRef.current) {
        greatRef.current.style.color = "#000000";
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power2.out" },
      });

      tl.addLabel("o1Enter")
        .to(p1Ref.current, { opacity: 1, y: 0, duration: 0.4 }, "o1Enter")
        .addLabel("strikeStart", `o1Enter+=${STRIKE_DELAY}`)
        .to(strikeRef.current, { autoAlpha: 1, duration: 0.12 }, "strikeStart")
        .to(
          strikeRef.current,
          { scaleX: 1, duration: STRIKE_DRAW_DURATION },
          "strikeStart"
        );

      tl.addLabel("o2Enter")
        .to(o1Ref.current, { opacity: 0, duration: 0.4 }, "o2Enter")
        .to(o2Ref.current, { opacity: 1, duration: 0.45 }, "<+0.05")
        .to(
          p2Ref.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "<"
        )
        .set(strikeRef.current, { autoAlpha: 0 });

      tl.addLabel("greatStart", ">+0.1").to(
        greatRef.current,
        { color: "#ff6a00", duration: 0.8, ease: "power2.inOut" },
        "greatStart"
      );

      tl.addLabel("wipe", "greatStart+=1.7")
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
      className="relative h-[100dvh] overflow-hidden w-full"
    >
      <div
        ref={o1Ref}
        className="absolute inset-0 flex items-center justify-center px-4 text-center"
      >
        <div className="relative">
          <p
            ref={p1Ref}
            className="text-3xl md:text-7xl font-medium tracking-tight"
          >
            You need a website.
          </p>
          <div
            ref={strikeRef}
            className="absolute left-1/2 top-[60%] h-[3px] md:h-[10px] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500"
          />
        </div>
      </div>

      {/* Overlay 2 */}
      <div
        ref={o2Ref}
        className="absolute inset-0 flex items-center justify-center px-4 text-center"
      >
        <p ref={p2Ref} className="text-3xl md:text-7xl">
          You need a{" "}
          <span ref={greatRef} className="font-black text-black">
            great
          </span>{" "}
          website.
        </p>
      </div>

      {/* Overlay 3 */}
      <div
        ref={o3Ref}
        className="absolute inset-0 flex items-center justify-center px-4 text-center"
      >
        <div
          ref={cleanPanelRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40 bg-white"
        />
        <p
          ref={p3Ref}
          className="relative z-50 text-3xl md:text-7xl font-black tracking-tight text-orange-600 leading-none"
        >
          Great products happen <br /> when design meets code.
        </p>
      </div>
    </section>
  );
};

export default Quote;
