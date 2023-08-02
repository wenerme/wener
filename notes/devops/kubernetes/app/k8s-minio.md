---
id: k8s-minio
title: Minio
---

# Minio on K8S

## Tips

- helm 安装 [minio/charts](https://github.com/minio/charts)
  - 安装单个租户
  - 支持分布式模式和单机模式
- [minio/operator](https://github.com/minio/operator) 安装 - 官方主推， APGL 3.0
  - 管理多租户、多存储
  - 推荐使用 [minio/direct-csi](https://github.com/minio/direct-csi)
- [minio/direct-csi](https://github.com/minio/direct-csi)
  - direct.csi.min.io
  - Direct Volume Access
  - 直接访问挂载的磁盘，而不是通过文件的方式访问

```bash
# https://charts.wener.tech/
helm show chart wener/minio
```
