---
title: Amazon Bedrock MaaS API
---

# Amazon Bedrock MaaS API

- API models：见 [Smithy Models](#smithy-models)。
- 本地提取：`just models`
- 输出：`models/*bedrock*/service/*/*.json`

- InvokeModel / InvokeModelWithResponseStream
  - 适合单次调用、模型原生 body、大 payload、非消息型/特殊模型
- Converse / ConverseStream
  - 新的统一消息接口
  - 适合 chat/multi-turn/tool use
- provider-specific endpoint / model-specific body
- Amazon Bedrock Runtime API
  - <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_Operations_Amazon_Bedrock_Runtime.html>
- Converse API
  - <https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html>
- Streaming
  - <https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-eventstream.html>
- Amazon Event Stream
  - <https://smithy.io/2.0/aws/amazon-eventstream.html>

## Smithy Models

- 上游格式：[Smithy JSON AST](https://smithy.io/2.0/spec/json-ast.html)
- 默认固定 `api-models-aws` commit `61d7b25d8cc390475a1d3c566f2aef108b9c44af`。
- 更新时可执行 `AWS_API_MODELS_REF=branch=main just models`，核对 diff 后再更新默认 commit。
- 每个 JSON 文件是自包含 Smithy service model；按服务需要包含 operation、resource、structure、union、streaming/event stream 和 protocol traits。

| Model directory | SDK ID | Version | Operations | 定位 |
| --- | --- | --- | ---: | --- |
| `bedrock-runtime` | Bedrock Runtime | 2023-09-30 | 11 | MaaS 推理主路径：Converse、InvokeModel、CountTokens、async invoke |
| `bedrock` | Bedrock | 2023-04-20 | 108 | Foundation model、custom model、guardrail、evaluation 等 control plane |
| `bedrock-agent-runtime` | Bedrock Agent Runtime | 2023-07-26 | 33 | Agent、knowledge base、flow runtime |
| `bedrock-agent` | Bedrock Agent | 2023-06-05 | 75 | Agent、knowledge base、prompt、flow control plane |
| `bedrock-agentcore` | Bedrock AgentCore | 2024-02-28 | 65 | AgentCore runtime、memory、gateway、code interpreter 等 |
| `bedrock-agentcore-control` | Bedrock AgentCore Control | 2023-06-05 | 153 | AgentCore control plane |
| `bedrock-data-automation-runtime` | Bedrock Data Automation Runtime | 2024-06-13 | 6 | Data Automation invocation/runtime |
| `bedrock-data-automation` | Bedrock Data Automation | 2023-07-26 | 27 | Data Automation project/blueprint control plane |

### Bedrock Runtime Operations

- Model inference
  - `Converse` / `ConverseStream`
  - `InvokeModel` / `InvokeModelWithResponseStream`
  - `InvokeModelWithBidirectionalStream`
- Token/guardrail
  - `CountTokens`
  - `ApplyGuardrail` / `InvokeGuardrailChecks`
- Async
  - `StartAsyncInvoke` / `GetAsyncInvoke` / `ListAsyncInvokes`

Smithy operation 的 HTTP URI、input/output shape、error、streaming/eventstream trait 才是生成 SDK 和实现 codec 的接口合同；README 的手工总结只作为导航。

## Runtime API

| API | 用途 | MaaS 适配注意 |
| --- | --- | --- |
| `Converse` | 统一对话接口 | 优先用于跨模型 text / multimodal / tool use 适配 |
| `ConverseStream` | 统一对话流式接口 | 返回 `application/vnd.amazon.eventstream`，不是 `text/event-stream` |
| `InvokeModel` | 模型原生请求/响应 | body 是模型私有 schema，适合保留 provider 原生能力 |
| `InvokeModelWithResponseStream` | 模型原生流式响应 | 事件通常是 `chunk`，payload 仍需按模型原生格式解析 |

建议 MaaS 内部优先以 `Converse` / `ConverseStream` 建立通用语义；只有在模型能力或供应商私有参数无法表达时，才降到 `InvokeModel*` 原生接口。

## Converse message

`Converse` 的核心结构和 OpenAI / Anthropic 不同：

- `system` 是独立字段，不是 `messages[]` 里的 `system` role。
- `messages[].role` 通常只有 `user` / `assistant`。
- `messages[].content[]` 是 block 列表，常见 block 包括：
  - `text`
  - `image`
  - `document`
  - `video`
  - `toolUse`
  - `toolResult`
  - `guardContent`
  - `cachePoint`
  - `reasoningContent`
- `inferenceConfig` 承载通用推理参数，例如 `maxTokens`、`temperature`、`topP`、`stopSequences`。
- `additionalModelRequestFields` 承载模型/供应商私有字段。
- `additionalModelResponseFieldPaths` 用于请求返回模型私有字段。

```json
{
  "modelId": "anthropic.claude-3-5-sonnet-20240620-v1:0",
  "system": [{ "text": "You are a concise assistant." }],
  "messages": [
    {
      "role": "user",
      "content": [{ "text": "hello" }]
    }
  ],
  "inferenceConfig": {
    "maxTokens": 1024,
    "temperature": 0.7,
    "topP": 0.9
  }
}
```

## Streaming / EventStream

Bedrock streaming 使用 Amazon Event Stream 二进制分帧：

- HTTP `Content-Type` 通常是 `application/vnd.amazon.eventstream`。
- 这不是 WHATWG `text/event-stream`，不能用普通 SSE line parser 解析。
- 每条 eventstream message 有：
  - `total_length`
  - `headers_length`
  - `prelude_crc`
  - typed headers
  - payload
  - `message_crc`
- 常见 headers：
  - `:message-type`: `event` / `exception` / `error`
  - `:event-type`: modeled event 名称
  - `:exception-type`: modeled exception 名称
  - `:content-type`: payload media type

MaaS codec 层应先完成 eventstream framing 和 CRC 校验，再把 payload 交给 Bedrock 事件语义层解析。

## ConverseStream events

`ConverseStream` 常见事件：

| event type | 说明 | 通用流式语义 |
| --- | --- | --- |
| `messageStart` | assistant 消息开始 | lifecycle |
| `contentBlockStart` | content block 开始 | lifecycle |
| `contentBlockDelta` | content block 增量 | delta |
| `contentBlockStop` | content block 结束 | done |
| `messageStop` | assistant 消息结束 | done |
| `metadata` | usage / metrics 等尾部元数据 | terminal |

注意：`metadata` 可能在 `messageStop` 后出现。通用 stream 聚合器不能在 `messageStop` 后立即丢弃连接上下文，否则会漏掉 usage / metrics。

常见 `contentBlockDelta.delta` 类型：

- `text`
- `reasoningContent`
- `toolUse`
- `toolResult`
- `citation`

## InvokeModelWithResponseStream events

`InvokeModelWithResponseStream` 更接近模型原生流式接口：

- 常见 event type 是 `chunk`。
- `chunk.bytes` 里承载模型原生响应片段。
- MaaS 适配层需要先解 eventstream，再按目标模型原生协议解析 chunk 内容。

## Stream exceptions

Bedrock stream 中异常可能作为 eventstream message 返回，而不是普通 HTTP body。

| exception type | 常见接口 | 说明 |
| --- | --- | --- |
| `internalServerException` | ConverseStream / Invoke stream | 服务内部错误 |
| `modelStreamErrorException` | ConverseStream / Invoke stream | 模型流式生成错误 |
| `modelTimeoutException` | Invoke stream | 模型处理超时 |
| `serviceUnavailableException` | ConverseStream / Invoke stream | 服务暂不可用 |
| `throttlingException` | ConverseStream / Invoke stream | 限流 |
| `validationException` | ConverseStream / Invoke stream | 请求参数不合法 |

MaaS 错误处理建议：

- `:message-type=exception` 时优先读取 `:exception-type`。
- 未知但非空的 exception type 也应按 error 处理。
- stream 中断时可能没有最终 usage，需要结合已收到 chunk 做估算或标记为 incomplete。

## Tool use

Bedrock Converse 的 tool 语义接近 Anthropic，但字段名不同。

### Tool 定义

```json
{
  "toolConfig": {
    "tools": [
      {
        "toolSpec": {
          "name": "get_weather",
          "description": "Get weather by city",
          "inputSchema": {
            "json": {
              "type": "object",
              "properties": {
                "city": { "type": "string" }
              },
              "required": ["city"]
            }
          }
        }
      }
    ],
    "toolChoice": { "auto": {} }
  }
}
```

### Assistant tool call

```json
{
  "role": "assistant",
  "content": [
    {
      "toolUse": {
        "toolUseId": "tooluse_1",
        "name": "get_weather",
        "input": { "city": "Shanghai" }
      }
    }
  ]
}
```

### Tool result

```json
{
  "role": "user",
  "content": [
    {
      "toolResult": {
        "toolUseId": "tooluse_1",
        "status": "success",
        "content": [
          { "json": { "temperature": 25 } }
        ]
      }
    }
  ]
}
```

适配注意：

- Bedrock 没有 OpenAI 的 `role=tool`；tool result 通常作为 `user` role 的 `toolResult` block 回传。
- `toolUseId` 是关联 tool result 的稳定 ID。
- OpenAI `tool_calls[].id` / Anthropic `tool_use.id` 映射到 Bedrock 时应保留为 `toolUseId`。
- `toolChoice` 常见形状是 `auto` / `any` / `tool`，具体模型支持需要按 model capability 判断。

## Cache

Bedrock Converse 支持通过 `cachePoint` 表达 prompt cache 断点，但并非所有模型都支持。

适配建议：

- cache 能力应按模型维度声明，不能全局默认开启。
- `cachePoint` 是 content block 的一部分，和 OpenAI / Anthropic 的 cache control 表达不同。
- usage 里若返回 cache read/write token，应映射到 MaaS 统一 usage 字段。

## Usage / metrics

Bedrock `Converse` / `ConverseStream` 常见 usage 字段：

- `inputTokens`
- `outputTokens`
- `totalTokens`
- cache read/write token，按模型和接口返回情况确认

`ConverseStream` 的 usage / metrics 往往在 `metadata` 事件中返回。MaaS 统计逻辑需要：

- 收到 `metadata` 后再确认最终 usage。
- 如果 stream abort / network reset 导致没有 `metadata`，需要标记 usage 不完整。
- 计费口径应区分 provider 原始 usage、MaaS 估算 usage、最终可结算 usage。

## MaaS 映射建议

| MaaS / OpenAI 风格 | Bedrock Converse |
| --- | --- |
| `system` message | top-level `system[]` |
| `user` message | `messages[].role=user` |
| `assistant` message | `messages[].role=assistant` |
| `tool` result message | `messages[].role=user` + `toolResult` block |
| `tools[].function.parameters` | `toolConfig.tools[].toolSpec.inputSchema.json` |
| `tool_choice=auto` | `toolChoice.auto` |
| `tool_choice=required` / Anthropic `any` | `toolChoice.any` |
| forced tool | `toolChoice.tool.name` |
| text stream delta | `contentBlockDelta.delta.text` |
| reasoning delta | `contentBlockDelta.delta.reasoningContent` |
| final usage | `metadata.usage` |

## 参考实现注意

- `ConverseStream` 的 `messageStop` 不一定是最后一个有价值事件，后续 `metadata` 仍可能包含 usage / metrics。
- eventstream CRC 错误应终止 stream，不应继续解析 payload。
- `InvokeModel*` 原生接口的 body schema 和 event chunk 内容由模型决定，不应强行套 Converse schema。
- Bedrock 的跨区域 inference profile、guardrail、performance config、request metadata 都属于网关路由和审计层需要保留的信息。

## 参考

- [aws/api-models-aws](https://github.com/aws/api-models-aws)
  - Apache-2.0, Smithy JSON AST
  - AWS SDK/CLI 的 public service interface definitions；仓库内容由上游自动生成，不是手写 REST/OpenAPI 文档。
