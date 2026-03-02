---
title: OpenClaw 项目分析
tags:
  - AI
  - Gateway
  - TypeScript
---

# OpenClaw

- [openclaw/openclaw](https://github.com/openclaw/openclaw)
  - MIT, TypeScript
  - 多渠道 AI 网关，可扩展的消息集成平台
  - 支持 Telegram、WhatsApp、Discord、Slack、Signal、iMessage 等 35+ 渠道
  - 内置 OpenAI 兼容 API (`/v1/chat/completions`)，支持多 Agent 路由
  - 提供 WebSocket Gateway、Control UI、原生客户端 (macOS/iOS/Android)

```
openclaw/
├── src/                    # 核心源码
│   ├── agents/             # AI Agent 运行时（Pi embedded runner）
│   ├── auto-reply/         # 消息调度与回复处理
│   ├── channels/           # 渠道定义（dock/registry/plugin types）
│   │   └── plugins/        # 渠道插件类型定义
│   ├── cli/                # CLI 入口与命令
│   ├── commands/           # 各CLI子命令实现
│   ├── config/             # 配置加载/校验/迁移（JSON5）
│   ├── gateway/            # WebSocket/HTTP 网关服务器
│   ├── infra/              # 基础设施（日志/事件/更新检查等）
│   ├── media/              # 媒体处理管道
│   ├── provider-web.ts     # Web Provider
│   └── routing/            # 消息路由
├── extensions/             # 渠道扩展插件（35+个 workspace packages）
├── apps/                   # 原生客户端（macOS/iOS/Android）
├── ui/                     # Control UI 前端
├── docs/                   # 文档
└── skills/                 # Agent Skills
```

## 核心架构

### 1. 消息处理流程

```
用户消息 ─→ Channel Plugin (inbound)
              │
              ▼
         MsgContext (envelope 封装)
              │  [channel, from, body, timestamp, chatType, sessionKey]
              ▼
    dispatchInboundMessage()          ← src/auto-reply/dispatch.ts
              │
              ▼
      getReplyFromConfig()            ← src/auto-reply/reply/get-reply.ts
         │  1. 解析 agent/session (resolveSessionAgentId)
         │  2. 解析 model/provider (resolveDefaultModel)
         │  3. 应用 media/link understanding
         │  4. 校验命令权限 (resolveCommandAuthorization)
         │  5. 初始化 session state
         │  6. 处理 directives (model切换/think/verbose/elevated)
         │  7. 处理 inline actions (status/reset/compact 等命令)
         │
         ▼
    runPreparedReply()                ← 调用 Pi embedded runner
         │
         ▼
    subscribeEmbeddedPiSession()      ← src/agents/pi-embedded-subscribe.ts
         │  - 订阅 LLM provider stream
         │  - strip thinking/final tags
         │  - block chunking (分块回复)
         │  - reasoning stream 处理
         │  - tool output 格式化
         │  - compaction retry 管理
         │
         ▼
    ReplyDispatcher (回复分发)
         │  - onBlockReply: 分块发送
         │  - onToolResult: 工具结果
         │  - typing indicator 管理
         │
         ▼
    Channel Plugin (outbound)  ─→  用户收到回复
```

### 2. Channel 系统

#### 内置渠道 (dock.ts)

`DOCKS` 常量定义了 8 个内置渠道的元数据：

| 渠道        | capabilities                          | 特性                  |
| ----------- | ------------------------------------- | --------------------- |
| Telegram    | outbound, streaming, groups, mentions | 支持 thread reply     |
| WhatsApp    | outbound, groups, mentions            | JID 格式处理          |
| Discord     | outbound, streaming, groups, mentions | 频道/DM 适配          |
| IRC         | outbound, groups, mentions            | 传统 IRC 协议         |
| Google Chat | outbound, groups                      | Google Workspace 集成 |
| Slack       | outbound, streaming, groups, mentions | Bot + App 模式        |
| Signal      | outbound, groups, mentions            | 端到端加密            |
| iMessage    | outbound, groups, mentions            | AppleScript 桥接      |

每个 dock 包含: `capabilities`, `streamingDefaults`, `groupAdapter`, `mentionAdapter`, `threadingAdapter`, `outboundAdapter` 等。

#### 插件类型 (ChannelPlugin)

```typescript
type ChannelPlugin<ResolvedAccount, Probe, Audit> = {
  id: ChannelId;
  meta: ChannelMeta; // label, docs, image 等
  capabilities: ChannelCapabilities; // outbound, streaming, groups, mentions
  config: ChannelConfigAdapter; // 配置解析
  setup?: ChannelSetupAdapter; // 初始化
  pairing?: ChannelPairingAdapter; // 配对连接
  security?: ChannelSecurityAdapter; // DM策略/权限
  groups?: ChannelGroupAdapter; // 群组处理
  mentions?: ChannelMentionAdapter; // @提及处理
  outbound?: ChannelOutboundAdapter; // 发送消息
  streaming?: ChannelStreamingAdapter; // 流式回复
  threading?: ChannelThreadingAdapter; // 线程回复
  messaging?: ChannelMessagingAdapter; // 消息格式化
  gateway?: ChannelGatewayAdapter; // 网关集成
  heartbeat?: ChannelHeartbeatAdapter; // 心跳检测
  agentTools?: ChannelAgentToolFactory; // 渠道专属工具
  // ... 更多适配器
};
```

#### 渠道注册 (registry.ts)

`CHAT_CHANNEL_META` 维护每个渠道的:

- label / alias (别名)
- docs path (文档路径)
- system image (系统图标)
- `normalizeChatChannelId()` 统一渠道ID

### 3. 路由系统 (resolve-route.ts)

根据多维度绑定解析消息应该路由到哪个 Agent：

```
优先级 (从高到低):
  1. peer binding    → 特定联系人绑定
  2. guild binding   → 群组/服务器绑定
  3. team binding    → 团队绑定
  4. account binding → 账号级绑定
  5. channel binding → 渠道级绑定
  6. default agent   → 全局默认
```

输出 `ResolvedAgentRoute`:

- `agentId` — 目标 agent
- `sessionKey` — session 持久化 key (格式: `channel:accountId:agentId:peer/guild`)
- `mainSessionKey` — 主 session key (不含 agent 后缀)

### 4. Gateway 服务器 (server.impl.ts)

`startGatewayServer()` 编排所有网关组件:

```
Gateway Server (默认端口 18789)
│
├── WebSocket Server (attachGatewayWsHandlers)
│   ├── 客户端管理 (clients, broadcast)
│   ├── Node Registry (远程节点)
│   ├── 方法注册 (coreGatewayHandlers + plugin handlers)
│   └── Agent Event 订阅 (createAgentEventHandler)
│
├── HTTP Endpoints
│   ├── Control UI (SPA 前端)
│   ├── POST /v1/chat/completions (OpenAI 兼容)
│   └── POST /v1/responses (OpenResponses API)
│
├── Channel Manager (createChannelManager)
│   ├── 渠道运行时管理 (start/stop/status)
│   └── Runtime Snapshot (监控)
│
├── Discovery Service (mDNS/Bonjour + Wide Area)
├── Cron Service (定时任务)
├── Heartbeat Runner (心跳)
├── Config Reloader (配置热重载)
├── TLS Runtime (可选)
├── Tailscale Exposure (可选)
├── Canvas Host (可选, 代码执行沙箱)
└── Browser Control (可选)
```

#### Agent 事件处理 (server-chat.ts)

`createAgentEventHandler` 处理 agent 运行时产生的事件:

- **assistant stream** → 广播 `chat.delta` 给 WebSocket 客户端
- **run lifecycle** → 广播 `chat.run.start` / `chat.run.end`
- **tool events** → 广播给已注册的 tool event 订阅者
- **chat finalization** → 发送最终回复消息

`ChatRunState` 管理:

- `buffers`: 每个 runId 的消息缓冲
- `deltaSentAt`: 流式 delta 发送时间戳
- `abortedRuns`: 被中止的运行记录

### 5. Agent 运行时

#### Pi Embedded Runner (pi-embedded-subscribe.ts)

核心的 LLM 交互订阅器，600+ 行:

- **stream 事件订阅**: 处理 `text_delta`, `text_end`, `message_end` 等事件
- **thinking tag 过滤**: 正则匹配 `<think>/<thinking>/<thought>/<antthinking>` 标签
- **block chunking**: 将长回复按块分发 (`emitBlockChunk`)
- **reasoning stream**: 独立的推理过程输出 (`emitReasoningStream`)
- **tool 结果格式化**: `emitToolSummary`, `emitToolOutput`
- **compaction**: 上下文压缩与重试
- **usage tracking**: token 使用量记录

### 6. 消息封装 (envelope.ts)

入站消息被格式化为标准信封格式:

```
[Channel From +elapsed Timestamp] body
```

例如: `[Telegram Alice +5m Wed 2025-01-15 14:30:00] Hello, how are you?`

- 支持多种时区模式: `utc`, `local`, `user`, IANA timezone
- 群组消息自动添加发送者前缀
- header 部分安全清理（防止注入）

### 7. 配置系统

- **格式**: JSON5 配置文件
- **校验**: Zod schema 验证
- **热重载**: `startGatewayConfigReloader` 监听配置变化
- **遗留迁移**: `migrateLegacyConfig` 自动迁移旧格式
- **插件自动加载**: `applyPluginAutoEnable` 根据环境变量自动启用

关键配置结构:

```typescript
OpenClawConfig = {
  agents: { defaults, bindings },  // Agent 配置
  channels: { ... },               // 渠道配置
  session: { ... },                // Session 配置
  gateway: {                       // Gateway 配置
    http: { endpoints },
    tls, controlUi, auth
  },
  discovery: { mdns, wideArea },   // 发现服务
  commands: { ... },               // 命令配置
}
```

## 设计特点

1. **adapter 模式**: 通过 adapter 接口实现渠道能力的可选组合（outbound/streaming/threading/groups/mentions）
2. **插件化**: extensions/ 目录下的 35+ 渠道实现为独立 workspace packages，按需加载
3. **多层路由**: 支持 peer → guild → team → account → channel → default 六级绑定优先级
4. **流式处理**: Pi embedded subscriber 处理 LLM 流式输出，支持 block chunking 和 thinking tag 过滤
5. **热重载**: Gateway 支持配置文件监听与运行时 hot reload
6. **OpenAI 兼容**: 提供标准 `/v1/chat/completions` 和 `/v1/responses` HTTP 接口
7. **多客户端**: 支持 WebSocket 客户端 + 原生 apps (macOS/iOS/Android) + Node 远程节点
