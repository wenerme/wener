---
title: skopeo
---

# skopeo

- [containers/skopeo](https://github.com/containers/skopeo)
  - Apache-2.0, Go
- $XDG_RUNTIME_DIR/containers/auth.json

```bash
brew install skopeo # macOS Homebrew

# login insecure
skopeo login --tls-verify=false localhost:5000
# push
skopeo copy docker-daemon:server:latest docker://localhost:5000/server:latest --dest-tls-verify=false

skopeo inspect docker://registry-1.docker.io/wener/base:latest

skopeo copy docker://registry-1.docker.io/wener/base:latest oci-archive:base.tar
# 目录
# skopeo copy docker://registry-1.docker.io/wener/base:latest dir:$PWD/base
docker import base.tar
```

| env                | for        | defualt |
| ------------------ | ---------- | ------- |
| REGISTRY_AUTH_FILE | --authfile |         |

- authfile
  - ${XDG_RUNTIME_DIR}/containers/auth.json
  - $HOME/.docker/config.json
- `containers-storage:docker-reference`
- `dir:path`
- `docker://docker-reference`
- `docker-archive:path[:docker-reference]`
- `docker-daemon:docker-reference`
- `oci:path:tag`
  - Open Container Image Layout Specification

# FAQ

## Unsolicited response received on idle HTTP channel starting with

- 关闭 tls-verfiy 可能会出现
- golang HTTP 处理错误

```
net/http: HTTP/1.x transport connection broken: malformed HTTP status code
```
