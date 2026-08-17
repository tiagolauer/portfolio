'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { useLang } from '@/contexts/LangContext';
import { useCountUp } from '@/hooks/useCountUp';
import { findProject, PROJECTS } from '@/content/projects';
import { ENTER_FROM, ENTER_TO, HOVER_LIFT, PRESS, SPRING_SNAPPY, SPRING_SOFT } from '@/lib/motion';
const CONTACT_EMAIL = 'tiagoestrelalauer@gmail.com';

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

const ABOUT_PRINCIPLES = [
  { title: 'ab_how1t' as const, desc: 'ab_how1d' as const },
  { title: 'ab_how2t' as const, desc: 'ab_how2d' as const },
  { title: 'ab_how3t' as const, desc: 'ab_how3d' as const },
];

const ABOUT_FACTS = [
  { label: 'ab_f1l' as const, value: 'ab_f1v' as const },
  { label: 'ab_f2l' as const, value: 'ab_f2v' as const },
  { label: 'ab_f3l' as const, value: 'ab_f3v' as const },
];

export function About() {
  const { lang, t } = useLang();
  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <h1 className="section-title">{t('s_about')}</h1>
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
              <AnimatedStat rawVal={6} suffix="+" label={t('st_yrs')} />
              <AnimatedStat rawVal={5} suffix=""  label={t('st_co')} />
            </div>
          </Reveal>
        </div>

        <Reveal className="about-extra">
          <p>{t('about_p2')}</p>
          <p>{t('about_p3')}</p>
        </Reveal>

        <Reveal className="section-head about-subhead">
          <h2 className="section-title">{t('ab_facts')}</h2>
        </Reveal>
        <div>
          {ABOUT_FACTS.map(({ label, value }, i) => (
            <Reveal key={label} delay={i * 55} className="skill-row">
              <span className="skill-cat">{t(label)}</span>
              <span className="skill-items">{t(value)}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="about-cta">
          <Link href={`/${lang}/experience`} className="btn btn-fill">{t('ab_cta_exp')}</Link>
          <Link href={`/${lang}/contact`} className="hero-cta-secondary">{t('ab_cta_contact')}</Link>
        </Reveal>
      </div>
    </section>
  );
}

const SKILLS = [
  { key: 'sk_mob' as const, items: 'React Native · Expo · Redux Toolkit · Zustand · React Navigation · Firebase · EAS Build' },
  { key: 'sk_fe'  as const, items: 'Vue.js 3 · Angular · TypeScript · TailwindCSS · Vuetify · JavaScript ES6+' },
  { key: 'sk_be'  as const, items: '.NET / C# · ASP.NET Core · Node.js · Express · Supabase · PostgreSQL · RESTful APIs' },
  { key: 'sk_cd'  as const, items: 'AWS (EC2, S3, Lambda) · Docker · GitHub Actions · Azure DevOps · CI/CD · Coolify' },
  { key: 'sk_tl'  as const, items: 'Git · Figma · Sentry · Postman · Web Workers · HTML Canvas · Agile / Scrum' },
];

export function Skills() {
  const { t } = useLang();
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal className="section-head">
          <h1 className="section-title">{t('s_skills')}</h1>
        </Reveal>
        <div>
          {SKILLS.map(({ key, items }, i) => (
            <Reveal key={key} delay={i * 55} className="skill-row">
              <span className="skill-cat">{t(key)}</span>
              <span className="skill-items">{items}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="section-head about-subhead">
          <h2 className="section-title">{t('ab_how')}</h2>
        </Reveal>
        <div>
          {ABOUT_PRINCIPLES.map(({ title, desc }, i) => (
            <Reveal key={title} delay={i * 55} className="skill-row">
              <span className="skill-cat">{t(title)}</span>
              <span className="skill-items">{t(desc)}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="section-head about-subhead">
          <h2 className="section-title">{t('sk_results')}</h2>
        </Reveal>
        <Reveal className="about-stats skills-stats">
          <AnimatedStat rawVal={995} suffix="%" divideBy={10} decimals={1} label={t('st_up')} />
          <AnimatedStat rawVal={10}  suffix="K+" label={t('st_usr')} />
        </Reveal>
      </div>
    </section>
  );
}

const JOBS = [
  {
    company: 'ohubdev',
    roleKey: 'r_ohub' as const,
    period: ['Feb 2026', 'Jun 2026'],
    loc: 'Balneário Camboriú, Brazil',
    highlights: ['ohub1', 'ohub2', 'ohub3', 'ohub4', 'ohub5'] as const,
    stack: ['.NET', 'C#', 'ASP.NET Core', 'Hot Chocolate', 'GraphQL', 'Azure DevOps', 'Docker', 'Coolify'],
  },
  {
    company: 'H2K',
    roleKey: 'r_h2k' as const,
    period: ['Jul 2025', 'Feb 2026'],
    loc: 'Brusque, Brazil',
    highlights: ['h2k1', 'h2k2', 'h2k3', 'h2k4', 'h2k5'] as const,
    stack: ['React Native', 'Expo', 'TypeScript', 'GraphQL', 'Apollo Client', 'Firebase', 'GitHub Actions', 'EAS Build'],
  },
  {
    company: 'Beeasy Digital',
    roleKey: 'r_bee' as const,
    period: ['Feb 2025', 'Jan 2026'],
    loc: 'São Paulo, Brazil',
    highlights: ['bee1', 'bee2', 'bee3'] as const,
    stack: ['Vue.js', 'Vue 3', 'TypeScript', 'GraphQL', 'Apollo Client', 'Web Workers'],
  },
  {
    company: '株式会社DJIN Tech Solutions',
    roleKey: 'r_djin' as const,
    period: ['Aug 2023', 'Apr 2025'],
    loc: 'Remote · International (APAC)',
    highlights: ['djin1', 'djin2', 'djin3', 'djin4'] as const,
    stack: ['Vue.js', 'Nuxt.js', 'React Native', 'GraphQL', 'C#', '.NET', 'Web Workers', 'HTML Canvas'],
  },
  {
    company: 'Bravuserp Sistemas',
    roleKey: 'r_brav' as const,
    period: ['Feb 2022', 'Aug 2023'],
    loc: 'Balneário Camboriú, Brazil',
    highlights: ['brav1', 'brav2'] as const,
    stack: ['C#', '.NET', 'SQL', 'QA', 'ERP/POS'],
  },
  {
    company: 'Freelance',
    roleKey: 'r_free' as const,
    period: ['Jan 2019', 'Feb 2022'],
    loc: 'Remote · Brazil',
    highlights: ['free1', 'free2'] as const,
    stack: ['React Native', 'TypeScript', 'Node.js', 'Stripe', 'Pagar.me', 'WhatsApp Business', 'Correios'],
  },
] as const;

export function Experience() {
  const { t } = useLang();
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal className="section-head">
          <h1 className="section-title">{t('s_exp')}</h1>
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

interface ProjCardProps {
  href: string;
  label: string;
  name: string;
  desc: string;
  lang: string;
  linkText: string;
  delay?: number;
}

const MotionLink = motion.create(Link);

function ProjCard({ href, label, name, desc, lang: techLang, linkText, delay = 0 }: ProjCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <MotionLink
      ref={ref}
      href={href}
      className="proj-card"
      initial={ENTER_FROM}
      animate={inView ? ENTER_TO : ENTER_FROM}
      transition={{ ...SPRING_SOFT, delay: delay / 1000 }}
      whileHover={{ ...HOVER_LIFT, transition: SPRING_SNAPPY }}
      whileTap={{ ...PRESS, transition: SPRING_SNAPPY }}
    >
      <div className="proj-label">{label}</div>
      <h3 className="proj-name">{name}</h3>
      <p className="proj-desc">{desc}</p>
      <div className="proj-foot">
        <span className="proj-lang">{techLang}</span>
        <span className="proj-link">{linkText}</span>
      </div>
    </MotionLink>
  );
}

const GITHUB_USER = 'tiagolauer';
const FEATURED_REPOS = ['pieces-to-agents', 'owlsql'];
const NPM_PACKAGES: Record<string, string> = {
  'pieces-to-agents': 'pieces-to-agents',
  owlsql: '@owlsql/core',
};

const LOCAL_REPOS: GithubRepo[] = PROJECTS.map((project, index) => ({
  id: index,
  name: project.name,
  html_url: project.links[0]?.href ?? '#',
  description: project.text.en.tagline,
  language: project.language,
  stargazers_count: 0,
  fork: false,
}));

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

function featuredRank(repo: GithubRepo) {
  return FEATURED_REPOS.indexOf(repo.name.toLowerCase());
}

export function OpenSource() {
  const { lang, t } = useLang();
  const [repos, setRepos] = useState<GithubRepo[] | null>(null);
  const [downloads, setDownloads] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      Object.entries(NPM_PACKAGES).map(([repo, pkg]) =>
        fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data: { downloads?: number } | null) =>
            data?.downloads ? ([repo, data.downloads] as const) : null
          )
          .catch(() => null)
      )
    ).then((entries) => {
      if (!cancelled) setDownloads(Object.fromEntries(entries.filter(Boolean) as (readonly [string, number])[]));
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
      .then((res) => (res.ok ? (res.json() as Promise<GithubRepo[]>) : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        setRepos(
          data
            .filter((repo) => featuredRank(repo) >= 0)
            .sort((a, b) => featuredRank(a) - featuredRank(b))
        );
      })
      .catch(() => {
        if (cancelled) return;
        setRepos(LOCAL_REPOS);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="open-source">
      <div className="wrap">
        <Reveal className="section-head">
          <h1 className="section-title">{t('s_os')}</h1>
        </Reveal>
        {!repos && <p className="proj-desc">{t('os_loading')}</p>}
        {repos && repos.length > 0 && (
          <div className="proj-grid">
            {repos.map((repo, i) => {
              const slug = repo.name.toLowerCase();
              const project = findProject(slug);
              const weekly = downloads[slug];
              const stats = weekly
                ? `★ ${repo.stargazers_count} · ${weekly.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US')} ${t('p_npm')}`
                : repo.stargazers_count > 0
                  ? `★ ${repo.stargazers_count}`
                  : project?.status[lang] ?? t('os_no_desc');
              return (
                <ProjCard
                  key={repo.id}
                  href={project ? `/${lang}/open-source/${slug}` : repo.html_url}
                  label={repo.language ?? 'Code'}
                  name={repo.name}
                  desc={project?.text[lang].tagline ?? repo.description ?? t('os_no_desc')}
                  lang={stats}
                  linkText={t('p_details')}
                  delay={i * 80}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="contact-grid">
          <div>
            <h1 className="contact-heading">{t('c_head')}</h1>
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

export function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap">
        <div className="footer-inner">
          <span className="footer-text">{t('ft_copy')}</span>
          <span className="footer-text">Brusque, Brazil</span>
        </div>
      </div>
    </footer>
  );
}
