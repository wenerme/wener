---
title: Java JEP 与版本变化
---

# Java JEP 与版本变化

> 资料来源以 OpenJDK JDK Project 页面和 JEP 页面为主。Java 5–7 主要按 JSR/项目整理；JDK 8 起按代表性 JEP 整理；JDK 10 起列出该版本项目页 Features 中的全部 JEP。

## JEP 状态说明

| 状态 | 含义 | 使用建议 |
| --- | --- | --- |
| 正式 | Delivered/Standard/无预览标记 | 可作为正式能力使用 |
| 预览 | Preview，可能多轮预览 | 需要 `--enable-preview`，API/语法可能变化 |
| 孵化 | Incubator，通常在 `jdk.incubator.*` 模块 | API 不稳定，适合试用和反馈 |
| 实验 | Experimental | 可能需要显式参数开启，不保证长期兼容 |
| 废弃 | Deprecated 或 for Removal | 迁移预警，不应在新代码依赖 |
| 移除/禁用 | Remove 或 Permanently Disable | 升级时必须确认依赖是否已消除 |
| 迁移预告 | Prepare/Warn 类 JEP | 表示未来限制会加强，应提前迁移 |

## 总览

| Java | Release | LTS | 核心变化 |
| --- | --- | --- | --- |
| [5](./java-5.md) | 2004-09-30 |  | J2SE 5.0 Tiger。泛型、注解、枚举、自动装箱、增强 for、可变参数、静态导入、JUC。 |
| [6](./java-6.md) | 2006-12-11 |  | Java SE 6 Mustang。JSR 223 脚本、JSR 199 Compiler API、JSR 269 注解处理、JDBC 4、JAX-WS/JAXB、监控工具增强。 |
| [7](./java-7.md) | 2011-07-28 |  | Java SE 7 Dolphin。Project Coin、NIO.2、Fork/Join、invokedynamic、try-with-resources、switch string、multi-catch。 |
| [8](./java-8.md) | 2014-03-18 | LTS | Lambda 与 Stream 时代开始。JEP 机制在 JDK 8 已覆盖大量平台工作，但 Java 8 的核心是 JSR 335 Lambda、JSR 310 Date Time、Nashorn、PermGen 移除和集合并行处理。 |
| [9](./java-9.md) | 2017-09-21 |  | 模块化 JDK 的大版本。核心是 JPMS、jlink、jshell、集合工厂、Flow、G1 默认、内部 API 封装和多版本 JAR。 |
| [10](./java-10.md) | 2018-03-20 |  | 半年节奏的第一个版本。语言层是 var，本身也完成 JDK 仓库、GC 接口、AppCDS 和版本号模型整理。 |
| [11](./java-11.md) | 2018-09-25 | LTS | Java 8 后第一个 LTS。HTTP Client 标准化，Java EE/CORBA 移除，Flight Recorder 开源，ZGC/Epsilon 进入实验。 |
| [12](./java-12.md) | 2019-03-19 |  | 小版本中引入 Switch Expressions 预览，默认 CDS 归档和 G1 改进，Shenandoah 首次实验进入。 |
| [13](./java-13.md) | 2019-09-17 |  | 继续预览 switch 和 text blocks，并增强 CDS、ZGC 和旧 Socket API 实现。 |
| [14](./java-14.md) | 2020-03-17 |  | Switch Expressions 转正，Records、instanceof 模式匹配、Text Blocks 继续预览，CMS 与 Pack200 移除。 |
| [15](./java-15.md) | 2020-09-15 |  | Text Blocks、ZGC、Shenandoah 转正，Nashorn/Solaris/SPARC 移除，Sealed Classes 首次预览。 |
| [16](./java-16.md) | 2021-03-16 |  | Records 和 instanceof 模式匹配转正，jpackage 转正，JDK 开发迁到 Git/GitHub，内部 API 默认强封装。 |
| [17](./java-17.md) | 2021-09-14 | LTS | LTS。Sealed Classes 转正，JDK 内部强封装正式推进，Security Manager/Applet/RMI Activation 进入移除阶段。 |
| [18](./java-18.md) | 2022-03-22 |  | UTF-8 成为默认字符集，简单 Web 服务器和 Javadoc 代码片段加入，Finalization 开始废弃。 |
| [19](./java-19.md) | 2022-09-20 |  | Loom/Panama 关键能力进入预览，虚拟线程首次预览，结构化并发首次孵化。 |
| [20](./java-20.md) | 2023-03-21 |  | 延续 Java 19 的预览和孵化能力，Scoped Values 首次孵化。 |
| [21](./java-21.md) | 2023-09-19 | LTS | LTS。虚拟线程、Record Patterns、switch 模式匹配转正，Sequenced Collections 加入，Generational ZGC 可用。 |
| [22](./java-22.md) | 2024-03-19 |  | FFM、未命名变量和多文件源码启动转正，Class-File API 和 Stream Gatherers 首次预览。 |
| [23](./java-23.md) | 2024-09-17 |  | Markdown Javadoc、分代 ZGC 默认进入，模块导入和原始类型模式预览，Unsafe 内存方法开始移除路线。 |
| [24](./java-24.md) | 2025-03-18 |  | Class-File API 和 Stream Gatherers 转正，Security Manager 永久禁用，虚拟线程同步 pinning 问题修复，AOT 启动链路开始落地。 |
| [25](./java-25.md) | 2025-09 | LTS | LTS。Scoped Values、模块导入、紧凑源文件、灵活构造函数体、KDF、紧凑对象头和分代 Shenandoah 转正。 |
| [26](./java-26.md) | 2026-03-17 |  | 非 LTS。HTTP/3、AOT 对象缓存、G1 吞吐优化、Applet API 移除，语言预览继续推进。 |

