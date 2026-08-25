---
title: 数据湖计算
---

# Data Lake Compute

- DLC - Data Lake Compute - 数据湖计算
- 主要用 Spark SQL 对 COS / Iceberg 等数据进行批处理、ETL 和联邦查询。

```
DLC Catalog
└─ Iceberg Table
   └─ Parquet Files on COS
```

- DLC JDBC
- Hive JDBC

```
jdbc:dlc:dlc.tencentcloudapi.com
  ?task_type=SparkSQLTask
  &database_name=xxx
  &datasource_connection_name=DataLakeCatalog
  &region=ap-shanghai
  &data_engine_name=xxx
  &resource_group_name=xxx
  &result_type=COS
  &read_type=Stream


jdbc:hive2://endpoint:10009/
  ?spark.engine=engine_name;
   spark.resourcegroup=resource_group;
   region=ap-shanghai;
   kyuubi.engine.type=SPARK_SQL;
   kyuubi.engine.share.level=ENGINE
```

# Doris

- TCHouse-D -> Doris
  - FE、BE、Tablet、Segment
  - 用 TCHouse-D 查询加速 DLC

```sql
-- 在 Doris 连接里通常可用
SHOW BACKENDS;
SHOW FRONTENDS;
```

- Spark Application
- Driver
- Executor
- Stage
- Task
- Spark UI
