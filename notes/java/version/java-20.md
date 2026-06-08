---
title: Java 20
---

# Java 20

- Released: 2023-03-21
- [JDK 20 Project](https://openjdk.org/projects/jdk/20/)

## 核心总结

- 延续 Java 19 的预览和孵化能力，Scoped Values 首次孵化。

## 升级关注

- 主要是预览/孵化迭代，适合跟踪 Loom/Panama API 变化。

## 示例

### Scoped Values Incubator

```java
// javac --enable-preview --release 20 --add-modules jdk.incubator.concurrent Demo.java
// API 在后续版本有变化，此处只表达“绑定一段作用域内的值”的用途。
```

### Virtual Threads Second Preview

```java
// javac --enable-preview --release 20 Demo.java
Thread.startVirtualThread(() -> System.out.println("virtual"));
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 429] | 孵化 | 并发/Loom | Scoped Values (Incubator) | Scoped Values 首次孵化，作为 ThreadLocal 的结构化替代。 |
| [JEP 432] | 第二次预览 | 语言 | Record Patterns (Second Preview) | Record 模式第二次预览。 |
| [JEP 433] | 第四次预览 | 语言 | Pattern Matching for switch (Fourth Preview) | switch 模式匹配第四次预览。 |
| [JEP 434] | 第二次预览 | Panama/向量/原生 | Foreign Function & Memory API (Second Preview) | FFM API 第二次预览。 |
| [JEP 436] | 第二次预览 | 并发/Loom | Virtual Threads (Second Preview) | 虚拟线程第二次预览。 |
| [JEP 437] | 第二次孵化 | 并发/Loom | Structured Concurrency (Second Incubator) | 结构化并发第二次孵化。 |
| [JEP 438] | 第五次孵化 | Panama/向量/原生 | Vector API (Fifth Incubator) | Vector API 第五次孵化。 |

[JEP 429]: https://openjdk.org/jeps/429
[JEP 432]: https://openjdk.org/jeps/432
[JEP 433]: https://openjdk.org/jeps/433
[JEP 434]: https://openjdk.org/jeps/434
[JEP 436]: https://openjdk.org/jeps/436
[JEP 437]: https://openjdk.org/jeps/437
[JEP 438]: https://openjdk.org/jeps/438

## References

- [JDK 20 Project](https://openjdk.org/projects/jdk/20/)
- [Java 20 Release Notes](https://jdk.java.net/20/release-notes)
