---
title: woodpecker
---

# woodpecker

- [woodpecker-ci/woodpecker](https://github.com/woodpecker-ci/woodpecker)
  - community fork of the Drone CI 0.8 - Apache 2.0 最后版本
- 0.16/1.0 agent 支持 local 和 ssh

## server

```ini
# 只有配置了的 image 才可以映射 host 的 docker socket
WOODPECKER_ESCALATE=plugins/docker,plugins/gcr,plugins/ecr,woodpeckerci/plugin-docker,woodpeckerci/plugin-docker-buildx
```

## agent

```ini
WOODPECKER_AGENT_SECRET=

# key=value,key=*
WOODPECKER_FILTER_LABELS=

WOODPECKER_MAX_WORKFLOWS=1

# docker, local, ssh
WOODPECKER_BACKEND=auto-detect

# ssh backend
WOODPECKER_BACKEND_SSH_ADDRESS=
WOODPECKER_BACKEND_SSH_USER=
WOODPECKER_BACKEND_SSH_PASSWORD=
WOODPECKER_BACKEND_SSH_KEY= # path to key
WOODPECKER_BACKEND_SSH_KEY_PASSWORD=
```

## docker backend

- `/woodpecker/src/${GIT_REMOTE_URL}`
  - e.g. `/woodpecker/src/github.com/wenerme/wener`
- volume /woodpecker

```ini
WOODPECKER_BACKEND_DOCKER_VOLUMES=/etc/ssl/certs:/etc/ssl/certs:ro,/etc/timezone:/etc/timezone
```

## local backend

- image 为 shell
- 建议配置 WOODPECKER_FILTER_LABELS=type=exec 过滤
- https://woodpecker-ci.org/docs/next/administration/backends/local

```bash
apk add curl git
# 要下 next 版本
# curl -Lo /usr/bin/plugin-git https://ghproxy.com/github.com/woodpecker-ci/plugin-git/releases/download/v2.0.3/linux-amd64_plugin-git
# chmod +x /usr/bin/plugin-git

# woodpeckerci/plugin-git:next 是 AlpineLinux 3.17
docker pull woodpeckerci/plugin-git:next
docker run --rm -it --entrypoint cat woodpeckerci/plugin-git:next /bin/plugin-git > plugin-git
chmod +x plugin-git
mv plugin-git /bin
```

# FAQ

## Insufficient privileges to use volumes

将项目设置为 Trusted
