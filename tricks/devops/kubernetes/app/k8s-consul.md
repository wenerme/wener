---
id: k8s-consul
title: Consol
---

# Consol

## Tips

* [Consul K8S](https://github.com/hashicorp/consul-k8s) 使用场景
  * 部署 Consul 集群服务
  * 允许 Consol 客户端打通服务
  * Connect Service Mesh
  * 同步 K8S 服务到 Consul
* 安装依赖 PV 存储
* [文档](https://www.consul.io/docs/k8s)

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
  -n consul --create-namespace \
  --set global.name=consul --set global.datacenter=center

# 转发 UI
# 默认没有 tls 和 acl
kubectl port-forward -n consul svc/consul-server 8500:8500
# 如果启用了 ACL
kubectl get -n consul secrets/consul-bootstrap-acl-token --template={{.data.token}} | base64 -d

# 访问 consul
# 每个节点都有 agent 因此直接使用 HOST_IP 即可
export CONSUL_HTTP_ADDR="${HOST_IP}:8500"
consul kv put hello world
```

```yaml
env:
- name: ADVERTISE_IP
  valueFrom:
    fieldRef:
      fieldPath: status.podIP
- name: NAMESPACE
  valueFrom:
    fieldRef:
      fieldPath: metadata.namespace
- name: NODE
  valueFrom:
    fieldRef:
      fieldPath: status.nodeName
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: CONSUL_HTTP_ADDR
  value: $(HOST_IP):8500
```

## DNS

```bash

# KubeDNS
# ==========
CONSUL_DNS_IP=$(kubectl get svc consul-dns -o jsonpath='{.spec.clusterIP}' -n service)
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    addonmanager.kubernetes.io/mode: EnsureExists
  name: kube-dns
  namespace: kube-system
data:
  stubDomains: |
    {"consul": ["$CONSUL_DNS_IP"]}
EOF

kubectl get configmap kube-dns -n kube-system -o yaml

# CoreDNS
# ==========
kubectl edit configmap coredns -n kube-system
# Corefile: |
#   consul {
#     errors
#     cache 30
#     forward . <consul-dns-service-cluster-ip>
#   }

# 测试解析
kubectl run --rm -i -t dns-test --image=wener/base --restart=Never -- nslookup consul.service.consul
```

## ACL
* [Kubernetes Auth Method](https://www.consul.io/docs/security/acl/auth-methods/kubernetes)
