---
title: Java 24
---

# Java 24

- Released: 2025-03-18
- [JDK 24 Project](https://openjdk.org/projects/jdk/24/)

## 核心总结

- Class-File API 和 Stream Gatherers 转正，Security Manager 永久禁用，虚拟线程同步 pinning 问题修复，AOT 启动链路开始落地。

## 升级关注

- Security Manager 永久禁用；依赖 Security Manager 沙箱模型的系统必须调整。
- 虚拟线程 synchronized pinning 问题改善，适合重新评估虚拟线程阻塞场景。

## 示例

### Stream Gatherers 正式

```java
// Gatherers 提供标准和自定义中间操作扩展点。
var windows = java.util.stream.Stream.of(1, 2, 3, 4)
  .gather(java.util.stream.Gatherers.windowFixed(2))
  .toList();
```

### Simple Source Files Preview

```java
// javac --enable-preview --release 24 Hello.java
void main() {
  IO.println("hello");
}
```

## JEPs

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

## References

- [JDK 24 Project](https://openjdk.org/projects/jdk/24/)
- [Java 24 Release Notes](https://jdk.java.net/24/release-notes)
