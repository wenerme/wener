---
title: GraalVM
---

# GraalVM

GraalVM 是一个高性能的 JDK 发行版，旨在加速 Java 应用程序的执行，同时支持多语言运行时。

## 核心特性

1.  **高性能 JIT 编译器 (Graal Compiler)**
    - 用 Java 编写的新一代即时编译器，可作为 C2 编译器的替代品。
    - 提供更好的峰值性能和优化。

2.  **Native Image (原生镜像)**
    - AOT (Ahead-of-Time) 编译：将 Java 应用编译为独立的本机可执行文件。
    - **优点**:
      - 瞬时启动 (Instant startup)。
      - 低内存占用。
      - 无需 JVM 环境即可运行。
    - **限制**: 反射、动态代理等动态特性需要额外的配置 (Reflection Configuration)。
    - 常用于微服务 (Quarkus, Micronaut, Spring Native) 和 CLI 工具。

3.  **多语言运行时 (Polyglot Runtime)**
    - 基于 **Truffle** 框架。
    - 支持运行 JavaScript, Python, Ruby, R, LLVM bitcode 等语言。
    - 允许 Java 与其他语言无缝互操作 (零开销调用)。

## 组件

- **GraalVM Core**: 包含 JDK、Graal 编译器、Native Image 等。
- **Truffle**: 构建解释器的语言实现框架。
- **Sulong**: LLVM bitcode 执行引擎。

## 常用命令

```bash
# 安装 native-image 工具
gu install native-image

# 编译 jar 为原生可执行文件
native-image -jar myapp.jar

# 运行 js
js my-script.js
```

## 参考

- [GraalVM 官网](https://www.graalvm.org/)
- [GitHub 仓库](https://github.com/oracle/graal)
- [Native Image 文档](https://www.graalvm.org/native-image/)
