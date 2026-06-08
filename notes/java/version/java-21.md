---
title: Java 21
---

# Java 21

- Released: 2023-09-19
- LTS
- [JDK 21 Project](https://openjdk.org/projects/jdk/21/)

## 核心总结

- LTS。虚拟线程、Record Patterns、switch 模式匹配转正，Sequenced Collections 加入，Generational ZGC 可用。

## 升级关注

- LTS。Virtual Threads 已转正，但 pinning、ThreadLocal、连接池容量等仍需重新评估。
- String Templates 后续路线变化，避免过早固化。

## 示例

### Virtual Threads 正式

```java
try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
  for (int i = 0; i < 1000; i++) {
    executor.submit(() -> blockingCall());
  }
}
```

### Sequenced Collections

```java
java.util.SequencedCollection<String> names = new java.util.ArrayList<>();
names.addFirst("first");
names.addLast("last");
System.out.println(names.reversed());
```

### Record Pattern + switch Pattern

```java
record Point(int x, int y) {}

static String render(Object value) {
  return switch (value) {
    case Point(int x, int y) -> x + "," + y;
    case null -> "null";
    default -> "other";
  };
}
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 430] | 预览 | 语言 | String Templates (Preview) | 字符串模板预览，后续路线发生变化，使用前需关注状态。 |
| [JEP 431] | 正式 | 库/API | Sequenced Collections | 统一有序集合接口。 |
| [JEP 439] | 正式 | GC/Runtime | Generational ZGC | 分代 ZGC。 |
| [JEP 440] | 正式 | 语言 | Record Patterns | Record 模式转正。 |
| [JEP 441] | 正式 | 语言 | Pattern Matching for switch | switch 模式匹配转正。 |
| [JEP 442] | 第三次预览 | Panama/向量/原生 | Foreign Function & Memory API (Third Preview) | FFM API 第三次预览。 |
| [JEP 443] | 预览 | 语言 | Unnamed Patterns and Variables (Preview) | 未命名模式和变量预览，用 _ 表示不用的值。 |
| [JEP 444] | 正式 | 并发/Loom | Virtual Threads | 虚拟线程转正。 |
| [JEP 445] | 预览 | 语言 | Unnamed Classes and Instance Main Methods (Preview) | 未命名类和实例 main 方法预览，降低入门样板。 |
| [JEP 446] | 预览 | 并发/Loom | Scoped Values (Preview) | Scoped Values 进入预览。 |
| [JEP 448] | 第六次孵化 | Panama/向量/原生 | Vector API (Sixth Incubator) | Vector API 第六次孵化。 |
| [JEP 449] | 废弃 | 工具/平台 | Deprecate the Windows 32-bit x86 Port for Removal | 废弃 Windows 32-bit x86 port。 |
| [JEP 451] | 迁移预告 | 库/API | Prepare to Disallow the Dynamic Loading of Agents | 准备限制运行时动态加载 Agent。 |
| [JEP 452] | 正式 | 库/API | Key Encapsulation Mechanism API | KEM 密钥封装机制 API。 |
| [JEP 453] | 预览 | 并发/Loom | Structured Concurrency (Preview) | 结构化并发进入预览。 |

[JEP 430]: https://openjdk.org/jeps/430
[JEP 431]: https://openjdk.org/jeps/431
[JEP 439]: https://openjdk.org/jeps/439
[JEP 440]: https://openjdk.org/jeps/440
[JEP 441]: https://openjdk.org/jeps/441
[JEP 442]: https://openjdk.org/jeps/442
[JEP 443]: https://openjdk.org/jeps/443
[JEP 444]: https://openjdk.org/jeps/444
[JEP 445]: https://openjdk.org/jeps/445
[JEP 446]: https://openjdk.org/jeps/446
[JEP 448]: https://openjdk.org/jeps/448
[JEP 449]: https://openjdk.org/jeps/449
[JEP 451]: https://openjdk.org/jeps/451
[JEP 452]: https://openjdk.org/jeps/452
[JEP 453]: https://openjdk.org/jeps/453

## References

- [JDK 21 Project](https://openjdk.org/projects/jdk/21/)
- [Java 21 Release Notes](https://jdk.java.net/21/release-notes)
