---
title: MaaS
---

# Model as a Service

- Provider
  - https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-partner-models
- 错误码
  - https://support.huaweicloud.com/usermanual-maas-modelarts/maas-modelarts-0080.html
- 参考
  - https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-models-as-a-service-maas

```
Model
  Provider Model
    Account
```

| abbr. | stand for                     | meaning        |
| ----- | ----------------------------- | -------------- |
| MaaS  | Model as a Service            | 模型即服务     |
| MLaaS | Machine Learning as a Service | 机器学习即服务 |

| en                       | cn         |
| ------------------------ | ---------- |
| Inference as a Service   | 推理即服务 |
| Fine-tuning as a Service | 微调即服务 |
| Foundation Models        | 基础模型   |

## Provider

| provider | for |
| --- | --- |
| [OpenAI](./openai/) | Chat Completions、Responses、role、tool choice、reasoning details |
| [Gemini](./gemini/) | Gemini Developer API、Generative Language API、tools、thinking、cache |
| [Vertex AI](./vertex/) | Vertex PredictionService、Gemini publisher models、partner models |
| [Amazon Bedrock](./bedrock/) | Converse / InvokeModel、EventStream、tool use、usage |
| [Microsoft Foundry](./foundry/) | Project API、OpenAI v1、Foundry Models、TypeSpec/OpenAPI |
| [Anthropic API](./anthropic/) | Claude Messages API、thinking、tool use、cache、beta flags、FAQ |

## Spec

| topic | for |
| --- | --- |
| [MaaS API Spec](./spec/) | 通用 MaaS API 协议设计入口 |
| [SSE](./spec/sse.md) | Streaming / SSE chunk、usage、abort 行为 |
| [Usage](./spec/usage.md) | token usage、计费维度、中断计费、异动检测 |
| [Metrics](./spec/metrics.md) | 观测性指标、labels、dashboard、告警 |
| [Tool Call](./spec/tool-call.md) | tool calling、tool choice、provider 差异 |
| [Cache](./spec/cache.md) | prompt cache、最小 token、TTL、usage 字段 |
