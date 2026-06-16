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
    layout/        Navbar, Footer — shared across all pages via SiteLayout
    sections/      Page-level sections for Home: Hero, QuickLinks, MenuExplorer,
                   CateringHighlight, InteriorSection, SocialFollow,
                   ReviewsSection, OrderCTA, AnnouncementBar (built but unused)
    order/         Self-contained ordering flow components (see Order page below)
    ui/            Reusable primitives — not yet populated
  hooks/
    useScrollReveal.ts   GSAP + ScrollTrigger batch reveal (fade-in/slide-up)
  lib/
    gsap.ts        Registers GSAP + ScrollTrigger; sets defaults; single export
    lenis.ts       Lenis singleton — initLenis() called once in main.tsx; getLenis() for component access
  pages/
    Home.tsx       Composes all Home sections in page order
    Order.tsx      Self-contained order flow — owns all cart/checkout state
  App.tsx          BrowserRouter + route map + layout wrappers
  main.tsx         Entry: registers useGSAP plugin, calls initLenis(), mounts app
  index.css        All styles — single source of truth
  App.css          Vite scaffolding leftover — unused, ignore
public/
  hero.mp4         Background video for Hero section
  logo.webp        Restaurant logo (with fallback "IS" initials in Navbar)
  interior.webp    Interior photo
  visit-photo.webp Visit section photo
  icons.svg        SVG sprite — reference icons as <use href="/icons.svg#icon-name" />
  catering-*.png   Three catering platter photos
src/assets/        Vite scaffolding leftovers (react.svg, vite.svg, hero.png) — unused
```

### Route map

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | Fully built; wrapped in SiteLayout (Navbar + Footer) |
| `/order` | Order flow | Fully built; **outside SiteLayout** — no Navbar/Footer |
| `/menu` | Coming soon | Placeholder |
| `/catering` | Coming soon | Placeholder |
| `/classes` | Coming soon | Placeholder |
| `/gift-cards` | Coming soon | Placeholder |
| `/about` | Coming soon | Placeholder |
| `/contact` | Coming soon | Placeholder |
| `/careers` | Coming soon | Placeholder |

`SiteLayout` wraps all routes except `/order`. Non-Home routes (other than `/order`) render a `<ComingSoon>` component inline in `App.tsx`, which uses inline styles as a one-off exception to the CSS-in-index.css convention.

### Order page architecture

`/order` is a fully standalone ordering experience with no shared layout. All state lives in `Order.tsx` and is passed down as props — no context or global store.

The UI is a **horizontal sliding 4-panel track** (`ord-track`) controlled by `viewIdx`:

| Index | View | Component |
|-------|------|-----------|
| 0 | Menu browse | `MenuView` |
| 1 | Cart review | `CartView` |
| 2 | Checkout (3 sub-steps) | `CheckoutView` |
| 3 | Order tracker | `TrackerView` |

Navigation slides the track with `translateX(-${viewIdx * 25}%)`. The tracker panel auto-advances status via `setInterval` (3.4s per step, 4 steps).

All menu data, types (`MenuItem`, `CartEntry`, `AddonItem`), and constants (`MENU`, `CATS`, `ADDONS`, `SPICE`, `TIPS`, `IMGS`, `TAG_COLORS`) live in `components/order/data.ts`. Item images come from Unsplash URLs in `IMGS` — this is intentional placeholder data.

`ProductModal` overlays the entire page and is rendered inside `ord-shell`. Toast notifications auto-dismiss after 1.9 s via a `setTimeout` ref.

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
| `--color-gold-light` | `#E9CF93` | `text-gold-light` |
| `--color-gold-pale` | `#EFD49A` | `text-gold-pale` |
| `--color-ink` | `#3a342f` | `text-ink` |
| `--color-muted` | `#7a716a` | `text-muted` |
| `--color-dim` | `#5b524a` | `text-dim` |
| `--color-footer-bg` | `#15110F` | `bg-footer-bg` |
| `--color-footer-text` | `#cdbfae` | `text-footer-text` |
| `--color-footer-sub` | `#9a8d80` | `text-footer-sub` |
| `--font-family-display` | `Shippori Mincho B1`, Georgia, serif | `font-family-display` |
| `--font-family-body` | `Zen Kaku Gothic New`, system-ui, sans-serif | `font-family-body` |

Named keyframe animations (all prefixed `ik-`): `ik-ken` (Ken Burns hero zoom), `ik-steam`, `ik-grain`, `ik-float`.

### Hero variants

`Hero.tsx` exports a single `<Hero />` that delegates to one of three sub-components. The active variant is selected by `useState(1)` — **no setter is wired**, so it's effectively a compile-time switch. Change the initial value to swap variants:

| Key | Component | Notes |
|-----|-----------|-------|
| 1 | `HeroCinematic` | **Currently active.** Fullscreen video + pinned ScrollTrigger that scrubs through 3 text phrases ("Fresh Sushi.", "Boba Drinks.", "Asian Street Food.") over `+=220%` scroll distance. The pin is why this section consumes a large scroll height. |
| 2 | `HeroEditorial` | Split two-column layout with entrance timeline. |
| 3 | `HeroStacked` | Centered stacked layout with panel image. |

Each variant runs its own `useGSAP` entrance timeline scoped to a local `ref`.

### Order entry points

There are two distinct paths to ordering:
- **Navbar "Order Online" / Hero CTAs** → `/order` (internal prototype flow, `Order.tsx`)
- **`OrderCTA` section** (bottom of Home page) → external Toast URL (`order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy`)

The internal `/order` flow is a fully working prototype (4-panel slider with cart/checkout/tracker) but the real production ordering goes through Toast.

### Scroll animation pattern

`useScrollReveal(ref, options)` applies a fade-in + slide-up on enter and reverses on exit to all `[data-reveal]` children inside the given container ref. Add `data-reveal` to each animated element. Uses `ScrollTrigger.batch()` for grouped stagger.

For custom per-component animations (parallax, entrance timelines), use `useGSAP({ scope: ref })` directly.

Lenis + ScrollTrigger sync is established once in `lib/lenis.ts` via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add()`. GSAP lag smoothing is disabled (`lagSmoothing(0)`) to keep Lenis timing tight. `html { scroll-behavior: auto }` is intentional — Lenis owns smooth scroll, so native smooth-scroll must be off.

### Design reference

Screenshots of the existing isekai.com site and a ChatGPT redesign mockup are in the project root (`.png` / `.webp` files). The restaurant is **Isekai Sushi & Cafe**, located at 5717 Gunn Hwy, Tampa FL (Citrus Park). Online ordering is via Toast: `order.toasttab.com/online/isekai-sushi-and-cafe-5717-gunn-hwy`. Social handle: `@isekicafe`.
