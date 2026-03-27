# SEO Técnico + Cleanup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminar archivos sin uso y aplicar las correcciones SEO técnicas críticas (h1, JSON-LD sameAs, viewport, rel en links externos).

**Architecture:** Cambios quirúrgicos en 2 archivos de código (`layout.tsx`, `HomePage.tsx`, `AboutText.tsx`) más eliminación de 12 archivos sin referencias. Sin nuevas dependencias.

**Tech Stack:** Next.js 15 App Router, TypeScript, styled-components, GSAP.

---

## File Map

| Acción | Archivo |
|--------|---------|
| Modify | `src/app/layout.tsx` |
| Modify | `src/components/HomePage.tsx` |
| Modify | `src/components/AboutMe/AboutText.tsx` |
| Delete | `src/components/AboutMe/AboutMeHero.tsx` |
| Delete | `src/components/AboutMe/Skills.tsx` |
| Delete | `src/components/AboutMe/WhatsSetsMeApart.tsx` |
| Delete | `src/components/Projects/HeroProjects.tsx` |
| Delete | `src/components/Projects/Quote.tsx` |
| Delete | `src/components/OrbitFusion.tsx` |
| Delete | `src/components/AuroraGlowYellow.tsx` |
| Delete | `public/file.svg`, `public/globe.svg`, `public/react.svg`, `public/vercel.svg`, `public/window.svg` |
| Delete | `public/images/brand-dark.png`, `brand-light.png`, `branding.png`, `aboutme-text.png`, `banner-hero.png` |

---

### Task 1: Eliminar componentes y assets sin uso

**Files:**
- Delete: los 12 archivos listados en el file map

- [ ] **Step 1: Borrar componentes sin uso**

```bash
rm src/components/AboutMe/AboutMeHero.tsx \
   src/components/AboutMe/Skills.tsx \
   src/components/AboutMe/WhatsSetsMeApart.tsx \
   src/components/Projects/HeroProjects.tsx \
   src/components/Projects/Quote.tsx \
   src/components/OrbitFusion.tsx \
   src/components/AuroraGlowYellow.tsx
```

- [ ] **Step 2: Borrar SVGs default de Next.js sin uso**

```bash
rm public/file.svg public/globe.svg public/react.svg public/vercel.svg public/window.svg
```

- [ ] **Step 3: Borrar imágenes sin referencias**

```bash
rm public/images/brand-dark.png \
   public/images/brand-light.png \
   public/images/branding.png \
   public/images/aboutme-text.png \
   public/images/banner-hero.png
```

- [ ] **Step 4: Verificar que el build sigue pasando**

```bash
npm run build
```
Expected: `✓ Compiled successfully` sin errores de import.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove unused components and public assets"
```

---

### Task 2: Arreglar viewport y JSON-LD en layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Reemplazar el export `viewport`**

En `src/app/layout.tsx`, reemplazar:

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
```

Por:

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
```

- [ ] **Step 2: Añadir `sameAs` al Person JSON-LD**

En el mismo archivo, reemplazar:

```ts
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jesus Hernandez",
  url: CANONICAL,
  jobTitle: "Front-End Developer & UX/UI Designer",
  sameAs: [],
};
```

Por:

```ts
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jesus Hernandez",
  url: CANONICAL,
  jobTitle: "Front-End Developer & UX/UI Designer",
  sameAs: [
    "https://www.linkedin.com/in/jesushernandez91/",
    "https://github.com/jesus0091",
    "https://www.behance.net/devjesushernandez",
  ],
};
```

- [ ] **Step 3: Verificar TypeScript**

```bash
npm run type-check
```
Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "fix: remove userScalable, add sameAs to Person JSON-LD"
```

---

### Task 3: Añadir `<h1>` semántico en HomePage

**Files:**
- Modify: `src/components/HomePage.tsx`

El `StyledTitle` actualmente es un `styled.div`. Para que los bots lean el título principal de la página, debe ser un `<h1>`. `FrontendRow` y `DesignerRow` extienden `Row` que es un `styled.div` — dentro de un `<h1>` los `<div>` son HTML inválido, por eso `Row` pasa a `styled.span` (visualmente idéntico gracias a `display: inline-flex`).

También se añade `rel="noopener noreferrer"` a los tres links sociales del hero.

- [ ] **Step 1: Cambiar `StyledTitle` de `styled.div` a `styled.h1`**

En `src/components/HomePage.tsx`, reemplazar:

```ts
const StyledTitle = styled.div`
```

Por:

```ts
const StyledTitle = styled.h1`
```

- [ ] **Step 2: Cambiar `Row` de `styled.div` a `styled.span`**

Reemplazar:

```ts
const Row = styled.div<{ $filled: boolean; $ready: boolean }>`
```

Por:

```ts
const Row = styled.span<{ $filled: boolean; $ready: boolean }>`
```

- [ ] **Step 3: Añadir `rel="noopener noreferrer"` a los tres links sociales del hero**

Reemplazar el bloque `footerSocialRef` div con sus tres `<Link>`:

```tsx
<div ref={footerSocialRef} className="flex flex-row gap-1 mt-4">
  <Link
    href="https://www.linkedin.com/in/jesushernandez91/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-[var(--muted)] hover:text-[var(--black)]"
  >
    <IconBrandLinkedin size={20} />
  </Link>
  <Link
    href="https://github.com/jesus0091"
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-[var(--muted)] hover:text-[var(--black)]"
  >
    <IconBrandGithub size={20} />
  </Link>
  <Link
    href="https://www.behance.net/devjesushernandez"
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-black/5 transition text-[var(--muted)] hover:text-[var(--black)]"
  >
    <IconBrandBehance size={20} />
  </Link>
</div>
```

- [ ] **Step 4: Verificar TypeScript y build**

```bash
npm run type-check && npm run build
```
Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/components/HomePage.tsx
git commit -m "fix: semantic h1 for hero title, add rel to external links"
```

---

### Task 4: Añadir `rel="noopener noreferrer"` en AboutText

**Files:**
- Modify: `src/components/AboutMe/AboutText.tsx`

- [ ] **Step 1: Añadir `rel` a los tres links sociales en AboutText**

Reemplazar el bloque de links del `boxRef` div:

```tsx
<div className="flex flex-row gap-1 p-4 justify-end">
  <Link
    href="https://www.linkedin.com/in/jesushernandez91/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-12 h-12 items-center justify-center"
  >
    <IconBrandLinkedin />
  </Link>
  <Link
    href="https://github.com/jesus0091"
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-12 h-12 items-center justify-center"
  >
    <IconBrandGithub />
  </Link>
  <Link
    href="https://www.behance.net/devjesushernandez"
    target="_blank"
    rel="noopener noreferrer"
    className="flex w-12 h-12 items-center justify-center"
  >
    <IconBrandBehance />
  </Link>
</div>
```

- [ ] **Step 2: Build final**

```bash
npm run build
```
Expected: `✓ Compiled successfully`.

- [ ] **Step 3: Commit final**

```bash
git add src/components/AboutMe/AboutText.tsx
git commit -m "fix: add rel=noopener noreferrer to external links in AboutText"
```
