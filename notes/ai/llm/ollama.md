---
title: ollama
---

# ollama

- [ollama/ollama](https://github.com/ollama/ollama)
  - MIT, Golang
- 参考
  - [ollama/ollama-js](https://github.com/ollama/ollama-js)
    - MIT, TS
    - npm:ollama
    - 客户端
- https://ollama.ai/library

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
