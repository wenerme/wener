---
title: Pg SQL 常见问题
---

# PostgreSQL SQL 问题

- [JSON Functions and Operators](https://www.postgresql.org/docs/current/functions-json.html)
- `PRIMARY KEY` ~= `UNIQUE` + `NOT NULL`

## JSON 数组转行

```sql
-- 转换为单行 JSON 对象
select * from json_array_elements('[{"a":1},{"a":2}]');

-- 同时提取列
select * from json_to_recordset('[{"a":1,"b":"first"},{"a":2,"b":"second"}]') as (a int, b text);
```

## JSON 对象遍历

```sql
-- (key,value)
select * from json_each_text('{"a":1,"b":2}') as d;
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

## 函数返回影响行

```sql
get diagnostics cnt = row_count;
return cnt;
```

## 时间日期处理

- to_timestamp 转 timestamptz
- to_date 转 date
- to_char 转 text
- 参考
  - [Data Type Formatting Functions](https://www.postgresql.org/docs/current/functions-formatting.html)

```sql
SELECT TO_DATE('20170103','YYYYMMDD');
SELECT TO_DATE('2020年7月28日','YYYY年MM月DD日');
SELECT TO_CHAR(TO_DATE('2020年7月28日','YYYY年MM月DD日'),'YYYY-MM-DD');
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
