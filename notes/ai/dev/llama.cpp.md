---
title: llama.cpp
tags:
  - Engine
---

# llama.cpp

- [ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)
  - MIT, C++
  - LLM inference in C/C++
  - BLAST
- 参考
  - [withcatai/node-llama-cpp](https://github.com/withcatai/node-llama-cpp)

:::cautiom

- 推测解码不支持 vision

:::

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

| Flag                             | 默认      | 说明                                                                                 |
| :------------------------------- | :-------- | :----------------------------------------------------------------------------------- |
| **Server**                       |           |                                                                                      |
| `--host HOST`                    | 127.0.0.1 | 监听地址                                                                             |
| `--port PORT`                    | 8080      | 监听端口                                                                             |
| `--path PATH`                    |           | 静态文件服务路径                                                                     |
| `--api-prefix PREFIX`            |           | API URL 前缀                                                                         |
| `--api-key KEY`                  |           | API 密钥                                                                             |
| `-to, --timeout N`               | 600       | 读写超时 (秒)                                                                        |
| `--threads-http N`               | -1        | HTTP 处理线程数                                                                      |
| `--metrics`                      | false     | 启用 Prometheus 指标                                                                 |
| `--slots`                        | true      | 启用 slots 监控端点                                                                  |
| `--no-webui`                     | false     | 禁用 Web UI                                                                          |
| `-a, --alias NAME`               |           | 模型别名 (API使用)                                                                   |
| **Model**                        |           |                                                                                      |
| `-m, --model FNAME`              |           | 模型路径                                                                             |
| `-mu, --model-url URL`           |           | 模型下载 URL                                                                         |
| `-hf, --hf-repo <repo>`          |           | Hugging Face 模型仓库 `<user>/<model>[:quant]`                                       |
| `-hff, --hf-file <file>`         |           | Hugging Face 模型文件 (覆盖 repo 中的 quant)                                         |
| `-hft, --hf-token TOKEN`         |           | Hugging Face Token                                                                   |
| `-c, --ctx-size N`               | 4096      | 上下文大小, 0=模型定义                                                               |
| `--mmproj FILE`                  |           | Multimodal projector file (Vision)                                                   |
| `-ctk, --cache-type-k TYPE`      | f16       | K Cache 类型 (f16, q8_0, q4_0 等)                                                    |
| `-ctv, --cache-type-v TYPE`      | f16       | V Cache 类型                                                                         |
| **Reasoning**                    |           |                                                                                      |
| `--reasoning-format FORMAT`      | deepseek  | 推理格式: none, deepseek, deepseek-legacy                                            |
| `--reasoning-budget N`           | -1        | 推理预算 (thinking budget)                                                           |
| **Speculative Decoding (Draft)** |           |                                                                                      |
| `-md, --model-draft FNAME`       |           | Draft model for speculative decoding                                                 |
| `-hfd, --hf-repo-draft <repo>`   |           | Draft model Hugging Face repo                                                        |
| `-ngld, --gpu-layers-draft N`    |           | GPU layers for draft model                                                           |
| `--draft-max, --draft N`         | 16        | Number of tokens to draft                                                            |
| `--draft-min N`                  | 0         | Minimum draft tokens                                                                 |
| `--draft-p-min P`                | 0.8       | Minimum speculative decoding probability                                             |
| `-cd, --ctx-size-draft N`        | 0         | Draft model context size                                                             |
| `-devd, --device-draft`          |           | Device for draft model                                                               |
| **LoRA / Adapter**               |           |                                                                                      |
| `--lora FNAME`                   |           | Path to LoRA adapter                                                                 |
| `--lora-scaled FNAME SCALE`      |           | Path to LoRA adapter with user defined scaling                                       |
| `--lora-init-without-apply`      | false     | Load LoRA adapters without applying them                                             |
| `--control-vector FNAME`         |           | Add a control vector                                                                 |
| **Process / Hardware**           |           |                                                                                      |
| `-t, --threads N`                | -1        | 生成线程数                                                                           |
| `-tb, --threads-batch N`         | same      | 批处理和 prompt 处理线程数                                                           |
| `-b, --batch-size N`             | 2048      | 逻辑最大批处理大小 (Logical max batch size)                                          |
| `-ub, --ubatch-size N`           | 512       | 物理最大批处理大小 (Physical max batch size)                                         |
| `-ngl, --gpu-layers N`           |           | GPU 层数 (VRAM offload)                                                              |
| `-sm, --split-mode`              | layer     | GPU 分割模式: none, layer, row                                                       |
| `-ts, --tensor-split`            |           | 多 GPU 分割比例 (如 3,1)                                                             |
| `-mg, --main-gpu INDEX`          | 0         | 主 GPU                                                                               |
| `-fa, --flash-attn`              | false     | 启用 Flash Attention                                                                 |
| `-dev, --device <devs>`          |           | 指定使用设备                                                                         |
| `--numa TYPE`                    |           | NUMA 优化: distribute, isolate, numactl                                              |
| `--mlock`                        | false     | 锁定内存 (防止交换)                                                                  |
| `--no-mmap`                      | false     | 禁用 mmap (慢加载但减少缺页)                                                         |
| `--no-kv-offload`                | false     | 禁用 KV Offload                                                                      |
| **Sampling**                     |           |                                                                                      |
| `--samplers`                     | ...       | 采样器顺序 (默认: penalties;dry;top_n_sigma;top_k;typ_p;top_p;min_p;xtc;temperature) |
| `-s, --seed SEED`                | -1        | 随机种子 (-1=随机)                                                                   |
| `--temp N`                       | 0.8       | 温度                                                                                 |
| `--dynatemp-range N`             | 0.0       | 动态温度范围                                                                         |
| `--top-k N`                      | 40        | Top-K 采样                                                                           |
| `--top-p N`                      | 0.9       | Top-P 采样                                                                           |
| `--min-p N`                      | 0.1       | Min-P 采样                                                                           |
| `--xtc-probability N`            | 0.0       | XTC 概率                                                                             |
| `--xtc-threshold N`              | 0.1       | XTC 阈值                                                                             |
| `--typical N`                    | 1.0       | Locally typical sampling                                                             |
| `--repeat-last-n N`              | 64        | 重复惩罚的最后 n 个 token (0=disabled, -1=ctx_size)                                  |
| `--repeat-penalty N`             | 1.0       | 重复惩罚                                                                             |
| `--presence-penalty N`           | 0.0       | 出现惩罚                                                                             |
| `--frequency-penalty N`          | 0.0       | 频率惩罚                                                                             |
| `--dry-multiplier N`             | 0.0       | DRY 采样倍率                                                                         |
| `--mirostat N`                   | 0         | Mirostat 采样 (0=disabled, 1=v1, 2=v2)                                               |
| `--grammar GRAMMAR`              |           | BNF 语法约束                                                                         |
| `-j, --json-schema`              |           | JSON Schema 约束                                                                     |
| `-l, --logit-bias`               |           | Logit 偏差 `TOKEN_ID(+/-)BIAS`                                                       |
| `--ignore-eos`                   | false     | 忽略 EOS Token                                                                       |
| **Context & RoPE**               |           |                                                                                      |
| `-cb, --cont-batching`           | true      | 连续批处理 (Continuous batching)                                                     |
| `-nocb, --no-cont-batching`      |           | 禁用连续批处理                                                                       |
| `-np, --parallel N`              | 1         | 并行解码序列数 (Slots)                                                               |
| `-n, --predict N`                | -1        | 预测 token 数量, -1=无限                                                             |
| `--keep N`                       | 0         | 保留初始 Prompt Token 数 (-1=all)                                                    |
| `--cache-reuse N`                | 0         | 最小 Cache 重用 Chunk 大小                                                           |
| `--no-context-shift`             | false     | 禁用上下文移动 (无限生成时)                                                          |
| `--rope-scaling TYPE`            |           | RoPE 缩放类型: none, linear, yarn                                                    |
| `--rope-freq-base N`             |           | RoPE 基频                                                                            |
| `--rope-freq-scale N`            |           | RoPE 频率缩放因子                                                                    |
| **Other**                        |           |                                                                                      |
| `--embedding`                    | false     | 仅嵌入模式                                                                           |
| `--reranking`                    | false     | 启用重排序端点                                                                       |
| `--jinja`                        | false     | 使用 Jinja 模板                                                                      |
| `--chat-template NAME`           |           | 指定聊天模板                                                                         |

- 图片预处理: 图片解码、resize、normalize 在 CPU 上
  - clip_image_preprocess
  - 支持批处理

```
sampler chain: logits -> logit-bias -> penalties -> dry -> top-n-sigma -> top-k -> typical -> top-p -> min-p -> xtc -> temp-ext -> dist
```

```
原始 Logits (模型输出)
    ↓
1. logit-bias      → 手动调整特定 token 的 logit 值
    ↓
2. penalties       → 应用重复惩罚（repeat/presence/frequency penalty）
    ↓
3. dry             → DRY 重复惩罚（更智能的重复检测）
    ↓
4. top-n-sigma     → Top-N-Sigma 采样（基于统计分布）
    ↓
5. top-k           → Top-K 采样（保留前 K 个 token）
    ↓
6. typical         → Typical P 采样（保留典型概率的 token）
    ↓
7. top-p           → Top-P (Nucleus) 采样（累积概率阈值）
    ↓
8. min-p           → Min-P 采样（相对最小概率阈值）
    ↓
9. xtc             → XTC 采样（移除低概率 token）
    ↓
10. temp-ext        → 动态温度缩放（根据熵调整温度）
    ↓
11. dist            → 最终概率分布采样（softmax + 随机选择）
    ↓
选中的 Token
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
