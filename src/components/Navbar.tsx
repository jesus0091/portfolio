"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Boundary = { y: number; dark: boolean };

const links = [
  { href: "/about", label: "ABOUT ME" },
  { href: "/projects", label: "PROJECTS" },
];

// Util: posición absoluta superior del elemento en el documento
const absTop = (el: Element) =>
  (el as HTMLElement).getBoundingClientRect().top + window.scrollY;

export default function Navbar() {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement | null>(null);
  const navHRef = useRef(80);
  const rafRef = useRef<number | null>(null);
  const boundariesRef = useRef<Boundary[]>([]);

  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [onDark, setOnDark] = useState(false);

  const measureNav = useCallback(() => {
    const h = headerRef.current?.getBoundingClientRect().height ?? 80;
    navHRef.current = Math.max(1, Math.round(h));
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
    const refLine = window.scrollY + navHRef.current;
    const b = boundariesRef.current;

    let dark = false; // default light
    for (let i = 0; i < b.length; i++) {
      if (b[i].y <= refLine) dark = b[i].dark;
      else break;
    }
    setOnDark(dark);
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setElevated(window.scrollY > 8);
      decideTheme();
    });
  }, [decideTheme]);

  // Medición y límites iniciales
  useLayoutEffect(() => {
    measureNav();
    buildBoundaries();
    decideTheme();
  }, [measureNav, buildBoundaries, decideTheme]);

  // Listeners + observer
  useEffect(() => {
    const handleResize = () => {
      measureNav();
      buildBoundaries();
      decideTheme();
    };

    // Inicial
    handleResize();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const mo = new MutationObserver(() => {
      buildBoundaries();
      decideTheme();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  }, [onScroll, measureNav, buildBoundaries, decideTheme]);

  useEffect(() => setOpen(false), [pathname]);

  return (
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
      <nav className="grid grid-cols-2 md:grid-cols-3 h-[80px] px-6 mx-auto">
        <div className="flex items-center justify-start">
          <Link href="/" className="text-base font-bold tracking-tight">
            <Image
              src="/images/branding.png"
              alt="Logo"
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
        <div className="flex md:hidden justify-end items-center">
          <button
            className={`rounded p-2 md:hidden transition ${
              onDark
                ? "text-white hover:bg-white/10"
                : "text-zinc-700 hover:bg-zinc-100"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="container px-6 items-center text-xl gap-3 flex flex-col justify-center py-3 md:hidden h-[calc(100vh-80px)] bg-[#ffffff20] backdrop-blur-lg">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block rounded px-6 py-4 transition ${
                  onDark ? "text-white hover:bg-white/10" : "hover:bg-zinc-100"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className={`block px-6 py-4 text-center transition ${
                onDark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              hello @jesus
            </Link>
          </li>
        </ul>
      ): null}
    </header>
  );
}
