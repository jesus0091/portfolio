"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  IconBrandBehance,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import AuroraGlow from "./AuroraGlow";
import Cursor from "./Cursor";
import Link from "next/link";
import gsap from "gsap";
import styled from "styled-components";

export default function HomePage() {
  const [hovered, setHovered] = useState<"frontend" | "designer">("frontend");
  const [cursorActive, setCursorActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isFrontendFilled = hovered !== "designer";
  const isDesignerFilled = hovered === "designer";

  const sectionRef = useRef<HTMLElement | null>(null);
  const greetRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const frontendRowRef = useRef<HTMLDivElement | null>(null);
  const designerRowRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const footerSocialRef = useRef<HTMLDivElement | null>(null);

  const qsa = <T extends Element>(root: Element | null, sel: string): T[] =>
    root ? Array.from(root.querySelectorAll<T>(sel)) : [];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      [greetRef, titleRef, subtitleRef, footerSocialRef].forEach(
        (r) =>
          r?.current &&
          gsap.set(r.current, { autoAlpha: 1, y: 0, clearProps: "all" })
      );
      // Elementos de filas
      const frontendBits = qsa<Element>(
        frontendRowRef.current,
        ".angle, .word"
      );
      const designerBits = qsa<Element>(designerRowRef.current, ".amp, .word");
      gsap.set(frontendBits, { autoAlpha: 1, y: 0, clearProps: "all" });
      gsap.set(designerBits, { autoAlpha: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const frontendBits = qsa<Element>(
        frontendRowRef.current,
        ".angle, .word"
      );
      const designerBits = qsa<Element>(designerRowRef.current, ".amp, .word");
      const socialLinks = qsa<Element>(footerSocialRef.current, "a");

      gsap.set(greetRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(titleRef.current, { autoAlpha: 1 });
      gsap.set(frontendBits, { autoAlpha: 0, y: 28 });
      gsap.set(designerBits, { autoAlpha: 0, y: 28 });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 14 });
      gsap.set(socialLinks, { autoAlpha: 0, y: 10, scale: 0.96 });

      const DUR = {
        greet: 0.25,
        rows: 0.25,
        sub: 0.25,
        foot: 0.25,
        soc: 0.25,
      };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.add("intro")
        .to(
          greetRef.current,
          { autoAlpha: 1, y: 0, duration: DUR.greet },
          "intro"
        )

        .add("rows", ">0.10")
        .to(
          frontendBits,
          { autoAlpha: 1, y: 0, duration: DUR.rows, stagger: 0.03 },
          "rows"
        )
        .to(
          designerBits,
          { autoAlpha: 1, y: 0, duration: DUR.rows, stagger: 0.03 },
          "rows+=0.20"
        )

        .add("subtitle", ">0.05")
        .to(
          subtitleRef.current,
          { autoAlpha: 1, y: 0, duration: DUR.sub },
          "subtitle"
        )

        .add("socials", ">0.10")
        .to(
          socialLinks,
          { autoAlpha: 1, y: 0, scale: 1, duration: DUR.soc, stagger: 0.02 },
          "socials"
        );
    }, section);

    return () => ctx.revert();
  }, []);


  return (
    <Fragment>
      <Cursor active={cursorActive} />
      <section
        ref={sectionRef}
        id="hero"
        className="relative px-4 h-[100dvh] w-full
          flex flex-col justify-center items-center
          touch-pan-y select-none
          overflow-x-clip
        "
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <AuroraGlow
            blobSize={700}
            speed={1.2}
            opacity={0.55}
            colors={["#a8c8ff", "#d4b8ff"]}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center w-full gap-2">
          <p ref={greetRef} className="text-lg md:text-2xl font-medium">
            👋, My name is Jesús Hernández
          </p>

          <StyledTitle
            ref={titleRef}
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => {
              setCursorActive(false);
              setHovered("frontend");
            }}
          >
            <FrontendRow
              ref={frontendRowRef}
              $filled={isFrontendFilled}
              $ready={ready}
              onMouseEnter={() => setHovered("frontend")}
              aria-label="Frontend Developer"
            >
              <span className="angle left">&lt;</span>
              <span className="word strong">FrontEnd</span>
              <span className="word light">Developer</span>
              <span className="angle right">/&gt;</span>
            </FrontendRow>

            <DesignerRow
              ref={designerRowRef}
              $filled={isDesignerFilled}
              $ready={ready}
              onMouseEnter={() => setHovered("designer")}
              aria-label="Product Designer"
            >
              <span className="amp">&amp;</span>
              <span className="word light">Product</span>
              <span className="word strong relative">
                Designer
                <span className="rectangle-base">
                  <span className="rectangle"></span>
                </span>
              </span>
            </DesignerRow>
          </StyledTitle>

          <div
            ref={subtitleRef}
            className="text-lg flex justify-center md:text-2xl font-medium mt-3 md:mt-4"
          >
            <p>Based in Argentina</p>
          </div>

          <div ref={footerSocialRef} className="flex flex-row gap-1 mt-4">
            <Link
              href="https://www.linkedin.com/in/jesushernandez91/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-[var(--muted)] hover:text-[var(--black)]"
            >
              <IconBrandLinkedin size={20} />
            </Link>
            <Link
              href="https://github.com/jesus0091"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-[var(--muted)] hover:text-[var(--black)]"
            >
              <IconBrandGithub size={20} />
            </Link>
            <Link
              href="https://www.behance.net/devjesushernandez"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-[var(--muted)] hover:text-[var(--black)]"
            >
              <IconBrandBehance size={20} />
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

