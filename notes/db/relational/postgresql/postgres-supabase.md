---
title: Supabase PostgreSQL Image
---

# Supabase PostgreSQL Image

- [supabase/postgres](https://github.com/supabase/postgres)
  - Docker 镜像
  - 使用 ansible 构建
  - ~250MB - 300MB
  - 包含大多插件
  - 版本号匹配 Postgres
  - 基础镜像为 postgres
  - [Dockerfile](https://github.com/supabase/postgres/blob/develop/Dockerfile)
- Vote for Postgres extensions [supabase#679](https://github.com/orgs/supabase/discussions/679)
- 扩展
  - [supabase/supautils](https://github.com/supabase/supautils)

```conf
unix_socket_directories = '/var/run/postgresql'
session_preload_libraries = 'supautils'
include = '/etc/postgresql-custom/supautils.conf'
cron.database_name = 'postgres'
pljava.libjvm_location = '/usr/lib/jvm/java-11-openjdk-${TARGETARCH}/lib/server/libjvm.so'
pgsodium.getkey_script= '/usr/lib/postgresql/${postgresql_major}/bin/pgsodium_getkey.sh'
auto_explain.log_min_duration = 10s
```

## Extensions

| Extension                                                                        | Description                                                         |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [Postgres contrib modules](https://www.postgresql.org/docs/current/contrib.html) | `pg_stat_statements`                                                |
| [PostGIS](https://postgis.net/)                                                  | GIS                                                                 |
| [pgRouting](https://pgrouting.org/)                                              | Extension of PostGIS - provides geospatial routing functionalities. |
| [pgTAP](https://pgtap.org/)                                                      | Unit Testing for Postgres.                                          |
| [pg_cron](https://github.com/citusdata/pg_cron)                                  | Run CRON jobs inside Postgres.                                      |
| [pgAudit](https://www.pgaudit.org/)                                              | Generate highly compliant audit logs.                               |
| [pgjwt](https://github.com/michelp/pgjwt)                                        | Generate JSON Web Tokens (JWT) in Postgres.                         |
| [pgsql-http](https://github.com/pramsey/pgsql-http)                              | HTTP client for Postgres.                                           |
| [plpgsql_check](https://github.com/okbob/plpgsql_check)                          | Linter tool for PL/pgSQL.                                           |
| [pg-safeupdate](https://github.com/eradman/pg-safeupdate)                        | Protect your data from accidental updates or deletes.               |
| [wal2json](https://github.com/eulerto/wal2json)                                  | JSON output plugin for logical replication decoding.                |
| [PL/Java](https://github.com/tada/pljava)                                        | PL/Java                                                             |
| [plv8](https://github.com/plv8/plv8)                                             | PL/Javascript                                                       |
| [pg_plan_filter](https://github.com/pgexperts/pg_plan_filter)                    | Only allow statements that fulfill set criteria to be executed.     |
| [pg_net](https://github.com/supabase/pg_net)                                     | Expose the SQL interface for async networking.                      |
| [rum](https://github.com/postgrespro/rum)                                        | An alternative to the GIN index.                                    |
| [pg_hashids](https://github.com/iCyberon/pg_hashids)                             | Generate unique identifiers from numbers.                           |
| [pgsodium](https://github.com/michelp/pgsodium)                                  | libsodium                                                           |
| [pg_stat_monitor](https://github.com/percona/pg_stat_monitor)                    | Query Performance Monitoring                                        |
| [pgvector](https://github.com/pgvector/pgvector)                                 | vector similarity search                                            |
| [pg_repack](https://github.com/reorg/pg_repack)                                  | Tool to remove bloat from tables and indexes                        |
| pg_jsonschema                                                                    |
| pg_graphql                                                                       |
| sfcgal                                                                           |
| timescaledb                                                                      |
| vault                                                                            |
| [wrappers](https://github.com/supabase/wrappers)                                 | FDW dev kit by Supabase                                             |
| pgroonga                                                                         |
| hypopg                                                                           |
| [pg_tle](https://github.com/aws/pg_tle)                                          | trusted language extensions                                         |
| supautils                                                                        |
| plls                                                                             | PL/LiveScript                                                       |

```sql
create extension if not exists pg_hashids;
-- id_encode, id_decode
select id_encode(1234567, 'This is my salt', /*min length*/ 10, /* alphabet */ 'abcdefghijABCDxFGHIJ1234567890');
```

# FAQ

## You might want to create it and/or set "pgsodium.getkey_script" to the correct path.

```
pgsodium.getkey_script='/usr/lib/postgresql/${postgresql_major}/bin/pgsodium_getkey.sh'
```
