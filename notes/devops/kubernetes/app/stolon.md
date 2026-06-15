---
title: stolon
tags:
  - PostgreSQL
  - HighAvailability
  - Kubernetes
---

# stolon

- [sorintlab/stolon](https://github.com/sorintlab/stolon)
  - Apache-2.0, Go, PostgreSQL, HA, Kubernetes, etcd, Consul
  - PostgreSQL cloud native High Availability manager，基于 PostgreSQL streaming replication。
- 状态
  - Latest release: `v0.17.0`，2021-09-03。
  - README 支持 PostgreSQL 9.6–15；生产新选型建议同时评估 Patroni / CloudNativePG / Zalando Postgres Operator。
- 参考
  - [README](https://github.com/sorintlab/stolon/blob/master/README.md)
  - [Architecture](https://github.com/sorintlab/stolon/blob/master/doc/architecture.md)
  - [Kubernetes example](https://github.com/sorintlab/stolon/tree/master/examples/kubernetes)
  - [stolonctl](https://github.com/sorintlab/stolon/blob/master/doc/stolonctl.md)

## TL;DR

- stolon 不是 Kubernetes Operator；它是一组进程 + store，负责 PostgreSQL 主从拓扑和 failover。
- 默认异步复制，也支持 synchronous replication。
- 设计取向：宁可牺牲可用性也尽量避免数据丢失，即 consistency over availability。
- Kubernetes backend 使用 API Server/ConfigMap 保存 clusterdata；更稳妥的生产方案通常是独立 HA etcd/Consul store。

## Architecture

| Component | Kubernetes 形态 | 作用 |
| --------- | --------------- | ---- |
| keeper | StatefulSet | 管理一个 PostgreSQL instance，按 sentinel 计算出的 clusterview 收敛 |
| sentinel | Deployment | 监控 keepers/proxies，leader sentinel 计算最优 clusterview 和 failover |
| proxy | Deployment + Service | 客户端入口，只转发到当前 master，并关闭指向旧 master 的连接 |
| store | etcd/Consul/Kubernetes | 保存 clusterdata、状态、leader election 信息 |
| stolonctl | CLI | 初始化、查看、更新 cluster specification |

## Store Backend

- `etcdv2` / `etcdv3`
  - 推荐 HA etcd，至少 3 节点。
  - etcdv3 需要定期 compaction，避免 keyspace 膨胀。
- `consul`
  - 作为 HA store 和 leader election 后端。
- `kubernetes`
  - 使用 Kubernetes API Server 保存数据。
  - clusterdata 存在 ConfigMap：`stolon-cluster-$CLUSTERNAME`。
  - metadata 字段：`stolon-clusterdata`。
  - 不要删除或手工修改该 ConfigMap。
  - API Server 过载/不可达时，proxy 可能因无法确认 master 状态而主动断开连接。

## Kubernetes Quick Start

```bash
# 初始化 clusterdata；kubernetes backend 使用 ConfigMap
stolonctl \
  --cluster-name=kube-stolon \
  --store-backend=kubernetes \
  --kube-resource-kind=configmap \
  init

# 或在集群内一次性运行 stolonctl
kubectl run -i -t stolonctl \
  --image=sorintlab/stolon:master-pg10 \
  --restart=Never --rm -- \
  /usr/local/bin/stolonctl \
  --cluster-name=kube-stolon \
  --store-backend=kubernetes \
  --kube-resource-kind=configmap \
  init

# 查看状态
kubectl exec -it deploy/stolon-proxy -- \
  stolonctl --cluster-name=kube-stolon \
  --store-backend=kubernetes \
  --kube-resource-kind=configmap \
  status
```

典型部署顺序：

1. RBAC：给 stolon pod service account 访问 ConfigMap/Pod 的权限。
2. `stolonctl init` 初始化 cluster specification。
3. 创建 sentinel Deployment。
4. 创建 PostgreSQL superuser/replication user password Secret。
5. 创建 keeper StatefulSet + PVC。
6. 创建 proxy Deployment + Service。
7. 应用只连接 proxy Service，不直接连接 keeper。

## 注意事项

- keeper 必须使用持久化数据目录；不要用 `emptyDir` 保存 PostgreSQL data。
- 每个 keeper 必须有唯一 UID；不要用同一个 UID 指向不同 data dir。
- store 必须高可用；永久丢失 store 后不要直接恢复旧 stolon clusterdata backup，应该用 `existing` initMode 重新初始化。
- PostgreSQL superuser 和 replication user 参数必须在所有 keepers 上一致。
- 不建议生产使用 trust auth；使用 password/file secret。
- 控制 `max_connections`：连接耗尽会阻塞 replication connection，进而影响 standby 同步和 failover 判断。
- 缩容 keeper StatefulSet 要谨慎，避免删除当前 master 或只剩未同步 standby。

## FAQ

### stolon vs Patroni

- 两者都做 PostgreSQL HA + streaming replication + failover。
- Patroni 生态更活跃，常见于现代 PostgreSQL HA 部署。
- stolon 设计强调 cloud-native 和 consistency over availability，但 release 较旧，新项目需评估维护状态。

### stolon vs PostgreSQL Operator

- stolon 本身不是 Operator，不负责完整声明式数据库生命周期。
- 如果需要 backup、restore、upgrade、pooler、monitoring、user/db 管理等完整平台能力，优先看 CloudNativePG、Zalando Postgres Operator、Crunchy PGO。

### 为什么 proxy 会断连接？

proxy 无法可靠读取 store 时，不能确认当前 master 是否仍然有效。为了避免把写请求发到旧 master，它会关闭连接，牺牲可用性换一致性。
