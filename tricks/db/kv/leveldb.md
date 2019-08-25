---
id: leveldb
title: LevelDB
---

# LevelDB

## Tips
* [c.h](https://github.com/google/leveldb/blob/master/include/leveldb/c.h) - C API
  * 可看到核心接口和能力，其他语言的封装主要基于 C
  * KV 读写删、迭代器、批量写、快照、压缩、比较器
  * 没有暴露 Slice 类型
  * 原子操作通过批量操作实现
* 文件单线程，DB对象线程安全
* 基于 LevelDB 做 KKV 的一般是使用 Prefix 实现，查询时使用迭代器
* 同一个快照下，看到的数据不变
* KV允许包含 `\0`

