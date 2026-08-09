create extension if not exists pgcrypto with schema extensions;

create table if not exists public.post_views (
  slug text not null,
  lang text not null,
  views bigint not null default 0,
  primary key (slug, lang)
);

create table if not exists public.post_view_hits (
  slug text not null,
  lang text not null,
  visitor_hash text not null,
  first_seen timestamptz not null default now(),
  primary key (slug, lang, visitor_hash)
);

alter table public.post_views enable row level security;
alter table public.post_view_hits enable row level security;

drop policy if exists post_views_public_read on public.post_views;
create policy post_views_public_read
  on public.post_views
  for select
  to anon, authenticated
  using (true);

create or replace function public.increment_post_view(p_slug text, p_lang text)
returns bigint
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_headers json;
  v_hash text;
  v_views bigint;
begin
  if p_lang is null or p_lang not in ('en', 'pt') then
    raise exception 'invalid lang';
  end if;

  if p_slug is null or p_slug !~ '^[a-z0-9][a-z0-9-]{0,79}$' then
    raise exception 'invalid slug';
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

  insert into public.post_view_hits (slug, lang, visitor_hash)
  values (p_slug, p_lang, v_hash)
  on conflict do nothing;

  if found then
    insert into public.post_views (slug, lang, views)
    values (p_slug, p_lang, 1)
    on conflict (slug, lang) do update set views = post_views.views + 1;
  end if;

  select views into v_views
  from public.post_views
  where slug = p_slug and lang = p_lang;

  return coalesce(v_views, 0);
end;
$$;

revoke all on function public.increment_post_view(text, text) from public;
grant execute on function public.increment_post_view(text, text) to anon, authenticated;
