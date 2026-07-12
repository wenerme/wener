---
title: MaaS Spec Messages
---

# MaaS Spec Messages

## 目标

- 梳理 MaaS 需要适配的 message / item / content block / part 类型。
- 明确各协议的 role、type、基础结构和跨协议映射边界。
- 避免把 provider 的中间状态错误地压平成纯文本，尤其是 tool call、tool result、reasoning/thought、citation、multimodal content。

## Canonical Model

MaaS 内部建议把“对话消息”和“协议输出 item”分开建模：

```ts
type MaasRole =
  | 'system'
  | 'developer'
  | 'user'
  | 'assistant'
  | 'tool'
  | 'function'
  | 'model';

type MaasMessage = {
  id?: string;
  role: MaasRole;
  type?: string;          // provider item/message type，例如 message/function_call/thought
  content?: MaasContentPart[] | string;
  name?: string;          // function/tool name, legacy function role name
  status?: 'in_progress' | 'completed' | 'incomplete';
  phase?: 'commentary' | 'final_answer';
  toolCalls?: MaasToolCall[];
  toolCallId?: string;    // tool/function result references a call
  provider?: 'openai' | 'anthropic' | 'google' | string;
  providerRaw?: unknown;
};

type MaasContentPart =
  | MaasTextPart
  | MaasImagePart
  | MaasAudioPart
  | MaasFilePart
  | MaasToolCallPart
  | MaasToolResultPart
  | MaasReasoningPart
  | MaasRefusalPart
  | MaasCitationPart
  | MaasCodePart
  | MaasUnknownPart;
```

### Canonical Part Types

| Canonical type | 说明 | OpenAI | Anthropic | Google |
| --- | --- | --- | --- | --- |
| `text` | 普通文本输入/输出 | `input_text`, `output_text`, chat `text` | `text` | `text` |
| `refusal` | 拒答文本 | `refusal` | 通常是普通 `text` 或 stop/error 语义 | safety/block metadata 或文本 |
| `image` | 图片输入/输出 | `input_image`, chat `image_url` | `image` | `inline_data`, `file_data` |
| `audio` | 音频输入/输出 | chat `input_audio`, realtime/audio output | 通常通过 file/document 或专用能力 | `inline_data`, live audio chunks |
| `file` / `document` | 文件、PDF、文档 | `input_file` | `document` | `file_data`, `inline_data` |
| `tool_call` | 模型请求调用工具 | `function_call`, chat `tool_calls[]` | `tool_use`, `server_tool_use`, `mcp_tool_use` | `functionCall`, Interactions `function_call` |
| `tool_result` | 工具调用结果 | `function_call_output`, chat `role=tool` | `tool_result`, `mcp_tool_result` | `functionResponse`, Interactions `function_result` / `function_response` |
| `reasoning` / `thought` | 推理/思考状态 | `reasoning` | `thinking`, `redacted_thinking` | `thought` / thought signatures |
| `code` | 代码执行请求或结果 | code interpreter items | code execution server tool blocks | `executableCode`, `codeExecutionResult` |
| `citation` / `annotation` | 引用、搜索结果、定位信息 | `annotations` on `output_text` | citations/search result blocks | grounding metadata / citations |
| `unknown` | 保留未知 provider 扩展 | 原样保存 | 原样保存 | 原样保存 |

### 不变量

- 不要把未知 `type` 丢弃；放入 `providerRaw` 或 `unknown` part。
- 不要把多个不同 tool call 合并为一个 tool call；只能合并同一调用的 streaming delta。
- 手动管理上下文时，应保留 provider 要求回传的中间 item：OpenAI `reasoning`、Google `thought/signature/function_call`、Anthropic `thinking/redacted_thinking/tool_use` 等。
- Tool result 必须引用对应 tool call ID；字段名因协议不同而不同。

## OpenAI Responses API

### Input Shape

`input` 可以是字符串，也可以是 input item 列表。

```json
{
  "model": "gpt-5.4",
  "input": [
    {
      "type": "message",
      "role": "developer",
      "content": [{ "type": "input_text", "text": "You are concise." }]
    },
    {
      "type": "message",
      "role": "user",
      "content": [
        { "type": "input_text", "text": "Describe this image" },
        { "type": "input_image", "image_url": "data:image/png;base64,...", "detail": "auto" }
      ]
    }
  ]
}
```

### Input Message Roles

| Role | 说明 |
| --- | --- |
| `developer` | 开发者/应用指令；优先级高于 user |
| `system` | 系统指令；部分新模型更推荐 `developer` |
| `user` | 终端用户输入 |
| `assistant` | 之前模型输出；手动管理上下文时可回放 |

