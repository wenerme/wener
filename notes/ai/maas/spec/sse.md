---
title: MaaS SSE
---

# MaaS SSE

## OpenAI streaming

- 第一个 chunk 通常只有 `role`，没有内容。
- 后续 chunk 通常有 `content`，没有 `role`。
- 最后的 chunk 里 `usage` 和 `finish_reason` 可能分开出现。
- 第一个 chunk 和最后一个 chunk 通常不应该包含正常 content。
- 有些供应商为了紧凑，会在第一个 chunk 包含内容。
- 有些供应商会在第二个 chunk 返回 `role`。

## stream_options

- `continuous_usage_stat`
  - 连续发送 usage。
- `include_usage`
  - 最后一个 chunk 包含 usage。

## first chunk

- 正常情况第一个 chunk 不应该包含内容。
- 兼容层需要容忍供应商在第一个 chunk 直接返回内容。

## last chunk

- vLLM、OpenAI 最后一个 chunk 的 `content` 可能为空字符串。

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

## abort

- stream 中断 / 499 仍可能产生费用。
- stream abort 时通常拿不到最终 usage。
- Agent / gateway 实现中断时需要预估 usage，否则 context window 和成本统计会失准。

## 参考

- <https://github.com/BerriAI/litellm/blob/4a8629ce/tests/local_testing/test_streaming.py>
- <https://github.com/BerriAI/litellm/issues/12417>
- <https://github.com/vercel/ai/issues/7628>
