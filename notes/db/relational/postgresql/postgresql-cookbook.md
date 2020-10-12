# PostgreSQL Cookbook

## Tips
* [String Functions and Operators](https://www.postgresql.org/docs/current/static/functions-string.html)
* 常用函数
  * `quote_literal` - 避免注入
  * `format(formatstr text [, formatarg "any" [, ...] ])`
    * `%[position][flags][width]type`
      * type
        * s 简单字符串, null 输出空字符串
        * I 作为 SQL 的标识符可能会加双引号, 不允许 null, 等同于 `quote_ident`
        * L 作为 SQL 中的文本对待进行加引号, null 输出 NULL, 等同于 `quote_nullable`
    * 格式化字符串
    * 构建 SQL

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

MADlib works with Python 2.6 and 2.7.  Currently, Python 3.x is not supported.

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
