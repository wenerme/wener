---
title: Trigger
---

# Trigger

:::tip

- trigger 函数不能定义参数，通过 TG_ARGV 接收参数

:::

| var             | for                           |
| --------------- | ----------------------------- |
| NEW             |
| OLD             |
| TG_NAME         | trigger name                  |
| TG_WHEN         | BEFORE/AFTER/INSTEAD OF       |
| TG_LEVEL        | ROW/STATEMENT                 |
| TG_OP           | INSERT/UPDATE/DELETE/TRUNCATE |
| TG_RELID        | oid of table                  |
| ~~TG_RELNAME~~  | name of table                 |
| TG_TABLE_NAME   | name of table                 |
| TG_TABLE_SCHEMA | schema of table               |
| TG_NARGS        | number of arguments           |
| TG_ARGV         | arguments                     |
| TG_EVENT        |
| TG_TAG          |

- 返回类型 `trigger` - 数据变化
- 返回类型 `event_trigger` - 数据库事件
- 自动创建变量 `TG_<NAME>`
- 返回 `NULL` 或 record/row
- `BEFORE` row
  - 返回 `NULL` 则不会触发实际操作 - INSERT/UPDATE/DELETE
  - 修改 NEW 返回会使用新的值
  - DELETE 返回内容无意义，但需要 非 NULL
    - 此时 NEW 为 NULL，一般返回 OLD
- `INSTEAD OF`
  - 只能是 row 级别，只支持 view
- `event_trigger` - DDL 事件
  - TG_EVENT, TG_TAG
  - `ALTER|CREATE|DROP|COMMENT|GRANT|REVOKE|IMPORT FOREIGN SCHEMA|REFRESH MATERIALIZED VIEW`
  - `SECURITY LABEL`, `SELECT INTO`
- 参考
  - https://www.postgresql.org/docs/current/plpgsql-trigger.html
  - https://www.postgresql.org/docs/current/event-trigger-matrix.html

```sql
create or replace function insert_entity_sid() returns trigger as
$$
begin
    if NEW.sid is null then
        NEW.sid := next_entity_sid(TG_ARGV[0], NEW.tid);
    end if;
    return new;
end;
$$ language plpgsql;
```
