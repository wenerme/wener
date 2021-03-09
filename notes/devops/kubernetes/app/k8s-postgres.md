---
title: PostgreSQL
---

# PostgreSQL on Kubernetes

* 部署方案
  * 存储高可用 - 然后部署 pg
    * 延时高 - 分布式存储一般 IO 不稳定
    * 简单易用易维护
    * Longhorn, OpenEBS
  * PG 高可用，不依赖存储
    * 相对复杂
    * 支持更大规模 pg
    * [zalando/postgres-operator](https://github.com/zalando/postgres-operator)

