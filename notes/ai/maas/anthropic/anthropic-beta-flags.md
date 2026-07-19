---
title: Anthropic Beta Flags
tags:
  - Reference
---

# Anthropic Beta Flags 说明与使用参考

> 最后核实：2026-07-17。以 Anthropic direct API 为主；SDK enum 是兼容性并集，不等于当前模型、账号或第三方平台一定支持。

- [Anthropic MaaS API](./README.md)
- [Anthropic FAQ](./anthropic-faq.md)

## Beta Flags

| date       | flag                                       | status            | feature key / notes                                                    |
| ---------- | ------------------------------------------ | ----------------- | ---------------------------------------------------------------------- |
| 2024-07-15 | ~~`max-tokens-3-5-sonnet-2024-07-15`~~     | 已废弃            | Sonnet 3.5 8K output，不再需要                                         |
| 2024-07-31 | ~~`prompt-caching-2024-07-31`~~            | 已废弃 / 移除     | Prompt caching 已 GA；部分 Bedrock/代理路由会报 invalid beta flag      |
| 2024-09-24 | ~~`message-batches-2024-09-24`~~           | GA / compatibility | Message Batches 已 GA；旧 flag 仅作 SDK 兼容                           |
| 2024-09-25 | ~~`pdfs-2024-09-25`~~                      | GA / compatibility | PDF input 已 GA；旧 flag 仅作兼容                                     |
| 2024-10-22 | `computer-use-2024-10-22`                  | 历史版本          | Computer Use 旧版；优先使用新版 `computer-use-2025-01-24`              |
| 2024-11-01 | ~~`token-counting-2024-11-01`~~            | GA / compatibility | Token Count API 已 GA；旧 flag 仅作 SDK 兼容                           |
| 2025-01-24 | `computer-use-2025-01-24`                  | Active beta       | Computer Use；需要调用方提供工具执行环境                               |
| 2025-02-19 | `token-efficient-tools-2025-02-19`         | SDK compatibility | 历史 token-efficient tool use                                          |
| 2025-02-19 | `output-128k-2025-02-19`                   | SDK compatibility | 历史 output extension；当前上限按 model capability                     |
| 2025-04-04 | ~~`mcp-client-2025-04-04`~~                | 历史版本          | MCP client 旧版；已被 `mcp-client-2025-11-20` 取代                     |
| 2025-04-11 | ~~`extended-cache-ttl-2025-04-11`~~        | 已废弃 / GA       | `cache_control.ttl:"1h"` 已进入常规 schema；旧 flag 可能被部分路由拒绝 |
| 2025-04-14 | `files-api-2025-04-14`                     | Active beta       | Files API / file id 引用                                               |
| 2025-05-14 | `dev-full-thinking-2025-05-14`             | Restricted beta   | 开发调试 full thinking；生产需注意敏感信息风险                         |
| 2025-05-14 | ~~`fine-grained-tool-streaming-2025-05-14`~~ | 已 GA / 兼容     | 改用 tool-level `eager_input_streaming`                                |
| 2025-05-14 | ~~`interleaved-thinking-2025-05-14`~~      | 新模型已 GA       | Adaptive thinking 自动支持；旧模型按兼容文档处理                       |
| 2025-05-22 | ~~`code-execution-2025-05-22`~~            | 历史版本          | 当前 code execution tool 已 GA；使用当前 tool version                  |
| 2025-06-09 | ~~`search-results-2025-06-09`~~            | 已废弃 / GA       | Search result content block 历史 beta                                  |
| 2025-06-27 | `context-management-2025-06-27`            | Active beta       | Context editing / clear tool uses / clear thinking                     |
| 2025-08-07 | ~~`context-1m-2025-08-07`~~                | Retired / compatibility | 新模型按 model capability 使用 1M；不要默认发送旧 header          |
| 2025-08-25 | ~~`code-execution-2025-08-25`~~            | GA / compatibility | 当前 code execution 使用 GA tool type                                 |
| 2025-08-26 | `model-context-window-exceeded-2025-08-26` | Older-model opt-in | Claude 4.5+ 不需要该 header                                            |
| 2025-10-02 | `skills-2025-10-02`                        | Active beta       | Skills API / skill tool 相关能力                                       |
| 2025-10-19 | ~~`tool-search-tool-2025-10-19`~~          | 已 GA             | 使用当前 tool type + `defer_loading`，不再需要旧 header                |
| 2025-10-29 | ~~`tool-examples-2025-10-29`~~             | 已 GA             | Tool definitions 直接使用 `input_examples`                             |
| 2025-11-13 | ~~`structured-outputs-2025-11-13`~~        | 已 GA / 过渡兼容  | 改用 `output_config.format`，不再需要 beta header                       |
| 2025-11-20 | ~~`advanced-tool-use-2025-11-20`~~         | 历史 umbrella     | Tool search/examples 已 GA；不要默认注入 umbrella header               |
| 2025-11-20 | `mcp-client-2025-11-20`                    | Active beta       | MCP client 新版；注意工具权限和安全边界                                |
| 2026-02-01 | `fast-mode-2026-02-01`                     | Research preview  | 还需 `speed:"fast"`；Anthropic direct、支持的 Opus 和账号权限         |
| 2026-03-01 | `advisor-tool-2026-03-01`                  | Direct active beta | 启用 `advisor_20260301`；不用 advisor tool 时不建议携带               |
| 2026-03-24 | `output-300k-2026-03-24`                   | Batch / 模型受限  | Message Batches 扩展输出，不是同步 Messages 的通用 300K 开关           |
| 2026-03-24 | `user-profiles-2026-03-24`                 | Beta resource     | User Profiles；涉及用户数据和隐私边界                                  |
| 2026-04-01 | `managed-agents-2026-04-01`                | 端点级            | Managed Agents：`/v1/agents`、`/v1/sessions`、`/v1/environments`       |
| 2026-04-07 | `cache-diagnosis-2026-04-07`               | Anthropic direct  | `diagnostics.previous_message_id` 定位 prompt cache prefix 分歧        |
| 2026-04-21 | `dreaming-2026-04-21`                      | Managed Agents    | Dreams；还需要 `managed-agents-2026-04-01`                            |
| 2026-05-13 | `thinking-token-count-2026-05-13`          | Streaming hint    | omitted thinking 的 coarse delta；不是 billable token count            |
| 2026-06-01 | `server-side-fallback-2026-06-01`          | 模型/平台受限     | `fallbacks` 在 refusal 后由服务端切换模型                              |
| 2026-06-01 | `fallback-credit-2026-06-01`               | 模型/平台受限     | 客户端 fallback 时复用拒答请求的 prompt-cache credit                   |
| 2026-06-22 | `mcp-tunnels-2026-06-22`                   | 端点级            | `/v1/tunnels`；不是 Messages feature                                   |
| 2026-07-22 | `agent-memory-2026-07-22`                  | 端点级 / 预发布   | `/v1/memory_stores`；替代该端点的 `managed-agents-2026-04-01`          |

