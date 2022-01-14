---
title: Pg SQL 常见问题
tags:
  - FAQ
---

# PostgreSQL SQL 问题

- [JSON Functions and Operators](https://www.postgresql.org/docs/current/functions-json.html)
- `PRIMARY KEY` ~= `UNIQUE` + `NOT NULL`

## JSON FAQ

:::caution

- `data->'field' is not null` 无法检测 null 数据 - 通过 `->>` 可以检测到 null

:::

```sql
-- 数组移除 null
select jsonb_path_query_array('{"values": [null, "test", { "key": "value" }]}', '$.values[*] ? (@ != null)');

-- 移除 null 数据
select json_strip_nulls('[{"f1":1, "f2":null}, 2, null, 3]');
```

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

## XML xpath 返回结果包含 CDATA

- [BUG #16046: xpath returns CDATA tag along with the value in postgres 12](https://www.postgresql.org/message-id/5DB23068.3080601%40anastigmatix.net)

```sql
-- PG 12+ 返回  <![CDATA[text]]>
-- PG 11 返回 text
select unnest(xpath('/s/text()','<s><![CDATA[text]]></s>'));
-- 添加 string 转换返回正常
select unnest(xpath('string(/s)','<s><![CDATA[text]]></s>'::xml));
```

## 系统信息

```sql
select version();
show server_version;
show server_version_num;
show server_encoding;
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

## 时间日期处理

- to_timestamp 转 timestamptz
- to_date 转 date
- to_char 转 text
- 参考
  - [Data Type Formatting Functions](https://www.postgresql.org/docs/current/functions-formatting.html)
- ts 支持小数点后六位 - nano 精度

```sql
SELECT TO_DATE('20170103','YYYYMMDD');
SELECT TO_DATE('2020年7月28日','YYYY年MM月DD日');
SELECT TO_CHAR(TO_DATE('2020年7月28日','YYYY年MM月DD日'),'YYYY-MM-DD');

-- ms 转 ts - 支持小数点
select to_timestamp(1630402380252::float / 1000);
-- ts 转 epoch - 包含小数点
select extract(epoch from now());
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
