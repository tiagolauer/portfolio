import type { Metadata } from 'next';

const SITE_URL = 'https://tiagolauer.dev';

export function pageMeta(slug: string, title: { en: string; pt: string }) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ lang: string }>;
  }): Promise<Metadata> {
    const { lang } = await params;
    return {
      title: `${lang === 'pt' ? title.pt : title.en} — Tiago Estrela Lauer`,
      alternates: {
        canonical: `${SITE_URL}/${lang}/${slug}`,
        languages: {
          en: `${SITE_URL}/en/${slug}`,
          pt: `${SITE_URL}/pt/${slug}`,
          'x-default': `${SITE_URL}/en/${slug}`,
        },
      },
    };
  };
}
