'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/contexts/LangContext';
import { useCountUp } from '@/hooks/useCountUp';

const EASE = [0.16, 1, 0.3, 1] as const;
const CONTACT_EMAIL = 'tiagoestrelalauer@gmail.com';

/* ── Hero ── */
const NAME_WORDS = [
  { text: 'TIAGO',   highlight: false },
  { text: 'ESTRELA', highlight: true  },
  { text: 'LAUER',   highlight: false },
];

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const wordItem = {
  hidden:  { y: '105%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

function Hero() {
  const { t } = useLang();

  return (
    <section id="hero">
      <div className="wrap">
        <motion.div
          className="hero-meta-line"
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {t('h_avail')}
        </motion.div>

        <motion.h1
          className="hero-name"
          variants={wordContainer}
          initial="hidden"
          animate="visible"
        >
          {NAME_WORDS.map(({ text, highlight }) => (
            <span key={text} style={{ overflow: 'hidden', display: 'block' }}>
              <motion.span
                variants={wordItem}
                style={{ display: 'block' }}
                className={highlight ? 'hl' : undefined}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="hero-bottom"
          custom={0.72}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div>
            <p className="hero-tagline">{t('h_tagline')}</p>
            <p className="hero-location">{t('h_loc')}</p>
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-fill">{t('h_cta1')}</a>
            <a href="#contact"  className="btn btn-outline">{t('h_cta2')}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Animated stat ── */
interface StatProps {
  rawVal: number;
  suffix: string;
  label: string;
  divideBy?: number;
  decimals?: number;
}

function AnimatedStat({ rawVal, suffix, label, divideBy = 1, decimals = 0 }: StatProps) {
  const { count, ref } = useCountUp(rawVal, 1400);
  const display = decimals > 0 ? (count / divideBy).toFixed(decimals) : count / divideBy;
  return (
    <div className="stat">
      <div className="stat-val" ref={ref as React.Ref<HTMLDivElement>}>
        {display}{suffix}
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}

/* ── About ── */
function About() {
  const { t } = useLang();
  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title">{t('s_about')}</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={80}>
            <Image
              src="https://avatars.githubusercontent.com/u/91141923?v=4"
              alt="Tiago Estrela Lauer"
              width={72}
              height={72}
              className="about-avatar"
              unoptimized
              loading="lazy"
            />
            <p className="about-body">{t('about_body')}</p>
          </Reveal>
          <Reveal delay={160}>
            <div className="about-stats">
              <AnimatedStat rawVal={6}    suffix="+"   label={t('st_yrs')} />
              <AnimatedStat rawVal={995}  suffix="%" divideBy={10} decimals={1} label={t('st_up')}  />
              <AnimatedStat rawVal={10}   suffix="K+"  label={t('st_usr')} />
              <AnimatedStat rawVal={5}    suffix=""    label={t('st_co')}  />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Skills ── */
const SKILLS = [
  { key: 'sk_mob' as const, items: 'React Native · Expo · Redux Toolkit · Zustand · React Navigation · Firebase · EAS Build' },
  { key: 'sk_fe'  as const, items: 'Vue.js 3 · Angular · TypeScript · TailwindCSS · Vuetify · JavaScript ES6+' },
  { key: 'sk_be'  as const, items: '.NET / C# · ASP.NET Core · Node.js · Express · Supabase · PostgreSQL · RESTful APIs' },
  { key: 'sk_cd'  as const, items: 'AWS (EC2, S3, Lambda) · Docker · GitHub Actions · Azure DevOps · CI/CD · Coolify' },
  { key: 'sk_tl'  as const, items: 'Git · Figma · Sentry · Postman · Web Workers · HTML Canvas · Agile / Scrum' },
];

function Skills() {
  const { t } = useLang();
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title">{t('s_skills')}</h2>
        </Reveal>
        <div>
          {SKILLS.map(({ key, items }, i) => (
            <Reveal key={key} delay={i * 55} className="skill-row">
              <span className="skill-cat">{t(key)}</span>
              <span className="skill-items">{items}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ── */
const JOBS = [
  {
    company: 'ohubdev',
    roleKey: 'r_ohub' as const,
    period: ['Feb 2026', 'Jun 2026'],
    loc: 'Balneário Camboriú, Brazil',
    highlights: ['ohub1', 'ohub2', 'ohub3'] as const,
    stack: ['.NET', 'C#', 'Azure DevOps', 'ASP.NET Core', 'Supabase', 'Docker'],
  },
  {
    company: 'H2K',
    roleKey: 'r_h2k' as const,
    period: ['Jul 2025', 'Feb 2026'],
    loc: 'Brusque, Brazil',
    highlights: ['h2k1', 'h2k2', 'h2k3'] as const,
    stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Firebase', 'Redux Toolkit'],
  },
  {
    company: 'Beeasy Digital',
    roleKey: 'r_bee' as const,
    period: ['Feb 2025', 'Jan 2026'],
    loc: 'São Paulo, Brazil',
    highlights: ['bee1', 'bee2'] as const,
    stack: ['Vue.js 3', 'TypeScript', 'Vuetify', 'TailwindCSS', 'Webpack'],
  },
  {
    company: 'DJIN Tech Solutions',
    roleKey: 'r_djin' as const,
    period: ['Aug 2023', 'Apr 2025'],
    loc: 'Remote · International (APAC)',
    highlights: ['djin1', 'djin2'] as const,
    stack: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Vuetify', 'Web Workers API', 'Node.js'],
  },
  {
    company: 'Bravuserp Sistemas',
    roleKey: 'r_brav' as const,
    period: ['Feb 2022', 'Aug 2023'],
    loc: 'Brusque, Brazil',
    highlights: ['brav1', 'brav2'] as const,
    stack: ['Angular', 'JavaScript', 'HTML5', 'CSS3'],
  },
] as const;

function Experience() {
  const { t } = useLang();
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title">{t('s_exp')}</h2>
        </Reveal>
        <div className="timeline">
          {JOBS.map((job, i) => (
            <Reveal key={job.company} delay={i * 55} className="tl-item">
              <div className="tl-left">
                <div className="tl-period">
                  {job.period.map((line) => <span key={line} style={{ display: 'block' }}>{line}</span>)}
                </div>
                <div className="tl-dot" />
              </div>
              <div>
                <div className="tl-company">{job.company}</div>
                <div className="tl-role">{t(job.roleKey)}</div>
                <div className="tl-loc">{job.loc}</div>
                <ul className="tl-highlights">
                  {job.highlights.map((key) => <li key={key}>{t(key)}</li>)}
                </ul>
                <div className="tl-stack">
                  {job.stack.map((s) => <span key={s} className="badge">{s}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Project card with hover lift ── */
interface ProjCardProps {
  href?: string;
  label: string;
  name: string;
  desc: string;
  lang: string;
  linkText: string;
  delay?: number;
  children?: React.ReactNode;
}

function ProjCard({ href, label, name, desc, lang: techLang, linkText, delay = 0, children }: ProjCardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  const inner = (
    <>
      <div>
        <div className="proj-label">{label}</div>
        <h3 className="proj-name">{name}</h3>
        <p className="proj-desc">{desc}</p>
        <div className="proj-foot">
          <span className="proj-lang">{techLang}</span>
          <span className="proj-link">{linkText}</span>
        </div>
      </div>
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="proj-card"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.65, delay: delay / 1000, ease: EASE }}
        whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="proj-card span-2"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.65, delay: delay / 1000, ease: EASE }}
    >
      {inner}
    </motion.div>
  );
}

/* ── Projects ── */
function Projects() {
  const { t } = useLang();
  return (
    <section id="projects">
      <div className="wrap">
        <Reveal className="section-head">
          <h2 className="section-title">{t('s_proj')}</h2>
        </Reveal>
        <div className="proj-grid">
          <ProjCard
            label={t('p_feat')}
            name={t('p_h2k_name')}
            desc={t('p_h2k_desc')}
            lang="React Native · TypeScript · Expo"
            linkText={t('p_prod')}
          >
            <div className="code-block" aria-hidden="true">
              <div className="cb-line"><span className="cb-n">1</span><span className="cm">{'// 8 200 ms → 340 ms · 96% alloc reduction'}</span></div>
              <div className="cb-line"><span className="cb-n">2</span><span /></div>
              <div className="cb-line"><span className="cb-n">3</span><span><span className="kw">static</span>{' '}<span className="kw">async</span>{' ValueTask '}<span className="fn">BulkSync</span>{'('}</span></div>
              <div className="cb-line"><span className="cb-n">4</span><span>{'  ReadOnlyMemory'}<span className="str">{'<Op>'}</span>{' batch,'}</span></div>
              <div className="cb-line"><span className="cb-n">5</span><span>{'  CancellationToken ct = '}<span className="kw">default</span>{')'}</span></div>
              <div className="cb-line"><span className="cb-n">6</span><span>{'{'}</span></div>
              <div className="cb-line"><span className="cb-n">7</span><span>{'  '}<span className="kw">var</span>{' pool = ArrayPool'}<span className="str">{'<byte>'}</span>{'.Shared;'}</span></div>
              <div className="cb-line"><span className="cb-n">8</span><span>{'  '}<span className="kw">var</span>{' buf  = pool.'}<span className="fn">Rent</span>{'(batch.Length * 256);'}</span></div>
              <div className="cb-line"><span className="cb-n">9</span><span>{'  '}<span className="fn">SerializeAll</span>{'(batch.Span, buf.'}<span className="fn">AsSpan</span>{'()); '}<span className="cm">{'// zero-copy'}</span></span></div>
              <div className="cb-line"><span className="cb-n">10</span><span>{'  '}<span className="kw">await</span>{' _repo.'}<span className="fn">UpsertAsync</span>{'(buf, ct);    '}<span className="cm">{'// 1 round-trip'}</span></span></div>
              <div className="cb-line"><span className="cb-n">11</span><span>{'  pool.'}<span className="fn">Return</span>{'(buf, clearArray: '}<span className="kw">true</span>{');'}</span></div>
              <div className="cb-line"><span className="cb-n">12</span><span>{'}'}</span></div>
            </div>
          </ProjCard>

          <ProjCard
            href="https://moveismm.com.br/"
            label="TypeScript"
            name="Móveis MM"
            desc={t('p_mm_desc')}
            lang="TypeScript · Vercel"
            linkText="Live ↗"
            delay={80}
          />

          <ProjCard
            href="https://ag-algora.vercel.app/"
            label="TypeScript"
            name="AG Algora"
            desc={t('p_algora_desc')}
            lang="TypeScript · Vercel"
            linkText="Live ↗"
            delay={160}
          />
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const { t } = useLang();
  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="contact-grid">
          <div>
            <h2 className="contact-heading">{t('c_head')}</h2>
            <p className="contact-body">{t('c_body')}</p>
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn btn-fill"
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
            >
              {CONTACT_EMAIL}
            </motion.a>
          </div>
          <div className="contact-links">
            {[
              { href: 'https://github.com/tiagolauer', label: 'GitHub', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" /></svg>
              )},
              { href: 'https://linkedin.com/in/tiagolauer', label: 'LinkedIn', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              )},
              { href: `mailto:${CONTACT_EMAIL}`, label: 'Email', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              )},
            ].map(({ href, label, icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="c-link"
                whileHover={{ x: -3, transition: { duration: 0.15 } }}
              >
                {icon}
                {label}
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function Page() {
  const { t } = useLang();
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer>
        <div className="wrap">
          <div className="footer-inner">
            <span className="footer-text">{t('ft_copy')}</span>
            <span className="footer-text">Balneário Camboriú, Brazil</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
