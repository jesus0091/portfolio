// components/Footer.tsx
"use client";

import {
  IconBrandBehance,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import AuroraGlow from "./AuroraGlow";
import Image from "next/image";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useIsMobile } from "@/app/utils/useIsMobile";

type FooterLink = { label: string; href: string };
type SocialLink = { label: string; href: string; icon: React.ReactNode };

type FooterProps = {
  className?: string;
  quickLinks?: FooterLink[];
  social?: SocialLink[];
  email?: string;
};

export default function Footer({
  className = "",
  email = "hello @jesus",
  quickLinks = [
    { label: "About Me", href: "/#about" },
    { label: "Projects", href: "/#projects" },
  ],
  social = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jesushernandez91/",
      icon: <IconBrandLinkedin />,
    },
    {
      label: "Behance",
      href: "https://www.behance.net/devjesushernandez#",
      icon: <IconBrandBehance />,
    },
    {
      label: "GitHub",
      href: "https://github.com/jesus0091",
      icon: <IconBrandGithub />,
    },
  ],
}: FooterProps) {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const footerRef = useRef<HTMLElement | null>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => setYear(new Date().getFullYear()), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const footer = footerRef.current!;
      const label = footer.querySelector<HTMLElement>("[data-cta-label]");
      const title = footer.querySelector<HTMLElement>("[data-cta-title]");
      const ctas = footer.querySelectorAll<HTMLElement>("[data-cta]");
      const cols = footer.querySelectorAll<HTMLElement>("[data-footer-col]");
      const glow = footer.querySelector<HTMLElement>("[data-aurora]");

      // Estado inicial
      gsap.set([label, title, ...ctas, ...cols], {
        opacity: 0,
        y: 18,
        willChange: "opacity, transform",
      });
      if (glow)
        gsap.set(glow, {
          opacity: 0.0,
          scale: 0.98,
          willChange: "opacity, transform",
        });

      // Timeline principal (reversible)
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: footer,
          start: "top 78%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse", // 🔁 ambos sentidos
        },
      });

      if (glow)
        tl.to(
          glow,
          { opacity: 1, duration: 0.8, scale: 1, ease: "power2.out" },
          0
        );
      if (label) tl.to(label, { opacity: 1, y: 0, duration: 0.5 }, 0.05);

      if (title) {
        tl.to(title, { opacity: 1, y: 0, duration: 0.7 }, 0.2);
        tl.fromTo(
          title,
          { filter: "brightness(1.05)" },
          { filter: "brightness(1)", duration: 0.6, ease: "power1.out" },
          "-=0.4"
        );
      }

      if (ctas.length) {
        tl.to(
          ctas,
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          0.4
        ).fromTo(
          ctas,
          { scale: 0.96 },
          { scale: 1, duration: 0.35, stagger: 0.06 },
          "-=0.4"
        );
      }

      if (cols.length) {
        tl.to(cols, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.55);
      }

      const burst = () => {
        ctas.forEach((btn, i) => {
          let halo = btn.querySelector<HTMLElement>("span[data-halo]");
          if (!halo) {
            halo = document.createElement("span");
            halo.setAttribute("data-halo", "");
            halo.className =
              "pointer-events-none absolute inset-0 rounded-xl opacity-0";
            (btn as HTMLElement).style.position = "relative";
            btn.appendChild(halo);
          }
          gsap.fromTo(
            halo,
            { opacity: 0, clipPath: "inset(50% 50% 50% 50% round 12px)" },
            {
              opacity: 0.25,
              clipPath: "inset(0% 0% 0% 0% round 12px)",
              background:
                "radial-gradient(120% 120% at 50% 50%, rgba(232, 232, 232, 0.18), rgba(255,255,255,0) 55%)",
              duration: 0.6,
              ease: "power2.out",
              delay: 0.15 + i * 0.05,
              onComplete: () => {
                gsap.to(halo as HTMLElement, { opacity: 0, duration: 0.6 });
              },
            }
          );
        });
      };

      ScrollTrigger.create({
        trigger: footer,
        start: "top 78%",
        end: "bottom 40%",
        onEnter: () => {
          burst();
        },
        onEnterBack: () => {
          burst();
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);
  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const magnetRadius = 120;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < magnetRadius) {
        const strength = (magnetRadius - dist) / magnetRadius;
        gsap.to(btn, {
          x: distX * strength * 0.4,
          y: distY * strength * 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isMobile = useIsMobile(768);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className={`relative overflow-hidden flex flex-col bg-[var(--background)] ${className}`}
    >
      {/* CTA como card */}
      <div className="max-w-[1280px] mx-auto w-full px-6 md:px-8 pt-16 pb-8">
        <div className="relative overflow-hidden rounded-3xl z-10" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 40%, #1e293b 60%, #f97316 100%)" }}>
          {/* Noise overlay */}
          <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none opacity-[0.12]" aria-hidden="true">
            <filter id="cta-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#cta-noise)" />
          </svg>
          {/* Glow accent */}
          <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full z-[2] pointer-events-none" style={{ background: "radial-gradient(circle, #f9731640 0%, transparent 70%)" }} />
          <div className="absolute -bottom-1/3 -left-1/4 w-[500px] h-[500px] rounded-full z-[2] pointer-events-none" style={{ background: "radial-gradient(circle, #2563eb30 0%, transparent 70%)" }} />
          <div className="relative z-10 py-20 flex flex-col items-center gap-4 text-center">
            <p
              data-cta-label
              className="text-sm tracking-widest text-orange-400 font-semibold"
            >
              From Concept to Code
            </p>
            <h3
              data-cta-title
              className="text-3xl sm:text-4xl md:text-7xl font-semibold tracking-tight text-white"
            >
              Let&apos;s build something <br /> great together
            </h3>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                ref={ctaBtnRef}
                href={`mailto:${email}`}
                data-cta
                className="relative inline-flex items-center rounded-full gap-2 border border-white/20 px-6 py-3 text-base cursor-pointer font-medium text-white hover:bg-white/10 transition active:scale-[0.96]"
                aria-label="Send me an email"
              >
                <IconMail size={18} />
                {email}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="pb-10 z-10">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 py-8 max-w-[1280px] mx-auto px-6 md:px-8">
          <div
            data-footer-col
            className="w-full md:col-span-5 flex flex-col items-center md:items-start"
          >
            <Link
              href="/"
              className="flex flex-col items-center w-full md:items-start gap-2 font-bold text-xl text-[var(--black)]"
              aria-label="Go to home"
            >
              <Image
                src={"/images/facebrand.png"}
                className="border border-black/10 rounded-lg bg-black/5 object-contain"
                width={50}
                height={50}
                alt="Logo"
              />
              <span>Jesús Hernández</span>
            </Link>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-xs text-center md:text-left">
              Frontend Developer & UX/UI Designer. <br />I build cohesive,
              scalable and delightful digital products.
            </p>
          </div>
          <div className="md:hidden block w-full border-t border-black/10 md:col-span-1 mx-auto" />
          <div
            data-footer-col
            className="flex flex-col md:flex-row gap-8 col-span-7"
          >
            <nav className="space-y-3 flex-1 flex flex-col items-center md:items-start">
              <h4 className="text-base font-semibold tracking-wide text-gray-700">
                Quick Links
              </h4>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-base text-center text-gray-700 hover:text-[var(--black)] transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              data-footer-col
              className="space-y-3 flex-1 flex flex-col items-center md:items-start"
            >
              <h4 className="text-base font-semibold tracking-wide text-gray-700">
                Connect
              </h4>
              <ul className="flex flex-wrap justify-center md:justify-start gap-3">
                {social.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-sm text-[var(--black)] hover:bg-black/5 transition"
                    >
                      <span className="[&>svg]:h-5 [&>svg]:w-5">{s.icon}</span>
                      <span>{s.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          data-footer-col
          className="flex flex-col-reverse pb-6 md:pb-4 max-w-[1280px] mx-auto px-6 md:px-8 sm:flex-row items-center justify-between gap-3 border-t border-black/10 pt-4"
        >
          <p className="text-sm md:text-base text-center text-gray-700">
            © {year} Jesús Hernández. All rights reserved.
          </p>
          <p className="md:whitespace-nowrap text-sm md:text-base text-center text-gray-700">
            Built with: <br className="inline md:hidden" /> ReactJS · Next.JS ·
            TypeScript · TailwindCSS
          </p>
        </div>
      </div>
      <div className="dark-bottom-sentinel h-10 w-full absolute bottom-0" />
    </footer>
  );
}
