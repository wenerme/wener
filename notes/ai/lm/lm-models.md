---
tags:
  - Model
---

# LLM Models

**Open Source/Weight Models**

| model   | date       | ctx          | notes                            |
| ------- | ---------- | ------------ | -------------------------------- |
| Qwen2   | 2024-06-07 | 32k,64k,128k | 0.5, 1.5, 7, 57, 72 B by Alibaba |
| LLAMA3  | 2024-04-18 | 8K           | by Meta                          |
| phi3    | 2024       |              | by Microsoft                     |
| gemma   | 2024       |              | by Google DeepMind               |
| mistral | 2024       |              | by Mistral AI                    |
| LLAMA2  | 2023       | 4K           | by Meta                          |
| GPT-3   | 2020       | 2k           | 175B                             |
| GPT-2   | 2019       |              | 1.5B                             |
| GPT-1   | 2018       |              | 0.12B                            |

**Proprietary Models**

| model         | date | notes              |
| ------------- | ---- | ------------------ |
| GPT-3.5-turbo | 2022 | 4K                 |
| GPT-3.5-16k   | 2022 | 16K                |
| GPT-3.5       | 2022 | ChatGPT,570GB Text |
| GPT-4         | 2023 |
| GPT-4-32k     | 2023 |
| GPT-4V        | 2023 |
| GPT-4o        | 2023 |

- `*-pt` - Pre-Training - 预训练模型
  - 在大规模数据集上进行初始训练，学习语言模式和结构。
  - 该模型适合作为基础模型，供开发者在特定任务上进行进一步的微调。
- `*-ft`
  - Fine-tuned
- `*-it` - Instruction Tuning - 经过指令微调的模型
  - 在预训练模型的基础上，进一步针对特定任务或指令进行了微调。
  - 此版本更适合直接应用于实际任务，因为它已经针对特定用途进行了优化。
- https://ollama.com/library
- 内存占用计算方式
  - 参数x精度
  - 目前理想精度是 float16, bfloat16 - 1 个参数占用 16bit
    - 1B -> 2GB
  - 量化参数 - 常见量化 int4
    - 1B -> 0.5GB
    - https://huggingface.co/datasets/christopherthompson81/quant_exploration
    - Q4_0 - worse accuracy but higher speed
    - Q4_1 - more accurate but slower
    - q4_2, q4_3 - new generations of q4_0 and q4_1, more accurate
    - https://github.com/ggerganov/llama.cpp/discussions/406
- 7B - 8GB 内存
- 13B - 16GB 内存
- 70B - 32GB/48G 内存
- 小 context window 适用于 RAG
- Context Window
  - LLama-3 8B 8K-1M https://ollama.com/library/llama3-gradient
    - 256k context window requires at least 64GB of memory
    - 1M+ context window requires significantly more (100GB+)

---

- Leader board
  - https://huggingface.co/open-llm-leaderboard
  - https://chat.lmsys.org/?leaderboard
  - https://www.vellum.ai/llm-leaderboard
