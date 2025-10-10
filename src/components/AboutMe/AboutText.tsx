"use client";

import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

type AboutTextProps = {
  pinDistance?: number; // % del viewport que dura el pin (recorrido)
  initialScale?: number; // escala inicial del título centrado
  wordStagger?: number; // stagger (segundos) entre palabras del párrafo
};

const AboutText: React.FC<AboutTextProps> = ({
  pinDistance = 120,
  initialScale = 2.2,
  wordStagger = 0.03,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Título overlay (el que viaja) y título final en layout (mismo estilo)
  const titleOverlayRef = useRef<HTMLHeadingElement | null>(null);
  const titleStaticRef = useRef<HTMLHeadingElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);

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
      const wordSpans = Array.from(
        para.querySelectorAll<HTMLElement>("[data-word]")
      );

      // Estado inicial
      gsap.set(overlay, {
        position: "fixed",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: initialScale,
        opacity: 1,
        transformOrigin: "50% 50%",
        zIndex: 40,
        willChange: "transform, opacity",
      });
      gsap.set(staticH2, { opacity: 0 }); // estará exactamente debajo al final
      gsap.set(wordSpans, {
        opacity: 0,
        y: 8,
        willChange: "opacity, transform",
      });

      // Destino por centro a centro (estable con escala)
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
          scrub: true, // reversible arriba/abajo
          pin: true,
          anticipatePin: 1,
        },
      });

      // 0 → 0.6 : overlay viaja y escala a 1 (destino se reevalúa en refresh)
      tl.to(
        overlay,
        reduce
          ? { x: () => toXY().x, y: () => toXY().y, scale: 1, duration: 0.001 }
          : { x: () => toXY().x, y: () => toXY().y, scale: 1, duration: 0.6 }
      );

      // 0.6 → 0.7 : cross-fade sin salto (misma posición y escala)
      tl.to(staticH2, { opacity: 1, duration: 0.2 }, 0.6);
      tl.to(overlay, { opacity: 0, duration: 0.2 }, 0.6);

      // 0.65 → 1 : revelar párrafo palabra por palabra
      tl.to(
        wordSpans,
        reduce
          ? { opacity: 1, y: 0, duration: 0.001 }
          : { opacity: 1, y: 0, duration: 0.35, stagger: wordStagger },
        0.65
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [initialScale, pinDistance, wordStagger]);

  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mb-20 mt-10 grid min-h-[100vh] max-w-6xl grid-cols-12 items-center justify-center py-30"
    >
      <h2
        ref={titleOverlayRef}
        className="pointer-events-none inline max-w-max w-fit select-none text-8xl leading-none font-black text-orange-600"
      >
        meet me
      </h2>
      <div className="col-span-7 flex flex-col gap-6">
        <h2
          ref={titleStaticRef}
          className="pointer-events-none inline max-w-max w-fit select-none text-8xl leading-none font-black text-orange-600"
        >
          meet me
        </h2>
        <p
          ref={paraRef}
          className="flex flex-wrap gap-2 text-3xl font-semibold tracking-tight text-gray-700"
        >
          {words.map((w, i) => (
            <span key={i} data-word>
              {w}
            </span>
          ))}
        </p>
      </div>
      <div className="col-span-5 flex-1" />
    </section>
  );
};

export default AboutText;
