import { Contact } from '@/components/sections';
import { pageMeta } from '../pageMeta';

export const generateMetadata = pageMeta('contact', { en: 'Contact', pt: 'Contato' });

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
