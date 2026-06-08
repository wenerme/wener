---
title: Java 14
---

# Java 14

- Released: 2020-03-17
- [JDK 14 Project](https://openjdk.org/projects/jdk/14/)

## 核心总结

- Switch Expressions 转正，Records、instanceof 模式匹配、Text Blocks 继续预览，CMS 与 Pack200 移除。

## 升级关注

- CMS 和 Pack200 已移除；依赖 CMS 参数或 Pack200 工具的构建/运行脚本会失败。
- Helpful NPE 对排障很有价值。

## 示例

### Records Preview / instanceof Pattern Preview

```java
// javac --enable-preview --release 14 Demo.java
record User(String name, int age) {}

Object value = new User("wener", 18);
if (value instanceof User user) {
  System.out.println(user.name());
}
```

### Helpful NullPointerExceptions

```bash
java -XX:+ShowCodeDetailsInExceptionMessages Demo
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 305] | 预览 | 语言 | Pattern Matching for instanceof (Preview) | instanceof 模式匹配预览，匹配后直接绑定变量。 |
| [JEP 343] | 孵化 | 工具/平台 | Packaging Tool (Incubator) | jpackage 孵化，用于生成平台安装包。 |
| [JEP 345] | 正式 | GC/Runtime | NUMA-Aware Memory Allocation for G1 | G1 支持 NUMA 感知内存分配。 |
| [JEP 349] | 正式 | 工具/平台 | JFR Event Streaming | JFR 支持事件流式消费。 |
| [JEP 352] | 正式 | 库/API | Non-Volatile Mapped Byte Buffers | 支持非易失内存映射字节缓冲。 |
| [JEP 358] | 正式 | 库/API | Helpful NullPointerExceptions | NPE 显示更具体的空值来源。 |
| [JEP 359] | 预览 | 语言 | Records (Preview) | Record 数据载体类预览。 |
| [JEP 361] | 正式 | 语言 | Switch Expressions (Standard) | switch 表达式正式。 |
| [JEP 362] | 废弃 | 工具/平台 | Deprecate the Solaris and SPARC Ports | 废弃 Solaris 和 SPARC port。 |
| [JEP 363] | 移除/禁用 | GC/Runtime | Remove the Concurrent Mark Sweep (CMS) Garbage Collector | 移除 CMS GC。 |
| [JEP 364] | 正式 | GC/Runtime | ZGC on macOS | ZGC 支持 macOS。 |
| [JEP 365] | 正式 | GC/Runtime | ZGC on Windows | ZGC 支持 Windows。 |
| [JEP 366] | 废弃 | 库/API | Deprecate the ParallelScavenge + SerialOld GC Combination | 废弃 ParallelScavenge 加 SerialOld 组合。 |
| [JEP 367] | 移除/禁用 | 工具/平台 | Remove the Pack200 Tools and API | 移除 Pack200。 |
| [JEP 368] | 第二次预览 | 语言 | Text Blocks (Second Preview) | 文本块第二次预览。 |
| [JEP 370] | 孵化 | Panama/向量/原生 | Foreign-Memory Access API (Incubator) | 外部内存访问 API 孵化，是 Panama 早期能力。 |

[JEP 305]: https://openjdk.org/jeps/305
[JEP 343]: https://openjdk.org/jeps/343
[JEP 345]: https://openjdk.org/jeps/345
[JEP 349]: https://openjdk.org/jeps/349
[JEP 352]: https://openjdk.org/jeps/352
[JEP 358]: https://openjdk.org/jeps/358
[JEP 359]: https://openjdk.org/jeps/359
[JEP 361]: https://openjdk.org/jeps/361
[JEP 362]: https://openjdk.org/jeps/362
[JEP 363]: https://openjdk.org/jeps/363
[JEP 364]: https://openjdk.org/jeps/364
[JEP 365]: https://openjdk.org/jeps/365
[JEP 366]: https://openjdk.org/jeps/366
[JEP 367]: https://openjdk.org/jeps/367
[JEP 368]: https://openjdk.org/jeps/368
[JEP 370]: https://openjdk.org/jeps/370

## References

- [JDK 14 Project](https://openjdk.org/projects/jdk/14/)
- [Java 14 Release Notes](https://jdk.java.net/14/release-notes)
