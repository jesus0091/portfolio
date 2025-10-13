// components/Footer.tsx
"use client";

import {
  IconArrowUpRight,
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
    { label: "About Me", href: "/about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/contact" },
  ],
  social = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      icon: <IconBrandLinkedin />,
    },
    {
      label: "Behance",
      href: "https://behance.net/",
      icon: <IconBrandBehance />,
    },
    { label: "GitHub", href: "https://github.com/", icon: <IconBrandGithub /> },
  ],
}: FooterProps) {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const footerRef = useRef<HTMLElement | null>(null);

  const scrollTop = () => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

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

      // ScrollTrigger para disparar el burst en ambos sentidos
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

  return (
    <footer
      ref={footerRef}
      className={`relative min-h-[100vh] overflow-hidden flex flex-col border-t bg-black border-black/10 dark:border-white/10 ${className}`}
    >
      <div className="dark-top-sentinel h-10 w-full absolute top-0" />

      <div className="relative min-h-[100dvh] md:min-h-0 flex flex-col justify-center flex-1 z-10">
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-aurora
        >
          <AuroraGlow
            blobSize={600}
            speed={4}
            colors={["#1722c52c", "#aa1f1f2f", "#9f87102b"]}
          />
        </div>
        <div className="py-20 flex flex-col items-center gap-4 text-center">
          <p
            data-cta-label
            className="text-xl tracking-wide uppercase text-orange-500"
          >
            From Concept to Code
          </p>
          <h3
            data-cta-title
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tight text-white"
          >
            Let&apos;s build something <br /> great together
          </h3>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`mailto:${email}`}
              data-cta
              className="relative inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-base cursor-pointer font-medium text-white/95 hover:bg-white/10 transition"
              aria-label="Send me an email"
            >
              <IconMail size={18} />
              {email}
            </Link>

            <button
              data-cta
              onClick={scrollTop}
              className="relative inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-base cursor-pointer font-medium text-white/95 hover:bg-white/10 transition"
              aria-label="Back to top"
            >
              Back to top
              <IconArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="px-4 sm:px-6 pb-10 border-t border-white/10 z-10">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-8 py-8 max-w-6xl mx-auto">
          <div
            data-footer-col
            className="w-full md:col-span-5 flex flex-col items-center md:items-start"
          >
            <Link
              href="/"
              className="flex flex-col items-center w-full md:items-start gap-2 font-bold text-xl text-white"
              aria-label="Go to home"
            >
              <Image
                src={"/images/facebrand.png"}
                className="border border-white/20 rounded-lg bg-white/10 object-contain"
                width={50}
                height={50}
                alt="Logo"
              />
              <span>Jesús Hernández</span>
            </Link>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs text-center md:text-left">
              Frontend Developer & UX/UI Designer. <br />I build cohesive,
              scalable and delightful digital products.
            </p>
          </div>
          <div className="md:hidden block w-full border-t border-white/10 md:col-span-1 mx-auto" />
          <div
            data-footer-col
            className="flex flex-col md:flex-row gap-8 col-span-7"
          >
            <nav className="space-y-3 flex-1 flex flex-col items-center md:items-start">
              <h4 className="text-base font-semibold tracking-wide text-gray-500">
                Quick Links
              </h4>
              <ul className="space-y-2 flex flex-col items-center md:items-start">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-base text-center text-white/70 hover:text-white transition"
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
              <h4 className="text-base font-semibold tracking-wide text-gray-500">
                Connect
              </h4>
              <ul className="flex flex-wrap gap-3">
                {social.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="inline-flex items-center gap-2  border border-white/15 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
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
          className="flex flex-col max-w-6xl mx-auto sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4"
        >
          <p className="text-sm md:text-base text-center text-gray-500">
            © {year} Jesús Hernández. All rights reserved.
          </p>
          <p className="text-sm md:text-base text-center text-gray-500">
            Built with: <br /> ReactJS · Next.JS · TypeScript · TailwindCSS
          </p>
        </div>
      </div>
      <div className="dark-bottom-sentinel h-10 w-full absolute bottom-0" />
    </footer>
  );
}
