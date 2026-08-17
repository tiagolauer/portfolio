import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LANGS, isLang } from '@/i18n/strings';
import { LangProvider } from '@/contexts/LangContext';
import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HtmlLang } from '@/components/HtmlLang';
import { Footer } from '@/components/sections';

const SITE_URL = 'https://tiagolauer.dev';
const OG_IMAGE = `${SITE_URL}/og.svg`;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === 'pt';

  const title = isPt
    ? 'Tiago Lauer — Software Engineer, Open Source e AI'
    : 'Tiago Lauer — Software Engineer, Open Source & AI';
  const description = isPt
    ? 'Tiago Lauer é um engenheiro de software que constrói ferramentas para desenvolvedores, software open source e sistemas com AI.'
    : 'Tiago Lauer is a software engineer building developer tools, open-source software and AI-powered systems with TypeScript, Node.js, Vue, React Native and .NET.';
  const ogDescription = isPt
    ? 'Software Engineer construindo ferramentas para desenvolvedores, open source e sistemas com AI.'
    : 'Software Engineer building developer tools, open source and AI-powered systems.';

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        en: `${SITE_URL}/en`,
        pt: `${SITE_URL}/pt`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description: ogDescription,
      url: `${SITE_URL}/${lang}`,
      siteName: 'Tiago Estrela Lauer',
      type: 'profile',
      locale: isPt ? 'pt_BR' : 'en_US',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Tiago Lauer — Software Engineer, Open Source & AI',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ogDescription,
      creator: '@tiagolauer',
      images: [OG_IMAGE],
    },
    other: {
      'theme-color': '#0a0a0d',
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tiago Estrela Lauer',
  url: SITE_URL,
  image: OG_IMAGE,
  sameAs: [
    'https://github.com/tiagolauer',
    'https://linkedin.com/in/tiagolauer',
  ],
  jobTitle: 'Software Engineer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brusque',
    addressCountry: 'BR',
  },
  email: 'tiagoestrelalauer@gmail.com',
  knowsAbout: [
    'React Native', 'TypeScript', 'Vue.js', '.NET', 'C#',
    'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'CI/CD',
  ],
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <HtmlLang lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LangProvider initialLang={lang}>
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
      </LangProvider>
    </>
  );
}
