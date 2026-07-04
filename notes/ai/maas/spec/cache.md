---
title: MaaS Prompt Cache
---

# MaaS Prompt Cache

## 最小缓存 Token

| 模型 / 场景 | 最小缓存 Token 数 |
| :--- | :--- |
| Claude Opus 4.5 | 4096 |
| Claude Opus 4.1, 4 | 1024 |
| Claude Sonnet 4.5, 4, ~~3.7~~ | 1024 |
| Claude Haiku 4.5 | 4096 |
| Claude Haiku ~~3.5~~, 3 | 2048 |
| Gemini 3 Pro Preview | 4096 |
| Gemini 3 Flash Preview | 1024 |
| Gemini 2.5 Pro | 4096 |
| Gemini 2.5 Flash | 1024 |
| Gemini Explicit Caching (Vertex AI) | 4096 |
| Gemini Context Caching (Early Versions) | 32768 |
| OpenAI GPT | 1024 |

## 类型

- Implicit Caching
  - 提供 75% - 90% 的输入 Token 折扣。
  - 通常由服务端自动识别稳定 prompt 前缀。
- Explicit Caching
  - 显式创建 cache 对象。
  - 按 TTL 收取存储费用。
- 容量
  - 最大缓存大小通常可接近模型完整上下文窗口，可超过 100 万 token。

## Gemini

- Gemini 3 系列建议 Prompt 前缀或缓存数据至少达到 4096 token，以确保缓存生效并降低 API 成本。
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

## OpenAI

```json
{
  "prompt_cache_key": "",
  "prompt_cache_retention": "24h"
}
```

- `prompt_cache_retention`
  - `in_memory`
  - `24h`
- 最小通常为 1024 tokens。
- `gpt-5.5`、`gpt-5.5-pro` 后默认是 24h。

## Usage

```json
{
  "usage": {
    "prompt_tokens": 2006,
    "completion_tokens": 300,
    "total_tokens": 2306,
    "prompt_tokens_details": {
      "cached_tokens": 1920
    },
    "completion_tokens_details": {
      "reasoning_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  }
}
```

## 注意

- Tool call 缓存实际缓存的是 tool schema、描述等 prompt 前缀内容。
- 修改 system prompt、tool schema、上下文前缀顺序，都可能导致 cache miss。
- Cache 命中通常只降低输入 token 成本，不一定降低完整请求延迟。

## 参考

- <https://ai.google.dev/gemini-api/docs/caching>
- <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>
- <https://platform.openai.com/docs/guides/prompt-caching>
- <https://developers.openai.com/api/docs/guides/prompt-caching>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html>
