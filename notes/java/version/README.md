---
id: version
title: Java版本
---

# Java Release

- 自 Java 9
  - 每 6 个月一个版本
  - 每 3 年一个 LTS - 每隔 6 个版本
- 参考
  - [Java version history](https://en.wikipedia.org/wiki/Java_version_history)
- 未来特性
  - [Project Valhalla](https://openjdk.java.net/projects/valhalla/)
    - 值类型
  - [Project Panama](https://openjdk.java.net/projects/panama/)
    - 增强 Native 交互/跨语言交互
  - [Project Loom](https://openjdk.java.net/projects/loom/)
    - 虚拟线程

```bash
# 检测 class 文件版本
javap -verbose MyClass | grep "major"
```

| Java | major | release |
| ---- | ----- | ------- | --- |
| 1.0  |       | 1996-01 |
| 1.1  |       | 1997-02 |
| 1.2  | 46    | 1998-12 |
| 1.3  | 47    | 2000-05 |
| 1.4  | 48    | 2002-02 |
| 5    | 49    | 2004-09 |
| 6    | 50    | 2006-12 |
| 7    | 51    | 2011-07 |
| 8    | 52    | 2014-03 | LTS |
| 9    | 53    | 2017-09 |
| 10   | 54    | 2018-03 |
| 11   | 55    | 2018-09 | LTS |
| 12   | 56    | 2019-03 |
| 13   | 57    | 2019-09 |
| 14   | 58    | 2020-03 |
| 15   | 59    | 2020-09 |
| 16   | 60    | 2021-03 |
| 17   | 61    | 2021-09 | LTS |
| 18   | 62    | 2022-03 |     |
