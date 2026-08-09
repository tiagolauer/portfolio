import { About } from '@/components/sections';
import { pageMeta } from '../pageMeta';

export const generateMetadata = pageMeta('about', { en: 'About', pt: 'Sobre' });

export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  );
}
