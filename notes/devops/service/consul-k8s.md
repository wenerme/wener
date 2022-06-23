---
tags:
  - K8S
---

# Consul K8S

- [hashicorp/consul-k8s](https://github.com/hashicorp/consul-k8s)
  - consul-k8s-control-plane
  - CRD
  - 服务同步/catalog sync
  - service mesh/inject envoy sidecar/connect
- [CRD](https://www.consul.io/docs/k8s/crds) - consul.hashicorp.com/v1alpha1
  - Mesh - v1.10+
  - IngressGateway - 部署
  - ServiceRouter - 定义服务路由
  - ProxyDefaults
  - ServiceDefaults - 服务的默认配置
  - ServiceSplitter
  - ServiceResolver
  - ServiceIntentions - v1.9+
  - TerminatingGateway
  - ExportedServices - 企业版
- 参考
  - [Annotations and Labels](https://www.consul.io/docs/k8s/annotations-and-labels)
  - [轮换证书](https://www.consul.io/docs/k8s/operations/certificate-rotation)
- [charts/consul](https://github.com/hashicorp/consul-k8s/tree/main/charts/consul)

:::cautopm

- OSS 版本 CRD 的 namespace 会被忽略 - 强制为 default

:::

```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm search repo hashicorp/consul
```
