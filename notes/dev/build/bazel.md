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
  - Bazel 镜像
    - https://mirrors.huaweicloud.com/bazel/
- used by
  - AOSP, Debian

:::caution

- Bazel 官方构建的不支持 musl
  - Using standalone binary on Alpine [#5891](https://github.com/bazelbuild/bazel/issues/5891)
  - musl support in CI  [#1190](https://github.com/bazelbuild/continuous-integration/issues/1190)
  - https://gitlab.alpinelinux.org/alpine/aports/-/blob/master/testing/bazel4/APKBUILD

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

```shell
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

- workspace
- package
  - BUILD
- target
- label

## query

- bazel-collector

```bash
bazel query //...

bazel query set(BUILD, some-dir/BUILD)
bazel query rdeps(//..., set(//:all //some-dir:all))
bazel query rdeps(//..., set(some-file.java, some-file.sh))

bazel query rebuildfiles(some-ext.bzl, some-dir/another-ext.bzl)

bazel query kind("*_test", <sub query>)
bazel query kind("artifact_ci_release", <sub query>)
```

## bzlmod

- bazel 5.0+
- MODULE.bazel
- https://docs.bazel.build/versions/main/bzlmod.html

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

```bash
# all go_sdk - 每个 400MB
du -csh /private/var/tmp/_bazel_$USER/*/external/go_sdk

# outputPath & action_cache
bazel clean
```
