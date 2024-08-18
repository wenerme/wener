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
- 端口
  - 3900 - S3 API
  - 3901 - RPC
  - 3902 - S3 Website
  - 3903 - Admin API
  - 3904 - K2V API
- 参考
  - https://git.deuxfleurs.fr/garage-sdk/garage-admin-sdk-js.git
    - 管理 SDK
  - mirror [deuxfleurs-org/garage](https://github.com/deuxfleurs-org/garage)
  - [S3 Compatibility](https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/)
    - 不支持 ACL, Policies, Versioning, Replication, Locking, Encryption, Tagging
    - 不支持 Notification
  - [Deuxfleurs/bagage](https://git.deuxfleurs.fr/Deuxfleurs/bagage)
    - AGPLv3, Go
    - WebDAV -> S3 proxy
  - https://news.ycombinator.com/item?id=41013004
  - 实现
    - The Dynamo ring
    - CRDTs

:::tip

garage 是一个分布式对象存储系统，兼容 S3 API，支持 GEO 分布，压缩和去重。

- 如果核心需求是 分布式 和 S3 API 那么 garage 是目前开源的最佳选择。
- 如果核心需求是 尽量兼容 S3 且需要应用层能力，那么 minio 是最佳选择。

---

- vs Minio - AGPLv3, Go
  - minio 分布式实施起来更复杂
  - minio 会保持目录文件结构
  - minio 辅助功能更多
  - minio Erasure Coding 比多副本更节省空间
- vs seaweedfs - Apache-2.0, Go
  - seaweedfs 默认是 对象存储
  - S3 API 需要 filer，需要额外的 metadata 服务
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

# Docker
# ==================
# 推荐 docker，因为 garage 的功能更全
# 默认命令 /garage server
# -p 3900:3900 -p 3901:3901 -p 3902:3902
docker run \
  --restart always \
  --network host \
  -v /etc/garage.toml:/etc/garage.toml \
  -v /var/lib/garage/meta:/var/lib/garage/meta \
  -v /var/lib/garage/data:/var/lib/garage/data \
  --name garage \
  dxflrs/garage:v1.0.0

alias garage="docker exec -ti garage /garage"

garage status     # 集群状态
garage node id    # 当前节点
garage node id -q # 只输出 <full-node-id>@<ip>:<port>

# garage node connect <full-node-id>@<ip>:<port> # 连接别的节点，加入集群
garage status   # 加入后的状态
garage stats -a # 所有节点的统计

garage layout show # 当前 layout
# zone=shhome capacity=200G tags=sh,phy,sshd
garage layout assign $(garage node id -q | head -c 10) -z shhome -c 200G -t sh -t phy -t ssd
garage layout show              # 修改后的状态
garage layout apply --version 2 # 应用 layout
garage status                   # 增加新的节点和容量

garage bucket list # 列出所有 bucket
garage bucket create public
garage bucket info public
garage key create pub-key

garage key list
garage key info pub-key
garage bucket allow --read --write --owner public --key pub-key

# block-rc      重新计算 block ref 计数器
# block-refs    重新传播版本删除到 block ref 表
# blocks        修复（重新同步/重新平衡）集群中存储的块
# mpu           重新传播对象删除到 multipart upload 表
# rebalance     在各个节点的硬盘驱动器之间重新平衡数据块
# scrub         验证磁盘上所有块的完整性
# tables        完全同步元数据表
# versions      重新传播对象删除到版本表
garage repair --yes -a blocks
# resync queue length
# blocks with resync errors
garage stats -a

garage bucket alias public assets    # assets -> public
garage bucket website --allow assets # 允许直接访问 $BUCKET.$s3_web_root_domain
```

| env                                 | for                            | note                    |
| ----------------------------------- | ------------------------------ | ----------------------- |
| GARAGE_ADMIN_TOKEN                  | --admin-token                  |
| GARAGE_ADMIN_TOKEN_FILE             | --admin-token-file             |
| GARAGE_ALLOW_WORLD_READABLE_SECRETS | --allow-world-readable-secrets |
| GARAGE_CONFIG_FILE                  | -c,--config                    | /etc/garage.toml        |
| GARAGE_RPC_SECRET                   | --rpc-secret                   |
| GARAGE_RPC_SECRET_FILE              | --rpc-secret-file              |
| GARAGE_METRICS_TOKEN                | --metrics-token                |
| GARAGE_METRICS_TOKEN_FILE           | --metrics-token-file           |
| GARAGE_RPC_HOST                     | --rpc-host                     | `<node-id>@<ip>:<port>` |

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

## K2V

- 帮助高效地在桶中存储许多小值（与 S3更适合存储大块数据 相反）。

## gateways

- 不存储数据，暴露 s3 API 和 website
- 减少 1-2 的网络 RTT
- 简化服务管理 - 不需要配置所有上游服务
- 简化安全 - gateway 只暴露为 127.0.0.1, 通过内部网络访问, 内部网络本身有加密

```bash
# 添加 Gateway
garage layout assign --gateway --tag gw1 -z dc1 $NODE_ID
garage layout show
garage layout apply

# 如果 gateway 没生效
garage repair -a --yes tables
```

- https://garagehq.deuxfleurs.fr/documentation/cookbook/gateways/

## admin

```bash
garage worker get
garage worker list

garage repair scrub start
```

- https://garagehq.deuxfleurs.fr/documentation/operations/durability-repairs/

# FAQ

## Handshake error: i/o: unexpected end of file

- garage node connect 发生
  - Pubkey 错了

```
garage_net::error: Error: ServerConn::run: Handshake error: performing handshake: failed opening client secret box
```

- https://github.com/Kuska-ssb/handshake
  - RecvClientAuthSecretbox

## Response: error 400 Bad Request, Parts given to CompleteMultipartUpload do not match uploaded parts
