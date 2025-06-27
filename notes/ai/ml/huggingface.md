---
title: Hugging Face
---

# Hugging Face

- HF_HOME
- git lfs
- 参考
  - https://huggingface.co/pricing
- XET Storage
  - https://huggingface.co/xet-team
  - https://xethub.com/
  - transfer.xethub.hf.co - CloudFront, 能直联
  - cas-server.xethub.hf.co
- Pro https://huggingface.co/subscribe/pro
  - $9.00 / month

```bash
brew install huggingface-cli
pip install huggingface_hub

huggingface-cli download gpt2 config.json model.safetensors # 下载单个文件
huggingface-cli download Qwen/Qwen2.5-VL-7B-Instruct        # 下载模型

# ~/.cache/huggingface/stored_tokens
huggingface-cli login
huggingface-cli whoami

uvx --from huggingface_hub huggingface-cli
```

- --repo-type dataset
- --repo-type space
- --revision v1.1

## Cache

- HF_DATASETS_CACHE
- `~/.cache/huggingface/hub`
- `~/.cache/huggingface/hub/models--<username>--<modelname>/`
  - blobs/
  - refs/
  - snapshots/

---

- https://huggingface.co/docs/datasets/en/cache

## Inference

```py
from huggingface_hub import InferenceClient

client = InferenceClient(
  provider="hyperbolic",
  api_key="hf_",
)

messages = [
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "Describe this image in one sentence."
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"
        }
      }
    ]
  }
]

completion = client.chat.completions.create(
  model="Qwen/Qwen2.5-VL-72B-Instruct",
  messages=messages,
  max_tokens=500,
)
```

## modelscope

```bash
# 国内镜像下载 HF Repo
pip install modelscope
```

- cache_dir= ~/.cache/modelscope/hub
- allow_patterns
- ignore_patterns
- --include
- --exclude
- 模型缓存目录
  - cache_dir/MODEL_ID/THE_MODEL_FILES

# FAQ

## The model Qwen/Qwen2.5-VL-72B-Instruct is too large to be loaded automatically (146GB > 10GB).

- InferenceClient 指定 Provider
- serverless inference API,

## You are trying to access a gated repo.

1. 同意 Model 条款
1. 生成 Token
1. HF 登录
1. 下载模型

```
Please enable access to public gated repositories in your fine-grained token settings to view this repository

We couldn't connect to 'https://huggingface.co' to load this file
```

- 调整 Token 权限

---

- https://huggingface.co/docs/hub/en/models-gated#access-gated-models-as-a-user

```py
from huggingface_hub import login
login()
```

**Jupyter Notebook**

```py
from huggingface_hub import notebook_login
notebook_login()
```
