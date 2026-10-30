# tiagolauer.dev

My personal site and blog. Static pages built with Astro, no client-side JavaScript.

## Running it

```sh
pnpm install
pnpm dev
```

Before pushing:

```sh
pnpm lint
pnpm check
pnpm build
pnpm test
```

`pnpm test` runs a Playwright smoke suite with axe against the built site, on desktop, a regular phone and a 320px
phone. Run `pnpm exec playwright install chromium` once before the first run.

Every push to `main` deploys to Vercel.

## Writing a post

Create a Markdown file in `src/content/posts/`. The file name becomes the URL, so `src/content/posts/why-raw-sql.md`
is published at `/blog/why-raw-sql`.

````md
---

title: Why I still write raw SQL
description: One or two sentences. Shows up in the post list, in search results and in the RSS feed.
date: 2026-11-02
tags: [TypeScript, SQL]
draft: true
---

The post starts here. Regular Markdown: headings with `##`, lists, quotes, links, images and fenced code blocks
with a language (```ts) for syntax highlighting.
````

- `draft: true` shows the post in `pnpm dev` and keeps it out of the published site. Remove the line or set it to
  `false` when it's ready.
- Images go in `public/blog/` and are linked as `/blog/your-image.png`.
- The "Blog" link appears in the navigation, and the feed at `/rss.xml` fills up, as soon as the first post is
  published. Until then the blog page exists but isn't linked.
- You can write straight from github.com: open `src/content/posts`, "Add file", "Create new file", commit to `main`.

## Where things live

- `src/content/*.yaml`: work history, timeline and open source projects, validated by the schemas in
  `src/content.config.ts`.
- `src/content/posts/*.md`: blog posts.
- `src/config/site.ts`: name, contact links, navigation and tool list.
- `src/data/owlsql-snippet.ts`: the code shown in the hero, as tokens.
- `src/lib/posts.ts`: which posts are visible, their order and their URLs.
- `src/pages`: the home page, `blog/` and the RSS feed.
- `src/components`: one component per section, plus `ornaments/` for the frames, gems and dividers.
- `src/styles/tokens.css`: colors, fonts and spacing.

Animations are CSS only and turn off under `prefers-reduced-motion`.

## History

The previous Next.js version is preserved under the `legacy-nextjs` tag.
