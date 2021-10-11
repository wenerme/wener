---
title: PostgreSQL ORDER BY+LIMIT 时的索引选择
slug: postgresql-use-wrong-index-with-order-and-limit
tags:
  - PostgreSQL
  - DevOps
---

# PostgreSQL ORDER BY+LIMIT 时的索引选择

当使用 ORDER BY+LIMIT 时 PostgreSQL 可能会选择更差的执行方式，数据量大时，执行效率相差成百上千倍。

<!-- more -->

## 索引选择问题

假设结构如下

```sql
create table organizations(
  id bigserial primary key,
  jgmc text,
  clrq date
);

create index if not exists idx_organizations_clrq on ic.organizations (clrq);
create index if not exists idx_organizations_jgmc_fts on ic.organizations using pgroonga (jgmc);
```

查询通常基于 clrq 排序，但会 搜索 jgmc。

```sql
explain analyse verbose
select jgmc, clrq, id
from ic.organizations
where jgmc &@~ '百度'
  and clrq is not null
order by clrq desc
limit 30 offset 0
;
```

:::tip 使用了 clrq is not null 而非 nulls last

因为索引默认隐含 nulls last，也就是说 `order by clrq asc` 隐含 `order by clrq asc nulls last`。
当使用 `order by clrq desc nulls last` 时不会选择 `idx_organizations_clrq` 索引，因为 nulls 顺序不匹配。
因此使用 `is not null` 排除。

:::

给出的执行计划和结果如下

```
Limit  (cost=0.43..33132.51 rows=30 width=1284) (actual time=4678.918..13104.109 rows=6 loops=1)
"  Output: jgmc, clrq, id"
  ->  Index Scan Backward using idx_organizations_clrq on ic.organizations  (cost=0.43..4069724.46 rows=3685 width=1284) (actual time=4678.916..13104.101 rows=6 loops=1)
"        Output: jgmc, clrq, id"
        Index Cond: (organizations.clrq IS NOT NULL)
        Filter: (organizations.jgmc &@~ '百度'::text)
        Rows Removed by Filter: 3685166
Planning Time: 0.826 ms
Execution Time: 13104.226 ms
```

实际执行了 13s，选择了 idx_organizations_clrq 索引。

但如果去掉 LIMIT：

```sql
explain analyse verbose
select jgmc, clrq, id
from ic.organizations
where jgmc &@~ '百度'
  and clrq is not null
order by clrq desc
-- limit 30 offset 0
;
```

给出的计划如下

```
Sort  (cost=40479.53..40488.74 rows=3685 width=1284) (actual time=19.771..19.774 rows=6 loops=1)
"  Output: jgmc, clrq, id"
  Sort Key: organizations.clrq DESC
  Sort Method: quicksort  Memory: 36kB
  ->  Index Scan using idx_organizations_jgmc_fts on ic.organizations  (cost=0.00..40261.24 rows=3685 width=1284) (actual time=19.716..19.737 rows=6 loops=1)
"        Output: jgmc, clrq, id"
        Index Cond: (organizations.jgmc &@~ '百度'::text)
        Filter: (organizations.clrq IS NOT NULL)
Planning Time: 0.706 ms
Execution Time: 21.824 ms
```

实际执行只需要 21ms，选择了 idx_organizations_jgmc_fts 索引。

PostgreSQL 在这样的场景下选择了错误的索引，导致查询时间相差 600 倍。

## 索引选择原因

ORDER BY+LIMIT 让查询有 **提前结束的可能**。

例如 实际数据 10k,但 limit 10, 只需使用索引扫描 10 条数据便可以停止执行，而不需要先判断 其他 条件。

因此 PostgreSQL 的 optimizer 有让这种选择优先的逻辑 [pathnode.c#L3633-L3753](https://github.com/postgres/postgres/blob/REL_13_STABLE/src/backend/optimizer/util/pathnode.c#L3633-L3753)。

- create_limit_path 针对 LIMIT/OFFSET 创建执行计划
  - adjust_limit_rows_costs 调整此时的 rows costs

```c title="adjust_limit_rows_costs"
*total_cost = *startup_cost +
  (input_total_cost - input_startup_cost)
  * count_rows / input_rows;
```

|                var | meaning         |
| -----------------: | --------------- |
|         total_cost | 总 cost         |
|       startup_cost | 初始 cost       |
|   input_total_cost | 输入总 cost     |
| input_startup_cost | 输入初始总 cost |
|         count_rows | limit           |
|         input_rows | 输入 行         |

在这个调整逻辑里会将现在的过程 cost `input_total_cost - input_startup_cost` 乘以 系数 `count_rows / input_rows`。
这个系数便会使得 ORDER BY+LIMIT 时优先选择索引。

因为两个计划的 rows 相同，优先了 排序索引则会选择排序索引方案。

## 解决问题

:::tip 目标

避免选择排序索引

:::

1. 使用 noop function 避免索引

```sql
explain verbose
select clrq, jgmc, id
from ic.organizations
where jgmc &@~ '百度'
  and clrq is not null
order by coalesce(clrq) desc
limit 30 offset 0
;
```

2. 使用 expression 避免索引

```sql
explain verbose
select clrq, jgmc, id
from ic.organizations
where jgmc &@~ '百度'
  and clrq is not null
order by clrq+0 desc
limit 30 offset 0
;
```

3. 添加 nulls 顺序避免索引

- 因为 index 默认 asc nulls last 因此 asc 和 desc 选择不同 nulls 顺序
- where is not null
- desc nulls last
- asc nulls first

```sql
explain verbose
select clrq, jgmc, id
from ic.organizations
where jgmc &@~ '百度'
  and clrq is not null
order by clrq desc nulls last
limit 30 offset 0
;
```

4. 调整 STATISTICS

- 在两者统计 rows 不同的情况下 - 这里不适用
- SET STATISTICS
- CREATE STATISTICS

## STATISTICS 场景

STATISTICS 影响 n_distinct，n_distinct 影响 inputs_rows，多个计划相同，可增加 STATISTICS 避免错误选择索引。

```sql
SELECT attname,
       n_distinct,
       null_frac
FROM pg_stats
WHERE tablename = 'organizations'
  and attname in ('clrq', 'jgmc');
```

| attname | n_distinct  | null_frac     |
| :------ | :---------- | :------------ |
| clrq    | 7914        | 0.00030666665 |
| jgmc    | -0.99441195 | 0.0030133333  |

```sql
SELECT relname, reltuples, relpages
FROM pg_class
WHERE relname LIKE 'organizations';
```

| relname       | reltuples | relpages |
| :------------ | :-------- | :------- |
| organizations | 3686376   | 1116103  |

## 参考

- https://gocardless.com/blog/debugging-the-postgres-query-planner/
- https://dba.stackexchange.com/a/258986/234272
