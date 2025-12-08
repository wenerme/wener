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
- OpenAI
  - https://platform.openai.com/docs/api-reference/chat/create
- XAI
  - https://docs.x.ai/docs/api-reference
- https://www.postman.com/postman/anthropic-apis/documentation/dhus72s/claude-api
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
