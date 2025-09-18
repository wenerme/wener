---
title: 设计模式
---

# 设计模式

- 设计模式不是“银弹”，而是“词汇”和“工具箱”
  - 一套共通的词汇 (Vocabulary)
  - 一个工具箱 (Toolbox)
  - 一组权衡的艺术 (Art of Trade-offs)
    - 没有任何模式是完美的。采用一个模式，意味着你接受了它带来的好处，同时也必须接受它带来的成本（比如复杂性增加、开发成本提高、引入新的一致性问题等）。
    - 架构师对这些进行权衡

---

- 共享故障点 - Shared Failure Point
  - Single Point of Failure, SPOF, 单点故障
  - 找共同依赖
- 主动识别
  - 架构图梳理与依赖分析
  - 进行“如果……会怎样”的思维实验 (What-if Scenarios)
  - 混沌工程 (Chaos Engineering)
- 被动识别
  - 事故复盘 (Incident Post-mortems) 与根本原因分析 (RCA)
    - “五个为什么”分析法
  - 监控与告警数据分析
- 缓解（Mitigate）
  - 消除单点 (Eliminate): 通过冗余 (Redundancy) 和 高可用 (High Availability) 来实现
  - 隔离 (Isolate)：通过分区 (Partitioning) 或 舱壁模式 (Bulkhead Pattern) 来限制故障的影响范围。
  - 降级 (Degrade): 通过断路器模式 (Circuit Breaker Pattern) 或 优雅降级 (Graceful Degradation)，在依赖的共享服务故障时，系统核心功能依然可用，只是体验有所下降。

---

- 可靠性 (Reliability): Ambassador, Backends for Frontends, Bulkhead, Cache-Aside, Circuit Breaker, Claim Check, Compensating Transaction, Competing Consumers, Event Sourcing, Federated Identity, Gateway Aggregation, Gateway Offloading, Gateway Routing, Geode, Health Endpoint Monitoring, Index Table, Leader Election, Pipes and Filters, Priority Queue, Publisher/Subscriber, Queue-Based Load Leveling, Rate Limiting, Retry, Saga, Scheduler Agent Supervisor, Sequential Convoy, Sharding, Strangler Fig, Throttling
- 安全性 (Security): Ambassador, Backends for Frontends, Bulkhead, Claim Check, Federated Identity, Gateway Aggregation, Gateway Offloading, Publisher/Subscriber, Quarantine, Sidecar, Throttling, Valet Key
- 性能效率 (Performance Efficiency): Asynchronous Request-Reply, Backends for Frontends, Bulkhead, Cache-Aside, Choreography, Circuit Breaker, Claim Check, Competing Consumers, Compute Resource Consolidation, CQRS, Deployment Stamps, Event Sourcing, Federated Identity, Gateway Aggregation, Gateway Offloading, Gateway Routing, Geode, Health Endpoint Monitoring, Index Table, Materialized View, Publisher/Subscriber, Priority Queue, Queue-Based Load Leveling, Scheduler Agent Supervisor, Throttling, Valet Key
- 成本优化 (Cost Optimization): Claim Check, Competing Consumers, Compute Resource Consolidation, Gateway Offloading, Messaging Bridge, Publisher/Subscriber, Queue-Based Load Leveling, Sharding, Static Content Hosting, Strangler Fig, Throttling, Valet Key
- 卓越运营 (Operational Excellence): Anti-Corruption Layer, Choreography, Compute Resource Consolidation, Deployment Stamps, External Configuration Store, Gateway Aggregation, Gateway Offloading, Gateway Routing, Health Endpoint Monitoring, Messaging Bridge, Publisher/Subscriber, Quarantine, Sidecar, Strangler Fig
- AI Agent Orchestration Patterns
  - https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns

