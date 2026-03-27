# SEO Técnico + Cleanup — Diseño

**Fecha:** 2026-03-27

## Alcance

### 1. Cleanup de archivos sin uso

**Componentes a eliminar:**
- `src/components/AboutMe/AboutMeHero.tsx`
- `src/components/AboutMe/Skills.tsx`
- `src/components/AboutMe/WhatsSetsMeApart.tsx`
- `src/components/Projects/HeroProjects.tsx`
- `src/components/Projects/Quote.tsx`
- `src/components/OrbitFusion.tsx`
- `src/components/AuroraGlowYellow.tsx`

**Assets públicos a eliminar:**
- `public/file.svg`, `public/globe.svg`, `public/react.svg`, `public/vercel.svg`, `public/window.svg`
- `public/images/brand-dark.png`, `brand-light.png`, `branding.png`, `aboutme-text.png`, `banner-hero.png`

### 2. Añadir `<h1>` semántico en el hero

**Archivo:** `src/components/HomePage.tsx`

El `StyledTitle` (`<div>`) se convierte en `<h1>` como wrapper semántico manteniendo todos los estilos y animaciones GSAP. Los `FrontendRow` y `DesignerRow` pasan a ser `<span>` en vez de `<div>` para mantener estructura válida dentro del `<h1>`.

### 3. Completar `sameAs` en JSON-LD

**Archivo:** `src/app/layout.tsx`

```ts
sameAs: [
  "https://www.linkedin.com/in/jesushernandez91/",
  "https://github.com/jesus0091",
  "https://www.behance.net/devjesushernandez",
],
```

### 4. Quitar `userScalable: false` y `maximumScale: 1`

**Archivo:** `src/app/layout.tsx`

Viewport queda solo con `width: "device-width"` e `initialScale: 1`.

### 5. Añadir `rel="noopener noreferrer"` en links externos con `target="_blank"`

**Archivos afectados:**
- `src/components/HomePage.tsx` — links a LinkedIn, GitHub, Behance
- `src/components/AboutMe/AboutText.tsx` — links a LinkedIn, GitHub, Behance

## Criterios de éxito

- `npm run build` pasa sin errores
- Lighthouse SEO score mejora (especialmente heading structure)
- No hay regresiones visuales