## Header 使用方式

| 项        | 说明                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------ |
| Header 名 | `anthropic-beta`                                                                                       |
| Header 值 | 一个或多个 beta flag 名称，例如 `files-api-2025-04-14`                                                 |
| 多值格式  | 推荐逗号分隔：`anthropic-beta: flag1,flag2,flag3`；部分 SDK 使用数组形式 `betas: [...]`                |
| 常用端点  | `/v1/messages`、`/v1/messages/count_tokens`、`/v1/messages/batches`、Beta namespace 下的资源端点等     |
| SDK 用法  | Python/TS SDK 通常在 beta client 或 request options 中传 `betas`                                       |
| 错误形态  | 不支持或不可用时常见 `invalid_request_error`，message 类似 `Unsupported beta header: ...`              |
| 风险      | Beta 能力可能变更、下线、区域/模型/供应商不一致、计费和限流规则不同                                    |
| 排障建议  | 先确认是否真的用到了对应请求体字段；只带 header 不代表业务有效；遇到 400 先逐个移除 beta flag 缩小范围 |

## 支持状态阅读方式

| 状态           | 含义                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| 当前公开 Beta  | Anthropic 当前文档仍列出的 beta；仍可能有模型、区域、账号权限限制       |
| 历史/废弃      | 旧版本或能力已 GA；继续发送可能被忽略，也可能被部分路由拒绝             |
| 模型受限       | 只有部分 Claude 模型支持，通常需要查看模型页或实际请求验证              |
| 端点级         | 不是普通 Messages 参数，而是某些 beta API endpoint 的统一开关           |
| 第三方路由受限 | Anthropic direct 可能支持，但 Bedrock、Vertex、代理商、兼容网关未必支持 |

### Endpoint-specific headers

| Endpoint | Header | 约束 |
| --- | --- | --- |
| `/v1/agents`、`/v1/sessions`、`/v1/environments` | `managed-agents-2026-04-01` | SDK beta namespace 通常自动添加 |
| `/v1/tunnels` | `mcp-tunnels-2026-06-22` | MCP tunnel management API |
| `/v1/memory_stores` 及子资源 | `agent-memory-2026-07-22` | 不得与 `managed-agents-2026-04-01` 同发，否则 400 |

`agent-memory-2026-07-22` 是官方文档提前公布的切换版本；在 2026-07-22 前后接入时应重新核对 SDK release notes。

---

## `max-tokens-3-5-sonnet-2024-07-15`

### 作用

早期用于 Claude 3.5 Sonnet 的较大 `max_tokens` / 输出上限能力，常见语境是把 Sonnet 3.5 输出提升到 8K。现在属于历史兼容 flag。

### 历史请求（不要用于新实现）

```http
anthropic-beta: max-tokens-3-5-sonnet-2024-07-15
```

```json
{
  "model": "claude-3-5-sonnet-20240620",
  "max_tokens": 8192,
  "messages": [{ "role": "user", "content": "write a long report" }]
}
```

### 支持与影响

- 当前新模型通常不需要这个 flag。
- 对现代 Claude 4/4.5/4.6/4.7 系列没有建议使用价值。
- 如果上游严格校验 beta header，旧 flag 可能导致 `unsupported beta header`。

---

## `prompt-caching-2024-07-31`

### 作用

早期用于启用 Prompt Caching。Prompt Caching 允许对稳定前缀内容设置 `cache_control`，后续请求复用缓存以降低延迟和成本。

### 历史请求（不要用于新实现）

