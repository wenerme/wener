---
title: Anthropic MaaS API
---

# Anthropic MaaS API

- [Anthropic Beta Flags](./anthropic-beta-flags.md)
- [Anthropic FAQ](./anthropic-faq.md)

- Anthropic API
  - <https://platform.claude.com/docs/en/api/overview>
- SDK
  - <https://github.com/anthropics/anthropic-sdk-typescript>
  - <https://github.com/anthropics/anthropic-sdk-typescript/blob/main/src/resources/beta/messages/messages.ts>
- Postman collection
  - <https://www.postman.com/postman/anthropic-apis/documentation/dhus72s/claude-api>

## Messages API

- Anthropic 使用 Messages API 作为主要对话接口。
- Raw HTTP 必须发送 `anthropic-version: 2023-06-01`；beta 能力另用 `anthropic-beta`。
- Streaming 使用 SSE named events；不要依赖 OpenAI 风格的 `data: [DONE]` 作为结束标志。
- `max_tokens` 对应 OpenAI 常见的 `max_completion_tokens`。
- tool result 通常以 `user` role 回传，而不是 OpenAI 新版的 `tool` role。

| OpenAI                  | Anthropic                       | 说明                           |
| ----------------------- | ------------------------------- | ------------------------------ |
| `parallel_tool_calls`   | `disable_parallel_tool_use`     | 并行工具调用控制，语义方向相反 |
| `max_completion_tokens` | `max_tokens`                    | 输出 token 上限                |
| `tool` role             | `user` role + tool result block | 工具结果回传方式不同           |

## Extended thinking

- 新模型优先使用 adaptive thinking：`thinking: {type: "adaptive"}`。
- `output_config.effort` 控制整体 token 投入，影响 thinking、正文和 tool call；默认通常为 `high`，但支持的 level 取决于模型。
- `thinking: {type: "enabled", budget_tokens: N}` 是旧模型和部分过渡模型的 manual thinking 形式；不能假设所有新模型仍接受。
- Thinking block 与生成它的模型绑定。切换模型时应移除历史 `thinking` / `redacted_thinking` block；同模型多轮则按文档要求原样回传。
- 参考：<https://platform.claude.com/docs/en/build-with-claude/extended-thinking>
- 参考：<https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking>
- 参考：<https://platform.claude.com/docs/en/build-with-claude/effort>

## Interleaved thinking

- 思考过程可以与 tool call 交错。
- 新模型的 adaptive thinking 自动支持 interleaved thinking，不需要历史 beta header。
- 仍使用 manual thinking 的旧模型是否需要 `interleaved-thinking-2025-05-14`，按具体模型文档核实。
- 该能力基于 Messages API 的 thinking/tool content block 顺序。

## Prompt caching

- Anthropic prompt cache 细节见 [cache](../spec/cache.md)。
- `cache_control: {type: "ephemeral"}` 默认 TTL 为 5 分钟；需要 1 小时时设置 `ttl: "1h"`。
- 通过 `usage.cache_creation_input_tokens` 和 `usage.cache_read_input_tokens` 判断 cache write/hit，不要只看是否发送了 `cache_control`。
- 参考：<https://platform.claude.com/docs/en/build-with-claude/prompt-caching>

## Data residency

- `inference_geo: "global" | "us"` 控制单次 Messages 请求的推理地域；`us` 有额外价格 multiplier。
- 仅适用于 Anthropic direct API，并且需要模型支持；Bedrock/Vertex 的地域由 endpoint 或 inference profile 决定。
- Managed Agents 不接受每次请求的 `inference_geo`，而是遵循 workspace geo。
- 参考：<https://platform.claude.com/docs/en/build-with-claude/data-residency>

## 错误码

- <https://platform.claude.com/docs/en/api/errors>
