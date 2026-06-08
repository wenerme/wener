---
title: Java 17
---

# Java 17

- Released: 2021-09-14
- LTS
- [JDK 17 Project](https://openjdk.org/projects/jdk/17/)

## 核心总结

- LTS。Sealed Classes 转正，JDK 内部强封装正式推进，Security Manager/Applet/RMI Activation 进入移除阶段。

## 升级关注

- LTS 升级重点是内部 API 强封装、Security Manager 废弃、RMI Activation/AOT/Graal JIT 移除。
- Sealed Classes、增强 PRNG、macOS/AArch64 是长期稳定能力。

## 示例

### Sealed Classes 正式

```java
sealed interface Result permits Ok, Err {}
record Ok(String value) implements Result {}
record Err(Throwable error) implements Result {}
```

### switch Pattern Preview

```java
// javac --enable-preview --release 17 Demo.java
static String render(Object value) {
  return switch (value) {
    case String s -> s;
    case Integer i -> "int=" + i;
    default -> "unknown";
  };
}
```

## JEPs

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

## References

- [JDK 17 Project](https://openjdk.org/projects/jdk/17/)
- [Java 17 Release Notes](https://jdk.java.net/17/release-notes)
