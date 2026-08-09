import type { ComponentType } from 'react';
import type { Lang } from '@/i18n/strings';
import LeakEn, { meta as leakEnMeta } from './my-tool-leaked-a-salary-negotiation.en.mdx';
import LeakPt, { meta as leakPtMeta } from './my-tool-leaked-a-salary-negotiation.pt.mdx';
import BulletsEn, { meta as bulletsEnMeta } from './one-in-five-bullets-belonged-to-another-project.en.mdx';
import BulletsPt, { meta as bulletsPtMeta } from './one-in-five-bullets-belonged-to-another-project.pt.mdx';
import TransportEn, { meta as transportEnMeta } from './the-server-warned-my-client-threw-the-warning-away.en.mdx';
import TransportPt, { meta as transportPtMeta } from './the-server-warned-my-client-threw-the-warning-away.pt.mdx';
import AuditEn, { meta as auditEnMeta } from './the-promise-my-tool-printed-was-false.en.mdx';
import AuditPt, { meta as auditPtMeta } from './the-promise-my-tool-printed-was-false.pt.mdx';
import NerEn, { meta as nerEnMeta } from './capitalization-is-my-ner-model.en.mdx';
import NerPt, { meta as nerPtMeta } from './capitalization-is-my-ner-model.pt.mdx';

export interface PostMeta {
  title: string;
  description: string;
  series?: string;
  date: string;
  tags: readonly string[];
  cover?: string;
}

export interface Post {
  slug: string;
  lang: Lang;
  meta: PostMeta;
  Content: ComponentType;
}

export const POSTS: readonly Post[] = [
  {
    slug: 'my-tool-leaked-a-salary-negotiation',
    lang: 'en',
    meta: leakEnMeta,
    Content: LeakEn,
  },
  {
    slug: 'my-tool-leaked-a-salary-negotiation',
    lang: 'pt',
    meta: leakPtMeta,
    Content: LeakPt,
  },
  {
    slug: 'one-in-five-bullets-belonged-to-another-project',
    lang: 'en',
    meta: bulletsEnMeta,
    Content: BulletsEn,
  },
  {
    slug: 'one-in-five-bullets-belonged-to-another-project',
    lang: 'pt',
    meta: bulletsPtMeta,
    Content: BulletsPt,
  },
  {
    slug: 'the-server-warned-my-client-threw-the-warning-away',
    lang: 'en',
    meta: transportEnMeta,
    Content: TransportEn,
  },
  {
    slug: 'the-server-warned-my-client-threw-the-warning-away',
    lang: 'pt',
    meta: transportPtMeta,
    Content: TransportPt,
  },
  {
    slug: 'the-promise-my-tool-printed-was-false',
    lang: 'en',
    meta: auditEnMeta,
    Content: AuditEn,
  },
  {
    slug: 'the-promise-my-tool-printed-was-false',
    lang: 'pt',
    meta: auditPtMeta,
    Content: AuditPt,
  },
  {
    slug: 'capitalization-is-my-ner-model',
    lang: 'en',
    meta: nerEnMeta,
    Content: NerEn,
  },
  {
    slug: 'capitalization-is-my-ner-model',
    lang: 'pt',
    meta: nerPtMeta,
    Content: NerPt,
  },
];

export function postsByLang(lang: Lang): readonly Post[] {
  return POSTS
    .filter((post) => post.lang === lang)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function findPost(lang: Lang, slug: string): Post | undefined {
  return POSTS.find((post) => post.lang === lang && post.slug === slug);
}

const DATE_LOCALE: Record<Lang, string> = { en: 'en-US', pt: 'pt-BR' };

export function formatPostDate(date: string, lang: Lang): string {
  return new Date(date).toLocaleDateString(DATE_LOCALE[lang], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
