# TiDB

* [代码解释](https://pingcap.github.io/blog/2017/01/06/about-the-tidb-source-code/)

* SQL -> TiDB -> TiKV
* TiDB
  * OLAP 主要 + OLAP 次要
  * MySQL 协议层
  * SQL 层
  * 执行优化
  * 抽象的底层 KV 存储
  * 支持 mem,hbase,goleveldb,boltdb
  * 解析使用 goyacc + golex
  * 实现了 infoschema + perfschema
  * 支持基本的分布式 SQL, 通过将查询序列化后发送到 region server  
* TiKV
  * 分布式 KV 存储
* Features
  * 变更通知
  * Stream SQL
  * Binlog server
  * Binlog client
