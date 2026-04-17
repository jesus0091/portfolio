"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const links = [
  { href: "/works", label: "Projects", sectionId: undefined },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const prevBodyPaddingRightRef = useRef<string>("");

  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const getScrollbarW = () =>
    typeof window === "undefined"
      ? 0
      : window.innerWidth - document.documentElement.clientWidth;

  const lockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    const sbw = getScrollbarW();
    scrollYRef.current = window.scrollY || 0;
    prevBodyPaddingRightRef.current = body.style.paddingRight;
    if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    body.style.overflow = "";
    body.style.paddingRight = prevBodyPaddingRightRef.current || "";
    window.scrollTo(0, scrollYRef.current || 0);
  }, []);

  useEffect(() => {
    if (open) {
      lockScroll();
      const items = overlayRef.current?.querySelectorAll<HTMLElement>(".menu-item");
      if (items?.length) {
        gsap.fromTo(
          Array.from(items),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power3.out", delay: 0.3 }
        );
      }
    } else {
      unlockScroll();
    }
    return () => { unlockScroll(); };
  }, [open, lockScroll, unlockScroll]);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setElevated(window.scrollY > 8);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
    };
  }, [onScroll]);

  useEffect(() => {
    const sectionIds = ["hero", "projects", "about", "contact"];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Fragment>
      {/* ── Desktop header ── */}
      <header
        ref={headerRef}
        className={[
          "w-full hidden md:block fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300 ease-out",
          elevated
            ? "bg-white/80 backdrop-blur-md border-b border-black/[0.08] shadow-sm"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="max-w-[1280px] mx-auto px-8 flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-semibold text-[var(--black)] shrink-0"
            >
              <Image
                src="/images/facebrand.png"
                alt="Logo"
                className="border border-black/10 rounded-lg bg-black/5 object-contain w-10 h-10"
                width={40}
                height={40}
                priority
              />
              <span className="text-lg font-semibold tracking-tight">
                Jesús Hernández
              </span>
            </Link>

            <ul className="flex items-center gap-1">
              {links.map((link) => {
                const selected = activeSection === link.sectionId;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={selected ? "page" : undefined}
                      className={[
                        "px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-200",
                        selected
                          ? "text-[var(--black)] bg-black/[0.08]"
                          : "text-[var(--muted)] hover:text-[var(--black)] hover:bg-black/[0.05]",
                      ].join(" ")}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <Link
            href="mailto:jesushernandez120491@gmail.com"
            className="flex items-center gap-2 rounded-full font-medium transition-all duration-200 bg-[var(--black)] text-white hover:bg-zinc-800 px-5 py-2 text-[15px]"
          >
            <IconMail size={16} />
            hello @jesus
          </Link>
        </nav>
      </header>

      {/* ── Mobile static header (visible at top) ── */}
      <header className="w-full md:hidden flex items-center justify-between px-6 h-[64px] absolute top-0 left-0 right-0 z-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-[var(--black)] shrink-0"
        >
          <Image
            src="/images/facebrand.png"
            alt="Logo"
            className="border border-black/10 rounded-lg bg-black/5 object-contain w-9 h-9"
            width={36}
            height={36}
            priority
          />
          <span className="text-base font-semibold tracking-tight">
            Jesús Hernández
          </span>
        </Link>
      </header>

      {/* ── Mobile hamburger button (fixed, always visible) ── */}
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-fullscreen-menu"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden fixed z-[70] flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300"
        style={{
          top: "calc(env(safe-area-inset-top, 0px) + 12px)",
          right: "calc(env(safe-area-inset-right, 0px) + 16px)",
          background: open ? "rgba(255,255,255,0.15)" : "var(--black)",
          color: "white",
        }}
      >
        <span className="sr-only">{open ? "Cerrar" : "Menú"}</span>
        <div className="relative w-5 h-4 flex items-center justify-center">
          <span
            className="absolute block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: open ? "rotate(45deg) translateY(0)" : "translateY(-6px)" }}
          />
          <span
            className="absolute block h-[2px] bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              width: open ? "0" : "20px",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="absolute block h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: open ? "rotate(-45deg) translateY(0)" : "translateY(6px)" }}
          />
        </div>
      </button>

      {/* ── Mobile full-screen overlay ── */}
      <div
        id="mobile-fullscreen-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="md:hidden fixed inset-0 z-[60] bg-[var(--black)] flex flex-col justify-center px-8 pb-16"
        style={{
          clipPath: open
            ? "circle(150vmax at calc(100% - 36px) 36px)"
            : "circle(0% at calc(100% - 36px) 36px)",
          transition: "clip-path 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <nav>
          <ul className="flex flex-col gap-1 mb-12">
            {links.map((link, i) => (
              <li key={link.href} className="menu-item overflow-hidden">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-3"
                >
                  <span className="text-white/30 text-xs font-mono tabular-nums w-5 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-white text-[clamp(2.5rem,10vw,3.5rem)] font-bold tracking-tight leading-none transition-opacity duration-200 group-hover:opacity-60">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="menu-item border-t border-white/10 pt-8">
            <Link
              href="mailto:jesushernandez120491@gmail.com"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-white/50 text-base font-medium hover:text-white transition-colors duration-200"
            >
              <IconMail size={18} />
              jesushernandez120491@gmail.com
            </Link>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}
