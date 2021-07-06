---
id: postgresql-sql-faq
title: Pg SQL 常见问题
---

# PostgreSQL SQL 问题

- [JSON Functions and Operators](https://www.postgresql.org/docs/current/functions-json.html)

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
