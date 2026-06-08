---
title: Java 6
---

# Java 6

- Released: 2006-12-11
- Codename: Mustang

## 核心总结

- Java SE 6 Mustang。JSR 223 脚本、JSR 199 Compiler API、JSR 269 注解处理、JDBC 4、JAX-WS/JAXB、监控工具增强。

## 语言

- 语言本身变化较少，主要是平台、工具和库完善。

## 核心库/规范

- JSR 223 Scripting：标准脚本引擎 API，默认集成 Rhino JavaScript。
- JSR 199 Compiler API：程序内调用 javac。
- JSR 269 Pluggable Annotation Processing：标准注解处理器 API，替代 apt 方向。
- JDBC 4.0：驱动自动加载、SQLException 层次增强、XML 支持。
- JAX-WS 2.0 / JAXB 2.0：Web Services 和 XML Binding 集成。

## 工具/运行时

- JConsole、VisualVM、诊断和监控能力增强。
- 同步、锁优化、启动和运行时性能改进。

## 总结

- Java 6 是企业应用的稳定平台版本，重点不是新语法，而是工具链、Web Services、编译器 API 和性能。

## 示例

### Scripting API

```java
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

ScriptEngineManager manager = new ScriptEngineManager();
ScriptEngine engine = manager.getEngineByName("JavaScript");
engine.eval("print('hello from script')");
```

### Compiler API

```java
import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;

JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
int exit = compiler.run(null, null, null, "Hello.java");
```

## References

- [JDK 6 Documentation](https://docs.oracle.com/javase/6/docs/)
- [JSR 270: Java SE 6](https://jcp.org/en/jsr/detail?id=270)
