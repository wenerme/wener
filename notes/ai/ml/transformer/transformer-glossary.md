---
tags:
  - Glossary
---

# Transformer Glossary

## 静态-动态-连续批处理 {#static-dynamic-continuous-batching}

- 参考
  - https://bentoml.com/llm/inference-optimization/static-dynamic-continuous-batching

## 推测解码 {#speculative-decoding}

- 在不牺牲任何输出质量的前提下，降低 LLM 推理的延迟。
- 用一个小的、快的“草稿模型”大胆预测，再由大的、准的“权威模型”一次性并行验证。
- 如果草稿模型的预测大部分是正确的，那么系统就用一次大模型计算的成本，成功生成了多个 Token），从而加快速度。
- 草稿模型 (Draft Model)
- 权威模型 (Oracle Model)
- 参考
  - https://bentoml.com/llm/inference-optimization/speculative-decoding

## 预填充 {#prefill}

- Prefill
- 特点
  - 并行度高
  - 计算密集型
  - 批处理友好
- 生成并填充初始的 KV 缓存

## 解码 {#decode}

- Decode / 解码 / 逐词生成
- 自回归地（Auto-regressive）逐个生成新的 Token。
- 特点
  - 串行度高: 必须生成第 N 个 Token 后，才能将其作为输入来生成第 N+1 个 Token。这是一个严格的顺序过程。
  - 内存带宽密集型 (Memory-Bound): 每生成一个新 Token，都需要从 GPU 显存中读取整个越来越大的 KV 缓存。这个过程的瓶颈不再是计算，而是 GPU 显存的读写速度。
  - 计算量小: 单个 Token 的生成计算量远小于 Prefill 阶段。

## PD 分离

- Prefill-decode disaggregation / PD 分离 / 预填充-解码分离
  - 将预填充和解码过程分开，以提高效率和灵活性。
  - 关键： KV 缓存传递
  - Prefill Pool & Decode Pool
- 优势
  - 提高系统吞吐量
  - 优化资源利用率和成本
  - 降低延迟并提高服务质量 (QoS)
    - 影响 TTFT，但能提高 TPOT
  - 架构灵活性和解耦
    - Prefill 和 Decode 服务可以作为独立的微服务进行部署、管理和升级，系统架构更加清晰和健壮。
- 计算密集 <-> 内存密集
  - 资源不匹配
  - 队头阻塞 (Head-of-Line Blocking)
- 参考
  - https://bentoml.com/llm/inference-optimization/prefill-decode-disaggregation
  - https://arxiv.org/abs/2401.09670
  - https://arxiv.org/abs/2308.16369
    - “捎带”效应 (Piggybacking)

## 前缀缓存 {#prefix-caching}

- Prefix caching - 前缀缓存
- Prompt caching - 提示缓存
- Context caching - 上下文缓存
- 优势
  - 降低 TTFT
- 参考
  - https://bentoml.com/llm/inference-optimization/prefix-caching

## 前缀感知路由 {#prefix-aware-routing}

- Prefix-aware routing
- 参考
  - https://bentoml.com/llm/inference-optimization/prefix-aware-routing

## KV 缓存利用率感知负载均衡 {#kv-cache-utilization-aware-load-balancing}

- KV cache utilization-aware load balancing
- 参考
  - https://bentoml.com/llm/inference-optimization/kv-cache-utilization-aware-load-balancing

## KV 缓存卸载 {#kv-cache-offloading}

- KV cache offloading
- 参考
  - https://bentoml.com/llm/inference-optimization/kv-cache-offloading

## 数据张量管道专家混合并行 {#data-tensor-pipeline-expert-hybrid-parallelism}

- 参考
  - https://bentoml.com/llm/inference-optimization/data-tensor-pipeline-expert-hybrid-parallelism

## 离线批处理推理 {#offline-batch-inference}

- 参考
  - https://bentoml.com/llm/inference-optimization/offline-batch-inference
