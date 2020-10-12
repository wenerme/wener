---
id: hot-qa
title: 热门问题
---


LinkedList vs ArrayList
========================

http://stackoverflow.com/questions/5846183/arraylist-vs-linkedlist

时间复杂度比较
------------

操作\类型| `LinkedList<E>` |  `ArrayList<E>`
| ------------- |:-------------:|:-----:|
get(int index) | O(n) | O(1) :star:
add(E element) | O(1) | O(1) 最坏: O(n)
add(int index, E element) | O(n) |  O(n - index) 最坏: O(n)
remove(int index) | O(n) :star: | O(n - index) (比如移除最后一个是 O(1))
ListIterator.add(E element) | O(1) :star: | O(n - index)

注:

* 之所以 ArrayList 有最坏情况, 是因为如果达到了 ArrayList 的容量上限, 那么需要创建新数组, 然后拷贝整个数组.
* ArrayList 实现了 标记接口(Mark interface) [RandomAccess](http://docs.oracle.com/javase/7/docs/api/java/util/RandomAccess.html), 表示该集合可以进行随机访问.
* 一般来说 LinkedList 比 ArrayList 需要更大的空间, 而且存储的数据越多, LinkedList 要的空间越大, 因为一个节点有前节点和后节点的指针.
* 标注有 :star: 的为该类型的主要优势

jvm 调优
========

调优需要考虑个问题
---------

* JVM 发布商和版本
* 对堆大小和垃圾收集进行调优
* 选择一个垃圾收集方案
	* 对于不同厂商的 JVM 选项可能不同
	* 对于不同类型的应用, 选择适当的垃圾收集方案可能会更高效
	 -verbosegc 详细输出 jvm 垃圾收集信息
	 -Xverbosegc:file=/tmp/gc$$.out $$ 指代PID
		* 分析多久会继续一次垃圾收集
		* 一次垃圾收集会使用多长时间
		* 平均内存足迹
	* 确保堆小于可用RAM
	* 如果发现花费了大量的时间进行垃圾收集, 应该降低堆大小
* 混合 服务器/客户端 JVM
* UNIX 线程模型

* 在进行调优前线对代码进行评测(profiling)

参考
-----
* [Jvm 调优指导](http://docs.oracle.com/cd/E13222_01/wls/docs81/perform/JVMTuning.html)
* [JVM 参数说明](http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html)
* [JVM 配置参考](http://docs.oracle.com/cd/E22289_01/html/821-1274/configuring-the-default-jvm-and-java-arguments.html)
* [GC 调优](http://www.oracle.com/technetwork/java/javase/gc-tuning-6-140523.html)
* [JVM 在线文档](http://www.oracle.com/technetwork/java/javase/tech/index-jsp-137187.html)
* [Java 性能调优网站](http://www.javaperformancetuning.com/)

HashMap vs HashTable
=====================
http://stackoverflow.com/questions/40471/

* HashTable 是同步的
* HashTable 不允许 null 键和 null 值
* HashTable 与 HastMap 的关系就像是 Vector 和
	ArrayList 的关系.Vector 和 Hashtable 都是
	不再建议使用的, 可以使用
		Collections.synchronizedMap(HashMap)
		Collections.synchronizedList(ArrayList)
* 在多线程中时, 应该使用 ConcurrentHashMap
* Iterator in the HashMap is fail-safe while the enumerator for the Hashtable is not and throw ConcurrentModificationException if any other Thread modifies the map structurally by adding or removing any element except Iterator's own remove() method. But this is not a guaranteed behavior and will be done by JVM on best effort.
	* Fail-safe 是与迭代器上下文相关的概念. 如果一个Collection的迭代器被创建了, 但是其他的线程同时在对该 Collection 进行结构化的修改(删除,插入), 那么会抛出 ConcurrentModificationException 异常. 但可能通过调用 set 方法来修改值, 因为这样没有修改 Collection 的结构. 如果在修改结构前先调用 set, 则会抛出 IllegalArgumentException

参考
----
* [Java 集合框架 on Oracle docs](http://docs.oracle.com/javase/7/docs/technotes/guides/collections/index.html)
	
Hibernate vs MyBatis
=====================

* 根据不同的场景选择不同的技术
* 这两个技术是不相互冲突的
* 只是为了完成不同的目的

* CQRS(Command Query Response Segregation)
	思想:将查询分离出来, 因为查询是使用最多的,要求非常高效
		同时查询关系之间不会太复杂

比较
---
	
* Hibernate 是以对象为中心
* MyBatis 是以数据库为中心
* 如果能对数据库 schema 进行完全控制
	并且不要求非常高的效率.那么使用对象模型是非常方便的
* 如果是需要处理操作 老旧 的数据库模型, 需要使用复杂的SQL查询
	那么选择 MyBatis 就很好
* Hibernate 对于需要大量 增删改查 的操作非常有利
* MyBatis 对于只进行大量 查询 的操作非常有利
* 即便是使用简单的 Hibernate 来查询, 也会加载整个的对象图来进行操作
	所以这时候使用 Hibernate 是非常低效的.



参考
----
* [what-are-the-advantages-of-mybatis-over-hibernate on stackexchange](http://programmers.stackexchange.com/questions/158109)
* [Martin Fowler 的 CQRS 文章](http://martinfowler.com/bliki/CQRS.html)
* [hibernate-vs-ibatis on stackoverflow](http://stackoverflow.com/questions/1984548/)
* [Command–query separation](http://en.wikipedia.org/wiki/Command%E2%80%93query_separation)


Tomcat 调优
==========

Tomcat 调优有两点

1. 优化 tomcat
2. 优化 应用程序

18 个优化的小点
--------------
整理自 [18-java-tomcat-application-optimization-tips](http://blog.monitis.com/2011/08/06/18-java-tomcat-application-optimization-tips/)

下面所述的部分相关操作都在 [jasper-howto] 找得到, 主要是使用里面的 Production Configuration

1. Precompile Java Server Pages
	预编译 JSP, [操作方法](http://tomcat.apache.org/tomcat-8.0-doc/jasper-howto.html#Web_Application_Compilation)
1. Set Development to “False”
	关闭开发模式
1. Set genStringAsCharArray to “True”
	设置 genStringAsCharArray 为 true
1. Set modificationTestInterval Higher
	设置更高的 modificationTestInterval
1. Set trimSpaces to “True”
	设置 trimSpaces 为 true
1. Replace Dynamic Pages With Static Pages
	使用静态页面替换动态页面
1. Cache Pages
	缓存页面
1. Use a Profiler
	使用分析器 (e.g., JProbe, JProfiler) 
1. Find the Bottlenecks
	查找瓶颈, 注意瓶颈是否发生在线程同步
1. Understand the Application’s Connection Usage Patterns
	理解应用连接的使用情况
1. Use Connection Pooling
	使用连接池
1. Set an Appropriate Maximum for Number of Threads Per Connector
	为连接器设置一个合适的最大线程数
1. Set an Appropriate Value for maxKeepAliveRequests
	为 maxKeepAliveRequests 设置一个合适的值
1. Set Timeout and KeepAliveTimeout As Low As Possible
	把 Timeout 和 KeepAliveTimeout 设置的较量小
1. Identify Memory Leaks
	发现内存溢出
1. Beware of Redeployment Memory Leaks
	注意从新部署时的内存溢出
1. Cache Static Content in the Client Web Browser
	在客户端浏览器缓存静态资源
1. Use HTTP Rather Than HTTPS
	使用 HTTP 而不是 HTTPS

参考
----

* [jasper-howto]
* [Tomcat FAQ](http://wiki.apache.org/tomcat/FAQ)
* [optimizing-tomcat-7-for-best-performance](http://shereifhawary.blogspot.com/2013/04/optimizing-tomcat-7-for-best-performance.html)
	
	
	[jasper-howto]: http://tomcat.apache.org/tomcat-8.0-doc/jasper-howto.html
	
