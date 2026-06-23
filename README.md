# Tiago Estrela Lauer — Portfolio

Personal portfolio for **Tiago Estrela Lauer**, Full-Stack Technical Lead. Built with Next.js 15, React 19, TypeScript, and Framer Motion.

**Live:** [tiagolauer.dev](https://tiagolauer.dev) <!-- update when deployed -->

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 |
| Animation | Framer Motion 12 |
| Fonts | Unbounded · Figtree (next/font) |
| Styling | CSS (OKLCH color system) |
| Deployment | Vercel (static export) |

---

## Features

- **EN / PT toggle** — full i18n via React Context, all strings typed
- **Hero word stagger** — words animate in sequence on load
- **Scroll progress bar** — fixed 2px oxblood line tracks scroll position
- **Animated stat counters** — numbers count up when entering viewport
- **IntersectionObserver reveals** — Framer Motion `useInView`, ease-out-expo
- **Project card hover lift** — `whileHover={{ y: -4 }}` on link cards
- **Favicon** — generated via `next/og` ImageResponse (`/app/icon.tsx`)
- **Static export** — `output: 'export'` in `next.config.ts`, zero server required

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Fonts, metadata, LangProvider, Nav, ScrollProgress
│   ├── page.tsx          # Hero, About, Skills, Experience, Projects, Contact
│   ├── globals.css       # OKLCH tokens, reset, all component styles
│   └── icon.tsx          # Favicon (32×32 PNG via ImageResponse)
├── components/
│   ├── Nav.tsx           # Scroll-aware nav + EN/PT toggle
│   ├── Reveal.tsx        # Generic IntersectionObserver animation wrapper
│   └── ScrollProgress.tsx# Fixed progress bar (useScroll)
├── contexts/
│   └── LangContext.tsx   # Lang state + t() helper
├── hooks/
│   └── useCountUp.ts     # Animated counter (ease-out-cubic, IntersectionObserver)
└── i18n/
    └── strings.ts        # All EN + PT translations, fully typed
```

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # Static export → /out
npm run lint      # ESLint
```

---

## Color System

All colors use OKLCH for perceptually uniform manipulation.

| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(0.07 0 0)` | Page background |
| `--surface` | `oklch(0.11 0.008 20)` | Card / surface |
| `--primary` | `oklch(0.60 0.155 20)` | Oxblood — brand |
| `--accent` | `oklch(0.68 0.090 200)` | Steel-teal — secondary |
| `--ink` | `oklch(0.95 0 0)` | Body text |
| `--muted` | `oklch(0.55 0.008 20)` | Secondary text |

---

## Deployment

Static export — drop the `/out` folder anywhere:

```bash
npm run build
# → /out ready for Vercel, Netlify, Cloudflare Pages, or any CDN
```

---

## Contact

**Tiago Estrela Lauer** — tiagoestrelalauer@gmail.com  
[GitHub](https://github.com/tiagolauer) · [LinkedIn](https://linkedin.com/in/tiagolauer)
