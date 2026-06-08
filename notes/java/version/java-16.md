---
title: Java 16
---

# Java 16

- Released: 2021-03-16
- [JDK 16 Project](https://openjdk.org/projects/jdk/16/)

## 核心总结

- Records 和 instanceof 模式匹配转正，jpackage 转正，JDK 开发迁到 Git/GitHub，内部 API 默认强封装。

## 升级关注

- Records、instanceof pattern 已可正式使用。
- 默认强封装内部 API，非法反射访问需要迁移或加显式 --add-opens。

## 示例

### Records / instanceof Pattern 正式

```java
record Point(int x, int y) {}

Object value = new Point(1, 2);
if (value instanceof Point p) {
  System.out.println(p.x() + p.y());
}
```

### jpackage

```bash
jpackage --name demo --input target --main-jar app.jar --main-class com.example.Main
```

## JEPs

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

## References

- [JDK 16 Project](https://openjdk.org/projects/jdk/16/)
- [Java 16 Release Notes](https://jdk.java.net/16/release-notes)
