---
title: Embedding
---

# Embedding


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
