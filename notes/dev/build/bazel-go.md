---
title: Brazel Go
---

## Brazel Go

- [bazelbuild/bazel-gazelle](https://github.com/bazelbuild/bazel-gazelle)
  - 为 go 和 protobuf 生成 BUILD
- deps.bzl
- 参考
  - [BUILDING A GO PROJECT USING BAZEL](https://www.tweag.io/blog/2021-09-08-rules_go-gazelle/)

:::tip

- 默认开启 trimpath
- 暂不支持 coverage

:::

```bash
# cross compile no cgo
bazel build --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 //cmd
# cross compile with cgo
bazel build --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64_cgo //cmd
```

```py
workspace(name = "my_project")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "2b1641428dff9018f9e85c0384f03ec6c10660d935b750e3fa1492a281a53b0f",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.29.0/rules_go-v0.29.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.29.0/rules_go-v0.29.0.zip",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "de69a09dc70417580aabf20a28619bb3ef60d038470c7cf8442fafcf627c21cb",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

#
go_rules_dependencies()
go_register_toolchains(version = "1.17.2")
gazelle_dependencies()
```

```py title="BUILD"
load("@bazel_gazelle//:def.bzl", "gazelle")

# gazelle:prefix zhensikeji.net/inccall/core
gazelle(name = "gazelle")

gazelle(
    name = "gazelle-update-repos",
    args = [
        "-from_file=go.mod",
        "-to_macro=deps.bzl%go_dependencies",
        "-prune",
        "-build_file_proto_mode=disable_global",
    ],
    command = "update-repos",
)
```

```bash
bazel run //:gazelle

bazel run //:gazelle -- update-repos -from_file=go.mod -to_macro=deps.bzl%go_dependencies
bazel run //:gazelle-update-repos
```

```bash
go get github.com/bazelbuild/bazel-gazelle/cmd/gazelle
gazelle -go_prefix github.com/example/project
```

### cross compile

```py
go_library(
    name = "foo",
    srcs = [
        "foo_linux.go",
        "foo_windows.go",
    ],
    deps = select({
        "@io_bazel_rules_go//go/platform:linux_amd64": [
            "//bar_linux",
        ],
        "@io_bazel_rules_go//go/platform:windows_amd64": [
            "//bar_windows",
        ],
        "//conditions:default": [],
    }),
)
```

## go_repository does not support file path replacements

## rules_go

- [bazelbuild/rules_go](https://github.com/bazelbuild/rules_go)
- [Build modes](https://github.com/bazelbuild/rules_go/blob/master/go/modes.rst#mode-attributes)
  - static, race, msan, pure, strip, debug, gotags, linkmode
  - 命令行 `--@io_bazel_rules_go//go/config:<mode>`
  - `go_binary(<mode> = "")`
- toolchain
  - go_register_toolchains -> @go_sdk -> go_download_sdk
  - go_download_sdk - 下载
  - go_local_sdk - 指定本地 PATH
- go_binary
  - out - 输出名字
    - 默认如果 name 和 dir 名字相同，则会添加下划线

```py
load("@io_bazel_rules_go//go:deps.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains(version = "1.15.5")
# 使用 host 的 go 版本 - 编译不一定可重现
# 但更快，少了下载安装过程
go_register_toolchains(version = "host")
```

```bash
# 交叉编译
bazel build --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64 //cmd
# with CGO
bazel build --platforms=@io_bazel_rules_go//go/toolchain:linux_amd64_cgo //cmd
```

- 也可以在 go_binary 设置 goos 和 goarch

## gazelle

:::caution

- 默认要求 proto 包名匹配目录 名字 - [#271](https://github.com/bazelbuild/bazel-gazelle/issues/271)
  - `go_repository(build_file_proto_mode = "disable_global",)`

:::

```bash
# 命令行生成
gazelle -go_prefix go-micro.dev/v4 -proto disable
```

## go_sdk

```bash
# Host
go_host_sdk(name="go_sdk")
# Local
go_local_sdk(
    name = "go_sdk",
    path = "/Users/wener/sdk/go1.18beta1",
)
go_register_toolchains()

# Download
go_register_toolchains(version = "1.17.6")
# Host
go_register_toolchains(version = "host")
```

## found but does not contain package

- https://github.com/bazelbuild/bazel-gazelle/issues/953
