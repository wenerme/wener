---
title: Java 8
---

# Java 8

- Released: 2014-03-18
- LTS
- [JDK 8 Project](https://openjdk.org/projects/jdk8/features)

## 核心总结

- Lambda 与 Stream 时代开始。JEP 机制在 JDK 8 已覆盖大量平台工作，但 Java 8 的核心是 JSR 335 Lambda、JSR 310 Date Time、Nashorn、PermGen 移除和集合并行处理。

## 升级关注

- 关注 Lambda/Stream 对调试栈和性能模型的影响。
- PermGen 移除后，旧的 PermGen 参数需要迁移到 Metaspace 参数。

## 示例

### Lambda / Stream / Optional

```java
import java.util.*;
import java.util.stream.*;

List<String> names = Arrays.asList("alice", "bob", "amy");
List<String> result = names.stream()
  .filter(v -> v.startsWith("a"))
  .map(String::toUpperCase)
  .collect(Collectors.toList());

Optional<String> first = result.stream().findFirst();
```

### java.time

```java
import java.time.*;

LocalDate today = LocalDate.now();
ZonedDateTime nextRun = today.plusDays(1).atStartOfDay(ZoneId.systemDefault());
```

### CompletableFuture

```java
import java.util.concurrent.*;

CompletableFuture.supplyAsync(() -> "hello")
  .thenApply(String::toUpperCase)
  .thenAccept(System.out::println);
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 101] | 正式 | 库/API | Generalized Target-Type Inference | 增强泛型目标类型推断，让方法调用和菱形语法更自然。 |
| [JEP 104] | 正式 | 库/API | Annotations on Java Types | 支持类型使用位置注解，是 Checker Framework 等静态分析的基础。 |
| [JEP 107] | 正式 | 库/API | Bulk Data Operations for Collections | 集合批量数据操作，支撑 Stream 风格处理。 |
| [JEP 109] | 正式 | 语言 | Enhance Core Libraries with Lambda | 核心库适配 Lambda，例如集合、Map、并发工具等 API 增强。 |
| [JEP 118] | 正式 | 库/API | Access to Parameter Names at Runtime | 可在运行时读取方法参数名，需编译时保留参数元数据。 |
| [JEP 120] | 正式 | 库/API | Repeating Annotations | 允许同一种注解在同一位置重复出现。 |
| [JEP 122] | 移除/禁用 | 库/API | Remove the Permanent Generation | 移除 PermGen，改用 Metaspace。 |
| [JEP 126] | 正式 | 语言 | Lambda Expressions & Virtual Extension Methods | Lambda 表达式和接口默认方法，是 Java 8 最核心语言变化。 |
| [JEP 135] | 正式 | 库/API | Base64 Encoding & Decoding | 标准库内置 Base64 编解码。 |
| [JEP 150] | 正式 | 库/API | Date & Time API | 引入 java.time，替代 Date、Calendar 的主要使用场景。 |
| [JEP 155] | 正式 | 库/API | Concurrency Updates | CompletableFuture、StampedLock、并发集合等增强。 |
| [JEP 174] | 正式 | 工具/平台 | Nashorn JavaScript Engine | 引入 Nashorn JS 引擎，后续 Java 15 移除。 |
| [JEP 180] | 正式 | 库/API | Handle Frequent HashMap Collisions with Balanced Trees | HashMap 碰撞严重时桶内转红黑树，降低退化风险。 |

[JEP 101]: https://openjdk.org/jeps/101
[JEP 104]: https://openjdk.org/jeps/104
[JEP 107]: https://openjdk.org/jeps/107
[JEP 109]: https://openjdk.org/jeps/109
[JEP 118]: https://openjdk.org/jeps/118
[JEP 120]: https://openjdk.org/jeps/120
[JEP 122]: https://openjdk.org/jeps/122
[JEP 126]: https://openjdk.org/jeps/126
[JEP 135]: https://openjdk.org/jeps/135
[JEP 150]: https://openjdk.org/jeps/150
[JEP 155]: https://openjdk.org/jeps/155
[JEP 174]: https://openjdk.org/jeps/174
[JEP 180]: https://openjdk.org/jeps/180

## References

- [JDK 8 Project](https://openjdk.org/projects/jdk8/features)
