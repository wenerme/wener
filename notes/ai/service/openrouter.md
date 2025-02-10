---
title: openrouter
---

# openrouter

- https://openrouter.ai/models

```bash
curl https://openrouter.ai/api/v1/models

 TOKEN=
curl -H "Authorization: Bearer $TOKEN" https://openrouter.ai/api/v1/auth/key

time curl -sf -X POST -H "Authorization: Bearer $TOKEN" https://openrouter.ai/api/v1/chat/completions \
  --json '{"model":"deepseek/deepseek-r1:free","prompt":"Hello"}' | jq

curl -sf -X POST -H "Authorization: Bearer $TOKEN" https://openrouter.ai/api/v1/chat/completions \
  --json '{"model":"deepseek/deepseek-r1:free","messages":[{"role":"user","content":"What is the meaning of life?"}]}' | jq
```

- HTTP-Referer 站点 URL
- X-Title
- Search
  - https://openrouter.ai/docs/web-search
