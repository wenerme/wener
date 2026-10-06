---
title: LLM Awesome
tags:
  - Model
  - LLM
  - Open Weights
  - Awesome
---

# LLM Awesome

## Open Weights / Transformer

| Date       | Model Series          | Size                                                                                                  | Context Window | Creator         | Notes                             |
| ---------- | --------------------- | ----------------------------------------------------------------------------------------------------- | -------------- | --------------- | --------------------------------- |
| 2026-04-07 | GLM 5.1               | 754B MoE                                                                                              | 200K           | Zhipu AI        | 大规模稀疏 MoE                    |
| 2026-04-02 | Gemma 4               | E2B / E4B / 26B / 31B                                                                                 | 128K-256K      | Google          | 原生多模态、MoE 变体              |
| 2026-03-12 | MiniMax 2.7           | 230B，10B active                                                                                      | 200K           | MiniMax         | Sparse MoE                        |
| 2026-02-16 | Qwen 3.5              | 0.8B-397B，17B active                                                                                 | 256K-1M        | Alibaba         | 模型家族、MoE                     |
| 2026-02-11 | GLM 5                 | 744B，40B active                                                                                      | 200K           | Zhipu AI        | Sparse MoE                        |
| 2025-12-23 | GLM 4.7               | 358B                                                                                                  |                | Zhipu           | MoE、文本、代码、多语言           |
| 2025-12-21 | DeepSeek V3.2         | 685B                                                                                                  |                | DeepSeek        |                                   |
| 2025-12-20 | MiniMax M2.1          | 228B                                                                                                  |                | MiniMaxAI       | 文本生成、对话                    |
| 2025-12-16 | MiMo-V2-Flash         | 310B                                                                                                  |                | Xiaomi          | 文本生成、对话                    |
| 2025-09-29 | DeepSeek-V3.2-Exp     | 685B                                                                                                  |                | DeepSeek        | 文本生成、对话                    |
| 2025-09-15 | Qwen3-Next            | 80B                                                                                                   |                | Alibaba         |                                   |
| 2025-08-20 | Seed-OSS-36B-Instruct | 36B                                                                                                   |                | ByteDance-Seed  | 文本生成、对话                    |
| 2025-08-06 | GPT OSS               | [20B](https://huggingface.co/openai/gpt-oss-20b) / [120B](https://huggingface.co/openai/gpt-oss-120b) | 128K           | OpenAI          | Reasoning、Tools                  |
| 2025-07-28 | GLM 4.5               | 355-32A / Air 106-12A                                                                                 | 128K           | Zhipu           | Reasoning、多语言                 |
| 2025-07-23 | Qwen3 2507            | 30B-A3B / 235B-A22B / Coder                                                                           | 256K / Yarn 1M | Alibaba         | Reasoning、Coding                 |
| 2025-07-11 | Kimi K2               | 1T-A32B                                                                                               | 128K           | Moonshot AI     | MoE                               |
| 2025-06-11 | Magistral             | Small 24B                                                                                             | 39K            | Mistral AI      | Reasoning、多语言                 |
| 2025-06-07 | Comma v0.1            | 7B                                                                                                    |                | EleutherAI      | Full OSS、English                 |
| 2025-06-05 | Qwen3-Embedding       | 0.6B / 4B / 8B                                                                                        | 32K            | Alibaba         | Embedding、Reranking、多语言      |
| 2025-04-29 | Qwen3                 | 0.6B-235B                                                                                             | 40K            | Alibaba         | MoE、Reasoning                    |
| 2025-04-05 | Llama 4               | Scout / Maverick                                                                                      | 1M / 10M       | Meta            | MoE、Vision                       |
| 2025-03-26 | Qwen2.5-Omni          | 3B / 7B                                                                                               |                | Alibaba         | Text、Audio、Image、Video、Speech |
| 2025-03-12 | Gemma 3               | 1B / 4B / 12B / 27B                                                                                   | 128K           | Google DeepMind | Vision                            |
| 2025-01-20 | DeepSeek R1           | 1.5B-671B                                                                                             | 128K           | DeepSeek AI     | Reasoning                         |
| 2024-12-07 | Llama 3.3             | 70B                                                                                                   | 128K           | Meta            |                                   |
| 2024-12    | Phi-4                 | 14B                                                                                                   | 128K           | Microsoft       | Reasoning、多模态                 |
| 2024-09-25 | Llama 3.2             | 1B / 3B / 11B / 90B                                                                                   | 128K           | Meta            |                                   |
| 2024-07-23 | Llama 3.1             | 8B / 70.6B / 405B                                                                                     | 128K           | Meta            |                                   |
| 2024-06-07 | Qwen2                 | 0.5B-72B                                                                                              | 32K-128K       | Alibaba         |                                   |
| 2024-04-23 | Phi-3                 | 3.8B / 7B / 14B                                                                                       | 4K / 128K      | Microsoft       |                                   |
| 2024-04-18 | Llama 3               | 8B / 70.6B                                                                                            | 8K / 128K      | Meta            |                                   |
| 2023-12-11 | Mistral               | 7B / 46.7B                                                                                            | 33K            | Mistral AI      | Dense / MoE                       |
| 2023-07-18 | Llama 2               | 7B / 13B / 70B                                                                                        | 4K             | Meta            |                                   |
| 2020-06-11 | GPT-3                 | 175B                                                                                                  | 2K             | OpenAI          |                                   |
| 2019-02-14 | GPT-2                 | 1.5B                                                                                                  | 1K             | OpenAI          |                                   |
| 2018-06-11 | GPT-1                 | 117M                                                                                                  | 512            | OpenAI          |                                   |

## Proprietary Models

| release    | model                          | output    | input price | author    | notes                |
| ---------- | ------------------------------ | --------- | ----------- | --------- | -------------------- |
| 2026-03-12 | MiniMax M2.7                   | $1.20/1M  | $0.30/1M    | MiniMax   | 205K、Sparse MoE API |
| 2026-02-11 | GLM 5                          | $2.30/1M  | $1.00/1M    | Zhipu AI  | 200K                 |
| 2025-06-17 | Gemini 2.5 Pro                 | $10.00/1M | $1.25/1M    | Google    | 1M                   |
| 2025-06    | Gemini 2.5 Flash               | $2.50/1M  | $0.30/1M    | Google    | Audio $1.00/1M       |
| 2025-05-22 | Claude 4 Opus                  | $15/1M    | $3/1M       | Anthropic | 200K                 |
| 2025-05-22 | Claude 4 Sonnet                | $75/1M    | $15/1M      | Anthropic | 200K                 |
| 2025-04-14 | GPT-4.1 / mini / nano          |           |             | OpenAI    |                      |
| 2025-03-25 | Gemini 2.0 Pro                 |           |             | Google    | 2M                   |
| 2025-01-10 | o3 / o3-mini                   |           |             | OpenAI    | Reasoning            |
| 2024-05-13 | GPT-4o                         |           |             | OpenAI    | Text、Audio、Image   |
| 2024-03-04 | Claude 3 Haiku / Sonnet / Opus |           |             | Anthropic | 200K                 |
| 2024-02-15 | Gemini 1.5 Pro                 |           |             | Google    | 1M context           |
| 2023-11-06 | GPT-4 Turbo / GPT-4V           |           |             | OpenAI    | 128K、Vision         |
| 2023-03-14 | GPT-4                          |           |             | OpenAI    | 8K / 32K、Image      |

## Architecture Notes

| date       | model         | parameters         | context | attention    | layers | experts               | data type    |
| ---------- | ------------- | ------------------ | ------- | ------------ | ------ | --------------------- | ------------ |
| 2025-08-05 | gpt-oss-120b  | 117B，5.1B active  | 128K    | GQA + Sparse | 36     | 128 / 4               | MXFP4 / bf16 |
| 2025-08-05 | gpt-oss-20b   | 21B，3.6B active   | 128K    | GQA + Sparse | 24     | 32 / 4                | MXFP4 / bf16 |
| 2025-05    | Qwen3-30B-A3B | 30.5B，3.3B active | 256K    | GQA          | 48     | 128 / 8               | bf16         |
| 2025-05    | Qwen3-32B     | 32.8B              | 128K    | GQA          | 64     | Dense                 | bf16         |
| 2024-12    | DeepSeek V3   | 671B，37B active   | 128K    | MLA          | 61     | 256 routed + 1 shared | fp8 / bf16   |
| 2019-02-14 | GPT-2 1.5B    | 1.542B             | 1024    | Multi-Head   | 48     | Dense                 | fp16         |

## 中文与开源生态

- [QwenLM/Qwen](https://github.com/QwenLM/Qwen)
- [deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)
  - MoE、GRPO、MLA、RL、MTP、FP8。
- [meta-llama](https://huggingface.co/meta-llama)
- [haotian-liu/LLaVA](https://github.com/haotian-liu/LLaVA)
  - Vicuna + CLIP 的视觉语言助手。
- [ymcui/Chinese-LLaMA-Alpaca](https://github.com/ymcui/Chinese-LLaMA-Alpaca)
- [FlagAI-Open/FlagAI](https://github.com/FlagAI-Open/FlagAI)
- [BlinkDL/ChatRWKV](https://github.com/BlinkDL/ChatRWKV)
  - ChatGPT-like，RWKV RNN 架构。
- [databricks/dolly-v2-12b](https://huggingface.co/databricks/dolly-v2-12b)
- [togethercomputer/OpenChatKit](https://github.com/togethercomputer/OpenChatKit)
- [Alpaca](../alpaca.md)
- [ggml-org/ggml](https://github.com/ggml-org/ggml)
  - C/C++ 推理和张量计算生态。

## Abliterated

- UGI - Uncensored General Intelligence。
- Norm-Preserving Biprojected Abliteration。
- [Abliteration 介绍](https://huggingface.co/blog/mlabonne/abliteration)
- [UGI Leaderboard](https://huggingface.co/spaces/DontPlanToEnd/UGI-Leaderboard)
- [ArliAI](https://huggingface.co/ArliAI)
- [Sumandora/remove-refusals-with-transformers](https://github.com/Sumandora/remove-refusals-with-transformers)

## 推理、量化与内存

- 理想精度：`float16` / `bfloat16`，约 1B 参数占 2GB 权重内存。
- 常见 `int4` 量化约 1B 参数占 0.5GB，实际还要加 KV cache、运行时和临时 buffer。
- 小 context window 适合 RAG；上下文越长，KV cache 和显存需求越高。
- `Q4_0`、`Q4_1`、`Q4_K` 等量化格式需要结合质量、速度和 runtime 评估。
- 经验值：7B 约 8GB、13B 约 16GB、70B 约 32-48GB，实际取决于精度和上下文。
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Hugging Face Models](https://huggingface.co/models)
- [ModelScope Models](https://www.modelscope.cn/models)
- [Ollama Library](https://ollama.com/library)

## Leaderboard 与评估

- [Open LLM Leaderboard](https://huggingface.co/open-llm-leaderboard)
- [LM Arena](https://lmarena.ai/)
- [LiveBench](https://livebench.ai/)
- [OpenRouter Rankings](https://openrouter.ai/rankings)
- [Aider Leaderboards](https://aider.chat/docs/leaderboards/)
- [BFCL Leaderboard](https://gorilla.cs.berkeley.edu/leaderboard.html)
- [VLMEvalKit](https://github.com/open-compass/VLMEvalKit)
- [SWE-bench](https://www.swebench.com/)

## 相关专题

- [VLM / MLLM / Vision](../vlm/vlm-awesome.md)
- [Agent 与 Coding](../agent/agent-awesome.md)
- [Embedding 与 Reranker](../embedding/embedding-awesome.md)
- [综合模型资料索引](../ai-model-awesome.md)
