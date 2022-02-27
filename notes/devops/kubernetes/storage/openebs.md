---
title: OpenEBS
---

# OpenEBS

- [openebs/openebs](https://github.com/openebs/openebs)
  - [openebs.io](https://www.openebs.io)
  - Jiva 源于 longhorn [fork](https://github.com/openebs/longhorn)，在一些实现上有分歧
    - 目前区别已经非常大
    - 分歧点: Control Plane functionality, iSCSI Target implementation, Quorum, Backup / Restore, UI

:::tip

- DB 类型应用最好使用 Local PV
- 无集群能力 DB 可使用 NVMe, SPDK, cStor + ZFS
- 流应用（Kafka）存储推荐 NVMe Mayastor

:::

**存储类型**

| Volume              | Storage                  | Requirement                                           |
| ------------------- | ------------------------ | ----------------------------------------------------- |
| OpenEBS Mayastor    | SSDs/Cloud Volumes       | 低延时, HA, 同步副本, 快照, 克隆, Thin provisioning   |
| OpenEBS cStor       | Disks/SSDs/Cloud Volumes | 保护节点异常, 同步副本, 快照, 克隆, Thin provisioning |
| OpenEBS Jiva        | hostpath, 外部挂载       | 保护节点异常, 同步副本, Thin provisioning             |
| Local PV - Hostpath | hostpath, 外部挂载       | 低延时, 本地持久卷                                    |
| Local PV - Device   | Disks/SSDs/Cloud Volumes | 低延时, 本地持久卷                                    |
| Local PV - ZFS      | Disks/SSDs/Cloud Volumes | 低延时, 本地持久卷, 快照, 克隆                        |
| Local PV - Rawfile  |                          | 低延时, 本地持久卷                                    |

## 目录结构

- /var/openebs/
  - local/ - Local PV - Hostpath
  - ndm/
  - sparse/

## Helm

- https://github.com/openebs/charts
- helm 子 chart
  - cstor
  - jiva
  - localpv-provisioner
    - StorageClass: openebs-hostpath
    - /var/openebs/local
  - lvm-localpv
  - openebs-ndm - node-disk-manager
  - zfs-localpv

:::tip

helm 功能区分 子 chart 模式和 bundle 的 templates

:::

```bash
# 需要先安装 iscsi
# https://docs.openebs.io/docs/next/prerequisites.html

helm repo add openebs https://openebs.github.io/charts
helm repo update
helm install --namespace openebs --name openebs openebs/openebs
```

## Operator

- 是 Helm Operator，更建议直接安装 HELM

```bash
# 直接安装
kubectl apply -f https://openebs.github.io/charts/openebs-operator.yaml
```

## zfs pv

- 拓普 Key - [How to add custom topology key](https://github.com/openebs/zfs-localpv/blob/develop/docs/faq.md#6-how-to-add-custom-topology-key)
  - 会添加 openebs.io/nodeid,openebs.io/nodename
  - 默认添加所有 node 上的 label
  - ALLOWED_TOPOLOGIES 控制
- https://github.com/openebs/zfs-localpv/tree/develop/docs

```bash
kubectl get csinodes -A
```

```yaml title="openebs-zfspv.sc.yaml"
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: openebs-zfspv
allowVolumeExpansion: true
parameters:
  poolname: 'zfspv-pool'
  # zfs,ext2,ext3,ext4,xfs,btrfs
  # 非 zfs 则用 zvol
  # 有些应用在指定的 fs 上运行的更好 - https://github.com/openebs/zfs-localpv/issues/169
  # 不设置默认 ext4
  fstype: 'zfs'
  # 允许多次挂载
  shared: 'yes'
  # yes - 即便 zpool 空间不够也会提供 pv
  # no - 会确保保留空间足够
  thinprovision: 'no'
  dedup: 'no'
  # on,off,lzjb,zstd,gzip,gzip-1,gzip-2,gzip-3,gzip-4,gzip-5,gzip-6,gzip-7,gzip-8,gzip-9,zle,lz4
  # on - 默认加密算法
  compression: 'on'
  # zfs 配置
  # recordsize:
  # zvol 配置
  # volblocksize:
provisioner: zfs.csi.openebs.io
allowedTopologies:
  - matchLabelExpressions:
      - key: openebs.io/nodeid
        values:
          - zfspv-node1
          - zfspv-node2
```

**快照**

```yaml title="zfspv-snapclass.yaml"
kind: VolumeSnapshotClass
apiVersion: snapshot.storage.k8s.io/v1beta1
metadata:
  name: zfspv-snapclass
  annotations:
    # snapshot.storage.kubernetes.io/is-default-class: "true"
driver: zfs.csi.openebs.io
deletionPolicy: Delete
```

对 PVC 进行快照

```yaml
apiVersion: snapshot.storage.k8s.io/v1beta1
kind: VolumeSnapshot
metadata:
  name: zfspv-snap
spec:
  volumeSnapshotClassName: zfspv-snapclass
  source:
    persistentVolumeClaimName: csi-zfspv
```

```bash
kubectl get volumesnapshot.snapshot
# 查看快照
kubectl get zfssnap -n openebs
zfs list -t all
```

## Data Engine

- [cStor]
  - Apache-2.0, C
  - IOs on ZVOL/uZFS over network
  - synchronous replication, snapshots and clones
- [Jiva]
  - Apache-2.0, Go
  - iSCSI Distributed Block Storage Controller
  - [longhorn/longhorn-engine](https://github.com/longhorn/longhorn-engine) fork
  - SCSI 基于 [gostor/gotgt](https://github.com/gostor/gotgt)
- [Mayastor]
  - Apache-2.0, Rust
  - cloud native declarative data plane
    - abstract storage resources - Storage unification
    - Low latency
    - support Micro-VM based containers
    - Programmatic based storage access
  - NVMe SSD
  - SPDK, NVMe-oF
  - Linux kernel 5.4+ - nvme-tcp, ext4, optionally xfs
  - x86-64, SSE4.2
- [Maya](https://github.com/openebs/maya)
  - non-csi - 3.0 废弃
  - 使用 CStore CSI 或 Jiva CSI

[jiva]: https://github.com/openebs/jiva
[cstor]: https://github.com/openebs/libcstor
[mayastor]: https://github.com/openebs/mayastor

## CSI

- [cStor](https://github.com/openebs/cstor-operators)
- Local PV - https://openebs.io/docs/main/concepts/casengines#local-engines
  - hostpath
  - device
  - [ZFS](https://github.com/openebs/zfs-localpv)
    - 节点上创建 ZPOOL - SC
  - LVM
  - Rawfile

| abbr.              | stand for                                 |
| ------------------ | ----------------------------------------- |
| CAS                | Container Attached Storage                |
| CSPC               | CStorPoolCluster                          |
| CSI                | Container Storage Interface               |
| Storage Pool Claim | SPC                                       |
| CSP                | cStor Storage Pool                        |
| CV                 | cStor Volume                              |
| CVR                | cStor Volume Replica                      |
| SPDK               | Intel Storage Performance Development Kit |
| MSN                | Mayastor Node                             |

## LocalPV ZFS

- [openebs/zfs-localpv](https://github.com/openebs/zfs-localpv)
  - 节点上创建 ZPOOL - SC
  - 支持 FS、Block
  - 支持 快照、克隆、Resize
  - 支持 Velero 备份恢复

:::caution

- 建议节点上关闭 zfs import
- 目前不支持迁移 - syncoid
  - [openebs/zfs-localpv#291](https://github.com/openebs/zfs-localpv/issues/291)
  - [openebs/zfs-localpv#219](https://github.com/openebs/zfs-localpv/issues/219)

:::

```yaml title="zfs-localpv.yaml"
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: openebs-zfspv
parameters:
  # zfs 参数
  recordsize: '4k'
  # volblocksize: "4k" # zvol 使用该参数
  compression: 'off'
  dedup: 'off'
  fstype: 'zfs' # 其他 fs 会创建为 zvol
  poolname: 'zfspv-pool' # 匹配创建的名字
provisioner: zfs.csi.openebs.io
allowedTopologies:
  - matchLabelExpressions:
      # 限定节点
      - key: kubernetes.io/hostname
        values:
          - zfspv-node1
          - zfspv-node2
      # 自定义 key
      - key: openebs.io/rack
        values:
          - rack1
# 默认使用 zfs scheduler - VolumeWeighted, CapacityWeighted
# 可使用 kubernetes scheduler - pod 节点亲和
volumeBindingMode: WaitForFirstConsumer
```

```yaml title="csi-zfspv.yaml"
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: csi-zfspv
spec:
  storageClassName: openebs-zfspv
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 4Gi
```

### snapshot

```yaml title="zfspv-snapclass.yaml"
kind: VolumeSnapshotClass
apiVersion: snapshot.storage.k8s.io/v1beta1
metadata:
  name: zfspv-snapclass
  annotations:
    snapshot.storage.kubernetes.io/is-default-class: 'true'
driver: zfs.csi.openebs.io
deletionPolicy: Delete
```

```yaml title="zfspv-snap.yaml"
apiVersion: snapshot.storage.k8s.io/v1beta1
kind: VolumeSnapshot
metadata:
  name: zfspv-snap
spec:
  volumeSnapshotClassName: zfspv-snapclass
  source:
    persistentVolumeClaimName: csi-zfspv
```

```bash
kubectl get volumesnapshot.snapshot
# 节点上也可以查看快照
zfs list -t all
```

### clone

```yaml title="zfspv-clone.yaml"
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: zfspv-clone
spec:
  storageClassName: openebs-zfspv
  dataSource:
    # clone 自 snapshot
    name: zfspv-snap
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
    # clone 自 volume
    name: zfspv-pvc
    kind: PersistentVolumeClaim
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 4Gi
```

### Backup/Restore

- 需要 Velero
- 需要 openebs/velero-plugin 插件

```yaml title="zfspv-full.yaml"
apiVersion: velero.io/v1
kind: VolumeSnapshotLocation
metadata:
  name: zfspv-full
  namespace: velero
spec:
  provider: openebs.io/zfspv-blockstore
  config:
    bucket: velero
    prefix: zfs
    incrBackupCount: '3' # number of incremental backups we want to have
    namespace: openebs # this is the namespace where ZFS-LocalPV creates all the CRs, passed as OPENEBS_NAMESPACE env in the ZFS-LocalPV deployment
    provider: aws
    region: minio
    s3ForcePathStyle: 'true'
    s3Url: http://minio.velero.svc:9000
```

# FAQ

## driver name zfs.csi.openebs.io not found in the list of registered CSI drivers

```bash
# 确保 driver 存在
kubectl get csinodes -oyaml
```

driver null 可能是注册出问题了

```bash
# 可尝试删除 openebs-zfs-localpv-node 的 Pod
kubectl delete csinodes NODEID
kubectl get pods -A -l role=openebs-zfs -owide
```

还有问题，应该是 kubelet 目录配置不对，默认是 /var/lib/kubelet，但 k0s、rke、k3s 需要修改。
