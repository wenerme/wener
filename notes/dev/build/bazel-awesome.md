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
  - user-friendly launcher
- [bazelbuild/bazel-watcher](https://github.com/bazelbuild/bazel-watcher)
  - Watch change
- [bazelbuild/intellij](https://github.com/bazelbuild/intellij)
  - intellij 插件
  - 目前还是早期版本 - 功能很弱
- [bazelbuild/buildtools](https://github.com/bazelbuild/buildtools)
  - buildifier - BUILD & .bzl

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

## showcase
- [googleapis/googleapis](https://github.com/googleapis/googleapis)
  - proto 一次性编译 7 种语言
  - 使用 [googleapis/rules_gapic](https://github.com/googleapis/rules_gapic) 生成


## Stories

- [Building Uber’s Go Monorepo with Bazel](https://eng.uber.com/go-monorepo-bazel/)
