# K3S Version

## 1.19
* 支持嵌入式 etcd - 实验阶段
  * 支持快照和从快照恢复 - [Backup and Restore Embedded etcd Datastore](https://rancher.com/docs/k3s/latest/en/backup-restore/)
* 移除 dqlite
* 支持配置文件
  * 之前只能使用环境变量配置
  * 配置更好控制，更容易利用工具配置
  * `/etc/rancher/k3s/config.yaml`
  * `--config FILE, -c FILE`
  * `K3S_CONFIG_FILE`
* 支持通过 CRD 配置内建的 helm chart

### 配置文件

__/etc/rancher/k3s/config.yaml__

```yaml
write-kubeconfig-mode: "0644"
tls-san:
  - "foo.local"
node-label:
  - "foo=bar"
  - "something=amazing"
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

__/var/lib/rancher/k3s/server/manifests/traefik-config.yaml__

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
