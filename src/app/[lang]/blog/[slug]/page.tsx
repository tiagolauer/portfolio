import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { T, isLang } from '@/i18n/strings';
import { POSTS, findPost, formatPostDate } from '@/content/posts';
import { PostViews } from '@/components/PostViews';
import { CommentSection } from '@/components/CommentSection';

const SITE_URL = 'https://tiagolauer.dev';

export function generateStaticParams() {
  return POSTS.map((post) => ({ lang: post.lang, slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const post = findPost(lang, slug);
  if (!post) return {};

  const url = `${SITE_URL}/${lang}/blog/${slug}`;
  const languages = Object.fromEntries(
    POSTS
      .filter((translation) => translation.slug === slug)
      .map((translation) => [translation.lang, `${SITE_URL}/${translation.lang}/blog/${slug}`])
  );

  return {
    title: `${post.meta.title} — Tiago Estrela Lauer`,
    description: post.meta.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url,
      type: 'article',
      publishedTime: post.meta.date,
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
      images: post.meta.cover ? [`${SITE_URL}${post.meta.cover}`] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const post = findPost(lang, slug);
  if (!post) notFound();

  const t = T[lang];
  const { Content } = post;

  return (
    <main className="blog-page">
      <article className="wrap post">
        <Link href={`/${lang}/blog`} className="blog-back post-back">{t.b_back}</Link>

        <header className="post-head">
          <div className="post-meta">
            <time className="post-date" dateTime={post.meta.date}>
              {formatPostDate(post.meta.date, lang)}
            </time>
            <PostViews
              slug={post.slug}
              lang={lang}
              labels={{ one: t.b_view_one, many: t.b_view_many }}
            />
          </div>
          <h1 className="post-title">{post.meta.title}</h1>
          <p className="post-desc">{post.meta.description}</p>
          <div className="post-tags">
            {post.meta.tags.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
        </header>

        <div className="post-body">
          <Content />
        </div>

        <CommentSection
          slug={post.slug}
          lang={lang}
          labels={{
            title: t.cm_title,
            namePlaceholder: t.cm_name_ph,
            bodyPlaceholder: t.cm_body_ph,
            send: t.cm_send,
            sending: t.cm_sending,
            empty: t.cm_empty,
            error: t.cm_error,
            authorBadge: t.cm_author,
          }}
        />

        <Link href={`/${lang}/blog`} className="blog-back">{t.b_back}</Link>
      </article>
    </main>
  );
}