## Java 5

- Release: 2004-09-30
- 核心总结：J2SE 5.0 Tiger。泛型、注解、枚举、自动装箱、增强 for、可变参数、静态导入、JUC。

### 语言

- Generics：编译期类型安全，减少集合取值时的强制类型转换。
- Annotations：为语言、编译器、框架提供标准元数据机制。
- Enums：类型安全枚举，支持方法、字段和接口实现。
- Autoboxing/Unboxing：原始类型与包装类型自动转换。
- Varargs：可变参数方法。
- Enhanced for-loop：增强 for 循环。
- Static Import：静态导入。

### 核心库

- java.util.concurrent：Executor、Future、BlockingQueue、ConcurrentHashMap、Locks、Atomics 等并发基础设施。
- Scanner、Formatter、Queue、Deque 等集合与文本处理增强。
- Instrumentation API、Management API 增强，便于监控和工具集成。

### 总结

- Java 5 是现代 Java 的起点：泛型、注解、枚举、JUC 直接影响后续所有主流框架。

## Java 6

- Release: 2006-12-11
- 核心总结：Java SE 6 Mustang。JSR 223 脚本、JSR 199 Compiler API、JSR 269 注解处理、JDBC 4、JAX-WS/JAXB、监控工具增强。

### 语言

- 语言本身变化较少，主要是平台、工具和库完善。

### 核心库/规范

- JSR 223 Scripting：标准脚本引擎 API，默认集成 Rhino JavaScript。
- JSR 199 Compiler API：程序内调用 javac。
- JSR 269 Pluggable Annotation Processing：标准注解处理器 API，替代 apt 方向。
- JDBC 4.0：驱动自动加载、SQLException 层次增强、XML 支持。
- JAX-WS 2.0 / JAXB 2.0：Web Services 和 XML Binding 集成。

### 工具/运行时

- JConsole、VisualVM、诊断和监控能力增强。
- 同步、锁优化、启动和运行时性能改进。

### 总结

- Java 6 是企业应用的稳定平台版本，重点不是新语法，而是工具链、Web Services、编译器 API 和性能。

## Java 7

- Release: 2011-07-28
- 核心总结：Java SE 7 Dolphin。Project Coin、NIO.2、Fork/Join、invokedynamic、try-with-resources、switch string、multi-catch。

### 语言 / Project Coin

- switch on String。
- try-with-resources 与 AutoCloseable。
- Diamond operator。
- multi-catch 与更精确的 rethrow。
- 数字字面量下划线和二进制字面量。

### 核心库/虚拟机

- NIO.2：Path、Files、WatchService、异步文件通道、文件属性 API。
- Fork/Join Framework：RecursiveTask/RecursiveAction 与 ForkJoinPool。
- invokedynamic：动态语言支持，也是后续 Lambda 实现的重要基础。
- Objects、try-with-resources 相关 AutoCloseable 等基础 API。

### 总结

- Java 7 是 Java 8 前的铺垫版本：Project Coin 改善语法，NIO.2 和 Fork/Join 补齐库能力，invokedynamic 为 JVM 语言生态打开空间。

## Java 8

- Release: 2014-03-18
- LTS
- 核心总结：Lambda 与 Stream 时代开始。JEP 机制在 JDK 8 已覆盖大量平台工作，但 Java 8 的核心是 JSR 335 Lambda、JSR 310 Date Time、Nashorn、PermGen 移除和集合并行处理。
- OpenJDK: https://openjdk.org/projects/jdk8/features

### 升级关注

- 关注 Lambda/Stream 对调试栈和性能模型的影响。
- PermGen 移除后，旧的 PermGen 参数需要迁移到 Metaspace 参数。

### JEPs

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

## Java 9

- Release: 2017-09-21
- 核心总结：模块化 JDK 的大版本。核心是 JPMS、jlink、jshell、集合工厂、Flow、G1 默认、内部 API 封装和多版本 JAR。
- OpenJDK: https://openjdk.org/projects/jdk9/

### 升级关注

- 模块系统会暴露 split package、非法反射访问和内部 API 依赖问题。
- 使用 jlink 可显著缩小运行时镜像，但需要先梳理模块依赖。

### JEPs

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

## Java 10

- Release: 2018-03-20
- 核心总结：半年节奏的第一个版本。语言层是 var，本身也完成 JDK 仓库、GC 接口、AppCDS 和版本号模型整理。
- OpenJDK: https://openjdk.org/projects/jdk/10/

