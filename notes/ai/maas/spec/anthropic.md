---
title: Anthropic MaaS API
---

# Anthropic MaaS API

- Anthropic API
  - <https://platform.claude.com/docs/en/api/overview>
- SDK
  - <https://github.com/anthropics/anthropic-sdk-typescript>
  - <https://github.com/anthropics/anthropic-sdk-typescript/blob/main/src/resources/beta/messages/messages.ts>
- Postman collection
  - <https://www.postman.com/postman/anthropic-apis/documentation/dhus72s/claude-api>

## Messages API

- Anthropic 使用 Messages API 作为主要对话接口。
- `max_tokens` 对应 OpenAI 常见的 `max_completion_tokens`。
- tool result 通常以 `user` role 回传，而不是 OpenAI 新版的 `tool` role。

| OpenAI                  | Anthropic                       | 说明                           |
| ----------------------- | ------------------------------- | ------------------------------ |
| `parallel_tool_calls`   | `disable_parallel_tool_use`     | 并行工具调用控制，语义方向相反 |
| `max_completion_tokens` | `max_tokens`                    | 输出 token 上限                |
| `tool` role             | `user` role + tool result block | 工具结果回传方式不同           |

## Extended thinking

- Claude 3.7+ / Claude 4 支持 extended thinking。
- 参考：<https://platform.claude.com/docs/en/build-with-claude/extended-thinking>

## Interleaved thinking

- 思考过程中可以进行 tool call。
- Claude 4+ 支持，beta header: `interleaved-thinking-2025-05-14`。
- Messages API 才支持。

## Prompt caching

- Anthropic prompt cache 细节见 [cache](./cache.md)。
- 参考：<https://platform.claude.com/docs/en/build-with-claude/prompt-caching>

## 错误码

- <https://platform.claude.com/docs/en/api/errors>
