---
title: MinIO Operator
---

# MinIO Operator

- MinIO Kubernetes Operator
  - AGPLv3
  - 支持多租户
  - 支持租户扩容
  - 部署 minio 和 console
    - console 有 operator 模式
    - console 支持创建 tenant - 只能创建集群模式
  - 提供命令行安装
  - cdr minio.min.io/Tenant

```bash
helm repo add minio https://operator.min.io/
# helm 内支持生成多个 tenant
helm install --namespace minio-operator --create-namespace --generate-name minio/minio-operator
# kubectl apply -f https://github.com/minio/operator/blob/master/examples/tenant.yaml
```

## tenant

```yaml
image: minio/minio:RELEASE.2021-04-06T23-11-00Z
imagePullPolicy: IfNotPresent
## Secret with credentials to be used by MinIO Tenant.
credsSecret:
  name: minio-demo-secret

pools:
  - servers: 4
    volumesPerServer: 4
    volumeClaimTemplate:
      metadata:
        name: data
      spec:
        storageClassName: standard
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 10Gi

mountPath: /export
subPath: /data
requestAutoCert: true
s3:
  bucketDNS: false
podManagementPolicy: Parallel

console:
  image: minio/console:v0.6.8
  replicas: 1
  consoleSecret:
    name: console-secret
```
