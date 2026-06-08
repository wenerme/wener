---
title: Java 15
---

# Java 15

- Released: 2020-09-15
- [JDK 15 Project](https://openjdk.org/projects/jdk/15/)

## 核心总结

- Text Blocks、ZGC、Shenandoah 转正，Nashorn/Solaris/SPARC 移除，Sealed Classes 首次预览。

## 升级关注

- Nashorn 已移除，脚本场景迁移到 GraalJS 或其他引擎。
- ZGC 和 Shenandoah 转正，但仍需按业务延迟/吞吐目标压测。

## 示例

### Text Blocks 正式

```java
String sql = """
  select id, name
  from users
  where status = 'active'
  """;
```

### Sealed Classes Preview

```java
// javac --enable-preview --release 15 Shape.java
sealed interface Shape permits Circle, Rect {}
final class Circle implements Shape {}
final class Rect implements Shape {}
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 339] | 正式 | 安全/加密 | Edwards-Curve Digital Signature Algorithm (EdDSA) | 支持 EdDSA 数字签名。 |
| [JEP 360] | 预览 | 语言 | Sealed Classes (Preview) | 密封类预览，限制可继承层次。 |
| [JEP 371] | 正式 | 库/API | Hidden Classes | 隐藏类，支持框架生成不可发现类。 |
| [JEP 372] | 移除/禁用 | 工具/平台 | Remove the Nashorn JavaScript Engine | 移除 Nashorn JS 引擎。 |
| [JEP 373] | 正式 | 库/API | Reimplement the Legacy DatagramSocket API | 重写旧 DatagramSocket API。 |
| [JEP 374] | 废弃 | GC/Runtime | Disable and Deprecate Biased Locking | 默认禁用并废弃偏向锁。 |
| [JEP 375] | 第二次预览 | 语言 | Pattern Matching for instanceof (Second Preview) | instanceof 模式匹配第二次预览。 |
| [JEP 377] | 正式 | GC/Runtime | ZGC: A Scalable Low-Latency Garbage Collector | ZGC 转正。 |
| [JEP 378] | 正式 | 语言 | Text Blocks | 文本块转正。 |
| [JEP 379] | 正式 | GC/Runtime | Shenandoah: A Low-Pause-Time Garbage Collector | Shenandoah 转正。 |
| [JEP 381] | 移除/禁用 | 工具/平台 | Remove the Solaris and SPARC Ports | 移除 Solaris 和 SPARC port。 |
| [JEP 383] | 第二次孵化 | Panama/向量/原生 | Foreign-Memory Access API (Second Incubator) | 外部内存访问 API 第二次孵化。 |
| [JEP 384] | 第二次预览 | 语言 | Records (Second Preview) | Records 第二次预览。 |
| [JEP 385] | 废弃 | 库/API | Deprecate RMI Activation for Removal | 废弃 RMI Activation。 |

[JEP 339]: https://openjdk.org/jeps/339
[JEP 360]: https://openjdk.org/jeps/360
[JEP 371]: https://openjdk.org/jeps/371
[JEP 372]: https://openjdk.org/jeps/372
[JEP 373]: https://openjdk.org/jeps/373
[JEP 374]: https://openjdk.org/jeps/374
[JEP 375]: https://openjdk.org/jeps/375
[JEP 377]: https://openjdk.org/jeps/377
[JEP 378]: https://openjdk.org/jeps/378
[JEP 379]: https://openjdk.org/jeps/379
[JEP 381]: https://openjdk.org/jeps/381
[JEP 383]: https://openjdk.org/jeps/383
[JEP 384]: https://openjdk.org/jeps/384
[JEP 385]: https://openjdk.org/jeps/385

## References

- [JDK 15 Project](https://openjdk.org/projects/jdk/15/)
- [Java 15 Release Notes](https://jdk.java.net/15/release-notes)
