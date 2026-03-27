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

  const text =
    "I'm a Frontend Developer and UX/UI Designer based in Buenos Aires, Argentina with over 3 years of experience. I combine design and development in a single profile, which allows me to create interfaces that are coherent, functional and visually engaging. From visual conception to technical implementation, I work with an integral perspective to deliver consistent user experiences and scalable digital products.";

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
      const words = Array.from(
        para.querySelectorAll<HTMLElement>("[data-word]")
      );

      // Estado inicial
      gsap.set(title, {
        opacity: reduce ? 1 : 0,
        y: reduce ? 0 : 40,
      });
      gsap.set(words, {
        opacity: reduce ? 1 : 0,
        y: reduce ? 0 : wordOffsetY,
        display: "inline-block",
        willChange: "transform,opacity",
      });
      gsap.set(box, {
        opacity: reduce ? 1 : 0,
        y: reduce ? 0 : 60, // recuadro entra desde abajo
        willChange: "transform,opacity",
      });

      if (reduce) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });

      // Recuadro primero
      tl.to(box, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      });

      // Luego el título
      tl.to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );

      // Luego el párrafo palabra por palabra
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: wordDuration,
          stagger: wordStagger,
        },
        "-=0.2"
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
                className="flex w-12 h-12 items-center justify-center"
              >
                <IconBrandLinkedin />
              </Link>
              <Link
                href="https://github.com/jesus0091"
                target="_blank"
                className="flex w-12 h-12 items-center justify-center"
              >
                <IconBrandGithub />
              </Link>
              <Link
                href="https://www.behance.net/devjesushernandez"
                target="_blank"
                className="flex w-12 h-12 items-center justify-center"
              >
                <IconBrandBehance />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 py-3">
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
            className="flex flex-wrap gap-y-1 gap-x-1.5 md:gap-2 text-lg md:text-2xl font-medium md:tracking-tight"
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