OpenAI Responses 的 assistant message 还可能带 `phase`：

| `phase` | 说明 |
| --- | --- |
| `commentary` | 中间评论/过程消息 |
| `final_answer` | 最终回答 |

对 Codex/GPT-5.3+ 一类模型，后续请求回放 assistant messages 时应保留 `phase`。

### Input Content Types

| Type | 基本字段 | 说明 |
| --- | --- | --- |
| `input_text` | `text` | 文本输入 |
| `input_image` | `image_url` 或 `file_id`, `detail` | 图片输入 |
| `input_file` | `file_id` / `file_url` / `file_data` / `filename`, `detail` | 文件输入 |

### Output Item Types

Responses API 的 `output[]` 不是单一 assistant message；它是 item 列表。

| Type | 关键字段 | 说明 |
| --- | --- | --- |
| `message` | `id`, `role=assistant`, `content[]`, `status`, `phase` | assistant 文本/refusal 输出 |
| `function_call` | `id`, `call_id`, `name`, `arguments`, `status` | 模型请求调用函数；结果引用 `call_id` |
| `function_call_output` | `id`, `call_id`, `output`, `status` | 函数结果；通常作为下一轮 input item |
| `reasoning` | `id`, `summary[]`, `content[]`, `encrypted_content`, `status` | reasoning 模型中间项；手动上下文管理时需要保留 |
| `compaction` | `id`, `encrypted_content` | responses compact API 生成的压缩项 |
| `tool_search_call` | `id`, `call_id`, `arguments`, `execution`, `status` | tool search 调用 |
| `tool_search_output` | `tools[]` | tool search 加载出的工具定义 |
| `computer_call` | `id`, `call_id`, `action`, `status` | computer use 动作调用 |
| `computer_call_output` | `call_id`, output fields | computer use 动作结果 |
| `file_search_call` | `id`, query/result fields | file search 工具调用 |
| `web_search_call` | `id`, action/status fields | web search 工具调用 |
| `image_generation_call` | `id`, `result`, `status` | 图像生成工具调用 |
| `code_interpreter_call` | `id`, code/container/output fields | code interpreter 工具调用 |
| `mcp_call` / `mcp_list_tools` | MCP fields | remote MCP 工具相关 item |
| `additional_tools` | tool definitions | 模型请求追加/加载工具定义的扩展项 |

### Output Message Content Types

| Type | 基本字段 | 说明 |
| --- | --- | --- |
| `output_text` | `text`, `annotations[]`, `logprobs?` | assistant 文本输出 |
| `refusal` | `refusal` | 拒答内容 |

`output_text.annotations[]` 常见类型包括：

| Annotation type | 说明 |
| --- | --- |
| `file_citation` | 文件引用 |
| `url_citation` | URL 引用 |
| `container_file_citation` | container file 引用 |
| `file_path` | 生成/引用的文件路径 |

### Responses Streaming 聚合

| Event family | 聚合键 | 说明 |
| --- | --- | --- |
| `response.output_item.added` | `output_index`, item `id` | 创建 output item |
| `response.output_text.delta` | `item_id` / `output_index` / content index | 合并文本 delta |
| `response.function_call_arguments.delta` | `item_id` / `output_index` | 合并 function arguments 字符串 |
| `response.function_call_arguments.done` | `item_id` / `output_index` | 得到完整 function call |

MaaS 规则：同一 output item 的 delta 合并为一个 item；不同 `output_index` 不合并。

## OpenAI Chat Completions

### Message Roles

| Role | 说明 | content 类型 |
| --- | --- | --- |
| `developer` | 新模型优先使用的开发者指令；替代部分 `system` 用法 | string 或 `text` parts |
| `system` | 系统指令，旧模型/兼容接口常用 | string 或 `text` parts |
| `user` | 用户输入 | string 或 parts: `text`, `image_url`, `input_audio` 等 |
| `assistant` | 模型输出 | string/parts、`tool_calls[]`、`refusal`、audio 等 |
| `tool` | tool result | text content + `tool_call_id` |
| `function` | legacy function result | `name` + content；已被 `tool` 取代 |

### Content Part Types

| Role | Part type | 基本字段 | 说明 |
| --- | --- | --- | --- |
| `developer` / `system` | `text` | `text` | 指令文本 |
| `user` | `text` | `text` | 用户文本 |
| `user` | `image_url` | `image_url.url`, `detail?` | 图片输入 |
| `user` | `input_audio` | `input_audio.data`, `format` | 音频输入 |
| `assistant` | `text` | `text` | assistant 文本 part |
| `assistant` | `refusal` | `refusal` | 拒答 part |
| `tool` | `text` | `text` | 工具结果文本；Chat Completions tool message 只支持文本 part |

