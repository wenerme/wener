

LinkedList vs ArrayList
========================

For LinkedList<E>
get(int index) is O(n)
add(E element) is O(1)
add(int index, E element) is O(n)
remove(int index) is O(n)
Iterator.remove() is O(1) <--- main benefit of LinkedList<E> 主要优势
ListIterator.add(E element) is O(1) <--- main benefit of LinkedList<E> 主要优势

For ArrayList<E> 能够快速的做随机访问
get(int index) is O(1) <--- main benefit of ArrayList<E> 主要优势
add(E element) is O(1) amortized, but O(n) worst-case since the array must be resized and copied
add(int index, E element) is O(n - index) amortized, but O(n) worst-case (as above)
	O(n) 最坏情况, 因为有可能调整数组大小, 对数组进行拷贝
remove(int index) is O(n - index) (i.e. removing last is O(1))
Iterator.remove() is O(n - index)
ListIterator.add(E element) is O(n - index)

一般来说 LinkedList 比 ArrayList 需要更大的空间

Jvm 调优
========
http://docs.oracle.com/cd/E13222_01/wls/docs81/perform/JVMTuning.html
JVM 参数说明 http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html
JVM 配置参考 
http://docs.oracle.com/cd/E22289_01/html/821-1274/configuring-the-default-jvm-and-java-arguments.html

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

在进行调优前线对代码进行评测

GC 调优
http://www.oracle.com/technetwork/java/javase/gc-tuning-6-140523.html

JVM 文档
http://www.oracle.com/technetwork/java/javase/tech/index-jsp-137187.html

调优相关网站
http://www.javaperformancetuning.com/

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

Java 集合框架
http://docs.oracle.com/javase/7/docs/technotes/guides/collections/index.html
	
Hibernate vs myBatis
=====================
http://programmers.stackexchange.com/questions/158109
http://martinfowler.com/bliki/CQRS.html
http://stackoverflow.com/questions/1984548/
http://en.wikipedia.org/wiki/Command%E2%80%93query_separation

根据不同的场景选择不同的技术
这两个技术是不相互冲突的
只是为了完成不同的目的

CQRS(Command Query Response Segregation)
	思想:将查询分离出来, 因为查询是使用最多的,要求非常高效
		同时查询关系之间不会太复杂

Hibernate 是以对象为中心
MyBatis 是以数据库为中心
如果能对数据库 schema 进行完全控制
	并且不要求非常高的效率.那么使用对象模型是非常方便的
如果是需要处理操作 老旧 的数据库模型, 需要使用复杂的SQL查询
	那么选择 MyBatis 就很好
Hibernate 对于需要大量 增删改查 的操作非常有利
MyBatis 对于只进行大量 查询 的操作非常有利
即便是使用简单的 Hibernate 来查询, 也会加载整个的对象图来进行操作
	所以这时候使用 Hibernate 是非常低效的.








	
	
	
	