import type { MetadataRoute } from 'next';
import { POSTS } from '@/content/posts';

export const dynamic = 'force-static';

const SITE_URL = 'https://tiagolauer.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const postEntries: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/${post.lang}/blog/${post.slug}`,
    lastModified: new Date(post.meta.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

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
    {
      url: `${SITE_URL}/en/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: { pt: `${SITE_URL}/pt/blog` },
      },
    },
    {
      url: `${SITE_URL}/pt/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: { en: `${SITE_URL}/en/blog` },
      },
    },
    ...postEntries,
  ];
}
