create table if not exists public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  lang text not null,
  author_name text not null,
  body text not null,
  visitor_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_post_idx
  on public.blog_comments (slug, lang, created_at);

alter table public.blog_comments enable row level security;

drop policy if exists blog_comments_public_read on public.blog_comments;
create policy blog_comments_public_read
  on public.blog_comments
  for select
  to anon, authenticated
  using (true);

revoke select on public.blog_comments from anon, authenticated;
grant select (id, slug, lang, author_name, body, created_at)
  on public.blog_comments to anon, authenticated;

create or replace function public.add_comment(
  p_slug text,
  p_lang text,
  p_name text,
  p_body text
)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_headers json;
  v_hash text;
  v_recent int;
  v_row public.blog_comments;
begin
  if p_lang is null or p_lang not in ('en', 'pt') then
    raise exception 'invalid lang';
  end if;

  if p_slug is null or p_slug !~ '^[a-z0-9][a-z0-9-]{0,79}$' then
    raise exception 'invalid slug';
  end if;

  if p_name is null or length(btrim(p_name)) < 1 or length(p_name) > 40 then
    raise exception 'invalid name';
  end if;

  if p_body is null or length(btrim(p_body)) < 1 or length(p_body) > 2000 then
    raise exception 'invalid body';
  end if;

  if p_name ~* 'tiago\s*(estrela\s*)?lauer' then
    raise exception 'reserved name';
  end if;

  v_headers := nullif(current_setting('request.headers', true), '')::json;

  v_hash := encode(
    digest(
      coalesce(v_headers ->> 'x-forwarded-for', 'unknown')
        || '|' || coalesce(v_headers ->> 'user-agent', 'unknown'),
      'sha256'
    ),
    'hex'
  );

  select count(*) into v_recent
  from public.blog_comments
  where visitor_hash = v_hash
    and created_at > now() - interval '10 minutes';

  if v_recent >= 5 then
    raise exception 'rate limited';
  end if;

  insert into public.blog_comments (slug, lang, author_name, body, visitor_hash)
  values (p_slug, p_lang, btrim(p_name), btrim(p_body), v_hash)
  returning * into v_row;

  return json_build_object(
    'id', v_row.id,
    'author_name', v_row.author_name,
    'body', v_row.body,
    'created_at', v_row.created_at
  );
end;
$$;

revoke all on function public.add_comment(text, text, text, text) from public;
grant execute on function public.add_comment(text, text, text, text) to anon, authenticated;
