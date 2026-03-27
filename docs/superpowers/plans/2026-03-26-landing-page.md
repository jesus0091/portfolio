# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the 3-page portfolio into a single high-converting landing page at `/` with Apple-inspired scroll animations.

**Architecture:** All sections (Hero, Projects, Quote bridge, About, Footer) render sequentially in `src/app/page.tsx`. The Navbar is rendered once at the page level, not inside individual section components. GSAP ScrollTrigger handles all scroll-driven animations including the new background color transitions and scale-in headers.

**Tech Stack:** Next.js 15 App Router, React 19, GSAP 3 + ScrollTrigger, Tailwind CSS 4, styled-components

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/app/page.tsx` | Modify | Full landing — renders Navbar + all sections in order |
| `src/app/about/page.tsx` | Modify | Redirect to `/#about` |
| `src/app/projects/page.tsx` | Modify | Redirect to `/#projects` |
| `src/components/Navbar.tsx` | Modify | Anchor links + IntersectionObserver active section |
| `src/components/HomePage.tsx` | Modify | Add `id="hero"`, remove mobile swipe handlers, remove Navbar render |
| `src/components/Projects/HeroProjects.tsx` | Modify | Add `id="projects"`, compact height, scale-in title, remove Navbar |
| `src/components/AboutMe/AboutMeHero.tsx` | Modify | Add `id="about"`, compact height, stat counters, scale-in title, remove Navbar |
| `src/components/Footer.tsx` | Modify | Add `id="contact"` to root element |
| `src/components/Projects/Quote.tsx` | Modify | Add `data-section="quote"` for bg transition targeting |
| `src/components/BackgroundTransition.tsx` | Create | Scroll-driven background color transitions between sections |
| `src/components/Projects/ProjectCard.tsx` | Modify | Frosted glass styles |

---

## Task 1: Remove Navbar from section components

`HeroProjects` and `AboutMeHero` each render their own `<Navbar />`. On a single page this creates duplicate navbars. Remove them — the landing `page.tsx` will render Navbar once.

**Files:**
- Modify: `src/components/Projects/HeroProjects.tsx`
- Modify: `src/components/AboutMe/AboutMeHero.tsx`

- [ ] **Step 1: Remove Navbar from HeroProjects**

Replace the contents of `src/components/Projects/HeroProjects.tsx`:

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";

