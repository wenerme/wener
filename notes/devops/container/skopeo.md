---
title: skopeo
---

# skopeo

- [containers/skopeo](https://github.com/containers/skopeo)

```bash
brew install skopeo

skopeo inspect docker://registry-1.docker.io/wener/base:latest

skopeo copy docker://registry-1.docker.io/wener/base:latest oci-archive:base.tar
# 目录
# skopeo copy docker://registry-1.docker.io/wener/base:latest dir:$PWD/base
docker import base.tar
```
