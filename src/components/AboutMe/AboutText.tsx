"use client";

import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

type AboutTextProps = {
  pinDistance?: number;
  initialScale?: number;
  wordStagger?: number;
  bgFinalOpacity?: number;
  bgSrc?: string;
};

const AboutText: React.FC<AboutTextProps> = ({
  pinDistance = 120,
  initialScale = 2.2,
  wordStagger = 0.03,
  bgFinalOpacity = 0.5,
  bgSrc = "/images/aboutme-text.png",
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const titleOverlayRef = useRef<HTMLHeadingElement | null>(null);
  const titleStaticRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  const text =
    "I'm a Frontend Developer and UX/UI Designer based in Buenos Aires, Argentina with over 3 years of experience. I combine design and development in a single profile, which allows me to create interfaces that are coherent, functional and visually engaging. From visual conception to technical implementation, I work with an integral perspective to deliver consistent user experiences and scalable digital products.";

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const overlay = titleOverlayRef.current!;
      const staticH2 = titleStaticRef.current!;
      const para = paraRef.current!;
      const bg = bgRef.current!;

      const wordSpans = Array.from(
        para.querySelectorAll<HTMLElement>("[data-word]")
      );
      const moveDur = reduce ? 0.001 : 1.5;
      const fadeDur = reduce ? 0.001 : 0.25;
      const introGap = 0.6;
      const wordsGap = 0.1;
      const bgDur = reduce ? 0.001 : 7;

      gsap.set(overlay, {
        position: "fixed",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: initialScale,
        opacity: 1,
        zIndex: 40,
        willChange: "transform,opacity",
      });
      gsap.set(staticH2, { opacity: 0 });
      gsap.set(wordSpans, {
        opacity: 0,
        y: 8,
        willChange: "opacity,transform",
      });
      gsap.set(bg, { opacity: 0 });

      const toXY = () => {
        const r = staticH2.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        return {
          x: cx - window.innerWidth / 2,
          y: cy - window.innerHeight / 2,
        };
      };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${pinDistance}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        overlay,
        reduce
          ? {
              x: () => toXY().x,
              y: () => toXY().y,
              scale: 1,
              duration: moveDur,
            }
          : {
              x: () => toXY().x,
              y: () => toXY().y,
              scale: 1,
              duration: moveDur,
            },
        introGap
      );

      const fadeStart = introGap + moveDur - fadeDur * 0.2;
      tl.to(staticH2, { opacity: 1, duration: fadeDur }, fadeStart);
      tl.to(overlay, { opacity: 0, duration: fadeDur }, fadeStart);

      const wordsStart = introGap + moveDur + wordsGap;
      const wordsTween = tl.to(
        wordSpans,
        reduce
          ? { opacity: 1, y: 0, duration: 0.001 }
          : { opacity: 1, y: 0, duration: 0.35, stagger: wordStagger },
        wordsStart
      );

      tl.to(
        bg,
        reduce
          ? { opacity: bgFinalOpacity, duration: 0.001 }
          : { opacity: bgFinalOpacity, duration: bgDur, ease: "power1.out" },
        wordsStart
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [initialScale, pinDistance, wordStagger, bgFinalOpacity]);

  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex flex-col items-center justify-center"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -z-10 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: "contain",
        }}
        aria-hidden
      />

      <section className="relative grid max-w-6xl grid-cols-12 gap-6 mx-auto">
        <h2
          ref={titleOverlayRef}
          className="pointer-events-none inline w-fit max-w-max select-none text-7xl leading-none font-black text-orange-600"
        >
          .about-me
        </h2>
        <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
          <h2
            ref={titleStaticRef}
            className="inline w-fit max-w-max select-none text-7xl leading-none font-black text-orange-600"
          >
            .about-me
          </h2>

          <p
            ref={paraRef}
            className="flex flex-wrap gap-2 text-2xl font-semibold tracking-tight text-gray-700"
          >
            {words.map((w, i) => (
              <span key={i} data-word>
                {w}
              </span>
            ))}
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 flex h-full w-full items-center justify-center">
          <div className="bg-white w-full min-h-[260px] md:min-h-[500px]" />
        </div>
      </section>
    </section>
  );
};

export default AboutText;
