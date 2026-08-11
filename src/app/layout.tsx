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
    <html lang="en" suppressHydrationWarning className={onest.variable}>
      <body>
        <MotionConfig reducedMotion="user" transition={SPRING_SOFT}>
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
