---
title: MaaS API
---

# MaaS API

- Google Generative AI API
  - https://ai.google.dev/api/rest
  - Google AI Studio, Gemini API
  - https://generativelanguage.googleapis.com/v1beta
  - https://generativelanguage.googleapis.com/v1beta/openai - OpenAI API compatible
  - 接口
    - `/models/{model_id}:streamGenerateContent`
    - `/models/{model_id}:generateContent?key={key}`
- Google Vertex AI
  - GCP, 企业级、全托管的机器学习 (ML) 平台
  - Model Garden + MLOps
- Anthropic
  - https://docs.claude.com/en/api/overview
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
  - https://support.huaweicloud.com/usermanual-maas-modelarts/maas-modelarts-0080.html

| openai              | anthropic                 | google |
| ------------------- | ------------------------- | ------ |
| parallel_tool_calls | disable_parallel_tool_use |        |

- “长尾分布”
- “突发性”
- "Fat Tail" (肥尾)
- 3+Sigma + 15-30min 窗口检查异动

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

## role developer vs system

- OpenAI o1-2024-12-17 之后推出的
- developer 权重比 system 高
- developer
  - 强调规则
- system
  - 强调角色
