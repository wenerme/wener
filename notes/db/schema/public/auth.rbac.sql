create table app_user
(
  id           text        not null default public.gen_ulid() primary key,
  uid          uuid        not null default gen_random_uuid() unique,
  created_at   timestamptz not null default current_timestamp,
  updated_at   timestamptz not null default current_timestamp,

  username     text unique,
  display_name text
);

create table app_role
(
  id          text        not null default public.gen_ulid() primary key,
  uid         uuid        not null default gen_random_uuid() unique,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,

  name        text        not null unique,
  description text
);

create table app_permission
(
  id          text        not null default public.gen_ulid() primary key,
  uid         uuid        not null default gen_random_uuid() unique,
  created_at  timestamptz not null default current_timestamp,
  updated_at  timestamptz not null default current_timestamp,

  name        text        not null unique,
  description text
);

create table app_user_role
(
  user_id text not null references app_user (id) on delete cascade,
  role_id text not null references app_role (id) on delete cascade,
  primary key (user_id, role_id)
);

create table app_role_permission
(
  role_id       text not null references app_role (id) on delete cascade,
  permission_id text not null references app_permission (id) on delete cascade,
  primary key (role_id, permission_id)
);
