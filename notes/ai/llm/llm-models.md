---
tags:
  - Model
---

# LLM Models

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

**Open Source/Weight Models**

| model   | date | ctx | notes              |
| ------- | ---- | --- | ------------------ |
| GPT-1   | 2018 |     | 0.12B              |
| GPT-2   | 2019 |     | 1.5B               |
| GPT-3   | 2020 | 2k  | 175B               |
| LLAMA2  | 2023 | 4K  | by Meta            |
| LLAMA3  | 2024 | 8K  | by Meta            |
| phi3    | 2024 |     | by Microsoft       |
| gemma   | 2024 |     | by Google DeepMind |
| mistral | 2024 |     | by Mistral AI      |

- https://ollama.com/library
- 7B - 8GB 内存
- 13B - 16GB 内存
- 70B - 32GB 内存
- 小 context window 适用于 RAG
- Context Window
  - LLama-3 8B 8K-1M  https://ollama.com/library/llama3-gradient
    - 256k context window requires at least 64GB of memory
    - 1M+ context window requires significantly more (100GB+)

---

- Leader board
  - https://huggingface.co/open-llm-leaderboard
  - https://chat.lmsys.org/?leaderboard
  - https://www.vellum.ai/llm-leaderboard
- [google-deepmind/gemma](https://github.com/google-deepmind/gemma)
  - Apache-2.0, Flax, JAX
  - by Google DeepMind
  - Ultra, Pro, Flash, Nano
  - 2B, 7B
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
