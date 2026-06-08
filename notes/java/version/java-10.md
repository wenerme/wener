---
title: Java 10
---

# Java 10

- Released: 2018-03-20
- [JDK 10 Project](https://openjdk.org/projects/jdk/10/)

## 核心总结

- 半年节奏的第一个版本。语言层是 var，本身也完成 JDK 仓库、GC 接口、AppCDS 和版本号模型整理。

## 升级关注

- var 只适合局部变量，公共 API 中不要用它表达设计意图。
- javah 已移除，JNI 头文件生成使用 javac -h。

## 示例

### var 局部变量类型推断

```java
var users = new java.util.ArrayList<String>();
users.add("wener");

for (var user : users) {
  System.out.println(user.toUpperCase());
}
```

### AppCDS

```bash
# 启动类加载器默认启用 CDS
# -XX:+UseAppCDS 启用 app class loader 的 CDS

# 记录所有加载的类；不加 -XX:+UseAppCDS 时主要只会显示启动类加载器加载的类
java -Xshare:off -XX:+UseAppCDS -XX:DumpLoadedClassList=hello.lst -cp hello.jar HelloWorld

# 创建 AppCDS 归档
java -Xshare:dump -XX:+UseAppCDS -XX:SharedClassListFile=hello.lst -XX:SharedArchiveFile=hello.jsa -cp hello.jar

# 使用 AppCDS 归档
java -Xshare:on -XX:+UseAppCDS -XX:SharedArchiveFile=hello.jsa -cp hello.jar HelloWorld
```

### javah 替代

```bash
javac -h target/native-headers src/main/java/com/example/NativeApi.java
```

## JEPs

| JEP | 状态 | 分类 | 标题 | 中文描述 |
| --- | --- | --- | --- | --- |
| [JEP 286] | 正式 | 语言 | Local-Variable Type Inference | 局部变量类型推断 var，只影响局部变量声明。 |
| [JEP 296] | 正式 | 库/API | Consolidate the JDK Forest into a Single Repository | 多个 Mercurial forest 合并为单仓库，降低开发复杂度。 |
| [JEP 304] | 正式 | GC/Runtime | Garbage-Collector Interface | 抽象 GC 接口，让 HotSpot 更容易接入和剥离 GC 实现。 |
| [JEP 307] | 正式 | GC/Runtime | Parallel Full GC for G1 | G1 Full GC 并行化，降低最坏停顿。 |
| [JEP 310] | 正式 | GC/Runtime | Application Class-Data Sharing | AppCDS 支持应用类共享归档，改善启动和内存。 |
| [JEP 312] | 正式 | GC/Runtime | Thread-Local Handshakes | 可只让单个线程执行 VM 回调，减少全局 safepoint 需求。 |
| [JEP 313] | 移除/禁用 | 库/API | Remove the Native-Header Generation Tool (javah) | 移除 javah，改用 javac -h。 |
| [JEP 314] | 正式 | 库/API | Additional Unicode Language-Tag Extensions | 支持更多 Unicode locale 扩展。 |
| [JEP 316] | 正式 | 库/API | Heap Allocation on Alternative Memory Devices | 允许把堆分配到 NV-DIMM 等替代内存设备。 |
| [JEP 317] | 实验 | 库/API | Experimental Java-Based JIT Compiler | 实验性 Graal Java JIT 编译器。 |
| [JEP 319] | 正式 | 安全/加密 | Root Certificates | OpenJDK 提供默认根证书集合。 |
| [JEP 322] | 正式 | 库/API | Time-Based Release Versioning | 时间驱动发布版本号模型。 |

[JEP 286]: https://openjdk.org/jeps/286
[JEP 296]: https://openjdk.org/jeps/296
[JEP 304]: https://openjdk.org/jeps/304
[JEP 307]: https://openjdk.org/jeps/307
[JEP 310]: https://openjdk.org/jeps/310
[JEP 312]: https://openjdk.org/jeps/312
[JEP 313]: https://openjdk.org/jeps/313
[JEP 314]: https://openjdk.org/jeps/314
[JEP 316]: https://openjdk.org/jeps/316
[JEP 317]: https://openjdk.org/jeps/317
[JEP 319]: https://openjdk.org/jeps/319
[JEP 322]: https://openjdk.org/jeps/322

## References

- [JDK 10 Project](https://openjdk.org/projects/jdk/10/)
- [Java 10 Release Notes](https://jdk.java.net/10/release-notes)
