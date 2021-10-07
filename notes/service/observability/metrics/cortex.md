---
title: Cortex
---

# cortex

- [cortexproject/cortex](https://github.com/cortexproject/cortex)
  - horizontally scalable, highly available, multi-tenant, long term storage for Prometheus.
- [架构](https://cortexmetrics.io/docs/architecture/)
  - 提供远程写入接口
  - 存储支持 cassandra
  - ~~Chunks 存储~~ 废弃
    - index
      - DynamoDB
      - Bigtable
      - Cassandra
    - chunk
      - DynamoDB
      - Bigtable
      - Cassandra
      - S3
      - GCS
      - Azure
  - 块存储 - 实验阶段 - 部分组件基于 Thanos
    - S3
    - GCS
    - Azure
    - 本地文件 - 单节点
- [#865](https://github.com/cortexproject/cortex/issues/865) - 对比其他实现
