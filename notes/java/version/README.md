---
title: Java 版本
---

# Java Release

- 自 Java 9
  - 每 6 个月一个版本
  - 每 2 年一个 LTS - 每 4 个版本
    - Java 11 - Java 17 隔了 3 年, 之后为每隔两年
- 参考
  - [Java version history](https://en.wikipedia.org/wiki/Java_version_history)
- 未来特性
  - [Project Valhalla](https://openjdk.java.net/projects/valhalla/)
    - 值类型
  - [Project Panama](https://openjdk.java.net/projects/panama/)
    - 增强 Native 交互/跨语言交互
  - [Project Loom](https://openjdk.java.net/projects/loom/)
    - 虚拟线程
  - [JEP 386](https://openjdk.java.net/jeps/386) Alpine Linux Port
    - 16 开始移除 musl 包，通过该 JEP 支持 musl
    - [adoptium/containers#1](https://github.com/adoptium/containers/issues/1)
    - [Project Portola](https://openjdk.java.net/projects/portola)

```bash
# 检测 class 文件版本
javap -verbose MyClass | grep "major"
```

| version  | major | release    | note |
| -------- | ----- | ---------- | ---- |
| Java 25  | 69    | 2025-09    | LTS  |
| Java 24  | 68    | 2025-03    |      |
| Java 23  | 67    | 2024-09-18 |      |
| Java 22  | 66    | 2024-03    |      |
| Java 21  | 65    | 2023-09    | LTS  |
| Java 20  | 64    | 2023-03    |      |
| Java 19  | 63    | 2022-09    |      |
| Java 18  | 62    | 2022-03    |      |
| Java 17  | 61    | 2021-09    | LTS  |
| Java 16  | 60    | 2021-03    |      |
| Java 15  | 59    | 2020-09    |      |
| Java 14  | 58    | 2020-03    |      |
| Java 13  | 57    | 2019-09    |      |
| Java 12  | 56    | 2019-03    |      |
| Java 11  | 55    | 2018-09    | LTS  |
| Java 10  | 54    | 2018-03    |      |
| Java 9   | 53    | 2017-09    |      |
| Java 8   | 52    | 2014-03    | LTS  |
| Java 7   | 51    | 2011-07    |      |
| Java 6   | 50    | 2006-12    |      |
| Java 5   | 49    | 2004-09    |      |
| Java 1.4 | 48    | 2002-02    |      |
| Java 1.3 | 47    | 2000-05    |      |
| Java 1.2 | 46    | 1998-12    |      |
| Java 1.1 |       | 1997-02    |      |
| Java 1.0 |       | 1996-01    |      |

## Java 23

- 455: Primitive Types in Patterns, instanceof, and switch (Preview)
- 466: Class-File API (Second Preview)
- 467: Markdown Documentation Comments
- 469: Vector API (Eighth Incubator)
- 473: Stream Gatherers (Second Preview)
- 471: Deprecate the Memory-Access Methods in sun.misc.Unsafe for Removal
- 474: ZGC: Generational Mode by Default
- 476: Module Import Declarations (Preview)
- 477: Implicitly Declared Classes and Instance Main Methods (Third Preview)
- 480: Structured Concurrency (Third Preview)
- 481: Scoped Values (Third Preview)
- 482: Flexible Constructor Bodies (Second Preview)
- 参考
  - https://openjdk.org/projects/jdk/23/

## Java 6

- [JSR-000270 JavaTM SE 6 Release Contents](https://jcp.org/aboutJava/communityprocess/maintenance/jsr270/index.html)
