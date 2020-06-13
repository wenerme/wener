---
id: rancher-intro
title: Rancher UI
---

# Rancher

## Tips

- [Rancher](http://rancher.com/) - 定位于 K8S 的 UI
  - [rancher/rancher](https://github.com/rancher/rancher)
- 问题
  - 支持 Helm 3 [#20596](https://github.com/rancher/rancher/issues/20596)
- 注意
  - 如果 rancher 是作为工作负载运行在 k8s 集群，那么集群名字默认就为 local
  - HA 部署是通过 Helm 部署在 k8s 集群
  - rancher 的监控默认是滚动的 12h - 不会落盘 - 因此 rancher 安装不需要持久化存储
  - 启用了 istio 会有[两个 Ingress](https://rancher.com/docs/rancher/v2.x/en/cluster-admin/tools/istio/)
  - Rancher 默认会跳转 https - 如果通过反向代理，且使用的自己颁发证书需要反向代理不验证后端证书才能使用
- 安装的 Helm 应用
  - cluster-istio
    - Kali `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/istio-system/services/kiali-http:80/proxy/`
    - Jeager `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/istio-system/services/tracing:80/proxy/`
  - monitoring-operator
    - 镜像 `rancher/coreos-prometheus-operator`
  - cluster-monitoring
    - Grafana `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/cattle-prometheus/services/http:access-grafana:80/proxy/`
    - Prometheus `https://rancher.wener.me/k8s/clusters/local/api/v1/namespaces/cattle-prometheus/services/http:access-prometheus:80/proxy/graph`
    - Prometheus 端口映射的是 9796

## 安装

- [安装要求](https://rancher.com/docs/rancher/v2.x/en/installation/requirements/)
- [集群安装要求](https://rancher.com/docs/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/)
  - K3S 两个节点
  - RKE 三个节点
  - 负载均衡
    - 安装完成会创建 Ingress
  - DNS

### Docker 单机

- 将 `rancher/rancher` 和 `rancher/rancher-agent` 运行在同一个节点
- 可持久化数据
- 容器内会启动 K3S

| 规模   | 集群 | 节点 | vCPU | RAM  |
| ------ | ---- | ---- | ---- | ---- |
| Small  | 5    | 50   | 1    | 4 GB |
| Medium | 15   | 200  | 2    | 8 GB |

```bash
docker pull rancher/rancher:stable

# Rancher 单节点启动
# 存储使用 etcd
# 如果不需要证书可以使用 --no-cacerts 然后在外面反向代理到 80 即可
# 如果带证书 X-Forwarded-Proto 需要设置为 https 否则 websocket 可能会有问题
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v $PWD/rancher/data:/var/lib/rancher \
  -v $PWD/rancher/auditlog:/var/log/auditlog \
  -e AUDIT_LEVEL=1 \
  --name rancher rancher/rancher:stable --no-cacerts

# 强烈建议使用证书
# 例如使用 lego 申请的证书 - 注意需要 --no-cacerts 参数 - 因为是已知 CA
# 不需要 ca /etc/rancher/ssl/cacerts.pem
cat $LEGO_PATH/certificates/$DOMAIN.crt $LEGO_PATH/certificates/$DOMAIN.key > $LEGO_PATH/certificates/$DOMAIN.pem

LEGO_PATH=$PWD/.lego
DOMAIN=wener.me
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v $PWD/rancher/data:/var/lib/rancher \
  -v $PWD/rancher/auditlog:/var/log/auditlog \
  -e AUDIT_LEVEL=1 \
  -v $LEGO_PATH/certificates/$DOMAIN.crt:/etc/rancher/ssl/cert.pem \
  -v $LEGO_PATH/certificates/$DOMAIN.key:/etc/rancher/ssl/key.pem \
  --name rancher rancher/rancher:latest --no-cacerts
```

### K3S 集群

| 规模   | 集群 | 节点 | vCPU | RAM   | 数据库                    |
| ------ | ---- | ---- | ---- | ----- | ------------------------- |
| Small  | 150  | 1500 | 2    | 8 GB  | 2 cores, 4 GB + 1000 IOPS |
| Medium | 300  | 3000 | 4    | 16 GB | 2 cores, 4 GB + 1000 IOPS |

```bash
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
kubectl create namespace cattle-system


# ingress.tls.source
#   rancher 使用自己分发的 - 需要安装 cert-manager - 默认
#   secret 自行提供 - 之后添加 tls - https://rancher.com/docs/rancher/v2.x/en/installation/options/tls-secrets/
helm install rancher rancher-stable/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret

# 添加已有的 TLS 证书和 Key
kubectl -n cattle-system create secret tls tls-rancher-ingress \
  --cert=tls.crt \
  --key=tls.key

# 验证安装状态
kubectl -n cattle-system rollout status deploy/rancher
kubectl -n cattle-system get deploy rancher
```

### RKE

| 规模   | 集群 | 节点 | vCPU | RAM   |
| ------ | ---- | ---- | ---- | ----- |
| Small  | 150  | 1500 | 2    | 8 GB  |
| Medium | 300  | 3000 | 4    | 16 GB |

## K8S 运行 Rancher

- [Helm Rancher](https://rancher.com/docs/rancher/v2.x/en/installation/ha/helm-rancher/)
  - Helm 3 后不需要安装 Tiller

```bash
# HA 安装 - Helm 安装 Rancher
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
# 证书模式
# ingress.tls.source=rancher 自己颁发 - 默认 - 推荐该模式
# ingress.tls.source=letsEncrypt ACME
# ingress.tls.source=secret 使用已有的

# 安装 cert-manager
kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml
kubectl create namespace cert-manager
kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install \
  --name cert-manager \
  --namespace cert-manager \
  --version v0.9.1 \
  jetstack/cert-manager

# 安装完成
kubectl get pods --namespace cert-manager

# 安装 rancher
# hostname 需要修改为访问的域名
# 本地访问可以修改 hosts 或者通过反向代理访问
helm install rancher-stable/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.wener.me

# 部署进度
kubectl -n cattle-system rollout status deploy/rancher
# 部署情况
kubectl -n cattle-system get deploy rancher
```

## 集群导入

- 创建集群角色 `proxy-clusterrole-kubeapiserver`
  - 允许操作 `kube-apiserver`
- 创建命名空间 `cattle-system`
- 创建服务账号 `cattle` 管理 `cattle-system`
  - 添加 `cattle-admin` 角色
- 创建密钥包含 URL 和 TOKEN
- 授权 `cattle-admin` 操作所有 API 和 资源
- 部署 `cattle-cluster-agent`
  - cluster-register 镜像为 [rancher/rancher-agent](https://hub.docker.com/r/rancher/rancher-agent)
  - 挂载之前的授权信息
- 部署节点守护进程 `cattle-node-agent`
  - agent 镜像为 [rancher/rancher-agent](https://hub.docker.com/r/rancher/rancher-agent)

```
curl --insecure -sfL -o import.yaml https://rancher.example.com/v3/import/<TOKEN>.yaml
kubectl apply -f import.yaml
```

## FAQ

### Waiting for server-url setting to be set

- 等一会儿就好了
- [rancher/rancher#16213](https://github.com/rancher/rancher/issues/16213)
