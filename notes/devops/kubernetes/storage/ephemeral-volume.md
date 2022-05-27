---
title: Ephemeral Volumes
---

# 临时卷

用于缓存场景，不介意重启后数据丢失。

- 类型
  - emptyDir
  - configMap, downwardAPI, secret
    - 注入 K8S 数据
  - CSI 提供/CSIInlineVolume - 需要 [驱动支持](https://kubernetes-csi.github.io/docs/drivers.html)
    - 1.16 BETA
  - 通用临时卷/GenericEphemeralVolume
    - 1.19 ALPHA
    - 类似于 emptyDir
    - 存储可是本地也可以是 NAS
    - 可限制容量
    - 可有初始数据 - 取决于驱动和参数
    - 支持运维操作 - 取决于驱动支持
      - 快照、克隆、扩缩容、容量跟踪
    - StorageClass 最好使用 WaitForFirstConsumer 调度
- 参考
  - [Ephemeral Volumes](https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/)

```yaml
# CSI
kind: Pod
apiVersion: v1
metadata:
  name: my-csi-app
spec:
  containers:
    - name: my-frontend
      image: busybox
      volumeMounts:
        - mountPath: '/data'
          name: my-csi-inline-vol
      command: ['sleep', '1000000']
  volumes:
    - name: my-csi-inline-vol
      # CSI 提供
      csi:
        driver: inline.storage.kubernetes.io
        # 驱动相关
        volumeAttributes:
          foo: bar
    # Genric
    - name: scratch-volume
      ephemeral:
        # 注意这里是模版 - 在实际使用时根据模版创建 PVC
        # Pod 删除时会删除 PVC
        volumeClaimTemplate:
          metadata:
            labels:
              type: my-frontend-volume
          spec:
            accessModes: ['ReadWriteOnce']
            storageClassName: 'scratch-storage-class'
            resources:
              requests:
                storage: 1Gi
```
