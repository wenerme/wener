---
title: Apache Cassandra
---

# Cassandra

## Tips
* http://cassandra.apache.org/
* 配置文件 http://cassandra.apache.org/doc/latest/configuration/cassandra_config_file.html
* [scylladb](http://www.scylladb.com/)
  * 相当于是 C++ 实现的 Cassandra
  * 与 Cassandra 协议兼容
  * 网络线程模型和 Cassandra 不同
  * 基于 [seastar](https://github.com/scylladb/seastar) 框架
* http://projects.spring.io/spring-data-cassandra/
  * http://docs.spring.io/spring-data/cassandra/docs/1.5.4.RELEASE/reference/html/
* 客户端
  * https://stackoverflow.com/a/17523595/1870054
  * https://github.com/serge-rider/dbeaver
  * JDBC https://github.com/datastax/java-driver/tree/3.x/manual/shaded_jar
* 数据模型
  * [Data modeling concepts](http://docs.datastax.com/en/cql/3.3/cql/ddl/dataModelingApproach.html)
* 硬件要求 - 生产最低 2核8G，推荐 8核 32G

```bash
# 启动用于测试的服务
# 暴露 JMX 和 CQL 端口
# 使用了 mmap, 在 mac 下不能映射 volume
docker run -it --rm -p 9042:9042 -p 7199:7199 -v /data/cassandra/dev:/var/lib/cassandra cassandra

# 本地连接 docker 中的服务器
cqlsh `docker-machine ip`

# 可从容器中将配置拷贝出来
docker cp cassandra:/etc/cassandra config

# 自定义 yaml 配置
JVM_OPTS="$JVM_OPTS -Dcassandra.config=file://$PWD/config/cassandra.yaml" cassandra -f

# 默认配置目录 /usr/local/etc/cassandra/
# 默认数据目录 /usr/local/var/lib/cassandra/
brew install cassandra

```

```sql

-- 创建空间
CREATE KEYSPACE Excelsior
WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};
USE Excelsior;
-- 创建一个最小表
CREATE TABLE t (k text PRIMARY KEY);
-- 插入和查询
INSERT INTO t(k) values('Hello');
SELECT * FROM t;

-- http://docs.datastax.com/en/cql/3.3/cql/cql_reference/cqlshDescribe.html
-- 显示所有表
DESCRIBE TABLES;

```

## Notes
* `org.apache.cassandra.config.YamlConfigurationLoader`
  * 加载 YAML 配置
* `org.apache.cassandra.config.Config`
  * 配置类
* 主键
  * 类型
    * 分片
    * 集群

## Doc Notes
* 端口
  * 7000 集群通信
  * 7001 集群通信 SSL
  * 9042 客户端
  * 7199 JMX
* 默认 BLOB 最大 16M
  * max_mutation_size_in_kb
  * commitlog_segment_size_in_mb 的一半
* BLOB 没有做特殊优化, 建议 <10MB 单个值, 更大的 BLOB 建议应用分块
* 分片键相同的行在同一个分片
* STATIC 列由同一个分片共享
  * 与 COMPACT STORAGE 冲突
* 主键由两部分组成
  * 分片键, Partition Key
  * 族群列, Clustering Columns
  * `PRIMARY KEY (a)`
    * 分片键 a
    * 没有族群列
  * `PRIMARY KEY (a, b, c)`
    * 分片键 a
    * 族群列 b, c
  * `PRIMARY KEY ((a, b), c)`
    * 组合分片键 a,b
    * 族群列
* COMPACT STORAGE
  * 创建后不可修改
  * 4.0 后已经移除, 不建议使用
  * 限制
    * 不能使用集合和 STATIC 列
    * 如果一个 compact table 有至少一列 clustering column,那么在主键之外只能有一列
    * 也就意味着在创建后不能修改列定义
    * compact table 只限制了创建的索引, 而 materialized view 是不受限制的
* CLUSTERING ORDER
  * 创建后不可修改
  * 用于修改族群列的顺序
  * 限制
    * 会影响 SELECT 能够使用的 order 顺序
    * 如果 `WITH CLUSTERING ORDER (a DESC, b ASC)`
      * 可以使用 `ORDER BY (a DESC, b ASC)`, `ORDER BY (a ASC, b DESC)`
      * 不能使用 `ORDER BY (a ASC, b ASC)`, `ORDER BY (a DESC, b DESC)`
    * 会修改默认顺序
      * 分片内会以定义的顺序返回
    * 在某些查询中,反序查询可能会有一定的性能影响
* 创建表时的 WITH [选项](http://cassandra.apache.org/doc/latest/cql/ddl.html#other-table-options)
* Materialized View
  * 由三个部分组成
    * SELECT 语句
    * 主键
      * 必须包含所有基础表的主键
      * 只能包含一个额外列作为主键
    * 选项
* 安全
  * 角色
    * 可以有密码
    * 可以控制是否允许登陆
  * 权限
    * 类型
      * CREATE
      * ALTER
      * DROP
      * SELECT
      * MODIFY
      * AUTHORIZE
      * DESCRIBE
      * EXECUTE
    * 资源
      * ALL KEYSPACES -> KEYSPACE -> TABLE
      * ALL FUNCTIONS -> KEYSPACE -> FUNCTION
      * ALL ROLES -> ROLE
      * ALL MBEANS -> MBEAN
  * 用户
    * 主要用于兼容
    * 相当于新版本中的角色
* 函数
  * 标量函数
  * 聚合函数
  * 处于安全考虑, 用户定义函数默认是关闭的, `enable_user_defined_functions`
  * 用户定义函数会运行在沙箱中
  * 內建函数
    * `cast` 类型转换 `SELECT avg(cast(count as double)) FROM myTable`
    * `token` 计算分片键
    * `uuid` 生成 UUID
    * `now` 生成 timeuuid
  * 用户定义函数
    * 使用 Java 编写
    * 上下文为 `org.apache.cassandra.cql3.functions.UDFContext`
* JSON
  * 依然是强类型的
  * 只是简化基于 JSON 的操作
  * 提供 fromJSON 和 toJSON 函数
* 触发器
  * 创建触发器需要制定对应的 Java 类
  * 将 Java 类放在 `lib/triggers`