| en                               | cn                                 |
| -------------------------------- | ---------------------------------- |
| Ambassador Pattern               | Ambassador 模式                    |
| Anti-Corruption Layer Pattern    | 防腐层模式                         |
| Asynchronous Request-Reply       | 异步请求-应答模式                  |
| Backends for Frontends (BFF)     | BFF 模式                           |
| Bulkhead Pattern                 | 舱壁模式                           |
| Cache-Aside Pattern              | 缓存旁路模式                       |
| Choreography Pattern             | 协同编排模式                       |
| Circuit Breaker Pattern          | 断路器模式                         |
| Claim Check Pattern              | 大消息拆分模式                     |
| Compensating Transaction Pattern | 补偿事务模式                       |
| Competing Consumers Pattern      | 竞争消费者模式                     |
| Compute Resource Consolidation   | 计算资源整合模式                   |
| CQRS                             | 命令查询职责分离模式               |
| Deployment Stamps Pattern        | 分区部署模式                       |
| Event Sourcing Pattern           | 事件溯源模式                       |
| Federated Identity Pattern       | 联合身份模式                       |
| Gateway Aggregation Pattern      | 网关聚合模式                       |
| Gateway Offloading Pattern       | 网关卸载模式                       |
| Gateway Routing Pattern          | 网关路由模式                       |
| Geode Pattern                    | Geode 模式                         |
| Health Endpoint Monitoring       | 健康端点监控模式                   |
| Index Table Pattern              | 索引表模式                         |
| Leader Election Pattern          | 领导者选举模式                     |
| Materialized View Pattern        | 物化视图模式                       |
| Messaging Bridge Pattern         | 消息桥接模式                       |
| Pipes and Filters Pattern        | 管道与过滤器模式                   |
| Priority Queue Pattern           | 优先级队列模式                     |
| Publisher/Subscriber Pattern     | 发布/订阅模式                      |
| Quarantine Pattern               | 隔离模式                           |
| Queue-Based Load Leveling        | 基于队列的负载均衡（削峰填谷）模式 |
| Rate Limiting Pattern            | 限流模式                           |
| Retry Pattern                    | 重试模式                           |
| Saga Pattern                     | Saga 模式                          |
| Scheduler Agent Supervisor       | 调度器-代理-监督者模式             |
| Sequential Convoy Pattern        | 顺序车队模式                       |
| Sharding Pattern                 | 分片模式                           |
| Sidecar Pattern                  | 边车模式                           |
| Static Content Hosting Pattern   | 静态内容托管模式                   |
| Strangler Fig Pattern            | 绞杀榕树模式                       |
| Throttling Pattern               | 节流模式                           |
| Valet Key Pattern                | 临时访问密钥模式                   |

---

- 参考
  - https://en.wikipedia.org/wiki/Design_Patterns
  - https://sourcemaking.com/
  - https://www.baeldung.com/design-patterns-series
  - https://learn.microsoft.com/en-us/azure/architecture/patterns/
  - https://github.com/netflix/hystrix/wiki/how-it-works
  - GCP Architecture Center https://cloud.google.com/architecture
  - https://cloud.google.com/architecture/hybrid-multicloud
    - GCP Multicloud Architecture & Design Pattern
  - AWS [Cloud design patterns, architectures, and implementations](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/introduction.html)

## Retry Pattern

- 重试模式 Retry Pattern
- Problem
  - 在分布式系统中，由于网络延迟、服务暂时过载或资源瞬时不可用等原因，操作可能会短暂失败。
  - 直接将这些瞬时故障报告为永久性错误会降低系统的可用性和用户体验。
- Solution
  - 重试模式通过透明地重新尝试失败的操作来应对这些瞬时故障。
  - 其核心逻辑是捕获特定的、可被视为瞬时性的异常，然后等待一小段时间再重新发起请求。
- Strategy
  - 固定间隔 (Fixed Interval): 每次重试之间等待相同的时间。
  - 线性退避 (Linear Backoff): 每次重试增加一个固定的等待时间。
  - 指数退避 (Exponential Backoff): 每次重试后，等待时间呈指数级增长。这通常是首选策略，因为它能快速应对短暂中断，同时在服务持续不可用时避免用大量请求压垮对方。通常还会加入“抖动”（Jitter），即在等待时间上增加一个小的随机量，以避免多个实例在同一时刻同步重试，从而引发“重试风暴”。
- Implementation Considerations and Common Pitfalls
  - 幂等性 (Idempotency): 最重要的考量是，只有幂等操作才能安全地重试。幂等操作是指执行一次和执行多次的效果是相同的（例如，读取数据、删除特定 ID 的资源）。对非幂等操作（如“向账户存款100元”）进行重试可能会导致灾难性的后果（重复存款）。
  - 重试风暴 (Retry Storms): 如果一个服务宕机，所有依赖它的客户端同时开始指数退避重试，它们可能会在相似的时间点同步发起下一次尝试，导致服务刚刚恢复就立刻被流量洪峰再次压垮。引入随机抖动是缓解此问题的关键。

