# Landing Page — Design Spec
**Date:** 2026-03-26
**Branch:** `landing-page`

## Goal

Convert the current 3-page portfolio (Home, About, Projects) into a single high-converting landing page at `/`. All existing content and GSAP animations are preserved.

---

## Section Structure

```
/ (single page)
│
├── #hero        Full-screen hero (existing HomePage)
├── #projects    Projects section header (h2, compact) + Gallery + Project Cards
├── [quote]      Narrative bridge — Quote 3-scene animation (no anchor, no nav link)
├── #about       About section header (h2, compact) + Bio + What Sets Me Apart + Skills
└── #contact     Footer CTA + links
```

### Section details

**#hero**
- Existing `HomePage` component, unchanged.
- Full-screen, animated title toggle (FrontEnd Developer / & Web Designer).
- Social links, "Based in Argentina / Freelance" subtitle.

**#projects**
- `HeroProjects` receives `id="projects"` and is repurposed as a compact section header: `h-[100dvh]` → `py-20 md:py-28` with height auto. OrbitFusion stays as background decoration.
- `GalleryProjects` — parallax curved gallery, unchanged.
- `LatestsProjects` — filterable project cards grid, unchanged.

**[Quote] — narrative bridge**
- Existing `Quote` component (3-scene pinned GSAP animation), unchanged.
- Positioned between `#projects` and `#about` as a visual/narrative separator.
- No `id`, no navbar link — purely transitional.

**#about**
- `AboutMeHero` receives `id="about"` and is repurposed as a compact section header: `h-[100dvh]` → `py-20 md:py-28` with height auto. AuroraGlow stays as background decoration.
- `AboutText` — word-by-word scroll reveal, unchanged.
- `WhatsSetsMeApart` — 3 cards, unchanged.
- `AboutMeSkillsBarChart` (skills chips) — unchanged.

**#contact**
- Existing `Footer` component, unchanged.
- Gets `id="contact"` attribute.

---

## Routing Changes

| Route | Before | After |
|---|---|---|
| `/` | Home hero only | Full landing page |
| `/about` | About page | `redirect('/#about')` |
| `/projects` | Projects page | `redirect('/#projects')` |

Both redirects use Next.js `redirect()` from `next/navigation` in the respective `page.tsx` files.

---

## Navbar Changes

Current links (`/about`, `/projects`) become anchor links (`/#about`, `/#projects`).

- Active section detection via `IntersectionObserver` watching `#hero`, `#projects`, `#about`, `#contact`.
- The active dot indicator updates as the user scrolls.
- The existing scroll behavior (elevated, compact, FABs on mobile) stays intact.
- Mobile menu contact link updated from `/#contact` (already correct).

---

## File Changes Summary

| File | Change |
|---|---|
| `src/app/page.tsx` | Becomes the full landing page — renders all sections in order |
| `src/app/about/page.tsx` | Replaced with `redirect('/#about')` |
| `src/app/projects/page.tsx` | Replaced with `redirect('/#projects')` |
| `src/components/Navbar.tsx` | Links updated to anchor hrefs + IntersectionObserver active state |
| `src/components/Projects/HeroProjects.tsx` | Gets `id="projects"`, height `h-[100dvh]` → `py-20 md:py-28` |
| `src/components/AboutMe/AboutMeHero.tsx` | Gets `id="about"`, height `h-[100dvh]` → `py-20 md:py-28` |
| `src/components/HomePage.tsx` | Root section gets `id="hero"` |
| `src/components/Footer.tsx` | Root footer gets `id="contact"` |
| `src/components/BackgroundTransition.tsx` | New component — scroll-driven bg color transitions |
| `src/components/Projects/ProjectCard.tsx` | Frosted glass styles (`bg-white/70 backdrop-blur-sm`) |
| `src/components/AboutMe/AboutMeHero.tsx` | Add stat counters section + scale-in on section title |
| `src/components/Projects/HeroProjects.tsx` | Scale-in entrance on section title |

---

## Apple-Inspired Animation Enhancements

Four new animation techniques layered on top of the existing GSAP setup. No new dependencies — all implemented with GSAP ScrollTrigger.

### 1. Scroll-driven background color transition
A new `<BackgroundTransition>` component wraps the entire page. It listens to scroll progress and smoothly interpolates the `background-color` of `<html>` between section color stops:

| Scroll zone | Background color |
|---|---|
| `#hero` | `#e4e4e4` (current) |
| `#projects` | `#f0f0f0` (slightly lighter) |
| `[quote]` | `#1a1a1a` (dark, matches the quote's dramatic feel) |
| `#about` | `#e4e4e4` (back to light) |
| `#contact` | `#000000` (footer is already black) |

Implemented as a GSAP ScrollTrigger on each section boundary with `scrub: true` and `gsap.to(document.documentElement, { backgroundColor: ... })`.

### 2. Scale-in section headers
`HeroProjects` and `AboutMeHero` — both now compact h2 headers — get a scroll-driven scale entrance: text starts at `scale(1.12)` and `opacity(0)` and scrubs to `scale(1)` + `opacity(1)` as the section enters the viewport. Gives the Apple "cinematic reveal" feel on section titles.

### 3. Stat counters in About
Three animated counters added to the `AboutMeHero` section (below the title, above the skills carousel):

| Stat | Value |
|---|---|
| Years of experience | 3+ |
| Projects delivered | 8+ |
| Design + Code | 1 profile |

Numbers count up from 0 using GSAP `snap: 1` on scroll enter. Labels appear with a stagger fade.

### 4. Frosted glass project cards
`ProjectCard` component gets updated styles:
- `bg-white` → `bg-white/70 backdrop-blur-sm`
- Subtle border: `border border-white/50`
- Hover: `bg-white/90` with `shadow-xl`

This gives the cards the Apple-style translucent surface feel against the lighter background.

---

## What Stays Unchanged

- All existing GSAP animations (ScrollTrigger, timelines, word reveals, parallax, Quote 3 scenes)
- All styled-components
- All component internal logic
- Tailwind styles
- SEO metadata in `layout.tsx`
- The `Skills` carousel in `AboutMeHero`

---

## Constraints

- No new dependencies.
- All existing animations must work without modification.
- Background transition must not interfere with Footer's own black background.
- Stat counters are decorative — no dynamic data fetching.
- Mobile swipe navigation in `HomePage` is removed (no longer needed on a single page — anchor scroll replaces it).
