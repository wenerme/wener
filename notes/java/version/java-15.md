---
title: Java 15
---

# Java 15

移除 Nashorn JavaScript Engine

https://openjdk.java.net/projects/jdk/15/

339: Edwards-Curve Digital Signature Algorithm (EdDSA)
360: Sealed Classes (Preview)
371: Hidden Classes
372: 移除 Nashorn JavaScript Engine
可以使用 GraalvmJS
373: Reimplement the Legacy DatagramSocket API
374: Disable and Deprecate Biased Locking
375: Pattern Matching for instanceof (Second Preview)
377: ZGC: A Scalable Low-Latency Garbage Collector
378: Text Blocks
379: Shenandoah: A Low-Pause-Time Garbage Collector
381: Remove the Solaris and SPARC Ports
383: Foreign-Memory Access API (Second Incubator)
384: Records (Second Preview)
385: Deprecate RMI Activation for Removal

2020/09/15 General Availability

## JavaScript Engine 迁移

- 参考
  - [Migration Guide from Nashorn to GraalVM JavaScript](https://github.com/graalvm/graaljs/blob/master/docs/user/NashornMigrationGuide.md)
  - GraalvmJS [nashorn 兼容模式](https://www.graalvm.org/docs/reference-manual/languages/js/#nashorn-compatibility-mode)

GraalvmJS 依赖

```xml
<dependency>
  <groupId>org.graalvm.js</groupId>
  <artifactId>js</artifactId>
  <version>20.0.0</version>
</dependency>
<dependency>
  <groupId>org.graalvm.js</groupId>
  <artifactId>js-scriptengine</artifactId>
  <version>20.0.0</version>
</dependency>
```

调用

```java
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Simple {

  public static void main(String[] args) throws ScriptException {
    // Nashorn
    ScriptEngine nashornEngine = new ScriptEngineManager().getEngineByName("nashorn");
    nashornEngine.eval("print('Hello World!');");

    // Graal
    ScriptEngine graalEngine = new ScriptEngineManager().getEngineByName("graal.js");
    graalEngine.eval("print('Hello World!');");
  }
}
```
