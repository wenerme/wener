---
title: Java 5
---

# Java 5

- Released: 2004-09-30
- Codename: Tiger

## 核心总结

- J2SE 5.0 Tiger。泛型、注解、枚举、自动装箱、增强 for、可变参数、静态导入、JUC。

## 语言

- Generics：编译期类型安全，减少集合取值时的强制类型转换。
- Annotations：为语言、编译器、框架提供标准元数据机制。
- Enums：类型安全枚举，支持方法、字段和接口实现。
- Autoboxing/Unboxing：原始类型与包装类型自动转换。
- Varargs：可变参数方法。
- Enhanced for-loop：增强 for 循环。
- Static Import：静态导入。

## 核心库

- java.util.concurrent：Executor、Future、BlockingQueue、ConcurrentHashMap、Locks、Atomics 等并发基础设施。
- Scanner、Formatter、Queue、Deque 等集合与文本处理增强。
- Instrumentation API、Management API 增强，便于监控和工具集成。

## 总结

- Java 5 是现代 Java 的起点：泛型、注解、枚举、JUC 直接影响后续所有主流框架。

## 示例

### 泛型、枚举、增强 for

```java
import java.util.*;

enum Role { ADMIN, USER }

List<String> names = new ArrayList<String>();
names.add("Wener");
for (String name : names) {
  System.out.println(Role.USER + ": " + name);
}
```

### 注解与可变参数

```java
@Override
public String toString() {
  return "demo";
}

static int sum(int... values) {
  int total = 0;
  for (int v : values) total += v;
  return total;
}
```

## References

- [JDK 5.0 Documentation](https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html)
- [JSR 176: J2SE 5.0](https://jcp.org/en/jsr/detail?id=176)
