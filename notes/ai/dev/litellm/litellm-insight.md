---
tags:
  - Inside
---

# LiteLLM Inside

- 价格信息
  - https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json

| Header                                          | For                                        |
| ----------------------------------------------- | ------------------------------------------ |
| **Request**                                     |                                            |
| `x-litellm-timeout: <seconds>`                  | 请求超时设置                               |
| `x-litellm-stream-timeout: <seconds>`           | 第一个 Chunk 超时                          |
| `x-litellm-enable-message-redaction: <boolean>` | 启用消息内容屏蔽                           |
| `x-litellm-tags: <tag1,tag2,...>`               | 请求标签                                   |
| `x-litellm-num-retries: <number>`               | 请求重试次数                               |
| `x-litellm-spend-logs-metadata: <json>`         | 请求开销日志元数据                         |
| **Request/Anthropic**                           |                                            |
| `anthropic-version: <str>`                      | API version                                |
| `anthropic-beta: <str>`                         | beta version                               |
| **Request/OpenAI**                              |                                            |
| `openai-organization: <str>`                    | organization id                            |
| **Request/Bypass**                              |
| `x-*`                                           | 需要配置 forward_client_headers_to_llm_api |
| **Response/Rate Limit**                         |                                            |
| `x-ratelimit-remaining-requests: <int>`         | 剩余可用请求数                             |
| `x-ratelimit-remaining-tokens: <int>`           | 剩余可用token数                            |
| `x-ratelimit-limit-requests: <int>`             | 最大请求数限制                             |
| `x-ratelimit-limit-tokens: <int>`               | 最大token数限制                            |
| `x-ratelimit-reset-requests: <int>`             | 请求限制重置时间                           |
| `x-ratelimit-reset-tokens: <int>`               | token限制重置时间                          |
| **Response/Latency**                            |                                            |
| `x-litellm-response-duration-ms: <float>`       | 从请求到响应的总耗时(毫秒)                 |
| `x-litellm-overhead-duration-ms: <float>`       | LiteLLM处理开销时间(毫秒)                  |
| **Response/Retry&Fallback**                     |                                            |
| `x-litellm-attempted-retries: <int>`            | 实际重试次数                               |
| `x-litellm-attempted-fallbacks: <int>`          | 实际回退次数                               |
| `x-litellm-max-fallbacks: <int>`                | 最大回退次数限制                           |
| **Response/Cost**                               |                                            |
| `x-litellm-response-cost: <float>`              | API调用费用                                |
| `x-litellm-key-spend: <float>`                  | API密钥总消费                              |
| **Response/Bypass**                             |                                            |
| `llm_provider-*`                                | 透传LLM提供商的响应头                      |

```json title="spend-logs-metadata"
{ "user_id": "12345", "project_id": "proj_abc", "request_type": "chat_completion" }
```

## cache

- 用于高频相同问题场景
- `${namespace}:${sha256("model:${model}+messages+paramrs")}`

## semantic cache

- messages → embedding
  - 不同措辞但意思相近的问题
  - 降低 LLM 调用成本
- 支持存储
  - Redis, RedisVL
    - https://github.com/redis/redis-vl-python
    - litellm_semantic_cache_index
  - Qdrant

```json
{
  "id": "uuid",
  "vector": [],
  "payload": {
    "text": "prompt",
    "response": "value"
  }
}
```

```yaml
litellm_settings:
  cache: true
  cache_params:
    type: qdrant-semantic
    qdrant_collection_name: 'cache_tenant_${team_id}'
```

## config.yaml

```yaml
include:
  - model_config.yaml

model_list: []
litellm_settings:
  num_retries: 3 # retry call 3 times on each model_name (e.g. zephyr-beta)
  request_timeout: 10 # raise Timeout error if call takes longer than 10s. Sets litellm.request_timeout
  fallbacks: [{ 'zephyr-beta': ['gpt-4o'] }] # fallback to gpt-4o if call fails num_retries
  context_window_fallbacks: [{ 'zephyr-beta': ['gpt-3.5-turbo-16k'] }, { 'gpt-4o': ['gpt-3.5-turbo-16k'] }] # fallback to gpt-3.5-turbo-16k if context window error
  allowed_fails: 3 # cooldown model if it fails > 1 call in a minute.
router_settings: # router_settings are optional
  routing_strategy: simple-shuffle # Literal["simple-shuffle", "least-busy", "usage-based-routing","latency-based-routing"], default="simple-shuffle"
  model_group_alias: { 'gpt-4': 'gpt-4o' } # all requests with `gpt-4` will be routed to models with `gpt-4o`
  num_retries: 2
  timeout: 30 # 30 seconds
  redis_host: <your redis host> # set this when using multiple litellm proxy deployments, load balancing state stored in redis
  redis_password: <your redis password>
  redis_port: 1992
general_settings: {}
environment_variables: {}
```

```yaml
model_list:
  - model_name: glm-4.5
    litellm_params:
      model: openai/glm-4.5
      litellm_credential_name: zhipu_credential

  - model_name: glm-4.5-air
    litellm_params:
      model: openai/glm-4.5-air
      litellm_credential_name: zhipu_credential

  - model_name: '*'
    litellm_params:
      model: openai/glm-4.5-air
      litellm_credential_name: zhipu_credential

credential_list:
  - credential_name: zhipu_credential
    credential_values:
      api_base: os.environ/ZHIPU_API_BASE
      api_key: os.environ/ZHIPU_API_KEY
    credential_info:
      description: '智普'
```

**支持通配符**

```yaml
model_list:
  - model_name: xai/*
    litellm_params:
      model: xai/*
      api_key: os.environ/XAI_API_KEY

litellm_settings:
  check_provider_endpoint: true
```

```yaml
# params for litellm.completion() - https://docs.litellm.ai/docs/completion/input#input---request-body
litellm_params:
  model: openai/facebook/opt-125m
  api_base: http://0.0.0.0:4000/v1
  api_key: none
  api_version: '2023-05-15'
  rpm: 60 # Optional[int]: When rpm/tpm set - litellm uses weighted pick for load balancing. rpm = Rate limit for this deployment: in requests per minute (rpm).
  tpm: 1000 # Optional[int]: tpm = Tokens Per Minute
  azure_ad_token: ''
  seed: 1234
  max_token: 1024
  temperature: 0.2
  organization: 'org-12345'
  aws_region_name: 'us-west-2'
  extra_headers: { 'AI-Resource Group': 'ishaan-resource' }
model_info:
  version: 2
  access_groups: ['restricted-models']
  supported_environments: ['development', 'production', 'staging']
  custom_tokenizer:
    identifier: deepseek-ai/DeepSeek-V3-Base
    revision: main
    auth_token: os.environ/HUGGINGFACE_API_KEY
```

- https://docs.litellm.ai/docs/proxy/configs
- https://docs.litellm.ai/docs/proxy/config_settings

## 参考

- https://docs.litellm.ai/docs/proxy/request_headers
- Anthropic
  - Beta header
    - https://docs.claude.com/en/api/beta-headers
  - Features
  - https://docs.claude.com/en/docs/build-with-claude/overview
