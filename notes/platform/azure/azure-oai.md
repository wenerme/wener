---
title: Azure OpenAI
---

# Azure OpenAI

- https://oai.azure.com/portal
- [Azure OpenAI Service pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/)
- gpt-3.5-turbo
  - $0.002, 1000 tokens
  - 价格一样

```bash
# DEPLOYMENT 对应模型
# https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/
# https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/reference
# https://github.com/Azure/azure-rest-api-specs/blob/main/specification/cognitiveservices/data-plane/AzureOpenAI/inference/stable/2023-05-15/inference.json
curl https://$RESOURCE.openai.azure.com/openai/deployments/$DEPLOYMENT/completions?api-version=2023-05-15 \
  -H "api-key: $AZURE_API_KEY" \
  --json '{"prompt":"Hello","max_tokens":5}'

curl https://$RESOURCE.openai.azure.com/openai/deployments/$DEPLOYMENT/chat/completions?api-version=2023-05-15 \
  -H "api-key: $AZURE_API_KEY" \
  --json '{"messages":[{"role":"user","content":"Hello"}]}' | jq
```

- /completions
- /embeddings
- /chat/completions
