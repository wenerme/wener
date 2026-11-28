---
title: 我理解的企业 AI Infra
slug: my-understanding-of-aiinfra
tags:
  - Thoughts
---

# 我理解的企业 AI Infra

The infra for the next generation.

<!-- more -->

## 基本名词

| en                          | cn             | meaning                                                |
| --------------------------- | -------------- | ------------------------------------------------------ |
| Infra                       | 基础设施       | 底层复用基础建设内容                                   |
| Service                     | 服务           | 一切形式化定义的交互接口                               |
| Workspace                   | 工作空间       | 文件+命令交互                                          |
| Hub                         | 聚合           | 共享、分享平台                                         |
| Context                     | 上下文         | 交互与决策所需的背景信息                               |
| Agent Context               | Agent 上下文   | 它能感知的环境，fs、shell、prompt                      |
| Assistant                   | 助理           | 比 Agent 更加自主的 Agent                              |
| Service Account             | 服务账号       | 等同人的个体，使用 Token 访问                          |
| Broker                      |                | 访问代理入口                                           |
| Service Catalog             | 服务目录       | 统一注册、定义与治理内外部服务的目录                   |
| Secretless Broker           |                | 无密钥访问代理入口                                     |
| BYOA / Bring Your Own Agent | 用自己的 Agent | 允许自带外部 Agent 接入企业 Infra                      |
| Governance                  | 治理           | 权限、审计、审批与合规控制                             |
| HitL / Human in the Loop    | 人在回路       | 关键操作等待人工审批或介入                             |
| DLP / Data Loss Prevention  | 数据防泄漏     | 防止敏感数据未经授权外泄或流入不合规模型               |
| A2A / Agent to Agent        | Agent 间协作   | Agent 之间互相发现、通信与委派的能力                   |
| Observability               | 可观测性       | 通过 Trace、Metrics、Logs 洞察系统与 Agent 运行状态    |
| OTel / OpenTelemetry        |                | 统一的遥测数据采集与追踪标准（Trace / Metrics / Logs） |
| Agent Trajectory            | Agent 轨迹     | Agent 执行过程中的决策、工具调用与反馈完整记录         |

## 基础 {#foundation}

企业 AI Infra / Agent Infra 首先得是一个企业 Infra，因此至少会有

基础组件

- 控制与治理
  - OAuth 接入
  - 内部 AuthZ 权限控制
  - 审计
  - 审批流（HitL）
  - 组织管理 - Team
- AI / 模型面
  - 模型路由
  - 模型用量统计
  - 自定义模型映射
- 协作与存储空间
  - 网盘 / 私有文件空间
  - Wiki / 共享文档空间
  - Channel
- 核心业务实体
  - CRM - 客户、联系人
  - 业务工单
  - 用户、服务订阅、消费、支付记录

设计考量

- 支持多主体
  - User
  - Team
  - Service Account（SA）- 允许创建服务维度的身份
- Auth Scope 跟随主体
- 身份委托（Delegation）
  - 大多数场景以当事人主体（User / Team / SA）身份执行
  - Service Account 是做 Delegation 的主要方式，用于脱离个人身份的受控授权与自动化运行
- 治理与审批（Governance / HitL）
  - 横切贯穿 AuthZ、审计、工单审批、Durable Workflow（Approve）与 Secretless Broker 细粒度审查

## Agent Infra

- Agent 主要的内容是
  - 运行时
  - 会话 - Session
  - 工作空间 - 文件访问
  - 模型访问 - 模型路由
  - Scheduled prompt - 定时任务
  - Durable workflow
  - Channel
- Agent Runtime
  - 划分依据
    - 工具可用性
      - tool 只能在某个具体环境使用
        - 网页 - 可以生成 UI，可以操作页面元素
        - Durable - 可能一个 tool 等待授权需要 2 天
    - 运行可用性
      - 临时执行
      - 7×24 小时执行
    - 会话可用性
      - 可以留存在服务端
      - 只能留存在客户端
  - direct - 直接原地运行
    - 网页前端运行
    - 临时短的 ToolLoopAgent
  - server - 服务端运行
  - workflow - 以 Durable Workflow 的方式运行，可能对接 Approve 等逻辑，7×24 可恢复方式运行
  - remote - 以远程或者 Harness 方式运行，只考虑 Agent 交互面，不记录回放 Session
- Workspace Provider（数据与文件来源）
  - user - 用户默认空间
  - session - Agent 会话维度空间内容
  - remote - 通过 `woctl ws connect` 从客户端反向挂载，数据留在本地，在平台侧表现为 remote workspace
  - host - CLI 本地直连当前宿主机（例如 `woctl agent --workspace host`）
- Workspace Runtime（命令执行环境）
  - just-bash - 以模拟的方式来执行 shell
  - host - Harness Agent 的场景下，CLI 直接在宿主机执行
  - sandbox - 以 Sandbox Provider 的方式动态创建

## Event Infra

> What makes an agent alive.

Event infra 指

- Channel 支持自定义渠道
  - feishu, gitlab, github, linear, telegram, wechat ilink
- 支持内置 Channel - 类似于内置 IM
- 支持订阅

从人来驱动 Agent 变为 Agent 基于事件来自驱动。

