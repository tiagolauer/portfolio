import type { Metadata } from 'next';
import type { Lang } from '@/i18n/strings';
import { LangProvider } from '@/contexts/LangContext';
import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { HtmlLang } from '@/components/HtmlLang';

const SITE_URL = 'https://tiagolauer.dev';
const OG_IMAGE = 'https://avatars.githubusercontent.com/u/91141923?v=4';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPt = lang === 'pt';

  const title = 'Tiago Estrela Lauer — Full-Stack Technical Lead';
  const description = isPt
    ? 'Tech Lead Full-Stack. 6+ anos construindo aplicações de produção para mobile e web com React Native, TypeScript e Vue.js.'
    : 'Full-Stack Technical Lead. 6+ years building production-grade mobile and web applications with React Native, TypeScript, and Vue.js.';
  const ogDescription = isPt
    ? 'Construindo sistemas que sustentam. 6+ anos em React Native, TypeScript, Vue.js, .NET.'
    : 'Building systems that hold. 6+ years in React Native, TypeScript, Vue.js, .NET.';

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
          width: 460,
          height: 460,
          alt: 'Tiago Estrela Lauer — Full-Stack Technical Lead',
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description: ogDescription,
      creator: '@tiagolauer',
      images: [OG_IMAGE],
    },
    other: {
      'theme-color': '#0d0d0d',
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
    'mailto:tiagoestrelalauer@gmail.com',
  ],
  jobTitle: 'Full-Stack Technical Lead',
  worksFor: {
    '@type': 'Organization',
    name: 'ohubdev',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Balneário Camboriú',
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

  return (
    <>
      <HtmlLang lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LangProvider initialLang={lang as Lang}>
        <ScrollProgress />
        <Nav />
        {children}
      </LangProvider>
    </>
  );
}
