---
title: Java 8
---

# Java 8

- Java SE 8
- Released: 2014-03-18
- 里程碑版本，引入 Lambda 和 Stream，改变了 Java 编程范式。

## Features

### Language

- **Lambda Expressions**
  - 允许把函数作为一个方法的参数。

  ```java
  list.forEach(item -> System.out.println(item));
  ```

- **Functional Interfaces**
  - 只有一个抽象方法的接口。
  - `@FunctionalInterface` 注解。
  - 内置函数式接口: `Predicate`, `Function`, `Supplier`, `Consumer`, `BinaryOperator` 等。

- **Method References**
  - 方法引用 `::`。

  ```java
  list.forEach(System.out::println);
  ```

- **Default Methods**
  - 接口支持默认方法实现。
  ```java
  interface MyInterface {
      default void test() {
          System.out.println("Default");
      }
  }
  ```

### Library

- **Stream API**
  - `java.util.stream`
  - 函数式风格的集合操作: `filter`, `map`, `reduce`, `collect` 等。
  - 支持串行和并行 (`parallelStream`) 操作。

- **Date Time API (JSR 310)**
  - `java.time` 包。
  - 不可变且线程安全。
  - 核心类: `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime`, `Duration`, `Period`。

- **Optional**
  - `java.util.Optional` 用于包含或不包含非空值的容器对象。
  - 旨在减少 `NullPointerException`。

- **CompletableFuture**
  - 异步编程增强，支持链式调用和组合。

### Tools

- **Nashorn JavaScript Engine**
  - 新的 JS 引擎，替代 Rhino (Java 15 中移除)。

## Best Practices

### Optional

- 旨在为库方法返回类型提供一种明确表示“无结果”的机制。
- **基本规则**:
  1. 不要使用 `null` 作为 Optional 变量或返回值。
  2. 除非你能保证 Optional 值存在否则不要直接使用 `Optional.get()`，推荐 `orElse`, `ifPresent` 等。
  3. 尽量避免使用 Optional 作为字段、方法参数或集合元素 (Optional 不可序列化)。
- **误用**: `Optional.ofNullable(x).orElse(y)` 优于 `x == null ? y : x` (可读性更好，但注意性能开销)。

### CompletableFuture

- 类似于 JS Promise。
- 缺点:
  - `allOf` 返回 `Void`，获取结果需要额外处理。
  - `complete` 方法公开，可能被意外调用。
- [CompletableFuture in action](https://dzone.com/articles/java-8-completablefuture)

## References

- [JDK 8 Documentation](https://docs.oracle.com/javase/8/docs/)
