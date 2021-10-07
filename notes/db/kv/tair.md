---
title: Tair
---

# Tair

- [alibaba/tair](https://github.com/alibaba/tair) - 分布式 KV 存储
  - MDB 纯内存，基于 memcache；rdb 基于 Redis；LDB 基于 leveldb
  - 集群分为 ConfigServer 和 DataServer
  - 客户端路由
  - 特性
    - 二级索引
    - 支持版本
    - 支持失效
    - 支持计数器
