---
title: Registry
---

# 容器注册中心

- DockerHub
  - 匿名用户 100 pull/6h/ip
  - 认证用户 200 pull/6h/ip
- quay.io
  - 目前没有限制
  - https://quay.io/plans/

```bash
TOKEN=$(curl --user 'username:password' "https://auth.docker.io/token?service=registry.docker.io&scope=repository:ratelimitpreview/test:pull" | jq -r .token)
curl --head -H "Authorization: Bearer $TOKEN" https://registry-1.docker.io/v2/ratelimitpreview/test/manifests/latest
```

**/etc/containers/registries.conf**

```toml
[[registry]]
prefix=" docker.io/library"
location="quay.io/libpod"
```

- https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md
- https://github.com/opencontainers/distribution-spec
