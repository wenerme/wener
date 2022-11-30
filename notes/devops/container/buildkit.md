---
title: buildkit
---

# buildkit

- [moby/buildkit](https://github.com/moby/buildkit)
  - 可单独使用
- buildkitd
- buildctl
- 可配合 rootlesskit
- 参考
  - [buildctl-daemonless.sh](https://github.com/moby/buildkit/blob/master/examples/buildctl-daemonless/buildctl-daemonless.sh)
    - spawns ephemeral buildkitd for executing buildctl
  - [rootless.md](https://github.com/moby/buildkit/blob/master/docs/rootless.md)
    - [rootless-containers/rootlesskit](https://github.com/rootless-containers/rootlesskit)

:::tip

- [moby/buildkit#1058](https://github.com/moby/buildkit/issues/1058)
  exporter: support resetting timestamp for determinism

:::

```bash
apk add docker-cli-buildx # AlpineLinux

docker buildx version
docker buildx use default
docker buildx install # buildx -> build

# 额外的 Builder
docker buildx create --use
docker build -t demo -o type=image .
```

- driver
  - docker
  - docker-container
  - kubernetes
  - remote

## RUN mount

- cache - 创建一个目录用于缓存
  - /var/lib/buildkit/
- bind - bind host 目录
  - source 为 host path - 默认 =target
  - 不同环境 source 可能不同，使用上不太方便
- secret
- ssh

```dockerfile
FROM wener/node

RUN --mount=type=cache,target=/root/.cache/go-build \
  go build
RUN --mount=type=cache,target=/root/.m2 \
  mvn -o install
RUN --mount=type=cache,target=/root/.npm/_cacache/ \
  npm install

# npm & pnpm
RUN --mount=type=cache,target=/root/.npm/_cacache/ \
  --mount=type=cache,target=/root/.local/share/pnpm/store npm install -g pnpm \
  && pnpm install
```

| type=cache  | val                       |
| ----------- | ------------------------- |
| id          | =target                   |
| target      | mount point               |
| ro,readonly |
| sharing     | shared,private,locked     |
| from        | build stage, 默认为空目录 |
| source      | from 的子目录             |
| mode        | 0755                      |
| uid         | 0                         |
| gid         | 0                         |

- https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/reference.md
- https://github.com/moby/buildkit/issues/1673

## docker build unknown flag: --push

需要启用 buildx


## cache export feature is currently not supported for docker driver

```bash
docker buildx create --use
```

## push and load may not be set together at the moment

- https://github.com/docker/buildx/issues/177
