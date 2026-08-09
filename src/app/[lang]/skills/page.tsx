import { Skills } from '@/components/sections';
import { pageMeta } from '../pageMeta';

export const generateMetadata = pageMeta('skills', { en: 'Stack', pt: 'Stack' });

export default function SkillsPage() {
  return (
    <main>
      <Skills />
    </main>
  );
}
