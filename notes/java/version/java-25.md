---
title: Java 25
---

# Java 25

- Released: 2025-09
- LTS
- [JDK 25 Project](https://openjdk.org/projects/jdk/25/)

## 核心总结

- LTS。Scoped Values、模块导入、紧凑源文件、灵活构造函数体、KDF、紧凑对象头和分代 Shenandoah 转正。

## 升级关注

- LTS。Scoped Values、紧凑源文件、模块导入、KDF、紧凑对象头等转正，但 Structured Concurrency 仍是预览。

## 示例

### Compact Source Files and Instance Main Methods

```java
void main() {
  IO.println("Hello, Java 25");
}
```

### Module Import Declarations

```java
import module java.base;

void main() {
  System.out.println(List.of("a", "b"));
}
```

### Scoped Values 正式

```java
static final ScopedValue<String> REQUEST_ID = ScopedValue.newInstance();

ScopedValue.where(REQUEST_ID, "req-1").run(() -> {
  System.out.println(REQUEST_ID.get());
});
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 470] | 预览 | 安全/加密 | PEM Encodings of Cryptographic Objects (Preview) | PEM 编码加密对象 API 预览。 |
| [JEP 502] | 预览 | 库/API | Stable Values (Preview) | Stable Values 预览，提供一次初始化后稳定读取的值容器。 |
| [JEP 503] | 移除/禁用 | 库/API | Remove the 32-bit x86 Port | 移除 32-bit x86 port。 |
| [JEP 505] | 第五次预览 | 并发/Loom | Structured Concurrency (Fifth Preview) | 结构化并发第五次预览。 |
| [JEP 506] | 正式 | 并发/Loom | Scoped Values | Scoped Values 转正。 |
| [JEP 507] | 第三次预览 | 语言 | Primitive Types in Patterns, instanceof, and switch (Third Preview) | 原始类型模式第三次预览。 |
| [JEP 508] | 第十次孵化 | Panama/向量/原生 | Vector API (Tenth Incubator) | Vector API 第十次孵化。 |
| [JEP 509] | 实验 | 工具/平台 | JFR CPU-Time Profiling (Experimental) | JFR CPU 时间 profiling 实验。 |
| [JEP 510] | 正式 | Panama/向量/原生 | Key Derivation Function API | KDF API 转正。 |
| [JEP 511] | 正式 | 语言 | Module Import Declarations | 模块导入声明转正。 |
| [JEP 512] | 正式 | 语言 | Compact Source Files and Instance Main Methods | 紧凑源文件和实例 main 转正。 |
| [JEP 513] | 正式 | 语言 | Flexible Constructor Bodies | 灵活构造函数体转正。 |
| [JEP 514] | 正式 | 库/API | Ahead-of-Time Command-Line Ergonomics | AOT 命令行体验改进。 |
| [JEP 515] | 正式 | 库/API | Ahead-of-Time Method Profiling | AOT 方法 profiling。 |
| [JEP 518] | 正式 | 工具/平台 | JFR Cooperative Sampling | JFR 协作式采样。 |
| [JEP 519] | 正式 | GC/Runtime | Compact Object Headers | 紧凑对象头转正。 |
| [JEP 520] | 正式 | 工具/平台 | JFR Method Timing & Tracing | JFR 方法计时和追踪。 |
| [JEP 521] | 正式 | GC/Runtime | Generational Shenandoah | 分代 Shenandoah 转正。 |

[JEP 470]: https://openjdk.org/jeps/470
[JEP 502]: https://openjdk.org/jeps/502
[JEP 503]: https://openjdk.org/jeps/503
[JEP 505]: https://openjdk.org/jeps/505
[JEP 506]: https://openjdk.org/jeps/506
[JEP 507]: https://openjdk.org/jeps/507
[JEP 508]: https://openjdk.org/jeps/508
[JEP 509]: https://openjdk.org/jeps/509
[JEP 510]: https://openjdk.org/jeps/510
[JEP 511]: https://openjdk.org/jeps/511
[JEP 512]: https://openjdk.org/jeps/512
[JEP 513]: https://openjdk.org/jeps/513
[JEP 514]: https://openjdk.org/jeps/514
[JEP 515]: https://openjdk.org/jeps/515
[JEP 518]: https://openjdk.org/jeps/518
[JEP 519]: https://openjdk.org/jeps/519
[JEP 520]: https://openjdk.org/jeps/520
[JEP 521]: https://openjdk.org/jeps/521

## References

- [JDK 25 Project](https://openjdk.org/projects/jdk/25/)
- [Java 25 Release Notes](https://jdk.java.net/25/release-notes)