不要盲目使用固定间隔重试，这在持续故障场景下效果很差。指数退避通常是更安全的选择。
快速失败: 对于明确的非瞬时性错误（如 400 Bad Request, 401 Unauthorized），应立即失败，而不是徒劳地重试。重试策略必须能够区分瞬时和永久性错误。

## Cache-Aside Pattern

用程序在读取数据时，首先尝试从缓存中获取。如果缓存中没有（缓存未命中），则从数据源（如数据库）读取，并将读取到的数据放入缓存，然后再返回给应用程序。

- 应用场景:
  - 读多写少的场景，例如产品目录、新闻文章、用户信息等。
  - 希望提高读取性能、降低后端数据源压力的应用。
  - 可以容忍数据在短时间内不是最新状态（最终一致性）的场景。
- FAQ & Pitfalls
  - 缓存失效策略
  - 缓存穿透/雪崩
  - 数据一致性

## Circuit Breaker Pattern

像电路中的保险丝一样，当一个远程服务或资源持续出现故障时，断路器会“跳闸”（打开），在一段时间内阻止应用程序继续向其发送请求，而是直接返回一个错误，从而避免应用程序被拖垮，并给下游服务恢复的时间。

- 核心问题
  - 当一个下游服务持续失败时，如果上游服务继续使用重试模式对其进行调用，将会导致：
    - 耗尽上游服务的资源（如线程、套接字）
    - 持续向下游服务施加压力，阻碍其恢复
    - 增加用户感知的延迟，因为每次调用都在等待超时。
  - 可能导致级联故障，即一个服务的失败引发整个系统的崩溃。
- 解决方案机制与架构
  - 断路器模式是一个有状态的代理，它监控对受保护服务的调用。
  - 三个核心状态
    - Closed (闭合): 初始状态。所有请求都正常通过。断路器会记录成功和失败的次数。当失败次数在一定时间内超过设定的阈值时，断路器转换到“打开”状态。
    - Open (打开): 在此状态下，所有对该服务的调用都会立即失败，并返回一个错误，而不会真正尝试调用。这可以防止对已知故障的服务发起不必要的请求。经过一个配置的超时时间后，断路器转换到“半开”状态。
    - Half-Open (半开): 在此状态下，断路器允许一个（或少量）“探测”请求通过。如果该请求成功，断路器认为服务已恢复，转换回“闭合”状态。如果请求失败，断路器立即跳回“打开”状态，重新开始计时。
- 实现考量与常见陷阱
  - 阈值调整: 断路器的配置（失败阈值、打开持续时间）非常关键且难以一次性设定正确。阈值太低可能导致服务被误判为故障；太高则可能反应太慢。这通常需要根据生产环境的监控数据进行迭代调整。
  - 分布式状态管理: 在一个无状态、水平扩展的服务中，每个实例都维护自己的断路器状态。这意味着一个实例可能已经打开了断路器，而另一个新启动的实例仍然是闭合的。对于非常关键的服务，可能需要一个集中式的、共享的断路器状态（例如，存储在 Redis 中），但这会显著增加复杂性。
  - 降级逻辑 (Fallback): 当断路器打开时，仅仅返回错误可能不够。通常需要提供一个降级逻辑，例如返回缓存的旧数据、一个默认值，或者调用另一个备用服务。
  - 监控与告警: 必须对断路器的状态转换进行监控。当一个断路器频繁打开时，这是一个强烈的信号，表明下游服务存在严重问题，需要立即发出告警。

**应用场景**

- 在微服务架构中，一个服务需要调用另一个可能不稳定的服务。
- 调用任何可能出现延迟或失败的第三方API或外部资源。
- 保护系统自身，防止因某个依赖的故障而导致整个系统的连锁反应（雪崩效应）。

