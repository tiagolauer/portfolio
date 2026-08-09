import type { Lang } from '@/i18n/strings';
import { SUPABASE_URL, isSupabaseConfigured, supabaseHeaders } from '@/lib/supabase';

export enum ViewsError {
  NotConfigured = 'not-configured',
  Network = 'network',
  Rejected = 'rejected',
  BadPayload = 'bad-payload',
}

export type ViewsResult =
  | { ok: true; views: number }
  | { ok: false; error: ViewsError };

export async function registerPostView(slug: string, lang: Lang): Promise<ViewsResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: ViewsError.NotConfigured };
  }

  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_post_view`, {
      method: 'POST',
      headers: supabaseHeaders(),
      body: JSON.stringify({ p_slug: slug, p_lang: lang }),
    });
  } catch {
    return { ok: false, error: ViewsError.Network };
  }

  if (!response.ok) return { ok: false, error: ViewsError.Rejected };

  const payload: unknown = await response.json().catch(() => null);
  if (typeof payload !== 'number') return { ok: false, error: ViewsError.BadPayload };

  return { ok: true, views: payload };
}
