---
title: MaaS Tool Call
---

# MaaS Tool Call

## 概念

- Tool call / function calling 是模型请求外部能力的通用机制。
- MaaS 网关需要处理不同厂商的 tool schema、tool choice、tool result role、tool call id 和 streaming chunk 差异。
- 关键不变量：每个 tool call 都必须有稳定 ID；tool result 必须引用对应 tool call；并行 tool call 可以同一轮出现，但不能把多个不同调用合并成一个调用。

## ToolChoice

| 值 | 说明 |
| --- | --- |
| `auto` | 自动选择是否使用工具 |
| `required` / `any` | 必须使用工具；OpenAI 常用 `required`，Anthropic 常用 `any` |
| `tool` / forced function | 强制使用指定工具 |
| `none` | 不使用工具 |

## Provider 差异

| 语义 | OpenAI Responses | OpenAI Chat Completions | Anthropic Messages | Google |
| --- | --- | --- | --- | --- |
| 工具定义 | `tools[].type=function` | `tools[].function` | `tools[]` + `input_schema` | `functionDeclaration` |
| assistant tool call | `output[]` item: `type=function_call` | assistant message `tool_calls[]` | assistant `content[]` block: `type=tool_use` | model `functionCall` part |
| tool call ID | `call_id` 用于回传结果；`id` 是 response item id | `tool_calls[].id` | `tool_use.id` | function call 通常依赖 name/part 结构，按接口确认 |
| tool result | input item `type=function_call_output` + `call_id` | `role=tool` message + `tool_call_id` | `role=user` message 中 `tool_result.tool_use_id` | function response part |
| 并行控制 | `parallel_tool_calls` | `parallel_tool_calls` | `disable_parallel_tool_use` | 需按模型/接口能力确认 |
| 并行结果形状 | 多个 `function_call_output` input item | 多条 `role=tool` message | 一个 user message 内多个 `tool_result` block | 多个 function response part |

## ID 规则

### OpenAI Responses

- 模型输出的 tool call 是 `response.output[]` 里的 item，典型形状：

```json
{
  "type": "function_call",
  "id": "fc_...",
  "call_id": "call_...",
  "name": "get_weather",
  "arguments": "{\"location\":\"Paris\"}"
}
```

- 回传结果时引用 `call_id`，不是 `id`：

```json
{
  "type": "function_call_output",
  "call_id": "call_...",
  "output": "{\"temperature\":25,\"unit\":\"C\"}"
}
```

- `id` 是 response output item 的唯一 ID；`call_id` 是工具调用关联 ID。MaaS 做 OpenAI Responses 适配时，应把内部 `tool_call.id` 映射到 `call_id`。
- Streaming 时：
  - `response.output_item.added` 创建一个 function call item；
  - `response.function_call_arguments.delta` 通过 `item_id` / `output_index` 追加 `arguments` 片段；
  - `response.function_call_arguments.done` 给出完整 item。
- 因此 streaming 需要把同一 `item_id` 或 `output_index` 的参数 delta 合并为一个逻辑 tool call；不要把不同 `output_index` 的调用合并。

### OpenAI Chat Completions

- assistant message 通过 `tool_calls[]` 返回一个或多个调用：

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

- 回传结果是 `role=tool`，引用 `tool_call_id`：

```json
{
  "role": "tool",
  "tool_call_id": "call_...",
  "content": "{\"temperature\":25,\"unit\":\"C\"}"
}
```

- Chat Completions 的 `tool_calls[].id` 就是 result 侧的 `tool_call_id`。
- 多个 tool call 可以在同一个 assistant message 的 `tool_calls[]` 中出现；结果通常是多条连续 `role=tool` message，每条引用一个 `tool_call_id`。
- Streaming 时应按 `delta.tool_calls[].index`，以及出现后的 `id`，合并同一个调用的 `function.name` / `function.arguments` 片段。

### Anthropic Messages

- assistant 返回 `content[]` block；client tool call 是 `type=tool_use`：

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'll check the weather."
    },
    {
      "type": "tool_use",
      "id": "toolu_...",
      "name": "get_weather",
      "input": { "location": "Paris" }
    }
  ]
}
```

- 回传结果必须放在下一条 `role=user` message 的 `content[]` 中，用 `tool_use_id` 引用 `tool_use.id`：

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_...",
      "content": "{\"temperature\":25,\"unit\":\"C\"}"
    }
  ]
}
```

- Anthropic 的 `tool_use.id` 是工具调用关联 ID；结果侧字段名是 `tool_use_id`。
- `tool_result` block 必须紧跟对应 assistant tool_use turn；不能在 assistant tool_use 和 user tool_result 之间插入其他消息。
- 在包含 tool results 的 user message 中，`tool_result` blocks 必须排在 `content[]` 最前面；如果要追加普通文本，只能放在所有 `tool_result` 之后。
- 如果 assistant 同一轮还包含未完成的 server tool call，下一条 user message 应只包含 client `tool_result` blocks，不要追加普通文本。

## 并行 Tool Call 与 Block 合并

### 结论

- 不要把多个不同 tool call 合并成一个 tool call；每个调用保留自己的 ID、name、arguments/input、result。
- Streaming chunk 需要合并：同一个调用的 argument/input delta 应合并成一个完整调用。
- Message history 可以按 provider 要求做“批量包装”：
  - Anthropic：多个并行结果应合并到同一条 `role=user` message 的多个 `tool_result` blocks。
  - OpenAI Responses：多个结果可作为同一轮 input 里的多个 `function_call_output` items。
  - OpenAI Chat Completions：多个结果通常保持为多条连续 `role=tool` messages；不要把不同结果塞进一条 tool message，因为每条 tool message 只有一个 `tool_call_id`。

