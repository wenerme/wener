---
title: Java 23
---

# Java 23

- Non-LTS
- Released: 2024-09-17
- [JDK 23 Project](https://openjdk.java.net/projects/jdk/23/)

## Features

### Preview & Incubator

- [JEP 455](https://openjdk.java.net/jeps/455): Primitive Types in Patterns, instanceof, and switch (Preview)
  - 允许在模式匹配、`instanceof` 和 `switch` 中使用原始类型。
- [JEP 476](https://openjdk.java.net/jeps/476): Module Import Declarations (Preview)
  - 简化模块导入，例如 `import module M;`。
- [JEP 477](https://openjdk.java.net/jeps/477): Implicitly Declared Classes and Instance Main Methods (Third Preview)
  - 简化 Java 入门程序结构，自动导入 `java.io.IO`。
- [JEP 482](https://openjdk.java.net/jeps/482): Flexible Constructor Bodies (Second Preview)
  - 构造函数体更加灵活，允许在 `super()` 之前初始化字段。
- [JEP 466](https://openjdk.java.net/jeps/466): Class-File API (Second Preview)
- [JEP 473](https://openjdk.java.net/jeps/473): Stream Gatherers (Second Preview)
- [JEP 480](https://openjdk.java.net/jeps/480): Structured Concurrency (Third Preview)
- [JEP 481](https://openjdk.java.net/jeps/481): Scoped Values (Third Preview)
- [JEP 469](https://openjdk.java.net/jeps/469): Vector API (Eighth Incubator)

### Standard

- [JEP 467](https://openjdk.java.net/jeps/467): Markdown Documentation Comments
  - Javadoc 支持 Markdown 语法。
- [JEP 474](https://openjdk.java.net/jeps/474): ZGC: Generational Mode by Default
  - ZGC 分代模式成为默认配置。

### Deprecations

- [JEP 471](https://openjdk.java.net/jeps/471): Deprecate the Memory-Access Methods in sun.misc.Unsafe for Removal
  - 废弃 `sun.misc.Unsafe` 中的内存访问方法。

## References

- [Java 23 Release Notes](https://jdk.java.net/23/release-notes)
