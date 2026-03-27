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

---

## What Stays Unchanged

- All GSAP animations (ScrollTrigger, timelines, word reveals, parallax, Quote 3 scenes)
- All styled-components
- All component internal logic
- Tailwind styles
- SEO metadata in `layout.tsx`
- The `Skills` carousel in `AboutMeHero` (stays, now smaller section)

---

## Constraints

- No new dependencies.
- No design changes beyond height adjustments on the two repurposed heroes.
- All existing animations must work without modification.
- Mobile swipe navigation in `HomePage` remains (it will still navigate to anchor sections via scroll).
