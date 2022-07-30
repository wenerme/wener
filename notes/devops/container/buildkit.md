---
title: buildkit
---

# buildkit

- [moby/buildkit](https://github.com/moby/buildkit)
- 参考
  - [buildctl-daemonless.sh](https://github.com/moby/buildkit/blob/master/examples/buildctl-daemonless/buildctl-daemonless.sh)
    - spawns ephemeral buildkitd for executing buildctl
  - [rootless.md](https://github.com/moby/buildkit/blob/master/docs/rootless.md)
    - [rootless-containers/rootlesskit](https://github.com/rootless-containers/rootlesskit)

```bash
apk add docker-cli-buildx # AlpineLinux

docker buildx version
docker buildx use default
docker buildx install     # buildx -> build

# 额外的 Builder
docker buildx create --use
docker build -t demo -o type=image .
```

- driver
  - docker
  - docker-container
  - kubernetes
  - remote

## docker build unknown flag: --push

需要启用 buildx
