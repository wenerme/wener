---
title: PostgreSQL Index
---

# PostgreSQL Index

- B-tree, Hash, GiST, SP-GiST, GIN, BRIN
- 默认 B-tree
- B-tree
  - 相等和范围上下限 `<`,`<=`,`=`,`>=`,`>`, BETWEEN, IN, IS NULL, IS NOT NULL
  - 前缀匹配 `LIKE 'foo%'`, `~ '^foo'`, ILIKE, ~\* 且大小写处理逻辑相同
- HASH - `=` 操作 - 如果存在 HASH 索引，会优先使用
  - 如果确定只会用到 `=` 建议使用 HASH
  - 占用空间比 B-tree 少，速度更快
  - 不受值长度影响
- GiST
  - 支持二维数据 - `<<`,`&<`,`&>`,`>>`,`<<|`,`&<|`,`|&>`,`|>>`,`@>`,`<@`,`~=`,`&&`
  - 支持 nearest-neighbor/临近 搜索 - `location <-> point '(101,456)'`
- SP-GiST - Space partitioned GiST
  - non-balanced disk-based data structures
    - quadtrees, k-d trees, and radix trees (tries)
  - 支持二维点 - `<<`,`>>`,`~=`,`<@`,`<^`,`>^`
  - 支持 nearest-neighbor
- GIN - inverted indexes
  - 逆向索引 - 适用于类似数组这样的场景
  - `<@`,`@>`,`=`,`&&`
- BRIN - Block Range INdexes
  - store summaries about the values stored in consecutive physical block ranges
  - 适用于连续相邻数据
  - `<`,`<=`,`=`,`>=`,`>`
- Bloom - `CREATE EXTENSION bloom;`
- 索引类型
  - 部分索引
  - 表达式索引
  - 唯一索引
  - 多列索引

:::tip

- 从旧版本 pg_upgrade 升级后需要 REINDEX 才会利用到新的索引特性
- VACUUM FULL 会重建索引
- PostgreSQL 13 BTree 索引会去重 - 减少磁盘和内存空间
  - 如果希望旧版本行为，可以 `deduplicate_items=off`
- null 不想等 - 因此不会算在 unique

:::

:::caution

- UNIQUE INDEX 只能使用 B-tree
- 排序只能 B-tree
- 排序隐含 NULLS LAST, 默认 ASC NULLS LAST - 因此默认 DESC NULLS LAST **不会**用到索引

:::

```sql
-- Hash 索引
CREATE INDEX name ON table USING HASH (column);
-- 如果想要 Hash unique 可以使用 constraint
-- 但 ON CONFLICT 需要使用 constraint 名字，pg 不能自己推导
alter table tab add constraint cst_exc_id exclude using hash (id with =);

-- 内置 Hash 函数
SELECT hashtext('text'),
       hashchar('c'),
       hash_array(array [1,2,3]),
       jsonb_hash('{
         "me": "haki"
       }'::jsonb),
       timestamp_hash(now()::timestamp);

-- 临近搜索
SELECT * FROM places ORDER BY location <-> point '(101,456)' LIMIT 10;
-- 索引支持 ORDER 和 NULL 顺序
CREATE INDEX test3_desc_index ON test3 (id DESC NULLS LAST);

-- 索引添加额外值 - 可以让常用查询只需要走索引
CREATE INDEX idx_cust2 ON customer(active) INCLUDE (email);


-- 查找重复索引
  SELECT array_agg(indexname) AS indexes, replace(indexdef, indexname, '') AS defn
    FROM pg_indexes
GROUP BY defn
  HAVING count(*) > 1;

-- 索引使用情况
SELECT relname, indexrelname, idx_scan
FROM   pg_catalog.pg_stat_user_indexes
WHERE  schemaname = 'public';

-- 并行构建索引

SET max_parallel_workers = 32;
SET max_parallel_maintenance_workers = 16;

CREATE INDEX CONCURRENTLY idx_address1 ON address(district);
```

# FAQ

## access method "hash" does not support unique indexes

支持 BTree 可以 create unique index

## 重复值索引

- PG 13 BTree 会去重，是比较好的选择
- 根据数量差异情况，可以选择部分索引
