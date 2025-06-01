---
title: ollama
---

# ollama

- [ollama/ollama](https://github.com/ollama/ollama)
  - MIT, Golang
  - 封装 llama.cpp
- 参考
  - [ollama/ollama-js](https://github.com/ollama/ollama-js)
    - MIT, TS
    - npm:ollama
    - 客户端
  - [sgomez/ollama-ai-provider](https://github.com/sgomez/ollama-ai-provider)
    - provider for vercel ai
- https://ollama.ai/library
- 默认地址 http://localhost:11434
- OLLAMA_HOST
- ~/.ollama
  - models
    - blobs/
    - manifests/registry.ollama.ai/library/gemma/latest
- 参考
  - 使用 CF r2 存储
    - dd20bb891979d25aebc8bec07b2b3bbc.r2.cloudflarestorage.com

:::caution

- format=json 非常慢 https://github.com/ollama/ollama/issues/3851
- ~~Support tools in OpenAI-compatible API [#4386](https://github.com/ollama/ollama/issues/4386)~~

:::

```bash
brew install ollama # macOS brew

# 启动服务端
# OLLAMA_KV_CACHE_TYPE 0.5+
# OLLAMA_CONTEXT_LENGTH 默认 4096 也可以 /set parameter num_ctx 4096 或者 num_ctx 参数
OLLAMA_CONTEXT_LENGTH=8192 OLLAMA_FLASH_ATTENTION=1 OLLAMA_KV_CACHE_TYPE=q4_0 ollama serve

ollama run mistral # 运行模型
ollama list

# https://hub.docker.com/r/ollama/ollama
docker run --rm -it \
  -v $PWD/data:/root/.ollama \
  -p 11434:11434 \
  ollama/ollama \
  --name ollama

ollama pull qwen2:7b # 中文相对好点

# vision
ollama pull llama3.2-vision:11b
#ollama pull llama3.2-vision:90b
```

| env                      | default         | desc                           |
| ------------------------ | --------------- | ------------------------------ |
| OLLAMA_DEBUG             |                 | 显示额外的调试信息             |
| OLLAMA_HOST              | 127.0.0.1:11434 | Ollama 服务器的 IP 地址        |
| OLLAMA_KEEP_ALIVE        | "5m"            | 模型在内存中保持加载的持续时间 |
| OLLAMA_MAX_LOADED_MODELS | 1               | 最大加载模型数量               |
| OLLAMA_MAX_QUEUE         |                 | 最大排队请求数量               |
| OLLAMA_MODELS            |                 | 模型目录的路径                 |
| OLLAMA_NUM_PARALLEL      | 1               | 最大并行请求数量               |
| OLLAMA_NOPRUNE           |                 | 启动时不修剪模型 blobs         |
| OLLAMA_ORIGINS           |                 | 允许的来源列表，以逗号分隔     |
| OLLAMA_TMPDIR            |                 | 临时文件的位置                 |
| OLLAMA_FLASH_ATTENTION   |                 | 启用 Flash Attention           |
| OLLAMA_LLM_LIBRARY       |                 | 设置 LLM 库以绕过自动检测      |
| OLLAMA_MAX_VRAM          |                 | 最大显存（VRAM）               |
| OLLAMA_CONTEXT_LENGTH    |     4096            | 上下文长度                     |

- https://github.com/ollama/ollama/blob/main/envconfig/config.go
- https://github.com/ollama/ollama/issues/2941

```shell
/set verbose

/show info
# 130k
/set parameter num_ctx 131072

# 输入多行
"""
"""
```

- /no_think - 禁用思考
- /think - 启用思考

```
FROM gemma3:4b-it-qat

PARAMETER temperature 1.0
PARAMETER top_k 64
PARAMETER top_p 0.95
PARAMETER min_p 0.0
```

```bash
ollama create gemma3-4b -f my.Modfile
```

## API

```bash
# Modesl
curl http://localhost:11434/api/tags

curl -X POST http://localhost:11434/api/generate -d '{
  "model": "qwen3:0.6b",
  "prompt":"天空是什么颜色",
  "stream": false
}'
```

```json
{
  // 生成响应 - 单位 nanoseconds
  "total_duration": 4017602595,
  // 加载模型
  "load_duration": 1254191081,
  // 输入 token
  "prompt_eval_count": 52,
  "prompt_eval_duration": 1685919742,
  // 输出 token
  "eval_count": 19,
  "eval_duration": 1005502138
}
```

- https://github.com/ollama/ollama/blob/main/docs/api.md
- OpenAI 兼容接口
  - 不支持 reasoning_content [#8529](https://github.com/ollama/ollama/issues/8529)
  - https://github.com/ollama/ollama/blob/main/docs/openai.md

## Vision

```bash
ollama run gemma3:27b "describe this image: ./inputs/demo.jpg"
ollama run --verbose gemma3:27b "中文描述这个文件: ./inputs/demo.jpg ; 输出 JSON, 文本使用中文, 包含 tags, description, title, alt, objects:[{x,y,w,h,type,tags}]"
```

- 提取文件的逻辑 https://github.com/ollama/ollama/blob/b3af953a55f0bd054937374404506c4229fbda8c/cmd/interactive.go#L501-L509
  - `(?:[a-zA-Z]:)?(?:\./|/|\\)[\S\\ ]+?\.(?i:jpg|jpeg|png)\b`

# FAQ

- CPU 使用不满
  - 修改线程数量 `/set parameter num_thread 20`
  - https://github.com/ollama/ollama/issues/2929
- New Engine - https://github.com/ollama/ollama/issues/9959
  - 替代 llama.cpp

## 限制 GPU

```bash
# 得到 GPU ID
nvidia-smi -L

rocminfo
```

- CUDA_VISIBLE_DEVICES
  - 逗号分割的 GPU ID 列表
  - 支持 UUID 或 数字 ID
  - 设置为 -1 表示禁用 GPU 强制 CPU
- ROCM_VISIBLE_DEVICES
