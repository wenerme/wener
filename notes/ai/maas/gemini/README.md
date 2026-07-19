---
title: Gemini API
---

# Gemini API

- Gemini Developer API / Google AI Studio API
  - generativelanguage.googleapis.com
  - API key

## Gemini API

- Google Generative AI API
  - <https://ai.google.dev/api/rest>
  - Google AI Studio / Gemini API
  - BaseURL: `https://generativelanguage.googleapis.com/v1beta`
  - OpenAI compatible BaseURL: `https://generativelanguage.googleapis.com/v1beta/openai`
- 常用接口
  - `/models/{model_id}:streamGenerateContent`
  - `/models/{model_id}:generateContent?key={key}`

## Protocol

- 上游：[googleapis/googleapis](https://github.com/googleapis/googleapis/tree/master/google/ai/generativelanguage)
- Proto package：`google.ai.generativelanguage.*`
- Default host：`generativelanguage.googleapis.com`
- 本地导出：`just proto`
- 默认固定 googleapis commit `69d78666e1c3b7c3b4f9d229550754c148638f98`；更新时可执行 `GOOGLEAPIS_REF=branch=master just proto`，核对后再更新默认 commit。
- 输出：`proto/google/ai/generativelanguage/` 及递归 import 依赖。
- 当前主要关注 `v1`、`v1beta`；导出同时保留 `v1alpha`、`v1beta2`、`v1beta3` 等历史协议，便于兼容性对照。
- 各版本的 service/message 集合并不完全相同。

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
