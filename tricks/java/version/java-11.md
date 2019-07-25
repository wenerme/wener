---
id: java-11
title: Java 11
---

# Java 11

## Tips
* [JDK 11](http://openjdk.java.net/projects/jdk/11/)
* 2018-09-25
* 动态 class 文件常量
* 
Dynamic Class-File Constants
Epsilon: A No-Op Garbage Collector
Remove the Java EE and CORBA Modules
HTTP Client
Local-Variable Syntax for Lambda Parameters

* 参考
  * [迁移 Maven 项目到 Java 11](https://winterbe.com/posts/2018/08/29/migrate-maven-projects-to-java-11-jigsaw/)

It’s time! Migrating to Java 11
https://medium.com/criciumadev/5eb3868354f9

https://medium.com/criciumadev/create-a-cloud-native-image-using-java-modules-a670be616b29

http://mvnrepository.com/artifact/org.openjfx

https://www.reddit.com/r/java/comments/7ukei4/best_tool_for_packaging_jar_file_as_desktop/
https://docs.oracle.com/javase/10/tools/javapackager.htm

Remove javapackager sources from OpenJFX repo
https://bugs.openjdk.java.net/browse/JDK-8203379

https://github.com/javafx-maven-plugin/javafx-maven-plugin

https://github.com/javafx-maven-plugin/javafx-maven-plugin/issues/287

https://docs.oracle.com/javase/9/tools/jmod.htm

https://stackoverflow.com/questions/44732915/why-did-java-9-introduce-the-jmod-file-format

https://en.wikipedia.org/wiki/Java_packager

## JEPs

* [181](http://openjdk.java.net/jeps/181): Nest-Based Access Control
  * 基于嵌套的成员访问控制
  * 该访问上下文允许嵌套的内容被编译到不同的类文件，并允许访问彼此的私有成员
  * 因为很多语言都运行一个源文件包含多个类，导致彼此成员访问时需要生成包级别的访问方法
* [309](http://openjdk.java.net/jeps/309): Dynamic Class-File Constants
  * 动态类文件常量
  * 类文件添加新的常量池 CONSTANT_Dynamic
  * 加载 CONSTANT_Dynamic 会代理到一个启动方法上，类似于 invokedynamic 调用
  * 简化创建可固化的类文件常量，为语言设计者和编译器实现提供更高效简便的操作方式
* [315](http://openjdk.java.net/jeps/315): Improve Aarch64 Intrinsics
  * 优化字符串和数组内建方法
  * 优化 java.lang.Math sin, cos 和 log 方法
* [318](http://openjdk.java.net/jeps/318): Epsilon: A No-Op Garbage Collector
  * 会管理内存请求但不会回收内存，当内存用完时则会停止 JVM
* [320](http://openjdk.java.net/jeps/320): Remove the Java EE and CORBA Modules
  * 从 JavaSE 移除 JavaEE 和 CORBA 模块
  * 自 Java9 废弃
  * 移除模块
    * java.xml.ws - JAX-WS, SAAJ, Web Services Metadata
    * java.xml.bind - JAXB
    * java.activation - JAF
    * java.xml.ws.annotation - Common Annotations
    * java.corba - CORBA
    * java.transaction - JTA
  * 相关模块
    * java.se.ee - Aggregator module for the six modules above
    * jdk.xml.ws - Tools for JAX-WS
    * jdk.xml.bind - Tools for JAXB
  * 会移除的工具
    * wsgen, wsimport - jdk.xml.ws
    * schemagen, xjc - jdk.xml.bind
    * idlj, orbd, servertool, tnamesrv - java.corba
* [321](http://openjdk.java.net/jeps/321): HTTP Client (Standard)
  * 标准化 Java9 引入的 HTTP 客户端
  * 移除孵化接口，添加标准接口到 `java.net.http`
* [323](http://openjdk.java.net/jeps/323): Local-Variable Syntax for Lambda Parameters
  * 允许使用 `var` 来定义 lambda 参数的推导类型
* [324](http://openjdk.java.net/jeps/324): Key Agreement with Curve25519 and Curve448
  * RFC7748: Curve25519,Curve448
  * Java 实现, 平台独立
* [327](http://openjdk.java.net/jeps/327): Unicode 10
* [328](http://openjdk.java.net/jeps/328): Flight Recorder
  * 开源 Flight Recorder
* [329](http://openjdk.java.net/jeps/329): ChaCha20 and Poly1305 Cryptographic Algorithms
* [330](http://openjdk.java.net/jeps/330): Launch Single-File Source-Code Programs
  * 启动单源文件程序
  * 通过 `#!` 来启动 java 程序，类似于 shell
  * `#!/path/to/java --source version`
  * 也允许直接调用 `java -Dtrace=true --source 10 factorial 3`
* [331](http://openjdk.java.net/jeps/331): Low-Overhead Heap Profiling
* [332](http://openjdk.java.net/jeps/332): Transport Layer Security (TLS) 1.3
* [333](http://openjdk.java.net/jeps/333): ZGC: A Scalable Low-Latency Garbage Collector
  * ZGC 可扩展的低延时 gc
  * 试验阶段
  * gc < 10ms
  * mb 到 tb
  * 对比 g1，应用吞吐量不应该损耗不应该超过 15%
  * 作为未来优化基础
  * 先支持 Linux/x64
* [335](http://openjdk.java.net/jeps/335): Deprecate the Nashorn JavaScript Engine
  * 废弃 JS 引擎模块
  * 涉及的包
    * jdk.scripting.nashorn - 包括 jdk.nashorn.api.scripting 和 jdk.nashorn.api.tree
    * jdk.scripting.nashorn.shell - 包括 jjs 工具
* [336](http://openjdk.java.net/jeps/336): Deprecate the Pack200 Tools and API
  * 废弃 java.util.jar 中的 pack200, unpack200 工具和 Pack200 接口

### 181: Nest-Based Access Control
