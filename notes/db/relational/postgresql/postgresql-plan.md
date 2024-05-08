---
title: PostgreSQL Plan
---

# PostgreSQL Plan

- explain
  - `rows = selectivity * reltuples`
  - scalarltsel
    - 基于 histogram_bounds 计算 rows
    - `selectivity = (1 + (reltuples - bucket[2].min)/(bucket[2].max - bucket[2].min))/num_buckets`
    - `rows = rel_cardinality * selectivity`
  - eqsel
    - 基于 MCVs 计算 rows
    - 不在 MCV 则排除所有计算概率 计算 rows
      - selectivity=(1 - sum(mvf))/(num_distinct - num_mcv)
- merge, hash, nested loop
- [Query Planning](https://www.postgresql.org/docs/current/runtime-config-query.html)
- [Performance Tips](https://www.postgresql.org/docs/current/performance-tips.html)
- 参考
  - [PEV](http://tatiyants.com/pev)

## cost

- cost=0.00..40397.82 rows=3698 width=86
  - cost=初始成本..总成本
  - rows=预计行数
  - width=平均宽度
- actual time=15.281..15.299 rows=5 loops=1
  - 实际执行
  - time=从..到
  - rows=行数
  - loops=遍历

```sql
select name, setting, unit
from pg_settings ps
where name like '%_cost'
order by 1;
```

|                    name | setting | note                     |
| ----------------------: | :------ | ------------------------ |
|    cpu_index_tuple_cost | 0.005   | 处理一个索引行           |
|       cpu_operator_cost | 0.0025  | 处理 operator 和函数调用 |
|          cpu_tuple_cost | 0.01    | 处理一个数据行           |
|        random_page_cost | 4       | 随机访问                 |
|           seq_page_cost | 1       |
|          jit_above_cost | 100000  |
|   jit_inline_above_cost | 500000  |
| jit_optimize_above_cost | 500000  |
|     parallel_setup_cost | 1000    |
|     parallel_tuple_cost | 0.1     |

- random_page_cost
  - 影响是否选择 index scan - 越低越倾向 index scan
  - 评估存储缓存命中、存储介质访问
  - 值相对于 seq_page_cost
  - 默认 4
    - 可理解为笔 seq 访问慢 40 倍
  - ssd 一般 1.1
  - raw 一般 1 - seq_page_cost=random_page_cost
- seq_page_cost
  - 存储相对于 cpu 的 cost
  - 调低则相当于 存储访问 和 CPU 计算更接近，例如 RAW 场景

## statistic

- https://www.postgresql.org/docs/current/planner-stats.html
- [default_statistics_target](https://www.postgresql.org/docs/current/runtime-config-query.html#GUC-DEFAULT-STATISTICS-TARGET)
  - most_common_vals, histogram_bounds 统计多少条数据
  - 默认 100
    - `100 * 300` (magic number) pages
- VACUUM, ANALYZE
  - 更新 pg_class、pg_statistic
- [pg_statistic](https://www.postgresql.org/docs/current/catalog-pg-statistic.html)
  - ALTER TABLE SET STATISTICS 修改 most_common_vals, histogram_bounds 数量
- [pg_stats](https://www.postgresql.org/docs/current/view-pg-stats.html)
  - 视图、更加直观
  - correlation - 字段相关性
    - 值接近 -1 或 +1 时 index 扫描成本更低
  - n_distinct
    - < 0 表示会随表增加而增加
      - n_distinct = rows / - n_distinct
- [pg_statistic_ext_data](https://www.postgresql.org/docs/current/catalog-pg-statistic-ext-data.html)
  - ndistinct
  - mcv
- [Row Estimation Examples](https://www.postgresql.org/docs/current/row-estimation-examples.html)

```sql
-- reltuples 行
SELECT relname, relkind, reltuples, relpages
FROM pg_class
WHERE relname LIKE 'tenk1%';

-- attname 字段
-- n_distinct 差异
-- most_common_vals 常见值
SELECT attname,
       inherited,
       n_distinct,
       array_to_string(most_common_vals, E'\n') as most_common_vals
FROM pg_stats
WHERE tablename = 'table';
```

# FAQ
