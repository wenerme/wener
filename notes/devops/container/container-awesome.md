---
title: Container Awesome
tags:
- Awesome
---

# Container Awesome

## Engine

- docker
- podman
- lxd
- cri-o
- rkt

## Runtime

- [opencontainers/runc](https://github.com/opencontainers/runc)
- [containers/crun](https://github.com/containers/crun)
- containerd

## Build

**问题**

- 是否需要 Linux 环境
- 是否需要 Privilege 环境
- 是否需要守护进程
- 是否支持跨平台
- Manifest 支持
- 缓存支持
- 易用性

### Builder

- BuildKit
- Kaniko
- Buildha

### Code to Image

- [openshift/source-to-image](https://github.com/openshift/source-to-image)
- [GoogleContainerTools/jib](https://github.com/GoogleContainerTools/jib)
- [bazelbuild/bazel](https://github.com/bazelbuild/bazel)

### Tools

- [GoogleContainerTools/container-diff](https://github.com/GoogleContainerTools/container-diff)
- 参考
  - [构建容器的最佳做法](https://cloud.google.com/solutions/best-practices-for-building-containers)

## Inspect

- [containers/skopeo](https://github.com/containers/skopeo)
  - remote images registries - retrieving information, images, signing content
- [wagoodman/dive](https://github.com/wagoodman/dive)
- [vicanso/diving](https://github.com/vicanso/diving)
  - dive web


## Interesting

- [golobby/container](https://github.com/golobby/container)
  - lightweight yet powerful IoC container for Go projects
