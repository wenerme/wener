---
title: DuckDB
---

# DuckDB

- [duckdb/duckdb](https://github.com/duckdb/duckdb)
  - MIT, C++
  - 嵌入式 OLAP 数据库
  - 类似 SQLite - 但列存储，面向分析
  - 支持查询 Parquet, CSV
  - 向量引擎，并行查询
  - 官方支持 SDK: Python, Java, C++, NodeJS, R
  - 语法类似 pg - 使用 libpg_query
- 参考
  - [duckdb/pg_duckdb](https://github.com/duckdb/pg_duckdb)
    - 作为 PG 插件使用 DuckDB
    - [supabase/postgres#1106](https://github.com/supabase/postgres/issues/1106)
  - [duckdb/duckdb-wasm](https://github.com/duckdb/duckdb-wasm)
    - 在 Web 内执行，基于 FS API 进行 IO 交互
  - https://news.ycombinator.com/item?id=32684424
  - https://h2oai.github.io/db-benchmark/
  - [duckdblabs/arrow](https://github.com/duckdblabs/arrow)
    - Arrow - Python Binding
  - [evanwashere/duckdb](https://github.com/evanwashere/duckdb)
    - bun binding

:::caution

- 不能更新 unique 列 [#5771](https://github.com/duckdb/duckdb/issues/5771)

:::

:::note

- upsert 0.6.2
  - 支持 insert or replace/ignore
  - 支持 on conflict

:::

```bash
# by Homebre
brew install duckdb
# by Download
curl -LO https://ghproxy.com/github.com/duckdb/duckdb/releases/download/v0.8.0/duckdb_cli-osx-universal.zip
unzip duckdb_cli-osx-universal.zip
./duckdb
```

```sql
SELECT * FROM 'myfile.csv';
SELECT * FROM 'myfile.parquet';

-- csv, parquet
SELECT * FROM 'https://domain.tld/file.extension';

-- S3
SET s3_region='us-east-1';
SET s3_endpoint='<domain>.<tld>:<port>';
SET s3_url_style='path';
SET s3_access_key_id='<AWS access key id>';
SET s3_secret_access_key='<AWS secret access key>';
SET s3_session_token='<AWS session token>';
SELECT * FROM 's3://bucket/file.extension';

SELECT * FROM parquet_scan('s3://bucket/*.parquet');
SELECT COUNT(*) FROM parquet_scan('s3://bucket/folder*/100?/t[0-9].parquet');
SELECT * FROM parquet_scan('s3://bucket/*.parquet', FILENAME = 1);
SELECT * FROM parquet_scan('s3://bucket/*/file.parquet', HIVE_PARTITIONING = 1);

-- s3_uploader_max_parts_per_file, s3_uploader_max_filesize, s3_uploader_thread_limit
COPY table_name TO 's3://bucket/file.extension';

-- SQLite
CALL sqlite_attach('data.db');
PRAGMA show_tables;

-- PostgreSQL
-- connect string
CALL POSTGRES_ATTACH('');
SELECT * FROM POSTGRES_SCAN('', 'public', 'mytable');

-- CSV
SELECT * FROM read_csv_auto('test.csv');
-- HEADER=TRUE
-- read_csv_auto -> read_csv(AUTO_DETECT=TRUE)
SELECT * FROM read_csv_auto('test.csv', SAMPLE_SIZE=20000);
-- 导入
CREATE TABLE ontime AS SELECT * FROM read_csv_auto('test.csv');
-- 也可以先创建表再通过 COPY 导入
COPY ontime FROM 'test.csv' ( DELIMITER '|', HEADER, AUTO_DETECT TRUE );

-- PARQUET
SELECT * FROM parquet_scan('test.parquet');
SELECT * FROM 'test.parquet';
-- 多文件
SELECT * FROM parquet_scan('test/*.parquet');
-- 不导入但也提供查询
CREATE VIEW people AS SELECT * FROM parquet_scan('test.parquet');
-- 导入带压缩
COPY tbl TO 'result-zstd.parquet' (FORMAT 'PARQUET', CODEC 'ZSTD')

-- 导出表 - 可以 FORMAT PARQUET
COPY lineitem TO 'lineitem.tbl' ( DELIMITER '|', HEADER );
COPY lineitem(l_orderkey) TO 'orderkey.tbl' ( DELIMITER '|' );
COPY (SELECT 42 AS a, 'hello' AS b) TO 'query.csv' WITH (HEADER 1, DELIMITER ',');

-- 导出数据库
-- 导出到目录
EXPORT DATABASE 'target_directory';
-- 导出 CSV
EXPORT DATABASE 'target_directory' (FORMAT CSV, DELIMITER '|');
-- 导出 parquet 格式
EXPORT DATABASE 'target_directory' (FORMAT PARQUET);
-- 导入
IMPORT DATABASE 'target_directory'
```

## Inspect

```sql
PRAGMA storage_info('table_name');

SELECT * EXCLUDE (column_path, segment_id, start, stats, persistent, block_id, block_offset, has_updates)
FROM pragma_storage_info('names') USING SAMPLE 10 ROWS
ORDER BY row_group_id;
```

## extension

```sql
select * from duckdb_extensions();

install 'fts';
load 'fts';

-- 下载 http://extensions.duckdb.org/v0.6.1/osx_amd64/httpfs.duckdb_extension.gz
-- 本地 ~/.duckdb/extensions/v0.6.1/osx_amd64/httpfs.duckdb_extension
install 'httpfs';
load 'httpfs';
```

- 不支持代理 https://github.com/duckdb/duckdb/issues/3836

```bash
ver=$(duckdb -version | cut -d ' ' -f 1)
mkdir -p ~/.duckdb/extensions/$ver/osx_amd64
cd ~/.duckdb/extensions/$ver/osx_amd64

# https://duckdb.org/docs/extensions/overview
for name in httpfs excel fts sqlite_scanner postgres_scanner json parquet jemalloc; do
  [ -e $name.duckdb_extension ] && continue
  echo Installing $name
  curl -LO http://extensions.duckdb.org/$ver/osx_amd64/$name.duckdb_extension.gz
  gzip -d $name.duckdb_extension.gz
done
```

```sql
load 'jemalloc';
load 'json';
load 'postgres_scanner';
load 'sqlite_scanner';
```

- sqlite_scanner
  - `sqlite_attach('data.sqlite')` - 创建 view - 只能查 **不能写**
  - sqlite_scan - `SELECT * FROM sqlite_scan('data.sqlite', 'tab');` - 直接查询单个表
- wasm
- visualizer
  - 测试结果 -> HTML
  - `pragma visualize_last_profiling_output('__TEST_DIR__/test.html')`
- sqlsmith
  - SQL 生成器，用于测试
- tpch
- tpcds

# FAQ

## duckdb vs SQLite3

| -           | duckdb | SQLite     |
| ----------- | ------ | ---------- |
| Since       | 2018   | 2000-08-17 |
| 架构        | 列存   | 行存       |
| 场景        | OLAP   | OLTP       |
| 语言        | C++    | C          |
| 多线程访问  | ❌     | ✅         |
| 生态        | ⭐️    | ⭐️⭐️⭐️  |
| 成熟        | ⭐️    | ⭐️⭐️⭐️  |
| 并发        | MVCC   | fs lock    |
| Native JSON | ✅     | ❌         |

- https://duckdb.org/why_duckdb.html
