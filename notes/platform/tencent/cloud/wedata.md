---
title: WeData
---

# WeData

| 名称         | 定位                             |
| ------------ | -------------------------------- |
| Apache Flink | 开源流计算引擎                   |
| WeData       | 数据开发、同步、编排和治理平台   |
| Oceanus      | 云托管 Apache Flink              |
| DLC          | Spark SQL 为主的数据湖批计算服务 |
| EMR          | Hadoop/Spark/Hive 等大数据集群   |

- DLC SQL - Data Lake Compute, 数据湖计算
  - 封装的一套 SuperSQL 方言
  - 底层主要运行在 Spark SQL 引擎上。
  - Serverless Spark
- Oceanus
  - Flink SQL
  - Flink JAR
  - Python
- CEP - Complex Event Processing, 复杂事件处理
- EMR
  - Hadoop/Spark/Hive 等大数据集群
  - 托管 Hadoop 生态
- Hive, SparkSQL, Impala, TCHouse-{P,X,C,D}, TDSQL MySQL/PostgreSQL, Graph, DLC, TBase, DM, Trino, Kyuubi, TDengine

---

- WeData「函数开发」
  - 不支持 Flink，只支持 Hive SQL、Spark SQL、DLC SQL
- WeData「实时同步任务」
  - 官方文档只明确支持 Flink 内置函数
- Oceanus/Flink SQL 作业
  - 支持上传 JAR 并注册 Flink UDF
- Oceanus/Flink JAR 作业
  - 可以直接写完整 DataStream/CEP 程序
  - https://cloud.tencent.com/document/product/849/48243

```sql
SET hive.execution.engine;
```

- Flink 不支持移除 JSON KEY

```sql
CREATE TEMPORARY SYSTEM FUNCTION JSON_REMOVE
AS 'com.example.flink.JsonRemoveFunction'
LANGUAGE JAVA;
```
