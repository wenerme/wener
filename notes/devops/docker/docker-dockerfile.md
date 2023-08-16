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
| TARGETPLATFORM | platform of the build result. Eg linux/amd64, linux/arm/v7, windows/amd64. |
| TARGETOS       | OS component of TARGETPLATFORM                                             |
| TARGETARCH     | architecture component of TARGETPLATFORM                                   |
| TARGETVARIANT  | variant component of TARGETPLATFORM                                        |
| BUILDPLATFORM  | platform of the node performing the build.                                 |
| BUILDOS        | OS component of BUILDPLATFORM                                              |
| BUILDARCH      | architecture component of BUILDPLATFORM                                    |
| BUILDVARIANT   | variant component of BUILDPLATFORM                                         |

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
