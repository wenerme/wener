---
title: Citus Columnar
---

# Citus Columnar

- [src/backend/columnar](https://github.com/citusdata/citus/tree/master/src/backend/columnar)
- 格式衍生自 ORC，但元数据在 PG 重，能事务修改
- 参考
  - [Citus 10 brings columnar compression to Postgres](https://www.citusdata.com/blog/2021/03/06/citus-10-columnar-compression-for-postgres/)
    - No UPDATE or DELETE
    - No logical replication or logical decoding
    - btree and hash indexe
    - 废弃 cstore_fdw
    - [HN](https://news.ycombinator.com/item?id=26369305)

:::tip

- [#4742](https://github.com/citusdata/citus/issues/4742) unlogged
- 在 I/O-bound 非常有用, CPU-bound 场景肯定比不过专门为 column 设计的执行引擎

:::

```sql
CREATE TABLE contestant (
    handle TEXT,
    birthdate DATE,
    rating INT,
    percentile FLOAT,
    country CHAR(3),
    achievements TEXT[]
) USING columnar;


-- 转换为 行 存储
SELECT alter_table_set_access_method('contestant', 'heap');
-- 转换为 列 存储 - index 会被 drop
SELECT alter_table_set_access_method('contestant', 'columnar');

VACUUM VERBOSE contestant;
```

- 适用于单行数据量大时，减少加载到内存的数据
- 适用于大数据分析 - 定时生成表
- 有非常多的使用限制
  - Append-only - 不可更新和删除
  - Rollback 也不会恢复已写入空间
  - 只支持 hash 和 btree 索引
  - 不支持 index scan, bitmap index scan
  - 不支持 tiscan
  - 不支持 sample scan
  - 不支持 toast - inline 存储
  - 不支持 onconflict - 支持纯 DO NOTHING
  - 不支持 锁 - SELECT … FOR SHARE, SELECT … FOR UPDATE
  - 不支持 serializable isolation level
  - 不支持 foreign keys, unique constraints, exclusion constraints
  - 不支持 logical decoding
  - 不支持 intra-node parallel scans
  - 不支持 AFTER … FOR EACH ROW trigger
  - 无 UNLOGGED, TEMPORARY
- strip
  - 150000 rows/strip - alter_columnar_table_set 可修改
  - 压缩单位
  - 每个事务会创建 - 如果一个事务只插入一条也会创建一个 strip
    - 尽量批量插入
    - 如果有很多小 strip，表是无法修复的，只能从新 INSERT INTO SELECT

```sql title="修复表"
BEGIN;
CREATE TABLE foo_compacted (LIKE foo) USING columnar;
INSERT INTO foo_compacted SELECT * FROM foo;
DROP TABLE foo;
ALTER TABLE foo_compacted RENAME TO foo;
COMMIT;
```

## Chunk Group Filtering
