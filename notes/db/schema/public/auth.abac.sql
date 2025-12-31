create table app_user
(
  id           text        not null default public.gen_ulid() primary key,
  uid          uuid        not null default gen_random_uuid() unique,
  created_at   timestamptz not null default current_timestamp,
  updated_at   timestamptz not null default current_timestamp,

  username     text unique,
  display_name text
);

create table app_resource
(
  id          text        not null default public.gen_ulid() primary key,
  uid         uuid        not null default gen_random_uuid() unique,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,

  name        text        not null unique,
  description text,
  attributes  jsonb       not null default '{}'
);

create table app_action
(
  id          text        not null default public.gen_ulid() primary key,
  uid         uuid        not null default gen_random_uuid() unique,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,

  name        text        not null unique,
  description text,
  attributes  jsonb       not null default '{}'
);

create table app_policy
(
  id          text        not null default public.gen_ulid() primary key,
  uid         uuid        not null default gen_random_uuid() unique,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,

  name        text        not null unique,
  description text,
  attributes  jsonb       not null default '{}'
);
