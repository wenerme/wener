---
id: k8s-consul
title: Consol
---

# Consol

## Tips

* K8S 使用场景
  * 部署 Consul 集群服务
  * 允许 Consol 客户端打通服务
  * Connect Service Mesh
  * 同步 K8S 服务到 Consul
* 安装依赖 PV 存储

```bash
helm repo add hashicorp https://helm.releases.hashicorp.com

# 默认部署    server client dns ui
# 默认不部署 tls acl federation externalService snapshotAgent syncCatalog 
#   connectInject centralConfig meshGateway ingressGateways terminatingGateways
# 默认 datacenter 为 dc1
# 安装到 service 空间
# --set server.affinity=null 允许安装到单机
# server.storageClass 修改存储类型
helm install consul hashicorp/consul \
  -n service --create-namespace \
  --set global.name=consul --set global.datacenter=center

# 转发 UI
# 默认没有 tls 和 acl
kubectl port-forward -n service consul-server-0 8500:8500
```
