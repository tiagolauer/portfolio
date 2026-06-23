import type { Metadata } from 'next';
import { Unbounded, Figtree } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/contexts/LangContext';
import { Nav } from '@/components/Nav';
import { ScrollProgress } from '@/components/ScrollProgress';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-unbounded',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tiago Estrela Lauer — Full-Stack Technical Lead',
  description:
    'Full-Stack Technical Lead. 6+ years building production-grade mobile and web applications with React Native, TypeScript, and Vue.js.',
  openGraph: {
    title: 'Tiago Estrela Lauer — Full-Stack Technical Lead',
    description: 'Building systems that hold. 6+ years in React Native, TypeScript, Vue.js, .NET.',
    images: ['https://avatars.githubusercontent.com/u/91141923?v=4'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${figtree.variable}`}>
      <body>
        <LangProvider>
          <ScrollProgress />
          <Nav />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
