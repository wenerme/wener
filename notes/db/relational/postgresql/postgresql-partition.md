---
tags:
  - Scale
  - Partition
---

# Table Partitioning

- 查询性能提升
  - 当主要查询的数据都在一个分片里时，索引加载到内存使用率更高
- 当更新和查询单个分片时性能提升
  - 此时可能通过 seq scan 而不需要使用索引，导致随机访问
- 通过操作分片表来批量操作数据，性能大幅度提高
- 较少使用的分片可移到更便宜的存储上

> 当单表大小超过物理内存时，建议分表

:::tip

- 分表索引不可以 CONCURRENTLY
  - 除非先 DETACH
- 分表可以创建 CREATE INDEX ON ONLY
  - 创建后索引是无效的
  - 在单独分片上创建然后 ATTACH
  - 可以使用该方式来创建 UNIQUE 和 PRIMARY KEY
- 有时候表继承比分片更好用

:::

:::caution

- 唯一 限制必须包含所有 partition key columns
- 不能创建跨表 exclusion constraint
  - 不支持跨分片限制
- 针对 INSERT 的 BEFORE ROW 触发器无法更改分片
- 临时表和持久表不可以混用

:::

- 参考
  - https://www.enterprisedb.com/blog/postgres-table-partitioning
  - https://www.postgresql.org/docs/current/ddl-partitioning.html

**分表策略**

- 范围 - 例如 时间字段
- 列表 - 例如 年字段
- 哈希 - 例如 UUID 字段

**常见策略**

- 基于使用场景的冷热数据区分 - 例如 最近一周数据单独表
- 基于数据本身的逻辑结构区分 - 例如 区域、年份

```sql
-- RANGE 分片
-- 创建虚拟表
CREATE TABLE measurement (
    city_id         int not null,
    logdate         date not null,
    peaktemp        int,
    unitsales       int
) PARTITION BY RANGE (logdate);

-- LIST 分片
CREATE TABLE cities (
    city_id      bigserial not null,
    name         text not null,
    population   bigint
) PARTITION BY LIST (left(lower(name), 1));
-- LIST 子表
CREATE TABLE cities_ab
    PARTITION OF cities (
    CONSTRAINT city_id_nonzero CHECK (city_id != 0)
) FOR VALUES IN ('a', 'b');
-- 默认分片
CREATE TABLE cities_partdef
    PARTITION OF cities DEFAULT;

-- HASH 分片
CREATE TABLE orders (
    order_id     bigint not null,
    cust_id      bigint not null,
    status       text
) PARTITION BY HASH (order_id);
-- HASH 子表
CREATE TABLE orders_p1 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE orders_p2 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE orders_p3 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE orders_p4 PARTITION OF orders
    FOR VALUES WITH (MODULUS 4, REMAINDER 3);

-- 可直接创建索引 - 当增加分片时会对分片加索引
CREATE INDEX ON measurement (logdate);

CREATE TABLE measurement_y2006m02 PARTITION OF measurement
    FOR VALUES FROM ('2006-02-01') TO ('2006-03-01');
-- 可修改 TABLESPACE 选择不同存储介质
CREATE TABLE measurement_y2006m03 PARTITION OF measurement
    FOR VALUES FROM ('2006-03-01') TO ('2006-04-01')
    TABLESPACE fasttablespace;;

-- 分片表可以再分片
CREATE TABLE measurement_y2006m02 PARTITION OF measurement
    FOR VALUES FROM ('2006-02-01') TO ('2006-03-01')
    PARTITION BY RANGE (peaktemp);

-- 取保开启分片裁剪配置 - 默认开启
select * from pg_settings where name='enable_partition_pruning';

-- 可以直接删除分片表 - 会锁主表
DROP TABLE measurement_y2006m02;
-- 可以排除分片
ALTER TABLE measurement DETACH PARTITION measurement_y2006m02;


-- 单独创建分片，添加校验，导入数据，加入到分片
CREATE TABLE measurement_y2008m02
  (LIKE measurement INCLUDING DEFAULTS INCLUDING CONSTRAINTS)
  TABLESPACE fasttablespace;
-- 提前创建好 CONSTRAINT - 否则 ATTACH 时还是会创建且需要 ACCESS EXCLUSIVE
ALTER TABLE measurement_y2008m02 ADD CONSTRAINT y2008m02
   CHECK ( logdate >= DATE '2008-02-01' AND logdate < DATE '2008-03-01' );
\copy measurement_y2008m02 from 'measurement_y2008m02'
-- possibly some other data preparation work
-- SHARE UPDATE EXCLUSIVE
-- ATTACH 后可以删除创建的 CHECK
-- 如果有 DEFAULT 也会检查，除非创建了排除 CHECK
ALTER TABLE measurement ATTACH PARTITION measurement_y2008m02
    FOR VALUES FROM ('2008-02-01') TO ('2008-03-01' );
```
