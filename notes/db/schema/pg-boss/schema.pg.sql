-- https://github.com/timgit/pg-boss/blob/master/src/plans.js
-- https://github.com/timgit/pg-boss/blob/master/src/migrationStore.js

CREATE TABLE version
(
  version       int primary key,
  maintained_on timestamp with time zone,
  cron_on       timestamp with time zone
);

CREATE TYPE job_state AS ENUM (
  '${states.created}',
  '${states.retry}',
  '${states.active}',
  '${states.completed}',
  '${states.expired}',
  '${states.cancelled}',
  '${states.failed}'
  )
;
CREATE TABLE job
(
  id           uuid primary key         not null default gen_random_uuid(),
  name         text                     not null,
  priority     integer                  not null default (0),
  data         jsonb,
  state        job_state                not null default ('${states.created}'),
  retryLimit   integer                  not null default (0),
  retryCount   integer                  not null default (0),
  retryDelay   integer                  not null default (0),
  retryBackoff boolean                  not null default false,
  startAfter   timestamp with time zone not null default now(),
  startedOn    timestamp with time zone,
  singletonKey text,
  singletonOn  timestamp without time zone,
  expireIn     interval                 not null default interval '15 minutes',
  createdOn    timestamp with time zone not null default now(),
  completedOn  timestamp with time zone,
  keepUntil    timestamp with time zone NOT NULL default now() + interval '14 days',
  on_complete  boolean                  not null default false,
  output       jsonb
);

CREATE TABLE archive
(
  LIKE job
);
ALTER TABLE archive
  ADD archivedOn timestamptz NOT NULL DEFAULT now();
-- SINGLETON_QUEUE_KEY_ESCAPED -> __pgboss__singleton_queue
CREATE INDEX archive_archivedon_idx ON archive (archivedon);
CREATE INDEX archive_id_idx ON archive (id);
CREATE UNIQUE INDEX job_singletonKey ON job (name, singletonKey)
  WHERE state < '${states.completed}'
    AND singletonOn IS NULL
    AND NOT singletonKey LIKE '${SINGLETON_QUEUE_KEY_ESCAPED}%';
CREATE UNIQUE INDEX job_singleton_queue ON job (name, singletonKey)
  WHERE state < '${states.active}'
    AND singletonOn IS NULL
    AND singletonKey LIKE '${SINGLETON_QUEUE_KEY_ESCAPED}%';
CREATE UNIQUE INDEX job_singletonOn ON job (name, singletonOn)
  WHERE state < '${states.expired}' AND singletonKey IS NULL;
CREATE UNIQUE INDEX job_singletonKeyOn ON job (name, singletonOn, singletonKey)
  WHERE state < '${states.expired}';
CREATE INDEX job_name ON job (name text_pattern_ops);
CREATE INDEX job_fetch ON job (name text_pattern_ops, startAfter) WHERE state < '${states.active}';

CREATE TABLE schedule
(
  name       text primary key,
  cron       text                     not null,
  timezone   text,
  data       jsonb,
  options    jsonb,
  created_on timestamp with time zone not null default now(),
  updated_on timestamp with time zone not null default now()
);
CREATE TABLE subscription
(
  event      text                     not null,
  name       text                     not null,
  created_on timestamp with time zone not null default now(),
  updated_on timestamp with time zone not null default now(),
  PRIMARY KEY (event, name)
);
