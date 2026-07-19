---
title: Vertex AI MaaS API
---

# Vertex AI MaaS API

- Vertex AI 使用 Google Cloud project/location、IAM/ADC、quota、VPC-SC 和 regional/global endpoint。
- API host
  - Regional：`LOCATION-aiplatform.googleapis.com`
  - Global：`aiplatform.googleapis.com`
  - Partner Models 还支持特定 multi-region host，例如 `aiplatform.us.rep.googleapis.com`。

## PredictionService

- 上游：[googleapis/googleapis/google/cloud/aiplatform/v1/prediction_service.proto](https://github.com/googleapis/googleapis/blob/master/google/cloud/aiplatform/v1/prediction_service.proto)
- Proto package：`google.cloud.aiplatform.v1`
- Default host：`aiplatform.googleapis.com`
- 本地导出：`just proto`
- 默认固定 googleapis commit `69d78666e1c3b7c3b4f9d229550754c148638f98`；更新时可执行 `GOOGLEAPIS_REF=branch=master just proto`，核对后再更新默认 commit。
- 输出：`proto/google/cloud/aiplatform/v1/prediction_service.proto` 及递归 import 依赖。
- 主要 RPC
  - `Predict` / `RawPredict` / `StreamRawPredict`
  - `GenerateContent` / `StreamGenerateContent`
  - `EmbedContent`

## Gemini on Vertex AI

- Gemini Developer API 与 Vertex Gemini 可以共享相近的 content/tool/generation message，但 endpoint、认证、resource name 和可用能力不同。
- Vertex publisher model resource：`projects/{project}/locations/{location}/publishers/google/models/{model}`。
- 不应使用 `generativelanguage.googleapis.com` 的 API key 路径代替 Vertex IAM 调用。

## Partner Models

- [Use partner models](https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-partner-models)
- Anthropic Claude、Mistral 等是 Vertex AI 上的 Partner Models，由 Google Cloud endpoint、IAM 和 quota 承载。
- Vertex Anthropic 常见路径：

```text
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL_ID:rawPredict
POST https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/publishers/anthropic/models/MODEL_ID:streamRawPredict
```

- Body 使用 Anthropic on Vertex 的 partner-specific schema，例如 `anthropic_version: "vertex-2023-10-16"`，不是 Gemini `GenerateContentRequest`。
- 因此 Vertex Anthropic 是 `PredictionService.RawPredict / StreamRawPredict` transport 上承载 Anthropic payload 的特例，而不是 Generative Language API 的一部分。

## 参考

- <https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude/use-claude>
- <https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference>
- <https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/api-errors>
