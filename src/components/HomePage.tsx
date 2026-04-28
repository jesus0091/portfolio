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

function splitToChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";

  const chars: HTMLElement[] = [];
  for (const char of text) {
    const wrapper = document.createElement("span");
    wrapper.style.cssText =
      "display:inline-block;overflow:hidden;vertical-align:bottom;padding:0.15em 0.05em;margin:-0.15em -0.05em;";

    const inner = document.createElement("span");
    inner.style.cssText = "display:inline-block;";
    inner.textContent = char === " " ? " " : char;

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
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const frontendRowRef = useRef<HTMLSpanElement | null>(null);
  const designerRowRef = useRef<HTMLSpanElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const footerSocialRef = useRef<HTMLDivElement | null>(null);

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

      const angleEls = Array.from(
        frontendRowRef.current?.querySelectorAll<HTMLElement>(".angle") ?? []
      );
      const ampEl = designerRowRef.current?.querySelector<HTMLElement>(".amp") ?? null;
      const socialLinks = Array.from(
        footerSocialRef.current?.querySelectorAll<HTMLElement>("a") ?? []
      );

      gsap.set(greetRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(titleRef.current, { autoAlpha: 1 });
      gsap.set(line1Chars, { yPercent: 110 });
      gsap.set(line2Chars, { yPercent: 110 });
      gsap.set(angleEls, { autoAlpha: 0, y: 20 });
      gsap.set(ampEl, { autoAlpha: 0, y: 20 });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(socialLinks, { autoAlpha: 0, y: 10, scale: 0.96 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(greetRef.current, { autoAlpha: 1, y: 0, duration: 0.4 })
        .to(angleEls, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 }, ">-0.1")
        .to(
          line1Chars,
          { yPercent: 0, duration: 0.7, stagger: 0.02, ease: "power3.out" },
          "<0.1"
        )
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
        .to(
          subtitleRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
          ">-0.1"
        )
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
      <style>{`
        .hero-row {
          display: inline-flex;
          align-items: baseline;
          gap: 0.25rem;
        }
        .hero-row .word {
          will-change: color, -webkit-text-stroke-width;
          color: transparent;
          -webkit-text-stroke: 1.2px var(--color-ink-1);
        }
        .hero-row[data-filled="true"] .word {
          color: var(--color-ink-1);
          -webkit-text-stroke: 0px var(--color-ink-1);
        }
        .hero-row[data-ready="true"] .word {
          transition: color .4s var(--ease-out), -webkit-text-stroke-width .4s var(--ease-out);
        }
        .hero-row[data-ready="true"] .word + .word {
          transition-delay: .04s;
        }
        .hero-row .strong { font-weight: 900; }
        .hero-row .light { font-weight: 300; }

        .hero-row .angle {
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1.2px var(--color-accent);
          will-change: color, -webkit-text-stroke-width, transform;
        }
        .hero-row[data-filled="true"] .angle {
          color: var(--color-accent);
          -webkit-text-stroke: 0px var(--color-accent);
        }
        .hero-row[data-ready="true"] .angle {
          transition: color .4s var(--ease-out),
            -webkit-text-stroke-width .4s var(--ease-out),
            transform .45s var(--ease-spring);
        }
        .hero-row:hover .angle.left { transform: translateX(-8px) rotate(-1deg); }
        .hero-row:hover .angle.right { transform: translateX(8px) rotate(1deg); }

        .hero-row .amp {
          font-weight: 300;
          color: transparent;
          -webkit-text-stroke: 1.2px var(--color-accent);
          will-change: color, -webkit-text-stroke-width;
        }
        .hero-row[data-filled="true"] .amp {
          color: var(--color-accent);
          -webkit-text-stroke: 0px var(--color-accent);
        }
        .hero-row[data-ready="true"] .amp {
          transition: color .4s var(--ease-out), -webkit-text-stroke-width .4s var(--ease-out);
        }

        .hero-rectangle-base {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .hero-rectangle {
          position: absolute;
          width: 104%;
          height: 112%;
          border: 1.5px solid var(--color-accent);
          background: rgba(255, 102, 0, 0.07);
          opacity: 0;
          will-change: transform, opacity;
          transform: translateZ(0) scale(0.985);
          transition: transform 420ms var(--ease-spring), opacity 320ms var(--ease-out);
          z-index: -1;
        }
        .hero-row[data-filled="true"] .hero-rectangle { opacity: 1; }
        .hero-row[data-filled="true"]:hover .hero-rectangle {
          transform: translateZ(0) scale(1) rotate(-2deg);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="hero"
        className="relative px-4 h-[85dvh] md:h-[100dvh] w-full
          flex flex-col justify-center items-center
          pt-16 md:pt-0
          touch-pan-y select-none
          overflow-x-clip
        "
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <AuroraGlow
            blobSize={700}
            speed={1.2}
            opacity={0.55}
            colors={["#fb923c", "#ff8a3c", "#fdba74"]}
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center w-full gap-2">
          <p ref={greetRef} className="text-base md:text-lg font-medium">
            👋, My name is Jesús Hernández
          </p>

          {/* Mobile marquee */}
          <div className="md:hidden w-screen overflow-hidden -mx-4 flex flex-col gap-2">
            <div className="hero-marquee-left flex whitespace-nowrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="shrink-0 flex items-baseline gap-3 pr-3"
                  style={{
                    fontSize: "clamp(44px, 14vw, 68px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                  aria-hidden={i > 0}
                >
                  <span className="font-black hero-gradient-text">FrontEnd</span>
                  <span className="font-light text-(--color-ink-1)">Developer</span>
                  <span className="text-black/15 font-light select-none">·</span>
                </span>
              ))}
            </div>
            <div className="hero-marquee-right flex whitespace-nowrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="shrink-0 flex items-baseline gap-3 pr-3"
                  style={{
                    fontSize: "clamp(44px, 14vw, 68px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                  aria-hidden={i > 0}
                >
                  <span className="font-light text-(--color-ink-1)">Product</span>
                  <span className="font-black hero-gradient-text">Designer</span>
                  <span className="text-black/15 font-light select-none">·</span>
                </span>
              ))}
            </div>
            <style>{`
              @keyframes hero-scroll-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-100% / 3)); }
              }
              @keyframes hero-scroll-right {
                0% { transform: translateX(calc(-100% / 3)); }
                100% { transform: translateX(0); }
              }
              .hero-marquee-left { animation: hero-scroll-left 20s linear infinite; }
              .hero-marquee-right { animation: hero-scroll-right 20s linear infinite; }
              .hero-gradient-text {
                background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-ink-1) 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              @media (prefers-reduced-motion: reduce) {
                .hero-marquee-left, .hero-marquee-right { animation: none; }
              }
            `}</style>
          </div>

          {/* Desktop interactive title */}
          <div className="hidden md:block">
            <h1
              ref={titleRef}
              onMouseLeave={() => setHovered("frontend")}
              className="flex flex-col items-center gap-0 leading-none whitespace-nowrap select-none"
              style={{
                fontSize: "clamp(28px, 8vw, 120px)",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                ref={frontendRowRef}
                className="hero-row"
                data-filled={isFrontendFilled}
                data-ready={ready}
                onMouseEnter={() => setHovered("frontend")}
                aria-label="Frontend Developer"
              >
                <span className="angle left">&lt;</span>
                <span ref={frontendStrongRef} className="word strong">
                  FrontEnd
                </span>
                <span ref={frontendLightRef} className="word light">
                  Developer
                </span>
                <span className="angle right">/&gt;</span>
              </span>

              <span
                ref={designerRowRef}
                className="hero-row"
                data-filled={isDesignerFilled}
                data-ready={ready}
                onMouseEnter={() => setHovered("designer")}
                aria-label="Product Designer"
              >
                <span className="amp">&amp;</span>
                <span ref={designerLightRef} className="word light">
                  Product
                </span>
                <span ref={designerStrongRef} className="word strong relative">
                  Designer
                  <span className="hero-rectangle-base">
                    <span className="hero-rectangle"></span>
                  </span>
                </span>
              </span>
            </h1>
          </div>

          <div
            ref={subtitleRef}
            className="text-base flex justify-center md:text-lg font-medium mt-3 md:mt-4 text-[var(--muted)]"
          >
            <p>Based in Argentina</p>
          </div>

          <div ref={footerSocialRef} className="flex flex-row gap-1 mt-4">
            <Link
              href="https://www.linkedin.com/in/jesushernandez91/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-(--color-ink-3) hover:text-(--color-ink-1)"
            >
              <IconBrandLinkedin size={20} />
            </Link>
            <Link
              href="https://github.com/jesus0091"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-(--color-ink-3) hover:text-(--color-ink-1)"
            >
              <IconBrandGithub size={20} />
            </Link>
            <Link
              href="https://www.behance.net/devjesushernandez"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance profile"
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-(--color-ink-3) hover:text-(--color-ink-1)"
            >
              <IconBrandBehance size={20} />
            </Link>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
