import type { Metadata } from 'next';
import { LangProvider } from '@/contexts/LangContext';
import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Portfolio } from '@/components/Portfolio';

const SITE_URL = 'https://tiagolauer.dev';

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      en: `${SITE_URL}/en`,
      pt: `${SITE_URL}/pt`,
      'x-default': `${SITE_URL}/en`,
    },
  },
};

export default function RootPage() {
  return (
    <LangProvider>
      <ScrollProgress />
      <Nav />
      <Portfolio />
    </LangProvider>
  );
}
