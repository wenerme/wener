---
title: Redis 流简介
slug: redis-stream-intro
tags:
  - Java
  - 阿里
  - Redis
---

## 概述

对 Redis 的印象可能很多人都还只停留在 2.8 的阶段，一个结构化的内存存储（嗯，好像也没什么问题）。虽然距离 4.0 发布(2017.7.14)已经一年过去了，但相信很多人已经不再去关心 Redis 的新特性了，因为从 2.8 后的 Redis 已经足够好用了。😄

Redis 3.0 添加了集群的能力，4.0 添加了模块化能力，5.0 添加了流类型。如果说 3.0 和 4.0 添加的新特性对于一般用户来说无足轻重，那 5.0 新的流类型就不可忽视啦！

在没有 Stream 类型之前，其实 Redis 也支持各种类似于流的处理模式，例如 Fire and forget 模式的 Pub/Sub，阻塞队列 BLPOP，时间序列 zsort 存储，等各种方式都能模拟类似的场景，但却都觉得有点欠缺，终于，流类型成功的解决了以上所有问题，并能支持其他的常见使用场景。

说到流消息就不得不说到 Kafka 啦，我相信大家应该都听说过消息中间件 Kafka，至于 RocketMQ 或者 MetaQ 就不再赘述他们与 Kafka 的关系啦，Redis 作者在实现流类型时大量参考了 Kafka 中的概念，例如消费模型，流消息的概念。当然所有的参考只局限于 Kafka 的文档，与 Kafka 的代码实现没有任何关系哦。

心动不如心动，那先一睹为快吧。

<!-- more -->

## 环境准备

如果你是 macOs 用户，并且安装了 brew（如果没有安装，那建议先安装 `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`），那么只需要

```bash
brew install redis
```

即可，如果你是非 macOs 用户，那要嘛考虑换 mac，要嘛使用 docker 启动

```bash
docker run --rm -it -p 6379:6379 -v $PWD:/data --name redis redis:alpine
# 题外话: 使用 alpine 更小更省心，强烈推荐，有任何使用问题都可以交流哦，至于有多好，在这里怕是说不完。

# 验证安装的版本
docker exec redis redis-cli info server
# 客户端链接
docker exec -it redis redis-cli
```

一切准备就绪，就开始实践吧。既然流是新的数据类型，那我们就先从支持的操作开始吧。

## 命令列表