```http
anthropic-beta: prompt-caching-2024-07-31
```

```json
{
  "model": "<MODEL_ID>",
  "max_tokens": 1024,
  "system": [
    {
      "type": "text",
      "text": "Very long stable system prompt...",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [{ "role": "user", "content": "continue" }]
}
```

### 支持与影响

- 该能力已进入常规 API 使用方式，很多路径不再需要 beta header。
- 继续发送旧 flag 在部分非 Anthropic direct 路由上可能触发 invalid beta flag。
- 对实际业务来说，关键不是 header，而是内容块上的 `cache_control` 与 usage 中的 cache read/create token。

---

## `message-batches-2024-09-24`

### 作用

用于 Message Batches 批处理能力。批处理允许一次提交多条异步请求，适合离线任务、批量评测、低实时性生成。

### 历史请求（不要用于新实现）

```http
anthropic-beta: message-batches-2024-09-24
```

```json
{
  "requests": [
    {
      "custom_id": "case-1",
      "params": {
        "model": "claude-opus-4-7",
        "max_tokens": 256,
        "messages": [{ "role": "user", "content": "Summarize A" }]
      }
    }
  ]
}
```

### 支持与影响

- 主要用于 batch endpoint，而非普通同步 `/v1/messages`。
- Message Batches 已 GA；当前请求不需要旧 beta header。
- 支持情况仍取决于账号、区域和模型。

---

## `pdfs-2024-09-25`

### 作用

用于 PDF 文档输入能力。让 Messages API 可以读取 PDF 内容，常与 document content block 或 Files API 配合。

### 历史请求（不要用于新实现）

```http
anthropic-beta: pdfs-2024-09-25
```

```json
{
  "model": "<MODEL_ID>",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "document", "source": { "type": "base64", "media_type": "application/pdf", "data": "..." } },
        { "type": "text", "text": "Extract key risks." }
      ]
    }
  ]
}
```

### 支持与影响

- PDF input 已 GA；当前请求不需要旧 beta header。
- 第三方路由可能只支持图片，不支持 PDF document block。
- 如果 body 没有 PDF/document，发送该 flag 通常没有正向收益。

---

## `computer-use-2024-10-22`

### 作用

Computer Use 旧版 beta，用于启用 Claude 操作虚拟电脑的内置工具能力，例如截图观察、鼠标点击、键盘输入。

### 历史请求（不要用于新实现）

```http
anthropic-beta: computer-use-2024-10-22
```

```json
{
  "model": "<MODEL_ID_SUPPORTING_COMPUTER_20241022>",
  "max_tokens": 1024,
  "tools": [
    {
      "type": "computer_20241022",
      "name": "computer",
      "display_width_px": 1024,
      "display_height_px": 768,
      "display_number": 1
    }
  ],
  "messages": [{ "role": "user", "content": "Open the browser." }]
}
```

### 支持与影响

- 这是旧版 schema；新版通常使用 `computer-use-2025-01-24`。
- 只有支持 Computer Use 的模型和环境可用。
- 没有实际执行环境时，模型即使产生 tool use，也无法完成任务闭环。

---

## `token-counting-2024-11-01`

### 作用

用于 Token Counting API，允许在不实际生成回复的情况下估算消息、工具、system prompt 等输入 token 数。

### 历史请求（不要用于新实现）

```http
anthropic-beta: token-counting-2024-11-01
```

```json
{
  "model": "claude-opus-4-7",
  "messages": [{ "role": "user", "content": "How many tokens?" }],
  "tools": []
}
```

### 支持与影响

- 适合预估成本、提前检测上下文超限、调试 prompt cache。
- Token Counting API 已 GA；当前请求不需要旧 beta header。
- 与普通生成无关；同步生成请求里带它通常没有意义。
- 不同模型 tokenizer 和工具 schema 都会影响计数结果。

---

## `computer-use-2025-01-24`

### 作用

Computer Use 新版 beta，相比 2024-10-22 版本更新了工具 schema 和支持模型范围。

### 示例

```http
anthropic-beta: computer-use-2025-01-24
```

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "tools": [
    {
      "type": "computer_20250124",
      "name": "computer",
      "display_width_px": 1280,
      "display_height_px": 800,
      "display_number": 1
    }
  ],
  "messages": [{ "role": "user", "content": "Find the login button." }]
}
```

### 支持与影响

- 必须配合工具执行环境，不是单纯文本能力。
- 对安全、审计、沙箱要求高。
- 第三方兼容 API 通常不支持该内置工具。

---

## `token-efficient-tools-2025-02-19`

### 作用

用于 token-efficient tool use。目标是降低工具调用协议在长对话中的 token 占用，让工具定义/工具结果更省 token。

### 历史请求（不要用于新实现）

```http
anthropic-beta: token-efficient-tools-2025-02-19
```

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "tools": [
    {
      "name": "get_weather",
      "description": "Get weather by city",
      "input_schema": {
        "type": "object",
        "properties": { "city": { "type": "string" } },
        "required": ["city"]
      }
    }
  ],
  "messages": [{ "role": "user", "content": "Weather in Shanghai?" }]
}
```

### 支持与影响

- 主要影响 tool use 的内部表示和 token usage。
- 需要客户端能正确处理返回的 tool use/result 格式。
- 如果请求不使用 tools，收益很小。

