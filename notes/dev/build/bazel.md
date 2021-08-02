---
title: Bazel
---

# Bazel

- [bazelbuild/examples](https://github.com/bazelbuild/examples)
- [google/bazel-common](https://github.com/google/bazel-common)

```bash
brew install bazel

# 构建
bazel build //:ProjectRunner
# 查看依赖图
bazel query  --nohost_deps --noimplicit_deps "deps(//:ProjectRunner)" --output graph | dot -Tpng -o graph.png
imgcat graph.png

# 停止后台服务
bazel shutdown
```

## Starlark

https://docs.bazel.build/versions/master/skylark/language.html

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

## Remote

- [Remote Execution](https://docs.bazel.build/versions/master/remote-execution.html)
- [Remote Caching](https://docs.bazel.build/versions/master/remote-caching.html)
- Self Host
  - [twitter/scoot](https://github.com/twitter/scoot)
  - [bazelbuild/bazel-buildfarm](https://github.com/bazelbuild/bazel-buildfarm)
