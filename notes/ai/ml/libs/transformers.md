---
title: transformers
---

# transformers

```bash
uv add transformers torch torchvision pillow accelerate
```

- attn_implementation
  - flash_attention_2
    - fp16, bf16
  - sdpa
    - default for PyTorch v2.1.1
  - https://huggingface.co/docs/transformers/perf_infer_gpu_one
- https://github.com/dottxt-ai/outlines
  - 结构化文本
  - Vision https://dottxt-ai.github.io/outlines/latest/cookbook/atomic_caption/

## Latest Version

```bash
# 先尝试使用最新版
pip install --upgrade transformers

# 不行则可以尝试使用 source
pip install https://github.com/huggingface/transformers/archive/refs/heads/main.zip
```
