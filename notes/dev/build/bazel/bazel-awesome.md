---
tags:
  - Awesome
---

# Bazel Awesome

- [bazelbuild/bazel-gazelle](https://github.com/bazelbuild/bazel-gazelle)
  - 生成 BUILD.bazel
- [stellar/go](https://github.com/stellar/go)
  - Golang monorepo
- [bazelbuild/bazelisk](https://github.com/bazelbuild/bazelisk)
  - wrapper
- [bazelbuild/bazel-watcher](https://github.com/bazelbuild/bazel-watcher)
  - Watch change
- [bazelbuild/intellij](https://github.com/bazelbuild/intellij)
  - intellij 插件
  - 目前还是早期版本 - 功能很弱
- [bazelbuild/buildtools](https://github.com/bazelbuild/buildtools)
  - buildifier - BUILD & .bzl
- 商业产品服务
  - [bzl-io/bzl](https://github.com/bzl-io/bzl)
  - [buildbuddy-io/buildbuddy](https://github.com/buildbuddy-io/buildbuddy)
  - https://buildkite.com/

---

- [atlassian/bazel-tools](https://github.com/atlassian/bazel-tools)
  - 已经归档， multirun 可用于聚合运行多个 target

```bash
go install github.com/bazelbuild/buildtools/buildifier@latest
buildifier --lint=fix path/to/file
```

```bash
bazel run //:buildifier
```

- $XDG_CACHE_HOME
- macOS $HOME/Library/Caches
- $HOME/.cache
- Windows %LocalAppData%
- Plan 9 $home/lib/cache
- cache
  - ~/Library/Caches/bazelisk/downloads/bazelbuild/bazel-$VERSION-darwin-x86_64/bin/download3656661839

```basj
GOPROXY=https://goproxy.io,direct go install github.com/bazelbuild/bazelisk@latest
USE_BAZEL_VERSION=4.2.2 BAZELISK_BASE_URL=https://mirrors.huaweicloud.com/bazel `go env GOPATH`/bin/bazelisk info

tree ~/Library/Caches/bazelisk/downloads
```

```makefile title="Makefile"
BAZEL=BAZELISK_BASE_URL=https://mirrors.huaweicloud.com/bazel `go env GOPATH`/bin/bazelisk

prepare:
	command -v bazel > /dev/null || GOPROXY=https://goproxy.io,direct go install github.com/bazelbuild/bazelisk@latest
	$(BAZEL) info

.PHONY: build
build:
	$(BAZEL) build //cmd/...
```

## showcase

- [googleapis/googleapis](https://github.com/googleapis/googleapis)
  - proto 一次性编译 7 种语言
  - 使用 [googleapis/rules_gapic](https://github.com/googleapis/rules_gapic) 生成

## Stories

- [Building Uber’s Go Monorepo with Bazel](https://eng.uber.com/go-monorepo-bazel/)

## 参考项目

- https://github.com/tensorflow/serving/blob/master/WORKSPACE
- Golang
  - [thundergolfer/example-bazel-monorepo](https://github.com/thundergolfer/example-bazel-monorepo)
  - [grpc-ecosystem/grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway)
    - buildkite [pipeline](https://buildkite.com/bazel/grpc-ecosystem-grpc-gateway)
  - [google/differential-privacy](https://github.com/google/differential-privacy)
  - [jetstack/cert-manager](https://github.com/jetstack/cert-manager)
  - [google/mediapipe](https://github.com/google/mediapipe)
