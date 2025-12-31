---
title: Twitter 数据与 Snowflake ID
tags:
  - Data
  - Twitter
  - ID
  - Snowflake
  - Architecture
---

# Twitter 数据与 Snowflake ID

- [Twitter IDs (开发者文档)](https://developer.twitter.com/en/docs/basics/twitter-ids.html)
- [Announcing Snowflake](https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake.html)

## Snowflake ID 结构

`64 bits = 1 bit (未使用) + 41 bits (时间戳) + 10 bits (机器 ID) + 12 bits (序列号)`

> 序列号为每线程独立，工作机器号 (worker numbers) 在启动时通过 ZooKeeper 选择。

### 实现与参考

- [Twitter4J](http://twitter4j.org)
- [分布式系统中的唯一 ID 生成 (Slides)](https://www.slideshare.net/davegardnerisme/unique-id-generation-in-distributed-systems)
- [CalliCoder: 分布式唯一 ID (Java)](https://www.callicoder.com/distributed-unique-id-sequence-number-generator/)
- [Instagram ID 分片 (PostgreSQL)](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)
- [Rob Conery: PostgreSQL ID 生成器](http://rob.conery.io/2014/05/28/a-better-id-generator-for-postgresql/)

## 速率限制参考 (Rate Limits)

| 间隔        | 请求数    |
| :---------- | :-------- |
| **15 分钟** | 3,000     |
| **1 小时**  | 12,000    |
| **24 小时** | 288,000   |
| **1 个月**  | 8,640,000 |

> 平均 ~3.3 req/sec
