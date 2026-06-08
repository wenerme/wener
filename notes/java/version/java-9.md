---
title: Java 9
---

# Java 9

- Released: 2017-09-21
- [JDK 9 Project](https://openjdk.org/projects/jdk9/)

## 核心总结

- 模块化 JDK 的大版本。核心是 JPMS、jlink、jshell、集合工厂、Flow、G1 默认、内部 API 封装和多版本 JAR。

## 升级关注

- 模块系统会暴露 split package、非法反射访问和内部 API 依赖问题。
- 使用 jlink 可显著缩小运行时镜像，但需要先梳理模块依赖。

## 示例

### module-info.java

```java title="module-info.java"
module com.example.app {
  requires java.net.http;
  exports com.example.app;
}
```

### 集合工厂、多版本编译、jlink

```java
var names = java.util.List.of("a", "b", "c");
var map = java.util.Map.of("k", "v");
```

```bash
javac --release 8 Hello.java
jlink --add-modules com.example.app --output runtime-image
jshell
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 102] | 正式 | 库/API | Process API Updates | 增强 Process API，可获取 PID、父子进程和进程信息。 |
| [JEP 110] | 正式 | 库/API | HTTP 2 Client | 孵化 HTTP/2 与 WebSocket 客户端，后续 Java 11 标准化。 |
| [JEP 158] | 正式 | 库/API | Unified JVM Logging | 统一 JVM 日志，使用 -Xlog。 |
| [JEP 193] | 正式 | 库/API | Variable Handles | VarHandle 提供比 Unsafe 更规范的变量和内存访问原语。 |
| [JEP 200] | 正式 | 库/API | The Modular JDK | JDK 自身模块化。 |
| [JEP 220] | 正式 | 库/API | Modular Run-Time Images | 新的模块化运行时镜像布局，取消传统 rt.jar。 |
| [JEP 222] | 正式 | 库/API | jshell: The Java Shell | Java REPL 工具。 |
| [JEP 223] | 正式 | 库/API | New Version-String Scheme | 新的版本字符串方案。 |
| [JEP 238] | 正式 | 库/API | Multi-Release JAR Files | 一个 JAR 内可放多个 Java 版本实现。 |
| [JEP 247] | 正式 | 库/API | Compile for Older Platform Versions | javac --release，用目标平台 API 编译，替代 source/target/bootclasspath 组合。 |
| [JEP 248] | 正式 | GC/Runtime | Make G1 the Default Garbage Collector | G1 成为默认 GC。 |
| [JEP 254] | 正式 | 库/API | Compact Strings | String 内部用 byte 数组加编码标记，降低 Latin-1 文本内存占用。 |
| [JEP 260] | 正式 | 库/API | Encapsulate Most Internal APIs | 封装大部分 JDK 内部 API。 |
| [JEP 261] | 正式 | 库/API | Module System | JPMS 模块系统。 |
| [JEP 266] | 正式 | 库/API | More Concurrency Updates | Flow Reactive Streams 接口、CompletableFuture 等增强。 |
| [JEP 269] | 正式 | 库/API | Convenience Factory Methods for Collections | List.of、Set.of、Map.of 等不可变集合工厂。 |
| [JEP 282] | 正式 | 工具/平台 | jlink: The Java Linker | 按模块裁剪生成定制运行时镜像。 |
| [JEP 290] | 正式 | 库/API | Filter Incoming Serialization Data | 反序列化过滤器，降低反序列化攻击面。 |

[JEP 102]: https://openjdk.org/jeps/102
[JEP 110]: https://openjdk.org/jeps/110
[JEP 158]: https://openjdk.org/jeps/158
[JEP 193]: https://openjdk.org/jeps/193
[JEP 200]: https://openjdk.org/jeps/200
[JEP 220]: https://openjdk.org/jeps/220
[JEP 222]: https://openjdk.org/jeps/222
[JEP 223]: https://openjdk.org/jeps/223
[JEP 238]: https://openjdk.org/jeps/238
[JEP 247]: https://openjdk.org/jeps/247
[JEP 248]: https://openjdk.org/jeps/248
[JEP 254]: https://openjdk.org/jeps/254
[JEP 260]: https://openjdk.org/jeps/260
[JEP 261]: https://openjdk.org/jeps/261
[JEP 266]: https://openjdk.org/jeps/266
[JEP 269]: https://openjdk.org/jeps/269
[JEP 282]: https://openjdk.org/jeps/282
[JEP 290]: https://openjdk.org/jeps/290

## References

- [JDK 9 Project](https://openjdk.org/projects/jdk9/)
