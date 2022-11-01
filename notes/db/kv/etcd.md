---
title: etcd
---

# etcd

- [etcd.conf.yml](https://github.com/etcd-io/etcd/blob/main/etcd.conf.yml.sample)
- adopters:
  - kubernetes
  - vitess
  - Apache APISIX
- https://discovery.etcd.io
  - 发现阶段
  - `https://discovery.etcd.io/${UUID}`
- 存储 [etcd-io/bbolt](https://github.com/etcd-io/bbolt)
- 参考
  - https://etcd.io/docs/v3.5/integrations/
- v3 API
- RBAC

```bash
# Docker
# ==========
docker run --rm -it \
  -v $PWD/data:/data \
  -p 2379:2379 \
  -e ETCD_AUTO_COMPACTION_MODE=revision \
  -e ETCD_AUTO_COMPACTION_RETENTION=1000 \
  -e ETCD_QUOTA_BACKEND_BYTES=4294967296 \
  -e ETCD_SNAPSHOT_COUNT=50000 \
  --name etcd quay.io/coreos/etcd:v3.5.0 \
  etcd --advertise-client-urls=http://127.0.0.1:2379 --listen-client-urls http://0.0.0.0:2379 --data-dir /data

# macOS
# ==========
brew install etcd

# 服务端
# ==========
etcd

# 客户端
# ==========
etcdctl put key "value"
etcdctl get ket

# 其他服务
# stateless pass-through etcd TCP connection forwarding proxy
etcd gateway
# stateless etcd v3 gRPC L7 reverse proxy
etcd grpc-proxy
```

## etcdctl

| etcdctl flag | env         | demo           |
| ------------ | ----------- | -------------- |
|              | ETCDCTL_API | 3              |
| --endpoints  |             | localhost:2379 |

- etcdctl check perf|datascale
- etcdctl put|get|watch|lock|del
- etcdctl snapshot save|status|restore
- etcdctl member list|add|promote|remove|update
- etcdctl user list|add|get|delete|passwd|grant-role|revoke-role
- etcdctl role list|add|get|delete|grant-permission|revoke-permission
- etcdctl auth enable|status|disable
- permission
  - read,readwrite
  - prefix

## 配置 {configuration}

```yaml
# Member
# ==============================
name: default # 成员名字
data-dir: ${name}.etcd # 数据目录
wal-dir: # WAL 日志目录

# 快照到磁盘的 事务数
snapshot-count: 10000
# 心跳间隔 ms
heartbeat-interval: 100
# 选举超时 ms
election-timeout: 1000

# 后端数据大小报警阀值 - 0 禁用
quota-backend-bytes: 0

# peer traffic.
# 逗号分隔多个
listen-peer-urls: http://localhost:2380
# client traffic.
listen-client-urls: http://localhost:2379

# 保留快照文件 - 0 无限
max-snapshots: 5
# 保留 WAL 文件
max-wals: 5

# CORS 域名 - 逗号分隔
cors:

# List of this member's peer URLs to advertise to the rest of the cluster.
# The URLs needed to be a comma-separated list.
initial-advertise-peer-urls: http://localhost:2380

# List of this member's client URLs to advertise to the public.
# The URLs needed to be a comma-separated list.
advertise-client-urls: http://localhost:2379

# Discovery URL used to bootstrap the cluster.
discovery:

# exit,proxy
discovery-fallback: 'proxy'

# HTTP proxy to use for traffic to discovery service.
discovery-proxy:

# DNS domain used to bootstrap initial cluster.
discovery-srv:

# Initial cluster configuration for bootstrapping.
initial-cluster:

# Initial cluster token for the etcd cluster during bootstrap.
initial-cluster-token: 'etcd-cluster'

# Initial cluster state ('new' or 'existing').
initial-cluster-state: 'new'

# Reject reconfiguration requests that would cause quorum loss.
strict-reconfig-check: false
enable-pprof: true

client-transport-security:
  # Path to the client server TLS cert file.
  cert-file:

  # Path to the client server TLS key file.
  key-file:

  # Enable client cert authentication.
  client-cert-auth: false

  # Path to the client server TLS trusted CA cert file.
  trusted-ca-file:

  # Client TLS using generated certificates
  auto-tls: false

peer-transport-security:
  # Path to the peer server TLS cert file.
  cert-file:

  # Path to the peer server TLS key file.
  key-file:

  # Enable peer client cert authentication.
  client-cert-auth: false

  # Path to the peer server TLS trusted CA cert file.
  trusted-ca-file:

  # Peer TLS using generated certificates.
  auto-tls: false

# The validity period of the self-signed certificate, the unit is year.
self-signed-cert-validity: 1

log-level: debug
logger: zap
# default, stderr, stdout
log-outputs: [stderr]
enable-log-rotation: false
log-rotation-config-json: '{"maxsize": 100, "maxage": 0, "maxbackups": 0, "localtime": false, "compress": false}'

# Clustering
# ==============================

# periodic - 基于间隔，默认单位为小时
# revision - 基于版本
auto-compaction-mode: periodic
auto-compaction-retention: '1'

enable-v2: false

# v2 Proxy
# on,off
proxy: 'off'
proxy-failure-wait: 5000
proxy-refresh-interval: 30000
proxy-dial-timeout: 1000
proxy-write-timeout: 5000
proxy-read-timeout: 0

# Unsafe
# ==============================
# 强制创建单成员集群
force-new-cluster: false
unsafe-no-fsync: false
```

- https://etcd.io/docs/v3.5/op-guide/configuration/
