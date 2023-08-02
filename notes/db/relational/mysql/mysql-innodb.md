---
title: InnoDB
---

# InnoDB

| conf                           | default                | for                                                   |
| ------------------------------ | ---------------------- | ----------------------------------------------------- |
| innodb_io_capacity             | 200                    | IOPS                                                  |
| innodb_flush_sync              | ON                     | io bursts ignore `innodb_io_capacity` when checkpoint |
| innodb_io_capacity_max         | 2000                   |
| innodb_write_io_threads        | 4                      | 1-64                                                  |
| innodb_read_io_threads         | 4                      | 1-64                                                  |
| innodb_thread_concurrency      | 0                      | 0-1000                                                |
| innodb_stats_persistent        | ON                     |
| innodb_buffer_pool_chunk_size  | 134217728              | 128MB                                                 |
| innodb_buffer_pool_instances   | 8                      | pool < 1GB 默认 1, 1-64                               |
| innodb_buffer_pool_size        | 134217728              | 128MB                                                 |
| innodb_dedicated_server        | OFF                    |
| innodb_redo_log_capacity       | 104857600              | 100MB                                                 |
| innodb_flush_method            |
| innodb_flush_log_at_trx_commit | 1                      |
| innodb_data_file_path          | ibdata1:12M:autoextend |
| innodb_log_buffer_size         | 16777216               | 16MB                                                  |
| ~~innodb_log_file_size~~       | 50331648               | 48MB,innodb_redo_log_capacity                         |
| innodb_max_dirty_pages_pct     | 90                     |
| max_sort_length                | 1024                   |                                                       |
| sort_buffer_size               | 262144                 | 256K                                                  |
| join_buffer_size               | 262144                 | 256K                                                  |
| table_open_cache               | 4000                   |
| innodb_ddl_buffer_size         | 1048576                | 1MB                                                   |
| innodb_autoextend_increment    | 64                     | 单位 MB                                               |

- max_sort_length
  - `SHOW GLOBAL STATUS where Variable_name = 'Sort_merge_passes';`
- table_open_cache
  - MAX((open_files_limit-10-max_connections)/2400)
- innodb_dedicated_server
  - 自动配置
  - innodb_buffer_pool_size
    - < 1GB - 128MB
    - 1GB < 4GB - 0.5
    - > 4GB - 0.75
      - e.g. 8GB -> 6G, 16G -> 12G, 128G -> 96G
  - innodb_redo_log_capacity - MySQL 8.0.30
    - 1GB,2GB - 100MB
    - 2GB-4GB - 未配置 pool size 100MB ， 配置了 pool size `round(0.5*RAM_GB)*0.5`
    - 4GB-10.66GB - `round(0.75*RAM_GB)*0.5`
      - e.g. 8G RAM - `Math.round(0.75*8)*0.5`=3G
    - 10.66GB-170.66GB - `round(0.5625*RAM_GB)*0.5`
      - e.g. 16G RAM - `Math.round(0.5625*16)*0.5`=4.5G, 128G -> 36G
    - 170.66GB - 128GB
  - innodb_flush_method=O_DIRECT_NO_FSYNC
  - 不支持 cgroup https://bugs.mysql.com/bug.php?id=90231
  - https://dev.mysql.com/doc/refman/8.0/en/innodb-dedicated-server.html
- innodb_io_capacity
  - HDD - 200
  - SSD - 2000+
  - 建议 < 20000
- innodb_redo_log_capacity
  - https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log.html

```sql
SHOW ENGINE INNODB STATUS;

select *
from performance_schema.global_status
where VARIABLE_NAME like 'Innodb_%'
order by VARIABLE_NAME;

-- common
select *,
       case
           when VARIABLE_NAME in ('innodb_redo_log_capacity') or VARIABLE_NAME like '%_size' then
               VARIABLE_VALUE / 1024 / 1024
           end as 'Size in MB'
from performance_schema.global_variables
where VARIABLE_NAME in (
                        'innodb_buffer_pool_size', 'innodb_buffer_pool_instances', 'innodb_buffer_pool_chunk_size',
                        'innodb_io_capacity', 'innodb_read_io_threads', 'innodb_thread_concurrency',
                        'innodb_write_io_threads', 'innodb_redo_log_capacity', 'innodb_flush_method',
                        'innodb_log_file_size', 'innodb_log_files_in_group',
                        'innodb_flush_log_at_trx_commit', 'innodb_max_dirty_pages_pct', 'innodb_data_file_path',
                        'binlog_format',
                        'innodb_log_file_size', 'innodb_log_buffer_size', 'innodb_file_per_table',
                        'innodb_compression_level', 'max_sort_length', 'sort_buffer_size', 'join_buffer_size',
                        'open_files_limit', 'table_open_cache', 'table_open_cache_instances',
                        'binlog_expire_logs_seconds', 'sync_binlog', 'sql_log_bin', 'binlog_expire_logs_auto_purge'
    )
order by VARIABLE_NAME;

--
select *
from performance_schema.global_variables
where VARIABLE_NAME in (
                        'innodb_buffer_pool_size', 'innodb_buffer_pool_instances', 'innodb_buffer_pool_chunk_size',
                        'innodb_io_capacity', 'innodb_read_io_threads', 'innodb_thread_concurrency',
                        'innodb_write_io_threads','innodb_redo_log_capacity','innodb_flush_method'
    )
order by VARIABLE_NAME;

-- for innodb_dedicated_server
select *
from performance_schema.global_variables
where VARIABLE_NAME in
      ('innodb_dedicated_server', 'innodb_buffer_pool_size', 'innodb_redo_log_capacity', 'innodb_flush_method',
       'innodb_buffer_pool_instances', 'innodb_buffer_pool_chunk_size')
;


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
- https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html

## Buufer Pool

```sql
SHOW STATUS LIKE 'Innodb_buffer_pool_resize_status';
```

## Redo log

```sql
SHOW GLOBAL STATUS LIKE 'Innodb_redo_log_enabled';
SHOW STATUS LIKE 'Innodb_redo_log_resize_status'; -- OK, Resizing down
SHOW STATUS LIKE 'Innodb_redo_log_capacity_resized';

SELECT FILE_ID, START_LSN, END_LSN, SIZE_IN_BYTES, IS_FULL, CONSUMER_LEVEL
FROM performance_schema.innodb_redo_log_files;
```

## innodb_data_file_path

- `InnoDB system tablespace data files`
- innodb_data_home_dir

```
file_name:file_size[:autoextend[:max:max_file_size]]
```

- https://dev.mysql.com/doc/refman/8.0/en/innodb-init-startup-configuration.html#innodb-startup-data-file-configuration
- https://dev.mysql.com/doc/refman/8.0/en/innodb-system-tablespace.html#innodb-resize-system-tablespace

## Tuning

```sql
set profiling=1;
select 1;
show profiles;

show profile cpu ,block io for query 116
```

- https://dev.mysql.com/doc/refman/8.0/en/optimization.html
