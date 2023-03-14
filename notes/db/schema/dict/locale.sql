-- locale_message for i18n translation based on code
create table if not exists locale_message
(
    id         text not null default public.gen_ulid() primary key,
    uid        uuid not null default public.gen_random_uuid() unique,
    created_at timestamptz   default current_timestamp,
    updated_at timestamptz   default current_timestamp,
    deleted_at timestamptz,

    code       text not null unique,
    content    text not null default '', -- e.g. 'Hello {{name}}!'
    locale     jsonb         default '{}'
);