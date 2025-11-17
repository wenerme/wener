---
title: llama.cpp
tags:
  - Engine
---

# llama.cpp

- [ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)
  - MIT, C++
  - LLM inference in C/C++
- 参考
  - [withcatai/node-llama-cpp](https://github.com/withcatai/node-llama-cpp)

```bash
# AlpineLinux py for ML
apk add \
  gcc g++ python3 py3-pip musl-dev cmake make pkgconf build-base \
  git openssh-client binutils coreutils util-linux findutils sed grep tar wget curl neofetch \
  rust cargo python3-dev openssl-dev linux-headers

# llama.cpp
# =========
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
make -j

./main -m ./models/7B/ggml-model-q4_0.bin -p "Building a website can be done in 10 simple steps:" -n 512
./main -m ./models/7B/ggml-model-q4_0.bin --file prompts/alpaca.txt --instruct --ctx_size 2048 --keep -1

./main -m ./models/ggml-alpaca-7b-q4.bin --color -f ./prompts/alpaca.txt -ins -b 256 --top_k 10000 --temp 0.2 --repeat_penalty 1 -t 7

brew install llama.cpp

mkdir models
curl -L -o models/qwen3-vl-4b-mmproj-F16.gguf "https://hf-mirror.com/unsloth/Qwen3-VL-4B-Instruct-GGUF/resolve/main/mmproj-F16.gguf"
curl -L -o models/qwen3-vl-8b-mmproj-F16.gguf "https://hf-mirror.com/unsloth/Qwen3-VL-8B-Instruct-GGUF/resolve/main/mmproj-F16.gguf"

# 进入 Shell
# /app/llama-server --no-warmup -hf unsloth/Qwen3-VL-4B-Instruct-GGUF:Q4_K_M
docker run --rm -it \
  -v $PWD/models:/root/.cache/llama.cpp \
  -e HF_ENDPOINT=https://modelscope.cn \
  --entrypoint bash \
  ghcr.m.daocloud.io/ggml-org/llama.cpp:server-cuda

# 下载 model
docker run --rm -it \
  -v $PWD/models:/root/.cache/llama.cpp \
  -e HF_ENDPOINT=https://modelscope.cn \
  ghcr.m.daocloud.io/ggml-org/llama.cpp:server-cuda \
  -hf unsloth/Qwen3-VL-4B-Instruct-GGUF:Q4_K_M

# -m /models/7B/ggml-model-q4_0.gguf --port 8000 --host 0.0.0.0 -n 512
# --run -m /models/7B/ggml-model-q4_0.gguf -p "Building a website can be done in 10 simple steps:" -n 512 --n-gpu-layers 1
docker run --rm -it \
  --gpus all \
  -p 8080:8080 \
  -v $PWD/models:/models \
  -v $PWD/models:/root/.cache/llama.cpp \
  -e HF_ENDPOINT=https://modelscope.cn \
  --name llama.cpp ghcr.m.daocloud.io/ggml-org/llama.cpp:server-cuda \
  -hf unsloth/Qwen3-VL-4B-Instruct-GGUF:Q4_K_M -np 8 -c 32000 -cb -n 8 --mmproj /models/qwen3-vl-mmproj-F16.gguf -ngl 99

# https://modelscope.cn/models/unsloth/Qwen3-VL-4B-Instruct-GGUF
# https://hf-mirror.com

# ~/Library/Caches/llama.cpp
# /root/.cache/llama.cpp
llama-server --jinja -fa auto -hf unsloth/Qwen3-VL-4B-Instruct-GGUF:Q4_K_M
HF_ENDPOINT=https://modelscope.cn llama-server -hf unsloth/Qwen3-VL-4B-Instruct-GGUF:Q4_K_M
```

- 默认 Q4_K_M

```
KV_size = n_ctx × n_layer × n_embd_k_gqa × sizeof(f16)
```

- https://lmcache.ai/kv_cache_calculator.html
- https://huggingface.co/collections/ggml-org/
- https://huggingface.co/collections/unsloth/qwen3-vl

```bash
# 查看 slot 分配情况
curl http://localhost:8080/slots

# 输入 token 长度
# slot update_slots: id  3 | task 2094 | new prompt, n_ctx_slot = 65536, n_keep = 0, task.n_tokens = 950
docker logs llama | grep task.n_tokens

# 总长度
docker logs llama | grep 'stop processing: n_tokens'
```

## nodejs

```bash
NODE_LLAMA_CPP_SKIP_DOWNLOAD=1 pnpm add node-llama-cpp
```

## quantization

- `Q4_K_M`
  - Q - Quantization
  - `4` - 4 bits
  - `K` - K-Quants
  - `M` - Medium
    - XXS
    - S - 比 Q4_0 好
    - M
    - L - 接近 Q5
    - XL
- gguf

## server

- https://github.com/ggml-org/llama.cpp/tree/master/tools/server
- KV cache
  - -ctk, --cache-type-k TYPE
  - -ctv, --cache-type-v TYPE
  - 默认 f16
  - 支持 f32, f16, bf16, q8_0, q4_0, q4_1, iq4_nl, q5_0, q5_1
- Pooling - 多个向量 -> 单个向量
  - none
  - mean
  - cls - `[CLS]` Token
  - last - 最后一个 Token
  - rank
- normalize
  - Euclidean/L2
  - Taxicab/L1 - 曼哈顿距离
  - Max absolute - `[-1, 1]`
  - P-Norm
