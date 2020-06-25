---
id: harbor
title: Harbor
---

# Habor
## Tips
* [goharbor/harbor-helm](https://github.com/goharbor/harbor-helm) - trusted cloud native repository for Kubernetes
* 属于 CI 和 CD 之间，Nexus 偏向开发，Harbor 偏向生产部署交付
* 特性
  * trivy 安全分析
  * 账号管理、多租户、RBAC
  * 镜像副本、Harbor 之间副本复制
  * WebUI
* 配置
  * 默认会部署 ingress
  * 要指定 externalURL 确保生成地址正确
  * 默认关闭内部 TLS - internalTLS
  * 存储
    * registry - 5Gi
    * chartmuseum - 5Gi
    * jobservice - 1Gi
    * database - 1Gi - 可用外部
      * 如果使用内部数据库记得修改账号密码
    * redis - 1Gi - 可用外部
    * trivy - 2Gi
    * imageChartStorage
      * 支持 azure,gcs,s3,swift,oss


```bash
helm repo add harbor https://helm.goharbor.io
```
