---
id: minio-operator
title: MinIO Kubernetes Operator
---

# MinIO Kubernetes Operator
## Tips
* [minio/operator](https://github.com/minio/operator)
  * 推荐 PV 使用 [direct csi](https://github.com/minio/operator/blob/master/docs/using-direct-csi.md) 插件
  * 支持多租户 - ns 隔离
  * 支持扩容
    * __通过 Zone 实现__
      * 多域名分流
    * __不支持缩容__
    * 扩容会有 down 时间
    * 会删除所有 StatefulSet 进行重建
    * 要求 StatefulSet 的 PV 不被回收 - policy 设置为 retain
* 注意
  * 如果不要求多租户，还不如直接使用 Helm 部署
    * 简单直观易维护
  * minio 支持多用户

## Direct CSI
* 像极了 [rancher/local-path-provisioner](https://github.com/rancher/local-path-provisioner)

```bash
# 安装 CSI
cat << EOF > default.env
DIRECT_CSI_DRIVES=data{1...4}
DIRECT_CSI_DRIVES_DIR=/mnt
KUBELET_DIR_PATH=/var/lib/kubelet
EOF

export $(cat default.env)
kubectl apply -k github.com/minio/direct-csi
```
