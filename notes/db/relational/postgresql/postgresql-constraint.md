---
title: CONSTRAINT
---

# CONSTRAINT

- CHECK
  - 表达式校验
- NOT NULL
- UNIQUE
  - 默认命名规则  `<TABLE>_<COLUMN>_key`
  - `unique(tid,entity_id)` -> `flow_tid_entity_id_key`
- PRIMARY KEY
  - 默认 INDEX 命名规则  `<TABLE>_pkey`
- FOREIGN KEY
  - 默认命名规则 `<TABLE>_<COLUMN>_fkey`
- EXCLUDE
  - 有点类似 partial index
  - 会创建对应索引

---

- CONSTRAINT
  - 可以 defer
- UNIQUE & PRIMARY KEY
  - 都会创建 btree unique index

```sql
alter table tab add unique (tid,rid,cid);

select * from information_schema.constraint_column_usage;

-- 只支持 IF EXISTS
alter table tab drop constraint if exists tab_tid_rid_cid_key ;

-- try cache
DO $$
BEGIN

  BEGIN
    ALTER TABLE foo ADD CONSTRAINT bar ;
  EXCEPTION
    WHEN duplicate_table THEN  -- UNIQUE - 9.6.8
    WHEN duplicate_object THEN -- FOREIGN KEY
    WHEN invalid_table_definition THEN -- PRIMARY KEY - 11.9
      RAISE NOTICE 'Table constraint foo.bar already exists';
  END;

END $$;
```

- https://www.postgresql.org/docs/current/ddl-constraints.html
- https://stackoverflow.com/a/6804058/1870054
  - add constraint if not exists
- https://www.postgresql.org/docs/current/errcodes-appendix.html
