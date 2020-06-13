---
id: k8s-storage
title: Kubernates 存储
---

# Kubernates 存储

## Tips
* [Volume](https://kubernetes.io/docs/concepts/storage/volumes) - 卷
  * 有生命周期
  * 数据重启后依然保留
  * 本质上类似于一个目录
  * volumeMounts 指定 Pod 要挂载的卷
  * volumes 指定卷怎么提供
* 卷类型
  * awsElasticBlockStore
  * azureDisk
  * azureFile
  * cephfs - Ceph 的文件系统
  * cinder
  * configMap - 挂载 ConfigMap 作为文件
  * csi - Container Storage Interface - 抽象层
  * downwardAPI
  * emptyDir - 空目录
  * fc (fibre channel)
  * flexVolume
  * flocker
  * gcePersistentDisk
  * gitRepo (deprecated)
  * glusterfs
  * hostPath - 主机目录
  * iscsi - iSCSI 磁盘块
  * local
  * nfs - NFS 网络文件系统 - Linux
  * persistentVolumeClaim
  * projected
  * portworxVolume
  * quobyte
  * rbd - Ceph 的 RBD 块文件
  * scaleIO
  * secret - 挂载 secret 作为文件系统
  * storageos
  * vsphereVolume
* 注意
  * 对于类似 OSS/S3/Swift 类的存储服务，应该当作服务来使用，而不是作为文件系统
    * 通过代码读写
* [Persistent Volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) - 持久卷
  * PersistentVolume, PersistentVolumeClaim - API 对象 - 抽象存储是如何提供如何消费的
  * PersistentVolume - PV
    * 提供的存储卷 - 通过 StorageClass 创建
    * 集群资源
    * 分为静态和动态提供
  * PersistentVolumeClaim - PVC
    * Pod 申请使用 PV 资源的请求对象
    * 申请可能指名所需卷的熟悉 - 例如 性能

