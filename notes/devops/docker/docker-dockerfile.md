---
title: Dockerfile
---

# Dockerfile

```
# syntax = docker/dockerfile:1
# syntax = docker/dockerfile:experimental
```

**内置变量**

```dockerfile
FROM alpine
ARG TARGETPLATFORM
```

| env            | for                                                                        |
| -------------- | -------------------------------------------------------------------------- |
| TARGETPLATFORM | 构建结果的平台  |
| TARGETOS       | OS  of TARGETPLATFORM                                             |
| TARGETARCH     | arch  of TARGETPLATFORM                                   |
| TARGETVARIANT  | variant  of TARGETPLATFORM                                        |
| BUILDPLATFORM  | 执行构建的节点的平台                                |
| BUILDOS        | OS of BUILDPLATFORM                                              |
| BUILDARCH      | arch of BUILDPLATFORM                                    |
| BUILDVARIANT   | variant of BUILDPLATFORM                                         |

- platform
  - linux/amd64, linux/arm/v7, windows/amd64

**BuildKit 内置**

| Arg                           | Type   | Description                                                                                                                            |
| ----------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| BUILDKIT_CACHE_MOUNT_NS       | String | Set optional cache ID namespace.                                                                                                       |
| BUILDKIT_CONTEXT_KEEP_GIT_DIR | Bool   | Trigger git context to keep the .git directory.                                                                                        |
| BUILDKIT_INLINE_CACHE2        | Bool   | Inline cache metadata to image config or not.                                                                                          |
| BUILDKIT_MULTI_PLATFORM       | Bool   | Opt into determnistic output regardless of multi-platform output or not.                                                               |
| BUILDKIT_SANDBOX_HOSTNAME     | String | Set the hostname (default buildkitsandbox)                                                                                             |
| BUILDKIT_SYNTAX               | String | Set frontend image                                                                                                                     |
| SOURCE_DATE_EPOCH             | Int    | Set the UNIX timestamp for created image and layers. More info from reproducible builds. Supported since Dockerfile 1.5, BuildKit 0.11 |
