# Kubernetes Internal
## Tips
* 主要

  * 执行调度

## 状态管理
### etcd 集群状态
* k3s 将 etcd 外化为数据库依赖 - 使得这部分易于维护管理

## 应用状态存储
* 文件、块设备
* 集群内
  * 集群内部署存储 provisioner 处理 pvc
  * 分布式存储
    * longhorn
    * ceph
  * 单节点存储
    * hostPath
    * local-path-provisioner
* 集群外 - 依赖外部存储
  * 外部平台服务 - 例如 GFS、OSS
  * 外部存储集群
    * Ceph
  * 外部存储服务
    * NFS
* [kubernetes-csi/external-provisioner](https://github.com/kubernetes-csi/external-provisioner)
  * 监听 PVC 触发创建和删除卷