- Visual
  - [microsoft/Florence-2-large](https://huggingface.co/microsoft/Florence-2-large)
    - MIT
    - base 0.23B, large 0.77B
    - Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks
- 阿里云/Alibaba
  - [QwenLM](https://github.com/QwenLM)
    - [Qwen](https://huggingface.co/Qwen)
    - [QwQ 32B](https://huggingface.co/Qwen/QwQ-32B)
    - [QwenLM/Qwen2.5](https://github.com/QwenLM/Qwen2.5)
      - Qwen2.5 Coder
      - Qwen2.5 VL
      - Qwen2.5 Math
    - [QwenLM/Qwen](https://github.com/QwenLM/Qwen)
    - ⚠️ Ollama 不支持 Qwen VL [ollama#2874](https://github.com/ollama/ollama/issues/2874)
  - [Wan-Video](https://github.com/Wan-Video)
    - [Wan-Video/Wan2.1](https://github.com/Wan-Video/Wan2.1)
  - [HumanMLLM/R1-Omni](https://github.com/HumanMLLM/R1-Omni)
    - 阿里通义实验室
    - Explainable Omni-Multimodal Emotion Recognition with Reinforcement Learning
- deepseek
  - [deepseek-ai/Janus](https://github.com/deepseek-ai/Janus)
    - Janus-Series: Unified Multimodal Understanding and Generation Models
  - [deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)
  - [deepseek-ai/DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3)
  - [deepseek-ai/DeepSeek-VL2](https://github.com/deepseek-ai/DeepSeek-VL2)
    - DeepSeek-VL2: Mixture-of-Experts Vision-Language Models for Advanced Multimodal Understanding
- [google-deepmind/gemma](https://github.com/google-deepmind/gemma)
  - Apache-2.0, Flax, JAX
  - by Google DeepMind
  - Ultra, Pro, Flash, Nano
  - https://ai.google.dev/gemma/docs/core
  - gemma 3
    - 1B text only, 4, 12, 27B Vision + text. 14T tokens
    - 128K context length further trained from 32K. 1B is 32K.
    - Removed attn softcapping. Replaced with QK norm
    - 5 sliding + 1 global attn
    - 1024 sliding window attention
    - RL - BOND, WARM, WARP
    - https://huggingface.co/collections/google/gemma-3-release-67c6c6f89c4f76621268bb6d
    - https://storage.googleapis.com/deepmind-media/gemma/Gemma3Report.pdf
    - https://blog.google/technology/developers/gemma-3/
    - https://huggingface.co/blog/gemma3
- llama2
  - 7B, 13B, 70B
- uncensored
  - llama2-uncensored
    - 7B, 70B
  - wizard-vicuna-uncensored
    - 7B, 13B, 70B
  - wizardlm-uncensored
    - 13B
  - https://erichartford.com/uncensored-models
  - https://www.pixiv.net/novel/show.php?id=21039830
    - https://huggingface.co/a686d380/rwkv-5-h-world
- [microsoft/BitNet](https://github.com/microsoft/BitNet)
  - MIT, C++, Python
  - by Microsoft
  - [HN](https://news.ycombinator.com/item?id=41877609)
- vicuna
- mistral
- mixtral
- Flan
- Alpaca
- GPT4All
- Chinese LLaMA
- Vigogne (French)
- LLaMA
- Databricks Dolly 2.0
  - https://huggingface.co/databricks/dolly-v2-12b
  - https://github.com/databrickslabs/dolly/tree/master/data
- https://huggingface.co/stabilityai/stable-diffusion-2
- [togethercomputer/OpenChatKit](https://github.com/togethercomputer/OpenChatKit)
- [Alpaca](./alpaca.md)
  - 基于 LLaMA + 指令训练
- [FlagAI-Open/FlagAI](https://github.com/FlagAI-Open/FlagAI)
- [hpcaitech/ColossalAI](https://github.com/hpcaitech/ColossalAI)
- [BlinkDL/ChatRWKV](https://github.com/BlinkDL/ChatRWKV)
  - ChatGPT like
  - RWKV (100% RNN)
- [nebuly-ai/nebullvm](https://github.com/nebuly-ai/nebullvm)
- [FMInference/FlexGen](https://github.com/FMInference/FlexGen)
- [EssayKillerBrain/WriteGPT](https://github.com/EssayKillerBrain/WriteGPT)
  - GPT-2
- [ymcui/Chinese-LLaMA-Alpaca](https://github.com/ymcui/Chinese-LLaMA-Alpaca)
- https://www.promptingguide.ai/zh/models/collection
- [Releasing 3B and 7B RedPajama-INCITE family of models including base, instruction-tuned & chat models](https://www.together.xyz/blog/redpajama-models-v1)
- RedPajama-Data-v2
  - https://together.ai/blog/redpajama-data-v2
  - https://github.com/togethercomputer/RedPajama-Data
  - https://huggingface.co/datasets/togethercomputer/RedPajama-Data-V2
  - en, de, fr, es, it
- [hysts/ControlNet-v1-1](https://huggingface.co/spaces/hysts/ControlNet-v1-1)
- ggml
  - [ggerganov/ggml](https://github.com/ggerganov/ggml)
    - MIT, C
- .pth - PyTorch
  - checklist.chk - MD5
  - params.json - `{"dim": 4096, "multiple_of": 256, "n_heads": 32, "n_layers": 32, "norm_eps": 1e-06, "vocab_size": -1}`
  - [Saving & Loading Models](https://pytorch.org/tutorials/beginner/saving_loading_models.html)
- https://medium.com/geekculture/list-of-open-sourced-fine-tuned-large-language-models-llm-8d95a2e0dc76
- https://erichartford.com/uncensored-models
- https://huggingface.co/spaces/facebook/seamless_m4t
- https://github.com/LinkSoul-AI/Chinese-Llama-2-7b
- Jina AI 8k text embedding
  - https://news.ycombinator.com/item?id=38020109
  - https://huggingface.co/jinaai/jina-embeddings-v2-base-en
  - https://huggingface.co/jinaai/jina-embeddings-v2-small-en

```bash
# AVX = 1 | AVX2 = 0 | AVX512 = 0 | FMA = 0 | NEON = 0 | ARM_FMA = 0 | F16C = 1 | FP16_VA = 0 | WASM_SIMD = 0 | BLAS = 0 | SSE3 = 1 | VSX = 0 |
grep avx /proc/cpuinfo --color # x86_64
```

## 中文 {#chinese}

- Qwen2
- [LlamaFamily/Llama-Chinese](https://github.com/LlamaFamily/Llama-Chinese)
- [UnicomAI/Unichat-llama3-Chinese](https://github.com/UnicomAI/Unichat-llama3-Chinese)
  - 联通 llama3 微调
- https://github.com/datawhalechina/self-llm

## Fine-tuning {#fine-tuning}

- https://huggingface.co/ValueFX9507/Tifa-Deepsex-14b-CoT-GGUF-Q4
