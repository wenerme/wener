---
title: Pg SQL 常见问题
tags:
  - FAQ
---

# PostgreSQL SQL 问题

> **Note**
>
> - comment 不能在创建表时指定
> - column 的 generated 不能修改
> - column 只支持 STORE 的生成列，不支持虚拟列

```sql
-- Diagnostic
select version();
show server_version;
show server_version_num;
show server_encoding;
select current_user, current_schema, current_catalog, current_database();

SHOW server_encoding;
SHOW client_encoding;

SHOW timezone;
SELECT now();
SELECT current_timestamp;

SELECT inet_server_addr() AS server_ip, inet_client_addr() AS client_ip;
SELECT inet_server_port() AS server_port, inet_client_port() AS client_port;

SELECT pg_size_pretty(pg_database_size(current_database())) AS database_size;

SHOW data_directory;
SHOW max_connections;
SHOW shared_buffers;
SHOW default_transaction_isolation;
SHOW ALL;

-- Database 和 Owner
SELECT
    datname AS database_name,
    pg_get_userbyid(datdba) AS owner
FROM
    pg_database;

-- Schema 和 Owner
SELECT
  nspname AS schema_name,
  pg_get_userbyid(nspowner) AS owner
FROM
  pg_namespace;

-- 表和 Owner
SELECT n.nspname                   AS schema_name,
       c.relname                   AS table_name,
       pg_get_userbyid(c.relowner) AS owner
FROM pg_class c
         JOIN
     pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'r'
-- r -> relation - 普通表
--   AND n.nspname = 'public'
--   AND c.relname = 'customers';
order by schema_name, table_name
;
```

```sql
SELECT * FROM pg_stat_activity;
SELECT * FROM pg_locks;
select * from pg_user;  -- 查看所有 user
SELECT usename, usesuper AS superuser, usecreatedb AS createdb, valuntil AS expiration
FROM pg_user;
```

