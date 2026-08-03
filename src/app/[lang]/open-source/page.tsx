import { OpenSource } from '@/components/sections';
import { pageMeta } from '../pageMeta';

export const generateMetadata = pageMeta('open-source', { en: 'Open Source', pt: 'Open Source' });

export default function OpenSourcePage() {
  return (
    <main>
      <OpenSource />
    </main>
  );
}
