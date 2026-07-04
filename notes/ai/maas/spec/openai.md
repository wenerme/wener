---
title: OpenAI MaaS API
---

# OpenAI MaaS API

- OpenAI API
  - <https://platform.openai.com/docs/api-reference/chat/create>
- Responses / OpenResponses
  - <https://www.openresponses.org/>
- OpenAI compatible servers
  - vLLM: <https://docs.vllm.ai/en/v0.10.2/api/vllm/entrypoints/openai/serving_completion.html>

## Chat / Responses

- Chat Completions 是常见兼容接口。
- Responses API 是 OpenAI 新一代统一接口。
- MaaS 网关通常需要同时兼容 OpenAI Chat Completions、Responses 以及厂商私有字段。

## Streaming

- OpenAI streaming 细节见 [sse](./sse.md)。

## ToolChoice

- `auto`
  - 自动选择工具。
- `required`
  - 必须使用工具。
- `none`
  - 不使用工具。

## Role

| role | 说明 |
| --- | --- |
| `developer` | 新版 OpenAI 指令角色，优先级高于 user |
| `system` | 系统指令 |
| `user` | 用户消息 |
| `assistant` | 模型回复 |
| `tool` | 新版 OpenAI 工具结果 role |
| `function` | 旧版 OpenAI function calling role |

## Reasoning details

```json
{
  "type": "reasoning.summary",
  "summary": "The model analyzed the problem by first identifying key constraints, then evaluating possible solutions...",
  "id": "reasoning-summary-1",
  "format": "anthropic-claude-v1",
  "index": 0
}
```

- `type`
  - `reasoning.summary`
  - `reasoning.encrypted`
  - `reasoning.text`
- 用于维护思考细节信息。
- 相关模型/能力
  - OpenAI o 系列
  - Claude 3.7+ thinking
  - Gemini Reasoning
  - xAI Reasoning

参考：<https://openrouter.ai/docs/guides/best-practices/reasoning-tokens>

## Prompt caching

- OpenAI prompt cache 细节见 [cache](./cache.md)。
- 参考
  - <https://platform.openai.com/docs/guides/prompt-caching>
  - <https://developers.openai.com/api/docs/guides/prompt-caching>

## 错误码

- <https://platform.openai.com/docs/guides/error-codes>