### 升级关注

- var 只适合局部变量，公共 API 中不要用它表达设计意图。
- javah 已移除，JNI 头文件生成使用 javac -h。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 286] | 正式 | 语言 | Local-Variable Type Inference | 局部变量类型推断 var，只影响局部变量声明。 |
| [JEP 296] | 正式 | 库/API | Consolidate the JDK Forest into a Single Repository | 多个 Mercurial forest 合并为单仓库，降低开发复杂度。 |
| [JEP 304] | 正式 | GC/Runtime | Garbage-Collector Interface | 抽象 GC 接口，让 HotSpot 更容易接入和剥离 GC 实现。 |
| [JEP 307] | 正式 | GC/Runtime | Parallel Full GC for G1 | G1 Full GC 并行化，降低最坏停顿。 |
| [JEP 310] | 正式 | GC/Runtime | Application Class-Data Sharing | AppCDS 支持应用类共享归档，改善启动和内存。 |
| [JEP 312] | 正式 | GC/Runtime | Thread-Local Handshakes | 可只让单个线程执行 VM 回调，减少全局 safepoint 需求。 |
| [JEP 313] | 移除/禁用 | 库/API | Remove the Native-Header Generation Tool (javah) | 移除 javah，改用 javac -h。 |
| [JEP 314] | 正式 | 库/API | Additional Unicode Language-Tag Extensions | 支持更多 Unicode locale 扩展。 |
| [JEP 316] | 正式 | 库/API | Heap Allocation on Alternative Memory Devices | 允许把堆分配到 NV-DIMM 等替代内存设备。 |
| [JEP 317] | 实验 | 库/API | Experimental Java-Based JIT Compiler | 实验性 Graal Java JIT 编译器。 |
| [JEP 319] | 正式 | 安全/加密 | Root Certificates | OpenJDK 提供默认根证书集合。 |
| [JEP 322] | 正式 | 库/API | Time-Based Release Versioning | 时间驱动发布版本号模型。 |

[JEP 286]: https://openjdk.org/jeps/286
[JEP 296]: https://openjdk.org/jeps/296
[JEP 304]: https://openjdk.org/jeps/304
[JEP 307]: https://openjdk.org/jeps/307
[JEP 310]: https://openjdk.org/jeps/310
[JEP 312]: https://openjdk.org/jeps/312
[JEP 313]: https://openjdk.org/jeps/313
[JEP 314]: https://openjdk.org/jeps/314
[JEP 316]: https://openjdk.org/jeps/316
[JEP 317]: https://openjdk.org/jeps/317
[JEP 319]: https://openjdk.org/jeps/319
[JEP 322]: https://openjdk.org/jeps/322

## Java 11

- Release: 2018-09-25
- LTS
- 核心总结：Java 8 后第一个 LTS。HTTP Client 标准化，Java EE/CORBA 移除，Flight Recorder 开源，ZGC/Epsilon 进入实验。
- OpenJDK: https://openjdk.org/projects/jdk/11/

### 升级关注

- Java EE/CORBA 模块移除是从 Java 8 升级的最大断点之一，需要显式引入 JAXB/JAX-WS 等依赖。
- HTTP Client、JFR、TLS 1.3 是长期可用能力。

### JEPs

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

## Java 12

- Release: 2019-03-19
- 核心总结：小版本中引入 Switch Expressions 预览，默认 CDS 归档和 G1 改进，Shenandoah 首次实验进入。
- OpenJDK: https://openjdk.org/projects/jdk/12/

### 升级关注

- Switch Expressions 仍是预览，生产代码需谨慎依赖。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 189] | 实验 | GC/Runtime | Shenandoah: A Low-Pause-Time Garbage Collector (Experimental) | 实验性 Shenandoah 低停顿 GC。 |
| [JEP 230] | 正式 | 工具/平台 | Microbenchmark Suite | JDK 源码内置 JMH 微基准套件。 |
| [JEP 325] | 预览 | 语言 | Switch Expressions (Preview) | switch 可作为表达式并返回值，预览。 |
| [JEP 334] | 正式 | 库/API | JVM Constants API | 标准化描述 class-file 和运行时常量的 API。 |
| [JEP 340] | 正式 | 工具/平台 | One AArch64 Port, Not Two | 保留一个 AArch64 port，移除重复实现。 |
| [JEP 341] | 正式 | GC/Runtime | Default CDS Archives | 默认生成 CDS 归档，改善启动时间。 |
| [JEP 344] | 正式 | GC/Runtime | Abortable Mixed Collections for G1 | G1 mixed collection 可中止，降低超预算停顿。 |
| [JEP 346] | 正式 | GC/Runtime | Promptly Return Unused Committed Memory from G1 | G1 更快把未用 committed 内存还给 OS。 |

[JEP 189]: https://openjdk.org/jeps/189
[JEP 230]: https://openjdk.org/jeps/230
[JEP 325]: https://openjdk.org/jeps/325
[JEP 334]: https://openjdk.org/jeps/334
[JEP 340]: https://openjdk.org/jeps/340
[JEP 341]: https://openjdk.org/jeps/341
[JEP 344]: https://openjdk.org/jeps/344
[JEP 346]: https://openjdk.org/jeps/346

