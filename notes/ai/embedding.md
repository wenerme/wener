---
title: Embedding
---

# Embedding

- Embedding 是将文本转换为向量的过程，通常用于自然语言处理（NLP）任务。
- 评测：
  - 语义相似度评测：通过计算文本对之间的相似度来评估模型的性能。
  - 任务性能评测：在特定任务（如文本分类、情感分析等）上评估模型的表现。
  - 速度和效率评测：评估模型在处理速度和资源消耗方面的表现。
  - 可解释性评测：评估模型的可解释性和透明度。
- 评测集
  - MTEB - Massive Text Embedding Benchmark
    - https://github.com/embeddings-benchmark/mteb
    - https://huggingface.co/spaces/mteb/leaderboard
    - https://huggingface.co/blog/mteb
  - MIEB - Multilingual Embedding Benchmark
  - C-MTEB - Chinese MTEB
- https://ollama.com/search?c=embedding
- https://github.com/ibm-granite/granite-3.1-language-models
- 中文Embedding模型优劣数据评测分析报告 https://zhuanlan.zhihu.com/p/679166797
- https://github.com/JovenChu/embedding_model_test
- Cosine Similarity（余弦相似度）
  - 0.8 到 1.0：表示语义极为相似甚至几乎相同的内容。
  - 0.7 到 0.8：相似度较高，通常已足够认为两段文本具有强相关性。
  - 0.5 到 0.7：中等相似度，语义相关性存在但不强烈。
  - 低于 0.5：相关性弱，通常不会被认为是高质量的相似文本。
  - 常见
    - 文档检索或语义搜索场景，常用的阈值一般设在 0.7-0.8 左右。
    - 关注召回率（Recall），可以放宽到 0.6 左右
    - 关注精确度（Precision），通常设定在 0.8 或更高。
- 模型合集
  - [google/siglip](https://huggingface.co/collections/google/siglip-659d5e62f0ae1a57ae0e83ba)
    - google/siglip-so400m-patch14-384
  - [Alibaba-NLP/gte-models](https://huggingface.co/collections/Alibaba-NLP/gte-models-6680f0b13f885cb431e6d469)
- 参考
  - https://huggingface.co/spaces/hesamation/primer-llm-embedding

# GET

- GTE - Generalized Text Embedding - 通用文本嵌入
- 参考
  - [GTE models](https://huggingface.co/collections/Alibaba-NLP/gte-models-6680f0b13f885cb431e6d469)
