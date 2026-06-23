'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLang } from '@/contexts/LangContext';

export function Nav() {
  const { lang, t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  function switchLang(next: 'en' | 'pt') {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const newPath = pathname.replace(/^\/(en|pt)/, `/${next}`);
    router.push(`${newPath}${hash}`);
  }

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">TL</a>

          <ul className="nav-links">
            <li><a href="#about">{t('n_about')}</a></li>
            <li><a href="#skills">{t('n_skills')}</a></li>
            <li><a href="#experience">{t('n_exp')}</a></li>
            <li><a href="#projects">{t('n_proj')}</a></li>
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
            <a href="#contact" className="nav-cta">{t('n_contact')}</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
