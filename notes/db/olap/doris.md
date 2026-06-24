---
title: Apache Doris
---

# Apache Doris

- [apache/doris](https://github.com/apache/doris)
  - 开源的实时数据仓库 (Real-time Data Warehouse)
  - MPP (Massively Parallel Processing) 架构
  - 前身是百度的 Palo 项目，2022年成为 Apache 顶级项目
- **核心特性**
  - **极速分析**：列式存储、向量化执行引擎、CBO (基于代价的优化器)、MPP 并行计算
  - **实时性**：支持高并发点查与复杂分析，支持秒级/亚秒级数据导入 (Stream Load, Routine Load)
  - **极简架构**：仅包含 FE (Frontend) 和 BE (Backend) 两类进程
    - **FE**：负责请求接入、SQL 解析、查询规划与元数据管理
    - **BE**：负责数据存储和查询计划的执行
  - **兼容性**：高度兼容 MySQL 协议与标准 SQL，无缝对接各类 BI 工具
  - **Unified Lakehouse**：支持外表直接联邦查询数据湖 (Hive, Iceberg, Hudi) 和关系型数据库 (MySQL, PG)
  - **存算分离**：新版本支持存算分离架构 (Storage-Compute Separation)，底层对接 S3/HDFS 等共享存储

# MySQL

- https://doris.apache.org/docs/dev/query-data/mysql-compatibility
