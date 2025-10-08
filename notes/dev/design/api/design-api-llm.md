---
tags:
  - Design
---

# AI LLM API

- 场景
  - ~~补全~~
  - 对话
  - 代码生成
  - Agentic / Coding Agent
- 标准
  - OpenAI API
    - 大多数早期应用，事实标准
    - Codex - 使用量少
  - Anthropic API
    - Claude Code - 非常核心的应用场景
  - Gemini API
    - Gemini CLI - 场景越来越多，主要是开源驱动

**功能**

- 输入
  - 对话管理
  - Batch
  - 缓存管理 - 成本考虑核心，特别是 代码生成 场景
  - WebSearch
  - Assistant
  - Image
  - File/Workspace
- 过程
  - Computer Use
  - MCP
  - 工具/Tool
  - Code Interpreter
  - Reasoning
- 输出
  - Streaming
  - JSON & JSON Schema / 结构化输出
  - Sampling
    - seed
    - temperature
    - top_p
    - top_k
    - top_logprobs
    - presence_penalty
    - frequency_penalty
    - max_completions_tokens

:::tip

- 第一阶段
  - 只需要直接往后生成
  - /v1/completions
- 第二阶段
  - 对话
  - 客户端同步管理对话状态和上下文
  - /v1/chat/completions
- 第三阶段
  - Workflow
  - 复杂对话场景
  - 交互式对话、工具调用、外部集成
  - 服务端管理对话状态
  - 服务端异步处理对话
  - 服务端精细化缓存控制
  - 有状态
  - /v1/responses
- 第四阶段 - 个人猜测
  - Workspace & Context
  - LSP
  - Dynamic MCP

:::

