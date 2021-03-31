---
id: db
title: 数据库
---

# Database

## Tips
* [Database eLearning](https://db.grussell.org/index.html)
* [DB-Engines Ranking](https://db-engines.com/en/ranking)
* Aphyr [jepsen](https://aphyr.com/tags/jepsen)
* [EventQL](https://github.com/eventql/eventql)
  * [EventQL](http://eventql.io/) is a distributed, column-oriented database built for large-scale event collection and analytics. It runs super-fast SQL and MapReduce queries.
* [Carte](https://crate.io/)
  * SQL FOR THINGS DATA
  * Real-time SQL. Simple scaling. Millions of inserts per second.
  * CrateDB offers Standard-SQL, real-time queries and document support (JSON) in a simple, horizontal way to scale.
  * IoT & Sensors
    * Stream millions of data points per second into CrateDB and query them in real time to visualize, track, and predict.
  * Log & Event Analytics
    * Analyze logs from IT infrastructure to monitor security, compliance, usage, billing, and more.
  * Time Series, Geospatial, Machine Learning
    * Versatile SQL engine enables complex queries, text searches, and aggregations – in real time or against volumes of historic data.
* [caesar0301/awesome-public-datasets](https://github.com/caesar0301/awesome-public-datasets)
* https://dbmstools.com/

## FAQ
### OLTP vs OLAP vs NoSQL vs NewSQL vs Data Warehouse vs Data Mart vs Data Lake
* OLTP
  * 面向交易场景
  * 强事务，强一致，较低 RT，低频度更新
  * 存储实时数据，数据量小
* OLAP
  * 面向分析报表统计，以读为主
  * 弱事务，弱一致性，对响应有一定要求
  * 存储明细数据，历史数据，数据量大
* NoSQL
  * 应付特殊场景
  * 例如：吞吐、延时、操作便携、数据量、实时、并发、搜索、外部集成、数据组织模式（图、空间、时序）
  * 接口形式各不相同，事务保障各部相同
* NewSQL
  * 接口是SQL标准的 NoSQL
  * 具有OLTP的属性，能横向扩容
  * 一般 SQL 引擎 + 分布式 KV 存储实现
  * 通常会实现 MySQL 或 PostgreSQL 的协议
* [Data Warehouse](https://en.wikipedia.org/wiki/Data_warehouse)
  * 数据仓库
  * 企业纬度的数据管控
  * 一套系统，体系化的解决企业内部数据存储、处理、分析问题
  * 数据量巨大，对响应要求低
  * 统一平台，由很多部分组成，有开发平台
  * 面向开发和 BI
  * 面向企业整体
  * 数据有一定结构
* [Data Mart](https://en.wikipedia.org/wiki/Data_mart)
  * 数据仓库的一种特殊形式，数据仓库的子集
  * 面向业务、组织部门、某一领域
  * 企业内一定数据共享，数据具有结构性
* Data Lake
  * 存储原始数据，保持低廉的存储成本
  * 规模和数据量比 DW 大，处理更慢，读取时定义数据结构
  * Hadoop 是 DL，而在这之上的 HBase 则是 DW
  * 一般数据不允许更新
