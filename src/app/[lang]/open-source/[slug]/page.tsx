import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LANGS, T, isLang } from '@/i18n/strings';
import { PROJECTS, findProject } from '@/content/projects';

const SITE_URL = 'https://tiagolauer.dev';

export function generateStaticParams() {
  return LANGS.flatMap((lang) => PROJECTS.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const project = findProject(slug);
  if (!project) return {};

  const url = `${SITE_URL}/${lang}/open-source/${slug}`;
  const languages = Object.fromEntries(
    [
      ...LANGS.map((altLang) => [altLang, `${SITE_URL}/${altLang}/open-source/${slug}`] as const),
      ['x-default', `${SITE_URL}/en/open-source/${slug}`] as const,
    ]
  );

  return {
    title: `${project.name} — Tiago Estrela Lauer`,
    description: project.text[lang].tagline,
    alternates: { canonical: url, languages },
    openGraph: {
      title: project.name,
      description: project.text[lang].tagline,
      url,
      type: 'article',
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const project = findProject(slug);
  if (!project) notFound();

  const t = T[lang];
  const text = project.text[lang];

  return (
    <main className="blog-page">
      <article className="wrap post">
        <Link href={`/${lang}/open-source`} className="blog-back post-back">{t.os_back}</Link>

        <header className="post-head">
          <div className="post-meta">
            <span className="proj-label">{project.language} · Open Source</span>
          </div>
          <h1 className="post-title">{project.name}</h1>
          <p className="post-desc">{text.tagline}</p>
          <p className="proj-label">{project.status[lang]}</p>
          <div className="post-tags">
            {project.stack.map((item) => (
              <span key={item} className="badge">{item}</span>
            ))}
          </div>
        </header>

        <div className="post-body">
          {text.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>{t.os_feat}</h2>
        </div>

        <div>
          {text.features.map(({ term, desc }) => (
            <div key={term} className="skill-row">
              <span className="skill-cat">{term}</span>
              <span className="skill-items">{desc}</span>
            </div>
          ))}
        </div>

        <div className="post-body">
          <h2>{t.os_example}</h2>
          <pre><code>{project.example}</code></pre>
        </div>

        <div className="about-cta">
          {project.links.map(({ href, label }, index) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={index === 0 ? 'btn btn-fill' : 'hero-cta-secondary'}
            >
              {label}
            </a>
          ))}
        </div>

        <Link href={`/${lang}/open-source`} className="blog-back">{t.os_back}</Link>
      </article>
    </main>
  );
}