/* ---------------- styles ---------------- */

const EASE_SOFT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_SPRING = "cubic-bezier(0.16, 1, 0.3, 1)";

const StyledTitle = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  font-size: clamp(34px, 8vw, 120px);
  line-height: 1;
  white-space: nowrap;
  letter-spacing: -0.02em;
  user-select: none;
  cursor: none;
`;

const Row = styled.span<{ $filled: boolean; $ready: boolean }>`
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;

  .word {
    will-change: color, -webkit-text-stroke-width;
    transition: ${({ $ready }) =>
      $ready
        ? `color .4s ${EASE_SOFT}, -webkit-text-stroke-width .4s ${EASE_SOFT}`
        : "none"};
    color: ${({ $filled }) => ($filled ? "var(--black)" : "transparent")};
    -webkit-text-stroke: ${({ $filled }) => ($filled ? "0px" : "1.2px")}
      var(--black);
  }
  .strong {
    font-weight: 900;
  }
  .light {
    font-weight: 300;
  }
`;

const FrontendRow = styled(Row)`
  .angle {
    font-weight: 300;
    will-change: color, -webkit-text-stroke-width, transform;
    transition: ${({ $ready }) =>
      $ready
        ? `color .4s ${EASE_SOFT}, -webkit-text-stroke-width .4s ${EASE_SOFT}, transform .45s ${EASE_SPRING}`
        : "none"};
    color: ${({ $filled }) => ($filled ? "#3B82F6" : "transparent")};
    -webkit-text-stroke: ${({ $filled }) => ($filled ? "0px" : "1.2px")} #3b82f6;
  }
  &:hover .left {
    transform: translateX(-8px) rotate(-1deg);
  }
  &:hover .right {
    transform: translateX(8px) rotate(1deg);
  }
  .word + .word {
    transition-delay: ${({ $ready }) => ($ready ? ".04s" : "0s")};
  }
`;

const DesignerRow = styled(Row)`
  .amp {
    will-change: color, -webkit-text-stroke-width;
    transition: ${({ $ready }) =>
      $ready
        ? `color .4s ${EASE_SOFT}, -webkit-text-stroke-width .4s ${EASE_SOFT}`
        : "none"};
    color: ${({ $filled }) => ($filled ? "#F55A3D" : "transparent")};
    -webkit-text-stroke: ${({ $filled }) => ($filled ? "0px" : "1.2px")} #f55a3d;
    font-weight: 300;
  }

  .rectangle-base {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .rectangle {
    position: absolute;
    width: 104%;
    height: 112%;
    border: 1.5px solid #f55a3d;
    background: #f55a3d12;
    --rect-o: ${({ $filled }) => ($filled ? 1 : 0)};
    opacity: var(--rect-o);
    will-change: transform, opacity;
    transform: translateZ(0) scale(0.985);
    transition: transform 420ms ${EASE_SPRING}, opacity 320ms ${EASE_SOFT},
      box-shadow 320ms ${EASE_SOFT};
    z-index: -1;
    box-shadow: inset 0 0 0 1px #f55a3d12;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: var(--rect-o);
      transition: opacity 320ms ${EASE_SOFT};
      background: linear-gradient(#f55a3d, #f55a3d) top left,
        linear-gradient(#f55a3d, #f55a3d) top right,
        linear-gradient(#f55a3d, #f55a3d) bottom left,
        linear-gradient(#f55a3d, #f55a3d) bottom right;
      background-repeat: no-repeat;
      background-size: 5px 5px;
    }
  }

  &:hover .rectangle {
    opacity: 1;
    transform: translateZ(0) scale(1) rotate(-2deg);
    box-shadow: inset 0 0 0 1px #f55a3d12, 0 10px 24px #f55a3d12;
  }
  &:hover .rectangle::after {
    opacity: 1;
  }
`;
