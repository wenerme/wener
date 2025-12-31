---
title: Docker Build
tags:
  - DevOps
  - Docker
  - Build
---

# Docker Build

## BuildKit

- BuildKit, a container image builder.
- [Release Notes 19.03.0](https://docs.docker.com/engine/release-notes/#19030)
- [Working with Buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [Building Multi-Platform Images](https://github.com/docker/buildx#building-multi-platform-images)

```bash
export DOCKER_BUILDKIT=1
```

## CI/CD Cache

- [Faster CI/CD builds with Docker Cache](https://testdriven.io/blog/faster-ci-builds-with-docker-cache/)

```bash
# Build and cache image
docker build --tag mjhea0/docker-ci-cache:latest --build-arg BUILDKIT_INLINE_CACHE=1 .

# Build image from remote cache
docker build --cache-from mjhea0/docker-ci-cache:latest .
```
