---
title: MaaS API
---

# MaaS API

- Google Generative AI API
  - https://ai.google.dev/api/rest
  - Google AI Studio, Gemini API
  - BaseURL https://generativelanguage.googleapis.com/v1beta
  - OpenAI BaseURL https://generativelanguage.googleapis.com/v1beta/openai - OpenAI API compatible
  - 接口
    - `/models/{model_id}:streamGenerateContent`
    - `/models/{model_id}:generateContent?key={key}`
- Google Vertex AI
  - GCP, 企业级、全托管的机器学习 (ML) 平台
  - Model Garden + MLOps
- Anthropic
  - https://platform.claude.com/docs/en/api/overview
  - SDK
    - https://github.com/anthropics/anthropic-sdk-typescript
    - https://github.com/anthropics/anthropic-sdk-typescript/blob/main/src/resources/beta/messages/messages.ts
- OpenAI
  - https://platform.openai.com/docs/api-reference/chat/create
- XAI
  - https://docs.x.ai/docs/api-reference
- https://www.postman.com/postman/anthropic-apis/documentation/dhus72s/claude-api
- vLLM
  - https://docs.vllm.ai/en/v0.10.2/api/vllm/entrypoints/openai/serving_completion.html
- Provider
  - https://cloud.google.com/vertex-ai/generative-ai/docs/partner-models/use-partner-models
- 错误码
  - https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/api-errors
  - https://platform.claude.com/docs/en/api/errors
  - https://platform.openai.com/docs/guides/error-codes
  - https://support.huaweicloud.com/usermanual-maas-modelarts/maas-modelarts-0080.html
- 参考
  - https://www.openresponses.org/

| openai                | anthropic                 | google |
| --------------------- | ------------------------- | ------ |
| parallel_tool_calls   | disable_parallel_tool_use |        |
| max_completion_tokens | max_tokens                |

- “长尾分布”
- “突发性”
- "Fat Tail" (肥尾)
- 3+Sigma + 15-30min 窗口检查异动

## Gemini API

- https://ai.google.dev/api/rest

## Multiple tools are supported only when they are all search tools

- 内置 tool 和 functionDeclaration 工具不能同时使用
- openai 里的 tool 映射为一个 functionDeclaration
- 其他的 tool 是内置 tool，语义上有点区别

## OpenAI API

### streaming

- 第一个chunk 有 role 没内容，之后的 chunk 有 内容没有 role
- 最后的 chunk，usage 和 finish_reason 分开
- stream_options
  - continuous_usage_stat
    - 连续发送 usage
  - include_usage
    - 最后一个 chunk 包含 usage
- 第一个 chunk 和最后一个 chunk 不应该包含 content
- 有些供应商在第二个 chunk 返回 role
- 参考
  - https://github.com/BerriAI/litellm/blob/4a8629ce/tests/local_testing/test_streaming.py

### first chunk

- 有些为了紧凑，会在第一个 chunk 包含内容
- 正常情况第一个 chunk 不应该包含内容

### last chunk

- vLLM, OpenAI 最后一个 chunk 的 content 为 空

```json
{
  "index": 0,
  "delta": {
    "content": ""
  },
  "logprobs": null,
  "finish_reason": "stop",
  "stop_reason": null
}
```

- 参考
  - https://github.com/BerriAI/litellm/issues/12417
    - LiteLLM 添加最后一个 chunk 的 content 为 空

## ToolChoice

- `auto`
  - 自动选择工具
- `required`
  - 必须使用工具
- `none`
  - 不使用工具

## Thinking

- https://ai.google.dev/gemini-api/docs/thinking
  - https://ai.google.dev/gemini-api/docs/thinking#set-budget
  - 不同模型支持逻辑不一样
  - 2.5 Pro 不能关闭 128 to 32768
  - 关闭 thinkingBudget = 0
  - 动态 thinkingBudget = -1
  - thinkingLevel
    - 默认 high
    - low, high
    - Gemini 3.0

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

## Interleaved thinking

思考过程可以进行 tool call

- Claude 4+
  - interleaved-thinking-2025-05-14
  - Messages API 才支持
- MiniMax-M2
- Kimi-K2-Thinking

---

- https://platform.claude.com/docs/en/build-with-claude/extended-thinking
- https://docs.vllm.ai/en/latest/features/interleaved_thinking/

