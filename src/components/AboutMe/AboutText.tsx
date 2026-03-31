"use client";

import {
  IconArrowRight,
  IconBrandBehance,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import React, { useLayoutEffect, useRef } from "react";

import Image from "next/image";
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
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const segments: { text: string; bold?: boolean }[] = [
    { text: "I'm a " },
    { text: "Frontend Developer", bold: true },
    { text: " and " },
    { text: "UX/UI Designer", bold: true },
    { text: " based in " },
    { text: "Buenos Aires, Argentina.", bold: true },
    { text: " I combine " },
    { text: "design and development", bold: true },
    { text: " in a single profile, which means I can take a product from " },
    { text: "concept to polished interface", bold: true },
    { text: " without losing coherence along the way. I care deeply about the " },
    { text: "details:", bold: true },
    { text: " the right " },
    { text: "spacing,", bold: true },
    { text: " the right " },
    { text: "interaction,", bold: true },
    { text: " the right words. That's how I build " },
    { text: "digital products", bold: true },
    { text: " that feel as good as they work." },
  ];

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const para = paraRef.current!;
      const title = titleRef.current!;
      const box = boxRef.current!;
      const words = Array.from(para.querySelectorAll<HTMLElement>("[data-word]"));

      if (reduce) {
        gsap.set([title, box, words], { opacity: 1, x: 0, y: 0, clipPath: "none", scale: 1, rotateX: 0, yPercent: 0 });
        return;
      }

      gsap.set(box,   { clipPath: "inset(100% 0 0 0)", willChange: "transform,opacity" });
      gsap.set(title, { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(words, { opacity: 0, yPercent: 120, rotateX: -35, display: "inline-block", willChange: "transform,opacity" });

      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      })
        .to(box,   { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power4.out" }, 0)
        .to(title, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.4)" }, 0.2)
        .to(words, { opacity: 1, yPercent: 0, rotateX: 0, duration: wordDuration, stagger: wordStagger, ease: "power2.out" }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, [pinDistance, wordStagger, wordDuration, wordOffsetY]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 flex  gap-16 flex-col items-center justify-center"
    >
      <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-2 max-w-[1280px] w-full px-4 md:px-8 gap-10 mx-auto">
        <div className="flex-1 flex h-full w-full items-center justify-center">
          <div
            ref={boxRef}
            className="relative rounded-2xl w-full overflow-hidden min-h-[360px] md:min-h-full"
          >
            <Image
              src="/images/about_me.png"
              alt="Jesús Hernández"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 flex flex-row gap-1 p-4 justify-end">
              <Link
                href="https://www.linkedin.com/in/jesushernandez91/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <IconBrandLinkedin />
              </Link>
              <Link
                href="https://github.com/jesus0091"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <IconBrandGithub />
              </Link>
              <Link
                href="https://www.behance.net/devjesushernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-12 h-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
              >
                <IconBrandBehance />
              </Link>
            </div>
          </div>
        </div>

        <div ref={rightColRef} className="relative flex-1 flex flex-col gap-6 py-4">

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
            {segments.map((seg, si) =>
              seg.text.trim().split(" ").map((w, wi) => (
                <span
                  key={`${si}-${wi}`}
                  data-word
                  className={seg.bold ? "text-[var(--black)]" : ""}
                >
                  {w}
                </span>
              ))
            )}
          </p>
          <style>{`
            @keyframes btn-border-shine {
              0%, 77%   { background-position: 200% 0; opacity: 0; }
              80%       { background-position: 200% 0; opacity: 1; }
              91%       { background-position: -100% 0; opacity: 1; }
              94%, 100% { background-position: -100% 0; opacity: 0; }
            }
            .btn-border-wrap {
              position: relative;
              border-radius: 9999px;
              border: 1.5px solid rgba(0,0,0,0.18);
            }
            .btn-border-wrap::before {
              content: '';
              position: absolute;
              inset: -1.5px;
              border-radius: 9999px;
              padding: 1.5px;
              background: linear-gradient(
                90deg,
                transparent 0%,
                transparent 35%,
                #ff6600 48%,
                #ffaa00 55%,
                transparent 68%,
                transparent 100%
              );
              background-size: 300% 100%;
              background-position: 200% 0;
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              animation: btn-border-shine 15s ease-in-out infinite;
              pointer-events: none;
            }
            .btn-border-wrap:hover::before {
              animation: none;
              opacity: 0;
            }
            @keyframes btn-text-sweep {
              0%, 77%   { background-position: 100% 0; }
              91%       { background-position: 0% 0; }
              94%, 100% { background-position: 100% 0; }
            }
            .btn-text-shine {
              background: linear-gradient(
                90deg,
                #111 0%, #111 40%,
                #ff6600 48%, #ffaa00 52%,
                #111 60%, #111 100%
              );
              background-size: 400% 100%;
              background-repeat: no-repeat;
              background-position: 100% 0;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: btn-text-sweep 15s ease-in-out infinite;
            }
            .btn-border-wrap:hover .btn-text-shine {
              -webkit-text-fill-color: white;
              background: none;
              animation: none;
            }
          `}</style>
          <div className="btn-border-wrap w-fit">
            <Link href="#projects" className="group flex flex-row items-center gap-2 px-5 py-3 rounded-full font-semibold text-base transition-colors hover:bg-black hover:text-white">
              <span className="btn-text-shine">Look at My Work</span>
              <IconArrowRight className="transition-transform duration-200 group-hover:rotate-90" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutText;