## Java 13

- Release: 2019-09-17
- 核心总结：继续预览 switch 和 text blocks，并增强 CDS、ZGC 和旧 Socket API 实现。
- OpenJDK: https://openjdk.org/projects/jdk/13/

### 升级关注

- Text Blocks 仍是预览，语法最终在 Java 15 转正。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 350] | 正式 | GC/Runtime | Dynamic CDS Archives | 应用退出时可动态归档类数据，简化 AppCDS 使用。 |
| [JEP 351] | 正式 | GC/Runtime | ZGC: Uncommit Unused Memory | ZGC 可把未用内存归还给 OS。 |
| [JEP 353] | 正式 | 库/API | Reimplement the Legacy Socket API | 重写旧 Socket API 实现，降低维护成本并适配新线程模型。 |
| [JEP 354] | 预览 | 语言 | Switch Expressions (Preview) | switch 表达式继续预览。 |
| [JEP 355] | 预览 | 语言 | Text Blocks (Preview) | 文本块预览，简化多行字符串。 |

[JEP 350]: https://openjdk.org/jeps/350
[JEP 351]: https://openjdk.org/jeps/351
[JEP 353]: https://openjdk.org/jeps/353
[JEP 354]: https://openjdk.org/jeps/354
[JEP 355]: https://openjdk.org/jeps/355

## Java 14

- Release: 2020-03-17
- 核心总结：Switch Expressions 转正，Records、instanceof 模式匹配、Text Blocks 继续预览，CMS 与 Pack200 移除。
- OpenJDK: https://openjdk.org/projects/jdk/14/

### 升级关注

- CMS 和 Pack200 已移除；依赖 CMS 参数或 Pack200 工具的构建/运行脚本会失败。
- Helpful NPE 对排障很有价值。

### JEPs

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

## Java 15

- Release: 2020-09-15
- 核心总结：Text Blocks、ZGC、Shenandoah 转正，Nashorn/Solaris/SPARC 移除，Sealed Classes 首次预览。
- OpenJDK: https://openjdk.org/projects/jdk/15/

### 升级关注

- Nashorn 已移除，脚本场景迁移到 GraalJS 或其他引擎。
- ZGC 和 Shenandoah 转正，但仍需按业务延迟/吞吐目标压测。

### JEPs

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

## Java 16

- Release: 2021-03-16
- 核心总结：Records 和 instanceof 模式匹配转正，jpackage 转正，JDK 开发迁到 Git/GitHub，内部 API 默认强封装。
- OpenJDK: https://openjdk.org/projects/jdk/16/

### 升级关注

- Records、instanceof pattern 已可正式使用。
- 默认强封装内部 API，非法反射访问需要迁移或加显式 --add-opens。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 338] | 孵化 | Panama/向量/原生 | Vector API (Incubator) | Vector API 首次孵化，提供可移植 SIMD 表达。 |
| [JEP 347] | 正式 | 库/API | Enable C++14 Language Features | JDK native 代码允许使用 C++14。 |
| [JEP 357] | 正式 | 工具/平台 | Migrate from Mercurial to Git | JDK 源码从 Mercurial 迁到 Git。 |
| [JEP 369] | 正式 | 工具/平台 | Migrate to GitHub | JDK 开发迁移到 GitHub。 |
| [JEP 376] | 正式 | GC/Runtime | ZGC: Concurrent Thread-Stack Processing | ZGC 并发处理线程栈，进一步降低停顿。 |
| [JEP 380] | 正式 | Panama/向量/原生 | Unix-Domain Socket Channels | NIO 支持 Unix domain socket。 |
| [JEP 386] | 正式 | 工具/平台 | Alpine Linux Port | 支持 Alpine Linux musl port。 |
| [JEP 387] | 正式 | GC/Runtime | Elastic Metaspace | Metaspace 更弹性地归还内存。 |
| [JEP 388] | 正式 | 工具/平台 | Windows/AArch64 Port | 支持 Windows AArch64。 |
| [JEP 389] | 孵化 | Panama/向量/原生 | Foreign Linker API (Incubator) | 外部函数链接 API 孵化。 |
| [JEP 390] | 正式 | 库/API | Warnings for Value-Based Classes | 对 value-based class 的不当同步等用法发出警告。 |
| [JEP 392] | 正式 | 工具/平台 | Packaging Tool | jpackage 转正。 |
| [JEP 393] | 第三次孵化 | Panama/向量/原生 | Foreign-Memory Access API (Third Incubator) | 外部内存访问 API 第三次孵化。 |
| [JEP 394] | 正式 | 语言 | Pattern Matching for instanceof | instanceof 模式匹配转正。 |
| [JEP 395] | 正式 | 语言 | Records | Records 转正。 |
| [JEP 396] | 正式 | 库/API | Strongly Encapsulate JDK Internals by Default | 默认强封装 JDK 内部 API，sun.misc.Unsafe 等关键 API 例外。 |
| [JEP 397] | 第二次预览 | 语言 | Sealed Classes (Second Preview) | 密封类第二次预览。 |

