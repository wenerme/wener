---
title: Local PV
---

# Local Persistent Volumes
* [local/volume](https://kubernetes.io/docs/concepts/storage/volumes/#local)
* [kubernetes-sigs/sig-storage-local-static-provisioner](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner)
  * [Best Practices](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner/blob/master/docs/best-practices.md)
* [Kubernetes 1.14: Local Persistent Volumes GA](https://kubernetes.io/blog/2019/04/04/kubernetes-1.14-local-persistent-volumes-ga/)
* 使用场景
  * local pv 没有网络传输、更好的 iops 和本地读写速度
  * 应用自行复制数据的场景
  * 会被绑定到某个节点，节点异常必须手动干涉

```yaml
# 添加 StorageClass
# 然后需要部署 provisioner 创建 PVs
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
# WaitForFirstConsumer 跟随 Pod 调度
# https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode
volumeBindingMode: WaitForFirstConsumer
```
