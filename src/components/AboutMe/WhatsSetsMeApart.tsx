"use client";

import { IconCode, IconHierarchy2, IconTypography } from "@tabler/icons-react";
import React, { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const WhatsSetsMeApart: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const title = titleRef.current!;
      const subtitle = subtitleRef.current!;
      const cards =
        cardsWrapRef.current!.querySelectorAll<HTMLElement>("[data-card]");

      gsap.set([title, subtitle], { autoAlpha: 0, y: 30 });
      gsap.set(cards, { autoAlpha: 0, y: 40, scale: 0.95 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
        .to(title, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(
          subtitle,
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .to(cards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-[100vh] py-[10vh] flex items-center w-full px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1280px] flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-3">
          <h2
            ref={titleRef}
            className="text-center text-3xl md:text-6xl font-semibold tracking-tight text-[var(--black)] drop-shadow"
          >
            What Sets Me Apart
          </h2>
          <p
            ref={subtitleRef}
            className="text-center text-lg md:text-2xl font-medium max-w-2xl mx-auto"
          >
            A blend of creativity, technical expertise, and user-centered
            thinking that makes every project stand out.
          </p>
        </div>
        <div
          ref={cardsWrapRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
        >
          <article
            data-card
            className="bg-[var(--white)] flex flex-col gap-4 p-6 rounded-2xl"
          >
            <div className="w-18 flex items-center justify-center h-18 bg-[var(--black)]/20 rounded-xl">
              <IconCode className="text-[var(--black)] w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--orange)] mb-2">
                Code + Design
              </h3>
              <p className="leading-relaxed text-lg md:text-xl font-medium">
                I build with scalability and consistency from day one, bridging
                creativity with technical execution.
              </p>
            </div>
          </article>
          <article
            data-card
            className="bg-[var(--white)] flex flex-col gap-4 p-6 rounded-2xl"
          >
            <div className="w-18 flex items-center justify-center h-18 bg-[var(--black)]/20 rounded-xl">
              <IconHierarchy2 className="text-[var(--black)] w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--orange)] mb-2">
                Pragmatic UX
              </h3>
              <p className="leading-relaxed text-lg md:text-xl font-medium">
                I prioritize clarity, hierarchy, and seamless flows, reducing
                friction at every step.
              </p>
            </div>
          </article>
          <article
            data-card
            className="bg-[var(--white)] flex flex-col gap-4 p-6 rounded-2xl"
          >
            <div className="w-18 flex items-center justify-center h-18 bg-[var(--black)]/20 rounded-xl">
              <IconTypography className="text-[var(--black)] w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--orange)] mb-2">
                Visual Sensibility
              </h3>
              <p className="leading-relaxed text-lg md:text-xl font-medium">
                Careful attention to typography, spacing, and rhythm enhanced by
                my background as an illustrator.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default WhatsSetsMeApart;
