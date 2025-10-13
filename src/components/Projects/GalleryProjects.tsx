"use client";

import { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const AMPLITUDE = 140;
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
      cards.forEach((el, i) => {
        gsap.set(el, {
          opacity: 0,
          y: -curveY(i, AMPLITUDE) + 100,
        });
      });
      gsap.to(cards, {
        opacity: 1,
        duration: 1.2,
        delay: 2,
        stagger: 0.15,
        ease: "power3.out",
      });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(cards, { y: 0, duration: 1 }, 0);
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
      className="overflow-hidden h-[40vh] md:h-[60vh] -mt-[30vh] flex justify-center items-center md:-mt-[25vh]"
    >
      <div className="flex flex-row gap-1 md:gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="g-item w-[15vw] min-w-[110px] md:min-w-[260px] aspect-[9/11] bg-gray-500 mb-4"
          />
        ))}
      </div>
    </div>
  );
}
