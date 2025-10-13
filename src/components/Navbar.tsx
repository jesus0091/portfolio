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
  { href: "/about", label: "ABOUT ME" },
  { href: "/projects", label: "PROJECTS" },
];

const absTop = (el: Element) =>
  (el as HTMLElement).getBoundingClientRect().top + window.scrollY;

export default function Navbar() {
  const pathname = usePathname(); // <-- SOLO ESTA

  const headerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const boundariesRef = useRef<Boundary[]>([]);

  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [navH, setNavH] = useState(80);

  /* -------- Scroll lock con compensación de scrollbar -------- */
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

  /* -------- Tema por sentinels + medir nav -------- */
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
      setElevated(window.scrollY > 8);
      decideTheme();
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
          elevated && !onDark
            ? "supports-[backdrop-filter]:backdrop-blur-md"
            : "",
          onDark ? "bg-black text-white" : "bg-transparent text-black",
        ].join(" ")}
      >
        <nav className="grid grid-cols-2 md:grid-cols-3 h-[80px] px-2 md:px-6 mx-auto">
          {/* Brand */}
          <div className="flex items-center justify-start">
            <Link href="/" className="text-base font-bold tracking-tight">
              <Image
                src={
                  onDark ? "/images/brand-dark.png" : "/images/brand-light.png"
                }
                alt="Logo"
                className="h-[54px] max-w-max md:h-auto object-contain"
                width={108}
                height={54}
                priority
              />
            </Link>
          </div>

          {/* Links desktop */}
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

          {/* CTA desktop */}
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

          {/* Hamburguesa mobile (right-justified → X perfecta) */}
          <div className="flex md:hidden justify-end items-center">
            <button
              className={[
                "relative h-10 w-10 grid place-items-center rounded outline-none",
                "transition-colors duration-200",
                open && onDark
                  ? "text-white hover:bg-white/10"
                  : "text-zinc-700 hover:bg-zinc-100",
              ].join(" ")}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
            >
              {/* Línea superior */}
              <span
                className={[
                  "pointer-events-none absolute right-2 block h-[2.5px] w-7 rounded-full bg-current",
                  "origin-center transform-gpu will-change-transform",
                  "transition-[transform,width,background-color,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "top-1/2 rotate-45" : "top-[calc(50%-6px)] rotate-0",
                ].join(" ")}
              />
              {/* Línea inferior (más corta en closed) */}
              <span
                className={[
                  "pointer-events-none absolute right-2 block h-[2.5px] rounded-full bg-current",
                  "origin-center transform-gpu will-change-transform",
                  "transition-[transform,width,background-color,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open
                    ? "top-1/2 w-7 -rotate-45"
                    : "top-[calc(50%+6px)] w-5 rotate-0",
                ].join(" ")}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop animado (siempre montado) */}
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
