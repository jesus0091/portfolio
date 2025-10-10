// components/AboutMeSkills.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";

import Flip from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const SKILL_CHIPS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "TailwindCSS",
  "GSAP",
  "Framer Motion",
  "Zustand",
  "Jotai",
  "Redux",
  "Figma",
  "Design System",
  "Prototyping",
  "UX Research",
  "Accessibility",
  "Jest",
  "RTL",
  "Storybook",
  "Git",
  "CI/CD",
];

const AboutMeSkills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Título overlay (vuela) y título estático (destino)
  const titleOverlayRef = useRef<HTMLHeadingElement | null>(null);
  const titleStaticRef = useRef<HTMLHeadingElement | null>(null);

  // Stage (arena del caos) y Grid (destino ordenado)
  const stageRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger, Flip);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const overlay = titleOverlayRef.current!;
      const staticH2 = titleStaticRef.current!;
      const stage = stageRef.current!;
      const grid = gridRef.current!;
      const chips = Array.from(
        grid.querySelectorAll<HTMLElement>("[data-chip]")
      );

      // ========= ESTADO INICIAL =========
      // 1) Título overlay gigante centrado
      const initialScale = 2.2;
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
      gsap.set(staticH2, { opacity: 0 });

      // 2) Mover chips al STAGE (caos) y ponerlos fuera de la “arena”
      //    OJO: grid arranca vacío visualmente; no pasa nada.
      chips.forEach((chip) => {
        if (chip.parentElement !== stage) stage.appendChild(chip);
      });

      const stageRect = () => stage.getBoundingClientRect();
      const floorY = () => stageRect().height - 44; // "piso"
      const minX = 20;
      const maxX = () => stageRect().width - 140;

      gsap.set(chips, {
        position: "absolute",
        x: () => gsap.utils.random(minX, Math.max(minX + 40, maxX())),
        y: () => gsap.utils.random(-200, -80),
        rotation: () => gsap.utils.random(-28, 28),
        opacity: 1,
        zIndex: 10,
        willChange: "transform",
      });

      // ========= FASE 1: TÍTULO viaja centro → top center (scrub) =========
      const centerToTop = () => {
        const r = staticH2.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        return {
          x: cx - window.innerWidth / 2,
          y: cy - window.innerHeight / 2,
        };
      };

      const tlTitle = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=90%", // tramo para el viaje del título
          scrub: true, // reversible
          pin: true,
          anticipatePin: 1,
        },
      });

      tlTitle.to(
        overlay,
        reduce
          ? {
              x: () => centerToTop().x,
              y: () => centerToTop().y,
              scale: 1,
              duration: 0.001,
            }
          : {
              x: () => centerToTop().x,
              y: () => centerToTop().y,
              scale: 1,
              duration: 0.6,
            }
      );
      // cross-fade limpio sin saltos
      tlTitle.to(staticH2, { opacity: 1, duration: 0.2 }, 0.6);
      tlTitle.to(overlay, { opacity: 0, duration: 0.2 }, 0.6);

      // ========= FASE 2: CAÍDA (una sola vez) =========
      // Cuando la sección ya está visible, tiramos los chips con bounce.
      if (!reduce) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(chips, {
              y: () => floorY() + gsap.utils.random(-12, 12),
              x: (i) =>
                gsap.utils.snap(
                  10,
                  gsap.utils.random(
                    minX + (i % 6) * 18,
                    Math.max(minX + 40, maxX()) - (i % 6) * 10
                  )
                ),
              rotation: () => gsap.utils.random(-12, 12),
              ease: "bounce.out",
              duration: 0.9,
              stagger: { from: "random", amount: 0.35 },
            });
          },
        });
      } else {
        gsap.set(chips, { y: floorY(), rotation: 0 });
      }

      // ========= FASE 3: DEL MONTÓN → GRID FINAL (scrub con Flip) =========
      // La grid final está en el DOM pero vacía (porque movimos chips al stage).
      // Creamos una animación Flip desde el estado actual (stage) hacia grid,
      // y la controlamos con scroll (scrub).
      const createFlipToGrid = () => {
        // capturamos "from" (stage)
        const state = Flip.getState(chips);
        // movemos al destino (grid)
        chips.forEach((chip) => {
          if (chip.parentElement !== grid) grid.appendChild(chip);
        });
        // animamos hacia el layout de grid
        return Flip.from(state, {
          absolute: true,
          ease: "power3.inOut",
          stagger: 0.02,
          duration: reduce ? 0.01 : 1.2,
        });
      };

      // El scrub debe empezar después de la fase de título (cuando el pin termina)
      const tlFlip = createFlipToGrid();

      ScrollTrigger.create({
        trigger: section,
        start: "top 30%", // ajusta dónde empieza el “orden”
        end: "bottom top",
        scrub: true,
        animation: tlFlip,
      });

      // ========= HANDLE RESIZE =========
      const onResize = () => {
        // Si todavía no “ordenaste” (estás arriba), re-randomizamos un poco para que no quede fuera
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.getAll().forEach((s) => s.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28"
      aria-labelledby="skills-title"
    >
      {/* fondo de cuadrícula sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px),linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto max-w-6xl px-4">
        {/* header */}
        <header className="relative mb-10">
          {/* título overlay que viaja */}
          <h2
            ref={titleOverlayRef}
            className="pointer-events-none select-none text-center text-6xl sm:text-7xl md:text-8xl leading-none font-black text-orange-600"
            aria-hidden
          >
            Skills
          </h2>

          {/* título estático (top center) que se revela al llegar el overlay */}
          <h2
            ref={titleStaticRef}
            id="skills-title"
            className="text-center text-6xl sm:text-7xl md:text-8xl leading-none font-black text-orange-600"
          >
            Skills
          </h2>
        </header>

        {/* STAGE: arena donde “caen” y se amontonan (altura fija) */}
        <div
          ref={stageRef}
          className="relative mb-10 h-[320px] w-full rounded-2xl border border-zinc-200/60 bg-white/60 backdrop-blur"
          aria-hidden
        />

        {/* GRID FINAL: destino ordenado (flex-wrap / grid) */}
        <ul
          ref={gridRef}
          className="flex flex-wrap justify-center gap-3"
          // grid alternativa: className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {SKILL_CHIPS.map((name) => (
            <li
              key={name}
              data-chip
              className="select-none rounded-xl border border-zinc-200 bg-white px-3 py-2 text-center text-sm font-medium text-zinc-700 shadow-sm"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutMeSkills;
