---
id: k8s-nfs
title: NFS
---

# NFS
## Tips
* [nfs-provisioner](https://github.com/kubernetes-incubator/external-storage/tree/master/nfs)
  * 提供 NFS 服务
  * 但数据不会持久化
* [nfs-client](https://github.com/kubernetes-incubator/external-storage/tree/master/nfs-client)
  * 作为 NFS 客户端提供存储 - 需要现有 NFS 服务
  * 创建子目录 - `${namespace}-${pvcName}-${pvName}`


```bash
# NFS Client
# https://github.com/helm/charts/tree/master/stable/nfs-client-provisioner
helm install stable/nfs-client-provisioner --set nfs.server=x.x.x.x --set nfs.path=/exported/path
```

## 示例

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv0003
spec:
  capacity:
    storage: 5Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Recycle
  storageClassName: slow
  mountOptions:
    - hard
    - nfsvers=4.1
  nfs:
    path: /tmp
    server: 172.17.0.2
```
