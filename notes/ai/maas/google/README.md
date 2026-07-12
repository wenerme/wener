---
title: Google MaaS API
---

# Google MaaS API

- google-generative-ai - Gemini Developer API / AI Studio API
  - generativelanguage.googleapis.com
  - API key
- google-vertex - Vertex AI / Google Cloud IAM / Gemini Enterprise Agent Platform API
  - Google Cloud IAM/ADC
  - VPC-SC、region、IAM、enterprise governance

## Gemini API

- Google Generative AI API
  - <https://ai.google.dev/api/rest>
  - Google AI Studio / Gemini API
  - BaseURL: `https://generativelanguage.googleapis.com/v1beta`
  - OpenAI compatible BaseURL: `https://generativelanguage.googleapis.com/v1beta/openai`
- 常用接口
  - `/models/{model_id}:streamGenerateContent`
  - `/models/{model_id}:generateContent?key={key}`

## Vertex AI

- Google Vertex AI
  - GCP 企业级、全托管机器学习平台
  - Model Garden + MLOps
- Provider / partner models
  - <https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-partner-models>

## Tools

### Multiple tools are supported only when they are all search tools

- 内置 tool 和 `functionDeclaration` 工具不能同时使用。
- OpenAI 里的 `tool` 通常映射为一个 `functionDeclaration`。
- Google 内置 tool 和 function tool 语义不同，网关做兼容时需要区分。

## Thinking

- <https://ai.google.dev/gemini-api/docs/thinking>
  - <https://ai.google.dev/gemini-api/docs/thinking#set-budget>
- 不同模型支持逻辑不一样。
- Gemini 2.5 Pro 不能完全关闭 thinking，范围通常为 `128` 到 `32768`。
- `thinkingBudget = 0`：关闭 thinking。
- `thinkingBudget = -1`：动态 thinking budget。
- `thinkingLevel`
  - 默认 `high`
  - `low` / `high`
  - Gemini 3.0 支持

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

## Cache

- Gemini cache 细节见 [cache](../spec/cache.md)。
- Google OpenAI API 可通过 extra body 传递 Google 扩展字段。

```json
{
  "google": {
    "cached_content": "cachedContents/XXX",
    "thinking_config": {
      "thinking_level": "low",
      "include_thoughts": true
    }
  }
}
```

## 错误码

- <https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/api-errors>
