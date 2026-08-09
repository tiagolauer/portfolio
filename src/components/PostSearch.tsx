'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Lang } from '@/i18n/strings';

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
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
  };
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export function matchesQuery(post: PostSummary, query: string): boolean {
  const needle = normalize(query.trim());
  if (!needle) return true;

  const haystack = normalize([post.title, post.description, ...post.tags].join(' '));
  return needle.split(/\s+/).every((term) => haystack.includes(term));
}

export function PostSearch({ posts, lang, labels }: PostSearchProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(
    () => posts.filter((post) => matchesQuery(post, query)),
    [posts, query]
  );

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

      {results.length === 0 ? (
        <p className="blog-empty">{labels.noResults}</p>
      ) : (
        <ul className="post-list">
          {results.map((post) => (
            <li key={post.slug}>
              <Link href={`/${lang}/blog/${post.slug}`} className="post-card">
                <time className="post-date" dateTime={post.date}>{post.formattedDate}</time>
                <h2 className="post-card-title">{post.title}</h2>
                <p className="post-card-desc">{post.description}</p>
                <div className="post-card-foot">
                  <span className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </span>
                  <span className="proj-link">{labels.read}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
