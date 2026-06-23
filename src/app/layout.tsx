import { Unbounded, Figtree } from 'next/font/google';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${unbounded.variable} ${figtree.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
