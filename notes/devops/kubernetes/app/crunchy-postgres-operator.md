---
title: pgo
---

# CrunchyData postgres-operator

- [CrunchyData/postgres-operator](https://github.com/CrunchyData/postgres-operator)
  - Apache-2.0, Go
- 备份使用 pgbackrest
  - https://pgbackrest.org/configuration.html
- https://access.crunchydata.com/documentation/postgres-operator/v5/references/crd/
- https://access.crunchydata.com/documentation/postgres-operator/v5/references/components/

## cannot change permissions of ‘/pgdata/pg14’: No such file or directory

```yaml
spec:
  openshift: false
```

- https://github.com/CrunchyData/postgres-operator/issues/2870