## 服务目录 {#service-catalog}

服务定义（Secretless Broker）

- 内外交互网关
- 暴露为 服务名+方法名字
- 所有操作会进行审计记录
- Auth 信息保留在内部（密钥不暴露给调用方）
- 服务的方法是由 Schema 定义的
- 服务方法调用可 inspect 方法请求内容做细粒度权限控制
  - 例如判断访问参数、判断执行 SQL 语句

服务类型

- 标准 Auth HTTP
- 非标准 Auth HTTP - S3
- 非 HTTP - 数据库

服务暴露方式

- RPC
  - 例如 `POST /service/call/SERVICE/METHOD`
- MCP
  - 例如 `/mcp/SERVICE`
- Code eval
  - 例如 `services.mysql.query({sql:'select 1'})`
- CLI
  - 例如 `woctl svc mysql call query '{"sql":"select 1"}'`
- Proxy
  - 例如 `GET /service/proxy/prometheus/api/v1/query?query=up`
  - 例如 `mysql -h myservice -P 3306 -e 'select 1'`
  - 对大部分服务达到 `as is` 的效果，Agent 最熟悉的样子
  - 依然保留 inspect、拦截、audit 等能力

> “Accessibility” is the key to making things useful.

## 知识共享 {#wiki}

知识共享最简单原始的方式就可以是 file based 的，本质类似于维护一个目录结构和对应的 md 文档，wiki like。
因为本质上是一种特殊的 Workspace，天然可以复用 AuthN/AuthZ、Hub 和 BYOA 等基础能力。

对于这种特殊的 workspace 可以建立 index：

```sql
create table wiki_file_info(
  summary text,
  embedding float8[],
  workspace_id text,
  path text,
  type text,
  tags text[]
);
```

默认使用 `rg`、`grep` 能满足大部分场景，特殊的场景使用类似 RAG 召回即可。
特殊文件内容类型，例如 image、video 等，也一样可以通过 embedding 或者 summary 的方式形成摘要来作为索引依据。
RAG 只在海量数据的时候带来价值，例如十万+ 文档；在少量文档文件的时候，原始的方式就是最好的方式。

Agent 自有的知识管理方式最好的就是文件的形式，且 99% 是对其他场景无价值的中间临时内容，但对当前会话是有相当价值的，例如

```
.agents/
  adr/
  logs/YYYY-MM-DD/
```

不应该什么东西都进入 Wiki 这种系统，应该有知识漏斗这样的主见和感知。

## 工单系统 {#case}

工单、Issue、Task、Action Item、Todo、Topic 本质上是类似的一个东西，当需要围绕一个目标去完成的时候，需要有一个中间对象，这个对象的 status 本质上反映了一个基础的 Workflow。
这样的业务事务隐含了一个独立的上下文：

- 横跨不同范围
- 有状态跟踪
- 隐含了一个独立主题概念
- 可以关联不同的人
- 可以关联对象资源
- 可以有独立的工作空间
- 可以有结构化数据 - 例如类型对应一个结构化数据 Schema
- 可以交互

一个基础的这样的对象足以覆盖大多数的业务流程场景。

在多个 Agent 进行协作交互的时候，这样的一个业务对象能很好地捕获相关的上下文，记录沟通协作信息，推动达成业务需求。
这样的对象覆盖了基础的业务流程需求，现在大多系统都是围绕这样的对象做的设计，反而真正复杂的 Workflow 的可用场景会少得多。
也因此这样的对象是相对必要的。

> This makes things DONE.

## 聚合共享 {#hub}

Hub 定义

- 类似于 GitHub
- 可共享个人工作场景内容
  - Agent 定义
  - Skill
  - 服务
  - Prompt
  - 工作空间
- 可申请访问
- 可细化访问权限控制
- 可发现
- 可互动
- 可记录版本
- 可评论

> That makes 1+1 > 2

## FAQ

### 企业平台维度设计考量

1. 企业维度 Infra 作为一个平台，需要提供 A2A 能力，Agent 本身作为一个服务可以互相发现与通信
2. 平台整体接入 OTel 提供可观测性，平台内的 Agent 执行可留存轨迹作为提升优化依据
3. 平台的服务可作为基础的治理规范标准
4. 长期沉淀的内容作为数据资产留存
5. 平台内的模型转发服务有足够的弹性，能服务大部分使用场景

### 数据归属考虑

1. Agent 产出的 99% 都是无用的中间过程信息
2. 剩下的 1% 有价值内容以 Workspace file、Skill、Service、Tool 等方式沉淀
3. Workspace 默认由企业平台提供，但允许 Remote 提供，例如 connect 自己的电脑作为 Agent runtime，对外通过 Agent 交互

### BYOA

1. Infra 是能通过工具暴露出来的，例如

   ```bash
   woctl workspace ls
   woctl agent ls
   woctl hub ls
   ```

2. 通过 workspace mcp 就能全量接入
   - workspace 的 MCP 会暴露 bash、read、write、ls

3. 通过 cli 的 wrapper 能原地接入
   - `woctl ws run pi` 进入 Pi Code Agent，但是看到的内容都是 AI Infra workspace 的内容，注入的模型 Provider 都是用户身份的
