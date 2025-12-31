---
title: Workers AI
tags:
  - Platform
  - Cloudflare
  - AI
  - Workers
---

# Workers AI

- [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)
  - Serverless GPU 推理服务
  - 50+ 开源模型
  - 支持 Workers、Pages、REST API 调用
- 参考
  - [Playground](https://playground.ai.cloudflare.com/) - 在线测试
  - [Models](https://developers.cloudflare.com/workers-ai/models/) - 模型列表
  - [REST API](https://developers.cloudflare.com/api/resources/ai/methods/run/)

## 定价

- 免费额度: 每天 10,000 神经元 (00:00 UTC 重置)
- 付费: $0.011 / 1,000 神经元
- 神经元 = GPU 计算单位，不同模型消耗不同

## 快速开始

### Workers 方式

```bash
# 创建项目
npm create cloudflare@latest -- hello-ai
# 选择 "Hello World example" + TypeScript
```

**wrangler.jsonc**

```jsonc
{
  "ai": {
    "binding": "AI",
  },
}
```

**src/index.ts**

```ts
export default {
  async fetch(request, env): Promise<Response> {
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      prompt: 'What is the origin of the phrase Hello, World',
    });
    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

```bash
npx wrangler dev    # 本地开发
npx wrangler deploy # 部署
```

### REST API 方式

```bash
# 获取 API Token 和 Account ID: https://dash.cloudflare.com/

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -d '{ "prompt": "Hello" }'
```

## 模型分类

| 类型           | 模型示例                                     |
| -------------- | -------------------------------------------- |
| Text LLM       | Llama 3.1/3.2/4, Qwen3, Mistral, DeepSeek R1 |
| Text-to-Image  | FLUX.1, Stable Diffusion XL                  |
| Speech-to-Text | Whisper, Deepgram Nova-3                     |
| Text-to-Speech | Deepgram Aura, MeloTTS                       |
| Embeddings     | BGE, EmbeddingGemma, Qwen3-Embedding         |
| Multimodal     | Llama 3.2-Vision, Gemma-3                    |
| Translation    | M2M100, IndicTrans2                          |
| Classification | Distilbert, BGE-Reranker                     |
| Object Detect  | DETR-ResNet-50                               |

- 部分模型支持 LoRA 微调、批量处理、函数调用
