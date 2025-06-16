---
title: LLaMA-Factory
---

# LLaMA-Factory

- [hiyouga/LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)
  - Apache-2.0, Python

```bash
git clone --depth 1 https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory

uv venv --python 3.10

uv pip install setuptools
uv pip install
# uv pip install -e ".[torch,metrics]" --no-build-isolation
# uv sync --extra torch --extra metrics --prerelease=allow

# working
uv run llamafactory-cli --help

# 训练 LoRA 微调
uv run llamafactory-cli train examples/train_lora/llama3_lora_pretrain.yaml

# hf-mirror.com
curl -o qwen2.5vl.tpl.json https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct/raw/main/chat_template.json

# template https://github.com/hiyouga/LLaMA-Factory/blob/main/src/llamafactory/data/template.py
uv run llamafactory-cli webchat --model_name_or_path Qwen/Qwen2.5-VL-7B-Instruct --template qwen2_vl
```

## Alpaca 格式 {#alpaca-format}

```json
[
  {
    "instruction": "用户指令（必填）",
    "input": "用户输入（选填）",
    "output": "模型回答（必填）",
    "system": "系统提示词（选填）",
    "history": [
      ["第一轮指令（选填）", "第一轮回答（选填）"],
      ["第二轮指令（选填）", "第二轮回答（选填）"]
    ]
  }
]
```

## Sharegpt 格式 {#sharegpt-format}

- sharegpt 格式支持**更多的角色种类**
  - 例如 human、gpt、observation、function 等等
  - 它们构成一个对象列表呈现在 `conversations` 列中。

> 注意其中 human 和 observation 必须出现在奇数位置，gpt 和 function 必须出现在偶数位置。

```json
[
  {
    "conversations": [
      {
        "from": "human",
        "value": "用户指令"
      },
      {
        "from": "function_call",
        "value": "工具参数"
      },
      {
        "from": "observation",
        "value": "工具结果"
      },
      {
        "from": "gpt",
        "value": "模型回答"
      }
    ],
    "system": "系统提示词（选填）",
    "tools": "工具描述（选填）"
  }
]
```

```json
[
  {
    "conversations": [
      {
        "from": "human",
        "value": "<image><image>用户指令"
      },
      {
        "from": "gpt",
        "value": "模型回答"
      }
    ],
    "images": ["图像路径（必填）", "图像路径（必填）"]
  }
]
```

# FAQ

## libcublas.so not found in the system path

```txt
ImportError: libcudnn.so.9: cannot open shared object file: No such file or directory
ImportError: libcusparseLt.so.0: cannot open shared object file: No such file or directory
ImportError: libnccl.so.2: cannot open shared object file: No such file or directory
No module named 'sympy'
```

```bash
#export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
apt install nvidia-cuda-toolkit nvidia-cuda-toolkit-gcc
find /usr/lib -iname 'libcuda*'

# nvidia-cudnn 8.x
# apt install nvidia-cudnn

apt install libcudnn9-cuda-12 libcusparselt0
```

- NVIDIA cuSPARSELt
  - 一个高性能的 CUDA 库，专门为在 NVIDIA GPU 上执行稀疏矩阵-矩阵乘法 (SpMM) 以及相关的运算而设计。
- libnccl
  - NVIDIA Collective Communications Library (NCCL)

## This model does not support image input

- `--template qwen2-vl`

```
ValueError: This model does not support image input. Please check whether the correct `template` is used.
```