## reasoning_details

```json
{
  "type": "reasoning.summary",
  "summary": "The model analyzed the problem by first identifying key constraints, then evaluating possible solutions...",
  "id": "reasoning-summary-1",
  "format": "anthropic-claude-v1",
  "index": 0
}
```

- type
  - reasoning.summary
  - reasoning.encrypted
  - reasoning.text
- 维护思考细节信息
  - OpenAI o
  - Claude 3.7+ thinking
  - Gemini Reasoning
  - xAI Reasoning

---

- https://openrouter.ai/docs/guides/best-practices/reasoning-tokens

## Preserved thinking

- 智普 GLM 4.7 支持保留思考内容
  - 再生成 chat template 的时候允许传递之前的思考内容
  - 默认不保持 clear_thinking: true
  - https://huggingface.co/zai-org/GLM-4.7/blob/main/chat_template.jinja
    - clear_thinking 控制是否包含 reasoning_content

---

- https://docs.bigmodel.cn/cn/guide/capabilities/thinking-mode

## role

- developer
- system
- user
- assistant
- tool
  - 新版本 openai
  - Anthropic 使用 user role
- function
  - 旧版本 openai

# usage

- 付费
  - 算力
  - pay per token
  - pay per request
  - pay per item
    - 图、语音

**abort**

- stream 499 会产生费用
- 非strema 中断也会产生费用
  - 极端情况会产生完整的费用
- Agent 实现在中断时候需要预估 usage
  - 否则 context window 会失准

---

- Token usage unavailable during streaming abort/interruption https://github.com/vercel/ai/issues/7628

## Prompt Cache

| 模型 / 场景                             | 最小缓存 Token 数 |
| :-------------------------------------- | :---------------- |
| Claude Opus 4.5                         | 4096              |
| Claude Opus 4.1, 4                      | 1024              |
| Claude Sonnet 4.5, 4, ~~3.7~~           | 1024              |
| Claude Haiku 4.5                        | 4096              |
| Claude Haiku ~~3.5~~, 3                 | 2048              |
| Gemini 3 Pro Preview                    | 4096              |
| Gemini 3 Flash Preview                  | 1024              |
| Gemini 2.5 Pro                          | 4096              |
| Gemini 2.5 Flash                        | 1024              |
| Gemini Explicit Caching (Vertex AI)     | 4096              |
| Gemini Context Caching (Early Versions) | 32768             |
| OpenAI GPT                              | 1024              |

- **Implicit Caching**: 提供 75% - 90% 的输入 Token 折扣。
- **Explicit Caching**: 按生存时间 (TTL) 收取存储费用。
- **容量**: 最大缓存大小等同于模型完整上下文窗口（可超过 100 万 Token）。
- **Gemini 3 优化**: 在 Gemini 3 系列中，建议 Prompt 前缀或缓存数据至少达到 **4096 Token** 以确保缓存生效并有效降低 API 成本。
- Google OpenAI API extra body
- ⚠️ Tool call 缓存实际缓存的是 schema+描述 等

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

---

- https://ai.google.dev/gemini-api/docs/caching
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://platform.openai.com/docs/guides/prompt-caching
- https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html

## Anthropic

### beta

```
anthropic-beta: A,B
# SSE, 去掉 data: [DONE], named event
anthropic-version: 2023-06-01
# 第一个版本
anthropic-version: 2023-01-01
```

---

- https://platform.claude.com/docs/en/api/beta-headers

### output-128k-2025-02-19

允许输出 128K

### extended-cache-ttl-2025-04-11

- `messages[*].content[*].cache_control.ephemeral.ttl`

### code-execution-2025-05-22

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: code-execution-2025-05-22" \
  -d '{
      "model": "claude-sonnet-4-20250514",
      "max_tokens": 4096,
      "tools": [
        {
          "type": "code_execution_20250522",
          "name": "code_execution"
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "Calculate the first 20 Fibonacci numbers"
        }
      ]
    }'
