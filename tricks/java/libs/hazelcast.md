# Hazelcast

* IMDG - In Memory Data Grid - 内存数据网格
* Near Cache - 近缓存,会将从集群中获取到的数据缓存在本地

* [文档](http://docs.hazelcast.org/docs/latest/manual/html-single/index.html)

## Tips

* 默认分片数为 271
* lite-member 不存储数据但可执行任务和添加监听,不影响集群
* Smart Client 对整个集群有感知,在客户端会维护分片表,客户端会直接发送请求到相应的服务节点
* Dummy Client 对集群无感知,请求由服务端进行转发
* 成员属性是否会缓存在本地?
* 想要安全的关闭本地节点不导致数据丢失需要检测节点是否安全
* 可对单个分布式对象(Map/List)指定一个 Quorum, 即只有满足给定的节点数量时该对象才可操作

```yml
# 是否启用 3.6 中添加的自定义服务发现
hazelcast.discovery.enabled: true
```

```bash
# 通过 REST 接口获取集群状态
curl --data "dev&dev-pass" http://127.0.0.1:5701/hazelcast/rest/management/cluster/state
```

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
