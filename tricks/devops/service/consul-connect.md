---
id: consul-connect
title: Consule Connect Mesh
---

# Consule Connect Mesh
## Tips
* Control Plane
  * Consul UI
* Data Plane
  * 内建 - 主要用于开发
  * envoy
* 注意
  * 必须配合 consule 使用
* Mesh Gateway
  * 网关互通 - 跨集群/区域
  * 服务到服务
* Ingress Gateway
  * 接受外部流量
  * 外部访问内部服务
* Terminating Gateway
  * 内部访问外部
* Intention - ACL 控制
* 代理
  * 内建 - 不适用于生产
  * Envoy
* 证书管理
  * 内建 CA
  * Vault
