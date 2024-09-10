---
tags:
  - Apache
---

# KvRocks

- Apache [KvRocks](https://github.com/apache/kvrocks)
  - sicne 2019
  - distributed, RocksDB, Redis protocol
  - 支持 Namespace
- [apache/kvrocks-controller](https://github.com/apache/kvrocks-controller)
  - Apache-2.0, Go
- 参考
  - [支持的命令](https://kvrocks.apache.org/docs/supported-commands)
    - 支持 BF, JSON, GEO, FT
    - MOVEX 在 namespace 之间移动 key

:::caution

- Redis 4.0.0  兼容，部分 client 不支持
  - 例如 bullmq 要求 5.0+

:::

```bash
REDIS_PASSWORD=$(openssl rand -base64 32)
docker run -it -p 6666:6666 apache/kvrocks --bind 0.0.0.0 --port 6666 --requirepass $REDIS_PASSWORD --redis-cursor-compatible=true
```

- requirepass 对应的用户为 admin
- namespace 需要通过配置持久化
- `__namespace` 默认

```shell
namespace add ns1 my_token  # Token 绑定到 Namespace
namespace set ns1 new_token # 修改 Token
namespace get *             # 列出所有 Namespace

auth ns1 my_token # 切换 Namespace

namespace del ns1 # 删除 Namespace

compact # 执行 rocksdb 的 compact - 释放磁盘空间
```

## 配置 {#config}

```
# 配置定义 namespace
namespace.NS TOKEN_FOR_NS

# ⚠️ 不能事后更改
cluster-enabled no
```

- https://github.com/apache/kvrocks/blob/v2.9.0/kvrocks.conf

## internal {#internal}

```
+-------------+-------------+------------------------------+-----------------+------------+-------------+-----------+
|  ns size    |  namespace  |   cluster slot               |  user key size  |  user key  |   version   |  sub key  |
| (1byte: X)  |   (Xbyte)   | (2byte when cluster enabled) |   (4byte: Y)    |   (YByte)  |   (8byte)   |  (ZByte)  |
+-------------+-------------+------------------------------+-----------------+------------+-------------+-----------+
```

```
+----------------------------------------+
|               flags                    |
+----------------------------------------+
|  (1byte: | version -> <- data type |)  |
+----------------------------------------+
```

- https://kvrocks.apache.org/community/data-structure-on-rocksdb/
