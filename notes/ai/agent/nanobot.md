---
title: NanoBot
tags:
  - AI
  - Agent
  - Python
---

# NanoBot

- [HKUDS/nanobot](https://github.com/HKUDS/nanobot)
  - MIT, Python
  - 超轻量个人 AI 助手框架，受 OpenClaw 启发
  - 核心代码 ~3500 行（OpenClaw 的 1%）
  - 支持 9 渠道: Telegram, Discord, WhatsApp, Feishu, DingTalk, Slack, Email, QQ, Mochat
  - LiteLLM 统一 12+ LLM Provider，支持 vLLM 本地模型

## 架构

```
Channel (Telegram/Discord/...) ──→ MessageBus (inbound queue)
                                        │
                                        ▼
                                    AgentLoop
                                    │  1. get_or_create session
                                    │  2. build_messages (system + history + user)
                                    │  3. provider.chat (LiteLLM)
                                    │  4. execute tool_calls (max 20 轮)
                                    │  5. save session
                                    │
                                    ▼
                               MessageBus (outbound queue)
                                    │
                                    ▼
                               ChannelManager._dispatch_outbound()
                                    │ 按 msg.channel 路由
                                    ▼
                               Channel.send() ──→ 用户
```

### 核心模块

| 模块                            | 作用                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `agent/loop.py`                 | AgentLoop：消息处理引擎，LLM调用+工具执行循环                                |
| `agent/context.py`              | ContextBuilder：组装 system prompt（identity + bootstrap + memory + skills） |
| `agent/memory.py`               | MemoryStore：workspace 下 MEMORY.md 持久化记忆                               |
| `agent/skills.py`               | SkillsLoader：技能加载（always-load + on-demand）                            |
| `agent/subagent.py`             | SubagentManager：后台子任务                                                  |
| `bus/queue.py`                  | MessageBus：双 asyncio.Queue 解耦 channel↔agent                             |
| `bus/events.py`                 | InboundMessage / OutboundMessage 数据类                                      |
| `channels/base.py`              | BaseChannel ABC：start/stop/send + allowFrom 权限                            |
| `channels/manager.py`           | ChannelManager：初始化+启动+路由所有渠道                                     |
| `providers/registry.py`         | ProviderSpec 注册表：12 个 provider 元数据                                   |
| `providers/litellm_provider.py` | LiteLLM 封装：统一 LLM 调用接口                                              |
| `session/manager.py`            | SessionManager：JSONL 文件持久化会话                                         |
| `config/schema.py`              | Pydantic Config：JSON 配置定义                                               |

### 工具

read_file, write_file, edit_file, list_dir, exec (shell), web_search (Brave), web_fetch, message, spawn (子agent), cron

### Provider 注册 (ProviderSpec)

添加 provider 只需 2 步：在 `registry.py` 加 `ProviderSpec` + 在 `schema.py` 加配置字段。

支持：OpenRouter, AiHubMix (gateway), Anthropic, OpenAI, DeepSeek, Gemini, Zhipu, DashScope, Moonshot, MiniMax, vLLM, Groq

## 与 OpenClaw 对比

| 维度     | NanoBot                                             | OpenClaw                                               |
| -------- | --------------------------------------------------- | ------------------------------------------------------ |
| 语言     | Python                                              | TypeScript (ESM)                                       |
| 代码量   | ~3,500 行                                           | ~430,000 行                                            |
| 定位     | 轻量研究/个人助手                                   | 生产级多渠道 AI 网关                                   |
| 渠道数   | 9 (硬编码)                                          | 8 内置 + 35 扩展插件                                   |
| 渠道架构 | `BaseChannel` ABC + `ChannelManager` 硬编码 if/else | `ChannelPlugin` adapter 模式 + 独立 workspace packages |
| 消息总线 | `MessageBus`：双 asyncio.Queue                      | `dispatchInboundMessage` → `getReplyFromConfig` 管道   |
| Provider | LiteLLM + `ProviderSpec` 注册表                     | 自建 provider 抽象 + 多粒度 model 解析                 |
| Session  | JSONL 文件 (`channel:chat_id`)                      | 多层 session store + 6 级路由绑定                      |
| 路由     | `channel:chat_id` 简单 key                          | peer→guild→team→account→channel→default 6 级           |
| 流式回复 | ❌ 无                                               | ✅ block streaming + thinking tag 过滤                 |
| API 兼容 | ❌ 无 HTTP API                                      | ✅ OpenAI 兼容 `/v1/chat/completions`                  |
| 配置     | JSON + Pydantic                                     | JSON5 + Zod + 热重载 + 遗留迁移                        |
| 客户端   | CLI only                                            | CLI + WebSocket + Control UI + macOS/iOS/Android       |
| 子任务   | spawn tool + SubagentManager                        | 内置 subagent 注册表                                   |
| 定时任务 | cron tool + CronService                             | 内置 cron service                                      |
| Skills   | workspace SKILL.md（always-load + on-demand）       | skills/ 目录 + remote skills                           |
| Memory   | MEMORY.md 文件                                      | 多种 session store                                     |