---

## `output-128k-2025-02-19`

### 作用

启用超长输出能力，允许特定模型生成最高约 128K tokens 的输出。

### 历史请求（不要用于新实现）

```http
anthropic-beta: output-128k-2025-02-19
```

```json
{
  "model": "<MODEL_ID_SUPPORTING_OUTPUT_128K_BETA>",
  "max_tokens": 100000,
  "messages": [{ "role": "user", "content": "Generate a long structured dataset." }]
}
```

### 支持与影响

- 模型受限，不是所有模型都支持。
- 成本、延迟、断流概率都会显著上升。
- 客户端和代理层要确认超长流式响应、超时、body size 限制。

---

## `mcp-client-2025-04-04`

### 作用

MCP Client 旧版 beta，用于让 Claude 与 MCP server/tool 生态交互。

### 历史请求（不要用于新实现）

```http
anthropic-beta: mcp-client-2025-04-04
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 1024,
  "mcp_servers": [{ "type": "url", "url": "https://example.com/mcp" }],
  "messages": [{ "role": "user", "content": "Use the MCP tools if needed." }]
}
```

### 支持与影响

- 已被 `mcp-client-2025-11-20` 取代。
- MCP 涉及外部工具调用与权限边界，不应在不受信任请求中随意开启。
- 老版本 flag 可能被新路由拒绝或行为不一致。

---

## `extended-cache-ttl-2025-04-11`

### 作用

早期用于启用 Prompt Cache 的扩展 TTL，例如 1 小时缓存。

### 历史请求（不要用于新实现）

```http
anthropic-beta: extended-cache-ttl-2025-04-11
```

```json
{
  "system": [
    {
      "type": "text",
      "text": "Long stable policy...",
      "cache_control": { "type": "ephemeral", "ttl": "1h" }
    }
  ],
  "messages": [{ "role": "user", "content": "Question" }],
  "model": "claude-opus-4-7",
  "max_tokens": 256
}
```

### 支持与影响

- 当前文档中 `cache_control.ttl` 已是常规 schema 的一部分，旧 flag 多数场景不再需要。
- 如果上游不认识旧 flag，可能请求失败。
- 重点关注 usage 中的 `cache_creation` 和 `cache_read_input_tokens`。

---

## `files-api-2025-04-14`

### 作用

启用 Files API beta。Files API 用于上传、管理文件，并在 Messages 请求中通过 file id 引用。

### 示例

```http
anthropic-beta: files-api-2025-04-14
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "document", "source": { "type": "file", "file_id": "file_..." } },
        { "type": "text", "text": "Summarize this file." }
      ]
    }
  ]
}
```

### 支持与影响

- 需要先通过 Files API 上传文件。
- 对文件权限、保留期、文件类型限制要单独确认。
- 第三方路由可能支持 base64 文档，但不支持 Anthropic file id。

---

## `dev-full-thinking-2025-05-14`

### 作用

开发/调试用途的 thinking beta，用于暴露更完整的 thinking 信息。适合内部调试模型推理过程，不适合默认面向终端用户。

### 历史请求（不要用于新实现）

```http
anthropic-beta: dev-full-thinking-2025-05-14
```

```json
{
  "model": "<MODEL_ID_SUPPORTING_MANUAL_THINKING>",
  "max_tokens": 2048,
  "thinking": { "type": "enabled", "budget_tokens": 1024 },
  "messages": [{ "role": "user", "content": "Solve and show reasoning." }]
}
```

### 支持与影响

- 可能增加敏感信息泄露风险。
- `redacted_thinking` 是合法响应 block，但没有对应的公开 beta flag；不要注入未经官方文档确认的 header。
- 很多生产路由不会允许明文 thinking 透出。

---

## `fine-grained-tool-streaming-2025-05-14`

### 作用

启用工具参数的细粒度流式输出。模型可以在生成工具输入 JSON 时逐步流出增量，而不是等待完整 JSON 缓冲后一次性返回。

### 历史请求（不要用于新实现）

```http
anthropic-beta: fine-grained-tool-streaming-2025-05-14
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "stream": true,
  "max_tokens": 1024,
  "tools": [
    {
      "name": "write_file",
      "input_schema": {
        "type": "object",
        "properties": { "path": { "type": "string" }, "content": { "type": "string" } }
      }
    }
  ],
  "messages": [{ "role": "user", "content": "Write a long file." }]
}
```

### 支持与影响

- 客户端必须能处理 tool input 的增量流式片段。
- 对大工具参数更有价值，例如代码生成、长 JSON。
- 当前能力已 GA，使用每个 user-defined tool 上的 `eager_input_streaming: true`。
- 旧 header 仅用于过渡兼容；新实现应删除 header。

---

## `interleaved-thinking-2025-05-14`

### 作用

允许 extended thinking 与 tool use 交错发生。模型可以在工具调用前后继续产生 thinking，而不是把所有 thinking 限定在单一阶段。

### 历史请求（不要用于新实现）

```http
anthropic-beta: interleaved-thinking-2025-05-14
```

```json
{
  "model": "<MODEL_ID_SUPPORTING_MANUAL_THINKING>",
  "max_tokens": 4096,
  "thinking": { "type": "enabled", "budget_tokens": 2048 },
  "tools": [{ "name": "search", "input_schema": { "type": "object", "properties": { "q": { "type": "string" } } } }],
  "messages": [{ "role": "user", "content": "Research then answer." }]
}
```

