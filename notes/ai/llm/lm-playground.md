---
title: Playground
---

# Playground

```bash
docker run --rm -it \
  -v /data/ml:/host \
  -v /data/cache/apk:/etc/apk/cache \
  -v /data/ml/home:/home/admin \
  --entrypoint bash \
  --name ml wener/base

apk add shadow sudo doas
adduser -D admin
echo 'admin ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
echo 'permit nopass admin as root' >> /etc/doas.d/admin.conf

apk add \
  gcc g++ python3 py3-pip musl-dev cmake make pkgconf build-base \
  git openssh-client binutils coreutils util-linux findutils sed grep tar wget curl neofetch \
  rust cargo python3-dev openssl-dev linux-headers openblas-dev

su admin

mkdir -p /host/{gits,models}
mkdir -p ~/bin
export PATH="$HOME/bin:$PATH"

cd /host/gits
```

# llama.cpp

- BLAS performance improvements in prompt processing, doesn't affect the normal generation performance

```bash
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
# OpenBLAS CPU 加速
# macOS LLAMA_METAL=1
make LLAMA_OPENBLAS=1 -j
cp main ~/bin/llama.cppv3

# before https://github.com/ggerganov/llama.cpp/pull/1305
# b9fd7ee^1
git checkout # b9fd7ee^1
make LLAMA_OPENBLAS=1 -j
cp main ~/bin/llama.cppv2


# /host/models/LLaMA-ggml-4bit_2023-03-31/llama-7b-ggml-q4_0/ggml-model-q4_0.bin
llama.cpp -m ./ggml-model-q4_0.bin -p "Building a website can be done in 10 simple steps:" -n 512
```

- https://huggingface.co/keldenl/RedPajama-INCITE-Instruct-3B-v1-GGML
- Selfee
  - https://huggingface.co/TheBloke/Selfee-13B-fp16

```bash
# https://huggingface.co/TheBloke/Selfee-13B-GGML
curl -LO https://huggingface.co/TheBloke/Selfee-13B-GGML/resolve/main/selfee-13b.ggmlv3.q2_K.bin

# -p "Building a website can be done in 10 simple steps:"
llama.cpp -m /host/models/selfee-13b.ggmlv3.q2_K.bin -t $(nproc) --repeat_penalty 1.0 --color -i -r "User:"  -n 256 -f prompts/chat-with-bob.txt
```

## chinese-alpaca

```bash
llama.cpp -m chinese-alpaca-13b-plus-quantized.bin -t $(nproc) -p "你好"

./main -m zh-models/7B/ggml-model-q4_0.bin --color -f prompts/alpaca.txt -ins -c 2048 --temp 0.2 -n 256 --repeat_penalty 1.1
```

- Models
  - https://huggingface.co/Mabbs/chinese-Alpaca-lora-7b-ggml/blob/main/ggml-model-q4_0.bin
  - https://huggingface.co/Billsfriend/chinese-Alpaca-7b-plus-ggml-q8_0
  - https://huggingface.co/johnlui/chinese-alpaca-13b-plus-quantized
- https://github.com/hikariming/alpaca_chinese_dataset
- https://github.com/A-baoYang/alpaca-7b-chinese

## Models


- ggml : remove bit shuffling  https://github.com/ggerganov/llama.cpp/pull/1305
- https://www.reddit.com/r/LocalLLaMA/comments/11o6o3f/how_to_install_llama_8bit_and_4bit/

## Flags

