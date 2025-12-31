---
title: Java 22
---

# Java 22

- Non-LTS
- Released: 2024-03-19
- [JDK 22 Project](https://openjdk.java.net/projects/jdk/22/)

## Features

### Finalized

- [JEP 454](https://openjdk.java.net/jeps/454): Foreign Function & Memory API
  - 外部函数和内存 API 正式版，替代 JNI。
- [JEP 456](https://openjdk.java.net/jeps/456): Unnamed Variables & Patterns
  - 使用 `_` 作为未命名变量和模式。
- [JEP 458](https://openjdk.java.net/jeps/458): Launch Multi-File Source-Code Programs
  - 允许直接运行包含多个源文件的 Java 程序。
- [JEP 423](https://openjdk.java.net/jeps/423): Region Pinning for G1
  - 减少 G1 GC 在 JNI 临界区的延迟。

### Preview

- [JEP 447](https://openjdk.java.net/jeps/447): Statements before super(...) (Preview)
  - 允许在构造函数中 `super(...)` 之前执行语句。
- [JEP 457](https://openjdk.java.net/jeps/457): Class-File API (Preview)
  - 标准化类文件处理 API。
- [JEP 461](https://openjdk.java.net/jeps/461): Stream Gatherers (Preview)
  - 增强 Stream API，支持自定义中间操作。
- [JEP 459](https://openjdk.java.net/jeps/459): String Templates (Second Preview)
- [JEP 463](https://openjdk.java.net/jeps/463): Implicitly Declared Classes and Instance Main Methods (Second Preview)
- [JEP 462](https://openjdk.java.net/jeps/462): Structured Concurrency (Second Preview)
- [JEP 464](https://openjdk.java.net/jeps/464): Scoped Values (Second Preview)

### Incubator

- [JEP 460](https://openjdk.java.net/jeps/460): Vector API (Seventh Incubator)

## References

- [Java 22 Release Notes](https://jdk.java.net/22/release-notes)
