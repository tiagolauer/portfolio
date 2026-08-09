'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Lang } from '@/i18n/strings';

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  series?: string;
  date: string;
  formattedDate: string;
  tags: readonly string[];
}

interface PostSearchProps {
  posts: readonly PostSummary[];
  lang: Lang;
  labels: {
    search: string;
    noResults: string;
    read: string;
    misc: string;
    seriesBack: string;
    postOne: string;
    postMany: string;
  };
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function matchesQuery(post: PostSummary, query: string): boolean {
  const needle = normalize(query.trim());
  if (!needle) return true;

  const haystack = normalize(
    [post.title, post.description, post.series ?? '', ...post.tags].join(' ')
  );
  return needle.split(/\s+/).every((term) => haystack.includes(term));
}

function groupBySeries(
  posts: readonly PostSummary[],
  miscLabel: string
): [string, PostSummary[]][] {
  const groups = new Map<string, PostSummary[]>();
  for (const post of posts) {
    const key = post.series ?? miscLabel;
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(post);
    } else {
      groups.set(key, [post]);
    }
  }
  return [...groups.entries()];
}

function PostList({
  posts,
  lang,
  readLabel,
}: {
  posts: readonly PostSummary[];
  lang: Lang;
  readLabel: string;
}) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/${lang}/blog/${post.slug}`} className="post-card">
            <time className="post-date" dateTime={post.date}>{post.formattedDate}</time>
            <h3 className="post-card-title">{post.title}</h3>
            <p className="post-card-desc">{post.description}</p>
            <div className="post-card-foot">
              <span className="post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </span>
              <span className="proj-link">{readLabel}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PostSearch({ posts, lang, labels }: PostSearchProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const groups = useMemo(() => groupBySeries(posts, labels.misc), [posts, labels.misc]);

  const searching = query.trim().length > 0;
  const results = useMemo(
    () => (searching ? groupBySeries(posts.filter((p) => matchesQuery(p, query)), labels.misc) : []),
    [posts, query, searching, labels.misc]
  );

  const selectedGroup = groups.find(([series]) => series === selected);

  return (
    <>
      <input
        type="search"
        className="post-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={labels.search}
        aria-label={labels.search}
        autoComplete="off"
      />

      {searching ? (
        results.length === 0 ? (
          <p className="blog-empty">{labels.noResults}</p>
        ) : (
          results.map(([series, seriesPosts]) => (
            <section key={series} className="post-series">
              <h2 className="series-title">{series}</h2>
              <PostList posts={seriesPosts} lang={lang} readLabel={labels.read} />
            </section>
          ))
        )
      ) : selectedGroup ? (
        <section className="post-series">
          <button className="series-back" onClick={() => setSelected(null)}>
            {labels.seriesBack}
          </button>
          <h2 className="series-title">{selectedGroup[0]}</h2>
          <PostList posts={selectedGroup[1]} lang={lang} readLabel={labels.read} />
        </section>
      ) : (
        <ul className="post-list">
          {groups.map(([series, seriesPosts]) => (
            <li key={series}>
              <button className="post-card series-card" onClick={() => setSelected(series)}>
                <h2 className="post-card-title">{series}</h2>
                <div className="post-card-foot">
                  <span className="series-count">
                    {seriesPosts.length} {seriesPosts.length === 1 ? labels.postOne : labels.postMany}
                    {' · '}
                    {seriesPosts[0].formattedDate}
                  </span>
                  <span className="proj-link">→</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
