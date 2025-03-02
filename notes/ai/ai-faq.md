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
    - 例如 FP32,FP16 -> INT8 [-128, 127], INT4 [-8, 7], BIT1.5, FP16, BF16
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

| size |   FP32 1 |   int8 |   int4 | perf                                                                         |
| ---- | -------: | -----: | -----: | ---------------------------------------------------------------------------- |
| 1B   |   ~4-6GB | ~2-3GB | ~1-2GB | 适用于简单任务，如基础问答、文本分类，但易出现无意义输出，复杂任务表现不佳。 |
| 3B   | ~12-18GB | ~6-9GB | ~3-4GB | 能处理中等复杂度任务，如简单对话、文本摘要，性能适中，但仍有限制。           |
| 7B   |    ~28GB |  ~14GB |   ~7GB | 在大多数NLP任务上表现良好，如机器翻译、情感分析，性能与资源消耗较平衡。      |
| 13B  |    ~52GB |  ~26GB |  ~13GB | 具备较高准确性和生成质量，适合专业领域应用，如法律、金融等。                 |
| 30B  |   ~120GB |  ~60GB |  ~30GB | 可处理复杂任务，如多轮对话、代码生成，性能接近人类水平。                     |
| 65B  |   ~260GB | ~130GB |  ~65GB | 顶级模型，适用于前沿研究和高端应用，具备极强的语言理解和生成能力。           |

## Train

- Train Your Own O1 Preview Model Within $450
  - https://news.ycombinator.com/item?id=43125430

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
