---
title: Bazel
---

# Bazel

- [bazelbuild/bazel](https://github.com/bazelbuild/bazel)
  - 支持多语言
  - 支持多平台
  - Starlark DSL
  - reproduce build
  - remote cache
    - WebDAV
    - bazel-remote
  - remote build
  - 自行准备环境 - 下载 JDK、下载 Golang SDK 等
  - 自行维护依赖 - 下载 JAR、下载 go mod
- [bazelbuild/examples](https://github.com/bazelbuild/examples)
- [google/bazel-common](https://github.com/google/bazel-common)
- 镜像
  - https://mirror.bazel.build
    - https://github.com/bazelbuild/rules_python/issues/400#issuecomment-776810051
  - Bazel 镜像
    - https://mirrors.huaweicloud.com/bazel/
- 参考
  - [Users](https://bazel.build/users.html)
    - Abseil, TensorFlow, gRPC
  - Kubernetes 1.21 移除 bazel 构建 - [KEP#2420](https://github.com/BenTheElder/enhancements/blob/master/keps/sig-testing/2420-reducing-kubernetes-build-maintenance/README.md)
    - go build cache 足够优秀
  - Pants, Buck: created and developed by ex-Googlers at Twitter and Foursquare, and Facebook

:::tip When to use Bazel

- 声明式构建
- 增量编译
- Remote Cache 和 Remote Execution
- Reproduce 构建
- 多语言多平台复杂构建
- **大多时候不需要使用 Bazel**

:::

:::caution When **not** to use Bazel

- 所有被依赖的内容都会进行明确定义 - 目录下包含 BUILD.bazel
- 依赖变化需要重新生成各种 BUILD.bazel
  - 是一种开发负担 - 因此规模不大时不建议使用 Bazel
- Bazel 会维护自己的缓存
  - 不会使用 go 的全局缓存
  - 不会使用 npm/yarn 的全局缓存
  - 好处: Remote 执行, 跨主机共享
  - 坏处: 磁盘空间, 网络环境
- Bazel 会维护自己的工具链
  - 每个 WORKSPACE 都会下载 toolchain - 例如 go,node
  - 好处: 确保环境版本
  - 坏处: 占用磁盘空间, 国内环境下载可能有问题
- Bazel 运行环境复杂 - 如果需要分发给其他人编辑构建的场景不建议使用
  - JDK, Python, coreutils
- Bazel 启动和分析需要时间 - 如果现行构建时间 < 10m 时不建议使用

:::


:::warning

- Bazel 官方构建的不支持 musl

:::

```bash
brew install bazel

# 构建
bazel build //:ProjectRunner
# 查看依赖图
bazel query  --nohost_deps --noimplicit_deps "deps(//:ProjectRunner)" --output graph | dot -Tpng -o graph.png
imgcat graph.png

# 停止后台服务
bazel shutdown

# Build all
bazel build //...
```

## Starlark

https://docs.bazel.build/versions/master/skylark/language.html

## Notes

- workspace - 工作空间
  - WORKSPACE, WORKSPACE.bazel 所在目录
- repository - 仓库
  - `@` - root repository - WORKSPACE 所在目录
  - 可定义外部仓库 - [external](https://docs.bazel.build/versions/main/external.html)
    - bind, local_repository, new_local_repository
- package
  - BUILD 所在目录
- target
  - =files+rules
  - files 分为源文件和生成文件
  - package_group
- label - 标签
  - target 的名字叫做 label - label 唯一标识 target
  - `@myrepo//my/app/main:app_binary`
    - @myrepo// - 仓库名字
      - 在 repo 内可忽略，写作 `//my/app/main:app_binary`
    - my/app/main - un-qualified package name - 包名
      - +repo=fully-qualified package name
      - 在包内可忽略，写作 `:app_binary` 或 `app_binary`
    - app_binary - un-qualified target name
      - 如果名字与最后部分名字相同，可忽略
        - `//my/app/lib:lib` = `//my/app/lib`
- .bzl - extension
- [be] - Bazel BUILD Encyclopedia

[be]: https://docs.bazel.build/versions/main/be/overview.html

## Remote Execution

- [Remote Execution](https://docs.bazel.build/versions/master/remote-execution.html)
- Self Host
  - [twitter/scoot](https://github.com/twitter/scoot)
  - [bazelbuild/bazel-buildfarm](https://github.com/bazelbuild/bazel-buildfarm)

## Remote Caching

- [Remote Caching](https://docs.bazel.build/versions/master/remote-caching.html)
- 存储
  - nginx
  - [bazel-remote](https://github.com/buchgr/bazel-remote/)
- ac.v2 cas.v2 raw.v2
  - hash, blob
  - cas=Content addressed storage
  - ac=Action cache
- bazel 不负责删除缓存
- [--experimental_remote_downloader](https://docs.bazel.build/versions/main/command-line-reference.html#flag--experimental_remote_downloader)
- HTTP 8080
- gRPC 9092
- Profiling 6060
- --config_file BAZEL_REMOTE_CONFIG_FILE
- --experimental_remote_asset_api

```bash
docker run --rm -it \
  -u 1000 \
  -v $PWD/cache:/data -p 8080:8080 -p 9092:9092 \
  --name bazel-remote-cache buchgr/bazel-remote-cache
curl http://localhost:8080/status

bazel build //src/main:app --remote_cache=http://localhost:9092
# remote asset
bazel build //src/main:app --experimental_remote_downloader=grpc://localhost:9092 --remote_cache=grpc://localhost:9092
```

:::caution remote asset is broken

- not works with go-sdk [#13206](https://github.com/bazelbuild/bazel/issues/13206)

:::

```
build:cache --remote_download_minimal
build:cache --remote_cache=http://localhost:8080
```

## The remote downloader can only be used in combination with gRPC caching

```bash
# from
bazel build //src/main:app --experimental_remote_downloader=grpc://localhost:9090 --remote_cache=http://localhost:9090
# to
bazel build //src/main:app --experimental_remote_downloader=grpc://localhost:9090 --remote_cache=grpc://localhost:9090
```

## Failed to query remote execution capabilities: INTERNAL: http2 exception

## .bazelrc

- .bazelignore

:::caution

- 不能使用任意环境变量
  - 可考虑预先生成 https://github.com/stratum/stratum/pull/878/files

:::

---

- system
  - /etc/bazel.bazelrc
  - `%ProgramData%\bazel.bazelrc`
  - BAZEL_SYSTEM_BAZELRC_PATH
  - --nosystem_rc
- workspace
  - .bazelrc
  - --noworkspace_rc
  - $workspace/tools/bazel.rc
  - --nomaster_bazelrc
- home
  - $HOME/.bazelrc
  - `%USERPROFILE%\.bazelrc`, `%HOME%/.bazelrc`
  - --nohome_rc
- --bazelrc
- https://github.com/tensorflow/tensorflow/blob/master/.bazelrc
- 变量
  - %workspace%

```shell
build --announce_rc
build --copt -O0
build --disk_cache=/tmp/bazel-disk-cache
# Set convenient location for Bazel files to cache
startup --output_user_root=/tmp/bazel-cache/output-root

build --verbose_failures=true
# Profile build
build --profile=/tmp/bazel.profile.json

# JVM 限制
# startup --host_jvm_args=-Xmx3g --host_jvm_args=-Xms2g


try-import %workspace%/.bazelrc.user

# Include git version info
build --stamp
build --workspace_status_command 'echo STABLE_GIT_COMMIT $(git rev-parse HEAD)'
```

```bash
# https://github.com/bazelbuild/bazelisk/blob/master/stamp.sh
build:release -c opt --stamp --workspace_status_command="$PWD/stamp.sh"
```

```shell
# Running bazel inside a `docker build` command causes trouble, cf:
#   https://github.com/bazelbuild/bazel/issues/134
# The easiest solution is to set up a bazelrc file forcing --batch.
startup --batch

# Similarly, we need to workaround sandboxing issues:
#   https://github.com/bazelbuild/bazel/issues/418
build  --verbose_failures --spawn_strategy=standalone --strategy=Genrule=standalone
test --spawn_strategy=standalone

# Force bazel output to use colors (good for jenkins) and print useful errors.
common --color=yes

# Configure tests - increase timeout, print errors and timeout warnings
test --verbose_failures --test_output=errors --test_verbose_timeout_warnings
```

## Notes

- https://docs.bazel.build/versions/main/build-ref.html
- workspace
- package
  - BUILD
- target
- label

## query

- bazel-collector
- https://docs.bazel.build/versions/main/query.html
- https://docs.bazel.build/versions/main/query-how-to.html

```bash
bazel query //...

bazel query set(BUILD, some-dir/BUILD)
bazel query rdeps(//..., set(//:all //some-dir:all))
bazel query rdeps(//..., set(some-file.java, some-file.sh))

bazel query rebuildfiles(some-ext.bzl, some-dir/another-ext.bzl)

bazel query kind("*_test", <sub query>)
bazel query kind("artifact_ci_release", <sub query>)

bazel query "allpaths(//foo, third_party/...)" --notool_deps --output graph | dot -Tsvg > /tmp/deps.svg
```

## bzlmod

- bazel 5.0+
- MODULE.bazel
- --experimental_enable_bzlmod
- https://github.com/bazelbuild/bazel-central-registry
- https://docs.bazel.build/versions/main/bzlmod.html
- https://docs.google.com/document/d/1moQfNcEIttsk6vYanNKIy3ZuK53hQUFq1b1r0rmsYVg/edit

# FAQ

## BUILD vs BUILD.bazel

- [bazel#4517](https://github.com/bazelbuild/bazel/issues/4517)

## Fetching @local_config_xcode

## from google

| google | os                   |
| ------ | -------------------- |
| blaze  | bazel                |
| sponge | bru, BuildBuddy      |
| tap    | BuildKite, CircleCI  |
| forge  | BuildFarm, BuildBarn |
| cider  |

## output

- macOS /private/var/tmp
- Linux ~/.cache/bazel
- https://docs.bazel.build/versions/main/output_directories.html
- out/
  - `_bazel_$USER` - outputUserRoot - `--output_user_root`
    - install/ - installBase
      - $MD5(installation manifest)
        - \_embedded_binaries/
        - builtins_bzl/
        - platforms/
    - $MD5(workspace path) - outputBase - `--output_base`
      - command.log
      - java.log
      - action_cache/
      - action_outs/
      - external/
        - go_sdk/ - 缓存的 Go SDK
        - bazel_gazelle_go_repository_cache/ - 缓存的 Go 仓库
        - org_golang_google_genproto/
        - remotejdk11_macos/
        - remote_java_tools_darwin/
        - com_google_protobuf/
      - server/
        - jvm.out
      - execroot/
        - `__main__`/ - $WORKSPACE
          - bazel-out/ - outputPath
            - stable-status.txt
            - volatile-status.txt
            - darwin-fastbuild/
              - bin/ - $(BINDIR)
            - host/ - BuildConfiguration
          - external
          - $PACKAGES -> realpath
      - bazel-remote-logs/
      - bazel-workers/
      - install -> installBase
- bazel-out
- bazel-bin
- bazel-testlogs
- bazel-$WORKSPACE
- TEST_TMPDIR=~/.cache/bazel
- --output_user_root
- `project_dir = ctx.path(ctx.attr.file_in_project).dirname`
  - `__workspace_dir__`

```bash
# all go_sdk - 每个 400MB
du -csh /private/var/tmp/_bazel_$USER/*/external/go_sdk

# outputPath & action_cache
bazel clean
```
