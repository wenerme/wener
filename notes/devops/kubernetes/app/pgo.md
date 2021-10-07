---
title: CrunchyData PGO
---

# CrunchyData PostgreSQL Operator

- namespace 模式
  - dynamic
  - readonly
  - disabled

| port  | desc              |
| ----- | ----------------- |
| 8443  | api server        |
| 4151  | nsqadmin          |
| 4150  | nsqd              |
| 5432  | pg                |
| 5432  | pgbouncer         |
| 2022  | pgBackRest        |
| 9187  | postgres-exporter |
| 10000 | pgbadger          |

```bash
kubectl create namespace pgo
# 会部署 job pgo-deploy, 执行 install, pgo-deployer
kubectl apply -f https://raw.githubusercontent.com/CrunchyData/postgres-operator/v4.7.0/installers/kubectl/postgres-operator.yml
```

```yaml
apiVersion: postgres-operator.crunchydata.com/v1beta1
kind: PostgresCluster
metadata:
  name: hippo
spec:
  image: registry.developers.crunchydata.com/crunchydata/crunchy-postgres:centos8-14.0-0
  postgresVersion: 14
  instances:
    - dataVolumeClaimSpec:
        accessModes:
          - 'ReadWriteOnce'
        resources:
          requests:
            storage: 5Gi
  backups:
    pgbackrest:
      image: registry.developers.crunchydata.com/crunchydata/crunchy-pgbackrest:centos8-2.35-0
      repos:
        - name: repo1
          volume:
            volumeClaimSpec:
              accessModes:
                - 'ReadWriteOnce'
              resources:
                requests:
                  storage: 5Gi
  users:
    - name: postgres
```

# FAQ

## pgo vs zalando postgres-operator

- pgo
  - 有 pgo 命令行工具
- zalando
  - 有 Operator UI - 使用有问题
  - team 相关选项是必须的，但是实际一般不会用到，增加复杂性

---

- https://github.com/CrunchyData/postgres-operator/issues/992
