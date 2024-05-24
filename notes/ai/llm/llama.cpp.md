---
title: llama.cpp
---

# llama.cpp

- [ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)
  - MIT, C++
  - LLM inference in C/C++

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
```

## nodejs

```bash
NODE_LLAMA_CPP_SKIP_DOWNLOAD=1 pnpm add node-llama-cpp
```

## quantization

- `Q3_K_M`
  - `Q3` - 3 bits
  - `K` - 1024
  - `M` - 256
- gguf
