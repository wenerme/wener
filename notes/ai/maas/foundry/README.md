---
title: Microsoft Foundry
---

# Microsoft Foundry

- Microsoft Foundry
  - 旧名称 Azure AI Foundry、Azure AI Studio、Azure AI Services
- https://ai.azure.com/
- `Microsoft.CognitiveServices/accounts` , `AIServices`。
- OpenAI
  - Base URL：`https://{resource}.openai.azure.com/openai/v1/`

```bash
curl "https://${AZURE_FOUNDRY_RESOURCE}.openai.azure.com/openai/v1/responses" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${AZURE_AI_AUTH_TOKEN}" \
  -d '{
    "model": "deployment-name",
    "input": "Hello"
  }'
```

## API Map

| Surface                    | Endpoint shape                                                    | 定位                                                                                                          |
| -------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Foundry Project API        | `https://{resource}.services.ai.azure.com/api/projects/{project}` | Project 下的 agents、connections、deployments、datasets、evaluations、indexes、memory、skills 等 stateful API |
| Project OpenAI route       | `{project-endpoint}/openai/v1`                                    | Project scope 下的 Responses、conversations、evals、fine-tuning 等 OpenAI-style route                         |
| OpenAI v1-compatible API   | `https://{resource}.openai.azure.com/openai/v1/`                  | 模型 inference 和 OpenAI SDK 兼容主路径                                                                       |
| Services-host OpenAI route | `https://{resource}.services.ai.azure.com/openai/v1/`             | Foundry resource 上可用的 OpenAI v1-compatible host 形式                                                      |
| Legacy Azure OpenAI        | `.../openai/deployments/{deployment}/...?api-version=...`         | 旧版 dated `api-version` API；已有系统可能仍在使用                                                            |
| Model Inference API        | `https://{resource}.services.ai.azure.com/models/...`             | 已弃用；新接入不要使用                                                                                        |

## Authentication

| Surface                  | Authentication                                 | OAuth scope/audience                                             |
| ------------------------ | ---------------------------------------------- | ---------------------------------------------------------------- |
| Foundry Project API      | Microsoft Entra ID                             | `https://ai.azure.com/.default`                                  |
| Resource-level OpenAI v1 | API key / `authorization` / Microsoft Entra ID | 固定 OpenAPI 声明 `https://cognitiveservices.azure.com/.default` |

```bash
# Foundry Project API
az account get-access-token \
  --resource https://ai.azure.com \
  --query accessToken \
  --output tsv

# Resource-level OpenAI v1 API
az account get-access-token \
  --resource https://cognitiveservices.azure.com \
  --query accessToken \
  --output tsv
```

## 参考

- [Azure/azure-rest-api-specs](https://github.com/Azure/azure-rest-api-specs)
  - MIT, TypeSpec, OpenAPI
  - Microsoft Azure REST API specification canonical repository。
- <https://learn.microsoft.com/en-us/azure/foundry/what-is-foundry>
- <https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/endpoints>
- <https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle>
- <https://learn.microsoft.com/en-us/azure/foundry/how-to/integrate-with-other-apps>
- <https://learn.microsoft.com/en-us/azure/foundry/how-to/model-inference-to-openai-migration>
