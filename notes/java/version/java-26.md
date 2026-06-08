---
title: Java 26
---

# Java 26

- Released: 2026-03-17
- [JDK 26 Project](https://openjdk.org/projects/jdk/26/)

## 核心总结

- Java 26 是非 LTS 版本，重点在语言预览继续推进、HTTP/3、AOT 对象缓存、G1 吞吐优化，以及 Applet API 最终移除。

## 升级关注

- Applet API 已移除；仍引用 `java.applet` / `javax.swing.JApplet` 的旧代码需要清理。
- `final` 字段语义开始进入收紧路线，反射/Unsafe/序列化框架对 final 字段的写入能力需要关注后续兼容性。
- HTTP Client 引入 HTTP/3 支持，可评估对高延迟/移动网络场景的收益。
- Structured Concurrency、Lazy Constants、Primitive Types in Patterns 仍是预览；Vector API 仍是孵化。

## 示例

### HTTP/3 for HTTP Client

```java
import java.net.URI;
import java.net.http.*;

var client = HttpClient.newBuilder()
  .version(HttpClient.Version.HTTP_3)
  .build();
var request = HttpRequest.newBuilder(URI.create("https://example.com/")).build();
var response = client.send(request, HttpResponse.BodyHandlers.discarding());
```

### Primitive Types in Patterns Preview

```java
// javac --enable-preview --release 26 Demo.java
static String render(Object value) {
  return switch (value) {
    case int i -> "int " + i;
    case long l -> "long " + l;
    default -> "other";
  };
}
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 500] | 迁移预告 | 语言 | Prepare to Make Final Mean Final | 准备强化 `final` 字段语义，减少深反射等机制对 final 字段的随意修改。 |
| [JEP 504] | 移除/禁用 | 库/API | Remove the Applet API | 移除 Applet API，完成长期废弃路线。 |
| [JEP 516] | 正式 | GC/Runtime | Ahead-of-Time Object Caching with Any GC | AOT 对象缓存扩展到任意 GC，改善启动与预热。 |
| [JEP 517] | 正式 | 库/API | HTTP/3 for the HTTP Client API | `java.net.http` HTTP Client 支持 HTTP/3。 |
| [JEP 522] | 正式 | GC/Runtime | G1 GC: Improve Throughput by Reducing Synchronization | 通过减少同步开销提升 G1 吞吐。 |
| [JEP 524] | 第二次预览 | 安全/加密 | PEM Encodings of Cryptographic Objects (Second Preview) | PEM 编码加密对象 API 第二次预览。 |
| [JEP 525] | 第六次预览 | 并发/Loom | Structured Concurrency (Sixth Preview) | 结构化并发第六次预览。 |
| [JEP 526] | 第二次预览 | 语言 | Lazy Constants (Second Preview) | 懒常量第二次预览，用于延迟计算并稳定发布常量值。 |
| [JEP 529] | 第十一次孵化 | Panama/向量/原生 | Vector API (Eleventh Incubator) | Vector API 第十一次孵化。 |
| [JEP 530] | 第四次预览 | 语言 | Primitive Types in Patterns, instanceof, and switch (Fourth Preview) | 原始类型模式、`instanceof`、`switch` 第四次预览。 |

[JEP 500]: https://openjdk.org/jeps/500
[JEP 504]: https://openjdk.org/jeps/504
[JEP 516]: https://openjdk.org/jeps/516
[JEP 517]: https://openjdk.org/jeps/517
[JEP 522]: https://openjdk.org/jeps/522
[JEP 524]: https://openjdk.org/jeps/524
[JEP 525]: https://openjdk.org/jeps/525
[JEP 526]: https://openjdk.org/jeps/526
[JEP 529]: https://openjdk.org/jeps/529
[JEP 530]: https://openjdk.org/jeps/530

## References

- [JDK 26 Project](https://openjdk.org/projects/jdk/26/)
- [Java 26 Release Notes](https://jdk.java.net/26/release-notes)
