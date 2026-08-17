'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLang } from '@/contexts/LangContext';
import type { Lang } from '@/i18n/strings';

const NAV_LINKS = [
  { slug: 'about',       key: 'n_about'  },
  { slug: 'skills',      key: 'n_skills' },
  { slug: 'experience',  key: 'n_exp'    },
  { slug: 'open-source', key: 'n_os'     },
  { slug: 'blog',        key: 'n_blog'   },
] as const;

function isActive(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Nav() {
  const { lang, setLang, t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const switchLang = (next: Lang) => {
    setLang(next);
    router.replace(pathname.replace(/^\/(en|pt)(?=\/|$)/, `/${next}`));
  };

  return (
    <nav id="nav" aria-label="Primary navigation" className={`${scrolled ? 'scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="wrap">
        <div className="nav-inner">
          <Link href={`/${lang}`} className="nav-logo">TL</Link>

          <ul className="nav-links">
            {NAV_LINKS.map(({ slug, key }) => (
              <li key={slug}>
                <Link
                  href={`/${lang}/${slug}`}
                  className={isActive(pathname, `/${lang}/${slug}`) ? 'active' : undefined}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
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
            <Link href={`/${lang}/contact`} className="nav-cta">{t('n_contact')}</Link>
            <button
              className={`nav-burger${open ? ' open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label={lang === 'pt' ? (open ? 'Fechar menu' : 'Abrir menu') : (open ? 'Close menu' : 'Open menu')}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-navigation" className="nav-mobile">
          {NAV_LINKS.map(({ slug, key }) => (
            <Link
              key={slug}
              href={`/${lang}/${slug}`}
              className={isActive(pathname, `/${lang}/${slug}`) ? 'active' : undefined}
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href={`/${lang}/contact`}
            className={pathname === `/${lang}/contact` ? 'active' : undefined}
          >
            {t('n_contact')}
          </Link>
        </div>
      )}
    </nav>
  );
}
