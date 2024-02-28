---
tags:
  - Kubernetes
---

# JuiceFS on Kubernetes

- CSI
- 可以配置 pathPattern=`"${.PVC.namespace}-${.PVC.name}"`，生成的 pv 名字更易读

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: juicefs-secret
type: Opaque
stringData:
  name: <JUICEFS_NAME>
  metaurl: <META_URL>
  storage: s3
  bucket: https://<BUCKET>.s3.<REGION>.amazonaws.com
  access-key: <ACCESS_KEY>
  secret-key: <SECRET_KEY>
  # 设置 Mount Pod 时区，默认为 UTC。
  # envs: "{TZ: Asia/Shanghai}"
  # 如需在 Mount Pod 中创建文件系统，也可以将更多 juicefs format 参数填入 format-options。
  # format-options: trash-days=1,block-size=4096

---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: juicefs
provisioner: csi.juicefs.com
parameters:
  csi.storage.k8s.io/provisioner-secret-name: juicefs-secret
  csi.storage.k8s.io/provisioner-secret-namespace: default
  csi.storage.k8s.io/node-publish-secret-name: juicefs-secret
  csi.storage.k8s.io/node-publish-secret-namespace: default
```

- /var/lib/juicefs/volume/PV_NAME
- https://juicefs.com/docs/csi/introduction/
