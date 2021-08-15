---
id: harbor
title: Harbor
---

# Habor

- Habor
  - Kubernetes 上的容器镜像仓库
- [goharbor/harbor-helm](https://github.com/goharbor/harbor-helm) - trusted cloud native repository for Kubernetes
- 属于 CI 和 CD 之间，Nexus 偏向开发，Harbor 偏向生产部署交付
- 特性
  - trivy 安全分析
  - 账号管理、多租户、RBAC
  - 镜像副本、Harbor 之间副本复制
  - WebUI
- 配置
  - 默认会部署 ingress
  - 要指定 externalURL 确保生成地址正确
  - 默认关闭内部 TLS - internalTLS
  - 存储
    - registry - 5Gi
    - chartmuseum - 5Gi
    - jobservice - 1Gi
    - database - 1Gi - 可用外部
      - 如果使用内部数据库记得修改账号密码
    - redis - 1Gi - 可用外部
    - trivy - 2Gi
    - imageChartStorage
      - 支持 azure,gcs,s3,swift,oss
- 端口
  - 443
  - 80
  - 4443
    - Notary - Docker Content Trust
- 文档
  - [Harbor Compatibility List](https://goharbor.io/docs/2.2.0/install-config/harbor-compatibility-list/)

| Resource | Minimum | Recommended |
| -------- | ------- | ----------- |
| CPU      | 2 CPU   | 4 CPU       |
| Mem      | 4 GB    | 8 GB        |
| Disk     | 40 GB   | 160 GB      |

```bash
helm repo add harbor https://helm.goharbor.io
```

## 安装

- docker 安装过程会使用 `goharbor/prepare` 进行构建需要的 docker compose

## 配置

- https://goharbor.io/docs/2.0.0/install-config/configure-yml-file/

## 组件

- postgresql
- redis
- clari
- beego
- chartmuseum
- docker/distribution
- docker/notary
- helm
- swagger-ui

## Helm

```yaml
harborAdminPassword: 'Harbor12345'

# 部署组件
# =========
# 不使用 Ingress 则会部署 nginx
nginx:
portal:
core:
jobservice:
registry:
chartmuseum:
clair:
trivy:
notary:

database:
  # 设置为 external 使用外部数据库
  type: internal
  # 配置外部数据库
  external:
    host: '192.168.0.1'
    port: '5432'
    username: 'user'
    password: 'password'
    # coreDatabase: "registry"
    # clairDatabase: "clair"
    # notaryServerDatabase: "notary_server"
    # notarySignerDatabase: "notary_signer"
redis:
  type: internal
```