[JEP 338]: https://openjdk.org/jeps/338
[JEP 347]: https://openjdk.org/jeps/347
[JEP 357]: https://openjdk.org/jeps/357
[JEP 369]: https://openjdk.org/jeps/369
[JEP 376]: https://openjdk.org/jeps/376
[JEP 380]: https://openjdk.org/jeps/380
[JEP 386]: https://openjdk.org/jeps/386
[JEP 387]: https://openjdk.org/jeps/387
[JEP 388]: https://openjdk.org/jeps/388
[JEP 389]: https://openjdk.org/jeps/389
[JEP 390]: https://openjdk.org/jeps/390
[JEP 392]: https://openjdk.org/jeps/392
[JEP 393]: https://openjdk.org/jeps/393
[JEP 394]: https://openjdk.org/jeps/394
[JEP 395]: https://openjdk.org/jeps/395
[JEP 396]: https://openjdk.org/jeps/396
[JEP 397]: https://openjdk.org/jeps/397

## Java 17

- Release: 2021-09-14
- LTS
- 核心总结：LTS。Sealed Classes 转正，JDK 内部强封装正式推进，Security Manager/Applet/RMI Activation 进入移除阶段。
- OpenJDK: https://openjdk.org/projects/jdk/17/

### 升级关注

- LTS 升级重点是内部 API 强封装、Security Manager 废弃、RMI Activation/AOT/Graal JIT 移除。
- Sealed Classes、增强 PRNG、macOS/AArch64 是长期稳定能力。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 306] | 正式 | 库/API | Restore Always-Strict Floating-Point Semantics | 恢复始终严格浮点语义。 |
| [JEP 356] | 正式 | 库/API | Enhanced Pseudo-Random Number Generators | 增强伪随机数生成器 API。 |
| [JEP 382] | 正式 | 工具/平台 | New macOS Rendering Pipeline | macOS 使用 Metal 渲染管线。 |
| [JEP 391] | 正式 | 工具/平台 | macOS/AArch64 Port | 支持 macOS Apple Silicon。 |
| [JEP 398] | 废弃 | 库/API | Deprecate the Applet API for Removal | 废弃 Applet API，准备移除。 |
| [JEP 403] | 正式 | 库/API | Strongly Encapsulate JDK Internals | 强封装 JDK 内部 API。 |
| [JEP 406] | 预览 | 语言 | Pattern Matching for switch (Preview) | switch 模式匹配预览。 |
| [JEP 407] | 移除/禁用 | 库/API | Remove RMI Activation | 移除 RMI Activation。 |
| [JEP 409] | 正式 | 语言 | Sealed Classes | 密封类转正。 |
| [JEP 410] | 移除/禁用 | GC/Runtime | Remove the Experimental AOT and JIT Compiler | 移除实验 AOT 和 Graal JIT 编译器。 |
| [JEP 411] | 废弃 | 安全/加密 | Deprecate the Security Manager for Removal | 废弃 Security Manager，准备移除。 |
| [JEP 412] | 孵化 | Panama/向量/原生 | Foreign Function & Memory API (Incubator) | 外部函数和内存 API 孵化。 |
| [JEP 414] | 第二次孵化 | Panama/向量/原生 | Vector API (Second Incubator) | Vector API 第二次孵化。 |
| [JEP 415] | 正式 | 安全/加密 | Context-Specific Deserialization Filters | 上下文相关反序列化过滤器。 |

[JEP 306]: https://openjdk.org/jeps/306
[JEP 356]: https://openjdk.org/jeps/356
[JEP 382]: https://openjdk.org/jeps/382
[JEP 391]: https://openjdk.org/jeps/391
[JEP 398]: https://openjdk.org/jeps/398
[JEP 403]: https://openjdk.org/jeps/403
[JEP 406]: https://openjdk.org/jeps/406
[JEP 407]: https://openjdk.org/jeps/407
[JEP 409]: https://openjdk.org/jeps/409
[JEP 410]: https://openjdk.org/jeps/410
[JEP 411]: https://openjdk.org/jeps/411
[JEP 412]: https://openjdk.org/jeps/412
[JEP 414]: https://openjdk.org/jeps/414
[JEP 415]: https://openjdk.org/jeps/415

## Java 18

- Release: 2022-03-22
- 核心总结：UTF-8 成为默认字符集，简单 Web 服务器和 Javadoc 代码片段加入，Finalization 开始废弃。
- OpenJDK: https://openjdk.org/projects/jdk/18/

### 升级关注

