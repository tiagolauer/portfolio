import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://tiagolauer.dev';
const PATHS = ['', '/about', '/skills', '/experience', '/open-source', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (['en', 'pt'] as const).flatMap((lang) => {
    const other = lang === 'en' ? 'pt' : 'en';
    return PATHS.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? (lang === 'en' ? 1 : 0.9) : 0.8,
      alternates: {
        languages: { [other]: `${SITE_URL}/${other}${path}` },
      },
    }));
  });
}
