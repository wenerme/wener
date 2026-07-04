---
title: MaaS Usage
---

# MaaS Usage

MaaS Usage 用于描述模型请求的资源消耗与计费统计。不同 Provider 的字段命名、cache 口径、reasoning 口径和 streaming 返回时机不同，设计统一统计时应同时保留：

- 原始 Provider usage：用于供应商账单核对和协议排障。
- 归一化 usage：用于平台统计、限额、报表和跨 Provider 对比。
- 估算 usage：用于中断、异常、缺失 usage 时的兜底分析，不能当作精确账单口径。

## 适用范围

- 生成类模型请求
  - OpenAI Chat Completions / Completions
  - OpenAI Responses API
  - Anthropic Messages
  - Gemini GenerateContent / StreamGenerateContent
- 非生成类端点应单独定义 usage 口径
  - Embeddings
  - Rerank
  - Count Tokens
  - Image / Audio / Video generation
  - Speech / Transcription

## 计费维度

- pay per token
  - 输入 token
  - 输出 token
  - reasoning / thinking token
  - cache read / cache write token
- pay per request
  - 每次调用固定费用
  - server tool use，例如 web search
- pay per item
  - image
  - audio
  - video
  - document / file
- pay per compute
  - 按运行时长、算力、并发、GPU/TPU 等资源计费

## 通用归一化字段

| field                   | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `input_tokens`          | 统一输入 token 数；用于统计、配额、报表                      |
| `output_tokens`         | 统一输出 token 数；原则上包含需要计费/统计的 reasoning token |
| `total_tokens`          | 统一总 token 数，通常为 `input_tokens + output_tokens`       |
| `cached_tokens`         | cache token 总量；Provider 不区分 read/write 时使用          |
| `cache_read_tokens`     | 从 prompt cache 读取的 token                                 |
| `cache_write_tokens`    | 写入/创建 prompt cache 的 token                              |
| `cache_write_5m_tokens` | 5 分钟 TTL cache 写入 token，常见于 Anthropic 类口径         |
| `cache_write_1h_tokens` | 1 小时 TTL cache 写入 token，常见于 Anthropic 类口径         |
| `reasoning_tokens`      | reasoning / thinking token 明细                              |
| `audio_tokens`          | 音频 token，输入或输出需结合字段上下文                       |
| `image_tokens`          | 图片 token，若 Provider 暴露                                 |
| `server_tool_requests`  | 服务端工具调用次数，例如 web search                          |
| `provider_usage`        | Provider 原始 usage JSON，用于账单核对和排障                 |
| `estimated`             | 标记 usage 是否为估算值                                      |

:::tip
跨 Provider 报表优先使用归一化字段；账单核对必须同时保留原始 `provider_usage`，因为各家对 cache、reasoning、tool use 的字段语义不完全一致。
:::

## OpenAI Chat Completions / Completions

OpenAI-compatible usage 通常位于响应顶层 `usage`。

```json
{
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 50,
    "total_tokens": 150,
    "prompt_tokens_details": {
      "cached_tokens": 80,
      "audio_tokens": 0
    },
    "completion_tokens_details": {
      "reasoning_tokens": 20,
      "audio_tokens": 0,
      "accepted_prediction_tokens": 0,
      "rejected_prediction_tokens": 0
    }
  }
}
```

| field                                        | 说明                                                     |
| -------------------------------------------- | -------------------------------------------------------- |
| `prompt_tokens`                              | 输入 token 数                                            |
| `completion_tokens`                          | 输出 token 数；OpenAI 语义下通常已经包含 reasoning token |
| `total_tokens`                               | 总 token 数，通常为 `prompt_tokens + completion_tokens`  |
| `prompt_tokens_details.cached_tokens`        | 命中 prompt cache 的输入 token 数                        |
| `prompt_tokens_details.audio_tokens`         | 输入音频 token，是否返回取决于模型和 Provider            |
| `completion_tokens_details.reasoning_tokens` | 输出中的 reasoning token                                 |
| `completion_tokens_details.audio_tokens`     | 输出音频 token，是否返回取决于模型和 Provider            |
| `accepted_prediction_tokens`                 | prediction / speculative decoding 接受的 token           |
| `rejected_prediction_tokens`                 | prediction / speculative decoding 拒绝的 token           |