### Assistant Tool Calls

```json
{
  "role": "assistant",
  "content": null,
  "tool_calls": [
    {
      "id": "call_...",
      "type": "function",
      "function": {
        "name": "get_weather",
        "arguments": "{\"location\":\"Paris\"}"
      }
    }
  ]
}
```

Result:

```json
{
  "role": "tool",
  "tool_call_id": "call_...",
  "content": "{\"temperature\":25}"
}
```

- `finish_reason=tool_calls` 表示模型调用了工具。
- Streaming 时按 `choices[].delta.tool_calls[].index` 聚合同一 tool call；`function.arguments` 是字符串片段。
- 多个 tool result 不应合成一个 `role=tool` message，因为每条 tool message 只有一个 `tool_call_id`。

## Anthropic Messages API

### Message Roles

| Role | 说明 |
| --- | --- |
| `user` | 用户输入，也承载 client tool 的 `tool_result` blocks |
| `assistant` | Claude 输出，包含文本、thinking、tool_use 等 blocks |
| `system` | 通常是 top-level `system`；新文档也支持 mid-conversation `role=system`，位置受限 |

Mid-conversation system message 约束：

- 必须紧跟 user turn，或紧跟以 server tool use 结束的 assistant turn。
- 不能插在 assistant `tool_use` 与对应 user `tool_result` 中间。
- 不要放不可信内容；tool output / retrieved content 应放在 `tool_result`。

### Content Block Types

| Block type | Role | 基本字段 | 说明 |
| --- | --- | --- | --- |
| `text` | user/assistant/system | `text` | 文本 |
| `image` | user | `source` | 图片输入；source 可为 base64/url/file |
| `document` | user/tool_result | `source`, `title?`, `context?` | 文档/PDF/文本文件 |
| `tool_use` | assistant | `id`, `name`, `input` | client-executed tool call |
| `tool_result` | user | `tool_use_id`, `content?`, `is_error?` | client tool result |
| `server_tool_use` | assistant | `id`, `name`, `input`/tool-specific fields | server-executed tool call |
| server tool result block | assistant | tool-specific fields | 例如 web/code/search 结果；由 Anthropic server 产生 |
| `thinking` | assistant | `thinking`, `signature?` | extended thinking block；继续对话时不能改 |
| `redacted_thinking` | assistant | encrypted/redacted fields | redacted thinking；继续对话时不能改 |
| `mcp_tool_use` | assistant | `id`, `server_name`, `name`, `input` | MCP connector 工具调用 |
| `mcp_tool_result` | assistant/user-like MCP flow | `tool_use_id`, `content`, `is_error?` | MCP connector 工具结果 |
| `search_result` | nested in content | source/title/url/content | 可嵌在 tool result / search content 中 |

### Tool Result Placement

Anthropic tool-use contract：

1. assistant 返回 `stop_reason=tool_use` 和一个或多个 `tool_use` blocks。
2. 下一条 message 必须是 `role=user`，并包含每个 `tool_use.id` 对应的 `tool_result.tool_use_id`。
3. `tool_result` blocks 必须在 user `content[]` 最前面；普通 text 只能放在所有 tool results 后面。
4. 并行工具结果应放在一个 user message 的多个 `tool_result` blocks 中，不要拆成多轮 user messages。

示例：

```json
[
  {
    "role": "assistant",
    "content": [
      { "type": "tool_use", "id": "toolu_01", "name": "get_weather", "input": { "location": "SF" } },
      { "type": "tool_use", "id": "toolu_02", "name": "get_time", "input": { "timezone": "America/Los_Angeles" } }
    ]
  },
  {
    "role": "user",
    "content": [
      { "type": "tool_result", "tool_use_id": "toolu_01", "content": "SF: 20C" },
      { "type": "tool_result", "tool_use_id": "toolu_02", "content": "14:30" }
    ]
  }
]
```

## Google Gemini generateContent API

### Content Shape

`contents[]` 是多轮内容数组：

```json
{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "What is in this image?" }]
    },
    {
      "role": "model",
      "parts": [{ "text": "A cat." }]
    }
  ],
  "system_instruction": {
    "parts": [{ "text": "You are concise." }]
  }
}
```

### Roles

| Role | 说明 |
| --- | --- |
| `user` | 用户输入、function response 等客户端提供内容 |
| `model` | 模型输出、function call、thought 等模型生成内容 |

