---
title: 数据同步模式
slug: etl-pattens
---

# 数据同步模式

> A 同步到 B
>
> DBA -> A -> B -> DBB
>
> Extract -> Load
>
> Extract -Transform-> Load

<!-- more -->

## 场景

**A,B,DBA,DBB 互通性**

| from\to | DBA | A   | B   | DBB |
| ------- | --- | --- | --- | --- |
| DBA     |     |     |     | 🟡  |
| A       |     |     | 🟢  | 🟡  |
| B       | 🟠  | 🟢  |     |     |
| DBB     | 🟠  |     |     |     |

- 🟢 - 有可能 - A <-> B
- 🟡 - 也许可能 - 提供公有云数据库作为同步目标
- 🟠 - 不太可能
  - 如果是内部服务是可能的

## 模式

- Push - 推 - A -> B
- Pull - 拉 - A <- B
- Reactive - A <-> B
- 第三方 - A -> X -> B

## 方式

- 全量
- 增量
  - 基于增量游标
  - 基于 CDC 事件
- Schema+Data

## 实现方案

- DBA -> A -> B -> DBB
  - B 暴露 API，A 请求 B - Push/Hook
  - 例如: WebHook
- DBA -> A <- B -> DBB
  - A 暴露 API，B 请求 A - Pull/Query
  - 例如: WebHook
- DBA -> A -> DBB
  - 例如: 配置同步目标给 A, A 直接写入
- DBA -> B -> DBB
  - 例如: RLS 暴露给 B 访问
- DBA <-> DBB
  - 例如: DB Link, Replication
- DBA -> A -> Queue -> B -> DBB
  - A,B 通过 Queue 交互 - A,B 都没有暴露接口
  - 被动
  - Queue 定位
    - 数据存储 - Kafka
    - 信息传输 - Redis, Nats - 例如 RPC over Redis Stream
- DBA -> X -> DBB
- DBA -> A -> X -> B -> DBB
  - 借助第三方服务 - 例如: AirByte, PgLoader
  - X 服务作为 中间服务 与 A,B 交互
    - 替代 Queue 角色
    - 主动
  - X 具有适配能力

## Transform 考虑

- 数据 Schema 适配
- 数据类型适配
- 过滤、转换、计算
- 通常包含逻辑
  - 逻辑 ~= Script
    - Lua, Python, JS
  - gRPC - 外部调用
- Transform 的复杂度决定了是 ETL 还是流处理
  - ETL - 简单适配、调整、元数据
  - 流处理 - 包含状态、依赖前后消息/Window、包含聚合
- 例如: Flink, SparkSQL, Storm、KafkaSQL

## 数据编码 考虑

- 文本编码 - CSV,JSON,JSONL - 基础，丢失类型信息
- 二进制编码 - Avro, Parqute, Protobuf
- CBOR - Concise Binary Object Representation
  - 对比 JSON 能更好的保留类型信息
- Schema+Data - 数据更紧凑
