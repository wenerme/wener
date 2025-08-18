---
title: rustfs
---

# rustfs

- https://github.com/rustfs/rustfs
  - Apache-2.0, Rust
- 参考
  - https://docs.rustfs.com/en/comparison.html
- **9000**: S3 API endpoint
- **9001**: Web console (if enabled)
- **9002**: Admin API (if enabled)
- **50051**: gRPC API (if enabled)

```bash
# S3 http://127.0.0.1:9000
# Console http://127.0.0.1:9001
docker run --rm -it \
  --name rustfs \
  -p 9000:9000 \
  -p 9001:9001 \
  -v $PWD/rustfs/data/:/data \
  -e RUSTFS_VOLUMES=/data/rustfs0,/data/rustfs1,/data/rustfs2,/data/rustfs3 \
  -e RUSTFS_ACCESS_KEY=rustfsadmin \
  -e RUSTFS_SECRET_KEY=rustfsadmin \
  -e RUSTFS_CONSOLE_ENABLE=true \
  rustfs/rustfs:latest

# Multi-Node Multi-Drive (MNMD)
# 4 nodes, 4 drives each (16 drives total)
rustfs server http://node{1...4}.example.com/data{1...4} \
  --console-address ":9001"

# Multi-Node Single-Drive (MNSD)
# 4 nodes, 1 drive each
rustfs server http://node{1...4}.example.com/data \
  --console-address ":9001"
```

| 变量                     | 默认值         | 说明                   |
| ------------------------ | -------------- | ---------------------- |
| `RUSTFS_VOLUMES`         | 必填           | 以逗号分隔的数据卷列表 |
| `RUSTFS_ADDRESS`         | `0.0.0.0:9000` | 服务器绑定地址         |
| `RUSTFS_CONSOLE_ENABLE`  | `false`        | 是否启用 Web 控制台    |
| `RUSTFS_CONSOLE_ADDRESS` | `0.0.0.0:9001` | 控制台绑定地址         |
| `RUSTFS_ACCESS_KEY`      | `rustfsadmin`  | S3 访问密钥            |
| `RUSTFS_SECRET_KEY`      | `rustfsadmin`  | S3 密钥                |
| `RUSTFS_LOG_LEVEL`       | `info`         | 日志级别               |
| `RUSTFS_OBS_ENDPOINT`    | `""`           | 可观测性（监控）端点   |
| `RUSTFS_TLS_PATH`        | `""`           | TLS 证书路径           |

- /data/rustfs{0,1,2,3}
- /app/logs
- /etc/rustfs/
- /etc/ssl/rustfs/
- https://github.com/rustfs/rustfs/blob/main/crates/protos/src/node.proto
