"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IconArrowUpRight, IconMail } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Boundary = { y: number; dark: boolean };

const links = [
  { href: "/about", label: "About Me" },
  { href: "/projects", label: "Projects" },
];

const absTop = (el: Element) =>
  (el as HTMLElement).getBoundingClientRect().top + window.scrollY;

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const boundariesRef = useRef<Boundary[]>([]);
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [navH, setNavH] = useState(80);
  const [compact, setCompact] = useState(false);
  const lastScrollYRef = useRef(0);
  const COMPACT_DELTA = 5; // umbral anti-ruido
  const scrollYRef = useRef(0);
  const prevBodyPaddingRightRef = useRef<string>("");
  const prevHeaderPaddingRightRef = useRef<string>("");
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
    prevHeaderPaddingRightRef.current = headerRef.current
      ? headerRef.current.style.paddingRight
      : "";

    if (sbw > 0) {
      body.style.paddingRight = `${sbw}px`;
      if (headerRef.current) headerRef.current.style.paddingRight = `${sbw}px`;
    }

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    (document.documentElement as HTMLElement).style.overscrollBehavior = "none";
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
    (document.documentElement as HTMLElement).style.overscrollBehavior = "";

    body.style.paddingRight = prevBodyPaddingRightRef.current || "";
    if (headerRef.current)
      headerRef.current.style.paddingRight =
        prevHeaderPaddingRightRef.current || "";

    window.scrollTo(0, scrollYRef.current || 0);
  }, []);

  useEffect(() => {
    open ? lockScroll() : unlockScroll();
    return () => unlockScroll();
  }, [open, lockScroll, unlockScroll]);

  const measureNav = useCallback(() => {
    const h = headerRef.current?.getBoundingClientRect().height ?? 80;
    setNavH(Math.max(1, Math.round(h)));
  }, []);

  const buildBoundaries = useCallback(() => {
    const lightTop = Array.from(
      document.querySelectorAll(".light-top-sentinel")
    );
    const darkTop = Array.from(document.querySelectorAll(".dark-top-sentinel"));
    const b: Boundary[] = [];
    lightTop.forEach((el) => b.push({ y: absTop(el), dark: false }));
    darkTop.forEach((el) => b.push({ y: absTop(el), dark: true }));
    b.sort((a, z) => a.y - z.y);
    boundariesRef.current = b;
  }, []);

  const decideTheme = useCallback(() => {
    const refLine = window.scrollY + navH;
    const b = boundariesRef.current;
    let dark = false;
    for (let i = 0; i < b.length; i++) {
      if (b[i].y <= refLine) dark = b[i].dark;
      else break;
    }
    setOnDark(dark);
  }, [navH]);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      setElevated(y > 8);
      decideTheme();

      // --- Dirección de scroll para compactar/expandir
      const last = lastScrollYRef.current;
      if (y > last + COMPACT_DELTA) {
        // Scrollea hacia abajo → compacta
        setCompact(true);
      } else if (y < last - COMPACT_DELTA) {
        // Scrollea hacia arriba → vuelve a tamaño original
        setCompact(false);
      }
      // Cerca del top, siempre full
      if (y < 4) setCompact(false);

      lastScrollYRef.current = y;
    });
  }, [decideTheme]);

  useLayoutEffect(() => {
    measureNav();
    buildBoundaries();
    decideTheme();
  }, [measureNav, buildBoundaries, decideTheme]);

  useEffect(() => {
    const handleResize = () => {
      measureNav();
      buildBoundaries();
      decideTheme();
    };

    handleResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const mo = new MutationObserver(() => {
      buildBoundaries();
      decideTheme();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      mo.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [onScroll, measureNav, buildBoundaries, decideTheme]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <Fragment>
      <header
        ref={headerRef}
        className={[
          "fixed top-0 z-50 w-full transition-colors duration-300",
          onDark ? " text-white" : "bg-transparent text-black",
        ].join(" ")}
      >
        <nav
          className={[
            "grid grid-cols-2 md:grid-cols-3 transition-all px-2 md:px-6 mx-auto",
            elevated ? "h-[60px]" : "h-[80px]",
          ].join(" ")}
        >
          <div className="flex items-center justify-start">
            <Link href="/" className="text-base font-bold tracking-tight">
              <Image
                src={
                  onDark ? "/images/brand-dark.png" : "/images/brand-light.png"
                }
                alt="Logo"
                className="h-[60px] max-w-max md:h-auto object-contain"
                width={108}
                height={54}
                priority
              />
            </Link>
          </div>

          <ul className="hidden items-center gap-6 md:flex justify-center">
            {links.map(({ href, label }) => {
              const selected = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={selected ? "page" : undefined}
                    className={`px-2 text-lg flex flex-row gap-2 items-center transition-all relative ${
                      selected
                        ? onDark
                          ? "text-orange-500 hover:text-orange-300 font-semibold"
                          : "font-semibold text-orange-500 hover:text-orange-700"
                        : onDark
                        ? "text-gray-500 hover:text-white"
                        : "text-zinc-700 hover:text-black"
                    }`}
                  >
                    {selected ? (
                      <div className="h-4 w-4 bg-current rounded-full" />
                    ) : null}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex justify-end items-center gap-6 font-medium">
            <Link
              href="/#contact"
              className={`px-4 py-2 text-lg transition flex gap-2 items-center ${
                onDark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              <IconMail />
              hello @jesus
            </Link>
          </div>

          {/* --- BOTÓN MOBILE: liquid glass + tamaño dinámico por dirección de scroll --- */}
          <div className="flex md:hidden justify-end items-center">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
              className={[
                "relative flex md:hidden items-center h-auto border-[0.5px] rounded-full max-w-max cursor-pointer",
                "transition-all duration-200 ease-out active:scale-[0.98]",
                // padding varía según compact
                compact ? "pl-1.5 pr-3" : "pl-2 pr-4",
                // liquid glass solo en elevated
                elevated
                  ? [
                      "bg-white/20 supports-[backdrop-filter]:backdrop-blur-md",
                      "shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-6px_20px_rgba(0,0,0,0.10)]",
                      onDark ? "border-white/5" : "border-black/5",
                    ].join(" ")
                  : "border-transparent",
              ].join(" ")}
            >
              {/* Icono hamburguesa con tamaño dinámico */}
              <div
                className={[
                  "relative rounded outline-none grid place-items-center transition-all duration-200",
                  compact ? "h-8 w-8" : "h-10 w-10",
                  open && onDark
                    ? "text-white hover:bg-white/10"
                    : onDark
                    ? "text-white hover:bg-white/10"
                    : "text-zinc-700 hover:bg-zinc-100",
                ].join(" ")}
              >
                <span
                  className={[
                    "pointer-events-none absolute right-2 block h-[2.5px] rounded-full bg-current",
                    "origin-center transform-gpu will-change-transform",
                    "transition-[transform,width,background-color,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open
                      ? "top-1/2 w-6 rotate-45"
                      : compact
                      ? "top-[calc(50%-4px)] w-5 rotate-0"
                      : "top-[calc(50%-5px)] w-6 rotate-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "pointer-events-none absolute right-2 block h-[2.5px] rounded-full bg-current",
                    "origin-center transform-gpu will-change-transform",
                    "transition-[transform,width,background-color,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open
                      ? "top-1/2 w-6 -rotate-45"
                      : compact
                      ? "top-[calc(50%+4px)] w-4 rotate-0"
                      : "top-[calc(50%+5px)] w-4 rotate-0",
                  ].join(" ")}
                />
              </div>

              {/* Texto con tamaño dinámico y ocultamiento progresivo si compact */}
              <p
                className={[
                  "relative font-medium transition-all duration-200",
                  compact ? "text-sm" : "text-lg",
                ].join(" ")}
              >
                Menu
              </p>
            </button>
          </div>
        </nav>
      </header>

      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-40 md:hidden transition-opacity duration-250",
          open
            ? "opacity-100 pointer-events-auto bg-black/30 backdrop-blur-sm"
            : "opacity-0 pointer-events-none bg-transparent",
        ].join(" ")}
      />
      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={[
            "fixed z-50 left-0 right-0 md:hidden px-3 py-1",
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu",
            open ? "translate-y-0" : "-translate-y-2",
          ].join(" ")}
          style={{ top: `${navH}px` }}
        >
          <ul
            className={`text-xl shadow-2xl flex flex-col rounded-2xl border ${
              onDark
                ? "border-white/20 bg-white/10"
                : "border-black/10 bg-white/90"
            }`}
          >
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex justify-between rounded px-6 py-4 transition border-b w-full ${
                    onDark
                      ? "text-white hover:bg-white/10 border-white/20"
                      : "hover:bg-zinc-100 border-black/10"
                  }`}
                >
                  {label} <IconArrowUpRight />
                </Link>
              </li>
            ))}
            <li className="px-6 py-4">
              <Link
                href="/#contact"
                className={`block px-6 py-4 text-center w-full transition ${
                  onDark ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                hello @jesus
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </Fragment>
  );
}
