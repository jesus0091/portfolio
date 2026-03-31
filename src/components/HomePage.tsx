"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  IconBrandBehance,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import AuroraGlow from "./AuroraGlow";
import Link from "next/link";
import gsap from "gsap";
import styled from "styled-components";

/** Divide un string en spans inline-block, cada uno envuelto en overflow:hidden */
function splitToChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";

  const chars: HTMLElement[] = [];
  for (const char of text) {
    const wrapper = document.createElement("span");
    wrapper.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;padding:0.15em 0.05em;margin:-0.15em -0.05em;";

    const inner = document.createElement("span");
    inner.style.cssText = "display:inline-block;";
    inner.textContent = char === " " ? "\u00A0" : char;

    wrapper.appendChild(inner);
    el.appendChild(wrapper);
    chars.push(inner);
  }
  return chars;
}

export default function HomePage() {
  const [hovered, setHovered] = useState<"frontend" | "designer">("frontend");
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
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const footerSocialRef = useRef<HTMLDivElement | null>(null);

  // Refs para los spans de texto que serán split
  const frontendStrongRef = useRef<HTMLSpanElement | null>(null);
  const frontendLightRef = useRef<HTMLSpanElement | null>(null);
  const designerLightRef = useRef<HTMLSpanElement | null>(null);
  const designerStrongRef = useRef<HTMLSpanElement | null>(null);

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
      const angleEls = Array.from(
        frontendRowRef.current?.querySelectorAll<Element>(".angle") ?? []
      );
      const ampEls = Array.from(
        designerRowRef.current?.querySelectorAll<Element>(".amp") ?? []
      );
      gsap.set([...angleEls, ...ampEls], { autoAlpha: 1, y: 0, clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      // Split los spans de palabra en chars
      const line1Chars: HTMLElement[] = [];
      const line2Chars: HTMLElement[] = [];

      if (frontendStrongRef.current)
        line1Chars.push(...splitToChars(frontendStrongRef.current));
      if (frontendLightRef.current)
        line1Chars.push(...splitToChars(frontendLightRef.current));

      if (designerLightRef.current)
        line2Chars.push(...splitToChars(designerLightRef.current));
      if (designerStrongRef.current)
        line2Chars.push(...splitToChars(designerStrongRef.current));

      // Elementos decorativos (angle brackets, amp)
      const angleEls = Array.from(
        frontendRowRef.current?.querySelectorAll<HTMLElement>(".angle") ?? []
      );
      const ampEl = designerRowRef.current?.querySelector<HTMLElement>(".amp") ?? null;
      const socialLinks = Array.from(
        footerSocialRef.current?.querySelectorAll<HTMLElement>("a") ?? []
      );

      // Estado inicial
      gsap.set(greetRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(titleRef.current, { autoAlpha: 1 });
      gsap.set(line1Chars, { yPercent: 110 });
      gsap.set(line2Chars, { yPercent: 110 });
      gsap.set(angleEls, { autoAlpha: 0, y: 20 });
      gsap.set(ampEl, { autoAlpha: 0, y: 20 });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(socialLinks, { autoAlpha: 0, y: 10, scale: 0.96 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Saludo
      tl.to(greetRef.current, { autoAlpha: 1, y: 0, duration: 0.4 })

        // Ángulos < />
        .to(angleEls, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 }, ">-0.1")

        // Línea 1: chars con clip-path reveal desde abajo
        .to(
          line1Chars,
          { yPercent: 0, duration: 0.7, stagger: 0.02, ease: "power3.out" },
          "<0.1"
        )

        // Línea 2: empieza cuando línea 1 está ~50% avanzada
        .to(
          ampEl,
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
          "<" + (line1Chars.length * 0.02 * 0.5).toFixed(3)
        )
        .to(
          line2Chars,
          { yPercent: 0, duration: 0.7, stagger: 0.02, ease: "power3.out" },
          "<0.05"
        )

        // Subtítulo
        .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, ">-0.1")

        // Social links
        .to(
          socialLinks,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" },
          ">0.05"
        );
    }, section);

    return () => ctx.revert();
  }, []);


  return (
    <Fragment>
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
            onMouseLeave={() => setHovered("frontend")}
          >
            <FrontendRow
              ref={frontendRowRef}
              $filled={isFrontendFilled}
              $ready={ready}
              onMouseEnter={() => setHovered("frontend")}
              aria-label="Frontend Developer"
            >
              <span className="angle left">&lt;</span>
              <span ref={frontendStrongRef} className="word strong">FrontEnd</span>
              <span ref={frontendLightRef} className="word light">Developer</span>
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
              <span ref={designerLightRef} className="word light">Product</span>
              <span ref={designerStrongRef} className="word strong relative">
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
