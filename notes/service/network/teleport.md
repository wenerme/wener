---
title: Teleport
---

# Teleport
* 是什么？
  * 支持 CA,加密,认证授权的反向代理
  * 支持协议 SSH, Kubernetes, Web
  * kubectl exec
* 端口
  * 3023, 3024, 3025, 3080
  * 3022 - Node - SSH
  * 3023 - Proxy -> 3022
  * 3024 - Proxy - 反向 SSH 通道
  * 3025 - Auth - SSH Auth Service
  * 3080 - Proxy - HTTPS auth tsh, Web UI
  * 3026 - Kubernetes - HTTPS Proxy
  * 3027 - Kubernetes - Kubernetes Service
* [企业版](https://goteleport.com/teleport/docs/enterprise/introduction/) 特性 / [Commercial Teleport Editions](https://goteleport.com/teleport/docs/faq/#commercial-teleport-editions)
  * RBAC
  * SSO
    * SAML
    * OIDC - Okta, Active Directory, Auth0
    * 社区版本支持 github 和 local 认证
  * Approval
  * FedRAMP/FIPS
* 组件
  * tsh - ssh
  * tctl - auth server
  * teleport - sshd


## demo

__teleport.yaml__

```yaml
teleport:
  data_dir: ./teleport
auth_service:
  enabled: true
  cluster_name: "teleport"
  listen_addr: 0.0.0.0:3025
  tokens:
    - proxy,node,app:f7adb7ccdf04037bcd2b52ec6010fd6f0caec94ba190b765
ssh_service:
  enabled: true
  labels:
    env: staging
app_service:
  enabled: true
  debug_app: true
proxy_service:
  enabled: true
  listen_addr: 0.0.0.0:3023
  web_listen_addr: 0.0.0.0:3080
  tunnel_listen_addr: 0.0.0.0:3024
```
