---
title: Longhorn 版本
---

# Longhorn 版本

## v1.1
* 2020-10-18
* 试验性 [RWX](https://longhorn.io/docs/1.1.0/advanced-resources/rwx-workloads/)
  * 会启动 NFSv4 提供服务
* ARM64
* CSI Snapshotter
  * longhornio/csi-provisioner:v1.6.0
  * longhornio/csi-snapshotter:v2.1.1
  * CRD [kubernetes-csi/external-snapshotter/client/config/crd](https://github.com/kubernetes-csi/external-snapshotter/tree/master/client/config/crd)
  * Controller - [kubernetes-csi/external-snapshotter/deploy/kubernetes/snapshot-controller](https://github.com/kubernetes-csi/external-snapshotter/tree/master/deploy/kubernetes/snapshot-controller)
* Prometheus Metrics
* [Data Locality](https://longhorn.io/docs/1.1.0/high-availability/data-locality/)
* K8S v1.16+

```yaml
# k8s >= 1.17
kind: VolumeSnapshotClass
apiVersion: snapshot.storage.k8s.io/v1beta1
metadata:
  name: longhorn
driver: driver.longhorn.io
deletionPolicy: Delete
```
