---
title: PostgreSQL Cookbook
tags:
  - Cookbook
---

# PostgreSQL Cookbook

- [String Functions and Operators](https://www.postgresql.org/docs/current/static/functions-string.html)
- [Lesser Known PostgreSQL Features](https://hakibenita.com/postgresql-unknown-features)
- 常用函数
  - `quote_literal` - 避免注入
  - `format(formatstr text [, formatarg "any" [, ...] ])`
    - `%[position][flags][width]type`
      - type
        - s 简单字符串, null 输出空字符串
        - I 作为 SQL 的标识符可能会加双引号, 不允许 null, 等同于 `quote_ident`
        - L 作为 SQL 中的文本对待进行加引号, null 输出 NULL, 等同于 `quote_nullable`
    - 格式化字符串
    - 构建 SQL

```sql
-- 包含其他表的定义
CREATE TABLE test_new (LIKE test_old INCLUDING ALL);
```

## json 数组去重

```sql
select distinct jsonb_array_elements(v)#>>'{}'
from (select '[
  "1",
  "2"
]'::jsonb union select '[
  "1",
  "4"
]'::jsonb) t(v);
```

## 数据转换

array to rows unset

## 字符串

```sql
select substring('abcdefgh' from n for 2) from generate_series(1, length( 'abcdefgh' ), 2) n;
```

## 统计

https://github.com/postgres-plr/plr

https://www.joeconway.com/presentations/oscon-pres-2003-1.pdf
PostgreSQL-embedded Statistical
Analysis with PL/R
PL/R User’s Guide - R Procedural
Language
http://www.joeconway.com/plr/doc/plr-US.pdf

http://www.joeconway.com/plr/

## 机器学习

http://madlib.apache.org/
https://wiki.postgresql.org/wiki/Ecosystem:Machine_learning

/usr/local/madlib/bin/madpack -s madlib -p postgres -c [user[/password]@][host][:port][/database] install

MADlib works with Python 2.6 and 2.7. Currently, Python 3.x is not supported.

## UUID

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SELECT gen_random_uuid();

CREATE EXTENSION IF NOT EXISTS uuid-ossp;
SELECT uuid_generate_v4();
```

## 商业

https://www.cybertec-postgresql.com/

## 数据迁移

psql source_database -c 'COPY table TO stdout' | psql target_database -c 'COPY table FROM stdin'

```sql
CREATE DATABASE new_database TEMPLATE original_database;

INSERT INTO t(a, b, c)
SELECT a, b, c FROM dblink('host=xxx user=xxx password=xxx dbname=xxx', 'SELECT a, b, c FROM t') AS x(a integer, b integer, c integer)
```

## 图操作

```sql
-- 递归查找自己和所有子级
WITH RECURSIVE children(id) AS (
  SELECT *
  FROM items
  WHERE id = 470569
  UNION ALL
  SELECT t.*
  FROM children s, items t
  WHERE t.parent = s.id
) SELECT *
  FROM children;

-- 递归查找自己和所有子级并体现层级关系
WITH RECURSIVE children(id) AS (
  SELECT
    *,
    id || '' AS path
  FROM items
  WHERE id = 470569
  UNION ALL
  SELECT
    t.*,
    s.path || '/' || t.id
  FROM children s, items t
  WHERE t.parent = s.id
) SELECT *
  FROM children;

-- 查找所有父级
-- 映射 p 是必要的, 否则会有歧义
WITH RECURSIVE parents(p) AS (
  SELECT parent as p,*
  FROM items
  WHERE id = 471118
  UNION ALL
  SELECT t.parent as p,t.*
  FROM parents s, items t
  WHERE t.id = s.p
) SELECT *
  FROM parents;
```

### 查找缺失的数字

```sql
-- find missing number
-- mytab(id,cid) --  find missing cid
SELECT num AS missing
FROM generate_series(1, (SELECT max(cid) FROM mytab)) t(num)
  LEFT JOIN mytab tab ON (t.num = tab.cid)
WHERE tab.cid IS NULL;
```

## null 安全的 json 提取

```sql
CREATE OR REPLACE FUNCTION json_fetch(object json, variadic nodes text[])
RETURNS json AS $$
DECLARE
  result json := object;
  k text;
BEGIN
  foreach k in array nodes loop
    if (result ->> k) is null then
      result := null;
      exit;
    end if;

    result := result -> k;
  end loop;

  return result;
END;
$$ LANGUAGE plpgsql;
```

```sql
SELECT id,
  coalesce(
    json_fetch(author, 'address', 'street_name')::text, 'No address'
  ) AS street_name
FROM books;
```

## Functions

### decode_uri_component

```sql
CREATE OR REPLACE FUNCTION decode_uri_component(p varchar) RETURNS varchar AS
$$
SELECT convert_from(CAST(E'\\x' || string_agg(CASE WHEN length(r.m[1]) = 1 THEN encode(convert_to(r.m[1], 'SQL_ASCII'), 'hex')
                                                ELSE substring(r.m[1] from 2 for 2) END, '') AS bytea), 'UTF8')
FROM regexp_matches($1, '%[0-9a-f][0-9a-f]|.', 'gi') AS r(m);
$$ LANGUAGE SQL IMMUTABLE STRICT;
```

### table_size

```sql
-- 查看表空间大小信息
-- table_size show statistic table size
CREATE VIEW table_size AS
  SELECT
    *,
    pg_size_pretty(total_bytes) AS total,
    pg_size_pretty(index_bytes) AS INDEX,
    pg_size_pretty(toast_bytes) AS toast,
    pg_size_pretty(table_bytes) AS TABLE
  FROM (
         SELECT
           *,
           total_bytes - index_bytes - COALESCE(toast_bytes, 0) AS table_bytes
         FROM (
                SELECT
                  c.oid,
                  nspname                               AS table_schema,
                  relname                               AS TABLE_NAME,
                  c.reltuples                           AS row_estimate,
                  pg_total_relation_size(c.oid)         AS total_bytes,
                  pg_indexes_size(c.oid)                AS index_bytes,
                  pg_total_relation_size(reltoastrelid) AS toast_bytes
                FROM pg_class c
                  LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE relkind = 'r'
              ) a
       ) a;
```

### try_date

```sql
-- 将给定的字符串转换为日期, 如果失败返回 null
-- try to convert a text to date, return null if date invalid
CREATE OR REPLACE FUNCTION try_date(s TEXT)
  RETURNS DATE
AS $$
BEGIN
  RETURN s :: DATE;
  EXCEPTION WHEN OTHERS
  THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

### tab_sync_id_seq

```sql
-- 同步给定表的 id 序列值
CREATE OR REPLACE FUNCTION tab_sync_id_seq(tab TEXT)
  RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  seq TEXT;
BEGIN
  seq = tab || '_id_seq';
  --   EXECUTE 'LOCK TABLE ' || tab || ' IN EXCLUSIVE MODE';
  EXECUTE 'SELECT setval('' ' || seq || ' '', COALESCE((SELECT MAX(id)
                                            FROM ' || tab || '), 1), FALSE)';
  RETURN nextval(seq);
END;
$$;
```

## 查询外键和索引

- 一定要索引外键
- 参考
  - [ARE YOUR FOREIGN KEYS INDEXED?](https://www.cybertec-postgresql.com/en/index-your-foreign-key/)

```sql
SELECT c.conrelid::regclass                    AS "table",
    /* list of key column names in order */
       string_agg(a.attname, ',' ORDER BY x.n) AS columns,
       pg_catalog.pg_size_pretty(
               pg_catalog.pg_relation_size(c.conrelid)
           )                                   AS size,
       c.conname                               AS constraint,
       c.confrelid::regclass                   AS referenced_table
FROM pg_catalog.pg_constraint c
         /* enumerated key column numbers per foreign key */
         CROSS JOIN LATERAL
    unnest(c.conkey) WITH ORDINALITY AS x(attnum, n)
    /* name for each key column */
         JOIN pg_catalog.pg_attribute a
              ON a.attnum = x.attnum
                  AND a.attrelid = c.conrelid
WHERE NOT EXISTS
    /* is there a matching index for the constraint? */
    (SELECT 1
     FROM pg_catalog.pg_index i
     WHERE i.indrelid = c.conrelid
         /* the first index columns must be the same as the
            key columns, but order doesn't matter */
       AND (i.indkey::smallint[])[0:cardinality(c.conkey) - 1]
         OPERATOR (pg_catalog.@>) c.conkey)
  AND c.contype = 'f'
GROUP BY c.conrelid, c.conname, c.confrelid
ORDER BY pg_catalog.pg_relation_size(c.conrelid) DESC;
```

## 索引使用情况

```sql
SELECT nspname,
       relname,
       round(100 * pg_relation_size(indexrelid) /
             pg_relation_size(indrelid)) / 100      AS index_ratio,
       pg_size_pretty(pg_relation_size(indexrelid)) AS index_size,
       pg_size_pretty(pg_relation_size(indrelid))   AS table_size
FROM pg_index I
       LEFT JOIN pg_class C ON (C.oid = I.indexrelid)
       LEFT JOIN pg_namespace N ON (N.oid = C.relnamespace)
WHERE nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
  AND C.relkind = 'i'
  AND pg_relation_size(indrelid) > 0;
```

## Missing FK Index

查找缺少的外键索引。

```sql
-- check for FKs where there is no matching index
-- on the referencing side
-- or a bad index

WITH fk_actions ( code, action ) AS (
    VALUES ( 'a', 'error' ),
        ( 'r', 'restrict' ),
        ( 'c', 'cascade' ),
        ( 'n', 'set null' ),
        ( 'd', 'set default' )
),
fk_list AS (
    SELECT pg_constraint.oid as fkoid, conrelid, confrelid as parentid,
        conname, relname, nspname,
        fk_actions_update.action as update_action,
        fk_actions_delete.action as delete_action,
        conkey as key_cols
    FROM pg_constraint
        JOIN pg_class ON conrelid = pg_class.oid
        JOIN pg_namespace ON pg_class.relnamespace = pg_namespace.oid
        JOIN fk_actions AS fk_actions_update ON confupdtype = fk_actions_update.code
        JOIN fk_actions AS fk_actions_delete ON confdeltype = fk_actions_delete.code
    WHERE contype = 'f'
),
fk_attributes AS (
    SELECT fkoid, conrelid, attname, attnum
    FROM fk_list
        JOIN pg_attribute
            ON conrelid = attrelid
            AND attnum = ANY( key_cols )
    ORDER BY fkoid, attnum
),
fk_cols_list AS (
    SELECT fkoid, array_agg(attname) as cols_list
    FROM fk_attributes
    GROUP BY fkoid
),
index_list AS (
    SELECT indexrelid as indexid,
        pg_class.relname as indexname,
        indrelid,
        indkey,
        indpred is not null as has_predicate,
        pg_get_indexdef(indexrelid) as indexdef
    FROM pg_index
        JOIN pg_class ON indexrelid = pg_class.oid
    WHERE indisvalid
),
fk_index_match AS (
    SELECT fk_list.*,
        indexid,
        indexname,
        indkey::int[] as indexatts,
        has_predicate,
        indexdef,
        array_length(key_cols, 1) as fk_colcount,
        array_length(indkey,1) as index_colcount,
        round(pg_relation_size(conrelid)/(1024^2)::numeric) as table_mb,
        cols_list
    FROM fk_list
        JOIN fk_cols_list USING (fkoid)
        LEFT OUTER JOIN index_list
            ON conrelid = indrelid
            AND (indkey::int2[])[0:(array_length(key_cols,1) -1)] @> key_cols

),
fk_perfect_match AS (
    SELECT fkoid
    FROM fk_index_match
    WHERE (index_colcount - 1) <= fk_colcount
        AND NOT has_predicate
        AND indexdef LIKE '%USING btree%'
),
fk_index_check AS (
    SELECT 'no index' as issue, *, 1 as issue_sort
    FROM fk_index_match
    WHERE indexid IS NULL
    UNION ALL
    SELECT 'questionable index' as issue, *, 2
    FROM fk_index_match
    WHERE indexid IS NOT NULL
        AND fkoid NOT IN (
            SELECT fkoid
            FROM fk_perfect_match)
),
parent_table_stats AS (
    SELECT fkoid, tabstats.relname as parent_name,
        (n_tup_ins + n_tup_upd + n_tup_del + n_tup_hot_upd) as parent_writes,
        round(pg_relation_size(parentid)/(1024^2)::numeric) as parent_mb
    FROM pg_stat_user_tables AS tabstats
        JOIN fk_list
            ON relid = parentid
),
fk_table_stats AS (
    SELECT fkoid,
        (n_tup_ins + n_tup_upd + n_tup_del + n_tup_hot_upd) as writes,
        seq_scan as table_scans
    FROM pg_stat_user_tables AS tabstats
        JOIN fk_list
            ON relid = conrelid
)
SELECT nspname as schema_name,
    relname as table_name,
    conname as fk_name,
    issue,
    table_mb,
    writes,
    table_scans,
    parent_name,
    parent_mb,
    parent_writes,
    cols_list,
    indexdef
FROM fk_index_check
    JOIN parent_table_stats USING (fkoid)
    JOIN fk_table_stats USING (fkoid)
WHERE table_mb > 9
    AND ( writes > 1000
        OR parent_writes > 1000
        OR parent_mb > 10 )
ORDER BY issue_sort, table_mb DESC, table_name, fk_name;
```
