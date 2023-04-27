create table if not exists http_request_log
(
  id               text        not null default public.gen_ulid() primary key,
  uid              uuid        not null default gen_random_uuid() unique,
  created_at       timestamptz not null default current_timestamp,
  updated_at       timestamptz not null default current_timestamp,
  deleted_at       timestamptz,

  method           text        not null,
  origin           text        not null,
  pathname         text        not null,
  url              text        not null,
  query            jsonb                default '{}',
  request_headers  jsonb                default '{}',
  request_payload  jsonb,
  request_body     bytea,
  response_headers jsonb                default '{}',
  response_payload jsonb,
  response_body    bytea,
  -- Response
  content_type     text,
  content_length   int,
  ok               boolean,
  status_code      int,
  status_text      text,
  -- Misc
  duration         int,
  hit              int         not null default 0,
  attributes       jsonb                default '{}'
);

create index if not exists http_request_log_created_at_idx on http_request_log (created_at);
create index if not exists http_request_log_updated_at_idx on http_request_log (updated_at);
create index if not exists http_request_log_url_idx on http_request_log (url);
create index if not exists http_request_log_pathname_idx on http_request_log (pathname);
