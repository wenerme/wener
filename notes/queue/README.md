# Queue

* http://queues.io/
* http://bravenewgeek.com/benchmarking-message-queue-latency/

Dump pipe, Smart endpoint.

https://github.com/uber/cherami-server
Distributed, scalable, durable, and highly available message queue system. 

https://eng.uber.com/cherami/

## Nats vs NSQ

* Nats
  * 专注 Pub/Sub
  * 内存处理
* NSQ
  * 默认情况下是不持久化的

## Cherami
* https://eng.uber.com/cherami/
* 基本要求
  * 持久化,不丢失,允许硬件错误
  * 在出现网络异常时可以很灵活的在 AP 和 CP 之间调整
  * 可以能够对每个队列进行扩缩容
  * 支持竞争消费的消费模型
  * 语言无关
* 设计理念
  * 选择最终一致. 这样保证了高可用和持久化, 但牺牲了顺序性.不过这样保证了即使在硬件或网络异常时也能处理请求.
  * 不支持 partitioned consumer pattern, 不将分片暴露给用户.简化了消费者管理,简化配置使得消费者和生产者可以独立扩容.