- 默认 UTF-8 可能改变依赖系统默认编码的旧程序行为。
- Finalization 已进入移除路线，新代码避免依赖 finalize。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 400] | 正式 | 库/API | UTF-8 by Default | 标准 Java API 默认字符集改为 UTF-8。 |
| [JEP 408] | 正式 | 工具/平台 | Simple Web Server | jdk.httpserver 提供命令行简单静态 Web 服务器。 |
| [JEP 413] | 正式 | 库/API | Code Snippets in Java API Documentation | Javadoc 支持更好的代码片段。 |
| [JEP 416] | 正式 | 库/API | Reimplement Core Reflection with Method Handles | 用 Method Handles 重实现核心反射，降低维护成本。 |
| [JEP 417] | 第三次孵化 | Panama/向量/原生 | Vector API (Third Incubator) | Vector API 第三次孵化。 |
| [JEP 418] | 正式 | 库/API | Internet-Address Resolution SPI | 互联网地址解析 SPI。 |
| [JEP 419] | 第二次孵化 | Panama/向量/原生 | Foreign Function & Memory API (Second Incubator) | FFM API 第二次孵化。 |
| [JEP 420] | 第二次预览 | 语言 | Pattern Matching for switch (Second Preview) | switch 模式匹配第二次预览。 |
| [JEP 421] | 废弃 | 库/API | Deprecate Finalization for Removal | 废弃 Finalization，准备移除。 |

[JEP 400]: https://openjdk.org/jeps/400
[JEP 408]: https://openjdk.org/jeps/408
[JEP 413]: https://openjdk.org/jeps/413
[JEP 416]: https://openjdk.org/jeps/416
[JEP 417]: https://openjdk.org/jeps/417
[JEP 418]: https://openjdk.org/jeps/418
[JEP 419]: https://openjdk.org/jeps/419
[JEP 420]: https://openjdk.org/jeps/420
[JEP 421]: https://openjdk.org/jeps/421

## Java 19

- Release: 2022-09-20
- 核心总结：Loom/Panama 关键能力进入预览，虚拟线程首次预览，结构化并发首次孵化。
- OpenJDK: https://openjdk.org/projects/jdk/19/

### 升级关注

- Virtual Threads/Structured Concurrency/FFM 仍是预览或孵化。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 405] | 预览 | 语言 | Record Patterns (Preview) | Record 模式预览，支持解构记录。 |
| [JEP 422] | 正式 | 工具/平台 | Linux/RISC-V Port | 支持 Linux RISC-V。 |
| [JEP 424] | 预览 | Panama/向量/原生 | Foreign Function & Memory API (Preview) | FFM API 进入预览。 |
| [JEP 425] | 预览 | 并发/Loom | Virtual Threads (Preview) | 虚拟线程首次预览。 |
| [JEP 426] | 第四次孵化 | Panama/向量/原生 | Vector API (Fourth Incubator) | Vector API 第四次孵化。 |
| [JEP 427] | 第三次预览 | 语言 | Pattern Matching for switch (Third Preview) | switch 模式匹配第三次预览。 |
| [JEP 428] | 孵化 | 并发/Loom | Structured Concurrency (Incubator) | 结构化并发首次孵化。 |

[JEP 405]: https://openjdk.org/jeps/405
[JEP 422]: https://openjdk.org/jeps/422
[JEP 424]: https://openjdk.org/jeps/424
[JEP 425]: https://openjdk.org/jeps/425
[JEP 426]: https://openjdk.org/jeps/426
[JEP 427]: https://openjdk.org/jeps/427
[JEP 428]: https://openjdk.org/jeps/428

## Java 20

- Release: 2023-03-21
- 核心总结：延续 Java 19 的预览和孵化能力，Scoped Values 首次孵化。
- OpenJDK: https://openjdk.org/projects/jdk/20/

### 升级关注

- 主要是预览/孵化迭代，适合跟踪 Loom/Panama API 变化。

### JEPs

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

## Java 21

- Release: 2023-09-19
- LTS
- 核心总结：LTS。虚拟线程、Record Patterns、switch 模式匹配转正，Sequenced Collections 加入，Generational ZGC 可用。
- OpenJDK: https://openjdk.org/projects/jdk/21/

### 升级关注

- LTS。Virtual Threads 已转正，但 pinning、ThreadLocal、连接池容量等仍需重新评估。
- String Templates 后续路线变化，避免过早固化。

### JEPs

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

## Java 22

- Release: 2024-03-19
- 核心总结：FFM、未命名变量和多文件源码启动转正，Class-File API 和 Stream Gatherers 首次预览。
- OpenJDK: https://openjdk.org/projects/jdk/22/

### 升级关注

- FFM API 转正，可逐步替代 JNI/JNA 场景。
- Class-File API、Stream Gatherers 仍为预览。

### JEPs

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

## Java 23

- Release: 2024-09-17
- 核心总结：Markdown Javadoc、分代 ZGC 默认进入，模块导入和原始类型模式预览，Unsafe 内存方法开始移除路线。
- OpenJDK: https://openjdk.org/projects/jdk/23/

### 升级关注

- Unsafe 内存访问方法进入移除路线，应迁移到 VarHandle/FFM。

### JEPs

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

## Java 24

- Release: 2025-03-18
- 核心总结：Class-File API 和 Stream Gatherers 转正，Security Manager 永久禁用，虚拟线程同步 pinning 问题修复，AOT 启动链路开始落地。
- OpenJDK: https://openjdk.org/projects/jdk/24/

