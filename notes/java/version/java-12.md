---
title: Java 12
---

# Java 12

- Released: 2019-03-19
- [JDK 12 Project](https://openjdk.org/projects/jdk/12/)

## 核心总结

- 小版本中引入 Switch Expressions 预览，默认 CDS 归档和 G1 改进，Shenandoah 首次实验进入。

## 升级关注

- Switch Expressions 仍是预览，生产代码需谨慎依赖。

## 示例

### Switch Expressions Preview

```java
// javac --enable-preview --release 12 Demo.java
// java --enable-preview Demo
var type = switch (day) {
  case MONDAY, FRIDAY, SUNDAY -> "busy";
  case TUESDAY -> "normal";
  default -> "other";
};
```

### JMH 微基准套件方向

```java
// JDK 自身引入 microbenchmark suite；业务项目通常直接用 org.openjdk.jmh:jmh-core。
```

## JEPs

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

## References

- [JDK 12 Project](https://openjdk.org/projects/jdk/12/)
- [Java 12 Release Notes](https://jdk.java.net/12/release-notes)
