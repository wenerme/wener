---
title: sglang
---

# sglang

- [sgl-project/sglang](https://github.com/sgl-project/sglang)
  - Apache-2.0, Python, C++
- 参考
  - https://github.com/sgl-project/sglang/tree/main/docs/supported_models

```bash
uv pip install "sglang[all]>=0.4.9.post6" --prerelease=allow

uv run python3 -m sglang.launch_server \
  --model-path Qwen/Qwen2.5-VL-7B-Instruct \
  --host 0.0.0.0 \
  --port 30000
```

# Server

- 参考
  - 参数 https://docs.sglang.ai/backend/server_arguments.html

# FAQ

## RuntimeError: SGLang only supports sm75 and above.

- sm75 是 CUDA 7.5 的简称
- 需要 CUDA 7.5+ / 2018 Nvidia Turing+ 架构
- 不会支持 70 https://github.com/sgl-project/sglang/issues/931

**FlashInfer**

```
Python: 3.8, 3.9, 3.10, 3.11
PyTorch: 2.2/2.3/2.4 with CUDA 11.8/12.1/12.4 (only for torch 2.4)
Supported GPU architectures: sm75, sm80, sm86, sm89, sm90
```
