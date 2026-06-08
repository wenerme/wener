---
title: Java 11
---

# Java 11

- Released: 2018-09-25
- LTS
- [JDK 11 Project](https://openjdk.org/projects/jdk/11/)

## 核心总结

- Java 8 后第一个 LTS。HTTP Client 标准化，Java EE/CORBA 移除，Flight Recorder 开源，ZGC/Epsilon 进入实验。

## 升级关注

- Java EE/CORBA 模块移除是从 Java 8 升级的最大断点之一，需要显式引入 JAXB/JAX-WS 等依赖。
- HTTP Client、JFR、TLS 1.3 是长期可用能力。

## 示例

### HTTP Client

```java
import java.net.URI;
import java.net.http.*;

var client = HttpClient.newHttpClient();
var request = HttpRequest.newBuilder(URI.create("https://example.com")).build();
var response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.statusCode());
```

### 直接运行单文件源码

```bash
java Hello.java
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 181] | 正式 | 库/API | Nest-Based Access Control | 支持 nestmate 访问控制，嵌套类可直接访问彼此私有成员。 |
| [JEP 309] | 正式 | 工具/平台 | Dynamic Class-File Constants | CONSTANT_Dynamic，支持动态计算类文件常量。 |
| [JEP 315] | 正式 | 库/API | Improve Aarch64 Intrinsics | 优化 AArch64 字符串、数组和数学 intrinsics。 |
| [JEP 318] | 正式 | GC/Runtime | Epsilon: A No-Op Garbage Collector | 不回收内存的 GC，适合测试、短生命周期任务和性能基线。 |
| [JEP 320] | 移除/禁用 | 库/API | Remove the Java EE and CORBA Modules | 移除 Java EE 与 CORBA 模块和相关工具。 |
| [JEP 321] | 正式 | 库/API | HTTP Client (Standard) | java.net.http 标准 HTTP/2 和 WebSocket 客户端。 |
| [JEP 323] | 正式 | 语言 | Local-Variable Syntax for Lambda Parameters | Lambda 参数允许使用 var，便于添加注解。 |
| [JEP 324] | 正式 | 安全/加密 | Key Agreement with Curve25519 and Curve448 | 支持 X25519/X448 密钥协商。 |
| [JEP 327] | 正式 | 库/API | Unicode 10 | 升级 Unicode 10。 |
| [JEP 328] | 正式 | 工具/平台 | Flight Recorder | JFR 开源并进入 OpenJDK。 |
| [JEP 329] | 正式 | 安全/加密 | ChaCha20 and Poly1305 Cryptographic Algorithms | 支持 ChaCha20-Poly1305 加密算法。 |
| [JEP 330] | 正式 | 工具/平台 | Launch Single-File Source-Code Programs | java 可直接运行单文件源码。 |
| [JEP 331] | 正式 | 库/API | Low-Overhead Heap Profiling | 低开销堆分配采样分析。 |
| [JEP 332] | 正式 | 安全/加密 | Transport Layer Security (TLS) 1.3 | 支持 TLS 1.3。 |
| [JEP 333] | 实验 | GC/Runtime | ZGC: A Scalable Low-Latency Garbage Collector (Experimental) | 实验性 ZGC，目标大堆低延迟。 |
| [JEP 335] | 废弃 | 工具/平台 | Deprecate the Nashorn JavaScript Engine | 废弃 Nashorn JS 引擎。 |
| [JEP 336] | 废弃 | 工具/平台 | Deprecate the Pack200 Tools and API | 废弃 Pack200 工具和 API。 |

[JEP 181]: https://openjdk.org/jeps/181
[JEP 309]: https://openjdk.org/jeps/309
[JEP 315]: https://openjdk.org/jeps/315
[JEP 318]: https://openjdk.org/jeps/318
[JEP 320]: https://openjdk.org/jeps/320
[JEP 321]: https://openjdk.org/jeps/321
[JEP 323]: https://openjdk.org/jeps/323
[JEP 324]: https://openjdk.org/jeps/324
[JEP 327]: https://openjdk.org/jeps/327
[JEP 328]: https://openjdk.org/jeps/328
[JEP 329]: https://openjdk.org/jeps/329
[JEP 330]: https://openjdk.org/jeps/330
[JEP 331]: https://openjdk.org/jeps/331
[JEP 332]: https://openjdk.org/jeps/332
[JEP 333]: https://openjdk.org/jeps/333
[JEP 335]: https://openjdk.org/jeps/335
[JEP 336]: https://openjdk.org/jeps/336

## References

- [JDK 11 Project](https://openjdk.org/projects/jdk/11/)
- [Java 11 Release Notes](https://jdk.java.net/11/release-notes)
