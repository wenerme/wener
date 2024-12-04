---
title: 常见问题
tags:
  - FAQ
  - Limits
---

# PostgreSQL FAQ

- [Errors and Messages](https://www.postgresql.org/docs/current/errcodes-appendix.html)
- [SQL Key Words](https://www.postgresql.org/docs/current/sql-keywords-appendix.html)

:::note

- 无 Foreign Key Arrays
  - `FOREIGN KEY (EACH ELEMENT OF userids) REFERENCES users,`
  - https://stackoverflow.com/a/50441059/1870054
  - https://commitfest.postgresql.org/17/1252/
  - S094
- 不支持 column reordering

:::

- [Unsupported Features](https://www.postgresql.org/docs/current/unsupported-features-sql-standard.html)
  - SQL:2016

## 限制 {#limits}

| limit                   | value   | notes    |
| ----------------------- | ------- | -------- |
| db name                 | 63 byte |
| identifier length       | 63 byte |
| columns per index       | 32      |
| columns per table       | 1600    |
| columns in a result set | 1,664   |
| max params `?`, `:`     | 32767   | smallint |
| query params            | 65,535  |
| function params         | 100     |
| field size              | 1GB     |

- https://www.postgresql.org/docs/current/limits.html

## unique constraint vs unique index

> 核心业务语义尽量用 constraint

- unique constraint
  - `unique(tid,entity_id)` -> `flow_tid_entity_id_key`
  - 可以延后
  - 通过 unique index 实现 - 自动创建
  - 附带在 TABLE 上
    - `unique` 在 create table 时定义
    - `alter table TABLE add unique (tid,rid,cid);` 在 create table 之后定义
  - 不支持 `ADD CONSTRAINT IF NOT EXISTS`
  - 支持 `DROP CONSTRAINT IF EXISTS`
- unique index
  - `create unique index on flow(tid,entity_id)` -> `flow_tid_entity_id_idx`
  - 可以并发
  - 可以 带条件
  - 独立 INDEX 概念
    - 不能在 create table 时定义 - inline index 概念
    - UNIQUE 只是 INDEX 的一个限制
- https://stackoverflow.com/a/6804058/1870054
  - add constraint if not exists
- https://stackoverflow.com/questions/23542794
- 都支持 UNIQUE NULLS NOT DISTINCT
  - 因为是 INDEX 的能力

## TOAST

- TOAST = The Oversized-Attribute Storage Technique
- 一行 2kB - TOAST_TUPLE_THRESHOLD
  - 超过先尝试压缩到 2kB - TOAST_TUPLE_TARGET
    - 默认 default_toast_compression=pglz, 支持 lz4
    - 可按列设置 COMPRESSION
  - 压缩不足，则分 chunk 存储到关联的 toast 表
- TOAST 使用 oid 跟踪 - 最多 2^32 = 4 十亿 条记录
- 存储
  - PLAIN - 不压缩，无 out-of-line - 超过则异常
  - EXTENDED - 压缩+out-of-line
  - EXTERNAL - out-of-line
  - MAIN - 压缩+尝试尽量不 out-of-line
- 参考
  - [TOAST storage](https://www.postgresql.org/docs/current/storage-toast.html)
  - wiki [TOAST](https://wiki.postgresql.org/wiki/TOAST)

```sql
-- 默认 EXTENDED
ALTER TABLE users SET STORAGE EXTENDED;
-- 修改 TOAST_TUPLE_TARGET
ALTER TABLE users SET (toast_tuple_target = N);
```

## 服务重载

1. pg_ctl

```bash
su postgres
pg_ctl reload
```

2. sql

```bash
psql -U postgres
```

```sql
SELECT pg_reload_conf();
```

3. service

```bash
service postgresql restart
```

## 维护

- [postgres_queries_and_commands.sql](https://gist.github.com/rgreenjr/3637525) - Useful PostgreSQL Queries and Commands

## 升级

- https://www.xf.is/2019/02/26/convert-postgresql-cluster-to-use-page-checksums/
  - `show data_checksums`

可以构造一个包含所有版本的镜像，然后进行升级 - [Dockerfile](https://github.com/postgres/pgadmin4/blob/master/Dockerfile)

```bash
# https://github.com/tianon/docker-postgres-upgrade
docker run --rm \
  -v PGDATAOLD:/var/lib/postgresql/OLD/data \
  -v PGDATANEW:/var/lib/postgresql/NEW/data \
  tianon/postgres-upgrade:OLD-to-NEW
```

```bash
pg_upgrade --old-datadir /var/lib/pgsql/data/ --new-datadir /var/lib/pgsql/10/data/ \
  --old-bindir /usr/bin/ --new-bindir /usr/pgsql-10/bin/
```

## CTID

https://dba.stackexchange.com/questions/203989/what-is-the-data-type-of-the-ctid-system-column-in-postgres

https://postgresql.verite.pro/blog/2019/04/24/oid-column.html

## 时区问题

- PG 实际存储的是 UTC 不会存储时区
- 时区信息会用于转换

```sql
-- 当前时区
show timezone;
show timezone_abbreviations;
-- 可用时区
SELECT * FROM pg_timezone_names;

-- date 转 tz 应该是正常的
select ('2020-01-02'::date)::TIMESTAMPTZ;

-- session 有效
SET TIME ZONE TO 'UTC';
SET TIMEZONE TO 'UTC';
-- 也可以直接指定 offset
SET timezone=-4;

-- 当前时间
-- UTC 可以使用 localtime
SELECT LOCALTIMESTAMP AT TIME ZONE 'Asia/Shanghai';
-- timestamp 不显示 TZ 信息
SELECT NOW()::TIMESTAMP;
-- current_timestamp 是 timestamptz
-- 可以提取 tz 信息 秒、小时
select current_timestamp,
       pg_typeof(current_timestamp),
       extract(timezone from current_timestamp::timestamptz),
       extract(timezone_h from current_timestamp::timestamptz)
;

-- db 配置
ALTER SYSTEM SET timezone = 'UTC';

-- 修改角色时区
ALTER ROLE my_role SET TIMEZONE = '+1';
```

## NULL 字符 / `\0` 字符

- PG 不允许字符串包含 `\0`
- 传入之前替换或用 bytea 存储
- JSON 也不允许包含空字符

## unsupported Unicode escape sequence

一般是因为 `\u0000`, 替换掉即可, pg 的字符串不支持 `\u0000`

## 切换用户

```sql
set role user;
```

## 切换数据库

- 只能重新链接

## 密码存储

- [pgcrypto](https://www.postgresql.org/docs/current/pgcrypto.html)
- [Hashed Passwords with PostgreSQL's pgcrypto](https://www.meetspaceapp.com/2016/04/12/passwords-postgresql-pgcrypto.html)
- https://stackoverflow.com/questions/15733196/where-2x-prefix-are-used-in-bcrypt

```sql
-- 生成 Hash
select crypt('12345', gen_salt('bf', 8));
-- 判断密码相等
select crypt('12345', password) = password

-- PG 无法处理 2b - 或者插入时修改为 2a
select *
from users
where username = 'admin'
  and  regexp_replace(password,'^[$]2b','$2a') = crypt('admin', regexp_replace(salt,'^[$]2b','$2a'));
```

## Calculating and Saving Space in PostgreSQL

- [Column Tetris](https://stackoverflow.com/a/7431468/1870054)
- [HN](https://news.ycombinator.com/item?id=16471242)
- 每种数据类型都有特定的对齐要求 - [pg-type](https://www.postgresql.org/docs/current/static/catalog-pg-type.html)
- [pg_controldata](https://www.postgresql.org/docs/current/static/app-pgcontroldata.html)
  - 可以获取数据的族群信息
  - Maximum data alignment 显示数据的对齐要求
- [Database Object Size Functions](https://www.postgresql.org/docs/current/static/functions-admin.html#FUNCTIONS-ADMIN-DBSIZE)

```bash
pg_controldata data/
```

```sql
-- 列宽
select pg_column_size('int');
```

```
pg_control version number:            1002
Catalog version number:               201707211
Database system identifier:           6502788473953883273
Database cluster state:               in production
pg_control last modified:             五  3/ 9 12:04:15 2018
Latest checkpoint location:           0/32F8A88
Prior checkpoint location:            0/32DA0D0
Latest checkpoint's REDO location:    0/32F8A50
Latest checkpoint's REDO WAL file:    000000010000000000000003
Latest checkpoint's TimeLineID:       1
Latest checkpoint's PrevTimeLineID:   1
Latest checkpoint's full_page_writes: on
Latest checkpoint's NextXID:          0:730
Latest checkpoint's NextOID:          25609
Latest checkpoint's NextMultiXactId:  1
Latest checkpoint's NextMultiOffset:  0
Latest checkpoint's oldestXID:        548
Latest checkpoint's oldestXID's DB:   1
Latest checkpoint's oldestActiveXID:  730
Latest checkpoint's oldestMultiXid:   1
Latest checkpoint's oldestMulti's DB: 1
Latest checkpoint's oldestCommitTsXid:0
Latest checkpoint's newestCommitTsXid:0
Time of latest checkpoint:            五  3/ 9 12:04:12 2018
Fake LSN counter for unlogged rels:   0/1
Minimum recovery ending location:     0/0
Min recovery ending loc's timeline:   0
Backup start location:                0/0
Backup end location:                  0/0
End-of-backup record required:        no
wal_level setting:                    replica
wal_log_hints setting:                off
max_connections setting:              100
max_worker_processes setting:         8
max_prepared_xacts setting:           200
max_locks_per_xact setting:           64
track_commit_timestamp setting:       off
Maximum data alignment:               8
Database block size:                  8192
Blocks per segment of large relation: 131072
WAL block size:                       8192
Bytes per WAL segment:                16777216
Maximum length of identifiers:        64
Maximum columns in an index:          32
Maximum size of a TOAST chunk:        1996
Size of a large-object chunk:         2048
Date/time type storage:               64-bit integers
Float4 argument passing:              by value
Float8 argument passing:              by value
Data page checksum version:           1
Mock authentication nonce:            32f8310a0cf344f7c1432dd733d3cf6065b748697485724af31fbaf7605f50bc
```

## psql 开启时间记录

- `\timing`

```bash
# 直接命令行使用
psql -c '\timing' -c 'select 1'
```

## 数组索引

GIN 索引是反向索引(inverted indexes), 适用于包含多个值的情况.

- 支持的操作符
  - `<@`
  - `@>`
  - `=`
  - `&&`

## 数组外键

- 不支持

## ERROR: cannot alter type of a column used by a view or rule

必须要先 drop view 再操作, 目前没有比较好的操作方式, 但操作都可以在一个事务中完成

有些修改可以通过直接修改 pg_attribute 来达到目的, 但是非常不建议.

## 时间戳上的毫秒处理

目前没有比较好的处理方式

```sql
-- 将一个毫秒的 ts 转为 timestamp 类型
ALTER TABLE  my_info
  ALTER COLUMN tstmp TYPE TIMESTAMP USING to_timestamp(tstmp / 1000) + ((tstmp % 1000) || ' milliseconds') :: INTERVAL;
```

## 查询语句的最大大小

- 目前为 1G
- [Is there a maximum length constraint for a postgres query?](https://dba.stackexchange.com/q/131399)
- [src/common/psprintf.c#L28](https://github.com/postgres/postgres/blob/REL_10_1/src/common/psprintf.c#L28)

```c
#define MaxAllocSize   ((Size) 0x3fffffff) /* 1 gigabyte - 1 */
```

## IN vs any

- https://stackoverflow.com/a/28995514/1870054
- IN
  - Bitmap 扫描
  - 数据量大时, 执行时间更慢计划时间更久
- ANY
  - 会使用临时表做 JOIN
  - 数据量大时, 执行时间更久计划时间更快

```sql
CREATE TABLE test (
  id  BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  val TEXT
);

-- 插入测试数据
DO
$$
BEGIN
  FOR i IN 1..100000 LOOP
    INSERT INTO test (val) VALUES ('val#' || i);
  END LOOP;
END
$$;

EXPLAIN SELECT *
        FROM test
        WHERE id IN (1, 2, 3);

EXPLAIN SELECT *
        FROM test
        WHERE id = ANY (VALUES (1), (2), (3));
```

```
# IN
Bitmap Heap Scan on test  (cost=12.86..19.97 rows=3 width=40)
  Recheck Cond: (id = ANY ('{1,2,3}'::bigint[]))
  ->  Bitmap Index Scan on test_pkey  (cost=0.00..12.86 rows=3 width=0)
        Index Cond: (id = ANY ('{1,2,3}'::bigint[]))

# ANY
Nested Loop  (cost=0.32..25.00 rows=3 width=40)
  ->  HashAggregate  (cost=0.05..0.08 rows=3 width=4)
        Group Key: ""*VALUES*"".column1
        ->  Values Scan on ""*VALUES*""  (cost=0.00..0.04 rows=3 width=4)
  ->  Index Scan using test_pkey on test  (cost=0.28..8.29 rows=1 width=40)
        Index Cond: (id = ""*VALUES*"".column1)
```

```SQL
-- 测试 IN
DO
$$
DECLARE
  x   TEXT = '';
  r   REFCURSOR;
  rec RECORD;
BEGIN
  x = '0';
  FOR i IN 1..1000 LOOP
    x = x || ',' || i;
  END LOOP;
  OPEN r FOR EXECUTE 'EXPLAIN ANALYSE SELECT *
        FROM test
        WHERE id IN (' || x || ')';

  FOR i IN 1..6 LOOP
    FETCH r INTO rec;
    RAISE NOTICE 'ROW %', rec;
  END LOOP;
END
$$;

-- 测试 ANY
DO
$$
DECLARE
  x   TEXT;
  r   REFCURSOR;
  rec RECORD;
BEGIN
  x = '(0)';
  FOR i IN 1..1000 LOOP
    x = x || ',(' || i || ')';
  END LOOP;
  OPEN r FOR EXECUTE 'EXPLAIN ANALYSE SELECT *
        FROM test
        WHERE id = any (VALUES ' || x || ')';

  FOR i IN 1..10 LOOP
    FETCH r INTO rec;
    RAISE NOTICE 'ROW %', rec;
  END LOOP;
END
$$;
```

## 重置 schema

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- 9.3+ 可能需要
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

## psql 使用连接字符串

```bash
psql -Atx "host=localhost port=5432 dbname=taop user=taop" -c 'select current_date'

# -d database
psql -d "host=localhost port=5432 dbname=taop user=taop"
```

## control reached end of trigger procedure without RETURN

使用 trigger 时出现，添加 return null

```sql
create or replace function sync_events_trigger() returns trigger
as
$$
BEGIN
    -- ...
    return null; -- this is important
END;
$$ language plpgsql volatile;
```

## query has no destination for result data

在函数中 select 需要指定输出

- 可以将返回类型指定为 table
- 可以 `select into`
- 可以 返回 `return(select * from tab)`
- 可以使用 perform/execute 如果不想要结果

```sql
CREATE OR REPLACE FUNCTION tst_dates_func()
RETURNS TABLE( v int) as
$$
    select 1;
$$ LANGUAGE sql;

RETURN QUERY (select 1);
RETURN(SELECT dblink_disconnect());

SELECT 1 into result;
RETURN result;

PERFORM select 1;
```

## could not resize shared memory segment "/PostgreSQL.153520683" to 1073812480 bytes: No space left on device

增加 docker 的 shm_size

## set-returning functions are not allowed in UPDATE

- 替换 unnest(array_value) -> `array_value[1]`
- 替换 `(regexp_matches(album, '^6,(?:(.+),)?tv\d+'))[1]` -> `substring (album FROM '^6,(?:(.+),)?tv\d+')`

## Tuning

- https://news.ycombinator.com/item?id=28489340
- https://postgresqlco.nf/
- Why Uber Engineering Switched from Postgres to MySQL - 2016
  - MySQL used as key-value storage layer of homegrown sharded non-relational database
  - https://eng.uber.com/postgres-to-mysql-migration/
    - https://news.ycombinator.com/item?id=17280239
    - https://news.ycombinator.com/item?id=12166585
    - https://news.ycombinator.com/item?id=26283348
  - Postgres better for read heavy
  - MySQL for write heavy
- Pain Point https://pgdash.io/blog/postgresql-six-not-so-easy-pieces.html
- https://sql-info.de/postgresql/postgres-gotchas.html

## Sale Point

- transactional ddl
- JSONB,JSON
- Extension
- Native Array
- window function
- custom type
- MySQL 8
  - atomic ddl - 弱于 transactional ddl
  - window function
  - arbitrary check
  - JSON
- https://sql-info.de/mysql/gotchas.html
- https://fromdual.com/mysql-limitations

## ON CONFLICT DO UPDATE command cannot affect row a second time

1. 插入前进行 dedup
2. CTE 先 select distinct

## 生成列

- 生成列不能被手动指定
- stored - INSERT 或 UPDATE 时写入
- virtual - 实时计算 - 类似 view

## generated vs default column

- default
  - 可指定
  - 不指定使用默认 - 计算 1 次
  - 可关联其他列
- generated
  - 每次行变化都会生成

## remaining connection slots are reserved for non-replication superuser connection

排查连接数问题

> **Note**
>
> - 修改 max_connections 必须重启 pg
> - 建议应用指定 application_name

```sql
-- 查看当前的最大连接数
show max_connections;

-- 查看连接数主要谁占用
-- idle 多还是 active 多
select state, usename, application_name, datname, count(*)
from pg_stat_activity
group by state, usename, application_name, datname
order by 1, 2, 3;

-- 排查 active 连接
select *
from pg_stat_activity
where state = 'active';

-- 按需 kill 连接
```

## CURRENT_TIMESTAMP vs NOW

- 没有区别
- CURRENT_TIMESTAMP=事物开始时间=transaction_timestamp()=now()
- 输入时的 `now` 不等于 `now()`
  - [Special Date/Time Inputs](https://www.postgresql.org/docs/current/datatype-datetime.html#DATATYPE-DATETIME-SPECIAL-TABLE)
- 其他时间
  - statement_timestamp() - STABLE - 语句时间
  - clock_timestamp() - VOLATILE - 真正当前时间

---

- https://dba.stackexchange.com/a/63549/234272

## ON CONFLICT DO UPDATE command cannot affect row a second time (SQLSTATE 21000)

- insert on conflict 时有重复数据
- 插入之前先去重

## column "datlastsysoid" does not exist

- PostgreSQL 15 移除了这个列
- https://github.com/pgmodeler/pgmodeler/issues/1689
- navicat 16 也有问题

```sql
select distinct datlastsysoid from pg_database;
```

## 查找所有外键

```sql
SELECT conrelid::regclass AS table_name,
       conname AS foreign_key,
       pg_get_constraintdef(oid)
FROM   pg_constraint
WHERE  contype = 'f'
AND    connamespace = 'public'::regnamespace
ORDER  BY conrelid::regclass::text, contype DESC;

-- psql
\d table_name
```

## ARRAY/数组 外键

- 不支持
- https://stackoverflow.com/questions/41054507

## cannot use column reference in DEFAULT expression

- 不能在 default 中使用其他列
- 通过 before insert 触发器实现

## lateral vs subquery

- lateral
  - PostgreSQL 9.3+
  - [correlated subquery](https://en.wikipedia.org/wiki/Correlated_subquery)
  - 不产生新的行
  - 每行只执行 1 次
  - `LEFT JOIN LATERAL (select 1) t ON TRUE`
  - `LATERAL (select 1) t`
  - 查询可以引用外部列
- subquery
  - 只能返回一个值
  - 只执行 1 次

## union vs union all

- union
  - 合并去重
- union all
  - 不做处理

## 外键需要建立索引么？

- pk 和 unique 会自动建立索引
- fk 不会自动建立索引
  - 建议建立索引

## enum vs check vs fk

- enum
  - 不能删除
  - 顺序不可变
  - 不可以模式匹配
  - 实际存储 oridinal
  - 默认最长 63byte
  - 只有 value
  - 存储在 pg_enum
  - https://www.postgresql.org/docs/current/datatype-enum.html
- check
  - 所见即所得
- fk
  - 可以包含 label - 方便生成
  - 可以动态变化
  - 推荐 FK Value
  - 不需要 alter table

```sql
-- ENUM
CREATE TYPE valid_colors AS ENUM ('red', 'green', 'blue');

CREATE TABLE t (
    color VALID_COLORS
);

-- CHECK
CREATE TABLE t (
    colors TEXT CHECK (colors IN ('red', 'green', 'blue'))
);

-- FK ID
CREATE TABLE valid_colors (
    id SERIAL PRIMARY KEY NOT NULL,
    color TEXT
);

INSERT INTO valid_colors (color) VALUES
    ('red'),
    ('green'),
    ('blue');

CREATE TABLE t (
    color_id INTEGER REFERENCES valid_colors (id)
);

-- FK value
CREATE TABLE valid_colors (
    value text PRIMARY KEY NOT NULL,
    label text
);

INSERT INTO valid_colors (value) VALUES
    ('red'),
    ('green'),
    ('blue');

CREATE TABLE t (
    color text REFERENCES valid_colors (value)
);
```

---

- 参考
  - https://stackoverflow.com/a/10984951/1870054

## 预加载 table 到内存

[pg_prewarm](./pg_prewarm.md)

## ERROR: could not open file "base/5/2704": No such file or directory

数据库少了数据文件

## A field with precision 5, scale 4 must round to an absolute value less than 10^1

## the database system is in recovery mode the database system is in recovery mode

- 使用 pg_isready 判断是否可用

## COLLATE

```sql
create index on t (name COLLATE "C");
-- 支持使用 Index
explain select * from t where name like 'W%';
-- 不会用 Index
explain select * from t where name = 'Wener';
-- 会用 Index
explain select * from t where name = 'Wener' collate "C";

-- 修改默认 COLLATE
alter table t alter column name set data type text collate "C";
-- 会用 Index
explain select * from t where name = 'Wener';
```

- COLLATE "C" 支持前缀过滤索引
- LC_COLLATE

## ERROR: could not resize shared memory segment "/PostgreSQL.2692148336" to 1073812480 bytes: No space left on device

- vacuum 时发生

```bash
sysctl kernel.shmmax
ls -lash /dev/shm
# PostgreSQL.1489521326
```

**K8S 修改**

```yaml
spec:
  containers:
    - name: postgres
      image: postgres
      volumeMounts:
        - mountPath: /dev/shm
          name: dshm
      ports:
        - containerPort: 5432
  volumes:
    - name: dshm
      emptyDir:
        medium: Memory
```

**Docker**

```bash
docker run --cap-add=SYS_ADMIN --shm-size 2G postgres
```

## K8S start & shutdown

```yaml
preStop:
  exec:
    command: ['/bin/sh', '-c', 'pg_ctl -D /var/lib/postgresql/data/pgdata -w -t 60 stop -m fast']
    #command: ['/usr/local/bin/pg_ctl stop -D /var/lib/postgresql/data -w -t 60 -m fast']
```

- https://stackoverflow.com/a/75829325/1870054

## LC_MONETERY

:::caution

- collate 不能创建 db 后修改，可以针对 column 或 table 修改。

:::

```sql
show lc_collate;
show lc_monetary;

select *
from pg_settings
where name like 'lc_%';

set lc_monetary to "en_IE.utf8";
select 10::money;
```

- [pg_collation](https://www.postgresql.org/docs/current/catalog-pg-collation.html)
- https://www.postgresql.org/docs/current/collation.html
- LC_COLLATE
  - 默认 en_US.utf8
  - 推荐 C
- LC_CTYPE
- LC_MONETERY

| name        | default    | aliyun     |
| ----------- | ---------- | ---------- |
| lc_collate  | en_US.utf8 | C          |
| lc_ctype    | en_US.utf8 | en_US.utf8 |
| lc_messages | en_US.utf8 | ""         |
| lc_monetary | en_US.utf8 | C          |
| lc_numeric  | en_US.utf8 | C          |
| lc_time     | en_US.utf8 | C          |

- initdb - `--encoding=UTF-8 --lc-collate=C --lc-ctype=C`

```
POSTGRES_INITDB_ARGS: '--encoding=UTF-8 --lc-collate=C --lc-ctype=C'
```

## there is no unique constraint matching given keys for referenced table

外键必须 unique

## permission denied for table

- 外键需要 REFERENCES
- https://www.postgresql.org/docs/current/ddl-priv.html

## source for a multiple-column UPDATE item must be a sub-SELECT or ROW() expression

不能单个字段

```
on conflict(value) do update set (label)= (excluded.label);
```

修改为

```
on conflict(value) do update set (label,extensions)= (excluded.label,excluded.extensions);
```

## for update nowait - FOR UPDATE cannot be applied to the nullable side of an outer join

- mikroorm LockMode.PESSIMISTIC_WRITE_OR_FAIL

## permission denied to set session authorization

```sql
-- 获取当前的 superuser
SELECT usename
FROM pg_catalog.pg_user
WHERE usesuper = true;
```

- ⚠️注意 [supabase](./postgres-supabase.md) 的 pg superuser 是 supabase_admin
  - supabase_admin 密码和 postgres 相同，登录后 `ALTER USER postgres WITH SUPERUSER`

## Windows minimal

- 下载 zip
  - https://www.enterprisedb.com/download-postgresql-binaries
- 解压
- 得到 pgsql 目录
  - 17.0
    - zip 250MB
    - 解压后 997MB
    - pgAdmin 650MB
    - bin 175MB
    - lib 95MB
    - doc 31MB
    - share 24MB
    - 移除后
      - 112MB

```bash
rm -rf pgAdmin doc include StackBuilder
rm lib/*.pdb bin/*.pdb

cd bin
rm clusterdb.exe createdb.exe createuser.exe dropdb.exe dropuser.exe ecpg.exe oid2name.exe pg_amcheck.exe pg_archivecleanup.exe pg_basebackup.exe pg_checksums.exe pg_combinebackup.exe pg_config.exe pg_controldata.exe pg_createsubscriber.exe pg_isready.exe pg_receivewal.exe pg_recvlogical.exe pg_resetwal.exe pg_rewind.exe pg_test_fsync.exe pg_test_timing.exe pg_upgrade.exe pg_verifybackup.exe pg_waldump.exe pg_walsummary.exe pgbench.exe reindexdb.exe stackbuilder.exe vacuumdb.exe vacuumlo.exe
cd -

rm -rf share/locale
rm -rf share/doc

ls bin/*.exe | sort
# bin/initdb.exe
# bin/pg_ctl.exe
# bin/pg_dump.exe
# bin/pg_dumpall.exe
# bin/pg_restore.exe
# bin/postgres.exe
# bin/psql.exe
```

**package**

```bash
cd ..
# gnu tar + zstd ~ 27MB
tar -I 'zstd -20' --exclude='.DS_Store' -cvf pgsql.tar.zst pgsql
# just zip ~ 38MB
zip -r -9 pgsql.zip pgsql -x "*.DS_Store"
```

**init**

```batch
set PATH=%PATH%;%CD%\pgsql\bin
initdb.exe -D .\data -U postgres --encoding=UTF-8 --lc-collate=C --lc-ctype=C
pg_ctl -D ./data start -l db.log
```

```bash title="Shell"
export PATH=$PWD/pgsql/bin:$PATH
TZ=Asia/Shanghai initdb -D ./data -U postgres --encoding=UTF-8 --lc-collate=C --lc-ctype=C
pg_ctl -D ./data start -l db.log

export PGDATA=$PWD/data
pg_ctl status
psql -U postgres
pg_ctl stop
```

```bash
echo 'listen_addresses = "*"' >> data/postgresql.conf
echo 'host all all 0.0.0.0/0 md5' >> data/pg_hba.conf

pg_ctl reload
```
