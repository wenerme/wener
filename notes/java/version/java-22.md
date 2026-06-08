---
title: Java 22
---

# Java 22

- Released: 2024-03-19
- [JDK 22 Project](https://openjdk.org/projects/jdk/22/)

## 核心总结

- FFM、未命名变量和多文件源码启动转正，Class-File API 和 Stream Gatherers 首次预览。

## 升级关注

- FFM API 转正，可逐步替代 JNI/JNA 场景。
- Class-File API、Stream Gatherers 仍为预览。

## 示例

### Foreign Function & Memory API 正式

```java
import java.lang.foreign.*;
import java.lang.invoke.MethodHandle;

try (Arena arena = Arena.ofConfined()) {
  MemorySegment cString = arena.allocateFrom("hello");
}
```

### Unnamed Variables & Patterns

```java
try (var _ = lock()) {
  // 只需要资源生命周期，不需要变量名
}
```

### 多文件源码直接运行

```bash
java Main.java
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 423] | 正式 | GC/Runtime | Region Pinning for G1 | G1 区域固定，降低 JNI 临界区导致的停顿。 |
| [JEP 447] | 预览 | 语言 | Statements before super(...) (Preview) | 构造函数 super 前语句预览。 |
| [JEP 454] | 正式 | Panama/向量/原生 | Foreign Function & Memory API | FFM API 转正。 |
| [JEP 456] | 正式 | 语言 | Unnamed Variables & Patterns | 未命名变量和模式转正。 |
| [JEP 457] | 预览 | 工具/平台 | Class-File API (Preview) | 标准 Class-File API 预览。 |
| [JEP 458] | 正式 | 工具/平台 | Launch Multi-File Source-Code Programs | java 直接启动多文件源码程序。 |
| [JEP 459] | 第二次预览 | 语言 | String Templates (Second Preview) | 字符串模板第二次预览。 |
| [JEP 460] | 第七次孵化 | Panama/向量/原生 | Vector API (Seventh Incubator) | Vector API 第七次孵化。 |
| [JEP 461] | 预览 | 库/API | Stream Gatherers (Preview) | Stream Gatherers 预览，允许自定义中间操作。 |
| [JEP 462] | 第二次预览 | 并发/Loom | Structured Concurrency (Second Preview) | 结构化并发第二次预览。 |
| [JEP 463] | 第二次预览 | 库/API | Implicitly Declared Classes and Instance Main Methods (Second Preview) | 隐式声明类和实例 main 第二次预览。 |
| [JEP 464] | 第二次预览 | 并发/Loom | Scoped Values (Second Preview) | Scoped Values 第二次预览。 |

[JEP 423]: https://openjdk.org/jeps/423
[JEP 447]: https://openjdk.org/jeps/447
[JEP 454]: https://openjdk.org/jeps/454
[JEP 456]: https://openjdk.org/jeps/456
[JEP 457]: https://openjdk.org/jeps/457
[JEP 458]: https://openjdk.org/jeps/458
[JEP 459]: https://openjdk.org/jeps/459
[JEP 460]: https://openjdk.org/jeps/460
[JEP 461]: https://openjdk.org/jeps/461
[JEP 462]: https://openjdk.org/jeps/462
[JEP 463]: https://openjdk.org/jeps/463
[JEP 464]: https://openjdk.org/jeps/464

## References

- [JDK 22 Project](https://openjdk.org/projects/jdk/22/)
- [Java 22 Release Notes](https://jdk.java.net/22/release-notes)
