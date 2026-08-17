import type { Metadata } from 'next';

const SITE_URL = 'https://tiagolauer.dev';
const DESCRIPTIONS = {
  about: {
    en: 'About Tiago Lauer, a software engineer working across product interfaces, mobile applications, backend services and developer tooling.',
    pt: 'Sobre Tiago Lauer, engenheiro de software que trabalha com interfaces, aplicações mobile, backend e ferramentas para desenvolvedores.',
  },
  skills: {
    en: 'The tools and engineering practices Tiago Lauer uses across product UI, backend, data, platform and AI tooling.',
    pt: 'As ferramentas e práticas de engenharia usadas por Tiago Lauer em produto, backend, dados, plataforma e AI.',
  },
  experience: {
    en: 'Selected engineering experience across mobile, web, backend systems and technical delivery.',
    pt: 'Experiência selecionada em engenharia mobile, web, backend e entrega técnica.',
  },
  'open-source': {
    en: 'Open-source projects by Tiago Lauer, including OwlSQL and pieces-to-agents.',
    pt: 'Projetos open source de Tiago Lauer, incluindo OwlSQL e pieces-to-agents.',
  },
  contact: {
    en: 'Get in touch with Tiago Lauer about engineering roles, open-source collaboration or product and systems problems.',
    pt: 'Entre em contato com Tiago Lauer sobre engenharia, colaboração open source ou problemas de produto e sistemas.',
  },
} as const;

export function pageMeta(slug: string, title: { en: string; pt: string }) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ lang: string }>;
  }): Promise<Metadata> {
    const { lang } = await params;
    const description = DESCRIPTIONS[slug as keyof typeof DESCRIPTIONS]?.[lang === 'pt' ? 'pt' : 'en'];
    return {
      title: `${lang === 'pt' ? title.pt : title.en} — Tiago Estrela Lauer`,
      description,
      alternates: {
        canonical: `${SITE_URL}/${lang}/${slug}`,
        languages: {
          en: `${SITE_URL}/en/${slug}`,
          pt: `${SITE_URL}/pt/${slug}`,
          'x-default': `${SITE_URL}/en/${slug}`,
        },
      },
      openGraph: {
        title: `${lang === 'pt' ? title.pt : title.en} — Tiago Estrela Lauer`,
        description,
        url: `${SITE_URL}/${lang}/${slug}`,
        type: 'website',
      },
      twitter: { card: 'summary_large_image' },
    };
  };
}
