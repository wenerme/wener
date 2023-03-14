set session authorization auth;
select current_user;

create schema if not exists auth;
set search_path to auth,public;

create table if not exists app_user
(
    id                    text not null default public.gen_ulid() primary key,
    uid                   uuid not null default public.gen_random_uuid() unique,
    eid                   text null unique,
    created_at            timestamptz   default current_timestamp,
    updated_at            timestamptz   default current_timestamp,
    deleted_at            timestamptz,

    login_name            text, -- aka username
    password              text, -- password based login
    realm                 text, -- support multi realm
    display_name          text,
    email                 text unique,
    email_verified        timestamptz,
    avatar_url            text,

    phone_number          text unique,
    phone_number_verified timestamptz,
    -- 扩展
    raw                   jsonb,
    unique (realm, login_name),
    unique (realm, email)
);
comment on table app_user is '用户';
comment on column app_user.login_name is '登录名';
comment on column app_user.password is '密码';
comment on column app_user.realm is '域';
comment on column app_user.display_name is '显示名';
comment on column app_user.email is '邮箱';
comment on column app_user.email_verified is '邮箱验证时间';
comment on column app_user.avatar_url is '头像';
comment on column app_user.phone_number is '手机号';
comment on column app_user.phone_number_verified is '手机号验证时间';



create table if not exists account
(
    id                       text not null default public.gen_ulid() primary key,
    uid                      uuid not null default public.gen_random_uuid() unique,
    created_at               timestamptz   default current_timestamp,
    updated_at               timestamptz   default current_timestamp,
    deleted_at               timestamptz,

    type                     text not null, -- oauth | email | credentials
    provider_id              text not null,
    provider_type            text,
    provider_client_id       text,
    provider_client_app_id   text,          -- e.g. agent id for wecom
    provider_account_id      text not null,
    access_token             text,
    expires_at               timestamptz,
    expires_in               int,
    refresh_token            text,
    refresh_token_expires_at timestamptz,   -- extension
    token_type               text,
    scope                    text,
    id_token                 text,
    session_state            text,

    user_id                  text references app_user (id) on delete cascade,

    -- 扩展
    -- union_id            text,
    raw                      jsonb,
    unique (provider_id, provider_account_id)
);
comment on table account is '账号';


create table if not exists session
(
    id              text        not null default public.gen_ulid() primary key,
    uid             uuid        not null default public.gen_random_uuid() unique,
    created_at      timestamptz          default current_timestamp,
    updated_at      timestamptz          default current_timestamp,
    deleted_at      timestamptz,

    expires_at      timestamptz not null,
    session_token   text        not null unique,
    user_id         text references app_user (id) on delete cascade,

    -- 扩展
    user_agent      text,
    last_user_agent text
);
comment on table session is '会话';

create table if not exists verification_token
(
    id         text        not null default public.gen_ulid() primary key,
    uid        uuid        not null default public.gen_random_uuid() unique,
    created_at timestamptz          default current_timestamp,
    updated_at timestamptz          default current_timestamp,
    deleted_at timestamptz,

    token      text        not null,
    expires_at timestamptz not null,
    identifier text        not null,
    unique (token, identifier)
);
comment on table verification_token is '验证令牌';


-- 通过数据配置 Provider
-- create table if not exists provider
-- (
--     id            text    not null default public.gen_ulid() primary key,
--     uid           uuid    not null default public.gen_random_uuid() unique,
--     created_at    timestamptz      default current_timestamp,
--     updated_at    timestamptz      default current_timestamp,
--     deleted_at    timestamptz,
--
--     provider_type text    not null,
--     provider_id   text    not null default id,
--     display_name  text    not null,
--     client_id     text,
--     client_secret text,
--     enabled       boolean not null default true,
--     client_config jsonb   not null default '{}'::jsonb
-- );