```

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: code-execution-2025-05-22" \
  -d '{
      "model": "claude-sonnet-4-20250514",
      "max_tokens": 4096,
      "tools": [
        {
          "type": "code_execution_20250522",
          "name": "code_execution"
        },
        {
          "name": "get_stock_price",
          "description": "Get the current stock price for a given ticker symbol",
          "allowed_callers": ["direct", "code_execution_20250825"],
          "input_schema": {
            "type": "object",
            "properties": {
              "ticker": { "type": "string" }
            },
            "required": ["ticker"]
          }
        }
      ],
      "messages": [
        {
          "role": "user",
          "content": "Write Python code to fetch AAPL and GOOGL stock prices and calculate which one is more expensive"
        },
        {
          "role": "assistant",
          "content": [
            { "type": "text", "text": "I will write code to compare the stock prices." },
            {
              "type": "tool_use",
              "id": "toolu_code_01",
              "name": "code_execution",
              "input": { "code": "aapl = tool.get_stock_price(ticker='AAPL')" }
            },
            {
              "type": "tool_use",
              "id": "toolu_stock_01",
              "name": "get_stock_price",
              "input": { "ticker": "AAPL" },
              "caller": {
                "type": "code_execution_20250825",
                "tool_id": "toolu_code_01"
              }
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "tool_result",
              "tool_use_id": "toolu_stock_01",
              "content": "{\"price\": 195.50, \"currency\": \"USD\"}"
            }
          ]
        }
      ]
    }'
```

```
用户请求
  ↓
模型发起 code_execution (toolu_code_01)
  ↓
sandbox 代码调用 get_stock_price → 产生 tool_use + caller
  ↓                                         ↑
  ↓                              caller.tool_id = "toolu_code_01"
  ↓                              caller.type = "code_execution_20250825"
  ↓
API 返回 stop_reason: "tool_use"，你处理 tool_result 回传
  ↓
模型拿到结果，sandbox 继续执行（或请求下一个工具）
  ↓
最终输出结果
```

- allowed_callers：在 tools 定义中，控制谁可以调用 → 请求侧
- caller：在 tool_use block 中，标识谁实际触发了调用 → 响应侧
- 如果去掉 "code_execution_20250825" 只保留 ["direct"]，sandbox 代码就无权调用 get_stock_price，也不会出现带 caller 的 tool_use

### context-management-2025-06-27

### advanced-tool-use-2025-11-20

- Claude API, Microsoft Foundry, 所有模型
- 模型按需取搜索 tool
- 工具可以定义 defer_loading: true
  - 只保留 name, description
  - 本质是 SDK 去做 RAG 相关逻辑，然后自动提供相关的检索
  - 有点类似 SKILL 的概念
  - 渐进式披露
- 实现上千工具的使用
- ⚠️ 用户实现 search_tools
  - 高效准确的工具搜索
  - 字符匹配、语义、分类

```json
{
  "tools": [
    { "type": "tool_search_tool_regex_20251119", "name": "tool_search_tool_regex" },
    {
      "name": "github.createPullRequest",
      "description": "Create a pull request",
      "input_schema": {},
      "defer_loading": true
    }
  ]
}
```

---

- https://github.com/BerriAI/litellm/pull/19841/changes
  - Translate advanced-tool-use to Bedrock-specific headers for Claude Opus 4.5
  - advanced-tool-use-2025-11-20 -> tool-search-tool-2025-10-19 + tool-examples-2025-10-29
- https://www.anthropic.com/engineering/advanced-tool-use
- https://github.com/anthropics/claude-cookbooks/blob/main/tool_use/tool_search_with_embeddings.ipynb

## tool-examples-2025-10-29

- Opus 4.5+
- Vertex AI, Amazon Bedrock
- input_examples 字段

## effort

- `output: { effort: 'high' }`
- 支持 Opus 4.5, Opus 4.6
- max, high, medium, low
- 默认 high
- Opus 4.6+ 替代以前的 budget_tokens

## adaptive thinking

- Opus 4.6+
- thinking.type=adaptive
- 弃用 `thinking: {type: "enabled", budget_tokens: N}`

```bash
curl https://api.anthropic.com/v1/messages \
  --header "x-api-key: $ANTHROPIC_API_KEY" \
  --header "anthropic-version: 2023-06-01" \
  --header "content-type: application/json" \
  --data \
  '{
    "model": "claude-opus-4-6",
    "max_tokens": 16000,
    "thinking": {
        "type": "adaptive"
    },
    "messages": [
        {
            "role": "user",
            "content": "Explain why the sum of two even numbers is always even."
        }
    ]
}'
```

```
adaptive thinking is not supported on this model
```