归一化建议：

```text
input_tokens       = usage.prompt_tokens
output_tokens      = usage.completion_tokens
total_tokens       = usage.total_tokens
cached_tokens      = usage.prompt_tokens_details.cached_tokens
reasoning_tokens   = usage.completion_tokens_details.reasoning_tokens
```

兼容注意：

- 部分 OpenAI-compatible Provider 可能把 `cached_tokens` 放在 `usage.cached_tokens` 顶层。
- streaming 只有在 Provider 返回 usage chunk 时才有精确 usage。
- 中途断流且未收到 usage chunk 时，不能得到精确输出 token。

## OpenAI Responses API

Responses API 使用 `input_tokens` / `output_tokens` 命名。

```json
{
  "usage": {
    "input_tokens": 100,
    "input_tokens_details": {
      "cached_tokens": 80
    },
    "output_tokens": 50,
    "output_tokens_details": {
      "reasoning_tokens": 20
    },
    "total_tokens": 150
  }
}
```

| field                                    | 说明                              |
| ---------------------------------------- | --------------------------------- |
| `input_tokens`                           | 输入 token 数                     |
| `input_tokens_details.cached_tokens`     | 命中 prompt cache 的输入 token 数 |
| `output_tokens`                          | 输出 token 数                     |
| `output_tokens_details.reasoning_tokens` | 输出中的 reasoning token          |
| `total_tokens`                           | 总 token 数                       |

归一化建议：

```text
input_tokens     = usage.input_tokens
output_tokens    = usage.output_tokens
total_tokens     = usage.total_tokens
cached_tokens    = usage.input_tokens_details.cached_tokens
reasoning_tokens = usage.output_tokens_details.reasoning_tokens
```

兼容注意：

- Responses API 通常只表达 `cached_tokens`，不区分 cache read / cache write。
- Responses streaming 通常在完成事件中携带最终 usage。
- 请求失败、超时或提前中断时 usage 可能缺失或不完整。
- 完成状态需结合响应状态判断，例如 `completed`、`failed`、`incomplete`。

## Anthropic Messages

Anthropic Messages usage 位于消息对象的 `usage`。

```json
{
  "usage": {
    "input_tokens": 100,
    "cache_creation_input_tokens": 30,
    "cache_creation": {
      "ephemeral_5m_input_tokens": 10,
      "ephemeral_1h_input_tokens": 20
    },
    "cache_read_input_tokens": 80,
    "output_tokens": 50,
    "server_tool_use": {
      "web_search_requests": 1
    }
  }
}
```

| field                                      | 说明                                                |
| ------------------------------------------ | --------------------------------------------------- |
| `input_tokens`                             | 非缓存的新输入 token；不包含 cache read/write token |
| `cache_creation_input_tokens`              | 本次写入/创建 prompt cache 的输入 token             |
| `cache_creation.ephemeral_5m_input_tokens` | 5 分钟 TTL cache 写入 token                         |
| `cache_creation.ephemeral_1h_input_tokens` | 1 小时 TTL cache 写入 token                         |
| `cache_read_input_tokens`                  | 本次从 prompt cache 读取的输入 token                |
| `output_tokens`                            | 输出 token 数                                       |
| `server_tool_use.web_search_requests`      | 服务端工具使用次数，例如 web search                 |

归一化建议：

```text
input_tokens       = usage.input_tokens
                   + usage.cache_creation_input_tokens
                   + usage.cache_read_input_tokens
output_tokens      = usage.output_tokens
total_tokens       = input_tokens + output_tokens
cached_tokens      = usage.cache_creation_input_tokens + usage.cache_read_input_tokens
cache_read_tokens  = usage.cache_read_input_tokens
cache_write_tokens = usage.cache_creation_input_tokens
cache_write_5m     = usage.cache_creation.ephemeral_5m_input_tokens
cache_write_1h     = usage.cache_creation.ephemeral_1h_input_tokens
```

兼容注意：

