"use client";

import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const AMPLITUDE = 100; // altura de la curva

export default function GalleryProjects() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cards = gsap.utils.toArray<HTMLElement>(".g-item");
    if (!cards.length || prefersReduced) return;

    const center = (cards.length - 1) / 2;
    const curveY = (i: number, amp: number) => {
      const x = i - center;
      return (amp * (x * x)) / (center * center || 1);
    };

    const ctx = gsap.context(() => {
      // ESTADO INICIAL: curva HACIA ABAJO (solo translateY)
      cards.forEach((el, i) => {
        gsap.set(el, {
          y: -curveY(i, AMPLITUDE),
        });
      });

      // Timeline mapeada al scroll: abajo -> plano -> arriba
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // → PLANO
      tl.to(cards, { y: 0, duration: 1 }, 0);

      // → CURVA HACIA ARRIBA
      tl.to(cards, { y: (i) => curveY(i, AMPLITUDE), duration: 1 }, 1);
    }, root);

    return () => ctx.revert();
  }, []);

  const gallery = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];

  return (
    <div
      ref={rootRef}
      className="overflow-clip h-[60vh] flex justify-center items-center -mt-[20vh]"
    >
      <div className="flex flex-row gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="g-item w-[15vw] min-w-[260px] h-[320px] bg-gray-500 mb-4 "
          />
        ))}
      </div>
    </div>
  );
}
