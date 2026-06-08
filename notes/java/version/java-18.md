---
title: Java 18
---

# Java 18

- Released: 2022-03-22
- [JDK 18 Project](https://openjdk.org/projects/jdk/18/)

## 核心总结

- UTF-8 成为默认字符集，简单 Web 服务器和 Javadoc 代码片段加入，Finalization 开始废弃。

## 升级关注

- 默认 UTF-8 可能改变依赖系统默认编码的旧程序行为。
- Finalization 已进入移除路线，新代码避免依赖 finalize。

## 示例

### Simple Web Server

```bash
jwebserver -p 8080 -d ./public
```

### UTF-8 by Default

```java
// 不再依赖操作系统默认编码；默认 charset 是 UTF-8。
System.out.println(java.nio.charset.Charset.defaultCharset());
```

## JEPs

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

## References

- [JDK 18 Project](https://openjdk.org/projects/jdk/18/)
- [Java 18 Release Notes](https://jdk.java.net/18/release-notes)
