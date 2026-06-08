---
title: Java 7
---

# Java 7

- Released: 2011-07-28
- Codename: Dolphin

## 核心总结

- Java SE 7 Dolphin。Project Coin、NIO.2、Fork/Join、invokedynamic、try-with-resources、switch string、multi-catch。

## 语言 / Project Coin

- switch on String。
- try-with-resources 与 AutoCloseable。
- Diamond operator。
- multi-catch 与更精确的 rethrow。
- 数字字面量下划线和二进制字面量。

## 核心库/虚拟机

- NIO.2：Path、Files、WatchService、异步文件通道、文件属性 API。
- Fork/Join Framework：RecursiveTask/RecursiveAction 与 ForkJoinPool。
- invokedynamic：动态语言支持，也是后续 Lambda 实现的重要基础。
- Objects、try-with-resources 相关 AutoCloseable 等基础 API。

## 总结

- Java 7 是 Java 8 前的铺垫版本：Project Coin 改善语法，NIO.2 和 Fork/Join 补齐库能力，invokedynamic 为 JVM 语言生态打开空间。

## 示例

### try-with-resources、multi-catch、switch string

```java
java.nio.file.Path path = java.nio.file.Paths.get("app.log");
try (java.io.BufferedReader in = java.nio.file.Files.newBufferedReader(path)) {
  switch (in.readLine()) {
    case "start":
      System.out.println("started");
      break;
    default:
      System.out.println("unknown");
  }
} catch (java.io.IOException | IllegalArgumentException e) {
  e.printStackTrace();
}
```

### NIO.2 与 Fork/Join

```java
java.nio.file.Path path = java.nio.file.Paths.get("app.log");
long size = java.nio.file.Files.size(path);

java.util.concurrent.ForkJoinPool pool = new java.util.concurrent.ForkJoinPool();
```

## References

- [JDK 7 Features](https://openjdk.org/projects/jdk7/features/)
- [Project Coin](https://openjdk.org/projects/coin/)
- [JSR 203: NIO.2](https://jcp.org/en/jsr/detail?id=203)
- [JSR 292: invokedynamic](https://jcp.org/en/jsr/detail?id=292)
- [JSR 334: Project Coin](https://jcp.org/en/jsr/detail?id=334)
- [JSR 336: Java SE 7](https://jcp.org/en/jsr/detail?id=336)
