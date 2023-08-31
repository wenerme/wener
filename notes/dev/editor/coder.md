---
title: coder
---

# coder

- [coder/coder](https://github.com/coder/coder)
  - AGPLv3, Golang
  - provisions remote development environments via Terraform
- [coder/code-server](https://github.com/coder/code-server)
- [coder/code-marketplace](https://github.com/coder/code-marketplace)

## code-server

```bash
# https://hub.docker.com/r/linuxserver/code-server
# lscr.io/linuxserver/code-server:latest
docker run --rm -it \
  -v $PWD/data:/config \
  -p 8443:8443 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -e PASSWORD=password \
  -e HASHED_PASSWORD= \
  -e SUDO_PASSWORD=password \
  -e SUDO_PASSWORD_HASH= \
  -e PROXY_DOMAIN=code-server.my.domain \
  -e DEFAULT_WORKSPACE=/config/workspace \
  --name code-server linuxserver/code-server

# https://hub.docker.com/r/codercom/code-server
# https://github.com/coder/code-server/blob/main/ci/release-image/Dockerfile
```
