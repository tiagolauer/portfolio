import Link from 'next/link';

export default function RootPage() {
  return (
    <main>
      <meta httpEquiv="refresh" content="0;url=/en" />
      <p>
        Redirecting to the English version. <Link href="/en">Continue</Link>
      </p>
    </main>
  );
}
