"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About Me" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={[
        "fixed w-full top-0 z-50",
        elevated
          ? "shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60"
          : "",
      ].join(" ")}
    >
      <nav className="px-10 flex items-center justify-between h-[80px]">
        <Link href="/" className="text-base font-bold tracking-tight">
          <Image
            src="/images/branding.png"
            alt="Logo"
            width={108}
            height={54}
          />
        </Link>
        <div className="flex items-baseline gap-6 font-medium">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map(({ href, label }) => {
              const selected = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-lg px-2 text-zinc-600 font-medium transition-colors hover:text-zinc-900 cursor-pointer"
                    style={{ textDecoration: selected ? "underline" : "none" }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="hidden px-2 list-none gap-3 text-lg md:flex">
            <li>EN</li>
            <li>ES</li>
          </ul>
          <Link
            href="/#contact"
            className="bg-black px-4 py-2 text-lg text-white transition"
          >
            hello Jesus
          </Link>
        </div>

        <button
          className="rounded p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
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
      </nav>

      {open && (
        <ul className="container grid gap-2 border-t py-3 md:hidden">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded px-2 py-2 text-sm hover:bg-zinc-100"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="block bg-black px-2 py-2 text-center text-base text-white"
            >
              Work Together
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