Stream 类型一共支持 13 个[命令](https://redis.io/commands#stream)，这里简单列举一下支持的命令。

| 命令       | 功能概述                                         |
| ---------- | ------------------------------------------------ |
| xinfo      | 获取消费者，分组和流信息                         |
| xadd       | 添加消息到流                                     |
| xtrim      | 将流重置为指定大小                               |
| xdel       | 通过 ID 删除                                     |
| xrange     | 返回范围内的消息，特殊起始 + -                   |
| xrevrange  | 与 xrange 相同，但返回顺序相反                   |
| xlen       | 获取流长度                                       |
| xread      | 从流中指定 id 开始读取指定量消息，可选择阻塞返回 |
| xgroup     | 管理消费组                                       |
| xreadgroup | 以订阅组成员的身份读取流消息 - 即订阅/消费消息   |
| xack       | 响应消息被正确处理                               |
| xpending   | 查询正在处理中的消息 - 尚未 ACK 的消息           |
| xclaim     | 获取正在处理中的消息                             |

在开始之前，简单概述一下使用过程中需要注意的点

1. 流消息内容是字典 - 即 KV 结构
2. 每个消息有一个 ID - 128bit - 由时间戳和序列号组成
3. 插入消息时使用 `*` 作为 ID 则是由服务端生成 ID
4. ID 必须递增
5. `-`/`+` 分别表示最小和最大消息 ID
6. `$` 表示最新的消息位置，在创建消费组时使用
7. `>` 表示最新消费的消息位置，在消费消息时使用

## 命令交互

```bash
# 往流中添加消息 - 会返回消息 ID
# 手动指定 ID
xadd s 1-0 name wener age 18
xadd s 1-1 name wen age 17
# 由服务端生成消息 ID
xadd s * name xx age 16
# 返回所有消息
xrange s - +
# 返回第一条
xrange s - + count 1
# 返回最后一条
xrevrange s + - count 1
# 返回消息长度
xlen s

# 读第一条消息
xread count 1 streams s1 0-0
# 读取第二条 - 指定的消息 ID 是 1-0 ，会返回这个 ID 之后的消息
xread count 1 streams s1 1-0

# 模拟消息的 Roling 处理
# ------
del s
# 在插入消息时，可限制消息的最大长度，类似于 rolling 日志文件的逻辑
# 逻辑等同于先 add 再 trim
# 插入时限制最大长度 2
xadd s MAXLEN 2 * ts 1
xadd s MAXLEN 2 * ts 2
xadd s MAXLEN 2 * ts 3
xadd s MAXLEN 2 * ts 4
# 流中只会有 3 4 这两条消息
xrange s - +

# 消费组
# ======
# 重置流内容
del s
# 创建消费组 g1 并将消费位置置为最新消息位置 $
# 因为 s 不存在，指定 MKSTREAM 会自动创建一个空的流 s
xgroup create s g1 $ MKSTREAM
# 添加新的消息
xadd s 1-1 name zz age 16
# 会返回最新插入的消息，当前消费者为 c1
xreadgroup group g1 c1 count 1 streams s >
# 当消息处理完成后对服务端进行响应
xack s g1 1-1

# 模拟消息处理失败场景
# ------
# 添加新的消息
xadd s 1-2 name aa age 16
# 由 c2 消费
xreadgroup group g1 c2 count 1 streams s >
# 但在处理过程中异常，未 ACK，此时通过 pending 查看 c2 堆积的消息
xpending s g1 - + 1 c2
# c1 有能力处理，因此可以将 c2 处理失败的消息拿过来处理
# retrycount 由应用自己维护，记录重试次数
# 500 为表示该消息的处理时间超过 500ms 才能“拿”过来
xclaim s g1 c1 500 1-2 retrycount 2
# c1 成功处理该消息
xack s g1 1-2
```

Stream 的操作相当简介，能实现什么样的功能主要取决于业务的设计。使用 cli 完成了基本的操作再来看看 Java 的操作吧。

## Java 交互

[lettuce](https://github.com/lettuce-io/lettuce-core) 是一个基于 Netty 的异步 Redis 客户端，在最新版中支持了 Stream 的操作。

**生产和消费**

```java
public void stream() throws InterruptedException {
    RedisClient client = RedisClient.create("redis://localhost");
    StatefulRedisConnection<String, String> connection = client.connect();
    // 流的名字
    String streamName = "s";
    // 消费组名
    String groupName = "g1";

    AtomicInteger counter = new AtomicInteger();
    // 总消息量
    long total = 1000000;
    // 并发生产
    int producerCount = 2;
    // 并发消费
    int consumerCount = 4;
    for (int i = 0; i < producerCount; i++) {
        int id = i;
        CompletableFuture.runAsync(() -> {
            String name = "producer." + id;
            StatefulRedisConnection<String, String> connect = client.connect();
            while (true) {
                int n = counter.incrementAndGet();
                if (n > total) {
                    return;
                }
                // 同步生产
                Timer.Context context = metrics.timer(name).time();
                connect
                        .sync()
                        .xadd(streamName, "ts", String.valueOf(System.currentTimeMillis()), "i", String.valueOf(n))
                ;
                context.close();
            }
        });
    }

    for (int i = 0; i < consumerCount; i++) {
        StatefulRedisConnection<String, String> connect = client.connect();

        // 消费的上下文
        ConsumerContext c = new ConsumerContext();
        c
                .setConnection(connect)
                .setConsumer(Consumer.from(groupName, "c" + i))
                .setStreamName(streamName)
                .setGroupName(groupName)
                .setName("consumer." + i)
                .setXReadArgs(XReadArgs.Builder.block(Duration.ofSeconds(5)))
                .setXreadLastOffset(XReadArgs.StreamOffset.lastConsumed(streamName))
        ;
        // 异步消费
        consume(c);
    }

    Thread.sleep(Duration.ofMinutes(10).toMillis());
}


private CompletionStage<?> consume(ConsumerContext c) {
    Timer.Context context = metrics.timer(c.name).time();
    return c.connection
            .async()
            .xreadgroup(c.consumer, c.xReadArgs, c.xreadLastOffset)
            // 消息处理
            .thenCompose(v -> {
                context.close();
                if (v.isEmpty()) {
                    metrics.meter(c.name + ".empty").mark();
                    return CompletableFuture.completedFuture(null);
                }
                StreamMessage<String, String> message = v.get(0);

                // 输出一定日志量
                if (ThreadLocalRandom.current().nextDouble() < 0.01) {
                    log.info("[{}] {}", c.name, message.getBody());
                }

                // 成功处理
                return c.connection.async().xack(c.streamName, c.groupName, message.getId());
            })
            // 异常处理
            .exceptionally(e -> {
                metrics.meter(c.name + ".error").mark();
                return null;
            })
            // 循环 - 没有推出逻辑
            .thenCompose((v) -> consume(c));
}


@Data
@Accessors(chain = true)
public static class ConsumerContext {
    String name;
    String streamName;
    String groupName;
    Consumer<String> consumer;

    StatefulRedisConnection<String, String> connection;

    XReadArgs.StreamOffset<String> xreadLastOffset;

    XReadArgs xReadArgs;
}
```

**处理未成功的消息**

同步操作，逻辑相对清晰

```java
public void testClaimPendingSingleThreadSync() {
    RedisClient client = RedisClient.create("redis://localhost");
    StatefulRedisConnection<String, String> connection = client.connect();
    String streamName = "s";
    String groupName = "g1";

    RedisCommands<String, String> sync = connection.sync();
    Consumer<String> consumer = Consumer.from(groupName, "c1");
    Range<String> fullRange = Range.create("-", "+");

    while (true) {
        try (Timer.Context ignored = metrics.timer(consumer.getName() + ".pending").time()) {
            PendingResult result = PendingResult.of(sync.xpending(streamName, consumer, fullRange, Limit.from(1)));

            if (!result.hasPending()) {
                break;
            }

            List<StreamMessage<String, String>> list = sync.xclaim(
                    streamName,
                    consumer,
                    new XClaimArgs().minIdleTime(500).retryCount(result.getDeliverCount() + 1),
                    result.getMessageId()
            );
            if (list.isEmpty()) {
                continue;
            }
            StreamMessage<String, String> message = list.get(0);
            if (ThreadLocalRandom.current().nextDouble() < 0.001) {
                log.info("[{}] {}", consumer.getName(), message.getBody());
            }
            sync.xack(streamName, groupName, message.getId());
        }
    }
}

/**
 * Pending 返回的结果处理
 */
interface PendingResult {
    static PendingResult of(List<Object> v) {
        return () -> v;
    }

    List<Object> getResult();

    default boolean hasPending() {
        List<Object> result = getResult();
        if (result != null && !result.isEmpty()) {
            List list = (List) result.get(0);
            return !list.isEmpty() && list.get(0) != null;
        }
        return false;
    }

    default String getMessageId() {
        return String.valueOf(((List) getResult().get(0)).get(0));
    }

    default String getConsumer() {
        return String.valueOf(((List) getResult().get(0)).get(1));
    }

    default long getElapseTime() {
        return ((Number) ((List) getResult().get(0)).get(2)).longValue();
    }

    default long getDeliverCount() {
        return ((Number) ((List) getResult().get(0)).get(3)).longValue();
    }
}

```

某次的性能统计

```
Java CPU 70%
c1.pending
             count = 769903
         mean rate = 3360.66 calls/second
     1-minute rate = 3267.08 calls/second
     5-minute rate = 2855.18 calls/second
    15-minute rate = 2538.15 calls/second
               min = 0.22 milliseconds
               max = 1.80 milliseconds
              mean = 0.30 milliseconds
            stddev = 0.13 milliseconds
            median = 0.26 milliseconds
              75% <= 0.32 milliseconds
              95% <= 0.49 milliseconds
              98% <= 0.65 milliseconds
              99% <= 0.88 milliseconds
            99.9% <= 1.66 milliseconds
```

**处理未成功的消息**

异步操作，逻辑相对不那么清晰～

```java
public void testClaimPendingSingleThreadAsync() throws ExecutionException, InterruptedException {
    RedisClient client = RedisClient.create("redis://localhost");
    StatefulRedisConnection<String, String> connection = client.connect();
    String streamName = "s";
    String groupName = "g1";

    RedisAsyncCommands<String, String> async = connection.async();
    Consumer<String> consumer = Consumer.from(groupName, "c2");
    Range<String> fullRange = Range.create("-", "+");

    AtomicReference<Supplier<CompletionStage<?>>> process = new AtomicReference<>();
    AtomicReference<Timer.Context> context = new AtomicReference<>();
    // 一次处理
    process.set(() -> {
        context.set(metrics.timer(consumer.getName() + ".process").time());
        return async
                .xpending(streamName, consumer, fullRange, Limit.from(1))
                .thenCompose(v -> {
                    PendingResult result = PendingResult.of(v);
                    if (!result.hasPending()) {
                        throw new RuntimeException("DONE");
                    }

                    return async.xclaim(
                            streamName,
                            consumer,
                            new XClaimArgs().minIdleTime(500).retryCount(result.getDeliverCount() + 1),
                            result.getMessageId()
                    );
                })
                .thenCompose(list -> {
                    StreamMessage<String, String> message = list.get(0);
                    if (ThreadLocalRandom.current().nextDouble() < 0.001) {
                        log.info("[{}] {}", consumer.getName(), message.getBody());
                    }
                    return async.xack(streamName, groupName, message.getId());
                })
                .thenCompose(v -> {
                    context.get().close();
                    return process.get().get();
                });
    });
    // 循环
    process.get()
            .get()
            .whenComplete((v, e) -> {
                if (e != null) {
                    e.printStackTrace();
                }
                log.info("Complete");
            })
            .toCompletableFuture()
            .get();
}
```

但性能会比同步操作的性能要好呢，Java 的 CPU 也比同步的更低

```
Java CPU 50%
redis-server CPU 50%
c2.process
            count = 879207
        mean rate = 5145.76 calls/second
    1-minute rate = 5128.23 calls/second
    5-minute rate = 3779.55 calls/second
15-minute rate = 3132.92 calls/second
            min = 0.14 milliseconds
            max = 0.81 milliseconds
            mean = 0.18 milliseconds
        stddev = 0.06 milliseconds
        median = 0.16 milliseconds
            75% <= 0.19 milliseconds
            95% <= 0.29 milliseconds
            98% <= 0.34 milliseconds
            99% <= 0.40 milliseconds
        99.9% <= 0.81 milliseconds
```

## 总结

当什么时候选择 Redis 的流呢？

1. 内存存储满足需求
2. 速度要求高
3. 能接收 Redis 的持久化保障 - （保障是不一定持久 😄）

合理的应用也是需要合理的场景。

流总的来说还是很不错的，还有很多可能使用的场景在这里不做一一赘述，流的内部实现也是非常的有意思的，等有时间再做另外的一个分享。此外 Redis 4 的 Module 也是非常有魅力，例如甚至可以用 [Golang](https://github.com/wenerme/go-rm) 来实现模块添加新的命令功能，嗯嗯，机会多多。
