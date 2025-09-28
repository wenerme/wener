---
title: LiteLLM
---

# LiteLLM

- [BerriAI/litellm](https://github.com/BerriAI/litellm)
  - MIT+EE, Python
- 基础功能
  - OpenAI Proxy Server / LLM Gateway
  - Load Balancing
- 支持 Provider https://docs.litellm.ai/docs/providers/
  - OpenAI,Anthropic,Azure,Hugging Face,xAI,Moonshot AI
  - Ollama, LM Studio
  - VLLM
  - OpenRouter
  - 火山引擎 volcengine/
  - Triton Inference Server
  - 阿里云百炼 dashscope/
- 支持模型接口
  - Fireworks AI
  - OpenAI
  - Gemini
  - LiteLLM Proxy
  - Topaz
  - Anthropic
  - XAI
  - VLLM
  - Vertex AI
- 企业版功能
  - Security
  - Customize Logging, Guardrails, Caching per project
  - Spend Tracking & Data Exports
    - `x-litellm-response-cost`
  - Prometheus Metrics
  - Control Guardrails per API Key
  - Custom Branding
- 参考
  - Projects built on LiteLLM https://docs.litellm.ai/docs/project
  - https://github.com/BerriAI/litellm-pgvector

```bash
# WebUI http://0.0.0.0:4000/ui/
# Redoc http://127.0.0.1:4000/redoc
# Swagger http://127.0.0.1:4000/
# admin:$LITELLM_MASTER_KEY
# https://github.com/BerriAI/litellm/blob/main/docker-compose.yml
```

| env              | for |
| ---------------- | --- |
| CONFIG_FILE_PATH |

- 配置文件支持从 S3 读取
  - `LITELLM_CONFIG_BUCKET_{TYPE,NAME,OBJECT_KEY}`

 # FAQ

 ## got an unexpected keyword argument 'thinking'.

 - 请求带上

 ```json
 {
   "allowed_openai_params": [
     "thinking"
   ]
 }
 ```
