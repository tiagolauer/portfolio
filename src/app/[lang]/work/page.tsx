import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LANGS, T, isLang } from '@/i18n/strings';
import { PROJECTS } from '@/content/projects';

const SITE_URL = 'https://tiagolauer.dev';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const title = lang === 'pt' ? 'Projetos — Tiago Lauer' : 'Selected work — Tiago Lauer';
  const description = lang === 'pt'
    ? 'Projetos de ferramentas para desenvolvedores, open source e sistemas com AI.'
    : 'Projects spanning developer tools, open source and AI-powered systems.';
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/work`,
      languages: { en: `${SITE_URL}/en/work`, pt: `${SITE_URL}/pt/work`, 'x-default': `${SITE_URL}/en/work` },
    },
    openGraph: { title, description, url: `${SITE_URL}/${lang}/work`, type: 'website' },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = T[lang];

  return (
    <main className="blog-page work-page">
      <div className="wrap">
        <header className="blog-head">
          <h1 className="section-title">{t.s_work}</h1>
          <p className="blog-lead">{t.work_lead}</p>
        </header>
        <div className="work-list">
          {PROJECTS.map((project) => {
            const text = project.text[lang];
            return (
              <article className="work-case" key={project.slug}>
                <div className="post-meta"><span className="proj-label">{project.language} · {project.status[lang]}</span></div>
                <h2 className="post-title">{project.name}</h2>
                <p className="post-desc">{text.tagline}</p>
                <div className="post-tags">{project.stack.map((item) => <span className="badge" key={item}>{item}</span>)}</div>
                <p className="work-summary">{text.body[0]}</p>
                <Link href={`/${lang}/open-source/${project.slug}`} className="btn btn-fill">{t.p_details}</Link>
              </article>
            );
          })}
        </div>
        <Link href={`/${lang}`} className="blog-back">{t.b_home}</Link>
      </div>
    </main>
  );
}
