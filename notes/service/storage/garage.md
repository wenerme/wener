---
title: garage
---

# garage

- [Deuxfleurs/garage](https://git.deuxfleurs.fr/Deuxfleurs/garage)
  - AGPLv3, Rust
  - 分布式 S3-compatible object store
  - metadata + chunk
    - metadata - lmdb, sqlite
    - chunk - 1M
      - 对小文件友好
      - 如果节点之间网速理想，可修改为较大值 例如 1 Gbps -> 10MiB
- 特性
  - S3
  - GEO Distribution
  - Standalone - 自包含 metadata & data，不依赖外部，单 binary
  - 压缩 & 去重
  - K2V API - 实验性
- gateway
  - 只提供接口不存储数据
- 参考
  - mirror [deuxfleurs-org/garage](https://github.com/deuxfleurs-org/garage)
  - [S3 Compatibility](https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/)
    - 不支持 ACL, Policies, Versioning, Replication, Locking, Encryption, Tagging
  - [Deuxfleurs/bagage](https://git.deuxfleurs.fr/Deuxfleurs/bagage)
    - WebDAV -> S3
  - https://news.ycombinator.com/item?id=41013004
  - 实现
    - The Dynamo ring
    - CRDTs

:::tip

garage 是一个分布式对象存储系统，兼容 S3 API，支持 GEO 分布，压缩和去重。

如果核心需求是 分布式 和 S3 API 那么 garage 是目前开源的最佳选择。

- vs Minio - AGPLv3, Go
  - minio 分布式实施起来更复杂
  - minio 会保持目录文件结构
  - minio 辅助功能更多
- vs seaweedfs - Apache-2.0, Go
  - seaweedfs 默认是 对象存储
  - S3 API 需要 filer，需要额外的 metadata
- vs juicefs - Apache-2.0, Go
  - juicefs 是 metadata+chunk 套壳提供 POSIX 接口
  - juicefs 本身不存储数据，不提供 S3 API

:::

:::caution

- 不支持匿名 Bucket 访问 - 支持暴露 website

:::

```bash
# 禁用的功能 bundled-libs, sqlite, k2v
apk add garage # Alpine

docker run --rm -it dxflrs/garage:v1.0.0

cat > garage.toml << EOF
metadata_dir = "/tmp/meta"
data_dir = "/tmp/data"
db_engine = "sqlite"

replication_factor = 1

rpc_bind_addr = "[::]:3901"
rpc_public_addr = "127.0.0.1:3901"
rpc_secret = "$(openssl rand -hex 32)"

[s3_api]
s3_region = "garage"
api_bind_addr = "[::]:3900"
root_domain = ".s3.garage.localhost"

[s3_web]
bind_addr = "[::]:3902"
root_domain = ".web.garage.localhost"
index = "index.html"

[k2v_api]
api_bind_addr = "[::]:3904"

[admin]
api_bind_addr = "[::]:3903"
admin_token = "$(openssl rand -base64 32)"
metrics_token = "$(openssl rand -base64 32)"
EOF

RUST_LOG=garage=info garage -c garage.toml server

sudo chmod 0600 /etc/garage/rpc_secret

su -l garage garage -c /etc/garage/garage.toml server
```

## 配置 {#config}

```bash
# 单节点
node_id=$(garage node id -q | cut -d@ -f1)
garage layout assign -c1 -z garage $node_id
garage layout apply --version 1
```

- replication_factor
  - 1 - 单节点存储
  - 2 - 两个节点存储，会尽量存储到不同 zone
  - 3 -
  - 5,7 - 单选择大于 3 节点的时候，建议选择奇数

:::caution replication_factor

- 确保所有节点的配置相同
- 不支持直接修改
- 修改步骤
  - 关闭集群
  - 删除 meta custer_layout
  - 更新所有的 replication_factor
  - 重启集群
  - 重建 layout
  - 集群会 rebalance

:::

- consistency_mode
  - consistent - 默认
    - 读写都需要 quorum
  - degraded
    - 读不需要 quorum
    - 写同 consistent
    - 不支持 read-after-write consistency
  - dangerous
    - 读写都不需要 quorum
- db_engine
  - lmdb - 默认
    - 性能更好
    - 数据需要能 fit 到内存
    - 不能跨架构： arm64、amd64 的存储结构不同
    - 可能导致损坏
  - sqlite
    - Alpine 默认没有构建

```toml
# 元数据目录
metadata_dir = "/var/lib/garage/meta"
# 数据目录
data_dir = "/var/lib/garage/data"

# 数据库引擎是否启用同步模式
#metadata_fsync = false

# 是否在数据块保存到磁盘后，对其及其所在的目录进行 fsync 操作。
#data_fsync = false

# 是否每月大约自动运行一次数据目录的擦洗操作。如果你已经在文件系统级别进行擦洗，可以设置此选项为 true 以禁用自动擦洗。
#disable_scrub = false

# 用于存储元数据的数据库引擎。可选值：lmdb、sqlite。
#db_engine = "lmdb"

# 存储对象的块大小。
#block_size = "1M"

# S3 API 节点在发送到存储节点之前异步保存到内存中的数据块的总大小限制。
#block_ram_buffer_max = "256MiB"

# LMDB 使用的映射大小，即用于映射数据库文件的虚拟内存区域的大小。它不受运行 Garage 的机器的物理 RAM 大小的限制。
#lmdb_map_size = "1T"

# 这个值可以是任何比你的集群节点数小的正整数。它在所有节点的配置文件中必须一致！如果你运行的是 Garage 节点集群，请将此值更改为至少 2！
replication_factor = 1

# 这个选项决定了你的集群的读写行为。在更改之前请先阅读参考手册！
#consistency_mode = "consistent"

# 用于存储块的 Zstd 压缩级别。默认值为 1。
#compression_level = 1

# 绑定用于集群间通信的地址和端口。
# 提示：如果运行的是单节点集群，请将其更改为 127.0.0.1:3901。
rpc_bind_addr = "[::]:3901"

# 如果启用，在尝试连接到远程节点之前，将为传出连接绑定所有与侦听使用相同 IP 地址的套接字（rpc_bind_addr）。
#rpc_bind_outgoing = false

# 其他节点需要使用此地址和端口来联系此节点以进行 RPC 调用。
# rpc_public_addr = "127.0.0.1:3901"

# 在集群中的所有节点之间共享的密钥文件，用于识别这些节点并允许它们相互通信。该密钥是一个 32 字节的十六进制编码随机字符串。
# 如果此文件不存在，它将在服务启动时自动创建一个随机字符串。
rpc_secret_file = "/etc/garage/rpc_secret"

# 用于联系此集群的其他 Garage 节点的对等标识符列表。格式：<节点公钥>@<节点公网 IP 或主机名>:<端口>。
#bootstrap_peers = []

[s3_api]
# 绑定 IP 和端口以接受 S3 API 调用。
api_bind_addr = "[::]:3900"

# 区域名称。
s3_region = "garage"

# 允许通过 vhost 风格（而非路径风格）访问 bucket 时的可选后缀。
root_domain = ""

[s3_web]
# 绑定 IP 和端口以接受 HTTP 请求访问已配置为网站访问的存储桶。
bind_addr = "127.0.0.1:3902"

# 追加到存储桶名称后的可选后缀，用于对应的 HTTP 主机。
root_domain = ""

[admin]
# 如果指定，Garage 将绑定一个 HTTP 服务器到此端口和地址，并在此上监听管理功能的请求。
#api_bind_addr = ""

# 用于访问所有其他管理端点的令牌。
# 如果未设置，则完全禁用对这些端点的访问。
#admin_token = ""
# 或从文件中读取。
# admin_token_file = "/etc/garage/admin_token"

# 用于访问 Metrics 端点的令牌。如果未设置，则可以在没有访问控制的情况下访问 Metrics 端点！
#metrics_token = ""
# 或从文件中读取。
# metrics_token_file = "/etc/garage/metrics_token"
```

- https://garagehq.deuxfleurs.fr/documentation/reference-manual/configuration/

## cluster

```bash
cat << EOF > garage.toml
metadata_dir = "/var/lib/garage/meta"
data_dir = "/var/lib/garage/data"
db_engine = "sqlite"
metadata_auto_snapshot_interval = "6h"

replication_factor = 3

compression_level = 2

rpc_bind_addr = "[::]:3901"
rpc_public_addr = "<this node's public IP>:3901"
rpc_secret = "<RPC secret>"

[s3_api]
s3_region = "garage"
api_bind_addr = "[::]:3900"
root_domain = ".s3.garage"

[s3_web]
bind_addr = "[::]:3902"
root_domain = ".web.garage"
index = "index.html"
EOF
```

## Internal

- CAS / Content Addressable Storage
  - 内部 chunk dedup
  - 使用 zstd 压缩
