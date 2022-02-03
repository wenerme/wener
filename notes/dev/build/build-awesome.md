---
title: Build Awesome
tags:
  - Awesome
---

# Build Awesome

- https://reproducible-builds.org/
- [batect/batect](https://github.com/batect/batect)
- [elfshaker/elfshaker](https://github.com/elfshaker/elfshaker)

## Build system

:::info 为什么需要 构建系统

构建之所以需要一个系统，是因为大项目通常包含上 **百万** 个 C/C++ 源文件，单纯的直接编译是不现实的。

- 假设平均处理每个源文件需要 0.01s，那么 1M 源文件则需要 3 小时

:::

- Ninjia
- CMAKE
- Make
- Bazel
- Buck
- [pantsbuild/pants](https://github.com/pantsbuild/pants)
  - scalable build system for monorepos
- [gn](https://gn.googlesource.com/gn/)
  - generates build files for Ninja
- Nix