- Anthropic 原始 `input_tokens` 是“新增输入”，不是“输入总量”。
- 如果要得到总输入量，必须加上 `cache_creation_input_tokens` 和 `cache_read_input_tokens`。
- 流式响应中，输入相关 usage 通常出现在 `message_start`，输出 usage 可能出现在 `message_delta`。
- Bedrock Claude、Vertex Claude 等封装可按 Anthropic Messages usage 语义理解，但仍应保留原始 Provider 字段。

## Gemini GenerateContent / StreamGenerateContent

Gemini usage 通常位于 `usageMetadata`。

```json
{
  "usageMetadata": {
    "promptTokenCount": 400,
    "candidatesTokenCount": 50,
    "totalTokenCount": 470,
    "thoughtsTokenCount": 20,
    "cachedContentTokenCount": 150,
    "toolUsePromptTokenCount": 0,
    "promptTokensDetails": [
      { "modality": "TEXT", "tokenCount": 100 },
      { "modality": "AUDIO", "tokenCount": 300 }
    ],
    "candidatesTokensDetails": [],
    "cacheTokensDetails": [],
    "toolUsePromptTokensDetails": [],
    "serviceTier": "default",
    "trafficType": "ON_DEMAND"
  }
}
```

| field                        | 说明                                                  |
| ---------------------------- | ----------------------------------------------------- |
| `promptTokenCount`           | 输入 token 数                                         |
| `candidatesTokenCount`       | 候选输出 token 数；不一定包含 thoughts token          |
| `totalTokenCount`            | 总 token 数                                           |
| `thoughtsTokenCount`         | Gemini thinking / reasoning token 数                  |
| `cachedContentTokenCount`    | cached content 命中的 token 数                        |
| `toolUsePromptTokenCount`    | 工具使用相关 prompt token 数，是否返回取决于模型能力  |
| `promptTokensDetails`        | 输入 token 的模态明细，例如 TEXT、AUDIO、IMAGE、VIDEO |
| `candidatesTokensDetails`    | 输出 token 的模态明细                                 |
| `cacheTokensDetails`         | cache token 的模态明细                                |
| `toolUsePromptTokensDetails` | 工具使用 prompt token 的模态明细                      |
| `serviceTier`                | 服务层级，是否返回取决于接口/SDK                      |
| `trafficType`                | Vertex 等场景的流量类型，是否返回取决于接口/SDK       |

归一化建议：

```text
input_tokens     = usageMetadata.promptTokenCount
output_tokens    = usageMetadata.totalTokenCount - usageMetadata.promptTokenCount
total_tokens     = usageMetadata.totalTokenCount
reasoning_tokens = usageMetadata.thoughtsTokenCount
cached_tokens    = usageMetadata.cachedContentTokenCount
```

兼容注意：

- Gemini 的 `candidatesTokenCount` 和 `thoughtsTokenCount` 可能分开报告。
- 对于 Gemini 3 类模型，`totalTokenCount` 可能显著大于 `promptTokenCount + candidatesTokenCount`，差值常来自 thoughts token。
- 因此统一输出量通常更适合用 `totalTokenCount - promptTokenCount`，而不是只看 `candidatesTokenCount`。
- `cachedContentTokenCount` 表示 cache 相关 token，但是否是 cache read 还是 cache creation，需要结合 cached content 生命周期判断。
- 多模态明细适合排查原始 Provider usage，不建议在统一 token 统计里重复计费。

## Cache 字段选择

| 需求                                      | 建议字段                                          |
| ----------------------------------------- | ------------------------------------------------- |
| 只关心 cache 总量                         | `cached_tokens`                                   |
| 需要区分读写                              | `cache_read_tokens` / `cache_write_tokens`        |
| 需要区分 TTL                              | `cache_write_5m_tokens` / `cache_write_1h_tokens` |
| Provider 只返回 `cached_tokens`           | 不强行拆分 read/write                             |
| Provider 返回原始 cached content 生命周期 | 可按创建/读取行为归入 read/write                  |

注意：