### 支持与影响

- 需要客户端保留和回传 thinking/tool_use/tool_result 的正确顺序。
- 历史消息中空 thinking block、丢失 signature、顺序错乱都可能触发 400。
- 新模型的 adaptive thinking 自动支持 interleaved thinking，不需要旧 header。
- 旧模型是否仍需 header 必须按模型文档核实。

---

## `code-execution-2025-05-22`

### 作用

Code Execution 旧版 beta，用于启用代码执行工具，使 Claude 能请求执行代码并基于结果继续推理。

### 历史请求（不要用于新实现）

```http
anthropic-beta: code-execution-2025-05-22
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 2048,
  "tools": [{ "type": "code_execution_20250522", "name": "code_execution" }],
  "messages": [{ "role": "user", "content": "Calculate this dataset." }]
}
```

### 支持与影响

- 旧版，优先确认是否应使用 `code-execution-2025-08-25`。
- 需要安全沙箱和资源限制。
- 没有执行环境时，模型产生 tool use 后无法闭环。

---

## `search-results-2025-06-09`

### 作用

历史 beta，用于 search result content block。客户端可以把搜索结果以结构化块形式传给 Claude，让模型引用或综合这些结果。

### 历史请求（不要用于新实现）

```http
anthropic-beta: search-results-2025-06-09
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "search_result",
          "source": "web",
          "title": "Example",
          "url": "https://example.com",
          "content": "..."
        },
        { "type": "text", "text": "Summarize the result." }
      ]
    }
  ]
}
```

### 支持与影响

- 该能力在新 schema 中可能已 GA 或换为 citations/search result 相关字段。
- 关键是 content block 的结构是否被上游接受。
- 如果只是带 header 但没有 search result block，没有实际收益。

---

## `context-management-2025-06-27`

### 作用

启用上下文管理能力，例如清理历史 tool use、清理 thinking、服务器侧上下文编辑等。用于长对话降低上下文膨胀。

### 示例

```http
anthropic-beta: context-management-2025-06-27
```

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "context_management": {
    "edits": [{ "type": "clear_tool_uses_20250919" }]
  },
  "messages": [{ "role": "user", "content": "Continue from prior conversation." }]
}
```

### 支持与影响

- 主要用于长上下文 agent 会话。
- 可能改变模型能看到的历史信息；必须理解清理策略，否则会丢上下文。
- usage 中可能出现 context management edits / cleared input tokens 等字段。

---

## `context-1m-2025-08-07`

### 作用

历史上用于为指定模型启用 1M context window。当前新模型的 context window 由 Models API/model capability 决定，不应通过旧 header 猜测。

### 历史请求（不要用于新实现）

```http
anthropic-beta: context-1m-2025-08-07
```

### 支持与影响

- 该 beta 已从旧 Sonnet 路径退役；新模型支持 1M 时不需要该 header。
- SDK enum 可能继续保留该值用于历史兼容，不能据此判断当前可用。
- 成本和延迟显著增加，缓存策略很重要。
- Context window 与 `max_tokens` 是不同维度；后者是输出上限。

---

## `code-execution-2025-08-25`

### 作用

历史 Code Execution beta。当前 code execution 已 GA，并有更新的 tool version；不要把 tool `type` 版本与 beta header 生命周期混为一谈。

### 历史请求（不要用于新实现）

```http
anthropic-beta: code-execution-2025-08-25
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 2048,
  "tools": [{ "type": "code_execution_20250825", "name": "code_execution" }],
  "messages": [{ "role": "user", "content": "Run a Python analysis." }]
}
```

### 支持与影响

- 需要执行环境、权限控制、网络/文件访问策略。
- 使用 `allowed_callers` 时应按当前 programmatic tool calling 文档选择 caller/tool version。
- 新实现应使用当前 GA tool type，不再默认发送历史 code execution beta header。
- 第三方兼容路由仍需单独核实。

---

## `model-context-window-exceeded-2025-08-26`

### 作用

启用模型上下文窗口超限时的专门响应/错误信息，让客户端更准确地区分“上下文超限”与普通 invalid request。

### 示例

```http
anthropic-beta: model-context-window-exceeded-2025-08-26
```

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 4096,
  "messages": [{ "role": "user", "content": "<very long input>" }]
}
```

### 支持与影响

- 有助于客户端做自动压缩、裁剪、提示用户减少上下文。
- 不会扩大上下文窗口；只是改变超限反馈形态。
- 建议与长上下文/上下文管理策略一起考虑。

---

## `skills-2025-10-02`

### 作用

启用 Skills beta。Skills 是可复用能力包，让模型在任务中加载指令、脚本、资源或工作流。

### 示例

