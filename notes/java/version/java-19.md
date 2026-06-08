---
title: Java 19
---

# Java 19

- Released: 2022-09-20
- [JDK 19 Project](https://openjdk.org/projects/jdk/19/)

## 核心总结

- Loom/Panama 关键能力进入预览，虚拟线程首次预览，结构化并发首次孵化。

## 升级关注

- Virtual Threads/Structured Concurrency/FFM 仍是预览或孵化。

## 示例

### Virtual Threads Preview

```java
// javac --enable-preview --release 19 Demo.java
try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
  executor.submit(() -> System.out.println(Thread.currentThread()));
}
```

### Record Patterns Preview

```java
record Point(int x, int y) {}
Object value = new Point(1, 2);
if (value instanceof Point(int x, int y)) {
  System.out.println(x + y);
}
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 405] | 预览 | 语言 | Record Patterns (Preview) | Record 模式预览，支持解构记录。 |
| [JEP 422] | 正式 | 工具/平台 | Linux/RISC-V Port | 支持 Linux RISC-V。 |
| [JEP 424] | 预览 | Panama/向量/原生 | Foreign Function & Memory API (Preview) | FFM API 进入预览。 |
| [JEP 425] | 预览 | 并发/Loom | Virtual Threads (Preview) | 虚拟线程首次预览。 |
| [JEP 426] | 第四次孵化 | Panama/向量/原生 | Vector API (Fourth Incubator) | Vector API 第四次孵化。 |
| [JEP 427] | 第三次预览 | 语言 | Pattern Matching for switch (Third Preview) | switch 模式匹配第三次预览。 |
| [JEP 428] | 孵化 | 并发/Loom | Structured Concurrency (Incubator) | 结构化并发首次孵化。 |

[JEP 405]: https://openjdk.org/jeps/405
[JEP 422]: https://openjdk.org/jeps/422
[JEP 424]: https://openjdk.org/jeps/424
[JEP 425]: https://openjdk.org/jeps/425
[JEP 426]: https://openjdk.org/jeps/426
[JEP 427]: https://openjdk.org/jeps/427
[JEP 428]: https://openjdk.org/jeps/428

## References

- [JDK 19 Project](https://openjdk.org/projects/jdk/19/)
- [Java 19 Release Notes](https://jdk.java.net/19/release-notes)
