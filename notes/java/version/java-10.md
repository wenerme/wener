---
title: Java 10
---

# Java 10

- [JDK 10](http://openjdk.java.net/projects/jdk/10)
- [Final Release Specification](http://cr.openjdk.java.net/~iris/se/10/latestSpec/)

## JEPs

- 286: [Local-Variable Type Inference](http://openjdk.java.net/jeps/286)
  - 使用 `var` 作为本地变量的推导类型
- 296: [Consolidate the JDK Forest into a Single Repository](http://openjdk.java.net/jeps/296)
  - 合并 JDK 到一个仓库
- 304: [Garbage-Collector Interface](http://openjdk.java.net/jeps/304)
- 307: [Parallel Full GC for G1](http://openjdk.java.net/jeps/307)
- 310: [Application Class-Data Sharing](http://openjdk.java.net/jeps/310)
  - 扩展现有的 CDS，允许应用类被放在共享的归档文件
  - 提升启动时间，优化内存占用
  - CDS 支持 JDK 的运行时镜像文件 `$JAVA_HOME/lib/modules` 和平台系统的应用类
  - CDS 支持自定义的类加载器
  - `-Xshare:auto` 在 cds 内存映射失败或者类路径不匹配时不异常，只是禁用 cds

```bash
# 启动类加载器是默认启用了 CDS 的
# -XX:+UseAppCDS 启用 app class loader 的 cds

# 记录所有加载的类，不加 -XX:+UseAppCDS 只会显示启动类加载器加载的类
java -Xshare:off -XX:+UseAppCDS -XX:DumpLoadedClassList=hello.lst -cp hello.jar HelloWorld

# 创建 AppCDS
java -Xshare:dump -XX:+UseAppCDS -XX:SharedClassListFile=hello.lst -XX:SharedArchiveFile=hello.jsa -cp hello.jar
# 使用 AppCDS 归档
java -Xshare:on -XX:+UseAppCDS -XX:SharedArchiveFile=hello.jsa -cp hello.jar HelloWorld
```

- 312: [Thread-Local Handshakes](http://openjdk.java.net/jeps/312)
  - HotSpot 在不影响 VM 全局的前提下实现在线程上执行回调的方法
  - 使得停止单个线程的成本较低，而不是停止所有或都不停止
- 313: [Remove the Native-Header Generation Tool (javah)](http://openjdk.java.net/jeps/313)
  - 移除 `javah` 本地头文件生成根据
- 314: [Additional Unicode Language-Tag Extensions](http://openjdk.java.net/jeps/314)
- 316: [Heap Allocation on Alternative Memory Devices](http://openjdk.java.net/jeps/316)
  - 允许 HotSpot VM 能在其他内存设备上申请内存，例如 NV-DIMM
- 317: [Experimental Java-Based JIT Compiler](http://openjdk.java.net/jeps/317)
- 319: [Root Certificates](http://openjdk.java.net/jeps/319)
- 322: [Time-Based Release Versioning](http://openjdk.java.net/jeps/322)