`system_instruction` 是独立字段，不是普通 `contents[].role=system`。

### Part Types

Google `Part` 是 oneof 风格，常见字段如下：

| Part field | 说明 | MaaS canonical |
| --- | --- | --- |
| `text` | 文本 | `text` |
| `inline_data` / `inlineData` | inline bytes + MIME type | `image` / `audio` / `file` |
| `file_data` / `fileData` | 文件 URI + MIME type | `file` / `image` / `audio` |
| `function_call` / `functionCall` | 模型请求调用函数 | `tool_call` |
| `function_response` / `functionResponse` | 函数结果 | `tool_result` |
| `executable_code` / `executableCode` | code execution 请求 | `code` |
| `code_execution_result` / `codeExecutionResult` | code execution 结果 | `code` / `tool_result` |
| thought fields / signature | thinking/tool context continuation | `reasoning` / provider metadata |

注意：如果模型使用 thinking 或 tools，Google 文档要求保留并原样回传模型生成的 steps/parts，例如 `thought`、`function_call` 及其 signatures。

## Google Interactions API

新版 Interactions API 把一次交互拆成 input/steps。

### Input / Step Types

| Type | 方向 | 基本字段 | 说明 |
| --- | --- | --- | --- |
| `user_input` | client -> model | `content` string 或 content blocks | 用户输入 step |
| `thought` | model -> client/history | `content?`, `signature?` | 模型思考；Gemini 3+ stateless 回放要保留 signature |
| `function_call` | model -> client | `id`, `name`, `arguments`, `signature?` | custom function call；`id` 用于结果关联 |
| `function_result` | client -> model | `name`, `call_id`, `result[]` | function call 执行结果；examples 使用此名 |
| `function_response` | client/model context | `id`/`call_id`, result, `signature?` | tool-combination 文档也称 result step 为 function_response |
| built-in tool steps | model/server | tool-specific args/results, `signature?` | google_search/maps/url_context/file_search 等 built-in tool 上下文 |
| model text/content step | model -> client | `content[]` / text fields | 最终或中间模型输出 |

### Stateful vs Stateless

| Mode | 规则 |
| --- | --- |
| Stateful | 使用 `previous_interaction_id`，server 自动处理 `id` 与 `signature` |
| Stateless | 客户端自己维护 history；必须把模型生成 steps 原样放回下一轮 input，包括 `thought`、`function_call`、built-in tool steps、`signature` |

Function result 示例：

```json
{
  "type": "function_result",
  "name": "set_light_values",
  "call_id": "fc_...",
  "result": [{ "type": "text", "text": "{\"brightness\":25}" }]
}
```

### Tool Choice

| Value | 说明 |
| --- | --- |
| `auto` | 默认；模型自行决定是否调用工具 |
| `any` | 必须调用函数 |
| `none` | 禁止函数调用 |
| `validated` | Preview；保证 schema adherence；tool context circulation 默认用 validated |
| `allowed_tools` | 限制可调用工具集合 |

## Google Live API

Live API 是双向流，message/event 类型与 generateContent 不同。

| Direction | Message family | 说明 |
| --- | --- | --- |
| client -> server | `setup` | 建立模型、工具、音频等配置 |
| client -> server | `clientContent` | 发送 turns；turns 是 `{role, parts}`，可带 `turnComplete` |
| client -> server | `realtimeInput` | 实时音频/视频/activity 输入 |
| client -> server | `toolResponse` | 客户端工具结果 |
| server -> client | `serverContent` | 模型内容、转录、turnComplete、interrupted 等 |
| server -> client | `toolCall` | 模型请求客户端执行工具 |
| server -> client | `toolCallCancellation` | 工具调用取消 |
| server -> client | `setupComplete` / errors | 会话状态 |

MaaS 如果只做非实时 Chat/Responses 兼容，可以先不把 Live event 压成普通 message；保留为 stream event 更安全。

## Cross-Protocol Mapping

### Roles

| Canonical | OpenAI Responses | OpenAI Chat | Anthropic | Google generateContent | Google Interactions |
| --- | --- | --- | --- | --- | --- |
| `system` | `system` | `system` | top-level `system` 或 mid-conversation `role=system` | `system_instruction` | request-level config |
| `developer` | `developer` | `developer` | 无直接等价，通常映射到 system | 无直接等价 | request-level instruction/config |
| `user` | `user` | `user` | `user` | `user` | `user_input` |
| `assistant` | `assistant` output `message` | `assistant` | `assistant` | `model` | model output/content steps |
| `tool` | `function_call_output` item | `role=tool` | `user` message with `tool_result` blocks | `functionResponse` part | `function_result` step |
| `function` | legacy only | `role=function` legacy | 无 | 无 | 无 |

