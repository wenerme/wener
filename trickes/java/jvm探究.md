JVM运行时数据区, 方法区和堆由所有线程共享,其他是线程隔离的数据区

* 方法区 Method Area
	- 存放被虚拟机加载的类信息,常量,静态变量,JIT后的代码等数据
	- 别名非堆(Non-Heap)
	- 在HotSpot也可叫永久代(Permanent Generation),
		或者说是使用永久代来实现方法区.
	- GC 很少在这区域出现,回收目标主要是常量池回收和类卸载.回收条件苛刻
	- 无法满足分配是抛出OOME
* 堆 Heap
	- 存放对象实例
	- 启动时创建
	- GC 的主要目标
* 虚拟机栈 VM Stack
	- 生命周期与线程相同
	- 描述的是 Java 方法执行的内存模型
	- 存储的栈帧
* 本地方法栈 Native Method Stack
	- 和虚拟机栈类似,不过为本地(Native)方法服务
* 程序计数器 Program Counter Register
	
栈帧(Stack Frame)
: 每个方法执行时创建
: 是运行期的基本数据结构
: 用于存储局部变量表,操作栈,动态链接, 方法出口等
: 局部变表所需的空间是在编译器完成分配的
: 栈深度过大,将抛出StackOverflowError
: 如果栈可以动态扩展,当无法申请到足够内存是将抛出OutOfMemoryError

直接内存(Direct Memory)
: 不是虚拟机运行时数据区的一部分
: 不是JVM-SPEC定义的内存区域
: 常用,可能导致OOME
: DirectByteBuffer
: 在一定情况下提高性能,避免了在Java堆和Native堆中来回复制数据
: 受到本机内存及处理器寻址空间限制,超出的时候抛出OOEM

对象访问方式主要有 _句柄_ 和 _直接指针_, HotSpot 使用第二种


垃圾收集算法:

	* 引用计数(Reference Counting)
		- 实现简单,效率高
		- e.g. COM,FlashPlayer,Python,Squirrel
		- 很难解决循环引用问题
	* 根搜索算法(GC Root Tracing)
		- 通过一系列名为"GC Root"的对象作为起点开始向下搜索,搜索过的路径为引用链(Reference Chain),当一个对象到 GC Root 没有任何引用链时(图论上来说既从GC Root不可达),则证明该对象是不可用的.
		- e.g. Java,C#,List
		- 在Java中,可作为GC Root的对象为以下几种:
			- 虚拟机栈(栈帧中的本地变量表)中引用的对象
			- 方法区的_静态属性_引用的对象
			- 方法区的_常量_引用的对象
			- 本地方法栈中JNI(Native方法)引用的对象
		- 在JDK 1.2之前,对引用的定义很传统:如果引用类型的数据中存储的数值代表的是另外一块内存的起始地址,就称这块内存代表着一个引用.
		- JDK 1.2之后,将引用分为:
			- 强引用 (Strong Reference)
				- 只要强引用还在,GC就不会回收被引用的对象
			- 软引用 (Soft Reference)
				- 表示并非必须的对象
				- 在发生内存溢出之前将此类对象列入回收范围之内,进行二次回收
				- SoftReference 类
			- 弱引用 (Weak Reference)
				- 被弱引用的关联对象只能生存到下一次GC之前,无论内存是否足够,都会回收
				- WeakReference 类
			- 虚引用 (Phantom Reference)
				- 虚引用的存在不会影响其生存时间,无法通过虚引用获取对象实例.
				- 为对象设置虚引用关联的唯一目的是希望在该对象被GC回收时收到一个通知.
				- PhantomReference 类

如何判断一个常量是否可回收:

* 该类的所有实例都已经被回收,既Java堆中不存在该类的任何实例
* 加载该类的ClassLoader已经被回收
* 该类对应的 java.lang.Class 没有在任何地方被引用,无法通过反射访问该类方法
				
垃圾收集算法:

* 标记-清除(Mark Sweep)
	- 分为标记和清除两阶段: 先标记需要回收的对象,标记完成后统一回收掉被标记对象.
	- 缺点
		- 效率低.标记和清除的效率都不高
		- 空间问题.标记清除后会产生大量不连续的内存碎片,当程序需要分配大对象是可能会失败,导致再次GC.
* 复制算法(Copying)
	- 将可用内存按容量划分为相等大小的两块,每次只使用其中一块.是这块用完了,就将还存活的对象复制到另外一块上,然后将已使用过的空间一次清理掉.
	- 实现简单,运行高效,但是内存减半.
	- 大多采用这种机制来回收新生代,因为新生代大多都是朝生夕死的对象.
	- 将内存分为一块较大的Eden空间和两块较小的Survivor空间,每次使用Eden和其中一块Survivor.
	- 回收时,将Eden和Survivor存活的对象拷贝到另外一块Survivor空间,清理Eden和刚才的Survivor.
	- HotSpot默认Eden和Survivor的大小比例是 8:1, 既新生代可用空间为90%,另一个Survivor只有10%空间.
	- 如果Survivor空间不够,则通过分配担保机制(Handle Promotion)进入老年代.
* 标记-整理算法
	- 由于老年代的对象存货时间较长,上述方法
	- 让所有存货的对象向一端移动,直接清理掉端边界以外的内存.
* 分代收集算法
	- 根据对象的存活周期不同将内存划分为几块.
	- 根据各个年代的不同,采用最适合的收集算法.
	
GC
===

