"use client";

import { useLayoutEffect, useRef } from "react";

import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SignatureIcon } from "../AboutMe/SkillsIcons";
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
    { id: 1, urlImage: "/images/gallery-2.png" },
    { id: 2, urlImage: "/images/gallery-3.png" },
    { id: 3, urlImage: "/images/gallery-1.png" },
    { id: 4, urlImage: "/images/gallery-4.png" },
    { id: 5, urlImage: "/images/gallery-2.png" },
    { id: 6, urlImage: "/images/gallery-6.png" },
    { id: 7, urlImage: "/images/gallery-4.png" },
  ];

  return (
    <div
      ref={rootRef}
      className="overflow-hidden h-[70vh] flex flex-col justify-center items-center"
    >
      <div className="flex flex-row gap-1 md:gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="g-item w-[15vw] relative min-w-[110px] rounded-md md:rounded-xl overflow-clip md:min-w-[260px] flex items-start aspect-[9/11] shadow-2xs bg-gray-500 mb-4"
          >
            <Image
              src={item.urlImage}
              alt={`Gallery image ${item.id}`}
              fill
              className="object-top object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-4">
        <p className="text-center text-xl md:text-4xl font-medium">
          Join to my projects
        </p>
        <SignatureIcon className="h-25 md:h-40" />
      </div>
    </div>
  );
}
