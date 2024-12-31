---
title: BERT
---

# BERT

- BERT - Bidirectional Encoder Representations from Transformers
  - by Google
- [AnswerDotAI/ModernBERT](https://github.com/AnswerDotAI/ModernBERT)
  - Apache-2.0, Python
  - 2024年
  - transformers v4.48.0+
  - https://huggingface.co/answerdotai/ModernBERT-base
  - base 22 layers, 139M 参数
  - large 28 layers, 395M 参数
  - [ModernBERT](https://huggingface.co/blog/modernbert) Finally, a Replacement for BERT
    - 2024-12-19
  - vs Bert
    - sequence length 512 -> 8192
    - RoPE 旋转位置嵌入 支持长上下文、局部-全局交替注意力机制提高长序列处理效率、Unpadding 和 Flash Attention 技术提升推理效率
    - GeGLU 激活函数替代原始的 MLP 层以提升性能
- ERNIE
  - https://huggingface.co/docs/transformers/en/model_doc/ernie
  - [PaddlePaddle/PaddleNLP](https://github.com/PaddlePaddle/PaddleNLP)
  - by 百度
- [urchade/GLiNER](https://github.com/urchade/GLiNER)
  - Apache-2.0, Python
  - Generalist and Lightweight Model for Named Entity Recognition
- [DeBERTaV3](https://huggingface.co/microsoft/deberta-v3-large) Improving DeBERTa using ELECTRA-Style Pre-Training with Gradient-Disentangled Embedding Sharing
  - 2021年
- [google-bert/bert-base-chinese](https://huggingface.co/google-bert/bert-base-chinese)
  - 2021年
- https://sbert.net/
  - Sentence Transformers (a.k.a. SBERT)
  - text/image -> fixed-size vector representation (embedding)
  - semantic textual similarity, semantic search, clustering, classification, paraphrase mining
- MTEB
  - https://huggingface.co/spaces/mteb/leaderboard
- Cross-Encoder (a.k.a. reranker)
  - re-rank top-k candidates from bi-encoder

| abbr.  | stand for                                               | meaning          |
| ------ | ------------------------------------------------------- | ---------------- |
| BERT   | Bidirectional Encoder Representations from Transformers |
| SBERT  | Sentence Transformers                                   |
| MTEB   | Massive Text Embeddings Benchmark                       |
| NER    | Named Entity Recognition                                | 命名实体识别     |
| BIO    | Begin, Inside, Outside                                  | for NER          |
| IOB    | Inside, Outside, Begin                                  | for NER          |
| BILOU  | Begin, Inside, Last, Outside, Unit                      | for NER          |
| IR     | Information Retrieval                                   | 信息检索         |
| DPR    | Dense Passage Retrieval                                 | 密集检索         |
| MLDRID | in-domain (fine-tuned on the training set) evaluation   |
| BEIR   | Benchmarking Efficient Information Retrieval            | 高效信息检索基准 |
| OOD    | Out-of-Domain                                           | 外部领域         |
| NLU    | Natural Language Understanding                          | 自然语言理解     |
| GLUE   | General Language Understanding Evaluation               | 通用语言理解评估 |
| CSN    | Code Search Net                                         | 代码搜索网络     |
| SQA    | StackQA                                                 | 栈问答           |
| BM25   | Best Matching 25                                        | 最佳匹配25       |
| MLTD   | Multi-Label Text Discrimination                         | 多标签文本判别   |

## BIO

- BIO - Begin, Inside, Outside
  - 用于命名实体识别（NER）任务
  - 三种标记
    - B - Begin
    - I - Inside
    - O - Outside
- 参考
  - [Inside–outside–beginning (tagging)](<https://en.wikipedia.org/wiki/Inside%E2%80%93outside%E2%80%93beginning_(tagging)>)

```json
{
  "text": "今天天气真好",
  "entities": [
    { "start": 0, "end": 2, "label": "B-DATE" },
    { "start": 2, "end": 4, "label": "I-DATE" },
    { "start": 4, "end": 6, "label": "I-DATE" },
    { "start": 6, "end": 8, "label": "O" }
  ]
}
```
