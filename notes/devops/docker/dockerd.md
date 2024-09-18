---
title: dockerd
---

# dockerd

- https://docs.docker.com/engine/reference/commandline/dockerd/
- --insecure-registry
  - secure tls 或 `/etc/docker/certs.d/myregistry:5000/ca.crt`
  - insecure - http 或 不验证证书
  - 支持格式
    - `myregistry:5000`
    - `10.1.0.0/16`

**daemon.json**

```json
{
  "insecure-registries": ["localhost:5000"],
  "registry-mirrors": ["https://docker.wener.me"]
}
```