```java
enum State { CLOSED, OPEN, HALF_OPEN }

class CircuitBreaker {
    State currentState = State.CLOSED;
    int failureCount = 0;
    long lastFailureTime = 0;

    // --- 可配置的阈值 ---
    final int FAILURE_THRESHOLD = 5; // 连续失败5次就跳闸
    final long OPEN_TIMEOUT_MS = 30000; // 跳闸后，30秒内不允许新请求

    public Response call(Request request) {
        if (currentState == State.OPEN) {
            // 状态为OPEN，检查是否过了超时时间
            if (System.currentTimeMillis() - lastFailureTime > OPEN_TIMEOUT_MS) {
                // 超时了，进入HALF_OPEN状态，准备放一个请求过去试试
                currentState = State.HALF_OPEN;
            } else {
                // 还没超时，直接快速失败，返回降级逻辑
                return fallbackResponse();
            }
        }

        if (currentState == State.HALF_OPEN || currentState == State.CLOSED) {
            try {
                // 尝试调用下游服务
                Response response = PaymentService.charge(request);

                // 调用成功！
                reset(); // 重置计数器，状态恢复为CLOSED
                return response;

            } catch (Exception e) {
                // 调用失败！
                recordFailure();
                return fallbackResponse();
            }
        }

        return fallbackResponse();
    }

    private void recordFailure() {
        failureCount++;
        lastFailureTime = System.currentTimeMillis();
        if (failureCount >= FAILURE_THRESHOLD) {
            // 失败次数达到阈值，跳闸！
            currentState = State.OPEN;
        }
    }

    private void reset() {
        failureCount = 0;
        currentState = State.CLOSED;
    }

    private Response fallbackResponse() {
      // 降级逻辑，比如：返回“支付处理中，请稍后查看”
      return new Response("Payment processing, please check later.");
    }
}
```

## Health Endpoint Monitoring Pattern

- 核心问题
  - 在自动化和动态的云环境中，外部系统（如负载均衡器、容器编排器、监控工具）需要一种可靠的方式来确定一个应用程序实例是否正在正常工作。
  - 仅仅检查进程是否存在或端口是否在监听是远远不够的。
- 解决方案机制与架构
  - 引入特定端点（如 /health 或 /status）来解决问题。
  - 外部工具可以定期轮询这个端点。端点的响应表明了应用程序的健康状况。
  - 健康检查可以分为不同级别：
    - Liveness (存活性): 一个简单的检查，仅确认应用程序进程正在运行且能够响应请求。如果此检查失败，编排器（如 Kubernetes）可能会决定重启该实例。通常返回 HTTP 200 OK 即可。
    - Readiness (就绪性): 一个更深入的检查，确认应用程序不仅在运行，而且已经准备好接收和处理流量。这可能包括检查与数据库的连接、缓存的预热、依赖项的可用性等。如果此检查失败，编排器会保持实例运行，但不会将流量路由给它。
    - 深入检查: 端点可以返回一个包含详细信息的 JSON 响应体，列出所有关键依赖项（数据库、消息队列、外部 API）的状态。这对于调试和监控非常有用。
- 实现考量与常见陷阱
  - 过于简单的检查: 一个只返回 HTTP 200 OK 的健康检查几乎没有价值。它无法检测到数据库连接丢失或关键依赖项失败等问题。
  - 过于复杂的检查: 健康检查逻辑本身不应该过于复杂或耗时。如果健康检查本身就可能失败或超时，会引发误报。同时，它不应该对系统造成显著的性能负担。
  - 依赖关系图: 避免在健康检查中创建复杂的依赖链。例如，服务 A 的健康检查调用服务 B，服务 B 的健康检查又调用服务 C。这会使故障排查变得异常困难。健康检查应尽可能只检查其直接依赖项。
  - 安全性: 健康检查端点可能会暴露内部系统状态。虽然通常不需要身份验证，但应确保它不会泄露敏感信息，并且最好只在内部网络中可访问。

## CQRS

- CQRS (Command Query Responsibility Segregation) 模式
  - 将读操作和写操作分离到不同的模型中，从而提高系统的可伸缩性和性能。
  - 读模型可以针对查询进行优化，而写模型则专注于处理命令。
- 应用场景:
  - 读写负载差异巨大的系统。例如，写入操作很少但很复杂，而读取操作非常频繁但很简单。
  - 需要对读模型进行高度优化的场景，比如构建复杂的报表、数据分析仪表盘等。
  - 协作式领域，多个用户可能同时对同一数据进行操作，使用CQRS可以更好地管理并发和冲突。
