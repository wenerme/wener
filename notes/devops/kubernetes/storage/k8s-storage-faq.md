---
title: Kubernetest 存储常见问题
---

# Kubernetest 存储常见问题

## OpenEBS vs Longhorn

- OpenEBS
  - Jiva 源于 longhorn [fork](https://github.com/openebs/longhorn)，在一些实现上有分歧
    - 目前区别已经非常大
    - 分歧点: Control Plane functionality, iSCSI Target implementation, Quorum, Backup / Restore, UI
  - OpenEBS 除了 Jiva 还有其他方式
    - 支持 localpath - localpv 也支持很多 provision 方式
  - 使用更加灵活/复杂
  - 支持更多场景
- Longhorn
  - 基于 iSCSI 的分布式块存储 - 对 lan 要求高
  - 基于 NFS 支持 RWX
  - 使用简单，UI 友好，方便备份
  - 如果需要 LocalPV 可使用 - [rancher/local-path-provisioner](https://github.com/rancher/local-path-provisioner)
    - K3S 内置

:::caution

- OLTP 数据库不适合 OpenEBS/Longhorn 分布式存储 - 可设置好备份存储

:::

## pv 删除不了

尝试删除 finalizer

## volume already bound to a different claim

```bash
# 如果 pvc 不存在了但是 pv 还在，新创建 pvc 不会被绑定
# 尝试清除 claimRef - 设置为 null
kubectl patch pv my-pv-name -p '{"spec":{"claimRef": null}}'
```

## driver name driver.longhorn.io not found in the list of registered CSI drivers

- csi 插件目录 /var/lib/kubelet/plugins_registry
- hostpath /var/lib/kubelet/plugins/csi-hostpath
- /var/lib/kubelet/plugins
- k3s 可能目录 /var/lib/rancher/k3s/agent/kubelet
- [kubernetes-csi/csi-driver-host-path#71](https://github.com/kubernetes-csi/csi-driver-host-path/issues/71)

## 设置默认 StorageClass

```bash
kubectl get storageclass

# 取消 sc 的默认值
kubectl patch storageclass local-path -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
# 设置默认
kubectl patch storageclass longhorn -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

## failed to generate spec: path "/" is mounted on "/" but it is not a shared or slave mount

```bash
mount --make-rshared /
```
