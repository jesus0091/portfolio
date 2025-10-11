"use client";

import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const WhatsSetsMeApart: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const title = titleRef.current!;
      const cards =
        cardsRef.current!.querySelectorAll<HTMLElement>("[data-card]");

      // Estado inicial
      gsap.set(title, { autoAlpha: 0, y: 40, willChange: "transform,opacity" });
      gsap.set(cards, {
        autoAlpha: 0,
        y: 60,
        rotateX: 6,
        scale: 0.98,
        transformOrigin: "50% 100%",
        willChange: "transform,opacity",
      });

      // Título: entrada + leve parallax con scroll
      if (reduce) {
        gsap.set(title, { autoAlpha: 1, y: 0 });
        gsap.set(cards, { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 });
      } else {
        // Entrada del título cuando entra la sección
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 60%",
              scrub: true,
            },
          })
          .to(title, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" });

        // Parallax sutil del título a lo largo de la sección
        gsap.to(title, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Cards: entrada en stagger cuando aparecen
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        });

        // Efecto sutil de elevación al hacer scroll (muy leve)
        cards.forEach((card) => {
          gsap.to(card, {
            y: -8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-[100vh] flex items-center w-full px-4"
    >
      <div className="mx-auto max-w-6xl w-full">
        <h2
          ref={titleRef}
          className="text-center text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow md:text-gray-900"
        >
          What Sets Me Apart
        </h2>

        <div
          ref={cardsRef}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* NO toco tus bordes/radius */}
          <article data-card className="bg-white/92 p-6">
            <div className="w-18 h-18"></div>
            <h3 className="text-2xl font-extrabold text-orange-600 mb-2">
              Code + Design
            </h3>
            <p className="text-zinc-800 leading-relaxed">
              I build with scalability and consistency from day one, bridging
              creativity with technical execution.
            </p>
          </article>

          <article data-card className="bg-white/92 p-6">
            <div className="w-18 h-18"></div>
            <h3 className="text-2xl font-extrabold text-orange-600 mb-2">
              Pragmatic UX
            </h3>
            <p className="text-zinc-800 leading-relaxed">
              I prioritize clarity, hierarchy, and seamless flows, reducing
              friction at every step.
            </p>
          </article>

          <article data-card className="bg-white/92 p-6">
            <div className="w-18 h-18"></div>
            <h3 className="text-2xl font-extrabold text-orange-600 mb-2">
              Visual Sensibility
            </h3>
            <p className="text-zinc-800 leading-relaxed">
              Careful attention to typography, spacing, and rhythm enhanced by
              my background as an illustrator.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default WhatsSetsMeApart;
