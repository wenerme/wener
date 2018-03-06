# PostgreSQL Snippet SQL

```sql
DROP FUNCTION try_date( TEXT );
-- try to convert a text to date, return null if date invalid
CREATE OR REPLACE FUNCTION try_date(s TEXT)
  RETURNS DATE AS $$
BEGIN
  RETURN s :: DATE;
  EXCEPTION WHEN OTHERS
  THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

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

-- find missing number
-- mytab(id,cid) --  find missing cid
SELECT num AS missing
FROM generate_series(1, (SELECT max(cid) FROM mytab)) t(num)
  LEFT JOIN mytab tab ON (t.num = tab.cid)
WHERE tab.cid IS NULL;



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



CREATE TABLE test_old2 (LIKE test_old INCLUDING ALL);
```


## Extension
* https://pkgs.alpinelinux.org/package/edge/testing/x86_64/postgis
* https://pkgs.alpinelinux.org/package/edge/testing/x86_64/pg_cron
* https://github.com/citusdata/pg_cron

* https://github.com/alpinelinux/aports/tree/master/testing/pg_cron
* https://github.com/citusdata/cstore_fdw
* https://github.com/pramsey/pgsql-http

```bash
git clone https://github.com/pramsey/pgsql-http

# 安装到其他目录
make install DESTDIR=$PWD/dist
rsync dist/ / -vaz

# 使用 edge/testing
apk update -X http://mirrors.aliyun.com/alpine/edge/testing/
apk add pg_cron -X http://mirrors.aliyun.com/alpine/edge/testing/
```
