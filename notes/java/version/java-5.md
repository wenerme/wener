---
title: Java 5
---

# Java 5

- J2SE 5.0 (Tiger)
- Released: 2004-09-30
- 重大里程碑版本，引入了 Generics, Annotations, Enums 等核心特性。

## Features

### Language

- **Generics (泛型)**
  - 提供了编译时类型安全检测机制，允许在定义类、接口和方法时使用类型参数。

  ```java
  List<String> list = new ArrayList<>();
  list.add("Hello");
  String s = list.get(0); // 无需强制转换
  ```

- **Annotations (注解)**
  - 提供了一种为代码添加元数据的方式。
  - 常用注解: `@Override`, `@Deprecated`, `@SuppressWarnings`。

  ```java
  @Override
  public String toString() {
      return "MyObject";
  }
  ```

- **Enums (枚举)**
  - 类型安全的枚举类型。

  ```java
  public enum Color {
      RED, GREEN, BLUE
  }
  ```

- **Autoboxing/Unboxing (自动装箱/拆箱)**
  - 自动在原始类型 (int) 和包装类型 (Integer) 之间转换。

  ```java
  Integer i = 10; // Autoboxing
  int n = i;      // Unboxing
  ```

- **Varargs (可变参数)**
  - 允许方法接受不定数量的参数。

  ```java
  public void print(String... strings) {
      for (String s : strings) System.out.println(s);
  }
  ```

- **Enhanced for-loop (增强 for 循环)**
  - `for-each` 循环，简化数组和集合的遍历。

  ```java
  for (String s : list) {
      System.out.println(s);
  }
  ```

- **Static Import (静态导入)**
  - 允许访问类的静态成员而无需类限定。
  ```java
  import static java.lang.Math.*;
  double r = sqrt(pow(x, 2) + pow(y, 2));
  ```

### Library

- **java.util.concurrent**
  - 高并发工具包 (JUC)，包含 `ExecutorService`, `Future`, `BlockingQueue`, `ConcurrentHashMap` 等。

- **Scanner**
  - `java.util.Scanner` 用于简化的文本扫描和解析。

## References

- [JDK 5.0 Documentation](https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html)