- FAQ
  - 数据同步
  - 复杂性
  - 最终一致性

## Bulkhead Pattern

- Bulkhead Pattern (舱壁模式)
- 核心问题
  - 在复杂的应用程序中，不同的功能或对不同下游服务的调用共享同一组资源（如线程池、连接池、内存）。
  - 如果其中一个功能出现性能问题或其依赖的服务变慢，它可能会耗尽共享资源，导致整个应用程序变得无响应，即使其他功能和依赖项是健康的。
- 解决方案机制与架构
  - 该模式的灵感来源于船舶的舱壁设计，它将船体分割成多个水密隔舱，即使一个隔舱进水，也不会导致整艘船沉没。在软件架构中，舱壁模式通过为不同的操作或服务调用分配独立的资源池来实现隔离。
  - 线程池隔离: 为调用不同服务的客户端分配不同的线程池。例如，调用支付服务的线程池大小为 10，而调用非关键的推荐服务的线程池大小为 5。如果推荐服务变慢，它只会耗尽自己的 5 个线程，而不会影响支付服务。
  - 进程/容器隔离: 将不同的功能部署为独立的进程或容器。这是微服务架构的核心思想之一。一个服务的崩溃或资源耗尽完全不会影响其他服务。
  - 资源配额: 在容器编排平台（如 Kubernetes）中，可以为每个容器设置 CPU 和内存的请求（requests）和限制（limits），确保一个“行为不端”的容器不会抢占其他容器的资源。
- 实现考量与常见陷阱
  - 配置复杂性: 确定每个舱壁的大小（线程数、内存限制等）是一个挑战。设置得太小会限制正常性能，设置得太大则会浪费资源，削弱隔离效果。这需要持续的性能测试和生产监控来调整。
  - 管理开销: 维护大量的资源池或部署单元会增加运维的复杂性和成本。
  - 隔离粒度: 决定在哪个层次上进行隔离（线程、进程、虚拟机）是一个关键的架构决策，它会影响到成本、性能和开发复杂性。
- 参考
  - https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead

## Compensating Transaction Pattern

- Compensating Transaction Pattern (补偿事务模式)
- 核心问题
  - 在分布式系统中，一个业务操作通常由跨越多个服务的多个步骤组成。传统的 ACID 事务依赖于两阶段提交（2PC）等协议，但这在分布式环境中会导致锁竞争、低吞吐量和可用性问题，通常被认为是反模式。当这个多步骤操作的某个环节失败时，如何保证数据最终处于一个一致的状态？
- 解决方案机制与架构
  - 补偿事务模式通过一系列"补偿"操作来撤销已经成功完成的步骤，从而实现逻辑上的回滚。一个完整的分布式事务（通常称为 Saga）由一系列可向前执行的步骤和对应的可向后执行的补偿步骤组成。
  - Saga 编排 (Orchestration): 有一个中心的协调器（Orchestrator）负责调用每个服务来执行步骤。协调器知道整个流程，如果某一步失败，它会负责按相反的顺序调用之前已成功步骤的补偿操作。
  - Saga 协同 (Choreography): 没有中心协调器。每个服务在完成自己的操作后，会发布一个事件。下一个服务订阅该事件并执行自己的操作。如果某个服务失败，它会发布一个失败事件，之前的服务会订阅这个失败事件并执行自己的补偿操作。
- 实现考量与常见陷阱
  - 补偿逻辑的复杂性: 编写补偿操作可能非常困难。补偿操作本身也可能失败，需要设计重试机制。此外，补偿操作必须考虑在原始操作完成后，数据可能已经被其他事务所修改的情况。
  - 最终一致性: 系统在补偿完成之前，会处于一个中间的不一致状态。必须确保业务能够容忍这种暂时的不一致性。
  - 可观测性: 跟踪一个跨越多个服务的 Saga 的状态非常困难。需要投入大量的精力在日志记录、追踪（Tracing）和监控上，以便在出现问题时能够快速定位是哪个步骤失败了。
  - 数据隔离: Saga 的一个关键原则是，每个服务只拥有自己的数据，并通过 API 或事件进行通信。这避免了分布式锁的需求。

