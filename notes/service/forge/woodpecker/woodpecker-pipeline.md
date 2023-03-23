---
title: Pipeline
---

# Woodpecker Pipeline

- 配置顺序 - [constant.go#L27-L32](https://github.com/woodpecker-ci/woodpecker/blob/46452fbd848bb57ad78c7069a5d2ffa63f3156ec/shared/constant/constant.go#L27-L32)
  - .woodpecker/
  - .woodpecker.yml
  - .woodpecker.yaml
  - .drone.yml

```ini
WOODPECKER_DATABASE_DRIVER=postgres
WOODPECKER_DATABASE_DATASOURCE=postgres://root:password@1.2.3.4:5432/postgres?sslmode=disable
```
