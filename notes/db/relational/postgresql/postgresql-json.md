---
title: PostgreSQL JSON
---

## PostgreSQL JSON

:::caution

- `data->'field' is not null` 无法检测 null 数据 - 通过 `->>` 可以检测到 null
- 使用 json_typeof 监测 null - `json_typeof(col->'field') = 'null'`

:::

- https://bitnine.net/blog-postgresql/postgresql-internals-jsonb-type-and-its-indexes/

```sql
-- 数组移除 null
select jsonb_path_query_array('{"values": [null, "test", { "key": "value" }]}', '$.values[*] ? (@ != null)');

-- 移除 null 数据
select json_strip_nulls('[{"f1":1, "f2":null}, 2, null, 3]');

-- 检测 key 存在 - jsonb
SELECT '{"a":1}'::jsonb ? 'a';
SELECT '{"a": {"b": 1}}'::jsonb -> 'a' ? 'b';
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
