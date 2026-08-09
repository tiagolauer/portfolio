import { Experience } from '@/components/sections';
import { pageMeta } from '../pageMeta';

export const generateMetadata = pageMeta('experience', { en: 'Experience', pt: 'Experiência' });

export default function ExperiencePage() {
  return (
    <main>
      <Experience />
    </main>
  );
}
