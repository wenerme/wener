---
title: Kubernates 存储
---

# Kubernates 存储

:::tip

- 对于类似 OSS/S3/Swift 类的存储服务，应该当作服务来使用，而不是作为文件系统
  - 通过代码读写
- 如果多个 Pod 想要共享存储，则本质是 ReadWriteMany，最简单的选项是 NFS
- PV - PVC - Pod 的关系在 ReadWriteOnce 的关系下都是 1:1:1 的
- PV 可能会对应存储实现内部的 Volume - 大多数时候也是 1:1 的
- 可以启动一个 NFS 服务在集群内使用
- 存储的使用设计也遵循一定模式 - 存储也是应用封装独立的一层

:::

- [Volume](https://kubernetes.io/docs/concepts/storage/volumes) - 卷
  - 有生命周期
  - 数据重启后依然保留
  - 本质上类似于一个目录
  - volumeMounts 指定 Pod 要挂载的卷
  - volumes 指定卷怎么提供
- [A Basic Guide to Kubernetes Storage: PVS, PVCs, Statefulsets](https://portworx.com/basic-guide-kubernetes-storage/)
- 卷类型
  - awsElasticBlockStore
  - azureDisk
  - azureFile
  - cephfs - Ceph 的文件系统
  - cinder - OpenStack 块存储
  - configMap - 挂载 ConfigMap 作为文件
  - csi - Container Storage Interface - 抽象层
  - downwardAPI
  - emptyDir - 空目录 - 类似站位
  - fc (fibre channel)
  - flexVolume - 类似于 CSI 前身
  - flocker
  - gcePersistentDisk
  - gitRepo (deprecated)
  - glusterfs
  - hostPath - 主机目录
  - iscsi - iSCSI 磁盘块
  - local
  - nfs - NFS 网络文件系统 - Linux
  - persistentVolumeClaim
  - projected
  - portworxVolume
  - quobyte
  - rbd - Ceph 的 RBD 块文件
  - scaleIO
  - secret - 挂载 secret 作为文件系统
  - storageos
  - vsphereVolume
- [Persistent Volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) - 持久卷

:::tip

- 删除正在使用的 PVC 不会立即删除，会在 Pod 不使用后执行
- 删除绑定了 PVC 的 PV 也会推迟到 PVC 删除后执行

:::

```bash
kubectl get storageclass

# 取消 sc 的默认值
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
# 设置默认
kubectl patch storageclass longhorn -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

| Plugin     | RWO | ROM | RWM | Storage Type |
| ---------- | --- | --- | --- | ------------ |
| Longhorn   | ✓   | ✓   | ✓   | File,Block   |
| OpenEBS    | ✓   | ✓   | ✓   | File,Block   |
| HostPath   | ✓   | -   | -   | File         |
| NFS        | ✓   | ✓   | ✓   | File         |
| iSCSI      | ✓   | ✓   | -   | Block        |
| CephFS     | ✓   | ✓   | ✓   | File         |
| Cinder     | ✓   | -   | -   | Block        |
| CSI        | -   | -   | -   | Interface    |
| FC         | ✓   | ✓   | -   | Block        |
| FlexVolume | ✓   | ✓   | -   | Block        |
| Glusterfs  | ✓   | ✓   | ✓   | File         |
| RBD        | ✓   | ✓   | -   | Block        |

# FAQ

## PersistentVolume vs PersistentVolumeClaim

- PersistentVolume, PersistentVolumeClaim - API 对象 - 抽象存储是如何提供如何消费的
- Pod -> PVC -> PV -> 宿主机

---

- PersistentVolume - PV
  - 提供的存储卷 - 通过 StorageClass 创建
  - **实际资源**
  - 分为静态和动态提供
- PersistentVolumeClaim - PVC
  - Pod 申请使用 PV 资源的 **请求对象**
  - 申请可能指名所需卷的属性 - 例如 性能
  - PVC 会被最终绑定到 PV