import ButtonOutlined from "../ButtonOutlined";
import { OrbitFusion } from "../OrbitFusion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function HeroProject() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      const baseEase = "power2.out";
      gsap
        .timeline({ defaults: { ease: baseEase } })
        .from([".hero-eyebrow", ".hero-title", ".hero-cta"], {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
        })
        .from(
          ".hero-orbit",
          { scale: 0.92, opacity: 0, duration: 0.6 },
          "<0.1"
        );

      if (!prefersReduced) {
        gsap.to(".hero-orbit", {
          yPercent: -12,
          rotate: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero h-[100dvh] flex flex-col justify-center items-center relative overflow-clip"
    >
      <div className="hero-orbit absolute will-change-transform">
        <OrbitFusion />
      </div>
      <div className="flex flex-col gap-6 px-4 items-center justify-center h-full z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="hero-eyebrow text-lg md:text-xl tracking-wide text-orange-600">
            From Concept to Code
          </p>
          <p className="hero-title text-3xl md:text-[90px] tracking-tight font-black leading-none text-[var(--black)] text-center">
            Building Digital <br /> Products & Experience
          </p>
        </div>

        <div className="hero-cta">
          <ButtonOutlined>Lets start a project together</ButtonOutlined>
        </div>
      </div>
      <div className="light-bottom-sentinel h-10 absolute bottom-0 w-full" />
    </section>
  );
}
```

- [ ] **Step 2: Remove Navbar from AboutMeHero**

In `src/components/AboutMe/AboutMeHero.tsx`, remove these two lines:
```tsx
import Navbar from "../Navbar";
```
and
```tsx
<Navbar />
```
and
```tsx
<div className="hidden md:flex w-full h-[80px]" />
```

The resulting JSX inside the Fragment should be just the `<section>` element.

- [ ] **Step 3: Verify build compiles**

```bash
npm run build
```
Expected: no TypeScript errors, pages still compile.

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects/HeroProjects.tsx src/components/AboutMe/AboutMeHero.tsx
git commit -m "refactor: remove Navbar from section components (will render once in page)"
```

---

## Task 2: Build the landing page in page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with the full landing page**

```tsx
import AboutMe from "@/components/AboutMe/AboutMe";
import BackgroundTransition from "@/components/BackgroundTransition";
import Footer from "@/components/Footer";
import GalleryProjects from "@/components/Projects/GalleryProjects";
import HomePage from "@/components/HomePage";
import HeroProject from "@/components/Projects/HeroProjects";
import LatestsProjects from "@/components/Projects/LatestsProjects";
import Navbar from "@/components/Navbar";
import Quote from "@/components/Projects/Quote";

export default function LandingPage() {
  return (
    <>
      <BackgroundTransition />
      <Navbar />
      <HomePage />
      <HeroProject />
      <GalleryProjects />
      <LatestsProjects />
      <Quote />
      <AboutMe />
      <Footer />
    </>
  );
}
```

Note: `AboutMe` already composes `AboutMeHero + AboutText + WhatsSetsMeApart + AboutMeSkillsBarChart` — no need to explode it.

- [ ] **Step 2: Verify the page renders**

```bash
npm run dev
```

Open `http://localhost:3000` — all sections should appear one after another. The page will look rough (Navbar may duplicate, IDs are missing) — that's expected and will be fixed in later tasks.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: compose full landing page in page.tsx"
```

---

## Task 3: Replace route pages with redirects

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Replace /about with redirect**

Replace the full contents of `src/app/about/page.tsx`:

```tsx
import { redirect } from "next/navigation";

export default function AboutPage() {
  redirect("/#about");
}
```

- [ ] **Step 2: Replace /projects with redirect**

Replace the full contents of `src/app/projects/page.tsx`:

```tsx
import { redirect } from "next/navigation";

export default function ProjectsPage() {
  redirect("/#projects");
}
```

- [ ] **Step 3: Verify redirects work**

```bash
npm run dev
```

Visit `http://localhost:3000/about` — should redirect to `http://localhost:3000/#about`.
Visit `http://localhost:3000/projects` — should redirect to `http://localhost:3000/#projects`.

- [ ] **Step 4: Commit**

```bash
git add src/app/about/page.tsx src/app/projects/page.tsx
git commit -m "feat: redirect /about and /projects to landing page anchors"
```

---

## Task 4: Add id="hero" to HomePage + remove mobile swipe

The HomePage section needs `id="hero"` for anchor navigation. The mobile swipe handler (which previously navigated to `/about` and `/projects`) is no longer needed — everything is on one page.

**Files:**
- Modify: `src/components/HomePage.tsx`

- [ ] **Step 1: Add id="hero" and remove swipe navigation**

In `src/components/HomePage.tsx`:

1. Remove the entire second `useEffect` block (lines ~139–203) — the one with `onTouchStart`, `onTouchMove`, `onTouchEnd` handlers and `router.push`.

2. Remove the `useRouter` import and usage:
```tsx
// Remove this line:
import { useRouter } from "next/navigation";
// Remove this line:
const router = useRouter();
```

3. Add `id="hero"` to the root `<section>` element:
```tsx
<section
  ref={sectionRef}
  id="hero"
  className="pb-10 px-4 h-[100dvh] w-full
    flex flex-col justify-between items-center
    touch-pan-y select-none
    overflow-x-clip
  "
>
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/HomePage.tsx
git commit -m "feat: add id=hero to HomePage, remove mobile swipe navigation"
```

---

## Task 5: Add id="contact" to Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Add id="contact" to Footer root element**

In `src/components/Footer.tsx`, find the root `<footer>` element and add `id="contact"`:

```tsx
<footer
  ref={footerRef}
  id="contact"
  className={`relative min-h-[100vh] overflow-hidden flex flex-col border-t bg-black border-black/10 ${className}`}
>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add id=contact to Footer"
```

---

## Task 6: Compact HeroProjects + id + scale-in animation

Transform `HeroProjects` from a full-screen page hero into a compact section header with `id="projects"` and an Apple-style scale-in title on scroll enter.

**Files:**
- Modify: `src/components/Projects/HeroProjects.tsx`

- [ ] **Step 1: Replace HeroProjects with compact version**

Replace the full contents of `src/components/Projects/HeroProjects.tsx`:

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";

import ButtonOutlined from "../ButtonOutlined";
import { OrbitFusion } from "../OrbitFusion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function HeroProject() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        // Scale-in on section title (Apple-style)
        gsap.fromTo(
          ".projects-title",
          { scale: 1.12, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".projects-eyebrow",
          { y: 16, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              once: true,
            },
          }
        );

        // OrbitFusion parallax
        gsap.to(".hero-orbit", {
          yPercent: -12,
          rotate: 2,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={rootRef}
      className="relative py-20 md:py-28 flex flex-col justify-center items-center overflow-clip"
    >
      <div className="hero-orbit absolute inset-0 will-change-transform opacity-60">
        <OrbitFusion />
      </div>
      <div className="flex flex-col gap-6 px-4 items-center justify-center z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="projects-eyebrow text-lg md:text-xl tracking-wide text-orange-600">
            From Concept to Code
          </p>
          <p className="projects-title text-3xl md:text-[90px] tracking-tight font-black leading-none text-[var(--black)] text-center will-change-transform">
            Building Digital <br /> Products & Experience
          </p>
        </div>
        <ButtonOutlined>Lets start a project together</ButtonOutlined>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify scroll animation fires**

```bash
npm run dev
```

Scroll down to the projects section — title should scale in from 1.12 to 1 as it enters the viewport.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects/HeroProjects.tsx
git commit -m "feat: compact HeroProjects as section header with scale-in animation"
```

---

## Task 7: Compact AboutMeHero + id + stat counters + scale-in

Transform `AboutMeHero` into a compact section header with `id="about"`, a scale-in title, and three animated stat counters (Apple-style number count-up).

**Files:**
- Modify: `src/components/AboutMe/AboutMeHero.tsx`

- [ ] **Step 1: Replace AboutMeHero with compact version**

Replace the full contents of `src/components/AboutMe/AboutMeHero.tsx`:

```tsx
"use client";

import { Fragment, useLayoutEffect, useRef } from "react";

import { AuroraGlow } from "../AuroraGlow";
import ButtonOutlined from "../ButtonOutlined";
import SkillsCarousel from "./Skills";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "+", label: "Projects delivered" },
  { value: 1, suffix: "", label: "Design & Code profile" },
];

const AboutMeHero = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [eyebrowRef.current, titleRef.current, statsRef.current, skillsRef.current],
          { clearProps: "all" }
        );
        return;
      }

      // Scale-in on section title (Apple-style)
      gsap.fromTo(
        titleRef.current,
        { scale: 1.12, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        eyebrowRef.current,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Stat counters count-up
      const statEls = statsRef.current?.querySelectorAll<HTMLElement>("[data-count]");
      statEls?.forEach((el, i) => {
        const target = STATS[i].value;
        const suffix = STATS[i].suffix;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      });

      // Stats fade-in stagger
      const statCards = statsRef.current?.querySelectorAll<HTMLElement>("[data-stat-card]");
      if (statCards?.length) {
        gsap.fromTo(
          statCards,
          { y: 20, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Skills carousel
      gsap.fromTo(
        skillsRef.current,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <Fragment>
      <section
        id="about"
        ref={rootRef}
        className="relative py-20 md:py-28 flex flex-col items-center justify-between overflow-hidden gap-10"
      >
        <div className="absolute inset-0 flex items-center z-0">
          <AuroraGlow
            blobSize={600}
            speed={4}
            colors={["#007bff1f", "#ff00bb1f", "#00ff951f"]}
          />
        </div>

        <div className="flex flex-col z-10 items-center px-4 justify-center gap-6 w-full">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <p
              ref={eyebrowRef}
              className="select-none text-lg md:text-xl tracking-wide leading-none font-normal block text-center text-[var(--orange)]"
            >
              Jesus Hernandez
            </p>
            <p
              ref={titleRef}
              className="text-4xl md:text-[90px] font-black tracking-tight leading-none text-center text-[var(--black)] max-w-4xl will-change-transform"
            >
              The Creative Mind Behind the Code
            </p>
          </div>
          <ButtonOutlined>Lets start a project together</ButtonOutlined>
        </div>

        {/* Stat counters */}
        <div
          ref={statsRef}
          className="z-10 flex flex-row gap-6 md:gap-16 px-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-stat-card
              className="flex flex-col items-center gap-1"
            >
              <span
                data-count
                className="text-4xl md:text-6xl font-black tracking-tight text-[var(--black)]"
              >
                0{stat.suffix}
              </span>
              <span className="text-sm md:text-base text-[var(--muted)] text-center max-w-[100px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div ref={skillsRef} className="w-full z-10">
          <SkillsCarousel />
        </div>
      </section>
    </Fragment>
  );
};

export default AboutMeHero;
```

- [ ] **Step 2: Verify counters animate**

```bash
npm run dev
```

Scroll to the About section — "Jesus Hernandez" eyebrow and title should scale in. Counters should count from 0 to their values. Skills carousel should fade in.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutMe/AboutMeHero.tsx
git commit -m "feat: compact AboutMeHero with stat counters and scale-in animation"
```

---

## Task 8: Update Navbar — anchor links + active section detection

Replace route-based active detection (`pathname === href`) with an `IntersectionObserver` that watches the four sections and updates a `activeSection` state as the user scrolls.

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Update links array and add activeSection state**

In `src/components/Navbar.tsx`:

1. Replace the `links` array at the top of the file:
```tsx
const links = [
  { href: "/#about", label: "About Me", sectionId: "about" },
  { href: "/#projects", label: "Projects", sectionId: "projects" },
];
```

2. Remove the `usePathname` import, the `pathname` variable, and the route-change effect:
```tsx
// Remove:
import { usePathname } from "next/navigation";
// Remove:
const pathname = usePathname();
// Remove entire effect:
useEffect(() => setOpen(false), [pathname]);
```

3. Add `activeSection` state after the existing state declarations:
```tsx
const [activeSection, setActiveSection] = useState<string>("hero");
```

4. Add a new `useEffect` for IntersectionObserver after the existing effects:
```tsx
useEffect(() => {
  const sectionIds = ["hero", "projects", "about", "contact"];
  const observers: IntersectionObserver[] = [];

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    obs.observe(el);
    observers.push(obs);
  });

  return () => observers.forEach((o) => o.disconnect());
}, []);
```

5. Replace the `selected` logic in the desktop nav links map:
```tsx
// Replace:
const selected = pathname === href;
// With:
const selected = activeSection === link.sectionId;
```

Update the map to use the `link` parameter name consistently:
```tsx
{links.map((link) => {
  const selected = activeSection === link.sectionId;
  return (
    <li key={link.href}>
      <Link
        href={link.href}
        aria-current={selected ? "page" : undefined}
        className={`px-2 text-lg flex flex-row gap-2 items-center transition-all relative ${
          selected
            ? "font-semibold text-[var(--orange)] hover:text-orange-700"
            : "text-[var(--muted)] hover:text-[var(--black)]"
        }`}
      >
        {selected ? (
          <div className="h-4 w-4 bg-current rounded-full" />
        ) : null}
        {link.label}
      </Link>
    </li>
  );
})}
```

6. Update the mobile menu links to use `link.href`:
```tsx
{links.map((link) => (
  <li key={link.href}>
    <Link
      href={link.href}
      className="flex justify-between rounded px-6 py-4 transition border-b w-full hover:bg-zinc-100 border-black/10"
    >
      {link.label} <IconArrowUpRight />
    </Link>
  </li>
))}
```

- [ ] **Step 2: Verify active section highlights correctly**

```bash
npm run dev
```

Scroll through the page — the Navbar should highlight "About Me" when the about section is centered, "Projects" when projects is centered.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: update Navbar to anchor links with IntersectionObserver active section"
```

---

## Task 9: Add data-section="quote" to Quote

The `BackgroundTransition` component (Task 10) needs to target the Quote section to trigger the dark background transition.

**Files:**
- Modify: `src/components/Projects/Quote.tsx`

- [ ] **Step 1: Add data-section attribute to Quote root**

In `src/components/Projects/Quote.tsx`, find the root `<section>` element and add `data-section="quote"`:

```tsx
<section
  ref={sectionRef}
  data-section="quote"
  className="relative h-[100dvh] w-full overflow-clip"
>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects/Quote.tsx
git commit -m "chore: add data-section=quote for background transition targeting"
```

---

## Task 10: Create BackgroundTransition component

Smooth scroll-driven background color transitions between sections — inspired by Apple product pages.

Color map:
- `#hero` enters → body stays `#e4e4e4`
- `#projects` enters → transitions to `#ebebeb`
- `[data-section="quote"]` enters → transitions to `#111111` (dramatic dark)
- `#about` enters → transitions back to `#e4e4e4`
- `#contact` enters → transitions to `#000000` (footer black)

**Files:**
- Create: `src/components/BackgroundTransition.tsx`

- [ ] **Step 1: Create BackgroundTransition component**

Create `src/components/BackgroundTransition.tsx`:

```tsx
"use client";

import { useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const TRANSITIONS = [
  { trigger: "#projects", color: "#ebebeb" },
  { trigger: '[data-section="quote"]', color: "#111111" },
  { trigger: "#about", color: "#e4e4e4" },
  { trigger: "#contact", color: "#000000" },
];

export default function BackgroundTransition() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      TRANSITIONS.forEach(({ trigger, color }) => {
        const el = document.querySelector(trigger);
        if (!el) return;

        gsap.to(document.body, {
          backgroundColor: color,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "top 10%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
```

- [ ] **Step 2: Verify transitions fire**

```bash
npm run dev
```

Scroll down slowly — the page background should smoothly shift from light gray to slightly lighter gray (projects), then dramatically dark (quote), back to light gray (about), then black (contact/footer).

- [ ] **Step 3: Commit**

```bash
git add src/components/BackgroundTransition.tsx
git commit -m "feat: add scroll-driven background color transitions between sections"
```

---

## Task 11: Frosted glass ProjectCard

Update `ProjectCard` to use Apple-style translucent card surface.

**Files:**
- Modify: `src/components/Projects/ProjectCard.tsx`

- [ ] **Step 1: Update card styles**

In `src/components/Projects/ProjectCard.tsx`, find the root `<article>` element and update its className:

```tsx
// Before:
className="p-card will-change-transform rounded-2xl flex flex-col overflow-hidden md:h-[550px] bg-[var(--card)] transition shadow-[0px_0px_50px_rgba(0,0,0,0.1)] hover:shadow-[0px_10px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1 cursor-pointer"

// After:
className="p-card will-change-transform rounded-2xl flex flex-col overflow-hidden md:h-[550px] bg-white/70 backdrop-blur-sm border border-white/50 transition shadow-[0px_0px_50px_rgba(0,0,0,0.08)] hover:shadow-[0px_10px_50px_rgba(0,0,0,0.15)] hover:bg-white/90 hover:-translate-y-1 cursor-pointer"
```

- [ ] **Step 2: Verify cards look correct**

```bash
npm run dev
```

Scroll to the Projects Cards section — cards should have a frosted glass appearance. The translucency is subtle against the light background but becomes more visible as the background color transitions.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects/ProjectCard.tsx
git commit -m "feat: frosted glass styles on ProjectCard"
```

---

## Task 12: Final build verification

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected output:
```
Route (app)                                 Size  First Load JS
┌ ○ /                                    ...
├ ○ /_not-found                          ...
├ ○ /about                               ...
└ ○ /projects                            ...
✓ Generating static pages (X/X)
```

No TypeScript errors, no missing imports.

- [ ] **Step 2: Smoke test all sections**

```bash
npm run dev
```

Checklist:
- [ ] Hero appears full-screen at `http://localhost:3000`
- [ ] Navbar links scroll to `#projects` and `#about` smoothly
- [ ] Navbar active indicator updates as you scroll
- [ ] `/about` redirects to `/#about`
- [ ] `/projects` redirects to `/#projects`
- [ ] Projects section: OrbitFusion visible, title scales in on scroll
- [ ] Gallery: curved parallax works
- [ ] Project cards: frosted glass style visible
- [ ] Quote: 3-scene animation still works
- [ ] About section: AuroraGlow visible, title scales in, stat counters count up
- [ ] Skills carousel scrolls
- [ ] Footer visible, contact links work
- [ ] Background transitions smoothly through sections

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final landing page integration verified"
git push origin landing-page
```
