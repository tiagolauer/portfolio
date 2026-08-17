import type { MetadataRoute } from 'next';
import { POSTS } from '@/content/posts';
import { PROJECTS } from '@/content/projects';

export const dynamic = 'force-static';

const SITE_URL = 'https://tiagolauer.dev';
const PATHS = [
  '', '/about', '/skills', '/experience', '/open-source', '/contact', '/blog',
  ...PROJECTS.map((project) => `/open-source/${project.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pageEntries = (['en', 'pt'] as const).flatMap((lang) => {
    const other = lang === 'en' ? 'pt' : 'en';
    return PATHS.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? (lang === 'en' ? 1 : 0.9) : 0.8,
      alternates: {
        languages: {
          [other]: `${SITE_URL}/${other}${path}`,
          'x-default': `${SITE_URL}/en${path}`,
        },
      },
    }));
  });

  const postEntries: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/${post.lang}/blog/${post.slug}`,
    lastModified: new Date(post.meta.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...pageEntries, ...postEntries];
}
