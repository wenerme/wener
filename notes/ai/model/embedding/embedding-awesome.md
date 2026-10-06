---
title: Embedding 与 Reranker Awesome
tags:
  - Model
  - Embedding
  - Reranker
  - RAG
  - Awesome
---

# Embedding 与 Reranker Awesome

文本、视觉向量模型和 Cross-Encoder Reranker 资源索引。

## Models

| model | size/B | dim | context | notes |
| --- | --- | --- | --- | --- |
| text-embedding-3-small | - | 1536 | 8191 | OpenAI、MRL |
| text-embedding-3-large | - | 3072 | 8191 | OpenAI、MRL |
| bge-m3 | 0.57 | 1024 | 8192 | Multi-function |
| Qwen3-Embedding | 0.6 / 4 / 8 | 1024 / 2560 / 4096 | 32768 | MRL、Instruction |
| Qwen3-Reranker | 0.6 / 4 / 8 | - | 32768 | Cross-encoder |
| Qwen3-VL-Embedding | 2 / 8 | 2048 / 4096 | 32768 | MRL、Instruction、Image |
| Qwen3-VL-Reranker | 2 / 8 | - | 32768 | Multimodal |

## Resources

- [Qwen3-Embedding](https://github.com/QwenLM/Qwen3-Embedding)
  - 1024-4096 维、32K、MRL、Instruction。
- [Qwen3-VL-Embedding](https://github.com/QwenLM/Qwen3-VL-Embedding)
  - 多模态 Embedding / Reranker；llama.cpp 支持状态需要单独确认。
- [Hugging Face Text Embeddings Inference](https://github.com/huggingface/text-embeddings-inference)
- [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
- pgvector 类型限制：
  - `vector`：最多 2,000 维。
  - `halfvec`：最多 4,000 维。
  - `bit`：最多 64,000 位。
  - `sparsevec`：最多 1,000 个非零元素。

## 选型关注点

- 语种、领域和查询/文档长度。
- Dense、Sparse、Late Interaction 或 Cross-Encoder 架构。
- 向量维度、MRL 截断能力、索引大小和检索延迟。
- Recall@k、nDCG、MRR、rerank 增益与业务数据集表现。
- 多模态对齐、增量更新、量化和部署 runtime。
