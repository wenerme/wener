---
tags:
  - FAQ
---

# Anthropic FAQ

## 能力 GA 后是否还要保留旧 beta header？

通常不保留。

- Structured outputs 已迁移到 `output_config.format`，不再需要 `structured-outputs-2025-11-13`。
- Fine-grained tool streaming 使用 tool-level `eager_input_streaming`，不再需要旧 header。
- Tool search 已 GA，使用 `tool_search_tool_regex_20251119` / `tool_search_tool_bm25_20251119` 和 `defer_loading`。
- Adaptive thinking、effort 和新模型的 interleaved thinking 不应机械附带旧 beta。

旧 header 可能在过渡期仍被 Anthropic direct 接受，但这不是长期兼容合同。

## Anthropic direct、Bedrock 和 Vertex 的 beta 是否相同？

不同。

- Anthropic direct 使用 `anthropic-beta` 和 Anthropic Messages schema。
- Bedrock Converse 使用 AWS 自己的 request schema，不能假设能表达所有 Anthropic content block。
- Bedrock `InvokeModel` 的 Anthropic payload 更接近原生 Messages，但可用 header、模型和区域仍由 AWS 决定。
- Vertex AI 同样有独立的模型发布、区域和 schema 支持范围。
- Fast mode、cache diagnostics、advisor tool 等能力明确只支持 Anthropic API，不能透传到 Bedrock/Vertex。

## Anthropic 和 Bedrock 的 `tool_choice` 有什么差异？

- Anthropic Messages：根级 `tool_choice`，常见 `type` 为 `auto`、`any`、`tool`、`none`。
- `disable_parallel_tool_use` 位于 Anthropic 的 `tool_choice` 对象内，不是根级字段。
- Bedrock Converse：位于 `toolConfig.toolChoice`，由 AWS schema 决定可用 variant。
- Thinking、forced tool choice 和 `none` 的组合支持要按目标模型和平台验证，不能只做字段重命名。

## `tool_reference` 是否能直接透传到 Bedrock Converse？

不能默认认为可以。`tool_reference` 来自 tool search / deferred loading 工作流，而 Bedrock Converse 使用严格的 AWS content block union。网关需要：

- 明确验证目标 API 是否支持该 block。
- 不支持时在发送前阻止或转换，而不是让 AWS schema validation 才发现。
- 区分 tool search 已在 Anthropic direct GA，与第三方平台是否实现相同协议。

## Code execution 如何调用客户端工具？

Programmatic tool calling 的调用链是：

1. 请求中的客户端 tool 通过 `allowed_callers` 允许 code execution 调用。
2. Claude 在 server-side code execution sandbox 中执行代码。
3. Sandbox 调用客户端 tool 时，响应产生 `tool_use`，并附带 `caller.type` 和 `caller.tool_id`。
4. 客户端执行该 tool，再以 `tool_result` 回传，服务端继续原有 code execution。

当前代码执行版本和 accepted caller value 会演进，应使用 tool reference 中公布的版本；不要把历史 `code-execution-*` beta header 与当前 `code_execution_*` tool type 机械绑定。

## Thinking block 在多轮请求中如何处理？

- 同一模型继续对话时，按模型文档要求保持 block、signature 和顺序，不要改写 opaque 数据。
- `redacted_thinking` 是安全护栏可能返回的内容类型，不需要一个名为 `redact-thinking-2026-02-12` 的公开 beta 才会出现。
- 切换模型时移除旧模型生成的 `thinking` 和 `redacted_thinking`；这些 block 与生成模型绑定，保留只会增加输入 token，且可能造成兼容问题。
- Thinking 与 tool use 交错时，必须保留 assistant content block 和后续 tool result 的协议顺序。

## Adaptive thinking、effort 和 `budget_tokens` 如何选择？

- 新模型优先 `thinking: {type: "adaptive"}` + `output_config: {effort: "..."}`。
- `effort` 是行为信号，不是硬 token budget，并且会影响正文与 tool call。
- Manual thinking 的 `budget_tokens` 只用于仍支持 `thinking.type: "enabled"` 的模型；在部分新模型上会直接 400。
- 默认 effort、可用 level 和 thinking mode 都必须按具体 model capability 核实。

## Fast mode 为什么没有生效？

Fast mode 同时需要：

- `anthropic-beta: fast-mode-2026-02-01`
- 请求体 `speed: "fast"`
- 支持的 Opus 模型、账号权限和 Anthropic direct API

它主要提高 output tokens per second，不保证同比降低 TTFT。检查响应 `usage.speed`，不要仅凭 header 判断是否生效。Fast mode 不支持 Bedrock、Vertex 或 Foundry。

## 如何排查 prompt cache miss？

- 先检查 `usage.cache_creation_input_tokens` 和 `usage.cache_read_input_tokens`。
- Model、system、tool definitions、message prefix、tool choice、thinking、context management、output config 和 active beta set 都可能改变 cache key。
- Anthropic direct 可使用 `cache-diagnosis-2026-04-07`，通过 `diagnostics.previous_message_id` 比较相邻请求；该功能不支持 Bedrock/Vertex。

## `model_context_window_exceeded` 是否需要 beta？

- Claude 4.5 及更新模型会直接返回该 stop reason，不需要 beta header。
- 更早模型可用 `model-context-window-exceeded-2025-08-26` opt in。
- 这个 flag 只改变达到窗口上限时的反馈方式，不会扩大 context window。

## 如何指定 US-only inference？

Anthropic direct Messages API 使用：

```json
{
  "inference_geo": "us"
}
```

- 仅支持指定的新模型；旧模型会 400。
- US-only inference 对 token、cache write/read 都有 1.1x 价格 multiplier。
- Bedrock/Vertex 使用 endpoint/region/inference profile 控制地域，不使用该字段。

## claude code x-anthropic-billing-header

- CC_VERSION
- BILLING_SALT

没有会出错

```
This credential is only authorized for use with Claude Code and cannot be used for other API requests.
```

计算逻辑

```py
cch = SHA256(message_text)[:5]    # first 5 hex characters

sampled = message_text[4] + message_text[7] + message_text[20]
sampled = "".join(
    message_text[i] if i < len(message_text) else "0"
    for i in (4, 7, 20)
)
version_hash = SHA256(BILLING_SALT + sampled + CC_VERSION)[:3]   # first 3 hex characters
```

```
x-anthropic-billing-header: cc_version=2.1.37.0d9; cc_entrypoint=cli; cch=fa690;
```

```json
{
  "system": [
    {"type": "text", "text": "x-anthropic-billing-header: cc_version=2.1.37.0d9; cc_entrypoint=cli; cch=fa690;"},
    {"type": "text", "text": "You are Claude Code, Anthropic's official CLI for Claude."},
    {"type": "text", "text": "...full system prompt..."}
  ],
  "messages": [{"role": "user", "content": "hey"}]
}
```

- https://gist.github.com/NTT123/579183bdd7e028880d06c8befae73b99

## 参考

- <https://platform.claude.com/docs/en/api/beta-headers>
- <https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking>
- <https://platform.claude.com/docs/en/build-with-claude/effort>
- <https://platform.claude.com/docs/en/build-with-claude/fast-mode>
- <https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics>
- <https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference>
- <https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling>
- <https://platform.claude.com/docs/en/build-with-claude/data-residency>
