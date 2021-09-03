- ISA (Independent Systems Architecture) - 独立系统架构
  - http://isa-principles.org/
  - 系统划分为提供接口的模块
  - 模块之间的交互只能通过接口
  - 不同的模块也就意味着不同的 进程、容器、虚拟机 - 最大化独立程度
  - macro architecture - 影响所有模块
  - micro architecture - 只影响模块自身
- SCSs - Self-contained systems - 自包含系统
  - http://scs-architecture.org/
  - 必须有前端
  - 前端是唯一交互界面
  - 优先级: frontend integration, asynchronous communication , synchronous communication.
- ESI (Edge Side Includes)
  - https://www.w3.org/TR/esi-lang
  - 合并 HTML 片段生成网页 - 例如 [varnish]9https://varnish-cache.org/docs/6.0/users-guide/esi.html
- SSI - Server-Side Includes
- Links and JavaScript

## Asynchronous Microservices

不等待调用返回

### Messaging with Kafka

- MOM - message-oriented middleware

### REST with Atom

## Synchronous Microservices

等待调用返回再继续处理
