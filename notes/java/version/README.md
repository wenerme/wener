---
title: Java 版本
---

# Java Release

- 自 Java 9
  - 每 6 个月一个版本
  - 每 2 年一个 LTS - 每 4 个版本
    - Java 11 - Java 17 隔了 3 年, 之后为每隔两年
- [Java JEP 与版本变化](./java-jep.md)
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

| version                    | major | release    | note |
| -------------------------- | ----- | ---------- | ---- |
| [Java 26](./java-26.md)    | 70    | 2026-03-17 |      |
| [Java 25](./java-25.md)    | 69    | 2025-09    | LTS  |
| [Java 24](./java-24.md)    | 68    | 2025-03    |      |
| [Java 23](./java-23.md)    | 67    | 2024-09-18 |      |
| [Java 22](./java-22.md)    | 66    | 2024-03    |      |
| [Java 21](./java-21.md)    | 65    | 2023-09    | LTS  |
| [Java 20](./java-20.md)    | 64    | 2023-03    |      |
| [Java 19](./java-19.md)    | 63    | 2022-09    |      |
| [Java 18](./java-18.md)    | 62    | 2022-03    |      |
| [Java 17](./java-17.md)    | 61    | 2021-09    | LTS  |
| [Java 16](./java-16.md)    | 60    | 2021-03    |      |
| [Java 15](./java-15.md)    | 59    | 2020-09    |      |
| [Java 14](./java-14.md)    | 58    | 2020-03    |      |
| [Java 13](./java-13.md)    | 57    | 2019-09    |      |
| [Java 12](./java-12.md)    | 56    | 2019-03    |      |
| [Java 11](./java-11.md)    | 55    | 2018-09    | LTS  |
| [Java 10](./java-10.md)    | 54    | 2018-03    |      |
| [Java 9](./java-9.md)      | 53    | 2017-09    |      |
| [Java 8](./java-8.md)      | 52    | 2014-03    | LTS  |
| [Java 7](./java-7.md)      | 51    | 2011-07    |      |
| [Java 6](./java-6.md)      | 50    | 2006-12    |      |
| [Java 5](./java-5.md)      | 49    | 2004-09    |      |
| Java 1.4                   | 48    | 2002-02    |      |
| Java 1.3                   | 47    | 2000-05    |      |
| Java 1.2                   | 46    | 1998-12    |      |
| Java 1.1                   |       | 1997-02    |      |
| Java 1.0                   |       | 1996-01    |      |

## Java 6

- [JSR-000270 JavaTM SE 6 Release Contents](https://jcp.org/aboutJava/communityprocess/maintenance/jsr270/index.html)
