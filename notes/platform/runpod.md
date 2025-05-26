---
tags:
  - Cloud Provider
  - GPU
---

# RunPod

```
HF_HOME=/workspace/.cache/huggingface
```

- PUBLIC_KEY
  - for ssh
- JUPYTER_PASSWORD

```bash
apt update
apt install -y neofetch nvtop htop btop

pip install huggingface_hub

# for Gated Models
# ~/.git-credentials
git config --global credential.helper store
huggingface-cli login

huggingface-cli download google/gemma-3-12b-it
pip install vllm flash_attn accelerate
vllm serve "google/gemma-3-27b-it"

# 最新版 transformers
pip install https://github.com/huggingface/transformers/archive/refs/heads/main.zip

# / 为 Container Disk - 不会持久化
# /workspace 为 Volume Disk
df -h / /workspace

neofetch
nvidia-smi


# PDF to Images
apt-get install poppler-utils
# 文件-1.png
pdftoppm -png 文件{.pdf,}

# Ollama
# ==========
curl -fsSL https://ollama.com/install.sh | sh
ollama serve
ollama pull qwen2.5vl:32b

# FRP
# ==========
curl -LO https://github.com/fatedier/frp/releases/download/v0.62.1/frp_0.62.1_linux_amd64.tar.gz
tar -xzf frp_0.62.1_linux_amd64.tar.gz --strip-components=1 frp_0.62.1_linux_amd64/frpc
./frpc -v
```

```jupyter
!pip install vllm
#[]

import os
from vllm import LLM, SamplingParams
from vllm.lora.request import LoRARequest

# Setting the environment variable as suggested
os.environ['VLLM_ATTENTION_BACKEND'] = 'FLASHINFER'

llm = LLM(model="google/gemma-3-27b-it", enable_lora=True)
```

```py
import torch
from transformers import pipeline

pipe = pipeline(
    "image-text-to-text",
    model="google/gemma-3-4b-it", # "google/gemma-3-12b-it", "google/gemma-3-27b-it"
    device="cuda",
    torch_dtype=torch.bfloat16
)

messages = [
    {
        "role": "user",
        "content": [
            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},
            {"type": "text", "text": "What animal is on the candy?"}
        ]
    }
]

output = pipe(text=messages, max_new_tokens=200)
print(output[0]["generated_text"][-1]["content"])
```