## Leader Election Pattern

- Leader Election Pattern (领导者选举模式)
- 核心问题
  - 在一个分布式应用程序中，通常会有一些任务只需要由一个实例来执行，以避免冲突、重复工作或数据损坏。例如，一个后台任务定期清理陈旧数据，或者一个服务实例负责维护与外部系统的单一长连接。如何在一组动态变化的实例中，可靠地选举出一个"领导者"来执行这些单例任务？
- 解决方案机制与架构
  - 领导者选举模式通过一个所有实例都能访问的共享资源（如分布式锁）来实现。所有实例都会尝试获取这个锁，但只有一个能成功。成功获取锁的实例成为领导者，并开始执行任务。
  - 租约 (Lease): 领导者获取的锁通常有一个租约时间。领导者必须在租约到期前定期续约，以表明自己仍然存活。如果领导者因崩溃或网络分区而未能续约，租约会过期，其他实例就可以竞争成为新的领导者。这确保了系统的高可用性。
- 实现考量与常见陷阱
  - 脑裂 (Split-Brain): 这是领导者选举中最危险的问题。由于网络分区，可能会出现两个（或更多）实例都认为自己是领导者的情况。这通常是由于锁机制的实现不够健壮或时钟不同步造成的。使用像 Azure Blob Lease 这样经过验证的服务可以最大限度地降低这种风险。
  - 领导者活性: 必须有一种机制来处理领导者崩溃的情况。基于租约的模式天然地解决了这个问题。
  - 选举过程的延迟: 当领导者失效时，选举出新领导者需要一些时间（至少要等到旧租约过期）。在此期间，单例任务将无人执行。需要根据业务需求来平衡租约时间和故障恢复速度。

## Queue-Based Load Leveling Pattern

- Queue-Based Load Leveling Pattern (基于队列的负载均衡模式)
- 核心问题
  - 许多系统的负载不是恒定的，而是突发性的。例如，一个票务系统在开票瞬间会收到海量请求。如果前端服务直接同步调用后端处理服务，这种突发的流量洪峰很可能会压垮后端，导致整个系统雪崩。
- 解决方案机制与架构
  - 该模式在任务的生产者（前端服务）和消费者（后端处理服务）之间引入一个异步的消息队列作为缓冲区。
  - 前端服务接收到请求后，不再直接处理，而是将任务描述为一个消息，并将其放入队列中。这个操作非常快速，因此前端可以处理极高的并发请求。
  - 后端的一组工作者实例（消费者）以自己的节奏从队列中拉取消息并进行处理。
  - 这样，队列就像一个"削峰填谷"的水库，将前端的突发流量平滑成后端可以稳定处理的平均速率。
- 实现考量与常见陷阱
  - 队列无限增长: 如果消息的生产速率持续高于消费速率，队列会不断增长，导致处理延迟越来越大，消息变得陈旧。必须对队列深度进行监控，并设置告警。这通常意味着需要增加消费者实例的数量。
  - 毒消息 (Poison Messages): 某条消息由于格式错误或包含无效数据，导致消费者每次尝试处理它都会失败。如果消费者在失败后将消息放回队列，就会形成一个无限循环，阻塞后续所有消息的处理。Service Bus 的死信队列机制可以很好地解决这个问题。对于 Queue Storage，需要在代码中实现类似的"最大处理次数"计数器。
  - 幂等性: 由于网络问题或消费者崩溃，同一条消息可能会被传递多次。因此，消费者逻辑必须设计为幂等的，即多次处理同一条消息和处理一次的效果是相同的。
  - 缺乏即时反馈: 这是一个异步模式，因此生产者无法立即知道任务是否处理成功。如果需要反馈，必须设计一个带外的通知机制。

## 网络

- Control plane & Data plane
- First path vs Fast path
- Slow path vs Fast path
- Queue based design
- Pipeline
- Finite State Machine
- Watchdog

## 并发

## 分布式

## application context

- ApplicationContext as alternative to ioc
- 作为 DI 的 Container
- IoC 的 容器
- Encapsulate Context
- Context Object
- 参考
  - http://www.corej2eepatterns.com/ContextObject.htm
  - https://www.baeldung.com/cs/context-design-pattern
  - https://stackoverflow.com/a/16161219/1870054
