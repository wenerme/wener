---
title: litestream
---

# litestream

- [benbjohnson/litestream](https://github.com/benbjohnson/litestream)
  - 支持存储 s3, sftp, file
- HOW TO
  - litestream 维持一个 读 链接
  - 避免发生 wal_autocheckpoint - 高写入时推荐设置 `wal_autocheckpoint=0`
  - litestream 同步 wal ,执行 checkpoint

:::tip

- 必须使用 WAL 模式
- 建议将 busy_timeout 设置为 5000+
- 推荐 synchronous=NORMAL
- 异步副本 - 默认同步间隔 1s

:::

```bash
# macOS brew 安装
brew install benbjohnson/litestream/litestream
# go install
go install github.com/benbjohnson/litestream/cmd/litestream
# 下载安装
curl -OL https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-darwin-amd64.zip
curl -OL https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz


export LITESTREAM_ACCESS_KEY_ID=minioadmin
export LITESTREAM_SECRET_ACCESS_KEY=minioadmin
# 副本备份
litestream replicate fruits.db s3://localhost:9000/fruits.db
# 在另外地方恢复
litestream restore -o fruits2.db s3://localhost:9000/fruits.db

# SFTP
litestream replicate /path/to/db sftp://USER:PASSWORD@HOST:PORT/PATH


litestream databases          # 显示配置里的所有 DB
litestream generations DST    # 显示 DB 或 URL 的状态
litestream replicate          # 所有
litestream replicate SRC DST  # 单个
litestream restore DST        # 恢复
litestream snapshots DST      # 查看快照
litestream wal DST            # 查看 WAL 状态
```

```yaml title="/etc/litestream.yml"
# 全局 S3 配置
access-key-id: AKIAxxxxxxxxxxxxxxxx
secret-access-key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxx
# Metrics
addr: ':9090'

dbs:
  - path: /var/lib/db1
    replicas:
      - name: my_do_replica
        url: s3://mybkt.litestream.io/db1
        # url 或 独立配置
        type:   s3
        bucket: mybkt.litestream.io
        # S3 path - 如果只有 path 配置，则为 file
        path:   db
        region: us-east1
        access-key-id: AKIAxxxxxxxxxxxxxxxx
        secret-access-key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxx
        force-path-style:
        skip-verify:

        retention: 24h
        retention-check-interval: 1h
        snapshot-interval:
        validation-interval: false
        sync-interval: 1s
```
