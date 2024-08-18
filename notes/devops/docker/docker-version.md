---
tags:
  - Version
---

# Docker Version

- https://docs.docker.com/tags/release-notes/
- Instakk https://docs.docker.com/engine/install/debian/
- AlpineLinux
  - 可直接使用 distro 里的包即可 `apk install docker docker-compose`
  - 版本够新
- debian/ubuntu distro 的包
  - docker.io - 版本相对比较旧
    - https://pkgs.org/search/?q=docker.io
    - 2024 - 目前都停留在 20.10 (2023-04-04)
  - docker-compose
  - docker-doc
  - podman-docker

| version       | date       |
| ------------- | ---------- |
| docker 27.0.1 | 2024-06-24 |
| docker 26.0.0 | 2024-03-20 |
| docker 25.0.0 | 2024-01-19 |
| docker 24.0.0 | 2023-05-16 |
| docker 23.0.0 | 2023-02-01 |

## Docker 27
- `docker image push --platform`
## Docker 26

- 支持挂载 subpath
  - `--mount type=volume,...,volume-subpath=<subpath>`

## Docker 25

- OpenTelemetry tracing
- `dockerd --log-format` text, json
- `docker image ls --filter=until=<timestamp>` 使用时间戳筛选镜像

## Docker 24

- `--host` 支持 `ssh://`
- docker-init 会在 PATH 里

## Docker 23

- BuildKit, buildx 为默认
  - `docker build` -> `docker buildx build`
  - opt out `DOCKER_BUILDKIT=0`
- 支持 `dockerd --validate` 校验配置
