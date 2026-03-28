"use client";

import {
  IconBrandBehance,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import React, { useLayoutEffect, useRef } from "react";

import ButtonOutlined from "../ButtonOutlined";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

type AboutTextProps = {
  pinDistance?: number;
  wordStagger?: number;
  wordDuration?: number;
  wordOffsetY?: number;
};

const AboutText: React.FC<AboutTextProps> = ({
  pinDistance = 60,
  wordStagger = 0.03,
  wordDuration = 0.35,
  wordOffsetY = 10,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const wipeRef = useRef<HTMLDivElement | null>(null);

  const text =
    "I'm a Frontend Developer and UX/UI Designer based in Buenos Aires, Argentina. I combine design and development in a single profile, which means I can take a product from concept to polished interface without losing coherence along the way. I care deeply about the details: the right spacing, the right interaction, the right words. That's how I build digital products that feel as good as they work.";

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const para = paraRef.current!;
      const title = titleRef.current!;
      const box = boxRef.current!;
      const wipe = wipeRef.current!;
      const words = Array.from(
        para.querySelectorAll<HTMLElement>("[data-word]")
      );

      if (reduce) {
        gsap.set([title, box, words], { opacity: 1, y: 0 });
        gsap.set(wipe, { scaleX: 0 });
        return;
      }

      // Estado inicial
      gsap.set(title, { opacity: 0, y: 40 });
      gsap.set(words, {
        opacity: 0,
        y: wordOffsetY,
        display: "inline-block",
        willChange: "transform,opacity",
      });
      gsap.set(box, {
        opacity: 0,
        y: 60,
        willChange: "transform,opacity",
      });
      // El wipe empieza cubriendo todo el contenido derecho
      gsap.set(wipe, { scaleX: 1, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      // Recuadro entra desde abajo
      tl.to(box, { opacity: 1, y: 0, duration: 0.6 }, 0);

      // Wipe sale por la derecha (transformOrigin: right)
      tl.to(
        wipe,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.7,
          ease: "power3.inOut",
        },
        0.1
      );

      // Título aparece cuando el wipe está ~50% completado
      tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, 0.4);

      // Palabras después del wipe
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: wordDuration,
          stagger: wordStagger,
        },
        0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [pinDistance, wordStagger, wordDuration, wordOffsetY]);

  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 flex  gap-16 flex-col items-center justify-center"
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 max-w-[1280px] w-full px-4 md:px-8 gap-10 mx-auto">
        <div className="flex-1 flex h-full w-full items-center justify-center">
          <div
            ref={boxRef}
            className="bg-[var(--white)] rounded-2xl flex flex-col w-full min-h-[260px] md:min-h-full md:h-fit"
          >
            <div className="flex-1" />
            <div className="flex flex-row gap-1 p-4 justify-end">
              <Link
                href="https://www.linkedin.com/in/jesushernandez91/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-12 h-12 items-center justify-center"
              >
                <IconBrandLinkedin />
              </Link>
              <Link
                href="https://github.com/jesus0091"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-12 h-12 items-center justify-center"
              >
                <IconBrandGithub />
              </Link>
              <Link
                href="https://www.behance.net/devjesushernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-12 h-12 items-center justify-center"
              >
                <IconBrandBehance />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden flex-1 flex flex-col gap-6 py-3">
          {/* Wipe overlay */}
          <div
            ref={wipeRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "#ff6600" }}
          />

          <div className="flex flex-col">
            <p className="text-xl font-semibold text-[var(--orange)] tracking-wide mb-2">
              About Me
            </p>
            <h2
              ref={titleRef}
              className="select-none text-3xl md:text-6xl leading-tighter font-semibold text-[var(--black)]"
            >
              The Creative Mind Behind the Code
            </h2>
          </div>
          <p
            ref={paraRef}
            className="flex flex-wrap gap-y-1 gap-x-1.5 md:gap-1.5 text-xl font-medium"
          >
            {words.map((w, i) => (
              <span key={i} data-word>
                {w}
              </span>
            ))}
          </p>
          <ButtonOutlined className="w-fit">See My Work</ButtonOutlined>
        </div>
      </div>
    </section>
  );
};

export default AboutText;