```http
anthropic-beta: skills-2025-10-02
```

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "messages": [{ "role": "user", "content": "Use the relevant skill to analyze this." }],
  "container": {
    "skills": [{ "type": "custom", "skill_id": "skill_...", "version": "latest" }]
  }
}
```

### 支持与影响

- 需要 Skills API / skill 资源权限。
- Skills 在 `container.skills` 中声明，并在 code execution environment 中运行。
- 适合 agent、企业知识流程、重复任务。
- 不支持该 beta 的路由会拒绝 `skills` 相关字段或忽略能力。

---

## `tool-search-tool-2025-10-19`

### 作用

历史 tool search beta。当前 tool search 在 Anthropic direct 已 GA，核心仍是在工具很多时通过 deferred loading 按需搜索和加载。

### 历史请求（不要用于新实现）

```http
anthropic-beta: tool-search-tool-2025-10-19
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 2048,
  "tools": [
    { "type": "tool_search_tool_bm25_20251119", "name": "tool_search_tool_bm25" },
    { "name": "expensive_tool", "defer_loading": true, "input_schema": { "type": "object" } }
  ],
  "messages": [{ "role": "user", "content": "Find the right tool and use it." }]
}
```

### 支持与影响

- 适合大型 tool registry / agent 平台。
- 客户端必须能处理 `tool_reference` 等 content block。
- 当前使用 `tool_search_tool_regex_20251119` / `tool_search_tool_bm25_20251119` 和 `defer_loading`，不需要旧 header。
- Bedrock Converse 等第三方 schema 不能默认透传 `tool_reference`。

---

## `tool-examples-2025-10-29`

### 作用

允许在 tool 定义里提供 `input_examples`，帮助模型更稳定地产生符合 schema 的工具参数。

### 历史请求（不要用于新实现）

```http
anthropic-beta: tool-examples-2025-10-29
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 1024,
  "tools": [
    {
      "name": "create_ticket",
      "description": "Create a support ticket",
      "input_schema": {
        "type": "object",
        "properties": { "title": { "type": "string" }, "priority": { "type": "string" } }
      },
      "input_examples": [{ "title": "Login failed", "priority": "high" }]
    }
  ],
  "messages": [{ "role": "user", "content": "File a ticket for the outage." }]
}
```

### 支持与影响

- 只在使用 tool definitions 时有意义。
- 可以提升工具参数质量，但增加 prompt/tool definition 体积。
- 当前 `input_examples` 已是 GA tool property，不需要旧 header。
- 目标平台不支持时仍可能报 unknown field，因此 gateway 需要按 provider capability 过滤。

---

## `structured-outputs-2025-11-13`

### 作用

启用结构化输出能力，让 Claude 按指定 JSON schema / output format 返回结果。部分文档已提示旧字段迁移到 `output_config.format`。

### 历史请求（不要用于新实现）

```http
anthropic-beta: structured-outputs-2025-11-13
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 1024,
  "output_format": {
    "type": "json_schema",
    "schema": {
      "type": "object",
      "properties": { "answer": { "type": "string" } },
      "required": ["answer"]
    }
  },
  "messages": [{ "role": "user", "content": "Answer as JSON." }]
}
```

### 支持与影响

- 适合强 schema 输出、自动化解析、评测。
- 与 tool calling 的 strict schema 不是同一件事。
- 当前能力已 GA，使用 `output_config.format`，不再需要 beta header。
- 旧 `output_format` + header 仅是过渡兼容路径，不应作为新实现合同。

---

## `advanced-tool-use-2025-11-20`

### 作用

历史高级工具 umbrella beta。它曾统一启用 tool search、tool examples、deferred loading、tool reference 等能力；当前这些能力应按 GA schema 使用。

### 历史请求（不要用于新实现）

```http
anthropic-beta: advanced-tool-use-2025-11-20
```

```json
{
  "model": "<LEGACY_COMPATIBLE_MODEL_ID>",
  "max_tokens": 2048,
  "tools": [
    { "type": "tool_search_tool_bm25_20251119", "name": "tool_search_tool_bm25" },
    { "name": "tool_a", "defer_loading": true, "input_schema": { "type": "object" } }
  ],
  "messages": [{ "role": "user", "content": "Use the best tool." }]
}
```

### 支持与影响

- 新实现不要发送 umbrella header，也不要再拆成已 GA 的历史单项 header。
- 直接使用当前 tool type、`defer_loading`、`input_examples`、`allowed_callers` 等字段。
- 第三方平台仍需逐字段核对，GA 只说明 Anthropic direct 的当前协议状态。

---

## `mcp-client-2025-11-20`

### 作用

MCP Client 新版 beta。允许 Claude 连接 MCP server，发现并调用远程工具。

### 示例

```http
anthropic-beta: mcp-client-2025-11-20
```

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 2048,
  "mcp_servers": [{ "type": "url", "url": "https://mcp.example.com", "name": "internal-tools" }],
  "messages": [{ "role": "user", "content": "Query the internal tool." }]
}
```

### 支持与影响

- 需要 MCP server 可访问、认证和工具权限。
- 安全风险包括 SSRF、越权工具调用、敏感数据出站。
- 对网关/代理来说，不支持 MCP 的路由应避免透传相关字段。
- `tools[].type: "mcp_toolset"` 通过 `mcp_server_name` 引用 server；`default_config` 设置默认行为，`configs.<tool_name>` 可覆盖单个 MCP tool。
- `defer_loading` 可与 GA tool search 组合，让大型 MCP toolset 按需展开。

---

## `fast-mode-2026-02-01`

### 作用

启用 fast mode：以更高成本换取更低延迟。适合强实时场景、交互式 agent、用户等待敏感的产品路径。

