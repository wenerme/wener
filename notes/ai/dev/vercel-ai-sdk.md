---
title: Vercel AI SDK
---

# AI SDK

- [vercel/ai](https://github.com/vercel/ai)
  - Apache-2.0, TS
- 参考
  - 如何设计持久化存储 https://github.com/vercel/ai/discussions/4845
  - https://github.com/midday-ai/ai-sdk-tools
  - 很多生态都支持 AI SDK Language Model: volagent, mantra, opencode

## Notes

- Provider 模型抽象
- LanguageModel
  - doGenerate
  - doStream
- EmbeddingsModel
  - doEmbed
- ImageModel
  - doGenerate
- TranscriptionModel
  - doTranscribe
- SpeechModel
  - doGenerate
- RerankingModel
  - doRerank
