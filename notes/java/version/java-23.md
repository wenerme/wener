---
title: Java 23
---

# Java 23

- Released: 2024-09-17
- [JDK 23 Project](https://openjdk.org/projects/jdk/23/)

## 核心总结

- Markdown Javadoc、分代 ZGC 默认进入，模块导入和原始类型模式预览，Unsafe 内存方法开始移除路线。

## 升级关注

- Unsafe 内存访问方法进入移除路线，应迁移到 VarHandle/FFM。

## 示例

### Markdown Documentation Comments

```java
/// # User Service
///
/// - 支持 Markdown 列表
/// - 支持 `inline code`
public class UserService {}
```

### Module Import Declarations Preview

```java
// javac --enable-preview --release 23 Demo.java
import module java.base;
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 455] | 预览 | 语言 | Primitive Types in Patterns, instanceof, and switch (Preview) | 模式匹配支持原始类型预览。 |
| [JEP 466] | 第二次预览 | 工具/平台 | Class-File API (Second Preview) | Class-File API 第二次预览。 |
| [JEP 467] | 正式 | 工具/平台 | Markdown Documentation Comments | Javadoc 注释支持 Markdown。 |
| [JEP 469] | 第八次孵化 | Panama/向量/原生 | Vector API (Eighth Incubator) | Vector API 第八次孵化。 |
| [JEP 473] | 第二次预览 | 库/API | Stream Gatherers (Second Preview) | Stream Gatherers 第二次预览。 |
| [JEP 471] | 废弃 | Panama/向量/原生 | Deprecate the Memory-Access Methods in sun.misc.Unsafe for Removal | 废弃 sun.misc.Unsafe 内存访问方法。 |
| [JEP 474] | 正式 | GC/Runtime | ZGC: Generational Mode by Default | ZGC 默认使用分代模式。 |
| [JEP 476] | 预览 | 语言 | Module Import Declarations (Preview) | 模块导入声明预览。 |
| [JEP 477] | 第三次预览 | 库/API | Implicitly Declared Classes and Instance Main Methods (Third Preview) | 隐式声明类和实例 main 第三次预览。 |
| [JEP 480] | 第三次预览 | 并发/Loom | Structured Concurrency (Third Preview) | 结构化并发第三次预览。 |
| [JEP 481] | 第三次预览 | 并发/Loom | Scoped Values (Third Preview) | Scoped Values 第三次预览。 |
| [JEP 482] | 第二次预览 | 语言 | Flexible Constructor Bodies (Second Preview) | 灵活构造函数体第二次预览。 |

[JEP 455]: https://openjdk.org/jeps/455
[JEP 466]: https://openjdk.org/jeps/466
[JEP 467]: https://openjdk.org/jeps/467
[JEP 469]: https://openjdk.org/jeps/469
[JEP 473]: https://openjdk.org/jeps/473
[JEP 471]: https://openjdk.org/jeps/471
[JEP 474]: https://openjdk.org/jeps/474
[JEP 476]: https://openjdk.org/jeps/476
[JEP 477]: https://openjdk.org/jeps/477
[JEP 480]: https://openjdk.org/jeps/480
[JEP 481]: https://openjdk.org/jeps/481
[JEP 482]: https://openjdk.org/jeps/482

## References

- [JDK 23 Project](https://openjdk.org/projects/jdk/23/)
- [Java 23 Release Notes](https://jdk.java.net/23/release-notes)
