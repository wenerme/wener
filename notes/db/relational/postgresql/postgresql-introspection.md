---
title: PostgreSQL Introspection
---

# PostgreSQL Introspection

- 参考
  - [information_schema](https://www.postgresql.org/docs/current/information-schema.html)
  - [System Information Functions and Operators](https://www.postgresql.org/docs/current/functions-info.html)
  - [System Catalogs](https://www.postgresql.org/docs/current/catalogs.html)
  - https://www.interdb.jp/pg/index.html

```sql
select *
from information_schema.columns AS cols
         JOIN pg_type AS pgt ON cols.udt_name = pgt.typname
where table_schema not in ('information_schema', 'pg_catalog', 'metric_helpers')
  and table_name not like 'pg_%'
order by table_catalog, table_schema, table_name, ordinal_position;
```

```sql title="generate golang struct field"
select concat(column_name, '  ',
              case pgt.typname
                when 'name' then 'string'
                when 'varchar' then 'string'
                when 'char' then 'string'
                when 'text' then 'string'
                when 'oid' then 'int'
                when 'int2' then 'int'
                when 'int4' then 'int'
                when 'int8' then 'int'
                when 'bool' then 'bool'
                when 'regproc' then 'string'
                when '_aclitem' then 'string'
                when 'pg_node_tree' then 'string'
                else pgt.typname end, ' `gorm:"column:',
              column_name, '"`')
from information_schema.columns AS cols
         JOIN pg_type AS pgt ON cols.udt_name = pgt.typname
where table_schema = 'information_schema'
  and table_name = 'columns'
order by table_catalog, table_schema, table_name, ordinal_position;
```

## pg_catalog

- 记录所有 postgres 的内部对象
- pg_policy
  - 视图 pg_policies
