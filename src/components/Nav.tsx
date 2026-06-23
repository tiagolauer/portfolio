'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/contexts/LangContext';

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

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
                onClick={() => setLang('en')}
              >EN</button>
              <button
                className={`lang-btn${lang === 'pt' ? ' active' : ''}`}
                onClick={() => setLang('pt')}
              >PT</button>
            </div>
            <a href="#contact" className="nav-cta">{t('n_contact')}</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