- [JSON Functions and Operators](https://www.postgresql.org/docs/current/functions-json.html)
- `PRIMARY KEY` ~= `UNIQUE` + `NOT NULL`
- FK
  - **MATCH SIMPLE**
  - MATCH FULL
    - 都不 null，或都 null
  - ~~MATCH PARTIAL~~
- CONSTRAINTS
  - DEFERRED | IMMEDIATE
  - 创建时
    - DEFERRABLE INITIALLY DEFERRED
    - DEFERRABLE INITIALLY IMMEDIATE
    - NOT DEFERRABLE

```sql
-- regexp_matches 获取为数组而不是作为 set 返回
select array(select array_to_string(regexp_matches(text, '@(\S+?)\u2005', 'g'), '')), text
from wecom_archive_message
where type in ('text')
-- 获取字符出现的次数
-- 也可以用 replace 如果用不到 regex 的功能 `\u2005` 依赖 regex 的功能
  and (LENGTH(text) - LENGTH(regexp_replace(text, '\u2005', ''))) > 0
;

-- 基本的应用初始化
create user app with password 'app'; -- 创建用户
create database app with owner app; -- 创建数据库
\c app; -- 连接数据库
set session authorization app; -- 切换用户
select current_user; -- 查看当前用户
create schema main; -- 创建 schema, 避免使用 public
alter user app set search_path to main,public; -- 设置用户默认 schema
```

## XML xpath 返回结果包含 CDATA

- [BUG #16046: xpath returns CDATA tag along with the value in postgres 12](https://www.postgresql.org/message-id/5DB23068.3080601%40anastigmatix.net)

```sql
-- PG 12+ 返回  <![CDATA[text]]>
-- PG 11 返回 text
select unnest(xpath('/s/text()','<s><![CDATA[text]]></s>'));
-- 添加 string 转换返回正常
select unnest(xpath('string(/s)','<s><![CDATA[text]]></s>'::xml));
```

## 静态数据行

```sql
SELECT *
FROM (VALUES (1, 'one'), (2, 'two'), (3, 'three')) AS t (num, letter);
```

## 分组聚合

- [cube](https://www.postgresql.org/docs/current/cube.html)
- [GROUPING SETS, CUBE, ROLLUP](https://www.postgresql.org/docs/devel/queries-table-expressions.html#QUERIES-GROUPING-SETS)
- `rollup(a,b,c)` => `grouping sets((a,b,c),(a,b),(a),())`
- cube((a),(b),(c)) grouping sets((a,b,c),(a,b),(a,c),(a),(b,c),(b),(c),())

```sql
GROUP BY a, b, c
-- 对等


ROLLUP ( a, b , c)
-- 对等
GROUPING SETS (
    ( a, b, c ),
    ( a, b    ),
    ( a       ),
    (         )
)

CUBE ( a, b, c )
-- 对等
GROUPING SETS (
    ( a, b, c ),
    ( a, b    ),
    ( a,    c ),
    ( a       ),
    (    b, c ),
    (    b    ),
    (       c ),
    (         )
)

CUBE ( (a, b), (c, d) )
-- 对等
GROUPING SETS (
    ( a, b, c, d ),
    ( a, b       ),
    (       c, d ),
    (            )
)
```

## function vs procedure

- function
  - 不可以操作事物
  - 使用 SELECT 调用
- procedure
  - 没有返回值
  - 有 INOUT 参数
  - 可以 commit 和 rollback
  - 使用 CALL 调用
  - 不可以嵌套到其他 DDL - SELECT,INSERT,UPDATE,DELETE

## plpgsql vs sql

- sql
  - 简单
  - 已经熟悉 SQL
- plpgsql
  - 支持复杂语法
  - 支持控制流 - 能做到单个 SQL 做不到的事情
- https://stackoverflow.com/a/24771561/1870054

## 函数返回影响行

```sql
get diagnostics cnt = row_count;
return cnt;
```

## 正则

```
regexp_match(string, pattern [, flags ]) returns text[]
```

- flags
  - g - global

```sql
SELECT (regexp_match('200万人民币', '[\d.]+'))[1];
SELECT (regexp_match('200万人民币', '\D+$'))[1];
```

## 生成带前缀的 UUID 主键

- 例如用于 GraphQL 通过 ID 判断类型

```sql
create table test
(
    id    text default 'test-' || public.gen_random_uuid() primary key,
    value text
);

insert into test(value)
values ('test');

select *
from test;
```

## 推荐主键创建方式

- 对比 serial
  - 有归属关系
  - 更加规范
- `GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY`
  - `ALWAYS`
    - INSERT 指定 ID 不会生效，需要 `OVERRIDING SYSTEM VALUE`
    - UPDATE 不允许修改 ID
  - `BY DEFAULT` - 用户指定值优先级更高

```sql
CREATE TABLE users (
   id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);
-- 也可以针对生成设置更多参数
CREATE TABLE users (
   id bigint GENERATED ALWAYS AS IDENTITY
             (MINVALUE 0 START WITH 0 CACHE 20)
             PRIMARY KEY,
);
```

## Operator

```sql
-- 操作符也是函数
SELECT 3 OPERATOR(pg_catalog.+) 4;
```

## 分组里选择最后一条数据

1. distinct - 推荐

```sql
select distinct on (id) id, date, another_info
from the_table
order by id, date desc;
```

2. window

```sql
select data
from (
        select data,
                row_number()
                over (partition by data ->> 'groupId' order by item_date desc) as rn
        from pulled_items
    ) lt
where rn = 1
```

## ON CONFLICT 多列 UNIQUE

- https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT
- conflict_target can perform unique index inference
- 多列 UNIQUE 会有问题 - https://stackoverflow.com/a/38066008/1870054
  - 建议通过 generate 列调整 uniqe 逻辑
  - 或者再建一个包含所有 unique 列的索引
- 如果想要返回 EXCLUDED 可以使用 CTE 多步执行 https://stackoverflow.com/a/35953488/1870054

## LATERAL JOIN

- 执行一次
- 可交叉引用其他 FROM
- https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-LATERAL

## 不可以再 WHERE 使用别名

- 不可以再 WHERE 和 HAVING 使用别名
  - https://www.postgresql.org/docs/current/sql-select.html#SQL-SELECT-LIST
- 如果一定要，可以考虑 CTE 或 subquery

> An output column's name can be used to refer to the column's value in `ORDER BY` and `GROUP BY` clauses, but **not** in the `WHERE` or `HAVING` clauses; there you must write out the expression instead.

```sql
select username, profiles.age as profile_age
from users,
  left join profiles on (profiles.user_id = users.id)
-- 不支持 引用
where profile_age > 18;
```

## csv

```sql
COPY (SELECT * FROM foo) TO '/tmp/test.csv' WITH CSV DELIMITER ',' HEADER;
```

**psql**

```sql
\copy (SELECT * FROM foo) TO '/tmp/test.csv' WITH CSV DELIMITER ',' HEADER;
\copy (SELECT * FROM foo) TO STDOUT WITH CSV DELIMITER ',' HEADER;
```

## create role if not exists

```sql
DO
$do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'my_user') THEN

      RAISE NOTICE 'Role "my_user" already exists. Skipping.';
   ELSE
      CREATE ROLE my_user LOGIN PASSWORD 'my_password';
   END IF;
END
$do$;
```

## role cannot be dropped because some objects depend on it - privileges for table users

```sql
REASSIGN OWNED BY test TO postgres;
DROP OWNED BY test;

DROP USER test;
```

## create role if not exists

```sql
DO
$do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'my_user') THEN

      RAISE NOTICE 'Role "my_user" already exists. Skipping.';
   ELSE
      CREATE ROLE my_user;
   END IF;
END
$do$;
```

- 处理 EXCEPTION 比提前检测更慢

## create policy if not exists

```sql
do
$do$
    begin
        if exists(select *
                  from pg_catalog.pg_policies
                  where (schemaname, tablename, policyname) = ('app', 'service_accounts', 'tid'))
        then
            raise notice 'policy already exists';
        else
            create policy tid on app.service_accounts using (tid = current_tenant_id());
        end if;
    end
$do$;
```

## add foreign key if not exists

- https://stackoverflow.com/q/12855631/1870054

```sql
DO
$$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'flow_active_stage_id_fkey') THEN
            alter table flow
                add constraint flow_active_stage_id_fkey foreign key (active_stage_id) references flow_stage (id);
        END IF;
    END;
$$;
```

## array

- `@> ARRAY(1,2,3)` - 包含所有
- `<@`
- `&& ARRAY(1,2,3)` - 包含任意, overlap
- `||` Concatenates
- `'其他' like any(tags)`
  - 不能做 pattern like，需要使用 `unnest` 或者 `array_to_string`
  - pg 要求 any 必须在右边
  - 结果和 `'其他' = any(tags)` 相同
- `ARRAY[1,2,3]` - array constructor
- `'{1,2,3}'` - array literal

```sql
-- 通过自定义 operator 实现 array like 搜索
CREATE OR REPLACE FUNCTION reverse_like (text, text)
  RETURNS boolean LANGUAGE sql IMMUTABLE PARALLEL SAFE AS
'SELECT $2 LIKE $1';

CREATE OPERATOR <~~ (function = reverse_like, leftarg = text, rightarg = text);

SELECT *
FROM   mac_ip_addresses
WHERE  '192.168.2%.255' <~~ ANY (ipaddress);
```

---

- https://stackoverflow.com/a/55484447/1870054
- https://www.postgresql.org/docs/current/functions-array.html

## any

- `expr IN (subquery)` -> `expr operator ANY (subquery)`
- `expr IN (value [, ...])` -> `expr operator ANY (array expr)`
  - 会做内部重写 - `IN` -> `= ANY`, `NOT IN` -> `<> ALL`

## sequence gap

- 找到序列中的间隔

```sql
select sequence + 1 as gap_start,
       next_nr - 1  as gap_end
from (select sequence,
             lead(sequence) over (order by sequence) as next_nr
      from wecom_archive_message) nr
where sequence + 1 <> next_nr;
```