- https://platform.openai.com/docs/api-reference/introduction
  - /v1/responses
  - [/v1/chat/completions](https://platform.openai.com/docs/api-reference/chat/create)
  - /v1/completions
- https://docs.anthropic.com/en/api/messages
  - /v1/messages
  - for [anthropics/claude-code](https://github.com/anthropics/claude-code)
- Gemini API https://ai.google.dev/api
  - for [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
- Vertex AI API https://cloud.google.com/vertex-ai/docs/reference/rest
- https://openrouter.ai/docs/api-reference/overview
  - /v1/chat/completions
- https://docs.bigmodel.cn/api-reference
  - OpenAI https://open.bigmodel.cn/api/paas/v4/
  - Anthropic https://open.bigmodel.cn/api/anthropic
- [vercel/ai](https://github.com/vercel/ai)
- https://www.postman.com/ai-engineer/generative-ai-apis/documentation/lqv1fm6/anthropic-api

## Endpoints

- OpenAI
  - /chat/completions
  - /completions
- Anthropic
  - /v1/messages

## Response

## BatchAPI

- 平台 “填谷” 策略
- 提高 GPU 利用率
- 价格折扣
- 新应用场景
- 参考
  - https://docs.together.ai/docs/batch-inference

## Mock

- https://exampleopenaiendpoint-production.up.railway.app/
- https://openai-function-calling-workers.tasslexyz.workers.dev/

# FAQ

## /v1/completions vs /v1/chat/completions vs /v1/responses

- /v1/chat/completions
  - messages
- /v1/completions
  - **已弃用** 不推荐在新项目中使用
  - prompt
- /v1/responses
- /v1/conversations
  - 对话管理

# Limits

- https://deepinfra.com/docs/advanced/rate-limits

## Anthropic

| 类别     | 项目                              | 限制                                     | 触发条件/备注                  |
| -------- | --------------------------------- | ---------------------------------------- | ------------------------------ |
| 请求大小 | Messages API / Token Counting API | 32 MB                                    | 超过返回 413 request_too_large |
| 请求大小 | Batch API                         | 256 MB 或 100,000 Message 请求（先达者） | 批量异步                       |
| 文件     | Files API（单文件）               | 500 MB                                   | 仅文件上传                     |
| 图像尺寸 | 单张图像（Vision）                | 最大 8000 × 8000 像素                    | 仍受 32 MB 请求总大小约束      |
| 图像尺寸 | 多张图（>20 张提交）              | 每张最大 2000 × 2000 像素                | 适用于一次提交大量图像         |
| 图像大小 | 单张文件大小                      | 5 MB                                     | 超过需压缩/裁剪                |
| 图像数量 | claude.ai 前端                    | 最多 20 张                               | 交互界面                       |
| 图像数量 | API                               | 最多 100 张                              | 编程调用                       |
| 统一说明 | 请求总体                          | 图像+文本合计不得超 32 MB                | 超限需拆分                     |

注意：图像限制同时受单图尺寸、单图文件大小与整体请求 32 MB 约束。超过任一限制返回 413 request_too_large。

## OpenAI

**组织级**

| 维度   | 项目 / 场景                       | 限制       | 说明                                 |
| ------ | --------------------------------- | ---------- | ------------------------------------ |
| 存储   | 组织总文件体积                    | 100 GB     | 可申请提升；与 Assistants / 前端共享 |
| 存储   | 单用户总文件体积                  | 10 GB      | ChatGPT / GPTs 前端                  |
| 请求   | 常见单请求载荷                    | 约 25 MB   | 超限触发 413 / Maximum content size  |
| 上下文 | （隐含）受模型上下文 / token 规则 | 视模型而定 | 大文件需分块 / 检索式拼接            |

**功能与资源级**

| 分类         | 项目 / 场景               | 限制                     | 说明 / 关键点          |
| ------------ | ------------------------- | ------------------------ | ---------------------- |
| Assistants   | code_interpreter 附件数   | 20 个                    | 运行临时文件           |
| Assistants   | file_search 向量库文件数  | 10,000 个                | Vector Store 总数      |
| Assistants   | 单文件大小                | 512 MB                   | 仍受 tokens 限制       |
| Assistants   | 单文件最大 tokens         | 5,000,000 tokens         | 预处理后计数           |
| Batch API    | 单批输入文件大小          | 100 MB                   |                        |
| Batch API    | 单批请求数                | 50,000                   | 异步执行               |
| Batch API    | /v1/embeddings 批次总输入 | 50,000 条                | 与 embeddings 规则一致 |
| Embeddings   | 单批全部输入              | 50,000 条                | 需分批控制             |
| 图像生成     | dall-e-2                  | PNG < 4 MB               | 通常方形               |
| 图像生成     | gpt-image-1               | PNG / WebP / JPG < 25 MB |                        |
| 音频         | Audio API 输入文件        | 25 MB                    | 转写 / 语音处理        |
| 语音合成     | TTS 文本输入              | 4096 字符                | 按字符计               |
| ChatGPT 前端 | 通用文件（单文件）        | 512 MB                   | 与 Assistants 对齐     |
| ChatGPT 前端 | 文本/文档 tokens          | 2,000,000 tokens         | 表格类除外             |
| ChatGPT 前端 | CSV / 表格文件            | 约 50 MB                 | 取决列/行结构          |
| ChatGPT 前端 | 单张图像                  | 20 MB                    |                        |

---

- 错误风险
  - 413 / content size
  - Token 超限
- 优化建议
  - 大文件处理 - 分块 + embeddings 检索 - 避免整块发送
  - 预处理 - 统计 token - 防止超限浪费
  - 文件策略 - 结构化→解析→向量库 - 不直接塞原始大文本
  - 监控 - 记录大小 / token / 批次命中率 - 提升成本效率

---

- 参考
  - https://platform.openai.com/docs/api-reference/introduction
    - OpenAI 的限制散落在 API 文档里
  - https://docs.anthropic.com/en/api/overview#request-size-limits
  - Azure AI Foundry Quotas & Limits https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits

## Aliyun

**Aliyun/Bailian/Aibabacloud**

| item                                    |            limit |
| --------------------------------------- | ---------------: |
| QWen-VL, QVQ, QWen-Omini datauri/base64 |            10 MB |
| QWen-VL, QVQ, QWen-Omini image          |            20 MB |
| Qwen2.5-VL video                        |             1 GB |
| QVQ, QWen-Omini video                   |           150 MB |
| document                                |           150 MB |
| batch file                              |           500 MB |
| CosyVoice Voice Cloning audio           | > 16 kHz , 10 MB |
| video                                   |           200 MB |
| audio                                   |            15 MB |
| image                                   |             5 MB |

---

- Exceeded limit on max bytes per data-uri item
  - aliyun datauri 限制 10MB
- String value length exceeds the maximum allowed (20000000, from `StreamReadConstraints.getMaxStringLength()`)
  - string 字段不能超过 20MB 限制
  - java jackson streaming 默认限制
  - 2.15 之前是 5MB

---

- https://www.alibabacloud.com/help/en/model-studio/error-code
