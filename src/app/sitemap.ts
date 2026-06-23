import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://tiagolauer.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: { pt: `${SITE_URL}/pt` },
      },
    },
    {
      url: `${SITE_URL}/pt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: { en: `${SITE_URL}/en` },
      },
    },
  ];
}