### Text / Multimodal

| Canonical | OpenAI Responses | OpenAI Chat | Anthropic | Google |
| --- | --- | --- | --- | --- |
| text input | `input_text` | `text` part/string | `text` block/string | `text` part / `user_input.content` |
| text output | `output_text` | assistant content/text delta | `text` block | `text` part / model content step |
| image input | `input_image` | `image_url` | `image` | `inline_data` / `file_data` |
| audio input | audio-specific input or chat `input_audio` | `input_audio` | file/document style unless model-specific | `inline_data` / Live realtime input |
| file/document | `input_file` | limited by model/API | `document` | `file_data` / `inline_data` |

### Tool Calls

| Canonical | OpenAI Responses | OpenAI Chat | Anthropic | Google |
| --- | --- | --- | --- | --- |
| call ID | `function_call.call_id` | `tool_calls[].id` | `tool_use.id` | `functionCall.id` or Interactions `function_call.id` |
| provider item ID | `function_call.id` | same as call ID or message id | same as call ID/block id | step/part id |
| call name | `name` | `function.name` | `name` | `name` |
| arguments | JSON string `arguments` | JSON string `function.arguments` | object `input` | object `args` / `arguments` |
| result reference | `function_call_output.call_id` | `tool_call_id` | `tool_result.tool_use_id` | `functionResponse.name/id` or Interactions `call_id` |
| parallel result packaging | multiple output items | multiple `role=tool` messages | one user message, multiple `tool_result` blocks | multiple parts/steps |

## MaaS Implementation Notes

### Parse Rules

- OpenAI Responses:
  - Treat top-level `output[]` item `type` as message/item type.
  - For `message.content[]`, treat nested `type` as content part type.
  - `function_call.call_id` is the canonical tool call ID; keep `id` as provider item ID.
- OpenAI Chat:
  - Treat `messages[].role` as message role.
  - Treat `content[]` part `type` as content part type.
  - Treat `assistant.tool_calls[]` as tool call parts even though they are not in `content`.
- Anthropic:
  - Treat `messages[].content[]` blocks as first-class parts.
  - Preserve `thinking` / `redacted_thinking` unchanged when replaying.
  - Validate `tool_result` placement before sending.
- Google:
  - For generateContent, parse `contents[].parts[]` oneof fields into parts.
  - For Interactions, parse each `input[]` / `steps[]` element by `type`.
  - Preserve `signature` and model-generated steps in stateless mode.

### Serialization Rules

- Do not serialize tool results as plain user text unless the target protocol has no tool-result primitive.
- When converting OpenAI Chat -> Anthropic, merge consecutive `role=tool` messages that answer the same assistant `tool_calls[]` into one Anthropic `user.content[]` with multiple `tool_result` blocks.
- When converting Anthropic -> OpenAI Chat, split one Anthropic user message containing multiple `tool_result` blocks into multiple `role=tool` messages.
- When converting Responses -> Chat, map `function_call.call_id` to Chat `tool_calls[].id`; map `function_call_output.call_id` to `tool_call_id`.
- When converting Google Interactions stateless history, never drop `thought` or `signature` fields even if MaaS does not expose them to callers.

### Unknown / Future Types

Provider schemas change frequently. MaaS should:

- keep `providerRaw` for every unrecognized item/block/part;
- log unknown type counters by provider/model;
- fail closed only when the unknown type affects required continuation semantics, e.g. a tool call/result or signed thought step;
- otherwise pass through or expose as `unknown` part.

## Related Specs

- [tool-call.md](./tool-call.md)
- [sse.md](./sse.md)
- [cache.md](./cache.md)
- [usage.md](./usage.md)

## References

- `skills/openai-sdk-python/references/responses/input_tokens/count.md`
- `skills/openai-sdk-python/references/chat.md`
- `skills/openai-docs/references/guides/function-calling.md`
- `skills/anthropic-docs/references/build-with-claude/working-with-messages.md`
- `skills/anthropic-docs/references/build-with-claude/mid-conversation-system-messages.md`
- `skills/anthropic-docs/references/agents-and-tools/tool-use/handle-tool-calls.md`
- `skills/anthropic-docs/references/agents-and-tools/tool-use/troubleshooting-tool-use.md`
- `skills/google-ai-docs/references/text-generation.md`
- `skills/google-ai-docs/references/function-calling.md`
- `skills/google-ai-docs/references/tool-combination.md`
- `skills/google-ai-docs/references/live-guide.md`
