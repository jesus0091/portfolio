"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  IconArrowUpRight,
  IconMail,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#about", label: "About Me", sectionId: "about" },
  { href: "/#projects", label: "Projects", sectionId: "projects" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollYRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [navH, setNavH] = useState(72);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [showFab, setShowFab] = useState(false);

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
    if (open) lockScroll();
    else unlockScroll();
    return () => { unlockScroll(); };
  }, [open, lockScroll, unlockScroll]);

  const measureNav = useCallback(() => {
    const h = headerRef.current?.getBoundingClientRect().height ?? 72;
    setNavH(Math.max(1, Math.round(h)));
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      setElevated(y > 8);
      setShowFab(y > 12);
      lastScrollYRef.current = y;
    });
  }, []);

  useLayoutEffect(() => { measureNav(); }, [measureNav]);

  useEffect(() => {
    measureNav();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureNav);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureNav);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
    };
  }, [onScroll, measureNav]);

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
      {/* ── Header ── */}
      <header
        ref={headerRef}
        className={[
          "w-full md:fixed md:top-0 md:left-0 md:right-0 z-50",
          "transition-all duration-300",
          elevated
            ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav
          className={[
            "max-w-[1280px] mx-auto px-4 md:px-8",
            "flex items-center justify-between",
            "h-[72px]",
          ].join(" ")}
        >
          {/* Logo */}
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
            <span className="hidden md:inline text-lg font-semibold tracking-tight">
              Jesús Hernández
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const selected = activeSection === link.sectionId;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={selected ? "page" : undefined}
                    className={[
                      "group relative px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-200",
                      selected
                        ? "text-[var(--black)] bg-black/[0.06]"
                        : "text-[var(--muted)] hover:text-[var(--black)] hover:bg-black/[0.04]",
                    ].join(" ")}
                  >
                    {link.label}
                    <span
                      className={[
                        "absolute bottom-0 left-0 h-[2px] bg-[var(--orange)] w-full origin-center transition-transform duration-150 ease-out",
                        selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      ].join(" ")}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="mailto:jesushernandez120491@gmail.com"
              className={[
                "flex items-center gap-2 rounded-full font-medium transition-all duration-200",
                "bg-[var(--black)] text-white hover:bg-zinc-800",
                "px-5 py-2 text-[15px]",
              ].join(" ")}
            >
              <IconMail size={16} />
              hello @jesus
            </Link>
          </div>

          {/* Mobile hamburger (inline, top of page) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
              className={[
                "flex items-center gap-1.5 rounded-full border transition-all duration-200 active:scale-[0.97] cursor-pointer",
                "pl-1.5 pr-3 h-10",
                elevated
                  ? "bg-white/60 border-black/10 backdrop-blur-sm shadow-sm"
                  : "border-transparent",
              ].join(" ")}
            >
              <div className="relative h-8 w-8 grid place-items-center text-[var(--black)]">
                <span className={[
                  "pointer-events-none absolute right-2 block h-[2px] rounded-full bg-current will-change-transform",
                  "transition-[transform,width,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "top-1/2 w-5 rotate-45" : "top-[calc(50%-4px)] w-5 rotate-0",
                ].join(" ")} />
                <span className={[
                  "pointer-events-none absolute right-2 block h-[2px] rounded-full bg-current will-change-transform",
                  "transition-[transform,width,top] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "top-1/2 w-5 -rotate-45" : "top-[calc(50%+4px)] w-4 rotate-0",
                ].join(" ")} />
              </div>
              <span className="text-[var(--black)] font-medium text-base">Menu</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-40 md:hidden transition-opacity duration-200",
          open
            ? "opacity-100 pointer-events-auto bg-black/20 backdrop-blur-sm"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Mobile FAB — menu */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={[
          "md:hidden fixed z-[62]",
          "right-[calc(env(safe-area-inset-right,0px)+16px)]",
          "top-[calc(env(safe-area-inset-top,0px)+16px)]",
          "h-10 px-3 flex items-center gap-2 rounded-full",
          "bg-[var(--black)] text-white shadow-lg",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          showFab && !open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        {open ? <IconX size={18} /> : <IconMenu2 size={18} />}
        <span className="text-sm font-medium">Menu</span>
      </button>

      {/* Mobile FAB — contact */}
      <Link
        href="mailto:jesushernandez120491@gmail.com"
        aria-label="Contact"
        className={[
          "md:hidden fixed z-[60] flex items-center gap-2",
          "right-[calc(env(safe-area-inset-right,0px)+16px)]",
          "bottom-[calc(env(safe-area-inset-bottom,0px)+16px)]",
          "rounded-full px-5 py-3 font-semibold text-sm tracking-tight",
          "bg-[var(--black)] text-white shadow-lg",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          showFab && !open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none",
        ].join(" ")}
      >
        <IconMail size={16} />
        hello @jesus
      </Link>

      {/* Mobile menu drawer */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed z-50 left-3 right-3 md:hidden"
          style={{ top: `${navH + 8}px` }}
        >
          <ul className="flex flex-col rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden text-[17px]">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex justify-between items-center px-6 py-4 border-b border-black/[0.07] hover:bg-black/[0.03] transition"
                >
                  {link.label}
                  <IconArrowUpRight size={18} className="text-[var(--muted)]" />
                </Link>
              </li>
            ))}
            <li className="p-3">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3.5 bg-[var(--black)] text-white font-medium transition hover:bg-zinc-800"
              >
                <IconMail size={16} />
                hello @jesus
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  );
}
