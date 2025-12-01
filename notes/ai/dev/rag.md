---
title: RAG
---

# RAG

:::tips

- chunk 一般选择 512, 256, 192
- overlap 25-128

:::

- RAG - Retrieval-Augmented Generation - 检索增强生成
- 检索优化 (Advanced Retrieval) - “如何找得更准？”
  - 混合搜索 (Hybrid Search)
    - Embeding + BM25, Keyword
  - 重排 (Reranking)
    - 对文档进行二次打分和排序
  - 查询转换 (Query Transformations)
    - 先用 LLM 对问题本身进行“加工”
    - 查询重写 (Query Rewriting)：将口语化的、模糊的问题，改写成更适合检索的、包含关键词的精准问题。
    - 子问题生成 (Sub-Query Generation)：将一个复杂问题分解成多个独立的子问题，分别进行检索，然后汇总结果。
    - 假设性文档嵌入 (HyDE)：让 LLM 先“幻想”出一个最可能回答这个问题的“理想文档”，然后用这个幻想出的文档的向量去做检索。
- 索引与数据处理 (Advanced Indexing & Chunking) - “如何存得更好？”
  - 智能分块 (Intelligent Chunking)
    - 语义分块 (Semantic Chunking)
  - 多向量检索 (Multi-Vector Retrieval)
    - 生成多个不同角度的向量
  - 层级式索引 (Hierarchical Indices)
    - 摘要 -> 全文
- 生成阶段增强 (Augmented Generation) - “如何答得更好？”
  - 上下文压缩 (Context Compression)
    - 解决 LLM 长上下文“中间遗忘 (lost in the middle)”的问题
  - 自我修正/反思循环 (Self-Correction / Reflection Loops)
    - 智能体工作流 (Agentic Workflow)
    - 提升 事实准确性 (Faithfulness) 和可靠性
- 评估与可观测性 (Evaluation & Observability) - “如何知道好不好？”
  - 自动化评估框架
    - Faithfulness (忠实度)：答案是否完全基于所提供的上下文。
    - Answer Relevancy (答案相关性)：答案是否直接回应了用户的问题。
    - Context Precision / Recall (上下文精确率/召回率)：检索到的上下文是否相关？是否包含了所有必要的答案信息？
  - LLM-as-a-Judge
- 评估框架
  - RAGAs, ARES, TruLens
- On-Device RAG - 端侧 RAG

## Awesome

- [chonkie-inc/chonkie](https://github.com/chonkie-inc/chonkie)
  - MIT, Python
  - RAG chunking library
- [yichuan-w/LEANN](https://github.com/yichuan-w/LEANN)
  - MIT, Python
  - vector database, graph-based selective recomputation, high-degree preserving pruning, CSR/Compressed Sparse Row
  - 内置了对 PDF, Markdown, 微信/iMessage 聊天记录、浏览器历史的解析

## Datasource

- iMessage - ~/Library/Messages/chat.db
  - TCC, Transparency, Consent, and Control
  - 系统设置 -> 隐私与安全性 -> 完全磁盘访问权限
- 微信
  - `~/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/[UserHash]/Message/msg_[Hash].db`
  - SQLCipher3
  - 内存提取 frida/pymem/lldb
  - 工具导出
