---
id: olap
title: OLAP
---

# Online Analytical Processing
## Tips
* 数据摄取 -> 数据存储 -> 数据处理 -> 数据访问
* 关键技术
  * 预聚合 - Apache Kylin、Druid
    * Cube
    * 已知业务指标、数据具有一定结构性
  * MPP
    * 并发数据处理
  * 索引 - Elastic、Solr
    * 搜索为主，大量数据中选择小部分数据
  * 列存储 - Impala
    * 高压缩比、低IO、快速过滤
    * 数据量大，不适合大JOIN
  * 内存处理 - Presto
    * 快速计算处理
* 选择出发点
  * 数据量级：G、T、P、单表量级
  * 数据类型：时序、日志、事件、行为、汇总
  * 操作类型：聚合、搜索、统计、指标、JOIN
  * 读写类型：读为主、写为主、流写入、是否更新
  * 集成能力：支持多少外部数据源、是否能流处理
  * 存储计算：偏向存储还是计算分析
  * 是否需要 Hadoop 生态
  * 存储时效
* 常见特性
  * 秒级响应
  * 并发
  * 数据集大小
  * SQL 支持
  * 离线处理
  * 实时处理
  * 去重
  * 明细
  * 数据结构变化
  * JOIN
* 参考
  * [Big data architecture: BI and Analytics (Part 2)](https://www.slideshare.net/welkaim/big-data-architecture-bi-and-analytics-part-2)  


