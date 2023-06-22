---
tags:
  - Awesome
---

# Model Awesome

**Transformer Network**

| model   | year | params | note               |
| ------- | ---- | ------ | ------------------ |
| GPT-1   | 2018 | 0.12B  |
| GPT-2   | 2019 | 1.5B   |
| GPT-3   | 2020 | 175B   |
| GPT-3.5 | 2022 |        | ChatGPT,570GB Text |
| GPT-4   | 2023 |

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
- [hysts/ControlNet-v1-1](https://huggingface.co/spaces/hysts/ControlNet-v1-1)
- ggml
  - [ggerganov/ggml](https://github.com/ggerganov/ggml)
    - MIT, C
- .pth - PyTorch
  - checklist.chk - MD5
  - params.json - `{"dim": 4096, "multiple_of": 256, "n_heads": 32, "n_layers": 32, "norm_eps": 1e-06, "vocab_size": -1}`
  - [Saving & Loading Models](https://pytorch.org/tutorials/beginner/saving_loading_models.html)
- https://medium.com/geekculture/list-of-open-sourced-fine-tuned-large-language-models-llm-8d95a2e0dc76

```bash
# AVX = 1 | AVX2 = 0 | AVX512 = 0 | FMA = 0 | NEON = 0 | ARM_FMA = 0 | F16C = 1 | FP16_VA = 0 | WASM_SIMD = 0 | BLAS = 0 | SSE3 = 1 | VSX = 0 |
grep avx /proc/cpuinfo --color # x86_64
```

## Train/Alternative/TBD

- https://github.com/lm-sys/FastChat
- https://github.com/lvwzhen/law-cn-ai
- https://github.com/okisdev/ChatChat
- https://github.com/closedai-project/closedai
- https://github.com/openlm-research/open_llama
- https://github.com/ixaxaar/VardaGPT
  - https://news.ycombinator.com/item?id=35839536

## Languages

- [Stability-AI/StableLM](https://github.com/Stability-AI/StableLM)
  - [HN](https://news.ycombinator.com/item?id=35629127)

## 3D

- Action-GPT: Leveraging Large-scale Language Models for Improved and Generalized Action Generation
  - https://actiongpt.github.io/
- [openai/shap-e](https://github.com/openai/shap-e)

## Visual

- [facebookresearch/dinov2](https://github.com/facebookresearch/dinov2)

## Image

## Video

- [nadermx/backgroundremover](https://github.com/nadermx/backgroundremover)
