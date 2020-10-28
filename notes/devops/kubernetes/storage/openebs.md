---
title: OpenEBS
---

# OpenEBS

- [openebs.io](https://www.openebs.io)
  - [openebs/openebs](https://github.com/openebs/openebs)
- 源于 longhorn [fork](https://github.com/openebs/longhorn)，在一些实现上有分歧
  - Control Plane functionality
  - iSCSI Target implementation
  - Quorum
  - Backup / Restore
  - UI
- OpenEBS cStor - Disks/SSDs/Cloud Volumes
- OpenEBS Jiva - hostpath or external mounted storage
-

| Volume              | Storage                  | Requirement                                           |
| ------------------- | ------------------------ | ----------------------------------------------------- |
| OpenEBS cStor       | Disks/SSDs/Cloud Volumes | 保护节点异常，同步副本，快照，克隆，Thin provisioning |
| OpenEBS Jiva        | hostpath, 外部挂载       | 保护节点异常，同步副本，Thin provisioning             |
| Local PV - Hostpath | hostpath, 外部挂载       | 低延时，本地持久卷                                    |
| Local PV - Device   | Disks/SSDs/Cloud Volumes | 低延时，本地持久卷                                    |
| Local PV - ZFS      | Disks/SSDs/Cloud Volumes | 低延时，本地持久卷，快照，克隆                        |
| OpenEBS Mayastor    |
| Local PV - Rawfile  |                          | 低延时，本地持久卷                                    |

```bash
# 需要先安装 iscsi
# https://docs.openebs.io/docs/next/prerequisites.html

helm repo add openebs https://openebs.github.io/charts
helm repo update
helm install --namespace openebs --name openebs openebs/openebs

# 直接安装
kubectl apply -f https://openebs.github.io/charts/openebs-operator.yaml
```
