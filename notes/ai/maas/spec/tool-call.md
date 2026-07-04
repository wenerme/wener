---
title: MaaS Tool Call
---

# MaaS Tool Call

## 概念

- Tool call / function calling 是模型请求外部能力的通用机制。
- MaaS 网关需要处理不同厂商的 tool schema、tool choice、tool result role 和 streaming chunk 差异。

## ToolChoice

| 值 | 说明 |
| --- | --- |
| `auto` | 自动选择是否使用工具 |
| `required` | 必须使用工具 |
| `none` | 不使用工具 |

## Provider 差异

| OpenAI | Anthropic | Google |
| --- | --- | --- |
| `parallel_tool_calls` | `disable_parallel_tool_use` | 需按模型/接口能力确认 |
| `tools[].function` | `tools` / tool block | `functionDeclaration` |
| `tool` role | user role tool result block | function response part |

## Google

- 内置 tool 和 `functionDeclaration` 工具不能同时使用。
- OpenAI 里的 tool 通常映射为一个 `functionDeclaration`。
- Google 内置 tool 和 functionDeclaration 语义不同。

## Anthropic

- tool result 通常通过 `user` role 中的 tool result block 回传。
- 并行工具调用控制是 `disable_parallel_tool_use`，与 OpenAI 的 `parallel_tool_calls` 语义方向相反。

## Cache

- Tool call 缓存实际缓存的是 schema、描述等 prompt 前缀内容。
- 修改 tool schema、名称、描述会影响 prompt cache 命中。