### 升级关注

- Security Manager 永久禁用；依赖 Security Manager 沙箱模型的系统必须调整。
- 虚拟线程 synchronized pinning 问题改善，适合重新评估虚拟线程阻塞场景。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 404] | 实验 | GC/Runtime | Generational Shenandoah (Experimental) | 分代 Shenandoah 实验。 |
| [JEP 450] | 实验 | GC/Runtime | Compact Object Headers (Experimental) | 紧凑对象头实验，目标降低对象内存开销。 |
| [JEP 472] | 迁移预告 | Panama/向量/原生 | Prepare to Restrict the Use of JNI | 准备限制 JNI 使用，推动显式授权和 FFM 迁移。 |
| [JEP 475] | 正式 | GC/Runtime | Late Barrier Expansion for G1 | G1 屏障后期展开，改善编译和性能。 |
| [JEP 478] | 预览 | Panama/向量/原生 | Key Derivation Function API (Preview) | KDF API 预览。 |
| [JEP 479] | 移除/禁用 | 工具/平台 | Remove the Windows 32-bit x86 Port | 移除 Windows 32-bit x86 port。 |
| [JEP 483] | 正式 | 库/API | Ahead-of-Time Class Loading & Linking | AOT 类加载和链接，改善启动。 |
| [JEP 484] | 正式 | 工具/平台 | Class-File API | Class-File API 转正。 |
| [JEP 485] | 正式 | 库/API | Stream Gatherers | Stream Gatherers 转正。 |
| [JEP 486] | 移除/禁用 | 安全/加密 | Permanently Disable the Security Manager | 永久禁用 Security Manager。 |
| [JEP 487] | 第四次预览 | 并发/Loom | Scoped Values (Fourth Preview) | Scoped Values 第四次预览。 |
| [JEP 488] | 第二次预览 | 语言 | Primitive Types in Patterns, instanceof, and switch (Second Preview) | 原始类型模式第二次预览。 |
| [JEP 489] | 第九次孵化 | Panama/向量/原生 | Vector API (Ninth Incubator) | Vector API 第九次孵化。 |
| [JEP 490] | 移除/禁用 | GC/Runtime | ZGC: Remove the Non-Generational Mode | ZGC 移除非分代模式。 |
| [JEP 491] | 正式 | 并发/Loom | Synchronize Virtual Threads without Pinning | 虚拟线程在 synchronized 中不再 pin carrier thread。 |
| [JEP 492] | 第三次预览 | 语言 | Flexible Constructor Bodies (Third Preview) | 灵活构造函数体第三次预览。 |
| [JEP 493] | 正式 | 工具/平台 | Linking Run-Time Images without JMODs | 不依赖 JMOD 链接运行时镜像。 |
| [JEP 494] | 第二次预览 | 语言 | Module Import Declarations (Second Preview) | 模块导入声明第二次预览。 |
| [JEP 495] | 第四次预览 | 库/API | Simple Source Files and Instance Main Methods (Fourth Preview) | 简单源文件和实例 main 第四次预览。 |
| [JEP 496] | 正式 | 安全/加密 | Quantum-Resistant Module-Lattice-Based Key Encapsulation Mechanism | ML-KEM 后量子密钥封装。 |
| [JEP 497] | 正式 | 安全/加密 | Quantum-Resistant Module-Lattice-Based Digital Signature Algorithm | ML-DSA 后量子数字签名。 |
| [JEP 498] | 迁移预告 | Panama/向量/原生 | Warn upon Use of Memory-Access Methods in sun.misc.Unsafe | 使用 Unsafe 内存访问方法时发出警告。 |
| [JEP 499] | 第四次预览 | 并发/Loom | Structured Concurrency (Fourth Preview) | 结构化并发第四次预览。 |
| [JEP 501] | 废弃 | 库/API | Deprecate the 32-bit x86 Port for Removal | 废弃 32-bit x86 port。 |

[JEP 404]: https://openjdk.org/jeps/404
[JEP 450]: https://openjdk.org/jeps/450
[JEP 472]: https://openjdk.org/jeps/472
[JEP 475]: https://openjdk.org/jeps/475
[JEP 478]: https://openjdk.org/jeps/478
[JEP 479]: https://openjdk.org/jeps/479
[JEP 483]: https://openjdk.org/jeps/483
[JEP 484]: https://openjdk.org/jeps/484
[JEP 485]: https://openjdk.org/jeps/485
[JEP 486]: https://openjdk.org/jeps/486
[JEP 487]: https://openjdk.org/jeps/487
[JEP 488]: https://openjdk.org/jeps/488
[JEP 489]: https://openjdk.org/jeps/489
[JEP 490]: https://openjdk.org/jeps/490
[JEP 491]: https://openjdk.org/jeps/491
[JEP 492]: https://openjdk.org/jeps/492
[JEP 493]: https://openjdk.org/jeps/493
[JEP 494]: https://openjdk.org/jeps/494
[JEP 495]: https://openjdk.org/jeps/495
[JEP 496]: https://openjdk.org/jeps/496
[JEP 497]: https://openjdk.org/jeps/497
[JEP 498]: https://openjdk.org/jeps/498
[JEP 499]: https://openjdk.org/jeps/499
[JEP 501]: https://openjdk.org/jeps/501

