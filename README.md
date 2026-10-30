# tiagolauer.dev

My personal site. One static page built with Astro, no client-side JavaScript.

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

`pnpm test` runs a Playwright smoke suite with axe against the built site, on desktop and mobile viewports. Run
`pnpm exec playwright install chromium` once before the first run.

## Where things live

- `src/content/*.yaml`: work history, timeline and open source projects, validated by the schemas in
  `src/content.config.ts`.
- `src/config/site.ts`: name, contact links, navigation and tool list.
- `src/data/owlsql-snippet.ts`: the code shown in the hero, as tokens.
- `src/components`: one component per section, plus `ornaments/` for the frames, gems and dividers.
- `src/styles/tokens.css`: colors, fonts and spacing.

Animations are CSS only and turn off under `prefers-reduced-motion`.

## History

The previous Next.js version is preserved under the `legacy-nextjs` tag.
