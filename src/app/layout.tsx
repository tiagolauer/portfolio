import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import { SPRING_SOFT } from '@/lib/motion';
import './globals.css';

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tiago Lauer — Software Engineer, Open Source & AI',
  description:
    'Tiago Lauer is a software engineer building developer tools, open-source software and AI-powered systems with TypeScript, Node.js, Vue, React Native and .NET.',
  metadataBase: new URL('https://tiagolauer.dev'),
  openGraph: {
    title: 'Tiago Lauer — Software Engineer, Open Source & AI',
    description: 'Software Engineer building developer tools, open source and AI-powered systems.',
    type: 'profile',
    images: ['https://avatars.githubusercontent.com/u/91141923?v=4'],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={onest.variable}>
      <body>
        <MotionConfig reducedMotion="user" transition={SPRING_SOFT}>
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
