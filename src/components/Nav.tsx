'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { T, type Lang } from '@/i18n/strings';

const LANG_SEGMENT = /^\/(en|pt)(?=\/|$)/;
const SCROLL_THRESHOLD = 32;

const SECTIONS = ['n_about', 'n_skills', 'n_exp', 'n_os'] as const;
const SECTION_IDS: Record<(typeof SECTIONS)[number], string> = {
  n_about: 'about',
  n_skills: 'skills',
  n_exp: 'experience',
  n_os: 'open-source',
};

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const lang: Lang = pathname.startsWith('/pt') ? 'pt' : 'en';
  const t = (key: keyof typeof T.en) => T[lang][key];
  const home = `/${lang}`;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const switchLang = (next: Lang) => {
    router.push(
      LANG_SEGMENT.test(pathname) ? pathname.replace(LANG_SEGMENT, `/${next}`) : `/${next}`
    );
  };

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <div className="nav-inner">
          <Link href={home} className="nav-logo">TL</Link>

          <ul className="nav-links">
            {SECTIONS.map((key) => (
              <li key={key}>
                <a href={`${home}#${SECTION_IDS[key]}`}>{t(key)}</a>
              </li>
            ))}
            <li><Link href={`${home}/blog`}>{t('n_blog')}</Link></li>
          </ul>

          <div className="nav-right">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                className={`lang-btn${lang === 'en' ? ' active' : ''}`}
                onClick={() => switchLang('en')}
                aria-label="Switch to English"
                aria-pressed={lang === 'en'}
              >EN</button>
              <button
                className={`lang-btn${lang === 'pt' ? ' active' : ''}`}
                onClick={() => switchLang('pt')}
                aria-label="Mudar para Português"
                aria-pressed={lang === 'pt'}
              >PT</button>
            </div>
            <a href={`${home}#contact`} className="nav-cta">{t('n_contact')}</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
