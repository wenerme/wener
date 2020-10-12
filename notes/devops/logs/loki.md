# Loki
## Tips
* [grafana/loki](https://github.com/grafana/loki)
* [Architecture](https://grafana.com/docs/loki/latest/architecture/)
* 参考
  * [An introduction to Loki, the Prometheus-inspired open source logging system](https://grafana.com/blog/2020/05/12/an-only-slightly-technical-introduction-to-loki-the-prometheus-inspired-open-source-logging-system/)

## collector
* https://grafana.com/docs/loki/latest/clients/
* Promtail
* FluentD & Fluent-bit

## 存储
* [Loki Storage](https://grafana.com/docs/loki/latest/operations/storage/)
* writes a chunk per stream
* chunk_target_size (around 1MB), max_chunk_age (increase beyond 1h), chunk_idle_period (increase to match max_chunk_age)
* index
  * Amazon DynamoDB
  * Google Bigtable
  * Apache Cassandra
  * BoltDB - 单机
  * BoltDB Shipper - 实验阶段
* chunk
  * Amazon DynamoDB
  * Google Bigtable
  * Apache Cassandra
  * Amazon S3
    * 权限
      * s3:ListBucket
      * s3:PutObject
      * s3:GetObject
  * Google Cloud Storage
  * Filesystem - 单机，除非 NFS - NFS 体验不好
    * 单目录最多 5.5m [#1502](https://github.com/grafana/loki/issues/1502)


## 组件
* [Components](https://grafana.com/docs/loki/latest/architecture/#components)
* Distributor
  * Hashing
    * Consul
  * Quorum consistency
* Ingester
  * 状态 - PENDING, JOINING, ACTIVE, LEAVING, UNHEALTHY
  * Handoff
* Query frontend
  * 可选，无状态查询缓存
  * 队列
  * 拆分
  * 缓存
* Querier
  * 处理 LogQL - 查询分发
  * 去重
* 读取路径
  1. querier 接收到 HTTP 请求
  2. querier 将查询传递给 ingesters 处理内存数据
  3. ingesters 接收到读取请求返回匹配数据
  4. querier 从 backing store 懒加载数据 - 如果 ingesters 未返回数据
  5. querier 便利接收到的数据就行去重，返回最终结果
* 写入路径
  1. distributor 接收到写入请求 流
  2. 通过 hash ring 对 流 就行 hash 选取 ingesters
  3. distributor 将每个流转发给对应的 ingesters 和 副本
  4. ingester 会将流写入 chunk - chunk 在租户的 labelset 下唯一
  5. distributor 返回成功
  