| llama.cpp                          | for                                                            |
| ---------------------------------- | -------------------------------------------------------------- |
| -i, --interactive                  | 交互模式                                                       |
| --interactive-first                | 交互模式，立即等待输入                                         |
| -ins, --instruct                   | 指令模式                                                       |
| --multiline-input                  | 允许多行输入                                                   |
| -r PROMPT, --reverse-prompt PROMPT | 遇到 PROMPT 时结束生成，加入交互模式                           |
| --color                            | 彩色输出                                                       |
| -s SEED, --seed SEED               | 随机数种子，默认 -1 随机                                       |
| -t N, --threads N                  | 线程数，默认 64                                                |
| -p PROMPT, --prompt PROMPT         | 生成的开始，默认空                                             |
| -e                                 | 处理转义字符 `\n, \r, \t, \', \", \\`                          |
| --prompt-cache FNAME               | 保存 prompt 状态，加快启动，默认不保存                         |
| --prompt-cache-all                 | 保存用户输入和生成的结果                                       |
| --prompt-cache-ro                  | 只读模式，使用 prompt 缓存但不更新                             |
| --random-prompt                    | 随机 prompt                                                    |
| --in-prefix STRING                 | 用户输入前缀，默认空                                           |
| --in-suffix STRING                 | 用户输入后缀，默认空                                           |
| -f FNAME, --file FNAME             | 生成的文件                                                     |
| -n N, --n-predict N                | 预测的 token 数量，默认 -1 无限                                |
| --top-k N                          | top-k 采样，默认 40，0=禁用                                    |
| --top-p N                          | top-p 采样，默认 0.9，1.0=禁用                                 |
| --tfs N                            | tail free 采样，参数 z，默认 1.0，1.0=禁用                     |
| --typical N                        | locally typical 采样，参数 p，默认 1.0，1.0=禁用               |
| --repeat-last-n N                  | 最后 N 个 token 重复惩罚，默认 64，0=禁用，-1=ctx_size         |
| --repeat-penalty N                 | 重复 token 惩罚，默认 1.1，1.0=禁用                            |
| --presence-penalty N               | 重复 alpha 出现惩罚，默认 0.0，0.0=禁用                        |
| --frequency-penalty N              | 重复 alpha 频率惩罚，默认 0.0，0.0=禁用                        |
| --mirostat N                       | 使用 Mirostat 采样，默认 0，0=禁用，1=Mirostat，2=Mirostat 2.0 |
| --mirostat-lr N                    | Mirostat 学习率，默认 0.1                                      |
| --mirostat-ent N                   | Mirostat target entropy, 参数 eta，默认 5.0                    |
| -l,--logit-bias TOKEN_ID(+/-)BIAS  |
| -c N, --ctx-size N                 | 上下文大小，默认 512                                           |
| --ignore-eos                       | 忽略 EOS，继续生成                                             |
| --no-penalize-nl                   | 不惩罚换行                                                     |
| --memory-f32                       | 使用 f32 代替 f16，不推荐                                      |
| --temp N                           | 温度，默认 0.8                                                 |
| -b N, --batch-size N               | 批处理大小，默认 512                                           |
| --perplexity                       | 计算 perplexity                                                |
| --keep N                           | 保留初始 prompt 的 token 数量，默认 0，-1=全部                 |
| --mlock                            | 强制系统将模型保留在 RAM 中，而不是交换或压缩                  |
| --no-mmap                          | 不要内存映射模型                                               |
| --mtest                            | 计算最大内存使用量                                             |
| --export                           | 导出计算图到 llama.ggml                                        |
| --verbose-prompt                   | 生成前打印 prompt                                              |
| --lora FNAME                       | 应用 LoRA 适配器                                               |
| --lora-base FNAME                  |
| -m FNAME, --model FNAME            | 模型文件                                                       |

```
modifies the likelihood of token appearing in the completion,
i.e. `--logit-bias 15043+1` to increase likelihood of token ' Hello',
or `--logit-bias 15043-1` to decrease likelihood of token ' Hello'
```

- EOS - End of stream

**AMD EPYC 7601 (128) @ 2.200GHz**

**chinese-alpaca-13b-plus-quantized**

```
llama_print_timings:        load time =  1954.73 ms
llama_print_timings:      sample time =    57.95 ms /    51 runs   (    1.14 ms per token,   880.08 tokens per second)
llama_print_timings: prompt eval time =  1497.62 ms /     9 tokens (  166.40 ms per token,     6.01 tokens per second)
llama_print_timings:        eval time = 65538.88 ms /    50 runs   ( 1310.78 ms per token,     0.76 tokens per second)
```

