---
title: 推理
---

# 推理

- [Inference Awesome](./inference-awesome.md)

---

- 模型大小与架构 (Model Size & Architecture)
  - 参数量
  - 模型的层数、宽度等
- 精度与量化 (Precision & Quantization)
  - 原始精度 - FP32, BF16
  - 量化精度 - FP16、INT8、INT4、q4_k_m
- 上下文长度/序列长度 Context Length
  - 影响激活值
  - 影响KV缓存
- 输入输出特性
  - 文本、图片、音频
- 缓存
- 加速方案

---

| metric      | stand for             | meaning                    |
| ----------- | --------------------- | -------------------------- |
| TTFT        | Time to First Token   | 首个Token延迟              |
| TPOT        | Time Per Output Token | 每输出Token延迟            |
| IPS         | Inferences Per Second | 每秒推理次数               |
| TPS         | Tokens Per Second     | 每秒生成Token数            |
| PTS         | Prefill Tokens/Second | Prefill阶段每秒处理Token数 |
| PTT         | Prefill Total Time    | Prefill总耗时              |
| DTT         | Decode Total Time     | Decode总耗时               |
| KV Cache    | KV Cache Usage        | KV缓存使用量               |
| KV Hit      |
| RPS         | Requests Per Second   | 每秒请求数                 |
| QPS         | Queries Per Second    | 每秒查询数                 |
| CCU         | Concurrent Users      | 并发用户数                 |
| ITL         | Input Token Length    | 输入Token长度              |
| OTL         | Output Token Length   | 输出Token长度              |
| P50/P95/P99 | Percentile Latency    | 百分位延迟                 |
| GPU Util    | GPU Utilization       | GPU利用率                  |
| Memory      | Memory Usage          | 内存使用量                 |
| E2E Latency |
| TkPS        |

- 延迟
  - 单次推理延迟
  - 首个Token延迟 (Time to First Token, TTFT - LLM)
  - 每输出Token延迟 (Time Per Output Token, TPOT - LLM)
- 吞吐量 (Throughput)
  - 每秒推理次数 - inferences per second, IPS
  - 每秒生成Token数 - tokens per second, TPS
- 准确性 (Accuracy)
  - 优化（如量化、剪枝）后，模型在新数据上的表现是否仍在可接受范围内。
  - 需要在性能和精度之间做权衡。

## 模型大小 {#model-size}

| size | int8   | int4     | perf                                                                         |
| ---- | ------ | -------- | ---------------------------------------------------------------------------- |
| 1B   | ~2-3GB | ~1-1.5GB | 适用于简单任务，如基础问答、文本分类，但易出现无意义输出，复杂任务表现不佳。 |
| 3B   | ~6-9GB | ~3-4.5GB | 能处理中等复杂度任务，如简单对话、文本摘要，性能适中，但仍有限制。           |
| 7B   | ~14GB  | ~7GB     | 在大多数NLP任务上表现良好，如机器翻译、情感分析，性能与资源消耗较平衡。      |
| 13B  | ~26GB  | ~13GB    | 具备较高准确性和生成质量，适合专业领域应用，如法律、金融等。                 |
| 30B  | ~60GB  | ~30GB    | 可处理复杂任务，如多轮对话、代码生成，性能接近人类水平。                     |
| 65B  | ~130GB | ~65GB    | 顶级模型，适用于前沿研究和高端应用，具备极强的语言理解和生成能力。           |
