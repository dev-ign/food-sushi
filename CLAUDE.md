# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite, typically localhost:5174)
npm run build      # Type-check + production build (output: dist/)
npm run lint       # ESLint
npm run preview    # Preview the production build locally
```

There are no tests. **Node requirement:** Node 22.12+ (or 20.19+). Node 22.9.0 is below the Vite 5 threshold — upgrade if you see rolldown/native binding errors.

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
    lenis.ts       Lenis singleton — initLenis() called once in main.tsx; getLenis() for component access
  pages/
    Home.tsx       Composes all sections in page order
  App.tsx          BrowserRouter + route map + shared layout wrapper
  main.tsx         Entry: registers useGSAP plugin, calls initLenis(), mounts app
  index.css        All styles — single source of truth
```

### Styling convention

All component styles live in `src/index.css` using semantic BEM-lite class names (`.hero`, `.hero-title`, `.hero-content`, etc.) and Tailwind v4 `@apply`. JSX only references class names — no inline Tailwind utilities in JSX.

Tailwind v4 has **no `tailwind.config.js`** — it's wired via the `@tailwindcss/vite` plugin and `@import "tailwindcss"` at the top of `index.css`. Design tokens are defined in `@theme {}` and become Tailwind utilities automatically.

**Tailwind v4 rules in `@apply`:**
- Only official Tailwind utilities work in `@apply` — no custom class names, no `group`, no `group-hover:*`
- For hover-on-parent effects, use plain CSS: `.parent:hover .child { … }`

### Design tokens

Defined in `@theme {}` in `index.css`:

| Token | Value | Tailwind utility |
|-------|-------|-----------------|
| `--color-brand` | `#A62B1C` | `bg-brand`, `text-brand` |
| `--color-btn-red` | `#C4321F` | `bg-btn-red` |
| `--color-charcoal` | `#1C1A19` | `bg-charcoal`, `text-charcoal` |
| `--color-cream` | `#F7F1E7` | `bg-cream` |
| `--color-gold` | `#BE9A4E` | `text-gold` |
| `--color-ink` | `#3a342f` | `text-ink` |
| `--color-muted` | `#7a716a` | `text-muted` |
| `--color-dim` | `#5b524a` | `text-dim` |
| `--color-footer-bg` | `#15110F` | `bg-footer-bg` |
| `--font-family-display` | `Shippori Mincho B1`, Georgia, serif | `font-family-display` |
| `--font-family-body` | `Zen Kaku Gothic New`, system-ui, sans-serif | `font-family-body` |

Named keyframe animations (all prefixed `ik-`): `ik-ken` (Ken Burns hero zoom), `ik-steam`, `ik-grain`, `ik-float`.

### Scroll animation pattern

`useScrollReveal(ref, options)` applies a fade-in + slide-up on enter and reverses on exit to all `[data-reveal]` children inside the given container ref. Add `data-reveal` to each animated element. Uses `ScrollTrigger.batch()` for grouped stagger.

For custom per-component animations (parallax, entrance timelines), use `useGSAP({ scope: ref })` directly.

Lenis + ScrollTrigger sync is established once in `lib/lenis.ts` via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add()`. GSAP lag smoothing is disabled (`lagSmoothing(0)`) to keep Lenis timing tight.

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

Non-Home routes render a `<ComingSoon>` placeholder inline in `App.tsx` (uses inline styles as a one-off exception to the CSS-in-index.css convention).

### Design reference

Screenshots of the existing isekai.com site and a ChatGPT redesign mockup are in the project root (`.png` / `.webp` files). The restaurant is **Isekai Sushi & Cafe**, located at 5717 Gunn Hwy, Tampa FL (Citrus Park). Online ordering is via Toast: `order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy`. Social handle: `@isekicafe`.

Placeholder images currently use Unsplash URLs — replace with actual restaurant photography.
