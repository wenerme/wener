---
title: Local Path Provisioner
---

# Local Path

- [rancher/local-path-provisioner](https://github.com/rancher/local-path-provisioner)
- `storageClassName: local-path`
- 自动创建目录 - /var/lib/rancher/k3s/storage
  - `pvc-<UUID>_<NAMESPACE>_<PVC_NAME>`
  - UUID=pvc.uid
  - PVC_NAME=`<VOLUME_NAME>_<POD_NAME>`
- 注意
  - 异常后 PVC 丢失，StatefulSet 无法启动
    - 删除 Pod 从新部署可恢复

**k3s 默认配置**

```json
{
  "nodePathMap": [
    {
      "node": "DEFAULT_PATH_FOR_NON_LISTED_NODES",
      "paths": ["/var/lib/rancher/k3s/storage"]
    }
  ]
}
```

## 配置

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: local-path-config
  namespace: local-path-storage
data:
  # paths 设置为空数组则会拒绝
  # paths 设置多个会随机选择
  config.json: |-
    {
      "nodePathMap":[
        {
          "node":"DEFAULT_PATH_FOR_NON_LISTED_NODES",
          "paths":["/opt/local-path-provisioner"]
        },
        {
          "node":"yasker-lp-dev1",
          "paths":["/opt/local-path-provisioner", "/data1"]
        },
        {
          "node":"yasker-lp-dev3",
          "paths":[]
        }
      ]
    }
  setup: |-
    #!/bin/sh
    path=$1
    mkdir -m 0777 -p ${path}
  teardown: |-
    #!/bin/sh
    path=$1
    rm -rf ${path}
```
