import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { PROJECT_STATUS, RARITY } from "./domain/project";

const work = defineCollection({
  loader: file("src/content/work.yaml"),
  schema: z.object({
    order: z.number().int(),
    company: z.string(),
    role: z.string(),
    period: z.string(),
    headline: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
  }),
});

const timeline = defineCollection({
  loader: file("src/content/timeline.yaml"),
  schema: z.object({
    order: z.number().int(),
    period: z.string(),
    description: z.string(),
  }),
});

const projects = defineCollection({
  loader: file("src/content/projects.yaml"),
  schema: z.object({
    order: z.number().int(),
    name: z.string(),
    rarity: z.enum(RARITY),
    status: z.enum(PROJECT_STATUS),
    paragraphs: z.array(z.string()).min(1),
    link: z.object({ label: z.string(), href: z.url() }).optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, timeline, projects, posts };
