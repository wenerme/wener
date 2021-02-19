---
title: K3S Version
---

# K3S Version

## 1.20

- 删除节点时会清除节点密码
- 设置 `--data-dir` 后不会再存储任何文件在 `/var/lib/rancher/k3s`
- 减少影响不大的日志

## 1.19

- 支持嵌入式 etcd - 实验阶段
  - 支持快照和从快照恢复 - [Backup and Restore Embedded etcd Datastore](https://rancher.com/docs/k3s/latest/en/backup-restore/)
- 移除 dqlite
- 支持配置文件
  - 之前只能使用环境变量配置
  - 配置更好控制，更容易利用工具配置
  - `/etc/rancher/k3s/config.yaml`
  - `--config FILE, -c FILE`
  - `K3S_CONFIG_FILE`
- 支持通过 CRD 配置内建的 helm chart
- 生成的 k3s.yaml 不在使用 Basic 授权而是证书授权

### etcd

| Args                          | Default                    | Mean                 |
| ----------------------------- | -------------------------- | -------------------- |
| --etcd-disable-snapshots      | false                      | 默认开启快照         |
| --etcd-snapshot-schedule-cron | `0 */12 * * *`             | 默认 12 小时一次快照 |
| --etcd-snapshot-retention     | 5                          | 保留的快照份树       |
| --etcd-snapshot-dir           | `${data-dir}/db/snapshots` | 快照目录             |

```bash
# etcd 启动
# ==========
# serving 0.0.0.0:2379
# peers 0.0.0.0:2380
# metrics 0.0.0.0:2381
# 默认目录 ${data-dri}/server/db/etcd -> /var/lib/rancher/k3s/server/db/etcd
uuidgen > k3s.token
# 第一个节点初始化集群
PATH="/usr/libexec/cni/:$PATH" K3S_TOKEN_FILE=$PWD/k3s.token sudo k3s server --cluster-init --docker

# 其他 master 节点加入
# K3S_TOKEN=SECRET k3s server --server https://<ip or hostname of server1>:6443

# 安装 etcdctl 来直接操作 etcd
apk add etcd-ctl -X https://mirrors.aliyun.com/alpine/edge/testing/

# etcd 配置
# /var/lib/rancher/k3s/server/db/etcd/config
export ETCDCTL_API=3
export ETCDCTL_CACERT=/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt
export ETCDCTL_CERT=/var/lib/rancher/k3s/server/tls/etcd/server-client.crt
export ETCDCTL_KEY=/var/lib/rancher/k3s/server/tls/etcd/server-client.key
# 查看成员列表
etcdctl member list

# 重置集群 - 从快照恢复
# 重置后需要重启
# 现有数据会被放到 ${data-dir}/server/db/etcd-old/
k3s server \
  --cluster-reset \
  --cluster-reset-restore-path=快照路径
```

### 配置文件

- 环境变量指定 `K3S_CONFIG_FILE`
- 参数指定 `--config FILE`, `-c FILE`
- 默认位置 `/etc/rancher/k3s/config.yaml`

**/etc/rancher/k3s/config.yaml**

```yaml
write-kubeconfig-mode: '0644'
tls-san:
  - 'foo.local'
node-label:
  - 'foo=bar'
  - 'something=amazing'
```

等同于

```bash
k3s server \
  --write-kubeconfig-mode "0644"    \
  --tls-san "foo.local"             \
  --node-label "foo=bar"            \
  --node-label "something=amazing"
```

### 配置内建 Helm Chart

**/var/lib/rancher/k3s/server/manifests/traefik-config.yaml**

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChartConfig
metadata:
  name: traefik
  namespace: kube-system
spec:
  valuesContent: |-
    image: traefik
    imageTag: v1.7.26-alpine
    proxyProtocol:
      enabled: true
      trustedIPs:
        - 10.0.0.0/8
    forwardedHeaders:
      enabled: true
      trustedIPs:
        - 10.0.0.0/8
    ssl:
      enabled: true
      permanentRedirect: false
```
