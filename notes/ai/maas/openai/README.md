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
- Tools
  - apply_patch https://developers.openai.com/api/docs/guides/tools-apply-patch
    - https://github.com/code-yeongyu/pi-apply-patch
- 价格
  - https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu
  - https://developers.openai.com/api/docs/pricing
  - https://help.openai.com/en/articles/20001106-codex-rate-card

## Chat / Responses

- Chat Completions 是常见兼容接口。
- Responses API 是 OpenAI 新一代统一接口。
- MaaS 网关通常需要同时兼容 OpenAI Chat Completions、Responses 以及厂商私有字段。

## Streaming

- OpenAI streaming 细节见 [sse](../spec/sse.md)。

## ToolChoice

- `auto`
  - 自动选择工具。
- `required`
  - 必须使用工具。
- `none`
  - 不使用工具。

## Role

| role        | 说明                                  |
| ----------- | ------------------------------------- |
| `developer` | 新版 OpenAI 指令角色，优先级高于 user |
| `system`    | 系统指令                              |
| `user`      | 用户消息                              |
| `assistant` | 模型回复                              |
| `tool`      | 新版 OpenAI 工具结果 role             |
| `function`  | 旧版 OpenAI function calling role     |

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

- OpenAI prompt cache 细节见 [cache](../spec/cache.md)。
- 参考
  - <https://platform.openai.com/docs/guides/prompt-caching>
  - <https://developers.openai.com/api/docs/guides/prompt-caching>

## 错误码

- <https://platform.openai.com/docs/guides/error-codes>

# Models

| model           | in     | cache read | cache write | out     | note                                                  |
| --------------- | ------ | ---------- | ----------- | ------- | ----------------------------------------------------- |
| `gpt-5.6`       | $5.00  | $0.50      | $6.25       | $30.00  | alias，路由到 `gpt-5.6-sol`                           |
| `gpt-5.6-sol`   | $5.00  | $0.50      | $6.25       | $30.00  | flagship / frontier capability                        |
| `gpt-5.6-terra` | $2.50  | $0.25      | $3.125      | $15.00  | balanced，约等于旧 mini 档位                          |
| `gpt-5.6-luna`  | $1.00  | $0.10      | $1.25       | $6.00   | efficient / high-volume，约等于旧 nano 档位           |
| `gpt-5.5`       | $5.00  | $0.50      | -           | $30.00  | 旧 flagship；`>272K` 同样有 long-context tier         |
| `gpt-5.5-pro`   | $30.00 | -          | -           | $180.00 | 旧独立 Pro 模型；GPT-5.6 改为 `reasoning.mode: "pro"` |

- Context Window
  - GPT 5.5, GPT 5.6 - 1.05M, 128K Output, 272K Long Context

## GPT 5.6

- `gpt-5.6` 是 alias，默认指向 `gpt-5.6-sol`；生产建议按需要 pin 到 `gpt-5.6-sol` / `gpt-5.6-terra` / `gpt-5.6-luna`。
- `gpt-5.6-sol`：最高能力，适合复杂 coding、agentic workflow、深度分析。
- `gpt-5.6-terra`：能力和成本平衡，适合作为多数生产 workload 的默认候选。
- `gpt-5.6-luna`：最低成本、最高吞吐取向，适合高频、批量、低延迟或成本敏感场景。
- 支持 `reasoning.effort: none | low | medium | high | xhigh | max`。
- 支持 `reasoning.mode: "pro"`；GPT-5.6 不再通过单独 `*-pro` model slug 表达 Pro mode。
- 支持 explicit prompt caching：cache write 按 uncached input 的 1.25× 计费，cache read 仍为折扣价。

| input tokens | input / cache read / cache write | output | 说明                                                     |
| ------------ | -------------------------------- | ------ | -------------------------------------------------------- |
| `<=272K`     | 1×                               | 1×     | 标准价格                                                 |
| `>272K`      | 2×                               | 1.5×   | long-context tier，注意可能按整次 request / session 计价 |

参考：

- <https://developers.openai.com/api/docs/pricing.md>
- <https://developers.openai.com/api/docs/guides/latest-model>
- <https://developers.openai.com/api/docs/models/gpt-5.6-sol>
- <https://developers.openai.com/api/docs/models/gpt-5.6-terra>
- <https://developers.openai.com/api/docs/models/gpt-5.6-luna>
- <https://developers.openai.com/api/docs/models/gpt-5.5>
