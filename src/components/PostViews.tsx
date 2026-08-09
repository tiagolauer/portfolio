'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/i18n/strings';
import { registerPostView } from '@/lib/views';

const NUMBER_LOCALE: Record<Lang, string> = { en: 'en-US', pt: 'pt-BR' };

interface PostViewsProps {
  slug: string;
  lang: Lang;
  labels: { one: string; many: string };
}

export function PostViews({ slug, lang, labels }: PostViewsProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    registerPostView(slug, lang).then((result) => {
      if (!cancelled && result.ok) setViews(result.views);
    });
    return () => { cancelled = true; };
  }, [slug, lang]);

  if (views === null) return null;

  const formatted = new Intl.NumberFormat(NUMBER_LOCALE[lang]).format(views);

  return (
    <span className="post-views">
      {formatted} {views === 1 ? labels.one : labels.many}
    </span>
  );
}
