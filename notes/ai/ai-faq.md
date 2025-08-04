---
tags:
  - FAQ
---

# AI FAQ

## 降低成本

- 模型交付
  - 量化 - Quantization
    - 降低精度
    - 减少内存占用和计算需求
  - 蒸馏 - Distillation
    - 将大型模型的知识转移到较小的模型中，实现性能接近的同时降低计算成本。
    - 例如 Teacher-Student
  - 剪枝 - Pruning
    - 去除冗余参数
    - 例如 L1, L2, FPGM, Taylor
- 推理
  - Flash Attention
    - 减少内存占用和计算需求
  - KV缓存 - KV Cache
    - 减少计算需求
- 训练 - Training
- MoE - Mixture of Experts
  - 减少内存和计算需求

## AI vs ML vs DL

- AI > ML > DL

---

- AI: Artificial Intelligence - 人工智能
  - 强调应用
  - 规则系统
  - 专家系统
  - 机器学习
- ML: Machine Learning - 机器学习
  - 强调学习过程 - Data -> Model -> Prediction
  - ML 是实现 AI 的方式之一
- DL: Deep Learning - 深度学习
  - DL 是实现 ML 的方式之一
- Algorithms
  - 通用的概念

## RAG

- RAQ - retrieval-augmented generation - 检索增强生成
- 参考
  - https://research.ibm.com/blog/retrieval-augmented-generation-RAG

## STT vs ASR

- STT: Speech to Text - 语音转文本
  - 产品功能描述
- ASR: Automatic Speech Recognition - 自动语音识别
  - 技术

## Repair LLM JSON

- JSON.parse throw SyntaxError
- https://github.com/vercel/ai/blob/main/packages/ai/src/generate-object/generate-object.ts#L191-L195
- https://github.com/RealAlexandreAI/json-repair