垃圾收集器,既内存回收的具体实现.
新生代(Young Generation)和老年代(Tenured Generation)收集器的配合关系.
具体可参考: https://blogs.oracle.com/jonthecollector/entry/our_collectors
![图](https://blogs.oracle.com/jonthecollector/resource/Collectors.jpg)

Serial/ParNew
	-> CMS -> Serial Old(MSC)
	-> Serial Old(MSC)
Parallel Scavenge
	-> Parallel Old
	-> Serial Old(MSC)

在垃圾收集器工作的上下文中 并行(Parallel) vs 并发(Concurrent)

* 并发指多条垃圾收集器并行工作,用户代码仍然处于等待状态.
* 并发值用户线程与垃圾收集线程同时执行,用户程序继续运行.


Serial
-----
* JDK 1.3.1 之前新生代的唯一选择
* 简单高效
* 在只有单个CPU的环境中,可有最高效率
* 是 Client 模式下的唯一选择
* 单线程
* 执行时必须停止所有其他线程
* 控制参数如 SurvivorRatio,PretenureSizeThreadhold,HandlePromotionFailure 等

ParNew
------
* Serial的多线程版本
* 和Serial有相同的控制参数,收集算法,Stop the World,对象分配规则,回收策略
* 许多运行在 Server 模式下虚拟机首选的新生代收集器
* 目前只有它能与CMS收集器配合
* ParNew 在单CPU环境中绝对不会有比Serial更好的效果.
* 使用 ParallelGCThreads 限制线程数量

Parallel Scavenge
----------------

* 新生代收集器
* 使用复制算法
* 并行收集器
* 主要目标是达到一个可控制的吞吐量(Throughout)
* 吞吐量=运行用户代码时间/(运行用户代码时间+垃圾收集时间)
* 停顿时间越短越适合需要与用户交互的程序,提高用户体验;高吞吐量则可最高效率利用CPU时间,尽快完成程序的运算任务,适合在后台运算而不需要太多交互的任务.
* 主要参数 MaxGCPauseMillis停顿时间, GCTimeRatio吞吐量大小
* 吞吐量优先的收集器.
* UseAdaptiveSIzePolicy自适应大小策略 
	- 打开后不需要手工指定
		- 新生代的大小(-Xmn)
		- Eden与Survivor比例(-XX:SurvivorRatio)
		- 晋升老年代对象年龄(-XX:PretenureSizeThreshold)
	- VM根据运行时性能监控信息,动态调整参数,以提供最适合的停顿时间或吞吐率,这样的调节方式称为 GC自适应调节策略(GC Ergonomics)
	
Serial Old
---------
* Serial 的老年代版本
* 单线程收集器
* 标记-整理算法
* 主要被Client模式下使用
* 在Server下,在JDK1.5之前版本中与Parallel Scavenge搭配,作为CMS的后背预案

Parallel Old
-----------
* Parallel Scavenge 的老年代版本
* 多线程
* 标记-整理算法
* JDK 1.6 开始,在这之前新生代如果选择 Parallel Scavenge,则老年代只能选择Serial Old

CMS(Concurrent Mark Sweep)
-------
* 目标: 最短回收停顿时间
* 重视服务的相应
* 标记-清除
* 并发收集,低停顿 (Concurrent Low Pause Collector)
* 步骤
	- 初始标记(initial mark)
		- 需要 Stop the World
		- 仅标记GC Root能直接关联到的对象,速度快
	- 并发标记(concurrent mark)
		- 进行GC Root Tracing 的过程
	- 重新标记(remark)
		- 需要 Stop the World
		- 修正并发标记期间,因用户继续运行而导致标记产生变动部分对象的标记记录
		- 时间比初始标记稍长,远比并发标记短
	- 并发清除(concurrent sweep)
* 缺点
	- 对CPU资源非常敏感
		- 默认线程数为 (CPU数+3)/4
		- 当CPU不足4个时,对用户程序的影响可能变大,导致用户程序执行速度突然降低50%
		- 因此有 增量式并发收集器(Incremental Concurrent Mark Sweep/i-CMS)
			- 在并发标记和并发清楚时让GC线程和用户线程交替运行,减少GC独占时间
			- 收集过程更长但是对程序影响少一些
			- 该方法已被__遗弃__
		- 无法处理浮动垃圾(Floating Garbage),可能出现"Concurrent Mode Failure",从而导致另一次Full GC
			- 在CMS标记阶段,用户程序也在运行,在标记后产生的新垃圾,只能留到下一次GC清理,则一部分称为_浮动垃圾_
			- 如果在老年代中增长的不快,可以调高`CMSInitiatingOccupancyFraction`来降低内存回收次数,获取更好性能.
			- 在CMS运行期间预留的内存不能满足程序需要,则出现"Concurrent Mode Failure",此时启用Serial Old对老年代从新收集
			- 过高的`CMSInitiatingOccupancyFraction`会导致大量的"Concurrent Mode Failure",影响性能
		- 因为CMS是基于 标记-清除 的,收集结束时可能产生大量空间碎片.
			- 当无法找打足够大的空间分配对象时则会触发一次Full GC
			- 可以使用`-XX:+UseCMSCompactAtFullCollection`参数,在完成Full GC后进行一个碎片整理过程.
			- 内存整理过程是无法并发的
			- 可以使用`-XX:CMSFullGCsBeforeCompaction`参数,设置在进行多少次不带压缩的Full GC后执行一次带压缩的.
G1
===
* 标记-整理 运行不产生空间碎片,对于长期运行的应用非常重要.
* 可以精确的控制停顿,将停顿时间控制在一定范围内,类似Java(RTSJ)垃圾收集器的特征
* 将整个Java堆划分为多个大小固定的独立区域,跟踪这些区域里垃圾的堆积程度,后台维护一个优先列表,每次根据允许的收集时间,优先回收垃圾最多的区域(Garbage First名字的由来).这样可以获得最高的收集效率

分配与回收
---------
* 对象优先在Eden分配,当没有足够空间的时候,发起一次MinorGC
* 大对象直接进入老年代
	- `-XX:PretenureSizeThreshold`控制判断大对象的大小,只对Serial和ParNew有效
	- 避免在Eden和Survivor之间发生大量的内存拷贝
* 长期存活对象进入老年代
	- 虚拟机对每个对象有个年龄的定义
		- 在Eden出生并结果一次MinorGC后存活,且被Survivor容纳,年龄为1
		- 在Survivor区中每经过一次MinorGC 年龄加1
	- 年龄增加到一定程度后进入老年代,默认15
		- 最大年龄通过`-XX:MaxTenuringTheshold`控制
* 动态对象年龄判定
	- 为了适应内存状况,并不是必须要求年龄达到`MaxTenuringTheshold`才能进入老年代
	- 如果在Survivor中相同年龄所有对象大小的总和大于Survivor空间的一半,年龄大于等于该年龄的对象直接进入老年代
* 空间分配担保
	- 在发生MinorGC时,VM检测之前每次晋升老年代的平均大小是否大于老年代剩余空间大小
		- 如果大于,则进行FullGC
		- 如果小于,则查看`HandlePromotionFailure`是否允许担保失败
			- 如果允许,则只进行MinorGC
			- 否则进行FullGC


MinorGC
: 发生在新生代的垃圾收集动作
: 频繁,回收速度快

FullGC/MajorGC
: 发生在老年代
: 出现MajorGC通常伴随至少一次的MinorGC(并非绝对,ParallelScavenge可指定Major GC策略选择).
: 比MinorGC慢10倍以上

堆
====
* 主要存放对象实例和数组
* 堆内存,物理上不一定连续
* 使用 -Xmx和-Xms控制
* 如果堆中没有完成实例分配,且无法扩大,抛出OutOfMemoryError


分类
----
进行细分是为了更好的回收,更快的分配

* 新生代
* 老年代
* 永久带

Eden
From Survivor
To Survivor

线程共享的堆中可能划分出多个线程私有的分配缓冲区(Thread Local Allocation Buffer, TLAB)


方法区
=====
运行时常量池
-----------
方法区的一部分
Class中的常量池用于存放编译器生成的各种字面量和符号引用,在类加载后存放到运行时常量池
具备动态特性,可运行时放入,例如String#intern


JDK 命令
=======

> __注意__: 在使用这些命令时,需要确保使用的是和目标程序相同的VM,否则会抛出`java.lang.reflect.InvocationTargetException`

这些工具主要处理运行时相关数据:运行日志,异常堆栈,GC日志,线程快照(threaddump/javacore),堆转储快照(heapdump/hprof)等.

大部分jdk自带的工具都比较小,因为主要是使用的`tools.jar`库里的接口完成的.该库不是Java的标准API,如果引入使用,则只能运行在HotSpot(或一些从Sun买了JDK源码License的虚拟机,如IBMJ9, BEA JRockit)上,或者在部署时需要一起部署`tools.jar`.

由于操作系统不同,可能命令的操作行为也不同.
如果运行在JDK 1.5之上,则要在启动时添加`-Dcom.sun.management.jmxremote`开启JMX管理功能.

监控和故障处理工具列表

名称|作用
-|-
jps| JVM Process Status Tool,显示指定系统内所有的HotSpot虚拟机进程
jstat| JVM Statustics Monitoring Tool,用于收集HotSpot虚拟机各方面的运行数据
jinfo| Configuration Info for Java, 实时的查看和调整虚拟机各项参数
jmap| Memory Map for Java, 生成虚拟机的内存转储快照(heapdump文件)
jhat| JVM Heap Dump Browser,分析heapdump文件,会建立一个HTTP/HTML服务,让用户在浏览器上查看结果.
jstack| Stack Trace for Java, 显示虚拟机的线程快照

jps
----
http://docs.oracle.com/javase/8/docs/technotes/tools/windows/jps.html


选项|作用
-|-
-q| 只输出LVMID
-m| 输出虚拟机启动时传递给主类main()的参数
-l| 输出主类全名,如果是jar包,输出jar路径
-v| 输出虚拟机启动时JVM参数
-V| Suppresses the output of the class name, JAR file name, and arguments passed to the main method, producing only a list of local JVM identifiers.

输出格式
: `lvmid [ [ classname | JARfilename | "Unknown"] [ arg* ] [ jvmarg* ] ]`
: 该格式可能在未来改变,没必要去解析


jstat
-----
可用于显示本地或远程虚拟机中的类加载,内存,垃圾收集,JIT编译等运行数据,在没有GUI时的首选工具.

### 选项

-class
: 坚实类装载,卸载数量,总空间及类装载所耗费的时间

-gc
: 监视Java堆状况,包括Eden区,2个Survivor区,老年代,永久代等容量,已用空间,GC时间合计等信息

-gccapacity
: 与`-gc`基本相同,但输出主要关注Java堆个个区域使用到的最大和最小空间

-gcutil
: 与`-gc`基本相同,但输出主要关注已使用空间占总空间的百分比

-gccause
: 与`-gcutil`相同,额外输出导致上一次GC产生的原因

-gcnew
: 新生代GC状况

-gcnewcapacity
: 与`-gcnew`基本相同,输出使用到的最大和最小空间

-gcold
: 新生代GC状况

-gcoldcapacity
: 与`-gcold`基本相同,输出使用到的最大和最小空间

-gcpermcapacity
: 输出永久代使用到的最大和最小空间

-compiler
: 输出JIT编译器编译过的方法,耗时等信息

-printcompilation
: 输出已经被JIT编译的方法

-gcmetacapacity
: JDK8

jmap
---
除了能获取转储文件,还可以查询finalize执行队列,Java堆和永久代的详细信息,如空间使用率,当前用的是哪种收集器等.

-dump
: 生成Java堆转储快照.格式为: `-dump:[live,]format=b,file=<filename>`,其中live说明是否只dump出存活的对象

-finalizerinfo
: 显示在F-Queue中等待Finalizer线程执行finalize方法的对象.

-head
: 显示Java堆详细信息,如使用哪种回收器,参数配置,分代状况等.

-histo
: 显示堆中对象统计信息,包括类,实例数量和合计容量

-permstat
: 以ClassLoader为统计口径显示永久内存状态.

-F
: 是虚拟机进程对-dump没有响应时,可以使用这个选项强制生成转储快照.

jhat
----
主要用来分析jmap生成的堆转储快照.

jstack
-----
用于生成虚拟机当前时刻的线程快照(threaddump或javadcore文件).线程快照就是当前虚拟机内每一条线程正在执行的方法堆栈的集合,主要用于定位线程出现长时间停顿的原因.

可使用JDK1.5中java.lang.Thread#getAllStackTrace完成该命令大部分功能


选项|说明
-|-
-F|当正常的输出请求不被响应时,强制输出线程堆栈.
-l|显示锁的附加信息
-m|如果调用本地方法的话,可以显示C/C++的堆栈

内存监控
: 相当于可视化的 jstat
: 用于监视受收集器管理的虚拟机内存(堆和永久代)变化趋势

线程监控
: 相当于可视化的 jstack

VisualVM
--------
* 显示虚拟机进程及进程的配置和环境信息(jps,jinfo)
* 在Profiling时,可考虑关闭类共享`-Xshard:off`,避免崩溃

jstatd
------
监控JVM,允许远程对该JVM进行监控.

启动jstatd的一段脚本,会直接允许所有权限
```
#!/bin/sh
policy=${HOME}/.jstatd.all.policy
[ -r ${policy} ] || cat >${policy} <<'POLICY'
grant codebase "file:${java.home}/../lib/tools.jar" {
permission java.security.AllPermission;
};
POLICY

jstatd -J-Djava.security.policy=${policy} -J-Djava.rmi.server.hostname=`hostname`  &
```

### 安全

### 选项

-nr
: 当没有找到已经存在的RMI注册时,不创建新的RMI注册.

-p port
: 指定RMI注册端口

-n rminame
: 绑定到RMI对象的名字,默认为JStatRemoteHost,如果在同一主机上启动了多个jstatd服务,可通过该参数指定唯一的名字.

远程调试
=======

JDK 1.3或更早
`-Xnoagent -Djava.compiler=NONE -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=6006`

JDK 1.4
`-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=6006`

之后的JDK
`-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=6006`


远程监控
=======

在Windows下,需要将Temp目录设置为系统盘上,且是NTFS.处于安全考虑.

直接可用的,但不安全的启动参数

```
java -Dcom.sun.management.jmxremote \
     -Dcom.sun.management.jmxremote.port=9191 \
     -Dcom.sun.management.jmxremote.authenticate=false \
     -Dcom.sun.management.jmxremote.ssl=false \
     -Djava.rmi.server.hostname=`hostname` \
     -jar app.jar
```

密码认证
-------
### 使用LDAP认证

ldap.config如下
```
ExampleCompanyConfig {
    com.sun.security.auth.module.LdapLoginModule REQUIRED
        userProvider="ldap://example-ds/ou=people,dc=examplecompany,dc=com"
        userFilter="(&(uid={USERNAME})(objectClass=inetOrgPerson))"
        authzIdentity=monitorRole;
    };
```
示例启动参数
```
java -Dcom.sun.management.jmxremote.port=5000
     -Dcom.sun.management.jmxremote.login.config=ExampleCompanyConfig
     -Djava.security.auth.login.config=ldap.config
     -jar MyApplication.jar
```

### 使用基于文件的密码认证


设置单用户环境,在`JRE_HOME/lib/management`目录下

1. 复制 jmxremote.password.template 为 jmxremote.password
2. 设置文件权限,只允许所有者能读写文件
3. 给角色添加密码,例如monitorRole和controlRole
4. 如果在多用户环境下,还需要
	* 在启动时设置 `com.sun.management.jmxremote.password.file=pwFilePath` 参数
	
Out-of-the-Box Monitoring and Management Properties
-----------------------------------------------

com.sun.management.jmxremote=true
: 启用JMX远程代理和本地监控,通过JMX连接提供JConsole和其他本地的JMX客户端使用的接口.

com.sun.management.jmxremote.port=portNumber
: 启用JMX远程代理,创建一个远程JMX链接器来监听指定的端口.

com.sun.management.jmxremote.registry.ssl=false
: 通过SSL绑定RMI

com.sun.management.jmxremote.ssl=true
: 启用SSL

com.sun.management.jmxremote.ssl.enabled.protocols=SSL/TLS
: 逗号分隔的支持的SSL/TLS协议版本.配合`com.sun.management.jmxremote.ssl`使用

com.sun.management.jmxremote.ssl.enabled.cipher.suites
: A comma-delimited list of SSL/TLS cipher suites to enable. Used in conjunction with com.sun.management.jmxremote.ssl.

com.sun.management.jmxremote.ssl.need.client.auth=true
: 如果该参数和`com.sun.management.jmxremote.ssl`同为true,则会实行客户端认证.

com.sun.management.jmxremote.authenticate=true
: If this property is false then JMX does not use passwords or access files: all users are allowed all access.

com.sun.management.jmxremote.password.file=JRE_HOME/lib/management/jmxremote.password
: Specifies location for password file. If com.sun.management.jmxremote.authenticate is false, then this property and the password and access files are ignored. Otherwise, the password file must exist and be in the valid format. If the password file is empty or nonexistent, then no access is allowed.

com.sun.management.jmxremote.access.file=JRE_HOME/lib/management/jmxremote.access
: Specifies location for the access file. If com.sun.management.jmxremote.authenticate is false, then this property and the password and access files are ignored. Otherwise, the access file must exist and be in the valid format. If the access file is empty or nonexistent, then no access is allowed.

com.sun.management.jmxremote.login.config
: Specifies the name of a Java Authentication and Authorization Service (JAAS) login configuration entry to use when the JMX agent authenticates users. When using this property to override the default login configuration, the named configuration entry must be in a file that is loaded by JAAS. In addition, the login modules specified in the configuration should use the name and password callbacks to acquire the user's credentials. For more information, see the API documentation for javax.security.auth.callback.NameCallback and javax.security.auth.callback.PasswordCallback.



主机标识符/Host Identifier
------------------------
在jps列举远程服务时,需要远程机器上启动了jstatd服务

* LVMID(Local Vitural Machine Identifier)
* VMID格式: `[protocol:][//]lvmid[@hostname[:port]/servername]`
* 对于本地,LVMID和VMID是一致的
* 对于本地虚拟机来说,LVMID与操作系统进程ID一致


格式`[protocol:][[//]hostname][:port][/servername]`

* protocol
	- 如果protocol和hostname都省略,则默认的协议是平台指定的,优化的,本地协议.
	- 如果protocol省略,hostname存在,则默认协议为`rmi`
* hostname
	- 主机名或IP地址.如果未指定则是本地主机
* port
	- 如果hostname省略或指定protocol为本地协议,则该参数省略
* servername
	- 该参数的作用由具体实现决定
	- 对于优化后的本地协议,该参数被忽略
	- 对于`rmi`协议,该参数是远程RMI对象的名字.
		- 使用`jstatd -n`查看具体信息


Java相关端口
=========

端口|说明
-|-
1099|RMI默认端口
7000|jhat启动的web服务端口

JDK8
=====

PermGen to MetaSpace
------------------

	
Metaspace是什么
: 新的内存空间
: 使用本地内存来存放class文件元数据,所以叫`Metaspace`, 和Oracle JRockit 和 IBM JVM类似
: 不再会有`java.lang.OutOfMemoryError: PermGen`,也不需要对永久代进行调优.
: 移除了一些堆中的杂项数据,可能会发现堆有所增长
: 是PermGen的替代
: 可动态扩展
: 控制参数 MaxMetaspaceSize
: 默认最大Metaspace的空间是没有限制的,只受到本地内存限制.
: 在达到最大限制后抛出`java.lang. OutOfMemoryError: Metadata space`
: 每次动态扩展前会继续GC

* 废除 PermSize 和 MaxPermSize 参数

HotSpot JVM 选项
========

选项和默认值
: 版本平台其他默认值
: 描述
: 参考

版本平台其他默认值
: +6 为在版本 6 以后引入该参数
: -1.4.2 为在版本 1.4.2 后移除了该参数
: Solaris,Linux 为只针对该平台
: (5.0之前: false) 在该条件下的默认值

以下的默认值为Java SE6在Solaris Sparc 带 `-server`参数的默认值.

* 布尔类型选项: `-XX:+<option>`启用, `-XX:-<option>`关闭
* 数字类型选项: `-XX:<option>=<number>`.数字可带`mMkKgG`来表示大小.
* 字符类型选项: `-XX:<option>=<string>`,通常用于指定文件,路径和命令.

以下选项中带`manageable`的可以通过JDK的管理接口(com.sun.management.HotSpotDiagnosticMXBean API)进行动态修改,也可通过JConsole修改.在监控和管理JavaSE6时,`manageable`的选项也可通过`jinfo -flag`来设置.

一下选项主要用于JDK7和之前的版本,对于JDK8,请参照
* [Windows](http://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html)
* [Solaris](http://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)
* [Linux](http://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html) 
* [Mac OS X](http://docs.oracle.com/javase/8/docs/technotes/tools/unix/java.html)

行为选项
-------
-XX:-AllowUserSignalHandlers
: Solaris,Linux
: Do not complain if the application installs signal handlers.
: 允许应用装载信号处理

-XX:AltStackSize=16384
: -5.0,Solaris
: Alternate signal stack size (in Kbytes).
: 替换信号栈大小(单位 Kbytes)

-XX:-DisableExplicitGC
: By default calls to System.gc() are enabled (-XX:-DisableExplicitGC). Use -XX:+DisableExplicitGC to disable calls to System.gc(). Note that the JVM still performs garbage collection when necessary.
: 禁用显式的`System.gc()`请求,默认关闭

-XX:+FailOverToOldVerifier
: +6
: Fail over to old verifier when the new type checker fails. 
: 当新的类型检测器失败时,使用旧的校验器

-XX:+HandlePromotionFailure
:  +1.4.2u11 (5.0之前: false)
:  The youngest generation collection does not require a guarantee of full promotion of all live objects. 

-XX:+MaxFDLimit
: Solaris
: Bump the number of file descriptors to max

-XX:PreBlockSpin=10
:  +1.4.2
: Spin count variable for use with -XX:+UseSpinning. Controls the maximum spin iterations allowed before entering operating system thread synchronization code. 

-XX:-RelaxAccessControlCheck
: +6
: Relax the access control checks in the verifier. 
: 在校验器中放松对访问请求的检查 

-XX:+ScavengeBeforeFullGC
:  +6
: Do young generation GC prior to a full GC.
: 在FullGC前对新生代做一次GC

-XX:+UseAltSigs
: +1.3.1u9,1.4.1, Solaris
: Use alternate signals instead of SIGUSR1 and SIGUSR2 for VM internal signals

-XX:+UseBoundThreads
: Solaris
: Bind user level threads to kernel threads. 

-XX:-UseConcMarkSweepGC
: +1.4.1
: Use concurrent mark-sweep collection for the old generation.
: 对老年代使用并发标记GC收集
: 使用ParNew + CMS + Serial Old

-XX:+UseGCOverheadLimit
: +6
: Use a policy that limits the proportion of the VM's time that is spent in GC before an OutOfMemory error is thrown.

-XX:+UseLWPSynchronization
: +1.4.0, Solaris
: Use LWP-based instead of thread based synchronization. 
: 使用基于LWP的同步而不是基于线程的

-XX:-UseParallelGC
: +1.4.1
: Use parallel garbage collection for scavenges. 
: 使用并行GC收集器
: 使用Parallel Scavenge + Serial Old


-XX:-UseParallelOldGC
: +5.0u6
: Use parallel garbage collection for the full collections. Enabling this option automatically sets -XX:+UseParallelGC. 
: 在FullGC时,使用并发GC收集器.当启用`-XX:+UseParallelGC`时会自动启用该参数.
: 使用Parallel Scavenge + Parallel Old

-XX:-UseSerialGC
: +5.0
: Use serial garbage collection. 
: 使用串行GC收集器
: 打开后使用 Serial+Serial Old的收集器组合进行内存回收

-XX:-UseSpinning
: 1.4.2 - 5.0 (1.4.2, multi-processor Windows platforms: true)
: Enable naive spinning on Java monitor before entering operating system thread synchronizaton code. 

-XX:+UseTLAB
: +1.4.0, 在这之前为`UseTLE` (1.4.2和之前, x86或`-client`: false)
: Use thread-local object allocation
: 使用线程私有分配

-XX:+UseSplitVerifier
: +5.0(5.0: false)
: Use the new type checker with StackMapTable attributes. 

-XX:+UseThreadPriorities
: Use native thread priorities.
: 使用本地线程属性

-XX:+UseVMInterruptibleIO
: +6,Solaris
: Thread interrupt before or with EINTR for I/O operations results in OS_INTRPT. 


Garbage First (G1) 垃圾收集器选项
-----------------------------

-XX:+UseG1GC
: Use the Garbage First (G1) Collector
: 使用G1收集器

-XX:MaxGCPauseMillis=n
: Sets a target for the maximum GC pause time. This is a soft goal, and the JVM will make its best effort to achieve it.
: 最大GC停止时间

-XX:InitiatingHeapOccupancyPercent=45
: Percentage of the (entire) heap occupancy to start a concurrent GC cycle. It is used by GCs that trigger a concurrent GC cycle based on the occupancy of the entire heap, not just one of the generations (e.g., G1). A value of 0 denotes 'do constant GC cycles'.

-XX:NewRatio=2
: Ratio of old/new generation sizes.
: 老年代/新生代的大小比例.

-XX:SurvivorRatio=8
: Ratio of eden/survivor space size.
: eden/survivor 空间的比例.

-XX:MaxTenuringThreshold=15
: Maximum value for tenuring threshold.

-XX:ParallelGCThreads=n
: 默认值随平台和JVM而变
: Sets the number of threads used during parallel phases of the garbage collectors.

-XX:ConcGCThreads=n
: 默认值随平台和JVM而变
: Number of threads concurrent garbage collectors will use.

-XX:G1ReservePercent=10
: Sets the amount of heap that is reserved as a false ceiling to reduce the possibility of promotion failure.

-XX:G1HeapRegionSize=n
: The default value of this parameter is determined ergonomically based upon heap size. Range(1Mb-32Mb).
: With G1 the Java heap is subdivided into uniformly sized regions. This sets the size of the individual sub-divisions. 
: 在使用G1时,堆会被分为多个相同大小的子区域.该参数用于设置单个子区域的大小.

性能选项
-------

-XX:+AggressiveOpts
: +5.0u6
: Turn on point performance compiler optimizations that are expected to be default in upcoming releases. 

-XX:CompileThreshold=10000
: (-client: 1,500)
: Number of method invocations/branches before compiling

-XX:LargePageSizeInBytes=4m
: +1.4.0u1 (amd64: 2m)
: Sets the large page size used for the Java heap. 
: 设置Java堆的页大小

-XX:MaxHeapFreeRatio=70
: Maximum percentage of heap free after GC to avoid shrinking.
: 在GC后的最大空闲堆空间比例,用于避免缩减堆.

-XX:MaxNewSize=size
: (1.3.1 Sparc: 32m; 1.3.1 x86: 2.5m.)
: Maximum size of new generation : (in bytes). Since 1.4, MaxNewSize is computed as a function of NewRatio. 
: 新生成的最小空间(单位bytes).在1.4后,`MaxNewSize`的值使用`NewRatio`来计算

-XX:MaxPermSize=64m
: 5.0 and newer: 64 bit VMs are scaled 30% larger; 1.4 amd64: 96m; 1.3.1 -client: 32m.
: Size of the Permanent Generation.  
: 永久带的大小

-XX:MinHeapFreeRatio=40
: Minimum percentage of heap free after GC to avoid expansion.
: 在GC后的最小空闲堆空间比例,用于避免扩展堆.

-XX:NewRatio=2
: (Sparc -client: 8; x86 -server: 8; x86 -client: 12)-client: 4(1.3), 8(1.3.1+), x86: 12
: Ratio of old/new generation sizes.
: 老年代/新生代的大小比例.

-XX:NewSize=2m
: 5.0+: 64 bit VMs *130%; x86: 1m; x86, 5.0-: 640k
: Default size of new generation (in bytes)
: 新生代的默认大小(单位bytes)

-XX:ReservedCodeCacheSize=32m
: Solaris 64-bit, amd64 -server x86: 2048m; 1.5.0_06-, Solaris 64-bit, amd64: 1024m.
: Reserved code cache size (in bytes) - maximum code cache size.
: 保留的代码缓存大小(单位bytes) - 最大代码缓存大小

-XX:SurvivorRatio=8
: Solaris amd64: 6; Sparc 1.3.1: 25; other Solaris platforms in 5.0-: 32
: Ratio of eden/survivor space size
: eden/survivor空间大小比例

-XX:TargetSurvivorRatio=50
: Desired percentage of survivor space used after scavenge.

-XX:ThreadStackSize=512
: Sparc: 512; Solaris x86: 320  ,5.0-:256; Sparc 64 bit: 1024; Linux amd64: 1024, 5.0-:0; all others 0.
: Thread Stack Size (in Kbytes). (0 means use default stack size)
: 线程栈大小(Kbytes),0为使用默认栈大小

-XX:+UseBiasedLocking
: +5.0u6 (5.0: false)
: Enable biased locking. 
: [tuning example](http://www.oracle.com/technetwork/java/tuning-139912.html#section4.2.5). 

-XX:+UseFastAccessorMethods
: Use optimized versions of Get<Primitive>Field.

-XX:-UseISM
: Solaris
: Use Intimate Shared Memory.
: [Intimate Shared Memory](http://www.oracle.com/technetwork/java/ism-139376.html).

-XX:+UseLargePages
: 5.0u5
: Use large page memory. 
: [Java Support for Large Memory Pages](http://www.oracle.com/technetwork/java/javase/tech/largememory-jsp-137182.html).

-XX:+UseMPSS
: +1.4.0u1, Solaris 9+ (1.4.1-: false)
: Use Multiple Page Size Support w/4mb pages for the heap. Do not use with ISM as this replaces the need for ISM. 

-XX:+UseStringCache
: Enables caching of commonly allocated strings.
: 对于经常非陪的字符串启用缓存
 

-XX:AllocatePrefetchLines=1
: Default values are 1 if the last allocated object was an instance and 3 if it was an array. 
: Number of cache lines to load after the last object allocation using prefetch instructions generated in JIT compiled code.
 

-XX:AllocatePrefetchStyle=1
: Generated code style for prefetch instructions.
	0 - no prefetch instructions are generate*d*,
	1 - execute prefetch instructions after each allocation,
	2 - use TLAB allocation watermark pointer to gate when prefetch instructions are executed.
 

-XX:+UseCompressedStrings
: +6u21 Performance Release
: Use a byte[] for Strings which can be represented as pure ASCII. 
 

-XX:+OptimizeStringConcat
: +6u20
: Optimize String concatenation operations where possible. 
: 尝试优化字符串连接操作.

调试选项
-------

-XX:-CITime
: +1.4.0
: Prints time spent in JIT Compiler. 
: 输出JIT编译器耗费的时间

-XX:ErrorFile=./hs_err_pid<pid>.log
: +6
: If an error occurs, save the error data to this file. 
: 当发生错误的时候,将错误数据保存在该文件

-XX:-ExtendedDTraceProbes
: +6,Solaris
: Enable performance-impacting dtrace probes. 

-XX:HeapDumpPath=./java_pid<pid>.hprof
: 1.4.2u12, 5.0u7
: Path to directory or filename for heap dump. Manageable. 

-XX:-HeapDumpOnOutOfMemoryError
: 1.4.2u12, 5.0u7
: Dump heap to file when java.lang.OutOfMemoryError is thrown. Manageable. 
: 是发生`OutOfMemoryError`时,转储堆到文件.

-XX:OnError=`"<cmd args>;<cmd args>"`
: 1.4.2u9
: Run user-defined commands on fatal error.
: 在发生致命错误的时候调用用户指定的命令.

-XX:OnOutOfMemoryError=`"<cmd args>"`
<cmd args>"
: 1.4.2u12, 6
: Run user-defined commands when an OutOfMemoryError is first thrown. 
: 在第一次抛出OutOfMemoryError时,调用用户定义的命令

-XX:-PrintClassHistogram
: +1.4.2 jmap -histo命令提供了类似的功能
: Print a histogram of class instances on Ctrl-Break. Manageable. 
: 在 Ctrl-Break 时,输出统计图.

-XX:-PrintConcurrentLocks
: +6 jstack -l 提供了类似的功能
: Print java.util.concurrent locks in Ctrl-Break thread dump. Manageable. 
: 在 Ctrl-Break 线程转储时,输出java.util.concurrent下的锁信息.

-XX:-PrintCommandLineFlags
: +5.0
: Print flags that appeared on the command line. 

-XX:-PrintCompilation
: Print message when a method is compiled.
: 当方法编译后输出相关信息.

-XX:-PrintGC
: Print messages at garbage collection. Manageable.
: 在GC时输出相关信息.

-XX:-PrintGCDetails
: +1.4.0
: Print more details at garbage collection. Manageable. 
: 在GC时输出详细信息.

-XX:-PrintGCTimeStamps
: +1.4.0
: Print timestamps at garbage collection. Manageable 
: 在GC时,输出时间戳

-XX:-PrintTenuringDistribution
: Print tenuring age information.

-XX:-PrintAdaptiveSizePolicy
: Enables printing of information about adaptive generation sizing.

-XX:-TraceClassLoading
: Trace loading of classes.
: 跟踪类加载

-XX:-TraceClassLoadingPreorder
: +1.4.2
: Trace all classes loaded in order referenced (not loaded). 


-XX:-TraceClassResolution
: +1.4.2
: Trace constant pool resolutions. 
: 跟踪常量池

-XX:-TraceClassUnloading
: Trace unloading of classes.
: 跟踪类卸载

-XX:-TraceLoaderConstraints
: +6
: Trace recording of loader constraints. 

-XX:+PerfSaveDataToFile
: Saves jvmstat binary data on exit.
: 在退出时,保存jvmstat数据

-XX:ParallelGCThreads=n
: 默认值随平台和JVM而变
: Sets the number of garbage collection threads in the young and old parallel garbage collectors.
: 设置新生代和老年代并行垃圾收集的线程数.

-XX:+UseCompressedOops
: Enables the use of compressed pointers (object references represented as 32 bit offsets instead of 64-bit pointers) for optimized 64-bit performance with Java heap sizes less than 32gb.
: 对Java堆小于32gb的64位JVM,使用压缩指针(对象引用以32位表示,而不是64位.).

-XX:+AlwaysPreTouch
: Pre-touch the Java heap during JVM initialization. Every page of the heap is thus demand-zeroed during initialization rather than incrementally during application execution.

-XX:AllocatePrefetchDistance=n
: 默认值随平台和JVM而变
: Sets the prefetch distance for object allocation. Memory about to be written with the value of new objects is prefetched into cache at this distance (in bytes) beyond the address of the last allocated object. Each Java thread has its own allocation point.

-XX:InlineSmallCode=n
: 默认值随平台和JVM而变
: Inline a previously compiled method only if its generated native code size is less than this.
: 当生成的代码小于该值时,进行内联.

-XX:MaxInlineSize=35
: Maximum bytecode size of a method to be inlined.
: 最大内联代码的大小.

-XX:FreqInlineSize=n
: : 默认值随平台和JVM而变
: Maximum bytecode size of a frequently executed method to be inlined.

-XX:LoopUnrollLimit=n
: : 默认值随平台和JVM而变
: Unroll loop bodies with server compiler intermediate representation node count less than this value. The limit used by the server compiler is a function of this value, not the actual value.

-XX:InitialTenuringThreshold=7
: Sets the initial tenuring threshold for use in adaptive GC sizing in the parallel young collector. The tenuring threshold is the number of times an object survives a young collection before being promoted to the old, or tenured, generation.

-XX:MaxTenuringThreshold=n
: Sets the maximum tenuring threshold for use in adaptive GC sizing. The current largest value is 15. The default value is 15 for the parallel collector and is 4 for CMS.

-Xloggc:<filename>
: Log GC verbose output to specified file. The verbose output is controlled by the normal verbose GC flags.
: 记录GC的详细输出到指定文件.具体详细程度由其它参数控制.

-XX:-UseGCLogFileRotation
: Enabled GC log rotation, requires -Xloggc.
: 轮流GC日志输出,需要`-Xloggc`

-XX:NumberOfGClogFiles=1
: Set the number of files to use when rotating logs, must be >= 1. The rotated log files will use the following naming scheme, <filename>.0, <filename>.1, ..., <filename>.n-1.
: 设置轮流GC日志的文件数,必须>=1,会以: <文件名>.0, <文件名>.1, ..., <文件名>.n-1.的方法命名.

-XX:GCLogFileSize=8K
: The size of the log file at which point the log will be rotated, must be >= 8K.
: 设置轮流GC日志文件的大小,必须>=8k

JVM 1.3.0 之前的选项
------------------
在1.3.0之前,对Solaris有个Java2SDK的发布饭ExactVM(EVM).从1.3.0,被Java HotSpot VM 替代.

EVN选项 | 描述| Java HotSpot等同选项
-|-|-
-Xt|Instruction tracing|None (obsolete option) 
-Xtm|Method tracing|None (obsolete option) 
-Xoss|Maximum java stack size|None (HotSpot doesn't have separate native and Java stacks) 
-Xverifyheap|Verify heap integrity|-XX:+VerifyBeforeGC -XX:+VerifyAfterGC -XX:+VerifyTLE (-XX:+VerifyTLAB in J2SE 1.4) -XX:+VerifyBeforeScavenge -XX:+VerifyAfterScavenge (all debug only) 
-Xmaxjitcodesize|Maximum Comiled code size |-Xmaxjitcodesize<num> (used to be -Xmaxjitcodesize=32m, now -Xmaxjitcodesize32m) 
-Xoptimize|Use optimizing JIT Compiler |-server 
-Xconcgc|Use concurrent garbage collector (1.2.2_07+) | -XX:+UseConcMarkSweepGC (available beginning with J2SE 1.4.1) 


Java HotSpot VM -X 选项
---------------
Java HotSpot VM 当前支持以下`-X`选项,EVM不支持以下选项.

选项|说明
-|-
-Xincgc|Use Train GC 
-Xnoincgc|Do not use Train Garbage Collection (default) 
-XX:MaxHeapFreeRatio=<Maximum>|heap free percentage (default 70)
-XX:MinHeapFreeRatio=<Minimum>|heap free percentage (default 40)
-Xint|Intepreter only (no JIT Compilation) 
-XX:+UseBoundThreads|Bind user level threads (Solaris only) 
-Xmn<Size>|Set the size of the young generation (available beginning in J2SE 1.4.0)
-XX:+UseParallelGC|Use parallel garbage collection (available beginning in J2SE 1.4.1) 
-XX:+UseAltSigs|On the Solaris operating environment, the VM uses SIGUSR1 by default, which can sometimes conflict with applications that signal-chain SIGUSR1. -XX:+UseAltSigs will cause the VM to use signals other than SIGUSR1 and SIGUSR2 as the default. Available beginning in J2SE 1.4.1 on the Solaris operating environment. 

Java HotSpot VM 和 `_JIT_ARGS` 环境变量等同的选项
----------

_JIT_ARGS |	HotSpot 选项|描述
-|-|-
jit/jbe|-client/-server|jbe is the same as -Xoptimize in 1.2 based systems, jit is the default. Use -server in 1.3 to replace -Xoptimize (or jbe) in 1.2. 
trace|-XX:+PrintCompilation|traces methods as compiled 
V8/V9|-XX:+UseV8InstrsOnly|Done autmatically on both systems, force architecture using these flags (Sparc/debug only)

Java HotSpot VM 和 "_JVM_ARGS" 环境变量等同的选项
----------
_JVM_ARGS |	HotSpot 选项|描述
-|-|-
bound_threads|-XX:+UseBoundThreads|This option forces all threads to be created as bound threads. 
fixed_size_young_gen|-XX:NewSize=<size> -XX:MaxNewSize=<size> for 1.3 -Xmn<size> for 1.4|Disable young generation resizing.To do this on HotSpot, simply set the size of the young generation to a constant. 
gc_stats|-verbose:gc|Turns on various forms of gc statistics gathering. 
ims_concurrent|none|  
inline_instrs|-XX:MaxInlineSize=<size>|Integer specifying maximum number of bytecode instructions in a method which gets inlined. 
 ^ |-XX:FreqInlineSize=<size>|Integer specifying maximum number of bytecode instructions in a frequently executed method which gets inlined. 
inline_print|-XX:+PrintInlining|Print message about inlined methods (debug only) 
no_parallel_gc|none|
sync_final|none|
yield_interval|-XX:DontYieldALotInterval=<ms>|(debug only) Interval in milliseconds between yields. 
monitor_order|none

术语
====
这里列举一些不易直接看懂的术语

Tenured Generation
: 老年代

参考
====

* 设置代理,远程JMX等 http://docs.oracle.com/javase/8/docs/technotes/guides/management/agent.html
* GC关系图 https://blogs.oracle.com/jonthecollector/entry/our_collectors
* Metaspace http://javaeesupportpatterns.blogspot.com/2013/02/java-8-from-permgen-to-metaspace.html
* jvm参数 http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html
* http://docs.oracle.com/javase/8/docs/technotes/guides/jpda/conninv.html
* http://docs.oracle.com/javase/8/docs/technotes/guides/jvmti/
* http://www.oracle.com/technetwork/java/javase/documentation/index.html
* Java HotSpot Equivalents of Exact VM Flags http://www.oracle.com/technetwork/java/javase/tech/exactoptions-jsp-141536.html
* http://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html
