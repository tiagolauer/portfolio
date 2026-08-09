# Tiago Estrela Lauer — Portfolio

Personal portfolio and engineering blog for **Tiago Estrela Lauer**, Full-Stack Technical Lead. Built with Next.js 15, React 19, TypeScript, MDX, and Framer Motion.

**Live:** [tiagolauer.dev](https://tiagolauer.dev)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript 5 |
| UI | React 19 |
| Content | MDX via `@next/mdx` |
| Animation | Framer Motion 12 |
| Data (blog views/comments) | Supabase REST (no SDK) |
| Fonts | Unbounded · Figtree (next/font) |
| Styling | CSS (OKLCH color system) |
| CI | GitHub Actions (typecheck + lint) |
| Deployment | Static export (`/out`) |

---

## Routes

All pages exist under `/{lang}` with `lang ∈ {en, pt}`; `/` redirects to `/en`.

| Route | Content |
|---|---|
| `/{lang}` | Hero, stats, featured highlights |
| `/{lang}/about` | Bio |
| `/{lang}/skills` | Skill groups |
| `/{lang}/experience` | Role timeline |
| `/{lang}/open-source` | Featured packages with weekly npm downloads |
| `/{lang}/blog` | Post list with client-side search |
| `/{lang}/blog/{slug}` | MDX post, unique view counter, comments |
| `/{lang}/contact` | Contact links |

---

## Features

- **EN / PT parity** — every page and post exists in both languages; typed strings in `src/i18n/strings.ts`, hreflang alternates, per-lang metadata
- **Bilingual MDX blog** — posts as `slug.{en,pt}.mdx` pairs registered in `src/content/posts.ts`, client-side search, per-post unique views and comments backed by Supabase (graceful no-op when unconfigured)
- **SEO** — `sitemap.ts`, `robots.ts`, canonical + hreflang alternates, JSON-LD `Person`, Open Graph/Twitter cards
- **Motion** — scroll progress bar, IntersectionObserver reveals, animated stat counters, hero word stagger; `prefers-reduced-motion` respected via `MotionConfig`
- **Static export** — `output: 'export'`, zero server required; Supabase is called directly from the client

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Fonts, MotionConfig, global metadata
│   ├── page.tsx              # Redirect / → /en
│   ├── globals.css           # OKLCH tokens, reset, component styles
│   ├── icon.tsx              # Favicon via ImageResponse
│   ├── robots.ts / sitemap.ts
│   └── [lang]/
│       ├── layout.tsx        # Lang guard, metadata, JSON-LD, Nav, Footer
│       ├── page.tsx          # Home
│       ├── about | skills | experience | open-source | contact/
│       └── blog/             # List + [slug] post pages
├── components/               # Nav, Reveal, ScrollProgress, PostSearch,
│                             # PostViews, CommentSection, sections
├── content/                  # MDX posts (en/pt pairs) + posts.ts registry
├── contexts/LangContext.tsx  # Lang state + t() helper
├── hooks/useCountUp.ts       # Animated counter
├── i18n/strings.ts           # All EN + PT translations, fully typed
└── lib/                      # supabase.ts, views.ts, comments.ts
supabase/migrations/          # post_views + blog_comments schema
```

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run typecheck # tsc --noEmit
npm run lint      # ESLint (next/core-web-vitals)
npm run build     # Static export → /out
```

### Environment

Blog views and comments need a Supabase project (see `supabase/migrations/`). Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=sb_publishable_...
```

Without these the site builds and runs normally — views and comments simply don't render.

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

Set the `NEXT_PUBLIC_SUPABASE_*` variables in the build environment so views and comments work in production.

---

## Contact

**Tiago Estrela Lauer** — tiagoestrelalauer@gmail.com  
[GitHub](https://github.com/tiagolauer) · [LinkedIn](https://linkedin.com/in/tiagolauer)
