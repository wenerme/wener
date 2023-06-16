---
title: Local PV
---

# Local Persistent Volumes

- 使用场景
  - local pv 没有网络传输、更好的 iops 和本地读写速度
  - 应用自行复制数据的场景
  - 会被绑定到某个节点，节点异常必须手动干涉
- vs hostPath
  - durable and portable manner without manually scheduling pods to nodes
- 1.14 GA
- [local/volume](https://kubernetes.io/docs/concepts/storage/volumes/#local)
- [kubernetes-sigs/sig-storage-local-static-provisioner](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner)
  - [Best Practices](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner/blob/master/docs/best-practices.md)
- [Kubernetes 1.14: Local Persistent Volumes GA](https://kubernetes.io/blog/2019/04/04/kubernetes-1.14-local-persistent-volumes-ga/)

```yaml
# 添加 StorageClass
# 然后需要部署 provisioner 创建 PVs
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
# WaitForFirstConsumer 跟随 Pod 调度
# https://kubernetes.io/docs/concepts/storage/storage-classes/#volume-binding-mode
volumeBindingMode: WaitForFirstConsumer
```

## STS+Local PV

```bash
mkdir -p /tmp/pv-{1,2,3}
```

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
  namespace: data-system
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer

---

apiVersion: v1
kind: Service
metadata:
  name: nginx-test
spec:
  selector:
    app: nginx-test
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
    name: web
  clusterIP: None

---

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: nginx-test
  labels:
    app: nginx-test
spec:
  replicas: 1
  serviceName: nginx-test
  persistentVolumeClaimRetentionPolicy:
    whenDeleted: Delete
  selector:
    matchLabels:
      app: nginx-test
  template:
    metadata:
      name: nginx-test
      labels:
        app: nginx-test
    spec:
      containers:
      - name: nginx-test
        image: wener/nginx
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
          name: web
        volumeMounts:
        - mountPath: /var/www/html
          name: data
      restartPolicy: Always
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      # 只能通过 SC 来控制绑定的位置
      storageClassName: local-storage
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
      # 无用
      selector:
        matchLabels:
          local: pv-2

---
# 需要多少个 PV 就创建多少个
# 不会自动创建
# 提前准备好目录
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv-1
  labels:
    local: pv-2
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /tmp/pv-1
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - svr-1

---

apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv-2
  labels:
    local: pv-2
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /tmp/pv-2
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - svr-1
```
