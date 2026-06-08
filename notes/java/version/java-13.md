---
title: Java 13
---

# Java 13

- Released: 2019-09-17
- [JDK 13 Project](https://openjdk.org/projects/jdk/13/)

## 核心总结

- 继续预览 switch 和 text blocks，并增强 CDS、ZGC 和旧 Socket API 实现。

## 升级关注

- Text Blocks 仍是预览，语法最终在 Java 15 转正。

## 示例

### Text Blocks Preview

```java
// javac --enable-preview --release 13 Demo.java
String json = """
  {
    "name": "wener",
    "lang": "java"
  }
  """;
```

### Dynamic CDS Archives

```bash
java -XX:ArchiveClassesAtExit=app.jsa -cp app.jar com.example.Main
java -XX:SharedArchiveFile=app.jsa -cp app.jar com.example.Main
```

## JEPs

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

## References

- [JDK 13 Project](https://openjdk.org/projects/jdk/13/)
- [Java 13 Release Notes](https://jdk.java.net/13/release-notes)
