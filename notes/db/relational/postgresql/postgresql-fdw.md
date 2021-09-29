---
title: PostgreSQL FDW
---

# PostgreSQL FDW

- [Foreign data wrappers](https://wiki.postgresql.org/wiki/Foreign_data_wrappers)
- [adjust/clickhouse_fdw](https://github.com/adjust/clickhouse_fdw)

## mysql_fdw

- [EnterpriseDB/mysql_fdw](https://github.com/EnterpriseDB/mysql_fdw)

```sql
CREATE EXTENSION mysql_fdw;

CREATE SERVER mysql_server
FOREIGN DATA WRAPPER mysql_fdw
OPTIONS (host '127.0.0.1', port '3306');

CREATE USER MAPPING FOR postgres
SERVER mysql_server
OPTIONS (username 'foo', password 'bar');

CREATE FOREIGN TABLE warehouse(
     warehouse_id int,
     warehouse_name text,
     warehouse_created datetime)
SERVER mysql_server
     OPTIONS (dbname 'db', table_name 'warehouse');
```

## postgres_fdw

:::caution

- 支持 ON CONFLICT DO NOTHING
- 不支持 ON CONFLICT DO UPDATE
  - 可以手动实现 [Exceptions with UPDATE/INSERT](https://www.postgresql.org/docs/current/plpgsql-control-structures.html#PLPGSQL-UPSERT-EXAMPLE)

:::

```sql
CREATE EXTENSION postgres_fdw;

CREATE SERVER ext_server
FOREIGN DATA WRAPPER postgres_fdw
OPTIONS (host '127.0.0.1', port '5432', dbname 'ext');

CREATE USER MAPPING FOR demo
SERVER ext_server
OPTIONS (user 'ext', password 'ext');

CREATE FOREIGN TABLE foreign_table (
        id integer NOT NULL,
        data text
)
SERVER foreign_server
OPTIONS (schema_name 'some_schema', table_name 'some_table');
```

## dblink

```sql
CREATE EXTENSION dblink;

SELECT dblink_connect('myconn', 'db2remote');

CREATE SERVER db2remote
FOREIGN DATA WRAPPER dblink_fdw
OPTIONS (host 'postgres.demoproject.aivencloud.com', dbname 'db2', port '11254');
SELECT * FROM dblink('myconn','SELECT * FROM foo') AS t(a int);
```

## sqlite_fdw

- [pgspider/sqlite_fdw](https://github.com/pgspider/sqlite_fdw)
- 不支持 COPY
- 不支持分片表

```sql
CREATE EXTENSION sqlite_fdw;

CREATE SERVER sqlite_server FOREIGN DATA WRAPPER sqlite_fdw OPTIONS (database '/tmp/test.db');
CREATE FOREIGN TABLE t1(a integer, b text) SERVER sqlite_server OPTIONS (table 't1_sqlite');
-- 需要 key 支持更新
CREATE FOREIGN TABLE t1(a integer OPTIONS (key 'true'), b text) SERVER sqlite_server OPTIONS (table 't1_sqlite');
-- int 转 timestamp
CREATE FOREIGN TABLE t1(a integer, b text, c timestamp without time zone OPTIONS (column_type 'INT')) SERVER sqlite_server OPTIONS (table 't1_sqlite');

IMPORT FOREIGN SCHEMA public FROM SERVER sqlite_server INTO public;
```
