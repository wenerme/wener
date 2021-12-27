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
- https://mirror.bazel.build
- used by
  - AOSP, Debian

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

## Java

- `_deploy.jar`
  - 包含所有依赖
- 应用
  - [google/dagger](https://github.com/google/dagger)
  - [angular/angular/BUILD.bazel](https://github.com/angular/angular/blob/master/BUILD.bazel)
- 参考
  - [How to choose the right build unit granularity](https://medium.com/wix-engineering/a58a8142c549)
  - [How to Decide on CI Server and remote execution / caching](https://medium.com/wix-engineering/be561f455c37)
- [bazelbuild/rules_gwt](https://github.com/bazelbuild/rules_gwt)
- [johnynek/bazel-deps](https://github.com/johnynek/bazel-deps) - Generate bazel dependencies for maven artifacts
- [wix/exodus](https://github.com/wix/exodus) - Easily migrate your JVM code from Maven to Bazel

```bash
bazel build //:java-maven
# 构建完整的包，包含所有依赖，可部署执行
bazel build //:java-maven_deploy.jar

# Maven 迁移
git clone https://github.com/bazelbuild/migration-tooling.git

```

```bazel
# 定义执行文件
java_binary(
    name = "ProjectRunner",
    srcs = glob(["src/main/java/com/example/ProjectRunner.java"]),
    # 依赖
    deps = [":greeter"],
    main_class = "com.example.ProjectRunner",
)

# 定义库
java_library(
    name = "greeter",
    srcs = ["src/main/java/com/example/Greeting.java"],
    # 默认当前 BUILD 文件可见
    visibility = ["//src/main/java/com/example/cmdline:__pkg__"],
)
```

### Maven

- [rules_jvm_external](https://github.com/bazelbuild/rules_jvm_external) - Java 构建外部依赖
  - Maven
- [google/bazel-common/maven](https://github.com/google/bazel-common/tree/master/tools/maven)
  - 支持生成 pom.xml

```bash
# 查看所有依赖，输出为 BUILD
bazel query @maven//:all --output=build
```

```
load("@rules_jvm_external//:defs.bzl", "maven_install", "artifact")

load("@rules_jvm_external//:defs.bzl", "artifact")
# 可以使用 artifact("junit:junit") 而不是 @maven//:junit_junit
```

**WORKSPACE**

```
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

RULES_JVM_EXTERNAL_TAG = "2.6.1"
RULES_JVM_EXTERNAL_SHA = "45203b89aaf8b266440c6b33f1678f516a85b3e22552364e7ce6f7c0d7bdc772"

# 下载规则依赖
http_archive(
    name = "rules_jvm_external",
    strip_prefix = "rules_jvm_external-%s" % RULES_JVM_EXTERNAL_TAG,
    sha256 = RULES_JVM_EXTERNAL_SHA,
    url = "https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip" % RULES_JVM_EXTERNAL_TAG,
)

# 导入
load("@rules_jvm_external//:defs.bzl", "maven_install")

# 定义 Maven 仓库和使用的包
maven_install(
    artifacts = [
        "junit:junit:4.12",
        "androidx.test.espresso:espresso-core:3.1.1",
        "org.hamcrest:hamcrest-library:1.3",
    ],
    repositories = [
        # Private repositories are supported through HTTP Basic auth
        "http://username:password@localhost:8081/artifactory/my-repository",
        "https://jcenter.bintray.com/",
        "https://maven.google.com",
        "https://repo1.maven.org/maven2",
    ],
)
```

**BUILD**

```
java_library(
    name = "java_test_deps",
    exports = [
        "@maven//:junit_junit"
        "@maven//:org_hamcrest_hamcrest_library",
    ],
)

android_library(
    name = "android_test_deps",
    exports = [
        "@maven//:junit_junit"
        "@maven//:androidx_test_espresso_espresso_core",
    ],
)
```

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

```bash
docker run -v $PWD/cache:/data -p 9090:8080 -p 9092:9092 --name bazel-remote-cache buchgr/bazel-remote-cache
curl http://localhost:9090/status
bazel build //src/main:app --remote_cache=http://localhost:9090
```

```
build:cache             --remote_download_minimal
build:cache             --remote_cache=http://localhost:9090
```

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
# outputPath & action_cache
bazel clean
```
