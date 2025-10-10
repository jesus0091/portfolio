"use client";

import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

type AboutTextProps = {
  /** % de viewport que dura el tramo “pineado” */
  pinDistance?: number; // "+=120%" por defecto
  /** escala inicial del título centrado */
  initialScale?: number; // 2.2 por defecto
  /** stagger entre palabras del párrafo (segundos) */
  wordStagger?: number; // 0.03 por defecto
};

const AboutText: React.FC<AboutTextProps> = ({
  pinDistance = 120,
  initialScale = 2.2,
  wordStagger = 0.03,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // refs visuales
  const titleOverlayRef = useRef<HTMLHeadingElement | null>(null); // título que vuela
  const titleStaticRef = useRef<HTMLHeadingElement | null>(null); // título en layout
  const titleTargetRef = useRef<HTMLDivElement | null>(null); // ancla de destino
  const paraRef = useRef<HTMLParagraphElement | null>(null); // párrafo

  const text =
    "I'm a Frontend Developer and UX/UI Designer based in Buenos Aires, Argentina with over 3 years of experience. I combine design and development in a single profile, which allows me to create interfaces that are coherent, functional and visually engaging. From visual conception to technical implementation, I work with an integral perspective to deliver consistent user experiences and scalable digital products.";

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // respetar reduce-motion
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const overlay = titleOverlayRef.current!;
      const staticTitle = titleStaticRef.current!;
      const target = titleTargetRef.current!;
      const para = paraRef.current!;
      const words = Array.from(
        para.querySelectorAll<HTMLElement>("[data-word]")
      );

      // Estado inicial
      gsap.set(overlay, {
        position: "fixed",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: initialScale,
        opacity: 1,
        transformOrigin: "50% 50%",
        zIndex: 40,
        willChange: "transform, opacity",
      });
      gsap.set(staticTitle, { opacity: 0 });
      gsap.set(words, { opacity: 0, y: 8, willChange: "opacity, transform" });

      // Función para calcular el destino del overlay (centro del target)
      const computeTo = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        return {
          x: cx - vw / 2,
          y: cy - vh / 2,
        };
      };

      // Timeline principal (reversible)
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${pinDistance}%`,
          scrub: true, // 🔁 reversible arriba/abajo
          pin: true,
          anticipatePin: 1,
        },
      });

      // 0 → 0.6: overlay viaja y escala a 1 (valores función -> se recalculan en refresh; sin recursion)
      tl.to(
        overlay,
        reduce
          ? {
              x: () => computeTo().x,
              y: () => computeTo().y,
              duration: 0.001,
              scale: 1,
            }
          : {
              x: () => computeTo().x,
              y: () => computeTo().y,
              scale: 1,
              duration: 0.6,
            }
      );

      // 0.6 → 0.7: swap overlay ↔ estático (overlay se apaga, estático aparece)
      tl.to(staticTitle, { opacity: 1, duration: 0.2 }, 0.6);
      tl.to(overlay, { opacity: 0, duration: 0.2 }, 0.6);

      // 0.65 → 1: revelar palabras del párrafo
      tl.to(
        words,
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
      {/* overlay que arranca centrado y viaja */}
      <h2
        ref={titleOverlayRef}
        className="pointer-events-none select-none text-8xl font-black text-orange-600"
      >
        meet me
      </h2>

      {/* columna izquierda: título final + párrafo */}
      <div className="col-span-7 flex flex-col gap-6">
        {/* título estático (en su lugar final). Arranca oculto y se activa cuando llega el overlay */}
        <h2
          ref={titleStaticRef}
          className="text-8xl font-black text-orange-600"
        >
          meet me
        </h2>

        {/* ancla geométrica (invisible) para calcular el destino del overlay.
            Lo coloco justo después del título estático para “aterrizar” ahí */}
        <div ref={titleTargetRef} className="h-0 w-0" aria-hidden />

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
