---
title: MySQL 配置
---

# MySQL Conf

**mysqld**

```
--character-set-server=utf8mb4
--collation-server=utf8mb4_unicode_ci
--max-connections=2000
```

```sql

select *
from performance_schema.global_variables
where VARIABLE_NAME in (
                        'innodb_buffer_pool_size', 'innodb_buffer_pool_instances', 'innodb_buffer_pool_chunk_size',
                        'innodb_io_capacity', 'innodb_read_io_threads', 'innodb_thread_concurrency',
                        'innodb_write_io_threads'
    )
order by VARIABLE_NAME;


-- Recommended InnoDB Buffer Pool Size
-- 单位 GB
SELECT CEILING(Total_InnoDB_Bytes * 1.6 / POWER(1024, 3)) RIBPS
FROM (SELECT SUM(data_length + index_length) Total_InnoDB_Bytes
      FROM information_schema.tables
      WHERE engine = 'InnoDB') A;

-- RIBPS 另外一种计算方式
SELECT CONCAT(CEILING(RIBPS / POWER(1024, pw)), SUBSTR(' KMGT', pw + 1, 1))
           Recommended_InnoDB_Buffer_Pool_Size
FROM (SELECT RIBPS, FLOOR(LOG(RIBPS) / LOG(1024)) pw
      FROM (SELECT SUM(data_length + index_length) * 1.1 * growth RIBPS
            FROM information_schema.tables AAA,
                 (SELECT 1.25 growth) BBB
            WHERE ENGINE = 'InnoDB') AA) A;

-- 当前实际使用情况
SELECT (PagesData * PageSize) / POWER(1024, 3) DataGB
FROM (SELECT variable_value PagesData
      FROM performance_schema.global_status
      WHERE variable_name = 'Innodb_buffer_pool_pages_data') A,
     (SELECT variable_value PageSize
      FROM performance_schema.global_status
      WHERE variable_name = 'Innodb_page_size') B;
```

| conf                          | default   | note  |
| ----------------------------- | --------- | ----- |
| innodb_buffer_pool_chunk_size | 134217728 | 128MB |
| innodb_buffer_pool_instances  | 1         |
| innodb_buffer_pool_size       | 134217728 |
| innodb_io_capacity            | 200       |
| innodb_read_io_threads        | 4         |
| innodb_thread_concurrency     | 0         |
| innodb_write_io_threads       | 4         |

- innodb_buffer_pool_size
  - 推荐 60-80% 可用内存
- 实际使用内存
  - `innodb_buffer_pool_size = innodb_buffer_pool_chunk_size * innodb_buffer_pool_instances * N`
- https://dba.stackexchange.com/questions/27328
  - RIBPS
- https://releem.com/docs/mysql-performance-tuning/innodb_buffer_pool_size
