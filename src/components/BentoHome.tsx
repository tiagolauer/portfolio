'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLang } from '@/contexts/LangContext';
import { ENTER_FROM, ENTER_TO, HOVER_LIFT, PRESS, SPRING_SNAPPY, SPRING_SOFT } from '@/lib/motion';

const MotionLink = motion.create(Link);
const CLOCK_REFRESH_MS = 30_000;

const STACK_TILES = [
  { mark: 'RN', label: 'React Native', hue: 'blue' },
  { mark: 'TS', label: 'TypeScript', hue: 'cyan' },
  { mark: '.N', label: '.NET / C#', hue: 'violet' },
  { mark: 'V3', label: 'Vue 3', hue: 'green' },
] as const;

const WHAT_ICONS = [
  <svg key="w1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18.5h2" /></svg>,
  <svg key="w2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></svg>,
  <svg key="w3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></svg>,
  <svg key="w4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19a4.5 4.5 0 1 0-1.03-8.88A6 6 0 1 0 6 16.5" /><path d="M12 13v8M9 18.5 12 21l3-2.5" /></svg>,
  <svg key="w5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16.5 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" /></svg>,
];

function useClock(locale: string) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat(locale, {
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'America/Sao_Paulo',
        }).format(new Date())
      );
    format();
    const id = setInterval(format, CLOCK_REFRESH_MS);
    return () => clearInterval(id);
  }, [locale]);

  return time;
}

const cardMotion = (delay: number) => ({
  initial: ENTER_FROM,
  animate: ENTER_TO,
  transition: { ...SPRING_SOFT, delay },
});

const cardGestures = {
  whileHover: { ...HOVER_LIFT, transition: SPRING_SNAPPY },
  whileTap: { ...PRESS, transition: SPRING_SNAPPY },
};

export function BentoHome() {
  const { lang, t } = useLang();
  const time = useClock(lang === 'pt' ? 'pt-BR' : 'en-US');
  const whatItems = ['bh_w1', 'bh_w2', 'bh_w3', 'bh_w4', 'bh_w5'] as const;

  return (
    <main className="bento-page">
      <div className="wrap">
        <motion.div
          className="bento-frame"
          initial={{ opacity: 0, scale: 0.985, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={SPRING_SOFT}
        >
          <div className="bento-topbar">
            <div className="bento-topbar-left">
              <span className="bento-topbar-name">Tiago Estrela Lauer</span>
              <span className="bento-topbar-role">{t('bh_role')}</span>
            </div>
            <div className="bento-topbar-right">
              <span>Brusque, Brazil{time ? ` · ${time}` : ''}</span>
              <span className="bento-status-dot" aria-label={t('bh_avail_t')} />
            </div>
          </div>

          <div className="bento-masthead">
            <h1 className="bento-name">
              <span aria-hidden="true" className="bento-name-ghost">Tiago<br />Lauer</span>
              <span>Tiago</span>
              <span>Lauer</span>
            </h1>
            <p className="bento-quote">{t('h_tagline')}</p>
          </div>

          <div className="bento-grid">
            <MotionLink href={`/${lang}/about`} className="bento-card b-about" data-accent="blue" {...cardMotion(0.08)} {...cardGestures}>
              <div className="bento-card-head"><span className="bento-dot" /><h2>{t('n_about')}</h2></div>
              <p className="bento-card-body">{t('bh_about_d')}</p>
              <span className="bento-arrow" aria-hidden="true">↗</span>
            </MotionLink>

            <MotionLink href={`/${lang}/open-source`} className="bento-card b-os" data-accent="violet" {...cardMotion(0.14)} {...cardGestures}>
              <div className="bento-card-head"><span className="bento-dot" /><h2>{t('n_os')}</h2></div>
              <p className="bento-card-body">{t('bh_os_d')}</p>
              <span className="bento-arrow" aria-hidden="true">↗</span>
            </MotionLink>

            <motion.div className="bento-card b-contact" data-accent="green" {...cardMotion(0.2)}>
              <div className="bento-card-head"><span className="bento-dot" /><h2>{t('n_contact')}</h2></div>
              <div className="bento-contact-list">
                <a href="https://github.com/tiagolauer" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" /></svg>
                  @tiagolauer
                </a>
                <a href="https://linkedin.com/in/tiagolauer" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  /in/tiagolauer
                </a>
                <a href="mailto:tiagoestrelalauer@gmail.com">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {t('bh_contact_note')}
                </a>
              </div>
              <Link href={`/${lang}/contact`} className="bento-arrow" aria-label={t('n_contact')}>↗</Link>
            </motion.div>

            <motion.div
              className="bento-card bento-card-photo b-photo"
              {...cardMotion(0.26)}
              whileHover={{ scale: 1.015, transition: SPRING_SNAPPY }}
            >
              <Image
                src="https://avatars.githubusercontent.com/u/91141923?v=4"
                alt="Tiago Estrela Lauer"
                fill
                sizes="(max-width: 600px) 100vw, 320px"
                unoptimized
                priority
              />
            </motion.div>

            <MotionLink href={`/${lang}/skills`} className="bento-card b-stack" data-accent="amber" {...cardMotion(0.32)} {...cardGestures}>
              <div className="bento-card-head"><span className="bento-dot" /><h2>{t('n_skills')}</h2></div>
              <div className="bento-tiles">
                {STACK_TILES.map(({ mark, label, hue }) => (
                  <div key={mark} className="bento-tile" data-hue={hue}>
                    <span className="bento-tile-mark">{mark}</span>
                    <span className="bento-tile-lbl">{label}</span>
                  </div>
                ))}
              </div>
              <span className="bento-arrow" aria-hidden="true">↗</span>
            </MotionLink>

            <MotionLink href={`/${lang}/experience`} className="bento-card b-what" data-accent="pink" {...cardMotion(0.38)} {...cardGestures}>
              <div className="bento-card-head"><span className="bento-dot" /><h2>{t('bh_what_t')}</h2></div>
              <div className="bento-what">
                {whatItems.map((key, i) => (
                  <div key={key} className="bento-what-item">
                    <span className="bento-what-icon">{WHAT_ICONS[i]}</span>
                    <span className="bento-what-lbl">{t(key)}</span>
                  </div>
                ))}
              </div>
              <span className="bento-arrow" aria-hidden="true">↗</span>
            </MotionLink>

            <MotionLink href={`/${lang}/contact`} className="bento-card b-cta" data-accent="cyan" {...cardMotion(0.44)} {...cardGestures}>
              <div className="bento-card-head"><span className="bento-dot bento-dot-pulse" /><h2>{t('bh_avail_t')}</h2></div>
              <p className="bento-card-body">{t('bh_avail_d')}</p>
              <span className="bento-cta-btn">{t('bh_cta')} <span aria-hidden="true">↗</span></span>
            </MotionLink>
          </div>

          <MotionLink
            href={`/${lang}/blog`}
            className="bento-pill"
            {...cardMotion(0.52)}
            whileHover={{ scale: 1.03, transition: SPRING_SNAPPY }}
            whileTap={{ ...PRESS, transition: SPRING_SNAPPY }}
          >
            <span aria-hidden="true" className="bento-pill-star">✳</span>
            {t('bh_blog_pill')}
            <span aria-hidden="true">↗</span>
          </MotionLink>
        </motion.div>
      </div>
    </main>
  );
}
