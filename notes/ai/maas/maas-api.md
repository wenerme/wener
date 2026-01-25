---
title: MaaS API
---

# MaaS API

- Google Generative AI API
  - https://ai.google.dev/api/rest
  - Google AI Studio, Gemini API
  - BaseURL https://generativelanguage.googleapis.com/v1beta
  - OpenAI BaseURL https://generativelanguage.googleapis.com/v1beta/openai - OpenAI API compatible
  - 接口
    - `/models/{model_id}:streamGenerateContent`
    - `/models/{model_id}:generateContent?key={key}`
- Google Vertex AI
  - GCP, 企业级、全托管的机器学习 (ML) 平台
  - Model Garden + MLOps
- Anthropic
  - https://platform.claude.com/docs/en/api/overview
  - SDK
    - https://github.com/anthropics/anthropic-sdk-typescript
    - https://github.com/anthropics/anthropic-sdk-typescript/blob/main/src/resources/beta/messages/messages.ts
- OpenAI
  - https://platform.openai.com/docs/api-reference/chat/create
- XAI
  - https://docs.x.ai/docs/api-reference
- https://www.postman.com/postman/anthropic-apis/documentation/dhus72s/claude-api
- vLLM
  - https://docs.vllm.ai/en/v0.10.2/api/vllm/entrypoints/openai/serving_completion.html
- Provider
  - https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-partner-models
- 错误码
  - https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/api-errors
  - https://platform.claude.com/docs/en/api/errors
  - https://platform.openai.com/docs/guides/error-codes
  - https://support.huaweicloud.com/usermanual-maas-modelarts/maas-modelarts-0080.html
- 参考
  - https://www.openresponses.org/

| openai                | anthropic                 | google |
| --------------------- | ------------------------- | ------ |
| parallel_tool_calls   | disable_parallel_tool_use |        |
| max_completion_tokens | max_tokens                |

- “长尾分布”
- “突发性”
- "Fat Tail" (肥尾)
- 3+Sigma + 15-30min 窗口检查异动

## Gemini API

- https://ai.google.dev/api/rest

## Multiple tools are supported only when they are all search tools

- 内置 tool 和 functionDeclaration 工具不能同时使用
- openai 里的 tool 映射为一个 functionDeclaration
- 其他的 tool 是内置 tool，语义上有点区别

## streaming

- 第一个 chunk 和最后一个 chunk 不应该包含 content
- 有些供应商在第二个 chunk 返回 role
- stream_options
  - continuous_usage_stat
    - 连续发送 usage
  - include_usage
    - 最后一个 chunk 包含 usage
- 参考
  - https://github.com/BerriAI/litellm/blob/4a8629ce/tests/local_testing/test_streaming.py

### first chunk

- 有些为了紧凑，会在第一个 chunk 包含内容
- 正常情况第一个 chunk 不应该包含内容

### last chunk

- vLLM, OpenAI 最后一个 chunk 的 content 为 空

```json
{
  "index": 0,
  "delta": {
    "content": ""
  },
  "logprobs": null,
  "finish_reason": "stop",
  "stop_reason": null
}
```

- 参考
  - https://github.com/BerriAI/litellm/issues/12417
    - LiteLLM 添加最后一个 chunk 的 content 为 空

## ToolChoice

- `auto`
  - 自动选择工具
- `required`
  - 必须使用工具
- `none`
  - 不使用工具

## Thinking

- https://ai.google.dev/gemini-api/docs/thinking
  - https://ai.google.dev/gemini-api/docs/thinking#set-budget
  - 不同模型支持逻辑不一样
  - 2.5 Pro 不能关闭 128 to 32768
  - 关闭 thinkingBudget = 0
  - 动态 thinkingBudget = -1
  - thinkingLevel
    - 默认 high
    - low, high
    - Gemini 3.0

```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Provide a list of 3 famous physicists and their key contributions"
        }
      ]
    }
  ],
  "generationConfig": {
    "thinkingConfig": {
      "thinkingLevel": "low"
    }
  }
}
```

## Interleaved thinking

思考过程可以进行 tool call

- Claude 4+
  - interleaved-thinking-2025-05-14
  - Messages API 才支持
- MiniMax-M2
- Kimi-K2-Thinking

---

- https://platform.claude.com/docs/en/build-with-claude/extended-thinking
- https://docs.vllm.ai/en/latest/features/interleaved_thinking/

## reasoning_details

```json
{
  "type": "reasoning.summary",
  "summary": "The model analyzed the problem by first identifying key constraints, then evaluating possible solutions...",
  "id": "reasoning-summary-1",
  "format": "anthropic-claude-v1",
  "index": 0
}
```

- type
  - reasoning.summary
  - reasoning.encrypted
  - reasoning.text
- 维护思考细节信息
  - OpenAI o
  - Claude 3.7+ thinking
  - Gemini Reasoning
  - xAI Reasoning

---

- https://openrouter.ai/docs/guides/best-practices/reasoning-tokens

## Preserved thinking

- 智普 GLM 4.7 支持保留思考内容
  - 再生成 chat template 的时候允许传递之前的思考内容
  - 默认不保持 clear_thinking: true
  - https://huggingface.co/zai-org/GLM-4.7/blob/main/chat_template.jinja
    - clear_thinking 控制是否包含 reasoning_content

---

- https://docs.bigmodel.cn/cn/guide/capabilities/thinking-mode

## role

- developer
- system
- user
- assistant
- tool
  - 新版本 openai
  - Anthropic 使用 user role
- function
  - 旧版本 openai

# Gemini

## Missing thought_signature in function call

## Please ensure that the number of function response parts is equal to the number of function call parts of the function call turn.

- 非常多类似的错误
- https://github.com/google-gemini/gemini-cli/issues?q=Please%20ensure%20that%20the%20number%20of%20function%20response%20parts%20is%20equal%20to%20the%20number%20of%20function%20call%20parts%20of%20the%20function%20call%20turn.

# usage

- 付费
  - 算力
  - pay per token
  - pay per request
  - pay per item
    - 图、语音

**abort**

- stream 499 会产生费用
- 非strema 中断也会产生费用
  - 极端情况会产生完整的费用
- Agent 实现在中断时候需要预估 usage
  - 否则 context window 会失准

---

- Token usage unavailable during streaming abort/interruption https://github.com/vercel/ai/issues/7628

# FAQ

## role developer vs system

- OpenAI o1-2024-12-17 之后推出的
- developer 权重比 system 高
- developer
  - 强调规则
- system
  - 强调角色

## Unable to submit request because thinking_budget and thinking_level are not supported together

Gemini 限制

## Claude temperature, top_p 不能一起传

- Claude Sonnet 4.5 and Claude Haiku 4.5 only support specification of one of temperature or top_p parameters, but cannot handle both.
- 思考与 temperature、top_p 或 top_k 修改不兼容，也不兼容强制使用工具。
- 启用思考后，您无法预先填写响应。
- 对思考预算进行更改，会导致包含消息的缓存提示前缀失效。但是，当思考的参数发生变化时，缓存系统提示和工具定义将继续起作用。
- 参考
  - https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages-request-response.html
  - https://docs.aws.amazon.com/zh_cn/bedrock/latest/userguide/claude-messages-extended-thinking.html

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
