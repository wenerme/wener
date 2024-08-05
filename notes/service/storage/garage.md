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
  - [S3 Compatibility](https://garagehq.deuxfleurs.fr/documentation/reference-manual/s3-compatibility/)
    - 不支持 ACL, Policies, Versioning, Replication, Locking, Encryption, Tagging
  - [Deuxfleurs/bagage](https://git.deuxfleurs.fr/Deuxfleurs/bagage)
    - WebDAV -> S3
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

```toml
# The directory in which Garage will store its metadata.
metadata_dir = "/var/lib/garage/meta"

# The directory in which Garage will store the data blocks of objects.
data_dir = "/var/lib/garage/data"

# Whether to enable synchronous mode for the database engine or not.
#metadata_fsync = false

# Whether to fsync data blocks and their containing directory after they are
# saved to disk.
#data_fsync = false

# Whether to automatically run a scrub of the data directory approximately once
# per month. If you are already scrubbing at the filesystem level, you can set
# this option to true to disable automatic scrub.
#disable_scrub = false

# Garage is only built with "lmdb" on Alpine Linux since v3.19! If you're still
# using "sled", migrate it using 'garage-convert-db' package from Alpine v3.18.
#db_engine = "lmdb"

# The block size for stored objects.
#block_size = "1M"

# A limit on the total size of data blocks kept in RAM by S3 API nodes awaiting
# to be sent to storage nodes asynchronously.
#block_ram_buffer_max = "256MiB"

# The map size used by LMDB, which is the size of the virtual memory region
# used for mapping the database file. It's not bound by the physical RAM size
# of the machine running Garage.
#lmdb_map_size = "1T"

# This can be any positive integer smaller or equal the node count in your
# cluster. It must be the same in the configuration files of all nodes!
# If you're running a cluster of Garage nodes, change this to at least 2!
replication_factor = 1

# This determines the read and write behaviour of your cluster. Read the
# reference manual before changing!
#consistency_mode = "consistent"

# Zstd compression level to use for storing blocks. Defaults to 1.
#compression_level = 1

# The address and port on which to bind for inter-cluster communications.
# Hint: Change to 127.0.0.1:3901 if running a single node cluster.
rpc_bind_addr = "[::]:3901"

# If enabled, pre-bind all sockets for outgoing connections to the same IP
# address used for listening (rpc_bind_addr) before trying to connect to remote
# nodes.
#rpc_bind_outgoing = false

# The address and port that other nodes need to use to contact this node for
# RPC calls.
# rpc_public_addr = "127.0.0.1:3901"

# The secret key file that is shared between all nodes of the cluster in order
# to identify these nodes and allow them to communicate together. The key is a
# 32-byte hex-encoded random string.
# If this file doesn't exist, it will be automatically created with a random
# string on the service start.
rpc_secret_file = "/etc/garage/rpc_secret"

# A list of peer identifiers on which to contact other Garage peers of this
# cluster. Format: <node public key>@<node public IP or hostname>:<port>.
#bootstrap_peers = []

[s3_api]
# The IP and port on which to bind for accepting S3 API calls. This endpoint
# doesn't support TLS: a reverse proxy (e.g. nginx) should be used to provide it.
api_bind_addr = "[::]:3900"

# The region name.
s3_region = "garage"

# The optional suffix to access bucket using vhost-style in addition to
# path-style request.
root_domain = ""

[s3_web]
# The IP and port on which to bind for accepting HTTP requests to buckets
# configured for website access. This endpoint doesn't support TLS: a reverse
# proxy (e.g. nginx) should be used to provide it.
bind_addr = "127.0.0.1:3902"

# The optional suffix appended to bucket names for the corresponding HTTP Host.
root_domain = ""

[admin]
# If specified, Garage will bind an HTTP server to this port and address,
# on which it will listen to requests for administration features.
#api_bind_addr = ""

# The token for accessing all of the other administration endpoints.
# If not set, access to these endpoints is disabled entirely.
#admin_token = ""
# or read it from the file.
# admin_token_file = "/etc/garage/admin_token"

# The token for accessing the Metrics endpoint. If not set, the Metrics
# endpoint can be accessed without access control!
#metrics_token = ""
# or read it from the file.
# metrics_token_file = "/etc/garage/metrics_token"
```

- db_engine
  - lmdb - 默认
    - 性能更好
    - 数据需要能 fit 到内存
    - 不能跨架构： arm64、amd64 的存储结构不同
    - 可能导致损坏
  - sqlite
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
