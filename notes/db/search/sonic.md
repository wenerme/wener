---
title: sonic
---

# sonic

- [valeriansaliou/sonic](https://github.com/valeriansaliou/sonic)
  - MPL-2.0, Rust
  - schema-less search backend
  - 基于 fs 存储搜索
  - 高性能、低内存
  - 单节点
  - 支持多语言
  - 存储区分 FST 和 KV
  - KV 为 RocksDB - Workd <-> Index 关系
  - FST 记录出现的词 - [Finite-State Transducer](https://en.wikipedia.org/wiki/Finite-state_transducer)
    - 每出现一个新词就会从新构建 fst
    - SUGGEST 基于 fst
    - 使用 Levenshtein distance 矫正 typo
  - 索引词会 Hash，fst 包含未 hash 词用于 SUGGEST
  - 推荐使用多 bucket 来分担 kv 压力
    - 非常适用于聊天这种有 session 的场景
  - 不会存储原文 - 查询返回给的 ID
  - 使用 ngram/trigrams 分词
- 默认端口 1491
- 参考
  - [Announcing Sonic: A Super-Light Alternative to Elasticsearch](https://journal.valeriansaliou.name/announcing-sonic-a-super-light-alternative-to-elasticsearch/)
  - NodeJS SDK [valeriansaliou/node-sonic-channel](https://github.com/valeriansaliou/node-sonic-channel)
  - [协议](https://github.com/valeriansaliou/sonic/blob/master/PROTOCOL.md)

:::caution

- SUGGEST 不支持中文 - [valeriansaliou/sonic#203](https://github.com/valeriansaliou/sonic/issues/203)
- 由于会设置 retain_word_objects 上限 - 导致部分连词无法搜索 - 默认 1000
  - 例如: 文儿科技，因为科技出现的频度过高，会导致搜索 `文儿科技` 无结果，但搜索 `文儿` 有结果

:::

```bash
# macOS
brew install sonic

docker run --rm -it \
  -p 1491:1491 \
  -v /path/to/your/sonic/config.cfg:/etc/sonic.cfg \
  -v /path/to/your/sonic/store/:/var/lib/sonic/store/
  --name sonic valeriansaliou/sonic

curl -LO https://github.com/valeriansaliou/sonic/raw/master/config.cfg
sonic -c config.cfg
```

## config.cfg

- [config.cfg](https://github.com/valeriansaliou/sonic/blob/master/config.cfg)
- [CONFIGURATION](https://github.com/valeriansaliou/sonic/blob/master/CONFIGURATION.md)
- 可以使用环境变量 `${env.SECRET}` - 只能用于字符串

```ini
[server]
# debug, info, warn, error
log_level = "error"


[channel]

inet = "[::1]:1491"
tcp_timeout = 300
auth_password=

[channel.search]
# 默认查询返回数量
query_limit_default = 10
# 查询最多返回
query_limit_maximum = 100
# 结果不够尝试近似词
query_alternates_try = 4
# 默认推荐返回数量
suggest_limit_default = 5
# 推荐最多返回
suggest_limit_maximum = 20


[store]

[store.kv]
# 存储位置
path = "./data/store/kv/"
# World -> Index 数量 - 滑动窗口
# 也就是说一个搜索词最多关联 1000 条记录 - offset 1000 不会返回数据
# 设置过大影响性能 https://github.com/valeriansaliou/sonic/issues/258
retain_word_objects = 1000

[store.kv.pool]
# 不活跃时间间隔 - 关闭缓存数据库
inactive_after = 1800

[store.kv.database]
# 应该低于 store.kv.pool.inactive_after
flush_after = 900
# 是否压缩 - zstd
compress = true
parallelism = 2
# 最多打开文件数
max_files =
max_compactions = 1
max_flushes = 1
# 单位 KB - 默认 16MB
write_buffer = 16384
# WAL 避免丢失未 flush 的数据
write_ahead_log = true

[store.fst]

path = "./data/store/fst/"

[store.fst.pool]

inactive_after = 300

[store.fst.graph]
# 小于 store.fst.pool.inactive_after
consolidate_after = 180
# graph 文件大小限制
# 单位 KB - 1024 倍数
max_size = 2048
# graph 中的词数
max_words = 250000
```

## Telnet

```bash
telnet localhost 1491
```

```
CONNECTED <sonic-server v1.3.0>
start search SecretPassword
suggest foo test "wener"
ping
```

# FAQ

## push executor term-to-iids object too long

retain_word_objects 默认 1000，超过则不再索引
