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
- https://ollama.ai/library
- 默认地址 http://localhost:11434
- OLLAMA_HOST
- ~/.ollama
  - models
    - blobs/
    - manifests/registry.ollama.ai/library/gemma/latest

```bash
# macOS 命令行
brew install ollama

ollama serve       # 启动服务端
ollama run mistral # 运行模型
ollama list

# https://hub.docker.com/r/ollama/ollama
docker run --rm -it \
  -v $PWD/data:/root/.ollama \
  -p 11434:11434 \
  ollama/ollama \
  --name ollama
```

## API

```bash
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt":"Why is the sky blue?"
 }'
```

- https://github.com/ollama/ollama/blob/main/docs/api.md