### 示例

```http
anthropic-beta: fast-mode-2026-02-01
```

```json
{
  "model": "claude-opus-4-8",
  "max_tokens": 4096,
  "speed": "fast",
  "messages": [{ "role": "user", "content": "Answer quickly." }]
}
```

### 支持与影响

- Header 和请求体中的 `speed: "fast"` 缺一不可。
- 当前支持 Opus 4.8；Opus 4.7 fast mode 已弃用，并计划于 2026-07-24 移除。
- 仅支持 Anthropic direct API，不支持 Bedrock、Vertex 或 Foundry。
- 主要提高 output tokens per second，不保证同比降低 TTFT；以响应 `usage.speed` 为准。
- 不建议默认全量开启，应按模型/账号/场景灰度并评估 premium pricing。

---

## `advisor-tool-2026-03-01`

### 作用

启用 Advisor Tool。官方 beta schema 中对应 tool：

- `name: "advisor"`
- `type: "advisor_20260301"`

Advisor tool 允许 Claude 调用一个 advisor 子推理/顾问工具，用于复杂任务中的第二意见、审阅、规划或评估。它还包含 advisor 自身 prompt 的 caching 配置、`allowed_callers`、`defer_loading`、`max_uses`、`strict` 等字段。

### 示例

```http
anthropic-beta: advisor-tool-2026-03-01
```

```json
{
  "model": "claude-opus-4-7",
  "max_tokens": 4096,
  "tools": [
    {
      "type": "advisor_20260301",
      "name": "advisor",
      "model": "claude-opus-4-8",
      "allowed_callers": ["direct"],
      "max_uses": 2,
      "caching": { "type": "ephemeral", "ttl": "1h" }
    }
  ],
  "messages": [{ "role": "user", "content": "Review this migration plan and ask the advisor for risks." }]
}
```

Advisor tool result 相关 block 可能包括：

```json
{
  "type": "advisor_tool_result",
  "tool_use_id": "toolu_...",
  "content": {
    "type": "advisor_result",
    "text": "The main risk is..."
  }
}
```

### 支持与影响

- 只有需要 `advisor_20260301` tool 时才应发送。
- 如果 body 没有 advisor tool，仅发送 header 通常没有正向收益，还可能让不支持该 beta 的路由报错。
- 如果 body 使用 advisor tool 但过滤或缺失该 header，上游可能拒绝 `advisor_20260301` / `advisor_tool_result` schema。
- Advisor 子推理会带来额外 token usage；官方 usage schema 中有 `advisor_message` iteration usage。
- 与 code execution / advanced tool use 组合时，要确认 `allowed_callers` 是否允许对应调用方。

---

## `output-300k-2026-03-24`

### 作用

将 Message Batches API 的单请求输出上限提高到 300K tokens。它不是同步 `/v1/messages` 的通用扩容开关。

### 示例

```http
anthropic-beta: output-300k-2026-03-24
```

```json
{
  "requests": [
    {
      "custom_id": "long-output-1",
      "params": {
        "model": "<SUPPORTED_MODEL_ID>",
        "max_tokens": 250000,
        "messages": [{ "role": "user", "content": "Generate the full migration report." }]
      }
    }
  ]
}
```

### 支持与影响

- 仅用于 Message Batches API，并且模型、账号、区域强限制。
- 成本、延迟、超时、断流、客户端内存压力显著增加。
- 需要明确业务价值，不建议作为默认 header。

---

## `user-profiles-2026-03-24`

### 作用

启用 User Profiles API，用于创建和管理调用方代表的 external、resold 或 internal entity profile，并将请求 usage 归因到 profile。

### 示例

```http
anthropic-beta: user-profiles-2026-03-24
```

```bash
curl https://api.anthropic.com/v1/user_profiles \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: user-profiles-2026-03-24" \
  -H "content-type: application/json" \
  -d '{"relationship":"external","external_id":"user_123"}'
```

### 支持与影响

- Profile ID 前缀为 `uprof_`，Messages/Batch 可用 `user_profile_id` 做 usage attribution。
- 涉及用户数据、关系类型、隐私和保留策略，必须确认合规边界。
- 这是 Anthropic API beta resource，不应将 `user_profile` 对象直接塞进普通 Messages body。

---

## `managed-agents-2026-04-01`

### 作用

Claude Managed Agents 的端点级 beta header。官方 beta headers 文档说明该 header 用于：

- `/v1/agents`
- `/v1/sessions`
- `/v1/environments`

它不是普通 Messages 单请求参数，而是托管 agent / session / environment 管理 API 的开关。

### 示例

```http
anthropic-beta: managed-agents-2026-04-01
```

```bash
curl https://api.anthropic.com/v1/agents \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{"name":"research-agent"}'
```

### 支持与影响

- 用于 managed agents 相关 API，不应无意义附加到普通 `/v1/messages`。
- 需要账号开通对应 beta。
- 涉及 agent session、environment、长期状态和工具权限。

---

## `cache-diagnosis-2026-04-07`

- 用途：比较相邻 Messages 请求的 prompt prefix，定位 model、system、tools 或 messages 从哪里开始分歧。
- 请求：每轮带 header，并传 `diagnostics.previous_message_id`；首轮可传 `null`。
- 响应：`diagnostics.cache_miss_reason` 等诊断信息要与 cache usage 一起判断。
- 限制：仅 Anthropic direct API，不支持 Bedrock 或 Vertex；诊断 fingerprint 有有限技术保留。

