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

## Chunk Group Filtering
