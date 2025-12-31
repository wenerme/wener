---
title: Java 6
---

# Java 6

- Java SE 6 (Mustang)
- Released: 2006-12-11
- 侧重于性能提升、库增强和 Web 服务支持。

## Features

### Language & Core

- **Scripting Language Support (JSR 223)**
  - 集成脚本语言支持，默认包含 Rhino JavaScript 引擎 (后被 Nashorn 替代)。

  ```java
  ScriptEngineManager manager = new ScriptEngineManager();
  ScriptEngine engine = manager.getEngineByName("JavaScript");
  engine.eval("print('Hello from JS')");
  ```

- **Compiler API (JSR 199)**
  - 允许在程序中调用 Java 编译器编译代码。
  - `javax.tools.JavaCompiler`

- **Pluggable Annotation Processing API (JSR 269)**
  - 插件化注解处理 API，整合在编译器中。

### Library & Tools

- **JDBC 4.0**
  - 自动加载驱动 (无需 `Class.forName`)。
  - 改进的异常处理 (`SQLException` 子类)。
  - `XML` 类型支持。

- **Web Services (JAX-WS 2.0)**
  - 集成 SOAP Web Service 支持。
  - 支持 JAXB 2.0 (Java Architecture for XML Binding)。

- **JConsole & VisualVM**
  - 增强的监控和管理工具。

- **Performance**
  - 同步优化 (Lock Coarsening, Biased Locking)。
  - 启动速度和运行时性能提升。

## References

- [JDK 6 Documentation](https://docs.oracle.com/javase/6/docs/)