### Anthropic 并行结果示例

```json
{
  "role": "assistant",
  "content": [
    { "type": "tool_use", "id": "toolu_01", "name": "get_weather", "input": { "location": "SF" } },
    { "type": "tool_use", "id": "toolu_02", "name": "get_time", "input": { "timezone": "America/Los_Angeles" } }
  ]
}
```

正确回传：

```json
{
  "role": "user",
  "content": [
    { "type": "tool_result", "tool_use_id": "toolu_01", "content": "SF: 20C" },
    { "type": "tool_result", "tool_use_id": "toolu_02", "content": "SF time: 14:30" }
  ]
}
```

不推荐拆成两轮 user message；Anthropic 文档明确说并行场景应把多个 `tool_result` blocks 放在一个 user message，否则模型可能退化为顺序 tool use，甚至触发 `tool_use ids were found without tool_result blocks immediately after`。

## MaaS 内部规范化建议

### Canonical Tool Call

建议内部统一为：

```ts
type ToolCall = {
  id: string;              // 内部稳定 ID，映射 OpenAI call_id/tool_call_id 或 Anthropic tool_use.id
  providerId?: string;     // 原始 provider 的 item id，例如 OpenAI Responses output item id
  name: string;
  arguments: unknown;      // OpenAI arguments JSON string parse 后、Anthropic input 原样
  rawArguments?: string;   // 保留 OpenAI 原始 arguments string，便于调试
  index?: number;          // streaming/output 顺序
};

type ToolResult = {
  toolCallId: string;
  content: string | Array<unknown>;
  isError?: boolean;
};
```

### Provider 映射

| 内部字段 | OpenAI Responses | OpenAI Chat Completions | Anthropic |
| --- | --- | --- | --- |
| `ToolCall.id` | `function_call.call_id` | `tool_calls[].id` | `tool_use.id` |
| `ToolCall.providerId` | `function_call.id` | 可同 `id` 或留空 | 可同 `id` 或留空 |
| `ToolCall.name` | `function_call.name` | `tool_calls[].function.name` | `tool_use.name` |
| `ToolCall.arguments` | parse `function_call.arguments` | parse `function.arguments` | `tool_use.input` |
| `ToolResult.toolCallId` | `function_call_output.call_id` | `tool.tool_call_id` | `tool_result.tool_use_id` |

### 转换规则

- OpenAI Responses -> Anthropic：
  - `function_call.call_id` -> `tool_use.id`；
  - `function_call.arguments` JSON string -> `tool_use.input` object；
  - 多个 `function_call_output` -> 一个 Anthropic user message 的多个 `tool_result` blocks。
- Anthropic -> OpenAI Responses：
  - `tool_use.id` -> `function_call.call_id`；
  - `tool_use.input` object -> JSON string `arguments`；
  - 一个 user message 内多个 `tool_result` -> 多个 `function_call_output` input items。
- OpenAI Chat -> Anthropic：
  - assistant `tool_calls[]` -> assistant `content[]` 多个 `tool_use` blocks；
  - 连续 `role=tool` messages -> 合并为一个 Anthropic user message，`content[]` 内多个 `tool_result` blocks。
- Anthropic -> OpenAI Chat：
  - assistant `tool_use` blocks -> assistant `tool_calls[]`；
  - user `tool_result` blocks -> 多条 `role=tool` messages，每条一个 `tool_call_id`。

## Provider Notes

## Google

- 内置 tool 和 `functionDeclaration` 工具不能同时使用。
- OpenAI 里的 function tool 通常映射为一个 `functionDeclaration`。
- Google 内置 tool 和 functionDeclaration 语义不同，function call/result part 的 ID 与并行行为需要按具体 API 和模型确认。

## Anthropic

- tool result 通过 `user` role 中的 `tool_result` block 回传。
- 并行工具调用控制是 `disable_parallel_tool_use`，与 OpenAI 的 `parallel_tool_calls` 语义方向相反。
- 默认可能并行调用多个工具；如果 `disable_parallel_tool_use=true`：
  - `tool_choice=auto` 时最多一个 tool；
  - `tool_choice=any` 或 `tool` 时正好一个 tool。

## OpenAI

- Responses API 的结果引用字段是 `call_id`；不要误用 response item 的 `id`。
- Chat Completions 的结果引用字段是 `tool_call_id`，对应 assistant `tool_calls[].id`。
- 多工具调用由 `parallel_tool_calls` 控制；设为 `false` 可限制为零个或一个工具调用。

## Cache

- Tool call 缓存实际缓存的是 schema、描述等 prompt 前缀内容。
- 修改 tool schema、名称、描述会影响 prompt cache 命中。
- Anthropic 文档指出修改 `tool_choice` 会影响缓存；OpenAI 文档也说明函数定义会进入上下文并计费，schema 变化可能影响缓存/延迟。

## 参考

- `skills/openai-docs/references/guides/function-calling.md`
- `skills/openai-sdk-python/references/chat.md`
- `skills/openai-sdk-python/references/conversations.md`
- `skills/anthropic-docs/references/agents-and-tools/tool-use/handle-tool-calls.md`
- `skills/anthropic-docs/references/agents-and-tools/tool-use/implement-tool-use.md`
- `skills/anthropic-docs/references/agents-and-tools/tool-use/troubleshooting-tool-use.md`
