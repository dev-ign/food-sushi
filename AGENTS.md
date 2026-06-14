# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite, typically localhost:5174)
npm run build      # Type-check + production build (output: dist/)
npm run lint       # ESLint
npm run preview    # Preview the production build locally
```

**Node requirement:** Node 22.12+ (or 20.19+). Node 22.9.0 is below the Vite 5 threshold — upgrade if you see rolldown/native binding errors.

## Architecture

**Stack:** Vite 5 · React 19 · TypeScript · Tailwind CSS v4 · React Router v7 · GSAP 3 + @gsap/react · Lenis

### Folder structure

```
src/
  components/
    layout/        Navbar, Footer — shared across all pages
    sections/      Page-level sections (Hero, QuickLinks, CateringHighlight, …)
    ui/            Reusable primitives (Button, etc.) — not yet populated
  hooks/
    useScrollReveal.ts   GSAP + ScrollTrigger batch reveal (fade-in/slide-up)
  lib/
    gsap.ts        Registers GSAP + ScrollTrigger; sets defaults; single export
    lenis.ts       Lenis singleton — initLenis() called once in main.tsx
  pages/
    Home.tsx       Composes all sections in page order
  App.tsx          BrowserRouter + route map + shared layout wrapper
  main.tsx         Entry: registers @gsap/react plugin, calls initLenis(), mounts app
  index.css        All styles — single source of truth
```

### Styling convention

All component styles live in `src/index.css` using semantic BEM-lite class names (`.hero`, `.hero-title`, `.hero-content`, etc.) and Tailwind v4 `@apply`. JSX only references class names — no inline Tailwind utilities in JSX.

**Tailwind v4 rules in `@apply`:**
- Only official Tailwind utilities work in `@apply` — no custom class names, no `group`, no `group-hover:*`
- For hover-on-parent effects, use plain CSS: `.parent:hover .child { … }`
- Design tokens (colors, fonts) are defined in `@theme { }` and become Tailwind utilities automatically (`bg-brand`, `text-muted`, `font-family-heading`, etc.)

### Scroll animation pattern

`useScrollReveal(ref, options)` applies a fade-in + slide-up on enter and reverses on exit to all `[data-reveal]` children inside the given container ref. Add `data-reveal` to each animated element. Uses `ScrollTrigger.batch()` for grouped stagger.

For custom per-component animations (parallax, entrance timelines), use `useGSAP({ scope: ref })` directly.

Lenis + ScrollTrigger sync is established once in `lib/lenis.ts` via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add()`.

### Route map

| Path | Page |
|------|------|
| `/` | Home (fully built) |
| `/menu` | Menu & Order Online |
| `/catering` | Catering |
| `/classes` | Sushi Classes |
| `/gift-cards` | Gift Cards |
| `/about` | About |
| `/contact` | Contact |
| `/careers` | Careers |

Non-Home routes render a `<ComingSoon>` placeholder in `App.tsx`.

### Design reference

Screenshots of the existing isekai.com site and a ChatGPT redesign mockup are in the project root (`.png` / `.webp` files). The restaurant is **Isekai Sushi & Cafe**, located at 5717 Gunn Hwy, Tampa FL (Citrus Park). Online ordering is via Toast: `order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy`. Social handle: `@isekicafe`.

Brand colors: `--color-brand: #A8311B` (deep warm red), `--color-charcoal: #1A1A1A`. Heading font: Playfair Display (serif). Body font: Inter.

Placeholder images currently use Unsplash URLs — replace with actual restaurant photography.
