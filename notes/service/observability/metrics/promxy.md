---
title: promxy
---

# promxy

- [jacksontj/promxy](https://github.com/jacksontj/promxy)
  - 聚合多个 prometheus 进行查询
  - [config.yaml](https://github.com/jacksontj/promxy/blob/master/cmd/promxy/config.yaml)
    - nocache=1 for VictoriaMetrics [QueryParams](https://github.com/jacksontj/promxy/blob/d4609ebcfd2a50d58f2115c1f079bf4779fc5515/pkg/servergroup/config.go#L96-L99)

```bash
# http://127.0.0.1:8082
promxy --config config.yaml

# https://hub.docker.com/r/jacksontj/promxy
```

```yaml
global:
  evaluation_interval: 5s
```
