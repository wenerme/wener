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

