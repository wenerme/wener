---
title: PostgreSQL JSON
---

## PostgreSQL JSON

:::caution

- null
  - `data->'field' is not null` 无法检测 null 数据 - 通过 `->>` 可以检测到 null
  - 也可以使用 json_typeof 监测 null - `json_typeof(col->'field') = 'null'`

:::

| operator | for                                                                                          |
| -------- | -------------------------------------------------------------------------------------------- |
| `->`     | Get JSON object field by key                                                                 |
| `->>`    | Get JSON object field as text                                                                |
| `#>`     | Get JSON object at specified path                                                            |
| `#>>`    | Get JSON object at specified path as text                                                    |
| `?`      | Does the object contain the given key?                                                       |
| `?\|`    | Do any of these keys exist?                                                                  |
| `?&`     | Do all of these keys exist?                                                                  |
| `\|\|`   | Concatenate two jsonb values into a new jsonb value                                          |
| `@>`     | Does the left JSON value contain the right JSON path/value entries at the top level?         |
| `<@`     | Are the left JSON path/value entries contained at the top level within the right JSON value? |
| `-`      | Delete key/value pair or string element from left operand                                    |
| `#-`     | Delete key/value pair from left operand                                                      |
| `@?`     | Does the JSON path string exist as a top-level key within the JSON value?                    |
| `@@`     | Does the string exist as a top-level key within the JSON value?                              |

- https://www.postgresql.org/docs/current/functions-json.html
- https://bitnine.net/blog-postgresql/postgresql-internals-jsonb-type-and-its-indexes/

```sql
-- json null 不是 null
select 'null'::jsonb is null;
select 'null'::jsonb #>> '{}' is null; -- 转换后为 null
-- 通过 typeof 判断类型
select jsonb_typeof('null'::jsonb) = 'null';

-- jsonb string -> text
-- ::text 会保留引号
select to_json('text') #>> '{}';

-- 数组移除 null
select jsonb_path_query_array('{"values": [null, "test", { "key": "value" }]}', '$.values[*] ? (@ != null)');

-- 移除 null 数据
select json_strip_nulls('[{"f1":1, "f2":null}, 2, null, 3]');

-- 检测 key 存在 - jsonb
SELECT '{"a":1}'::jsonb ? 'a';
SELECT '{"a": {"b": 1}}'::jsonb -> 'a' ? 'b';

-- jsonb 数组转 text 数组
-- BEGIN ATOMIC ... END PG 14+ 支持,不再需要 quote, 只能用于 LANGUAGE sql
CREATE OR REPLACE FUNCTION jsonb_array_to_text_array(_js jsonb)
    RETURNS text[]
    LANGUAGE sql
    IMMUTABLE STRICT PARALLEL SAFE
BEGIN ATOMIC
    SELECT ARRAY(SELECT jsonb_array_elements_text(_js));
END;
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
