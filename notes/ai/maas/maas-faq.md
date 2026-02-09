---
title: FAQ
---

# FAQ

收集和整理各个 MAAS Provider 的 API 问题

- tool call 缓存实际是缓存的 schema+描述 等

## Anthropic Bedrock need thinking block for thinking

```
Expected `thinking` or `redacted_thinking`, but found `tool_use`.
When `thinking` is enabled, a final `assistant` message must start with a thinking block
```

- GCP Vertex AI 要求没这么严格

## role developer vs system

- OpenAI o1-2024-12-17 之后推出的
- developer 权重比 system 高
- developer
  - 强调规则
- system
  - 强调角色

## AI_APICallError: Error while downloading [URL REDACTED].

openai 相关似乎不允许 wikimedia 来源图片

## Output Speed

| 参考      | TPS     |
| --------- | ------- |
| 朗读/听书 | 3-4     |
| 正常默读  | 5-10    |
| 快速略读  | 15 - 25 |

| Model                  |  TPS   |
| ---------------------- | :----: |
| Claude Sonnet 4.5      |   40   |
| gemini-3-flash-preview | 80-100 |

| 级别                |    TPS     | 典型应用场景             |
| :------------------ | :--------: | :----------------------- |
| **超快 (Instant)**  | 800 - 1200 | 实时语音助手、搜索建议   |
| **快速 (Fast)**     | 150 - 250  | 简单翻译、摘要、简单对话 |
| **标准 (Standard)** |  70 - 100  | 复杂指令、代码生成、字幕 |
| **重型 (Heavy)**    |  20 - 50   | 深度写作、复杂逻辑推理   |

- Prefill Speed
  - 一般 > 2000t/s
  - Context Caching 加速 Prefill
- TPS / Token Per Seconds
- 思考影响速度
  - 思考 budget 影响思考深度

# Gemini

## Missing thought_signature in function call

## Please ensure that the number of function response parts is equal to the number of function call parts of the function call turn.

- 非常多类似的错误
- https://github.com/google-gemini/gemini-cli/issues?q=Please%20ensure%20that%20the%20number%20of%20function%20response%20parts%20is%20equal%20to%20the%20number%20of%20function%20call%20parts%20of%20the%20function%20call%20turn.

## Unable to submit request because thinking_budget and thinking_level are not supported together

Gemini 限制

# Anthropic

## Claude temperature, top_p 不能一起传

- Claude Sonnet 4.5 and Claude Haiku 4.5 only support specification of one of temperature or top_p parameters, but cannot handle both.
- 思考与 temperature、top_p 或 top_k 修改不兼容，也不兼容强制使用工具。
- 启用思考后，您无法预先填写响应。
- 对思考预算进行更改，会导致包含消息的缓存提示前缀失效。但是，当思考的参数发生变化时，缓存系统提示和工具定义将继续起作用。
- 参考
  - https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages-request-response.html
  - https://docs.aws.amazon.com/zh_cn/bedrock/latest/userguide/claude-messages-extended-thinking.html

## max_tokens must be greater than thinking.budget_tokens

- https://docs.claude.com/en/docs/build-with-claude/extended-thinking

## Input should be greater than or equal to 1024

- budget_tokens 最小 1024

# Moonshoot

- 协议严格，kimi follow 类似 anthropic 的限制

## tool_call_id is not found

缺少 tool_calls，但是有 tool 角色和 tool_call_id

## thinking is enabled but reasoning_content is missing in assistant tool call message at index

tool_call 缺少 reasoning_content

# Bedrock

## reasoning: Extra inputs are not permitted

协议很严格，不允许额外字段
