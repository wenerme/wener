---
tags:
  - Design
---

# AI LLM API

- 场景
  - ~~补全~~
  - 对话
  - 代码生成
  - Agentic / Coding Agent
- 标准
  - OpenAI API
    - 大多数早期应用，事实标准
    - Codex - 使用量少
  - Anthropic API
    - Claude Code - 非常核心的应用场景
  - Gemini API
    - Gemini CLI - 场景越来越多，主要是开源驱动

**功能**

- 输入
  - 对话管理
  - Batch
  - 缓存管理 - 成本考虑核心，特别是 代码生成 场景
  - WebSearch
  - Assistant
  - Image
  - File/Workspace
- 过程
  - Computer Use
  - MCP
  - 工具/Tool
  - Code Interpreter
  - Reasoning
- 输出
  - Streaming
  - JSON & JSON Schema / 结构化输出
  - Sampling
    - seed
    - temperature
    - top_p
    - top_k
    - top_logprobs
    - presence_penalty
    - frequency_penalty
    - max_completions_tokens

:::tip

- 第一阶段
  - 只需要直接往后生成
  - /v1/completions
- 第二阶段
  - 对话
  - 客户端同步管理对话状态和上下文
  - /v1/chat/completions
- 第三阶段
  - Workflow
  - 复杂对话场景
  - 交互式对话、工具调用、外部集成
  - 服务端管理对话状态
  - 服务端异步处理对话
  - 服务端精细化缓存控制
  - 有状态
  - /v1/responses
- 第四阶段 - 个人猜测
  - Workspace & Context
  - LSP
  - Dynamic MCP

:::

- https://platform.openai.com/docs/api-reference/introduction
  - /v1/responses
  - [/v1/chat/completions](https://platform.openai.com/docs/api-reference/chat/create)
  - /v1/completions
- https://docs.anthropic.com/en/api/messages
  - /v1/messages
  - for [anthropics/claude-code](https://github.com/anthropics/claude-code)
- Gemini API https://ai.google.dev/api
  - for [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
- Vertex AI API https://cloud.google.com/vertex-ai/docs/reference/rest
- https://openrouter.ai/docs/api-reference/overview
  - /v1/chat/completions
- https://docs.bigmodel.cn/api-reference
  - OpenAI https://open.bigmodel.cn/api/paas/v4/
  - Anthropic https://open.bigmodel.cn/api/anthropic
- [vercel/ai](https://github.com/vercel/ai)

## Response

## BatchAPI

- 平台 “填谷” 策略
- 提高 GPU 利用率
- 价格折扣
- 新应用场景
- 参考
  - https://docs.together.ai/docs/batch-inference

# FAQ

## /v1/completions vs /v1/chat/completions vs /v1/responses

- /v1/chat/completions
  - messages
- /v1/completions
  - **已弃用** 不推荐在新项目中使用
  - prompt
- /v1/responses
- /v1/conversations
  - 对话管理
