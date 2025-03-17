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
OLLAMA_FLASH_ATTENTION=1 OLLAMA_KV_CACHE_TYPE=q4_0 ollama serve

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
| OLLAMA_CONTEXT_LENGTH    |

```
/set verbose

/show info
# 130k
/set parameter num_ctx 131072
```

## API

```bash
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt":"Why is the sky blue?"
 }'
```

- https://github.com/ollama/ollama/blob/main/docs/api.md

## Vision


```bash
ollama run gemma3:27b "describe this image: ./inputs/demo.jpg"
ollama run --verbose gemma3:27b "中文描述这个文件: ./inputs/demo.jpg ; 输出 JSON, 文本使用中文, 包含 tags, description, title, alt, objects:[{x,y,w,h,type,tags}]"
```

- 提取文件的逻辑 https://github.com/ollama/ollama/blob/b3af953a55f0bd054937374404506c4229fbda8c/cmd/interactive.go#L501-L509
  - `(?:[a-zA-Z]:)?(?:\./|/|\\)[\S\\ ]+?\.(?i:jpg|jpeg|png)\b`
