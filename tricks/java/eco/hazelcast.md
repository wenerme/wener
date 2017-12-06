# Hazelcast

* IMDG - In Memory Data Grid - 内存数据网格
* Near Cache - 近缓存,会将从集群中获取到的数据缓存在本地

* [文档](http://docs.hazelcast.org/docs/latest/manual/html-single/index.html)

## Tips
* [hazelcast/hazelcast](https://github.com/hazelcast/hazelcast)
* Hazelcast [Plugins](https://hazelcast.org/plugins/)
* [Features](https://hazelcast.org/features/)
* 企业版
  * WAN 复制
  * 热重启, 不丢失数据
  * 管理中心
  * 滚动升级
  * 认证,授权
* hazelcast < 5MB
* Features
  * Distributed implementations of `java.util.{Queue, Set, List, Map}`.
  * Distributed implementation of `java.util.concurrent.locks.Lock`.
  * Distributed implementation of `java.util.concurrent.ExecutorService`.
  * Distributed `MultiMap` for one-to-many relationships.
  * Distributed `Topic` for publish/subscribe messaging.
  * Distributed Query, MapReduce and Aggregators.
  * Synchronous (write-through) and asynchronous (write-behind) persistence.
  * Transaction support.
  * Specification compliant JCache implementation.
  * Native Java, .NET, C++ clients, Memcache and REST clients.
  * Socket level encryption support for secure clusters.
  * Second level cache provider for Hibernate.
  * Monitoring and management of the cluster via JMX.
  * Dynamic HTTP session clustering.
  * Support for cluster info and membership events.
  * Dynamic discovery, scaling, partitioning with backups and fail-over.

```yml
# 是否启用 3.6 中添加的自定义服务发现
hazelcast.discovery.enabled: true
```

```bash
# 通过 REST 接口获取集群状态
curl --data "dev&dev-pass" http://127.0.0.1:5701/hazelcast/rest/management/cluster/state
```

## Hazelcast Jet
* 流处理
* Hazelcast [Jet](https://hazelcast.com/products/jet/)
* Jet [Features](http://jet.hazelcast.org/features/)
* Jet [Manual](http://docs.hazelcast.org/docs/jet/latest/manual/)

## Notes
* 默认分片数为 271
* lite-member
  * 不存储数据但可执行任务和添加监听,不影响集群
  * 不参与分片
* Smart Client 对整个集群有感知,在客户端会维护分片表,客户端会直接发送请求到相应的服务节点
* Dummy Client 对集群无感知,请求由服务端进行转发
* 成员属性是否会缓存在本地?
* 想要安全的关闭本地节点不导致数据丢失需要检测节点是否安全
* 可对单个分布式对象(Map/List)指定一个 Quorum, 即只有满足给定的节点数量时该对象才可操作
* Management Center
  * [Getting Started to Management Center](http://docs.hazelcast.org/docs/latest/manual/html-single/index.html#getting-started-to-management-center)
  * 社区版限制为 2 个成员
  * 主要功能
    * 脚本
    * 控制台
    * 警告
    * 权限管理
    * 热重启
    * Caches
    * Maps
    * Replicated Maps
    * Queues
    * Topics
    * MultiMaps
    * Executors
    * WAN
    * Members
* 事件监听
  * MembershipListener
  * InstanceListener
  * MigrationListener
  * DistributedObjectListener
  * PartitionLostListener
* 扩展
  * com.hazelcast.nio.ssl.SSLContextFactory
  * com.hazelcast.spi.discovery.DiscoveryStrategy
  * com.hazelcast.core.QueueStore
* 集合
  * 监听
    * ItemListener
  * 类型
    * Queue
    * Set
    * List
* Map
  * 监听
    * EntryListener
    * MapListener
    * MapClearedListener
    * MapEvictedListener
    * EntryAddedListener
    * EntryEvictedListener
    * EntryRemovedListener
    * EntryMergedListener
    * EntryUpdatedListener
  * 扩展
    * com.hazelcast.map.merge.MapMergePolicy
      * com.hazelcast.map.merge.PutIfAbsentMapMergePolicy
  		* com.hazelcast.map.merge.HigherHitsMapMergePolicy
  		* com.hazelcast.map.merge.PassThroughMergePolicy
  		* com.hazelcast.map.merge.LatestUpdateMapMergePolicy
    * com.hazelcast.partition.PartitionLostListener
    * com.hazelcast.core.MapStore
    * com.hazelcast.core.MapLoader
* Query
  * com.hazelcast.query.Predicate
* Cache
* Topic
  * com.hazelcast.core.MessageListener
* Reliable Topic
  * 接口同为 ITopic
  * 但内部使用 Hazelcast Ringbuffer 数据结构
* JobTracker
  * 主要用来做 MR
* Semaphore
* Lock
* Ringbuffer
  * 配置项
    * 容量
    * TTL
    * 备份数量
    * 异步备份数量
    * 内存格式
    * 存储
  * 扩展
    * com.hazelcast.core.RingbufferStore
* 序列化
  * 扩展
    * com.hazelcast.nio.serialization.IdentifiedDataSerializable
    * com.hazelcast.nio.serialization.DataSerializableFactory
    * com.hazelcast.nio.serialization.DataSerializable
    * com.hazelcast.nio.serialization.Portable
* 服务
* Quorum
  * 监听
    * com.hazelcast.quorum.QuorumListener
* 用户代码部署
  * 默认关闭
  * 如果开启了, 则允许从其他集群成员加载类
  * 简化部署, 不需要在所有节点都部署类
  * 配置
    * 类缓存模式
    * 控制如何处理类加载请求
    * 黑名单前缀
    * 白名单前缀
    * 提供方过滤
      * 例如只从 lite 节点请求
* `com.hazelcast.core.server.StartServer`
  * 默认启动类


## 线程模型

* IO 线程
  * 默认为 hazelcast.io.thread.count=3, 即 1 接收, 3 读, 3 写
  * 读写有自己的 Selector.select 事件分发
  * 当发现读或写线程负载不均衡的时候,会自动调整,可通过 hazelcast.io.balancer.interval.seconds=20 控制,设置为 < 0 即关闭
  * 当读线程在读取时发现该包为操作或事件时,会将其迁移到相应的线程做后续的接收处理
  * 线程分类
    * 请求接收线程
    * 读线程
      * 可通过 hazelcast.io.input.thread.count 单独控制
    * 写线程
      * 可通过 hazelcast.io.ouput.thread.count 单独控制
* Event 线程
  * 线程数量 hazelcast.event.thread.count=5
  * 事件队列 hazelcast.event.queue.capacity=1000000
  * 放入事件队列的超时时间 hazelcast.event.queue.timeout.millis=250
* IExecutor 线程
  * 通过 `ExecutorConfig` 或 `<executor>` 控制
  * 是 Hazelcast 提供的服务而不是内部使用的线程
* Operation 线程
  * 分片关联
    * 线程数 hazelcast.operation.thread.count property=Max(CORE * 2, 2)
    * 线程选择方式 `threadIndex = partitionId % partition thread-count`
    * 不宜在这类线程中操作过长的操作,线程阻塞会导致后续分片的操作受到影响
  * 通用
    * 线程数 hazelcast.operation.generic.thread.count=Max(CORE / 2, 2)
    * 所有非分片相关的操作都在这类线程中操作
    * 所有的操作都在 genericWorkQueue
  * 优先
    * 所有的操作都在 genericPriorityWorkQueue
    * 通用线程会先检查 genericPriorityWorkQueue

### 慢操作检测
```
hazelcast.slow.operation.detector.enabled
hazelcast.slow.operation.detector.log.purge.interval.seconds
hazelcast.slow.operation.detector.log.retention.seconds
hazelcast.slow.operation.detector.stacktrace.logging.enabled
hazelcast.slow.operation.detector.threshold.millis
```

## Version
* [Release Notes](http://docs.hazelcast.org/docs/rn/index.html)

## IMDG 4.0
Java 8 Language Level
Lift the language level for Hazelcast members and their API to Java 8. Add a new Java 8
client. Continue to maintain the Java 6 compatible client. This will allow us to take advantage
of Java 8 language features.
Java 9 Modularisation Java 9 modularisation for Hazelcast IMDG, which introduces Jigsaw - a new modular
systems with a strict enforcement of module boundaries.
Proper Separation of Public and
Private APIs Re-design of the whole private/public API to keep as much private as possible.
Public and Stable SPI Make SPI a second public and stable API. This work includes many refactorings, client
protocol enhancements, documentation efforts, and reference implementations.
EntryProcessor Contract
Formalisation
Optimization of the EntryProcessor which would bring the IMap behaviour inline with the
JCache behaviour.
Unification of Client / Member
Behaviour in Exceptional States
Equalization of exceptions in client-side and member-side so that clients can throw the same
exceptions as server whenever possible. This work also includes a documentation effort on
exceptional cases for each method.

## IMDG 3.9
* Features
Near Cache: Key Store-byReference
Option Key store-by-reference option for IMap and Hazelcast JCache Near Cache.
Dynamic Creation of Specificly
Configured Distributed Objects Ability to define new data structures with custom configuration on the fly.
Gigantic Cache Migration
Enhancements Improvements in partition migration process to allow better gigantic cache migrations.
Lazy Initiation for Java Client An async client factory to connect lazily and in a non-blocking manner.
Client Support for User Code
Deployment Dynamic Classloading from clients for User Code Deployment.
Query Async API Async query methods on the IMap

* Security Features
Mutual TLS Auth Java Client Allow a member to authenticate a client using a certificate installed in the client
Mutual TLS Auth C# Client Allow a member to authenticate a client using a certificate installed in the client
Management Center TLS TLS from members to Man Center. TLS from browser. TLS for REST endpoint
TLS for REST endpoint on
Members
General Security Hardening Implement things like password blacklisting, password complexity requirements, toggling off
of non-secure mechanisms when secure version is enabled and so on
Fast SSL/TLS Make SSL/TLS almost as fast as unencrypted.

* New Hazelcast IMDG 3.9 Enterprise Features
Dynamic Addition of WAN
Endpoints Ability to add WAN Targets to a running cluster.
NearCache Stats in Management
Center
Provision of showing data inside Near-Cache of client or member, similar to IMap/Cache in
Management Center.
Search Indexes in HD Memory Support for sorted and unsorted indexes in Hazelcast HD Memory Store.

* New Hazelcast IMDG 3.9 Clients Features
Simulator Integrations of
C++, Python, and Node.js Clients Integration of C++, Python, and Node.js clients into Hazelcast Simulator.
SSL Performance Improvements
for .NET Client Large performance increase in SSL when using the .NET Client.
Projections for .NET Client Add projections (returning attributes rather than full values) to .NET.
Paging Predicate for .NET Client Support for paging predicates in Hazelcast .NET Client.
ExecutorService for C++ Client Ability to use the distributed ExecutorService from Hazelcast C++ Client.
Near Cache for C++ Client Add near cache to C++ client
TLS for C++ Client Add TLS encryption for C++ Clients communicating with members

* New Hazelcast IMDG 3.9 Cloud & Plugins Features
Google Cloud Platform Integration SPI Plugin for GCP for Cloud Discovery with a support for partition groups.
AWS support for C++ Client We have comprehensive cloud support for Java. Adding AWS to C++.
Stats for Hibernate
LocalRegionCache Ability to provide statistics for Hibernate LocalRegionCache.
Web Sessions for WebSphere
Liberty Web sessions replication plugin for WebSphere Liberty

### IMGD 3.8
* http://hazelcast.com/content/Whats_New_in_Hazelcast_IMDG_3.8_Slides.pdf
* Scheduled Executor Service
  * Delays operations for single execution or
  * Offers to schedule tasks for recurring events
  * Supports execution with member selection
* Continuous Query Cache – open sourced!
  * Keeps a local cache on clients or members
  * Local cache is automatically updated
  * Predicate is used to create a view on-top of the overall dataset
* Query Projection
  * Helps to optimize traffic
  * Offers functionality similar to SELECT x, y, z queries
  * Optimized handling of large object hierarchies
* Revised Aggregations API
  * Fast way to retrieve standard aggregates, such as min, max, avg, …
  * Supports the usage of existing indexes
  * Easy to use API
* User Code Deployment
  * Lite-Member contains additional classes
  * Black- and Whitelisting support
  * Remote Class Caching support
  * Security Restrictions support
* Rolling Upgrades
* New Hazelcast IMDG 3.8 Features
  * Fast Aggregations Based on Queries
  * 用户代码部署
    * 可访问和使用用户定义的类, 不需其类要在类路径中
  * 查询映射
  * 实现 RingBuffer 存储
  * 持续查询
    * 之前为企业版功能, 现在开源了
  * 统一 IMap 和 JCache 的 Near Cache 实现
  * Near Cache 性能提升
  * Eventually Consistent Near Cache
    * A guarantee of delivery of cache invalidations to the near cache.
  * HyperLogLog
    * 实现了 HyperLogLog 数据结构
  * Scheduled Executor Service
    * 分布式的  java.util.concurrent.ScheduledExecutorService
  * Queue 和 Lock 支持 Quorum
* New Hazelcast IMDG 3.8 Enterprise Features
  * Rolling Member Upgrades for Minor Releases
    * Extending current rolling upgrade capability of Hazelcast IMDG (client rolling upgradeability, patch version rolling member upgrades) to allow heterogeneous versions of Hazelcast IMDG members to be rolling upgraded without service interruption for minor version changes.
  * Copying HRS Data from a Source to a Target Cluster
    * Ability to copy the Hot Restart store files from a source environment to a target environment (for example, product to test environment). This feature also applies to running sources.
  * One-Off WAN Sync with Dynamically Added Endpoint
    * Ability to copy all Maps’ content to a target cluster dynamically in runtime.
  * SSL Performance Improvements (Java)
    * Large performance increase in SSL when using the Java client.
  * LDAP Integration for Management Center
    * Authentication and authorizarion with LDAP in Management Center.
  * Many Management Center Enhancements
    * More metrics, stats, and improved usability and monitoring.
* 新的客户端特性
  * 使用 TLS 证书作为授权
  * Simulator Integration for Hazelcast .NET Client
  * Node.js 客户端增强
    * RingBuffer, Topic, and Near Cache Support for Node.js client.
  * Node.js 客户端支持 SSL
  * Near Cache Support for C++ Client
  * AWS Discovery for C++ Client
* New Hazelcast IMDG 3.8 Plugins Features
  * Pivotal® CloudFoundry
  * IBM DynaCache API Support
  * Discovery SPI based AWS Module
  * Striim Hot Cache Adapter
  * Hibernate 5.2 Support
