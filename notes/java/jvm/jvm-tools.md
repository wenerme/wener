---
title: JVM Diagnostic Tools
---

# JVM 诊断与监控工具

## 命令行工具

| 命令       | 全称                           | 作用                                                | 备注                                 |
| :--------- | :----------------------------- | :-------------------------------------------------- | :----------------------------------- |
| **jps**    | JVM Process Status Tool        | 显示指定系统内所有的 HotSpot 虚拟机进程             | 类似于 Linux 的 `ps`                 |
| **jstat**  | JVM Statistics Monitoring Tool | 监视虚拟机各种运行状态信息（类加载、内存、GC、JIT） | 适合无 GUI 环境                      |
| **jinfo**  | Configuration Info for Java    | 实时查看和调整虚拟机各项参数                        | `-flag`                              |
| **jmap**   | Memory Map for Java            | 生成堆转储快照 (heapdump/hprof)                     | `-dump`, `-histo`                    |
| **jhat**   | JVM Heap Dump Browser          | 分析 heapdump 文件，提供 HTTP 服务查看              | 功能较简陋，建议用 VisualVM/MAT      |
| **jstack** | Stack Trace for Java           | 生成虚拟机当前时刻的线程快照 (threaddump)           | 分析死锁、死循环、请求外部长时间等待 |
| **jcmd**   | JVM Command                    | 多功能工具，推荐使用                                | JDK 7+ 引入，可替代大部分上述工具    |

### jps (进程状态)

```bash
jps -l # 输出主类全名或 JAR 路径
jps -v # 输出 JVM 启动参数
```

### jstat (统计监测)

```bash
# 监视 GC 情况，采样间隔 250ms，采样 20 次
jstat -gc 20 < pid > 250

# 常用选项
# -class: 类加载统计
# -gc: 堆 GC 统计
# -gccapacity: 堆各代容量
# -gcutil: 空间利用率百分比
# -gcnew / -gcold: 新生代/老年代统计
```

### jmap (内存映射)

```bash
# 生成 heapdump 文件
jmap -dump:format=b,file=heap.hprof <pid>
jmap -dump:live,format=b,file=heap.hprof <pid> # 只 dump 存活对象

# 查看堆内存直方图 (类实例数和占用大小)
jmap -histo <pid> | head -20
jmap -histo:live <pid> # 触发 Full GC
```

### jstack (线程堆栈)

```bash
# 生成线程快照到文件 (常用)
jstack -l <pid> > thread_dump.txt

# 检测死锁
jstack -l <pid>
```

## 远程连接与 JMX

开启远程 JMX 监控通常需要配置以下系统属性：

```bash
java -Dcom.sun.management.jmxremote \
  -Dcom.sun.management.jmxremote.port=9010 \
  -Dcom.sun.management.jmxremote.rmi.port=9010 \
  -Dcom.sun.management.jmxremote.authenticate=false \
  -Dcom.sun.management.jmxremote.ssl=false \
  -Djava.rmi.server.hostname= \
  app.jar < HOST_IP > -jar
```

## 可视化工具

- **VisualVM**: JDK 自带 (JDK 9+ 可能需要单独下载)，集成了 jstat, jmap, jstack 等功能，支持插件。
- **JConsole**: JDK 自带，基于 JMX 的轻量级 GUI。
- **Arthas**: 阿里巴巴开源的 Java 诊断工具，命令行交互，功能强大（trace, watch, jad 等）。
