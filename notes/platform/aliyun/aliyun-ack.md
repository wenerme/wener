---
tags:
  - Kubernetes
---

# Aliyun ACK

## 存储

- 内置 StorageClass
  - 单可用区集群：
    - alibaba-disk-auto - ESSD AutoPL云盘
    - alicloud-disk-efficiency - 高效云盘
    - alicloud-disk-ssd - SSD云盘
    - alicloud-disk-essd - ESSD云盘
  - 多可用区集群：
    - alicloud-disk-topology - 使用延迟绑定的方式创建云盘。
    - alicloud-disk-topology-alltype - 依次尝试创建指定的存储类型，并且使用WaitForFirstConsumer模式，可以兼容多可用区集群。
- 参考
  - https://help.aliyun.com/zh/ecs/product-overview/block-storage-devices
  - https://help.aliyun.com/zh/ack/ack-managed-and-ack-dedicated/user-guide/disk-volume-overview-3

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: alicloud-disk-wait-for-first-consumer
provisioner: diskplugin.csi.alibabacloud.com
parameters:
  type: cloud_auto,cloud_essd,cloud_ssd # 使用该配置，按优先级自适应选择云盘类型，最终创建的云盘类型受节点实例、所在可用区云盘支持情况等因素影响。
  fstype: ext4
  diskTags: 'a:b,b:c'
  encrypted: 'false'
  performanceLevel: PL1
  volumeExpandAutoSnapshot: 'forced' # 该设置仅在创建的云盘类型为cloud_essd时生效。
  provisionedIops: '40000'
  burstingEnabled: 'false'
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
allowVolumeExpansion: true
```
