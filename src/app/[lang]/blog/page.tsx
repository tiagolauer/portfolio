import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { T, isLang } from '@/i18n/strings';
import { postsByLang, formatPostDate } from '@/content/posts';
import { PostSearch } from '@/components/PostSearch';

const SITE_URL = 'https://tiagolauer.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const t = T[lang];
  const title = `${t.s_blog} — Tiago Estrela Lauer`;

  return {
    title,
    description: t.b_lead,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        en: `${SITE_URL}/en/blog`,
        pt: `${SITE_URL}/pt/blog`,
        'x-default': `${SITE_URL}/en/blog`,
      },
    },
    openGraph: {
      title,
      description: t.b_lead,
      url: `${SITE_URL}/${lang}/blog`,
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = T[lang];
  const posts = postsByLang(lang);

  return (
    <main className="blog-page">
      <div className="wrap">
        <header className="blog-head">
          <h1 className="section-title">{t.s_blog}</h1>
          <p className="blog-lead">{t.b_lead}</p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-empty">{t.b_empty}</p>
        ) : (
          <PostSearch
            posts={posts.map((post) => ({
              slug: post.slug,
              title: post.meta.title,
              description: post.meta.description,
              series: post.meta.series,
              date: post.meta.date,
              formattedDate: formatPostDate(post.meta.date, lang),
              tags: post.meta.tags,
            }))}
            lang={lang}
            labels={{
              search: t.b_search,
              noResults: t.b_no_results,
              read: t.b_read,
              misc: t.b_misc,
              seriesBack: t.b_series_back,
              postOne: t.b_post_one,
              postMany: t.b_post_many,
            }}
          />
        )}

        <Link href={`/${lang}`} className="blog-back">{t.b_home}</Link>
      </div>
    </main>
  );
}
