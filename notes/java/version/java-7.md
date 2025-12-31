---
title: Java 7
---

# Java 7

- Java SE 7 (Dolphin)
- Released: 2011-07-28
- Major features: Project Coin, NIO.2, Fork/Join.

## Features

### Language (Project Coin)

- **Switch on String**
  - `switch` 语句支持字符串类型。

  ```java
  switch (day) {
      case "Monday": break;
      // ...
  }
  ```

- **Try-with-resources**
  - 自动资源管理，实现了 `AutoCloseable` 接口的资源会自动关闭。

  ```java
  try (BufferedReader br = new BufferedReader(new FileReader(path))) {
      return br.readLine();
  }
  ```

- **Diamond Operator**
  - 泛型示例推断。

  ```java
  List<String> list = new ArrayList<>(); // `<>`
  ```

- **Multi-catch**
  - 捕获多种类型的异常。

  ```java
  try {
      // ...
  } catch (IOException | SQLException ex) {
      logger.log(ex);
  }
  ```

- **Numeric Literals with Underscores**
  - 数字字面量支持下划线分割，提高可读性。

  ```java
  int million = 1_000_000;
  ```

- **Binary Literals**
  - 二进制字面量前缀 `0b`。
  ```java
  int binary = 0b1001_1001;
  ```

### Library

- **NIO.2 (JSR 203)**
  - 新的 I/O API，位于 `java.nio.file` 包。
  - 核心类: `Path`, `Paths`, `Files`。
  - 支持文件系统操作、文件属性访问、异步 I/O (AsynchronousFileChannel)。
  - `WatchService` 用于监控文件系统变化。

- **Fork/Join Framework**
  - 用于并行任务执行的框架 (`java.util.concurrent.ForkJoinPool`)。
  - 核心类: `ForkJoinTask`, `RecursiveTask`, `RecursiveAction`。

- **Objects Class**
  - `java.util.Objects` 工具类，提供 `equals`, `hashCode`, `requireNonNull` 等静态方法。

### JVM

- **InvokeDynamic (JSR 292)**
  - 新的字节码指令 `invokedynamic`，主要用于支持动态语言在 JVM 上运行。
  - 后续也是 Java 8 Lambda 的基础。

## References

- [JDK 7 Documentation](https://docs.oracle.com/javase/7/docs/)
