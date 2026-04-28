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

    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      cards.forEach((el, i) => {
        gsap.set(el, {
          opacity: 0,
          y: isMobile ? 40 : -curveY(i, AMPLITUDE) + 100,
        });
      });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 2,
        stagger: 0.15,
        ease: "power3.out",
      });
      if (!isMobile) {
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
      }
    }, root);

    const cleanups: (() => void)[] = [];

    if (isDesktop) {
      cards.forEach((card) => {
        const xTo = gsap.quickTo(card, "rotateY", {
          duration: 0.4,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(card, "rotateX", {
          duration: 0.4,
          ease: "power3.out",
        });

        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateY = ((x - centerX) / centerX) * 8;
          const rotateX = -((y - centerY) / centerY) * 6;
          xTo(rotateY);
          yTo(rotateX);
        };

        const onMouseEnter = () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power3.out" });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseenter", onMouseEnter);
        card.addEventListener("mouseleave", onMouseLeave);

        cleanups.push(() => {
          card.removeEventListener("mousemove", onMouseMove);
          card.removeEventListener("mouseenter", onMouseEnter);
          card.removeEventListener("mouseleave", onMouseLeave);
        });
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const gallery = [
    { id: 1, urlImage: "/images/gallery-2.webp" },
    { id: 2, urlImage: "/images/gallery-3.webp" },
    { id: 3, urlImage: "/images/gallery-1.webp" },
    { id: 4, urlImage: "/images/gallery-4.webp" },
    { id: 5, urlImage: "/images/gallery-2.webp" },
    { id: 6, urlImage: "/images/gallery-6.webp" },
    { id: 7, urlImage: "/images/gallery-4.webp" },
  ];

  return (
    <div
      ref={rootRef}
      className="overflow-hidden h-[70vh] -mt-[18vh] flex flex-col justify-center items-center"
    >
      <div className="flex flex-row gap-1 md:gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="g-item w-[15vw] relative min-w-[110px] rounded-md md:rounded-xl overflow-clip md:min-w-[260px] flex items-start aspect-[9/11] shadow-2xs bg-gray-500 mb-4 md:[transform-style:preserve-3d] md:[will-change:transform]"
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
        <p className="text-center text-xl font-medium">
          Join to my projects
        </p>
        <SignatureIcon className="h-25 md:h-40" />
      </div>
    </div>
  );
}