- Prompt cache 命中的通常是稳定 prompt 前缀。
- Tool schema、system prompt、上下文顺序变化都可能影响 cache 命中。
- Cache 命中通常降低输入 token 成本，但不一定显著降低端到端延迟。

## Reasoning 字段选择

- `reasoning_tokens` 表示 thinking / reasoning 明细。
- `output_tokens` 应按“需要计费或统计的输出总量”设计，通常应包含 reasoning token。
- 若 Provider 的原始 `output_tokens` 不包含 reasoning，应在归一化时明确补齐逻辑。
- 排查 reasoning 计费差异时，应同时查看：
  - 原始 provider usage
  - `output_tokens`
  - `reasoning_tokens`
  - `total_tokens`

## Streaming / 中断计费

| 场景                               | usage 状态                               |
| ---------------------------------- | ---------------------------------------- |
| 非流式正常完成                     | 通常有完整 usage                         |
| 流式正常完成且 Provider 返回 usage | 有精确 provider usage                    |
| 流式中断前已收到 usage chunk       | 可保留最后一次 usage，但需确认是否最终值 |
| 流式中断前未收到 usage chunk       | 没有精确输出 usage，只能估算             |
| 客户端断开 / 499                   | 是否有 usage 取决于上游是否已返回 usage  |
| 上游超时 / 错误                    | usage 可能缺失、不完整或只含输入部分     |

设计建议：

- 缺失 usage 时，不应把估算 token 当作 Provider 精确 usage。
- 估算字段应显式标记 `estimated: true`。
- 对于 Agent 场景，中断时仍需要估算已消耗 context，避免后续上下文窗口失准。
- 费用侧应区分“供应商精确 usage”和“平台估算 usage”。

## 异动检测

MaaS usage 常见分布特征：

- 长尾分布
- 突发性
- Fat Tail / 肥尾
- 强依赖模型、上下文长度、工具调用、cache 命中和 retry 行为

可观测指标：

| 指标                 | 说明                     |
| -------------------- | ------------------------ |
| RPM                  | requests per minute      |
| input TPM            | input tokens per minute  |
| output TPM           | output tokens per minute |
| total TPM            | total tokens per minute  |
| cache hit tokens     | cache 命中 token         |
| reasoning tokens     | reasoning token          |
| abort rate           | 中断率                   |
| missing usage rate   | usage 缺失率             |
| estimated usage rate | 估算 usage 占比          |

检测建议：

- 使用 `3+Sigma` + `15-30min` 窗口检查用量异动。
- 对 token 消耗建议同时看 request count 和 token per request，避免把请求量增长误判为单请求异常。
- 对 reasoning 模型单独观察 `reasoning_tokens / output_tokens`。
- 对 cache 场景单独观察 cache hit token 和 cache write token。

## 快速公式表

| 协议                    | 统一输入                                                               | 统一输出                             | cache                                                   | reasoning                                         |
| ----------------------- | ---------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------- |
| OpenAI Chat/Completions | `prompt_tokens`                                                        | `completion_tokens`                  | `prompt_tokens_details.cached_tokens`                   | `completion_tokens_details.reasoning_tokens`      |
| OpenAI Responses        | `input_tokens`                                                         | `output_tokens`                      | `input_tokens_details.cached_tokens`                    | `output_tokens_details.reasoning_tokens`          |
| Anthropic Messages      | `input_tokens + cache_creation_input_tokens + cache_read_input_tokens` | `output_tokens`                      | `cache_creation_input_tokens + cache_read_input_tokens` | 原始 usage 通常不单列；如 Provider 扩展返回则保留 |
| Gemini                  | `promptTokenCount`                                                     | `totalTokenCount - promptTokenCount` | `cachedContentTokenCount`                               | `thoughtsTokenCount`                              |

## 参考

- <https://platform.openai.com/docs/api-reference/chat/create>
- <https://platform.openai.com/docs/api-reference/responses>
- <https://platform.openai.com/docs/guides/prompt-caching>
- <https://platform.claude.com/docs/en/api/messages>
- <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>
- <https://ai.google.dev/api/generate-content>
- <https://ai.google.dev/gemini-api/docs/caching>
- <https://github.com/vercel/ai/issues/7628>