## Java 25

- Release: 2025-09
- LTS
- 核心总结：LTS。Scoped Values、模块导入、紧凑源文件、灵活构造函数体、KDF、紧凑对象头和分代 Shenandoah 转正。
- OpenJDK: https://openjdk.org/projects/jdk/25/

### 升级关注

- LTS。Scoped Values、紧凑源文件、模块导入、KDF、紧凑对象头等转正，但 Structured Concurrency 仍是预览。

### JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 470] | 预览 | 安全/加密 | PEM Encodings of Cryptographic Objects (Preview) | PEM 编码加密对象 API 预览。 |
| [JEP 502] | 预览 | 库/API | Stable Values (Preview) | Stable Values 预览，提供一次初始化后稳定读取的值容器。 |
| [JEP 503] | 移除/禁用 | 库/API | Remove the 32-bit x86 Port | 移除 32-bit x86 port。 |
| [JEP 505] | 第五次预览 | 并发/Loom | Structured Concurrency (Fifth Preview) | 结构化并发第五次预览。 |
| [JEP 506] | 正式 | 并发/Loom | Scoped Values | Scoped Values 转正。 |
| [JEP 507] | 第三次预览 | 语言 | Primitive Types in Patterns, instanceof, and switch (Third Preview) | 原始类型模式第三次预览。 |
| [JEP 508] | 第十次孵化 | Panama/向量/原生 | Vector API (Tenth Incubator) | Vector API 第十次孵化。 |
| [JEP 509] | 实验 | 工具/平台 | JFR CPU-Time Profiling (Experimental) | JFR CPU 时间 profiling 实验。 |
| [JEP 510] | 正式 | Panama/向量/原生 | Key Derivation Function API | KDF API 转正。 |
| [JEP 511] | 正式 | 语言 | Module Import Declarations | 模块导入声明转正。 |
| [JEP 512] | 正式 | 语言 | Compact Source Files and Instance Main Methods | 紧凑源文件和实例 main 转正。 |
| [JEP 513] | 正式 | 语言 | Flexible Constructor Bodies | 灵活构造函数体转正。 |
| [JEP 514] | 正式 | 库/API | Ahead-of-Time Command-Line Ergonomics | AOT 命令行体验改进。 |
| [JEP 515] | 正式 | 库/API | Ahead-of-Time Method Profiling | AOT 方法 profiling。 |
| [JEP 518] | 正式 | 工具/平台 | JFR Cooperative Sampling | JFR 协作式采样。 |
| [JEP 519] | 正式 | GC/Runtime | Compact Object Headers | 紧凑对象头转正。 |
| [JEP 520] | 正式 | 工具/平台 | JFR Method Timing & Tracing | JFR 方法计时和追踪。 |
| [JEP 521] | 正式 | GC/Runtime | Generational Shenandoah | 分代 Shenandoah 转正。 |

[JEP 470]: https://openjdk.org/jeps/470
[JEP 502]: https://openjdk.org/jeps/502
[JEP 503]: https://openjdk.org/jeps/503
[JEP 505]: https://openjdk.org/jeps/505
[JEP 506]: https://openjdk.org/jeps/506
[JEP 507]: https://openjdk.org/jeps/507
[JEP 508]: https://openjdk.org/jeps/508
[JEP 509]: https://openjdk.org/jeps/509
[JEP 510]: https://openjdk.org/jeps/510
[JEP 511]: https://openjdk.org/jeps/511
[JEP 512]: https://openjdk.org/jeps/512
[JEP 513]: https://openjdk.org/jeps/513
[JEP 514]: https://openjdk.org/jeps/514
[JEP 515]: https://openjdk.org/jeps/515
[JEP 518]: https://openjdk.org/jeps/518
[JEP 519]: https://openjdk.org/jeps/519
[JEP 520]: https://openjdk.org/jeps/520
[JEP 521]: https://openjdk.org/jeps/521

## Java 26

- Release: 2026-03-17
- 核心总结：非 LTS。HTTP/3、AOT 对象缓存、G1 吞吐优化、Applet API 移除，语言预览继续推进。
- OpenJDK: https://openjdk.org/projects/jdk/26/

### 升级关注

- Applet API 已移除；仍引用 `java.applet` / `javax.swing.JApplet` 的旧代码需要清理。
- `final` 字段语义开始进入收紧路线，反射/Unsafe/序列化框架对 final 字段的写入能力需要关注后续兼容性。
- HTTP Client 引入 HTTP/3 支持，可评估对高延迟/移动网络场景的收益。
- Structured Concurrency、Lazy Constants、Primitive Types in Patterns 仍是预览；Vector API 仍是孵化。

### JEPs

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

## 参考

- [JEP Index](https://openjdk.org/jeps/0)
- [OpenJDK JDK Projects](https://openjdk.org/projects/jdk/)
- [Java version history](https://en.wikipedia.org/wiki/Java_version_history)
