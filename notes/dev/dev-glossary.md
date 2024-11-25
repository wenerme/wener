---
title: Dev Glossary
tags:
  - Glossary
---

# Dev Glossary

- stage0

| abbr.  | stand for                              | mean             |
| ------ | -------------------------------------- | ---------------- |
| GC     | garbage collect                        | 垃圾收集         |
| [RAII] | Resource acquisition is initialization | 资源获取即初始化 |
| OOM    | Out of memory                          |
| NPE    | Null Pointer Exception                 | 空指针异常       |
| RTTI   | Runtime Type Information               |
| CRUD   | Create, Read, Update, Delete           | 增删改查         |

[raii]: https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization

| abbr. | stand for               | mean |
| ----- | ----------------------- | ---- |
| RIIR  | Rewrite It In Rust      |
| DORA  | DevOps research program |

| abbr. | stand for              | cn         |
| ----- | ---------------------- | ---------- |
|       | Private Cloud          | 私有云     |
|       | Public Cloud           | 公有云     |
|       | cloud computing        | 云计算     |
|       | [On-premises Software] | 本地软件   |
| SaaS  | Software as a Service  | 软件即服务 |

| en          | cn     |
| ----------- | ------ |
| Checksum    | 校验和 |
| Check digit | 校验位 |
| Check code  | 校验码 |

- off-premises -> SaaS
- on-premises - server-based software
  - 按需、本地化、面向服务
  - SaaS 反向操作
- futureproofing - 确保不会过时

[on-premises software]: https://en.wikipedia.org/wiki/On-premises_software

## Checksum

## 路由 {#routing}

- 核心问题
  - 分发
  - 选择最佳路径
  - 输入 - 映射 - 目标
  - 抽象 - 实现

---

- 网络层
  - 路由器根据数据包的目标地址，决定下一跳的转发路径。
  - 路由协议 - OSPF, BGP
  - 核心思想
    - 根据规则分发
    - 选择最佳路径
- Web 开发中的路由
  - `GET /user/1`
  - 核心思想
    - 路径颜色
- 软件架构中的服务路由
  - 服务发现: 找到服务的实例位置
  - 服务路由: 将请求路由到正确的服务（负载均衡、流量控制）
  - 核心思想
    - 请求根据规则分发到适当的服务实例，本质上是一种更复杂的“路由”。
- 函数和方法调用
  - 函数或方法的调用可以被看作是一种小范围的路由
  - CPP 中的虚函数
  - Java Interface
  - 根据函数名、类名，找到对应的实现逻辑。
  - 分发逻辑：通过方法名或函数名路由到具体的实现。
- 消息队列中的路由
  - routing key
  - 基于规则的分发：不同的队列对应不同的业务逻辑处理。
- 数据库查询路由
  - 读写分离
  - 分片
  - 查询索引定位
- 操作系统中的路由
  - syscall
  - 系统调用表
  - 中断向量表
- 编译器和解释器中的路由
  - Link - 符号解析 - 重定位
  - 语法路由：从代码的结构映射到编译器的内部处理逻辑。
- 用户界面的路由
  - React Router
  - Vue Router

## 通信 {#communication}
