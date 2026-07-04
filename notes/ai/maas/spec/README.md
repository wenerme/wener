---
title: MaaS API Spec
---

# MaaS API Spec

- Session / Thread
  - Turn
- Message
  - Message Part / Content Part
    - Chunk Part

## Topics

| topic | for |
| --- | --- |
| [google](./google.md) | Gemini API、Vertex AI、Google tools / thinking / cache |
| [anthropic](./anthropic.md) | Claude Messages API、extended thinking、tool use、cache |
| [openai](./openai.md) | OpenAI Chat / Responses、role、tool choice、reasoning details |
| [sse](./sse.md) | Streaming / SSE chunk、usage、abort 行为 |
| [usage](./usage.md) | token usage、计费维度、中断计费、异动检测 |
| [metrics](./metrics.md) | 观测性指标、labels、dashboard、告警 |
| [tool-call](./tool-call.md) | tool calling、tool choice、provider 差异 |
| [cache](./cache.md) | prompt cache、最小 token、TTL、usage 字段 |
| [spec-faq](./spec-faq.md) | MaaS API spec 常见兼容问题 |

## 参考

- <https://github.com/canarybyte/veridrop>
  - AI API 中转站真伪检测 / Claude · OpenAI · Gemini 中转站真假鉴定工具