```json
{
  "diagnostics": { "previous_message_id": "msg_previous" }
}
```

---

## `dreaming-2026-04-21`

- Managed Agents research preview：读取既有 memory store 和 session transcript，生成去重、替换过期内容后的新 memory store。
- 请求还必须发送 `managed-agents-2026-04-01`；`dreaming-2026-04-21` 不是独立的 Messages 能力。
- 需要申请访问，并明确 memory source、output store、数据保留和审计边界。

---

## `thinking-token-count-2026-05-13`

- 用途：当 `thinking.display` 解析为 `omitted` 时，在 streaming `thinking_delta` 中提供粗粒度 token 增量，便于进度显示。
- 该值是 rate-limited、quantized、lossy display hint，不是 billable count。
- 计费仍以最终 `usage.output_tokens` 和公开 usage breakdown 为准。

---

## `server-side-fallback-2026-06-01`

- 用途：在支持的主模型返回 `stop_reason: "refusal"` 时，由服务端按 `fallbacks` 切换到允许的模型。
- 可用目标以 Models API 的 `allowed_fallback_models` 为准，不能任意指定。
- 不支持 Message Batches；平台支持范围与普通模型调用不同。
- 已执行 server tool 后发生 refusal 时，服务端可能不会继续 fallback，应结合 fallback credit 处理。

```json
{
  "model": "<PRIMARY_MODEL_ID>",
  "fallbacks": [{ "model": "<ALLOWED_FALLBACK_MODEL_ID>" }]
}
```

---

## `fallback-credit-2026-06-01`

- 用途：客户端自行处理 refusal fallback 时，避免在目标模型上重复承担 prompt-cache write 成本。
- 初始拒答的 `stop_details.fallback_credit_token` 是 opaque、一次性、短时有效的 credit。
- Retry 必须从原请求体构造，切换 model，增加顶层 `fallback_credit_token`，并继续发送同一 beta header。
- `fallback_has_prefill_claim` 决定是否需要把拒答的 partial assistant content 原样追加后续请求。

---

## `mcp-tunnels-2026-06-22`

- `/v1/tunnels` 的 endpoint-specific header，用于管理连接私有网络 MCP server 的 tunnel。
- 需要对应 workspace scope 和 tunnel agent；不要附加到普通 `/v1/messages`。
- Tunnel 扩大了 Anthropic 到私网资源的可达面，应限制 egress、MCP server 和 credential 权限。

---

## `agent-memory-2026-07-22`

- `/v1/memory_stores` 及子资源的 endpoint-specific header。
- 它替代 memory endpoint 上的 `managed-agents-2026-04-01`；两者同发返回 400。
- 采用后 list memory 的排序、`depth` 和 `path_prefix` 语义发生变化，旧 cursor 不可复用。
- 这是 2026-07-22 生效的预发布合同；接入时应重新检查 SDK release notes 和实际日期。

---

## 选择与排障建议

### 什么时候应该加 beta flag

| 场景                              | 建议                                                     |
| --------------------------------- | -------------------------------------------------------- |
| 请求体使用 beta-only 字段或 block | 必须加对应 beta，否则容易 400                            |
| 只是客户端默认带了一堆 beta       | 逐项确认是否真的使用；不使用就不要带                     |
| 多供应商路由                      | 只给明确支持的上游发送，其他路由应过滤                   |
| 生产灰度                          | 先按模型、账号、用户组灰度，观察 400、延迟、成本和 usage |

### 常见 400 排查顺序

1. 记录实际发给上游的 `anthropic-beta` 值。
2. 去掉所有 beta，只保留最小请求，确认基础模型可用。
3. 按请求体能力逐个加回 beta。
4. 如果错误是 unknown field / unsupported block type，检查是否缺对应 beta。
5. 如果错误是 unsupported beta header，检查该上游是否不支持该 flag，或该 flag 是否历史/GA 后已不再接受。

### 常见组合

| 组合                                                       | 用途              | 注意                                                |
| ---------------------------------------------------------- | ----------------- | --------------------------------------------------- |
| Context editing + prompt cache                 | 长会话上下文管理  | 清理点会影响 cache prefix，需监控 usage              |
| Adaptive thinking + tools                      | 复杂 agent 推理   | 历史消息必须保留 thinking/tool 顺序                  |
| GA tool search + deferred tools                | 大规模工具集      | 客户端需支持 `tool_reference`                        |
| `server-side-fallback-2026-06-01`              | Refusal fallback  | 只使用 Models API 公布的 allowed fallback            |
| `advisor-tool-2026-03-01` + code execution     | 复杂任务审阅/顾问 | 检查 `allowed_callers`、额外 token usage 和工具权限  |

## 参考资料

- <https://platform.claude.com/docs/en/api/beta-headers>
- <https://platform.claude.com/docs/en/release-notes/overview>
- <https://platform.claude.com/docs/en/build-with-claude/fast-mode>
- <https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics>
- <https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback>
- <https://platform.claude.com/docs/en/build-with-claude/fallback-credit>
- <https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference>
