import type { Lang } from '@/i18n/strings';
import { SUPABASE_URL, isSupabaseConfigured, supabaseHeaders } from '@/lib/supabase';

export interface BlogComment {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
}

export type CommentsResult =
  | { ok: true; comments: BlogComment[] }
  | { ok: false };

export type AddCommentResult =
  | { ok: true; comment: BlogComment }
  | { ok: false };

function isBlogComment(value: unknown): value is BlogComment {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.author_name === 'string' &&
    typeof candidate.body === 'string' &&
    typeof candidate.created_at === 'string'
  );
}

export async function listComments(slug: string, lang: Lang): Promise<CommentsResult> {
  if (!isSupabaseConfigured()) return { ok: false };

  const query = new URLSearchParams({
    slug: `eq.${slug}`,
    lang: `eq.${lang}`,
    select: 'id,author_name,body,created_at',
    order: 'created_at.asc',
  });

  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}/rest/v1/blog_comments?${query}`, {
      headers: supabaseHeaders(),
    });
  } catch {
    return { ok: false };
  }

  if (!response.ok) return { ok: false };

  const payload: unknown = await response.json().catch(() => null);
  if (!Array.isArray(payload) || !payload.every(isBlogComment)) return { ok: false };

  return { ok: true, comments: payload };
}

export async function addComment(
  slug: string,
  lang: Lang,
  name: string,
  body: string
): Promise<AddCommentResult> {
  if (!isSupabaseConfigured()) return { ok: false };

  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/add_comment`, {
      method: 'POST',
      headers: supabaseHeaders(),
      body: JSON.stringify({ p_slug: slug, p_lang: lang, p_name: name, p_body: body }),
    });
  } catch {
    return { ok: false };
  }

  if (!response.ok) return { ok: false };

  const payload: unknown = await response.json().catch(() => null);
  if (!isBlogComment(payload)) return { ok: false };

  return { ok: true, comment: payload };
}
