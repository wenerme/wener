---
title: MaaS Spec FAQ
---
tags:
  - FAQ
---

# MaaS Spec FAQ

## 常见 Provider

- Google Generative AI API / Gemini API
- Google Vertex AI
- Anthropic
- OpenAI
- xAI
- vLLM / OpenAI compatible servers

## 错误码

- Google Vertex AI
  - <https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/api-errors>
- Anthropic
  - <https://platform.claude.com/docs/en/api/errors>
- OpenAI
  - <https://platform.openai.com/docs/guides/error-codes>
- 华为云 MaaS ModelArts
  - <https://support.huaweicloud.com/usermanual-maas-modelarts/maas-modelarts-0080.html>

## role 差异

| role | OpenAI | Anthropic |
| --- | --- | --- |
| `developer` | 支持 | 通常需要映射到 system / instruction |
| `system` | 支持 | 支持 system 参数/块 |
| `user` | 支持 | 支持 |
| `assistant` | 支持 | 支持 |
| `tool` | 新版工具结果 role | 通常使用 user role tool result block |
| `function` | 旧版 function calling | 不使用 |

## Thinking / Reasoning

- Interleaved thinking
  - 思考过程可以进行 tool call。
  - Claude 4+ 支持，Messages API 才支持。
  - MiniMax-M2、Kimi-K2-Thinking 等模型也有类似能力。
- Preserved thinking
  - 智普 GLM 4.7 支持保留思考内容。
  - 再生成 chat template 时允许传递之前的思考内容。
  - 默认不保持：`clear_thinking: true`。
  - <https://huggingface.co/zai-org/GLM-4.7/blob/main/chat_template.jinja>

## Reasoning details

- `reasoning.summary`
- `reasoning.encrypted`
- `reasoning.text`

相关参考：

- <https://openrouter.ai/docs/guides/best-practices/reasoning-tokens>
- <https://docs.vllm.ai/en/latest/features/interleaved_thinking/>
- <https://docs.bigmodel.cn/cn/guide/capabilities/thinking-mode>

## API 行为兼容注意

- Streaming chunk 结构、usage 时机、finish reason 位置存在供应商差异。
- Tool call schema、tool choice、tool result role 存在供应商差异。
- Prompt cache 最小 token、TTL、折扣和 usage 字段存在供应商差异。
- Abort / timeout 时 usage 可能不可得，但请求仍可能产生费用。
