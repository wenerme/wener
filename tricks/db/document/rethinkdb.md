---
id: rethinkdb
title: RethinkDB
---

# RethinkDB

## Tips
* [default.conf.sample](https://github.com/rethinkdb/rethinkdb/blob/next/packaging/assets/config/default.conf.sample)
  * 带注释的配置文件例子
  * 配置项并不多,基本所有的配置都可以通过参数指定
* 默认客户端端口 28015
* 默认集群端口 29015
* 默认管理端口 8080
* 定义协议的 [ql2.proto](https://github.com/rethinkdb/rethinkdb/blob/next/src/rdb_protocol/ql2.proto)
* [限制](https://rethinkdb.com/limitations/)
  * 集群
    * 最大 64 个分片
  * 文档
    * 一个表大约在每个实例上要占用 10 MB, 一个空表大约需要 4 MB
    * 每个表至少需要 8 MB 内存
    * 每个文档建议不超过 16 MB
    * 最大的 JSON 查询时 64MB
    * RethinkDB 需要将结构记录在内存中, 大约需要数据 1% 的内存
  * 键
    * 主键最长 127 个字符
    * 二级键只会索引前 238 - 主键长度 的字节,
    * 二级索引不会索引对象或 null
    * 主键字符串不能包含 null
  * 数据类型
    * 数字为双精度浮点数, -2^53 - 2^53, 数字不能为 NaN 或无限
    * 默认数组不能超过 100,000,可通过 arrayLimit 选项修改
  * 其他
    * 索引使用字节序,而非字符顺序
    * 部分文件系统(例如加密的,压缩的)不支持 direct-io 选项
    * btrfs 的 direct-io 支持有问题
    * 默认情况下, RethinkDB 会返回还没提交到磁盘的并发写请求, 可通过 read_mode 选项控制隔离级别.
* ReQL
  * [SQL to ReQL](https://rethinkdb.com/docs/sql-to-reql/javascript/)
* 问题
  * [#6618](https://github.com/rethinkdb/rethinkdb/issues/6618) Is rethinkdb dead ?

```bash
# 启动两个示例,组成一个集群,数据会分别存储到 data-a 和 data-b
rethinkdb -d data-a -n svr_a
rethinkdb -d data-b -n svr_b -o 100 -j 127.0.0.1
```