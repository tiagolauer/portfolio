'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/i18n/strings';
import { addComment, listComments, type BlogComment } from '@/lib/comments';
import { AUTHOR_NAME, repliesFor } from '@/content/replies';

const DATE_LOCALE: Record<Lang, string> = { en: 'en-US', pt: 'pt-BR' };

interface CommentLabels {
  title: string;
  namePlaceholder: string;
  bodyPlaceholder: string;
  send: string;
  sending: string;
  empty: string;
  error: string;
  authorBadge: string;
}

interface CommentSectionProps {
  slug: string;
  lang: Lang;
  labels: CommentLabels;
}

function formatCommentDate(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(DATE_LOCALE[lang], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function CommentSection({ slug, lang, labels }: CommentSectionProps) {
  const [comments, setComments] = useState<BlogComment[] | null>(null);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    listComments(slug, lang).then((result) => {
      if (!cancelled && result.ok) setComments(result.comments);
    });
    return () => { cancelled = true; };
  }, [slug, lang]);

  if (comments === null) return null;

  const canSend = name.trim().length > 0 && body.trim().length > 0 && !sending;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSend) return;

    setSending(true);
    setFailed(false);

    const result = await addComment(slug, lang, name.trim(), body.trim());
    setSending(false);

    if (!result.ok) {
      setFailed(true);
      return;
    }

    setComments([...comments, result.comment]);
    setBody('');
  };

  return (
    <section className="comments">
      <h2 className="comments-title">{labels.title}</h2>

      {comments.length === 0 ? (
        <p className="comments-empty">{labels.empty}</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment-head">
                <span className="comment-name">{comment.author_name}</span>
                <span className="comment-date">{formatCommentDate(comment.created_at, lang)}</span>
              </div>
              <p className="comment-body">{comment.body}</p>

              {repliesFor(comment.id).map((reply) => (
                <div key={`${reply.commentId}-${reply.date}`} className="comment-reply">
                  <div className="comment-head">
                    <span className="comment-name">{AUTHOR_NAME}</span>
                    <span className="author-badge">{labels.authorBadge}</span>
                    <span className="comment-date">{formatCommentDate(reply.date, lang)}</span>
                  </div>
                  <p className="comment-body">{reply.body}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="comment-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={labels.namePlaceholder}
          aria-label={labels.namePlaceholder}
          maxLength={40}
          autoComplete="nickname"
        />
        <textarea
          className="comment-input comment-textarea"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={labels.bodyPlaceholder}
          aria-label={labels.bodyPlaceholder}
          maxLength={2000}
          rows={4}
        />
        {failed && <p className="comment-error">{labels.error}</p>}
        <button type="submit" className="btn btn-fill" disabled={!canSend}>
          {sending ? labels.sending : labels.send}
        </button>
      </form>
    </section>
  );
}
